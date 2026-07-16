import assert from "node:assert/strict";
import test from "node:test";

import {
  buildTicket,
  postTicket,
  startTestApplication
} from "../helpers/ticket-api.js";

test("POST /api/tickets persists and returns referenceUrl", async (t) => {
  const baseUrl = await startTestApplication(t);
  const referenceUrl = "https://docs.example.test/ticket/42";
  const response = await postTicket(
    baseUrl,
    buildTicket({ referenceUrl })
  );

  assert.equal(response.status, 201);

  const payload = await response.json();
  assert.equal(payload.ticket.referenceUrl, referenceUrl);

  const listResponse = await fetch(`${baseUrl}/api/tickets`);
  const listPayload = await listResponse.json();
  assert.equal(listPayload.tickets[0].referenceUrl, referenceUrl);
});
