import assert from "node:assert/strict";
import test from "node:test";

import { visibleJavascriptReferenceUrl } from "../fixtures/url-demo-payloads.js";

test("the local javascript URL produces a visible takeover within the field limit", () => {
  const document = {
    body: {
      innerHTML: "<p>Dashboard ticket</p>",
      style: {}
    }
  };

  assert.match(visibleJavascriptReferenceUrl, /^javascript:/);
  assert.ok(visibleJavascriptReferenceUrl.length <= 500);

  const code = visibleJavascriptReferenceUrl.slice("javascript:".length);
  Function("document", code)(document);

  assert.match(document.body.innerHTML, /CONTENUTO MALEVOLO ESEGUITO/);
  assert.match(document.body.innerHTML, /QUESTA UI NON APPARTIENE AL PRODOTTO/);
  assert.equal(document.body.style.overflow, "hidden");
});
