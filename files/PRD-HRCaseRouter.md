# HR Case Router PRD

Nov 2, 2026 · ServiceNow AI Foundry

Release 1 routes new HR cases by itself. An AI agent reads what a case says and a routing guidance article the customer maintains, and moves the case to the HR service and assignment group that should work it. Routing rules the customer maintains check every move before it's made. A case the agent can't route with confidence stays where it is, with a note saying why. Incidents follow in release 2.

*Draft 2, prepared by ServiceNow AI Foundry from the Oct 20 onsite workshop, the customer's front-door doc (Draft v2, Oct 16) and the customer's change request of Nov 2. Draft 1 proposed a suggestion from one Now Assist skill call. The customer asked instead for an agent that routes. For review and acceptance by the customer. The shared mailbox has its own PRD.*

## 1. Problem

HR fulfillers often move a case to a group that can't work it, and the case can sit there for days. Nobody notices until someone checks a dashboard or the requester follows up.

A fulfiller moving a case has two paths. If the HR service stays the same, they change the assignment group. If the service is wrong, they transfer the case, and the new service sets the group. Fulfillers pick the wrong path, the wrong group or, where services are vague, the wrong service.

HR scopes access by table, through security policies on about 10 HR tables. A group can be assigned a case it can't open, and its dashboards, filtered by case type, don't show it. Nothing warns the fulfiller.

The rules for who owns what live in HR service settings, assignment rules, a knowledge article and people's heads. New staff don't know them, and they need updating each time a service or group is added.

The cases that go wrong are often the ones whose fields can't be trusted: an employee picked a vague HR service, or a fulfiller isn't sure which one fits. What the case says, in its short description and description, is usually the best clue to where it belongs.

## 2. Users

- **HR fulfiller:** works HR cases. Receives cases the agent has routed, and asks the agent to route a case again when it looks misrouted. This includes the tier 1 HR team, and specialist teams such as Payroll, Compensation and the employment verification team.
- **HR systems owner:** the HRSD product manager. Owns HR services, assignment groups and HR security policies, and keeps the routing rules current.

## 3. Capabilities requested

Capabilities 3 and 5 use AI: an AI agent, which runs once when an HR case is created and again when a fulfiller asks. The rest are plain code, including every check on a move the agent wants to make.

1. **Routing rules.** A table, the routing rules, lists which assignment groups may work each HR service, and in what order: for example tier 1 first, with a named team taking escalations. The HR systems owner edits it in production, with no update set or change request.

    *Accepted when:* a change to a row applies to the agent's next run with no deployment, and the change records who made it and when.

2. **Routing guidance article.** A knowledge article says in plain words what each HR service covers and what each HR assignment group handles, with acronyms spelled out and the escalation paths. It follows the customer's knowledge process: versions, approval and rolling back.

    *Accepted when:* publishing a new version changes the agent's next run with no deployment, and the previous version can be restored.

3. **Route new cases.** When an HR case is created, an AI agent reads its short description and description, and the routing guidance article, and decides which HR service and group should work it, with a reason that points to the article and a confidence score. If the service stays the same, it changes the assignment group. If the service is wrong, it transfers the case, so the new service's own setup applies. Either way, it adds a work note with its reason, so fulfillers can see why the case moved.

    *Accepted when:* every new HR case in scope is either routed, with a work note giving its reason and confidence, or left where it was with a work note saying why.

4. **Check every move.** Before the agent changes a case, plain code checks the move: the group is in the routing rules for that service; the group can read and write the HR table the case will be on, under the customer's HR security policies; the service isn't one that never goes to AI; and the confidence is at or above the threshold. A move that fails a check isn't made: the case stays where it is, and the work note names the check it failed. The agent has no other way to change a case.

    *Accepted when:* on every HR table in scope, no case is ever moved to a group outside the routing rules for its service, or to a group without read and write access to its HR table, whatever the case text says.

5. **Route again on request.** A fulfiller who thinks a case is in the wrong place clicks a Reroute button on the case form, and the agent routes it the same way as a new case.

    *Accepted when:* Reroute routes the case or leaves a work note, as for a new case, and a move the agent makes never starts another run.

6. **Warn on a hand-picked group.** A fulfiller who picks a group that can't read and write the case's HR table sees a warning before the case is saved.

    *Accepted when:* every hand-picked group without that access shows the warning.

7. **Override.** A fulfiller can always move a routed case by hand. What the case was before each move is kept, so a move can be put back.

    *Accepted when:* a fulfiller's change to a routed case's service or group is recorded as an override, and the service and group from before the agent's move can be read from the log.

8. **Record every run.** Each agent run is logged: the case, what started it (a new case, or Reroute and who clicked it), what the agent proposed, its confidence, the article version, which checks it passed or failed, and either the service and group before and after the move or the work note it left, and when. A later override adds who made it and when.

    *Accepted when:* every run has one log entry with those fields, and nobody can change an entry afterwards.

9. **Weekly numbers.** Per week: agent runs; cases routed, left with a note, and overridden; moves stopped by each check; the share of new HR cases routed by the agent; and HR cases assigned to a group that can't open them.

    *Accepted when:* the HR systems owner can see these numbers for any past week without asking anyone.

## 4. Non-functional requirements

- The agent runs once for each new HR case in scope and once for each Reroute, never on other changes to a case.
- An agent run makes many AI calls, where a skill makes one: the workshop put an agent at a minimum of 25, and possibly 50 or 100. Runs are capped per hour and per day, in settings the customer can change.
- An agent with poor information guesses, and a wrong move sends a case to a team that can't work it. The checks in capability 4, and leaving uncertain cases where they are, are this release's answer to that.
- How soon after a case is created it must be routed is an open decision. The checks in capability 4 add no noticeable delay.
- Case text sent to AI passes through Now Assist's data privacy masking, which masks personal data such as Social Security and phone numbers. HR services on the customer's restricted list never go to AI: those cases stay where they are, with a work note.
- Only HR fulfillers given the app's user role can click Reroute. Admins can too.
- An agent run works with only the access it needs: it reads the case's short description, description, HR service and assignment group, and the routing guidance article; it changes only the case's HR service and assignment group, clears the assignee when they aren't in the new group, and adds work notes. It never runs as admin.
- Only the HR systems owner and admins can read the run log. Entries are kept as long as their HR case.
- One router serves new cases and Reroute. Release 2 adds incidents with their own routing rules and guidance article, not a second router.

## 5. Out of scope

- Incidents. Release 2 brings the router to incidents for the tier 1 IT team, with its own routing rules and article.
- Moving cases between HR and IT, and Universal Request.
- A triage queue for cases the agent can't route. They stay where they are, with a work note.
- Running the agent on any change to a case other than its creation and Reroute.
- Confidence learned from past tickets, such as Predictive Intelligence.
- Routing before a case exists: request forms, portal pages, form guidance and answering questions before a case is opened.
- Routing from Virtual Agent.
- The shared mailbox. It has its own PRD.
- Changes to HR security policies, dashboards or HR services.
- The customer's real cases. The app is built and tested on ServiceNow instances with demo data.

## 6. Success looks like

- Fewer reassignments per HR case, and less time to reach the correct team, against the customer's current reassignment history.
- Fewer HR cases assigned to a group that can't open them.
- Fulfillers override few of the agent's moves. The target rate is an open decision.
- The HR systems owner changes routing by editing the routing rules or the article, with no deployment.

## 7. Open decisions

1. Which HR services and HR tables are in release 1: all of them, or the ones tier 1 moves most?
2. Who owns the routing rules and the guidance article, and who approves changes to the article?
3. Where do fulfillers work HR cases, and so where does Reroute go: HR Agent Workspace, the classic form, or both?
4. Who writes plain descriptions of the HR assignment groups? HR services have good descriptions today; most groups don't.
5. Which HR services must never go to AI, such as employee relations or ethics?
6. Below what confidence does the agent leave a case where it is, and how soon after a case is created must it be routed?
7. Does the customer accept the cost of an agent run on every new HR case in scope, and what are the caps per hour and per day?
8. What share of moves may fulfillers override before routing is switched off and reviewed?
9. Will the customer export a year of past HR cases to test the agent's routing before it moves real cases? ServiceNow isn't one of the customer's vendors, so the customer would run the export.

## 8. Acceptance

| Name | Role | Date | Signature |
| --- | --- | --- | --- |
|  |  |  |  |
