# Repository guidance

This is the student L18 post-class URL workshop.

## Product facts

- `referenceUrl` is optional and stored as ticket data.
- The product intends to expose ordinary web references, not executable URL schemes.
- The server owns `status` and computes `urgencyLabel`.
- SQLite queries must remain parameterized.

## Task boundary

- Follow `referenceUrl` from the request to the anchor `href`.
- Define a minimal allowed-protocol policy and a visible safe fallback.
- Preserve valid HTTPS references and the original stored value.
- Do not add dependencies, redirects, CSP, authentication, or broad refactors.
- Do not weaken or rewrite the hostile test.

## Verification

```bash
pnpm check
pnpm test
pnpm test:e2e
pnpm test:all
```

Review the final diff and be ready to explain the policy in one sentence.
