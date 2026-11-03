# Use case: cases that land with a team that can't work them

*Excerpt from the customer's "Universal Request: A Single Front Door for G&A
Service" (Draft v2, Oct 16, 2026, owner the customer's HR systems team), quoted word for word, with names replaced. Left out: the general email address (the shared mailbox), the
single front door, and teams outside ServiceNow. Items in [brackets] are
still to be confirmed.*

---

## Overview

Because requests can enter through multiple channels, they do not always
reach the team best equipped to address them. When a request enters through
ServiceNow, it can still land with a team that cannot work on it, and moving
the request to the right team is not always straightforward. This creates
friction for both the requestor and the teams providing support.

**Team member (fulfiller) experience.** Today: Fulfillers receive requests
that belong to other teams, and spend time re-routing them and answering
questions that have known answers. Goal: Fulfillers mainly receive requests
for their own team. Known answers reach requestors before a case is opened.

## Problem statements

- **P4. Internal requests submitted through the wrong option reach a team
  that cannot fulfill them.** They wait until someone notices and transfers
  them, or the team member resubmits. Team members sometimes use a form that
  does not fit their need.
- **P5. Transfers are confusing, and cases can go unworked without anyone
  noticing.** When a fulfiller reassigns a case (changes the assignment
  group) instead of converting it, the receiving group may not be able to
  see it. The case waits until the requestor follows up.
- **P6. HR and Tech cannot transfer cases to each other.** A request
  submitted through one domain cannot be moved to the other, so the
  requestor resubmits or a fulfiller relays it manually.

In ITSM, a group is eligible for assignment on an incident only if it has
the "itil" group type, which a group receives after formal training. The
same logic applies to other record types such as change and catalog. In
HR, groups that can take HR cases are tagged HR, but a team is still
sometimes selected based on the type of case even when that team does not
have access to it. HR believes this reflects a difference between the two
applications: ITSM gives fulfillers general access to incidents, while HRSD
scopes access by table within the application.

HR has related items on its own backlog. It sees this problem as one part
of a broader goal: a way to review a case automatically and confirm it is in
the right place, across all teams.

## Scope

- **Teams:** HR and Tech first, since both work in ServiceNow today. Then
  [Finance, Legal, PR/Comms, Facilities, others: to be confirmed]. The list
  of teams and their request types is the basis for routing. See
  requirement R15.
- **Out of scope:** Changing how each team fulfills its own requests. The
  focus is getting requests to the right team.

## UC3: A request lands with the wrong team or in the wrong domain

- **Trigger:** A request is submitted through the wrong option, or lands
  with a team that recognizes it belongs elsewhere, including across HR and
  Tech.
- **Today:** The case waits for a fulfiller to notice and transfer it.
  Depending on how it is moved, the new team may not be able to see it.
  Moving a case between HR and Tech often means the requestor resubmits.
- **Desired:** Routing is right the first time in most cases. When it is
  not, a fulfiller has one clear action that moves the case to the right
  team, in either direction across HR and Tech. The receiving team can
  always see the case, and the requestor stays informed and does not
  resubmit.

## Requirements

**Must** means required for a first release to be considered successful.
**Should** means expected in the first release. Priorities are proposed and
will be confirmed with stakeholders.

- **R2 (Must).** Classify each request by intent and owning team, with a
  confidence score. Route automatically above a defined threshold, and send
  lower-confidence requests to a human triage queue.
- **R3 (Must).** A defined path for requests that cannot be classified or
  are out of scope: a queue with a named owner and SLA, and an
  acknowledgment to the sender.
- **R4 (Must).** Rules for sensitive content. Requests involving employee
  relations, ethics, legal matters, or client data (PHI/PIFI) follow a
  restricted route and are not auto-answered or placed in broadly visible
  queues.
- **R6 (Must).** Transfer of cases in both directions between HR (HRSD)
  and Tech (ITSM), and to other teams, without the requestor resubmitting.
- **R7 (Must).** A transfer or reassignment always leaves the receiving
  group able to see and work the case. If that is not possible, the action
  is blocked or flagged.
- **R8 (Must).** Only groups that have access to a given case type are
  offered as assignment choices, in both HR (HRSD) and Tech (ITSM).
- **R10 (Should).** A single request record the requestor can follow across
  transfers, showing history, work notes, and status regardless of how many
  teams are involved.
- **R12 (Must).** Reporting and SLA monitoring across G&A: volume by team,
  time to reach the correct team, reassignment count, requests with no
  owner, auto-route rate, and deflection rate. Alerts when a request has had
  no owner past a set time.
- **R13 (Should).** A way for fulfillers to mark a request as misrouted and
  give a reason, with that information used to improve routing.
- **R14 (Should).** A record of why a request was routed where it was.
- **R15 (Must).** A maintained list of G&A teams, request types, owners, and
  backups that routing relies on, with a named owner for keeping it current.

## Considerations

- **Routing relies on current information about who owns what.** We will
  need a maintained list of teams, request types, and owners (R15).
- **Access when a case moves.** The receiving team must be able to see the
  case every time (R7, R8).
- **Automated routing needs to be visible and correctable.** Fulfillers and
  leaders need to see what was routed where and be able to flag misroutes
  (R2, R3, R12, R13).
- **Sensitive and client information.** The general mailbox and employee
  requests can contain employee relations matters, legal issues, and client
  PHI or PIFI. We need clear rules for how this content is handled (R4).

## How we plan to measure success

| Measure | Why it matters | Where the starting number comes from |
| --- | --- | --- |
| Time to reach the correct team; reassignments per case | Shows P4 to P6 | ServiceNow reassignment history in HR and Tech |
| Cases assigned to groups that cannot access them | Shows how often cases go unworked | ServiceNow report |
| Routing accuracy, deflection rate, requestor satisfaction | Measures the result of the new approach | Defined during design |

## A question for the ServiceNow AI Foundry team

What controls exist for sensitive content, confidence thresholds, and human
review? How is access preserved when a case moves between scoped
applications?
