# LLD — <Feature name>

*Low-level design. Every choice traces to a PRD capability, every fact to §7.*

## 1. Scope and traceability

Name each capability in words, "capability 3", never `C3`: C numbers
belong to the design record's terms.

| PRD capability | Built here? | Where in this LLD | If not built: why, and when |
|---|---|---|---|

## 2. Components

The scoped application, its tables and fields, which component **owns**
each write, and then each tool the agent calls.

| Component | Type (table, rule, script, role, ACL, report…) | Purpose | Owns writes to |
|---|---|---|---|

| Tool | Inputs | Reads | Writes | Checks it runs |
|---|---|---|---|---|

## 3. Logic

For each piece of logic: what it does, whether it is **plain code**, a tool
or the agent, where and **when** it runs, and what else runs then.

## 4. Security

Roles, access controls (ACLs), who can do what, and any cross-scope access
the app needs. Test as an ordinary user, not an admin.

## 5. Failure modes

What happens when a component fails, is off, or meets data it doesn't expect.

| Failure | What the user sees | What the app does | How it's detected |
|---|---|---|---|

## 6. Test plan

List the tests by PRD capability. Their names come at build time: each
starts with the design term it proves, from the design record.

- **Off the instance:** the plain code and tools, with fakes, in unit tests.
- **On the instance:** what only the platform can prove, done as an
  **ordinary HR fulfiller**, never an admin.

## 7. Research log

Every platform fact this design relies on, exactly as audited.

| # | Fact | Command as run | Rows returned | Mark | Source |
|---|---|---|---|---|---|

## 8. Open decisions

Anything this LLD can't decide, numbered D1, D2… (C numbers belong to the
design record's terms). Never guess a business decision.
