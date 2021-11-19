'use strict';

const EXTENSION_ID = 'mermaid-diagram-renderer';

mermaid.initialize({
  startOnLoad: false,
  deterministicIds: true,
  deterministicIDSeed: 1,
});

// Generate unique IDs.
const idGenerator = function* () {
  let i = 1;
  while (true) {
    yield `${EXTENSION_ID}-${i}`;
    ++i;
  }
}();

// Render diagrams if not rendered yet.
const renderDiagrams = function() {
  document.querySelectorAll(
      // "not(.unchanged)" for rich-diff.
      `pre[lang="mermaid"]:not(.unchanged):not([${EXTENSION_ID}="processed"])`,
  ).forEach(
      (element) => {
        const container = document.createElement('div');
        element.after(container);
        // Mark the element as "processed" to avoid being processed twice.
        element.setAttribute(EXTENSION_ID, 'processed');
        element.style.display = 'none';
        const code = element.querySelector('code').textContent;
        try {
          mermaid.render(idGenerator.next().value, code, (svgGraph) => {
            // Hide the source code block.
            container.innerHTML = svgGraph;
          }, container);
        } catch (error) {
          const errorMessage = document.createElement('pre');
          errorMessage.innerHTML = error.message;
          container.before(errorMessage);
        }
      });
};

document.addEventListener('DOMContentLoaded', function() {
  new MutationObserver(renderDiagrams).observe(
      document.body, {childList: true, subtree: true});
  renderDiagrams();
});
