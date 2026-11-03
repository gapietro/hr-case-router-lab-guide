# Change request: route cases with an agent

*DRAFT, written by ServiceNow AI Foundry. The customer's Nov 2 message asked for
an agent instead of an app with one skill call; the points below are
our reading of what that means, not yet the customer's words. The customer confirms each
point, in its own words, before the lab; until then the instructor speaks
for the customer. Remove this note once they have.*

*From the customer's HRSD product manager, after reading Draft 1 of the
Assignment Group Suggester PRD.*

---

Thanks for the draft. We've talked it over internally and we want to change
direction. We don't want an app with a button that calls one skill. We want
the whole thing to work as an AI agent, an agentic workflow.

What we're after:

- **It routes, it doesn't only suggest.** When a new HR case comes in, the
  agent works out where it belongs and puts it there. If the HR service is
  right and only the group is wrong, it changes the assignment group. If the
  service is wrong, it transfers the case.
- **Fulfillers can ask it to look again.** If a fulfiller thinks a case is
  in the wrong place, they can have the agent route it again.
- **When it isn't sure, it leaves the case alone and says why.** Leave the
  case where it is with a note on it. We still don't have anyone to staff a
  triage queue.
