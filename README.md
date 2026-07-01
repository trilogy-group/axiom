# Axiom — Conversational Access Control Plane

Axiom is an AI-native identity and access management (IAM) orchestration engine
that eliminates the manual IT access ticket queue. It lives directly inside
Slack / Google Chat and connects to the engineering stack (GCP IAM, Supabase,
and eventually Jira/GitHub) to grant, review, and revoke access without anyone
touching a console.

## Why this exists

Legacy IAM tools (Okta, SailPoint, ServiceNow) charge per admin seat. Their
revenue model scales with the number of humans required to sit in front of a
dashboard and manually route access requests — which means their own pricing
structure works against automating that role away. Axiom is built the
opposite way: the chat interface *is* the product, so there is no seat-gated
admin console standing between a request and a grant.

**Competitive note:** Lumos ships a similar chatbot experience, but it's a
chat widget bolted onto a web app. Axiom's Chat surface (Slack / Google Chat)
*is* the primary interface — 95%+ of usage should never require opening a
browser tab.

## The two personas

- **IT / platform teams** — fewer manual tickets, faster provisioning,
  a defensible, timestamped audit trail of every grant/revoke, and
  least-privilege enforced by default (grants expire unless renewed).
- **Resource requestors (engineers)** — ask for access in the same tool they
  already work in (Slack/Chat), get a decision in under 60 seconds instead of
  a ticket queue, and access is automatically cleaned up when it's no longer
  needed (team change, offboarding, window expiry) — no manual revoke request
  required either.

## Execution philosophy

Scripts do the actual mutating work against GCP IAM / Supabase. The AI layer
is a wrapper around those scripts — it decides *when* and *whether* to call a
narrow, validated adapter interface. It never gets free-form API access. This
is a deliberate reliability constraint: hallucination risk in an IAM system is
unacceptable, so nothing the AI says can mutate access directly. It can only
invoke a deterministic, pre-validated operation.

## Architecture (MVP)

```
Slack / Google Chat
        │  plain-text command
        ▼
apps/gateway   — Conversational Intake Gateway
        │  parses intent, drops approval card to manager, awaits click
        ▼
apps/core      — NestJS backend
  ├─ API Orchestration Adapters  — deterministic scripts: GCP IAM group
  │                                 membership, Supabase role/RLS grants
  └─ Deterministic Scheduler     — tracks grant expiry windows, fires
                                    revoke the instant a window closes
```

See `CLAUDE.md` for the full architecture doc, hard rules, and MVP scope.

## Repo layout

- `apps/gateway` — Slack/Google Chat bot, conversational intake
- `apps/core` — NestJS backend: adapters, scheduler, approval workflow

## Setup

```bash
npm install
npm run dev
```

## Status

Early build — MVP sprint in progress. See `.claude/plans/` (or the linked
kanban board) for current task state.
