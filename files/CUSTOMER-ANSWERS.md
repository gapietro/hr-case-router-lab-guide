# The customer's answers

*DRAFT, proposed by ServiceNow AI Foundry. The customer's HRSD product manager
confirms or changes each answer before the lab; until then, the instructor
plays the customer. Remove this note once they have.*

From the customer's HRSD product manager, after reviewing your PRD.

| You raised | The customer's answer |
|---|---|
| 1. Which HR services and tables are in release 1 | The services the tier 1 HR team moves most. In the lab: the HR services and HR tables on your instance. |
| 2. Who owns the routing rules and the guidance article | The HRSD product manager owns both. Changes to the article follow our knowledge process, with the product manager's approval. |
| 3. HR Agent Workspace, the classic form, or both | The classic HR case form for release 1, so Reroute is a button on it. The workspace comes later. |
| 4. Who writes the group descriptions | The HRSD product manager, for every group in the routing rules. |
| 5. Which HR services never go to AI | Employee relations, ethics and legal matters, and anything with client data (PHI or PIFI). |
| 6. The confidence threshold, and how soon a case is routed | 0.7 or higher, in a setting we can change. A case is routed, or has its note, within five minutes of being created or of Reroute; after that, it stays where it is. |
| 7. The cost of an agent run, and the caps | Accepted for release 1. 10 runs an hour and 100 a day, in settings we can change. A case over a cap stays where it is, with a work note saying the routing cap was reached. |
| 8. The override rate before routing is switched off | Decided after release 1 has run for a month. |
| 9. Exporting a year of past cases | Not in this version. |
| Capability 3, the agent | Build it in release 1, as written: an AI agent routes each new HR case and each Reroute, and every move goes through capability 4's checks before the case changes. |
| Routing rules first, with the agent only for cases the rules can't place | Not in release 1. The agent reads every new case in scope, and the routing rules check its moves. We'll look again with a month of override numbers. |
| A line in the PRD that no input asked for | Keep it if it limits who can do, see or change something: we want those controls. |
| Which case fields the AI reads | The short description and the description only. |
| How long run log entries are kept | As long as their HR case, by our records policy. |
| Incidents, Virtual Agent, and machine learning on past tickets | Not in release 1: keep them under Out of scope. Incidents come next, once HR has proved out. |
| A triage queue, a misroute reason, an alert for a case with no owner, or offering only groups with access | Not needed for this version. A case the agent can't route keeps its note, and the warning before save is enough for release 1. |
| Anything else | If it's wording, your wording is fine. If it's new scope: not needed for this version. Leave it out. |

## Acceptance

| Name | Role | Date | Signature |
|---|---|---|---|
| The customer's HRSD product manager | HRSD product manager | The day you apply these answers | Pending the product manager's confirmation |
