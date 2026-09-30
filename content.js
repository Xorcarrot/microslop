(() => {
  const PATTERN = /microsoft/gi;
  const TEST = /microsoft/i;
  const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT", "CODE", "PRE"]);

  // Keep the original casing: MICROSOFT -> MICROSLOP, microsoft -> microslop, Microsoft -> Microslop
  function replaceMatch(match) {
    if (match === match.toUpperCase()) return "MICROSLOP";
    if (match === match.toLowerCase()) return "microslop";
    return "Microslop";
  }

  function shouldSkip(node) {
    const parent = node.parentElement;
    if (!parent) return false;
    if (SKIP_TAGS.has(parent.tagName)) return true;
    return parent.isContentEditable;
  }

  function replaceInTextNode(node) {
    const text = node.nodeValue;
    if (!text || !TEST.test(text)) return;
    if (shouldSkip(node)) return;
    node.nodeValue = text.replace(PATTERN, replaceMatch);
  }

  function walk(root) {
    if (root.nodeType === Node.TEXT_NODE) {
      replaceInTextNode(root);
      return;
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) replaceInTextNode(node);
  }

  function replaceTitle() {
    if (TEST.test(document.title)) {
      document.title = document.title.replace(PATTERN, replaceMatch);
    }
  }

  walk(document.body);
  replaceTitle();

  // Handle content added or changed after load (SPAs, infinite scroll, etc.).
  // Replaced text no longer matches, so our own edits don't cause loops.
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === "characterData") {
        replaceInTextNode(m.target);
      } else {
        m.addedNodes.forEach(walk);
      }
    }
    replaceTitle();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true,
  });
})();
