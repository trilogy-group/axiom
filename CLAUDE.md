# Axiom — Architecture & Ground Rules

Axiom is a conversational access-control plane: an AI-native IAM orchestration
engine that lives inside Slack / Google Chat and mutates access in GCP IAM and
Supabase through deterministic, validated adapters.

## Hard Rules

1. **No commits to main.** All work happens on feature branches off `staging`.
   PRs target `staging` first, get reviewed, then merge to `main`.
2. **AI never mutates access directly.** The chat/LLM layer only calls a
   narrow, pre-validated adapter interface (see "Adapter contract" below).
   No freeform API calls to GCP/Supabase from the conversational layer.
3. **No `console.log`.** Use the shared logger (`apps/core/src/lib/logger.ts`).
4. **No raw SQL against Supabase.** Use the Supabase client or typed RPCs.
5. **Route handlers are thin.** Parse input, call a service, return a result.
   If a handler exceeds ~50 lines, extract a service.
6. **Layer order: Controller → Facade → Service → Repository/Adapter.**
   Business logic never talks to GCP/Supabase SDKs directly from a workflow —
   it goes through the adapter layer.
7. **Secrets via env / Secret Manager placeholders.** Never hardcode.
   (Production target: GCP Secret Manager. Local dev: `.env`, gitignored.)
8. **State-changing writes are atomic with their audit/outbox record.** Every
   grant/revoke commits its state row and its audit-log row in one
   transaction — this audit trail is a first-class product feature (it's what
   makes Axiom the operational system-of-record for permission changes), not
   an afterthought.

## Domain Map

- `apps/gateway` — **Conversational Intake Gateway.** Slack/Google Chat bot.
  Parses plain-text commands ("give me DB access to X", "onboard <name> to
  <project>"), formats approval cards, posts them to the approving manager,
  and forwards approved requests to `apps/core`.
- `apps/core` — **Core Engine.** NestJS. Owns:
  - **API Orchestration Adapters** — deterministic, idempotent scripts that
    inject/remove group membership in GCP IAM and grant/revoke roles in
    Supabase. These are the *only* code paths allowed to mutate access.
  - **Deterministic Scheduler** — background job tracking every access
    grant's expiry window (e.g. 90/180 days). Fires the revoke adapter the
    instant a window closes. No human polling required.
  - **Approval workflow** — manager approval state machine (pending →
    approved/denied), including the P0 break-glass override path (engineer
    self-grants during an incident, triggers escalation + immutable incident
    record + mandatory next-day review).

## 5-Day MVP Scope

1. **Conversational Intake Gateway** — Google Chat app that reads a plain-text
   command, extracts intent (resource, requester, duration), and posts a
   formatted approval card to the manager.
2. **API Orchestration Adapters** — scripts (not agent-driven calls) that can
   inject/remove a user from a GCP IAM group, and grant/revoke a Supabase
   role/RLS policy assignment. Each adapter call is idempotent and logged.
3. **Deterministic Scheduler** — a lightweight background loop that records
   grant end-dates and calls the revoke adapter the moment a window expires.

Explicitly **out of scope for the 5-day MVP**: the web-UI admin console,
Snowflake/Jira/GitHub adapters, multi-tenant billing, and the break-glass path
UI (the state machine can exist without a polished emergency UX yet).

## Adapter Contract (why the AI can't freelance)

Every mutating operation goes through a typed adapter method with a fixed
signature, e.g.:

```ts
interface IamAdapter {
  grantGcpGroupMembership(userEmail: string, groupId: string, expiresAt: Date): Promise<GrantResult>;
  revokeGcpGroupMembership(userEmail: string, groupId: string): Promise<RevokeResult>;
  grantSupabaseRole(userId: string, role: string, expiresAt: Date): Promise<GrantResult>;
  revokeSupabaseRole(userId: string, role: string): Promise<RevokeResult>;
}
```

The conversational/LLM layer can only call these methods with validated
arguments — it cannot construct or send its own API requests to GCP/Supabase.
This is a deliberate reliability boundary: hallucination in an IAM system
is unacceptable, so nothing the model outputs can become a mutation without
passing through this fixed, testable interface.

## Where To Look

- Product pitch: `README.md`
- Active plans: `.claude/plans/` (create as work is scoped)
- Contracts for cross-domain work: `~/agents/axiom/contracts/`
- Squad roster + routing: internal (Hermes profiles, not part of this repo)

## Setup

```bash
npm install
npm run dev      # runs gateway + core in dev mode
npm run test
npm run build
```
