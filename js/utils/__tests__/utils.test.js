import { expect, test, describe, mock, beforeAll } from "bun:test";
import { initUrlCopier } from "../utils.js";

// Mock global DOM environment
beforeAll(() => {
  global.document = {
    querySelectorAll: () => [],
    createElementNS: (ns, tag) => {
      const element = {
        ns,
        tag,
        attributes: {},
        setAttribute: (key, val) => { element.attributes[key] = val; },
        appendChild: (child) => { element.child = child; },
      };
      return element;
    }
  };
  global.window = {
    location: { href: "https://example.com" }
  };
  global.navigator = {
    clipboard: {
      writeText: async () => {}
    }
  };
  global.setTimeout = (cb) => { cb(); }; // Make it synchronous for testing
});

describe("initUrlCopier security fix", () => {
  test("it should not use innerHTML to swap and restore content", async () => {
    const mockReplaceChildren = mock(() => {});
    const mockBtn = {
      childNodes: [{}], // Mock child nodes
      classList: {
        add: mock(() => {}),
        remove: mock(() => {}),
      },
      addEventListener: (event, handler) => {
        if (event === 'click') {
          mockBtn.click = handler;
        }
      },
      replaceChildren: mockReplaceChildren,
    };

    // Mock querySelectorAll to return our button
    global.document.querySelectorAll = (selector) => {
      if (selector === '.copy-url-btn') return [mockBtn];
      return [];
    };

    // Spy on innerHTML setter (even though we shouldn't use it)
    let innerHTMLUsed = false;
    Object.defineProperty(mockBtn, 'innerHTML', {
      get: () => "original",
      set: () => { innerHTMLUsed = true; }
    });

    initUrlCopier();

    // Trigger click
    await mockBtn.click.call(mockBtn);

    expect(innerHTMLUsed).toBe(false);
    expect(mockReplaceChildren).toHaveBeenCalled();
    // Verify it was called twice (once to set SVG, once to restore)
    expect(mockReplaceChildren).toHaveBeenCalledTimes(2);
  });
});
