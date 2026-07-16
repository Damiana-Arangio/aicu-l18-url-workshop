import { expect, test } from "@playwright/test";

import { visibleJavascriptReferenceUrl } from "../fixtures/url-demo-payloads.js";

async function createTicket(request, overrides) {
  const response = await request.post("/api/tickets", {
    data: {
      title: "Ticket con riferimento",
      customer: "Alfa S.r.l.",
      description: "Aprire la documentazione collegata.",
      referenceUrl: "",
      priority: "normale",
      sourceChannel: "email",
      ...overrides
    }
  });

  expect(response.status()).toBe(201);
}

test("keeps an https reference available in ticket details", async ({
  page,
  request
}) => {
  const referenceUrl = "https://docs.example.test/ticket/42";

  await createTicket(request, {
    title: "Riferimento HTTPS L18",
    referenceUrl
  });

  await page.goto("/");
  await page.getByRole("button", { name: "Apri dettagli Riferimento HTTPS L18" }).click();

  const link = page.locator("#ticket-reference-link");
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("href", referenceUrl);
});

test("does not expose a javascript URL as a navigable reference", async ({
  page,
  request
}) => {
  await createTicket(request, {
    title: "Riferimento non consentito L18",
    referenceUrl: visibleJavascriptReferenceUrl
  });

  await page.goto("/");
  await page
    .getByRole("button", { name: "Apri dettagli Riferimento non consentito L18" })
    .click();

  const link = page.locator("#ticket-reference-link");
  const href = await link.getAttribute("href");

  expect(href || "").not.toMatch(/^javascript:/i);
  await expect(page.getByText("Riferimento non disponibile.")).toBeVisible();
});
