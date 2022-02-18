'use strict';

/* eslint max-len: off */

const timeoutMillis = 30000; // 30 seconds.

describe(
    'Valid code blocks in the test Gist page',
    () => {
      const testGistPageUrl = 'https://gist.github.com/tanakafwd/f389345248c3bbbaaabccbe1062aad5c';
      const numDiagramsInTestGistPage = 7;

      let page;
      const requestedDomains = [];
      const expectedRequestDomains = [
        'avatars.githubusercontent.com',
        'collector.github.com',
        'github.githubassets.com',
        'gist.github.com',
      ];
      beforeAll(async () => {
        page = await global.__BROWSER__.newPage();
        await page.setRequestInterception(true);
        page.on('request', (interceptedRequest) => {
          // Capture domains of request URLs to check if the diagram has been
          // rendered without accessing non-GitHub sites.
          requestedDomains.push(new URL(interceptedRequest.url()).host);
          interceptedRequest.continue();
        });
        await page.goto(testGistPageUrl);
      }, timeoutMillis);

      afterAll( async () => {
        await page.close();
      });

      it('should be rendered without accessing non-GitHub sites', async () => {
        expect(expectedRequestDomains).toEqual(
            expect.arrayContaining(requestedDomains));
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
      const requestedDomains = [];
      const expectedRequestDomains = [
        'avatars.githubusercontent.com',
        'collector.github.com',
        'github.githubassets.com',
        'gist.github.com',
      ];
      beforeAll(async () => {
        page = await global.__BROWSER__.newPage();
        await page.setRequestInterception(true);
        page.on('request', (interceptedRequest) => {
          // Capture domains of request URLs to check if the diagram has been
          // rendered without accessing non-GitHub sites.
          requestedDomains.push(new URL(interceptedRequest.url()).host);
          interceptedRequest.continue();
        });
        await page.goto(testGistPageUrl);
      }, timeoutMillis);

      afterAll( async () => {
        await page.close();
      });

      it('should be rendered without accessing non-GitHub sites', async () => {
        expect(expectedRequestDomains).toEqual(
            expect.arrayContaining(requestedDomains));
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
