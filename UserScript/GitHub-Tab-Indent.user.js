// ==UserScript==
// @name         GitHub Tab Indent
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Improve textarea handling in GitHub
// @author       Keisuke Kawhara (ktansai)
// @match        https://github.com/*
// @grant        none
// @homepage     https://github.com/ktansai/GitHub-Tab-Indent
// ==/UserScript==

(function() {
  'use strict';

  // Tab size can be adjusted here (2, 4, etc.)
  const tabSize = 2;
  const spaces = ' '.repeat(tabSize);

  document.addEventListener('keydown', function(e) {
      if (e.target.tagName === 'TEXTAREA') {
          const textarea = e.target;
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;

          // Check if any text is selected
          if (start !== end) {
              // Do not indent when text is selected because native indent feature is available.
              return;
          }

          // Tab key pressed
          if (e.keyCode === 9) {
              e.preventDefault();

              // Shift + Tab
              if (e.shiftKey) {
                  if (textarea.value.substring(start - tabSize, start) === spaces) {
                      textarea.value = textarea.value.substring(0, start - tabSize) + textarea.value.substring(end);
                      textarea.selectionStart = textarea.selectionEnd = start - tabSize;
                  }
              } else {
                  // Regular Tab
                  textarea.value = textarea.value.substring(0, start) + spaces + textarea.value.substring(end);
                  textarea.selectionStart = textarea.selectionEnd = start + tabSize;
              }
          }
      }
  });
})();
