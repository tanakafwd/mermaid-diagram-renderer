'use strict';

/* eslint max-len: off */

const timeoutMillis = 30000; // 30 seconds.

describe(
    'Valid code blocks in the test GitHub page',
    () => {
      const testGitHubPageUrl = 'https://github.com/tanakafwd/mermaid-diagram-renderer/blob/main/tests/pages/valid.md';
      const numDiagramsInTestGitHubPage = 7;

      let page;
      beforeAll(async () => {
        page = await global.__BROWSER__.newPage();
        await page.goto(testGitHubPageUrl);
      }, timeoutMillis);

      afterAll( async () => {
        await page.close();
      });

      it('should be the expected number of diagrams', async () => {
        const numCodeBlocks = await page.evaluate(
            () => document.querySelectorAll('pre[lang="mermaid"]').length);
        expect(numCodeBlocks).toBe(numDiagramsInTestGitHubPage);
      });

      it('should be rendered as SVG', async () => {
        for (let i = 1; i <= numDiagramsInTestGitHubPage; ++i) {
          const diagramId = `mermaid-diagram-renderer-${i}`;
          const tagName = await page.evaluate(
              (targetId) => document.getElementById(targetId).tagName,
              diagramId);
          expect(tagName).toBe('svg');
        }
      });

      it('should be rendered without error icon', async () => {
        for (let i = 1; i <= numDiagramsInTestGitHubPage; ++i) {
          const diagramId = `mermaid-diagram-renderer-${i}`;
          const hasErrorIcon = await page.evaluate(
              (targetId) => document.getElementById(targetId).querySelector(
                  '[class="error-icon"]') !== null, diagramId);
          expect(hasErrorIcon).toBeFalsy();
        }
      });

      it('should be marked as processed', async () => {
        const numCodeBlocks = await page.evaluate(
            () => document.querySelectorAll(
                'pre[lang="mermaid"][mermaid-diagram-renderer="processed"]',
            ).length);
        expect(numCodeBlocks).toBe(numDiagramsInTestGitHubPage);
      });
    },
    timeoutMillis,
);

describe(
    'Invalid code blocks in the test GitHub page',
    () => {
      const testGitHubPageUrl = 'https://github.com/tanakafwd/mermaid-diagram-renderer/blob/main/tests/pages/invalid.md';
      const numDiagramsInTestGitHubPage = 2;

      let page;
      beforeAll(async () => {
        page = await global.__BROWSER__.newPage();
        await page.goto(testGitHubPageUrl);
      }, timeoutMillis);

      afterAll( async () => {
        await page.close();
      });

      it('should be the expected number of diagrams', async () => {
        const numCodeBlocks = await page.evaluate(
            () => document.querySelectorAll('pre[lang="mermaid"]').length);
        expect(numCodeBlocks).toBe(numDiagramsInTestGitHubPage);
      });

      it('should be rendered as SVG', async () => {
        for (let i = 1; i <= numDiagramsInTestGitHubPage; ++i) {
          const diagramId = `mermaid-diagram-renderer-${i}`;
          const tagName = await page.evaluate(
              (targetId) => document.getElementById(targetId).tagName,
              diagramId);
          expect(tagName).toBe('svg');
        }
      });

      it('should be rendered with error icon', async () => {
        for (let i = 1; i <= numDiagramsInTestGitHubPage; ++i) {
          const diagramId = `mermaid-diagram-renderer-${i}`;
          const hasErrorIcon = await page.evaluate(
              (targetId) => document.getElementById(targetId).querySelector(
                  '[class="error-icon"]') !== null, diagramId);
          expect(hasErrorIcon).toBeTruthy();
        }
      });

      it('should be marked as processed', async () => {
        const numCodeBlocks = await page.evaluate(
            () => document.querySelectorAll(
                'pre[lang="mermaid"][mermaid-diagram-renderer="processed"]',
            ).length);
        expect(numCodeBlocks).toBe(numDiagramsInTestGitHubPage);
      });
    },
    timeoutMillis,
);

describe(
    'Valid code blocks in the test GitHub page after navigation',
    () => {
      const testGitHubPageDirectoryUrl = 'https://github.com/tanakafwd/mermaid-diagram-renderer/blob/main/tests/pages/';
      const testGitHubPagePath = '/tanakafwd/mermaid-diagram-renderer/blob/main/tests/pages/valid.md';
      const numDiagramsInTestGitHubPage = 7;

      let page;
      beforeAll(async () => {
        page = await global.__BROWSER__.newPage();
        await page.goto(testGitHubPageDirectoryUrl);
        await page.waitForSelector(`a[href="${testGitHubPagePath}"]`);
        await page.click(`a[href="${testGitHubPagePath}"]`);
        await page.waitForSelector('pre[lang="mermaid"]');
      }, timeoutMillis);

      afterAll( async () => {
        await page.close();
      });

      it('should be the expected number of diagrams', async () => {
        const numCodeBlocks = await page.evaluate(
            () => document.querySelectorAll('pre[lang="mermaid"]').length);
        expect(numCodeBlocks).toBe(numDiagramsInTestGitHubPage);
      });

      it('should be rendered as SVG', async () => {
        for (let i = 1; i <= numDiagramsInTestGitHubPage; ++i) {
          const diagramId = `mermaid-diagram-renderer-${i}`;
          const tagName = await page.evaluate(
              (targetId) => document.getElementById(targetId).tagName,
              diagramId);
          expect(tagName).toBe('svg');
        }
      });

      it('should be rendered without error icon', async () => {
        for (let i = 1; i <= numDiagramsInTestGitHubPage; ++i) {
          const diagramId = `mermaid-diagram-renderer-${i}`;
          const hasErrorIcon = await page.evaluate(
              (targetId) => document.getElementById(targetId).querySelector(
                  '[class="error-icon"]') !== null, diagramId);
          expect(hasErrorIcon).toBeFalsy();
        }
      });

      it('should be marked as processed', async () => {
        const numCodeBlocks = await page.evaluate(
            () => document.querySelectorAll(
                'pre[lang="mermaid"][mermaid-diagram-renderer="processed"]',
            ).length);
        expect(numCodeBlocks).toBe(numDiagramsInTestGitHubPage);
      });
    },
    timeoutMillis,
);

describe(
    'Invalid code blocks in the test GitHub page after navigation',
    () => {
      const testGitHubPageDirectoryUrl = 'https://github.com/tanakafwd/mermaid-diagram-renderer/blob/main/tests/pages/';
      const testGitHubPagePath = '/tanakafwd/mermaid-diagram-renderer/blob/main/tests/pages/invalid.md';
      const numDiagramsInTestGitHubPage = 2;

      let page;
      beforeAll(async () => {
        page = await global.__BROWSER__.newPage();
        await page.goto(testGitHubPageDirectoryUrl);
        await page.waitForSelector(`a[href="${testGitHubPagePath}"]`);
        await page.click(`a[href="${testGitHubPagePath}"]`);
        await page.waitForSelector('pre[lang="mermaid"]');
      }, timeoutMillis);

      afterAll( async () => {
        await page.close();
      });

      it('should be the expected number of diagrams', async () => {
        const numCodeBlocks = await page.evaluate(
            () => document.querySelectorAll('pre[lang="mermaid"]').length);
        expect(numCodeBlocks).toBe(numDiagramsInTestGitHubPage);
      });

      it('should be rendered as SVG', async () => {
        for (let i = 1; i <= numDiagramsInTestGitHubPage; ++i) {
          const diagramId = `mermaid-diagram-renderer-${i}`;
          const tagName = await page.evaluate(
              (targetId) => document.getElementById(targetId).tagName,
              diagramId);
          expect(tagName).toBe('svg');
        }
      });

      it('should be rendered with error icon', async () => {
        for (let i = 1; i <= numDiagramsInTestGitHubPage; ++i) {
          const diagramId = `mermaid-diagram-renderer-${i}`;
          const hasErrorIcon = await page.evaluate(
              (targetId) => document.getElementById(targetId).querySelector(
                  '[class="error-icon"]') !== null, diagramId);
          expect(hasErrorIcon).toBeTruthy();
        }
      });

      it('should be marked as processed', async () => {
        const numCodeBlocks = await page.evaluate(
            () => document.querySelectorAll(
                'pre[lang="mermaid"][mermaid-diagram-renderer="processed"]',
            ).length);
        expect(numCodeBlocks).toBe(numDiagramsInTestGitHubPage);
      });
    },
    timeoutMillis,
);

describe(
    'Valid code blocks in the test Gist page',
    () => {
      const testGistPageUrl = 'https://gist.github.com/tanakafwd/f389345248c3bbbaaabccbe1062aad5c';
      const numDiagramsInTestGistPage = 7;

      let page;
      beforeAll(async () => {
        page = await global.__BROWSER__.newPage();
        await page.goto(testGistPageUrl);
      }, timeoutMillis);

      afterAll( async () => {
        await page.close();
      });

      it('should be the expected number of diagrams', async () => {
        const numCodeBlocks = await page.evaluate(
            () => document.querySelectorAll('pre[lang="mermaid"]').length);
        expect(numCodeBlocks).toBe(numDiagramsInTestGistPage);
      });

      it('should be rendered as SVG', async () => {
        for (let i = 1; i <= numDiagramsInTestGistPage; ++i) {
          const diagramId = `mermaid-diagram-renderer-${i}`;
          const tagName = await page.evaluate(
              (targetId) => document.getElementById(targetId).tagName,
              diagramId);
          expect(tagName).toBe('svg');
        }
      });

      it('should be rendered without error icon', async () => {
        for (let i = 1; i <= numDiagramsInTestGistPage; ++i) {
          const diagramId = `mermaid-diagram-renderer-${i}`;
          const hasErrorIcon = await page.evaluate(
              (targetId) => document.getElementById(targetId).querySelector(
                  '[class="error-icon"]') !== null, diagramId);
          expect(hasErrorIcon).toBeFalsy();
        }
      });

      it('should be marked as processed', async () => {
        const numCodeBlocks = await page.evaluate(
            () => document.querySelectorAll(
                'pre[lang="mermaid"][mermaid-diagram-renderer="processed"]',
            ).length);
        expect(numCodeBlocks).toBe(numDiagramsInTestGistPage);
      });
    },
    timeoutMillis,
);

describe(
    'Invalid code blocks in the test Gist page',
    () => {
      const testGistPageUrl = 'https://gist.github.com/tanakafwd/319edf3774099d0156c7242beae1a0d7';
      const numDiagramsInTestGistPage = 2;

      let page;
      beforeAll(async () => {
        page = await global.__BROWSER__.newPage();
        await page.goto(testGistPageUrl);
      }, timeoutMillis);

      afterAll( async () => {
        await page.close();
      });

      it('should be the expected number of diagrams', async () => {
        const numCodeBlocks = await page.evaluate(
            () => document.querySelectorAll('pre[lang="mermaid"]').length);
        expect(numCodeBlocks).toBe(numDiagramsInTestGistPage);
      });

      it('should be rendered as SVG', async () => {
        for (let i = 1; i <= numDiagramsInTestGistPage; ++i) {
          const diagramId = `mermaid-diagram-renderer-${i}`;
          const tagName = await page.evaluate(
              (targetId) => document.getElementById(targetId).tagName,
              diagramId);
          expect(tagName).toBe('svg');
        }
      });

      it('should be rendered with error icon', async () => {
        for (let i = 1; i <= numDiagramsInTestGistPage; ++i) {
          const diagramId = `mermaid-diagram-renderer-${i}`;
          const hasErrorIcon = await page.evaluate(
              (targetId) => document.getElementById(targetId).querySelector(
                  '[class="error-icon"]') !== null, diagramId);
          expect(hasErrorIcon).toBeTruthy();
        }
      });

      it('should be marked as processed', async () => {
        const numCodeBlocks = await page.evaluate(
            () => document.querySelectorAll(
                'pre[lang="mermaid"][mermaid-diagram-renderer="processed"]',
            ).length);
        expect(numCodeBlocks).toBe(numDiagramsInTestGistPage);
      });
    },
    timeoutMillis,
);

describe(
    'Valid code blocks in the test pull request',
    () => {
      const testGitHubPageUrl = 'https://github.com/tanakafwd/mermaid-diagram-renderer/pull/1/files?short_path=85e72a6#diff-85e72a6a5d0579bda132364b7eea5cc3e4441f12dbe573be08cf2e8988705695';
      const numCodeBlocksInTestGitHubPage = 7;
      const numDiagramsInTestGitHubPage = 3;

      let page;
      beforeAll(async () => {
        page = await global.__BROWSER__.newPage();
        await page.goto(testGitHubPageUrl);
      }, timeoutMillis);

      afterAll( async () => {
        await page.close();
      });

      it('should be the expected number of diagrams', async () => {
        const numCodeBlocks = await page.evaluate(
            () => document.querySelectorAll('pre[lang="mermaid"]').length);
        expect(numCodeBlocks).toBe(numCodeBlocksInTestGitHubPage);
      });

      it('should be rendered as SVG', async () => {
        for (let i = 1; i <= numDiagramsInTestGitHubPage; ++i) {
          const diagramId = `mermaid-diagram-renderer-${i}`;
          const tagName = await page.evaluate(
              (targetId) => document.getElementById(targetId).tagName,
              diagramId);
          expect(tagName).toBe('svg');
        }
      });

      it('should be rendered without error icon', async () => {
        for (let i = 1; i <= numDiagramsInTestGitHubPage; ++i) {
          const diagramId = `mermaid-diagram-renderer-${i}`;
          const hasErrorIcon = await page.evaluate(
              (targetId) => document.getElementById(targetId).querySelector(
                  '[class="error-icon"]') !== null, diagramId);
          expect(hasErrorIcon).toBeFalsy();
        }
      });

      it('should be marked as processed', async () => {
        const numCodeBlocks = await page.evaluate(
            () => document.querySelectorAll(
                'pre[lang="mermaid"][mermaid-diagram-renderer="processed"]',
            ).length);
        expect(numCodeBlocks).toBe(numDiagramsInTestGitHubPage);
      });
    },
    timeoutMillis,
);
