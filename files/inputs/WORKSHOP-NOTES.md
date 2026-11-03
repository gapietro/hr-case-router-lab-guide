# Onsite workshop: notes (excerpt)

*The customer and the ServiceNow AI Foundry team, Oct 20, 2026. From the recording's
transcript, lightly edited and cut to the parts about assigning and moving
cases. Speakers: the customer's HRSD product manager (PM), and a member of
the customer's ITSM team (IT), where the recording shows or strongly suggests who
spoke; other attendees from the customer (Customer); the ServiceNow AI Foundry team
(SN).*

---

## How to route

**Customer:** One concern was the fallback. If it can't find a match, who has to
work the ticket? We brought this up to some of our tier 1s: we're not staffed
to have a team just reviewing that fallback queue.

**SN:** Typically it works on a confidence score. Below a certain confidence,
there's a default answer.

**SN:** There's another way to do the routing, which is an AI agent. But I
think it would make the problem worse for you. If there wasn't good data, it's
just going to take a wild guess, and then it gets routed to the wrong person.
It'd be better to have it go to a triage than to get routed to the wrong
person and sit for days.

**Customer:** Is there a hybrid approach too? A decision table, and the machine
learning if the match doesn't hit?

**SN:** Typically I do two stages. One is a deterministic filter on the front
end, because you can make quick decisions with deterministic filters. It saves
you on assists, because you're only sending to AI what you need to send to AI.
And it routes things directly, very efficiently. Anything it can't address, AI
is the secondary stage for that.

**Customer:** What's the smaller scale version, one that doesn't impact other
teams as much? More in the backend routing, and maybe a fallback to start.

**SN:** Even if we start small, think about the bigger picture, so it's
scalable. As you add use cases, you don't have to rewrite the app or make a
separate process.

## Routing rules the customer can change

**SN:** If we want to do routing, I say we scrap the out-of-the-box routing
and you create your own routing protocol. One, it'll be very token efficient.
Two, you can put a deterministic process in there for things you know. Three,
we can give the LLM context on the routing rules, through a knowledge base
article or some other easy way for your team to write the rules it follows.
And finally, we can give it a confidence score. If it doesn't meet a specific
confidence, we can bail it out to another process.

**Customer:** One of the options was a decision table, something that's product
editable. That's what I'm hoping is in there. You don't have to deploy an
update set. You don't have to go through a change request. We're routing to
the wrong team, we need to fix that: you just update a record.

**SN:** Are you allowed to do that?

**Customer:** We update knowledge articles in prod at any point.

**SN:** That's a big benefit of storing it in a knowledge article: your
knowledge management process can govern the text that's driving the LLM's
behavior. If we do something deterministically, we'll use a decision table you
can easily update. For the LLM's context on routing rules, we very frequently
use knowledge base articles. They also have versioning: we made a change and
it didn't work, we need to revert back. Who made that change?

**Customer:** The ideal state is a single front door for the tier 1 teams, routing to
the correct HR or IT. But there are a lot of concerns on the tier 1 IT team's side
about implementing something like this. So we could start with an HR approach,
to prove it out and show the value.

## The HR demo

**PM:** The confusion on transferring comes in with assignment groups. I made
a knowledge article about this. I send it out and try to remind people, but
new people start, people forget. You can update the assignment group instead
of transferring the case, so sometimes they just update the assignment group.
But in the HR space, and I don't think you have this in incidents, there are
security policies per table. We say these groups can write to this table and
these groups can read this table, on every HR table. There are about 10 of
them.

**PM:** So if I'm an employment verification team member and I think this has to go to the tier 1 HR team, I just update it to the tier 1 HR team. That's probably a bad
example, because I gave the tier 1 HR team access to all the tables except
this kind. But if they pick a group that doesn't have access to this table,
the group might get a notification because the assignment group changed. But
their dashboard filters are set to their case types, and this isn't a case
type on their dashboard. I recognize we could update our dashboards and our
COE policies. But that's a lot of manual tweaking every time a new group or a
new service is made.

**PM:** The way they're supposed to do it: when it's the same service and it's
just going to another team, you update the assignment group. Our tier 1 HR team handles most payroll requests, but they might
escalate some to the payroll team. Then they just update the assignment group
to payroll, because it's a payroll request. But if it's actually compensation
related, they need to transfer it to the compensation team. Then it picks the
right assignment group, because we have the service set up to say this is the
assignment group that gets put on that service. But it requires them to know
which service to pick, and sometimes that's a little iffy. We only have one
payroll service and one benefits request right now, but we've got two
different Workday type requests, and a couple of other services that are a bit
vague, so it's "well, let me just send it over here". Sometimes they're not
sure which HR service to pick, and sometimes, instead of transferring it to
the HR service, they pick the wrong assignment group.

**PM:** We do have the assignment groups they can use tagged as HR, so it's
not every assignment group. But it doesn't tell you that a group doesn't have
access to this case if I accidentally put them in there.

**Customer:** From a fulfiller perspective, to solve not knowing where to
transfer, at least in the IT space, where there are so many teams: a little UI
macro next to the assignment group, a sparkle button, that gives you a
suggestion based on a decision table or ML, to route it correctly. That would
be a really cool add-on.

**PM:** That's where the routing gets confusing for people, and where we end
up with: I sent it to this team, it sat with them for a couple of days because
they didn't realize they had it. I'll look at a dashboard and think, why is
this sitting here? Then I reach out to someone and it gets moving again. And
every time we make a new service or a new group, it's manually updating these
rules, and people forget to do that sometimes. AI checks would be great:
before I fill in this field, maybe it recommends "it's probably this group".

**SN:** So how do we get this context out of people's heads, make sure it's
complete, and make it easy to maintain? Where do the rules sit now?

**PM:** On HR templates and service configurations, and then some assignment
rules. On each HR service there's a thing that says which group owns it. If
multiple groups can work something, we've got assignment rules: if it's this
thing and the categories are these, it goes to this group.

**Customer:** We've got two tier 1 teams: one for IT and one for HR.

## Moving a case

**IT:** As long as people can assign directly to other groups, that can
happen, and it's probably going to. There are some cases where it makes sense
for them to. Maybe it comes down to scoping these tables down further: here
are the HR groups for these particular case types. Or the transfer case popup:
maybe we force people to use the transfer case button, and we don't let them
manually pick a group from that list.

**SN:** If you extend transfer case, to your point: here's what we think,
here's the group it should potentially go to. Just a suggestion. There are
multiple levels to this. You could have the suggestion button. Then you could
be more forceful: you can't edit it yourself, here's what we think you should
do. Then you could go full on: not even going to somebody to triage the case,
just automatically. You build confidence.

**PM:** This transfer case option is limited to when I need to change the
actual service. Could we expand it to say: it's going to stay an employment
verification, but I'm changing the assignment group? To [IT's] point, it
forces you into a flow of transferring it properly, based on rules. The
assignment group is basically locked: you can't change it. If you want to
transfer it, you use the transfer case button, with your AI suggestion there
and one more field: it looks like the right service but should be this group,
versus it should be this service and this is the group.

**SN:** Are your assignment groups filtered to only the groups that should be
working that HR service?

**PM:** Not by HR service. We can say which groups we want to assign to HR
cases in general. But I'm not aware of a way to say only these groups can work
these cases.

**SN:** In your assignment group setup, do you have good descriptions of what
the groups are and what they're used for?

**PM:** Probably not. We do have good descriptions on our services of what
they're used for. But the assignment groups, probably not.

**SN:** That's going to be important if we want to use AI to redirect, because
it might not know what [an acronym] is.

**Customer:** Yeah, there are a lot of acronyms.

**Customer:** In technology, when they need to change assignment groups, they
have a group type of ITIL, which scopes what groups they can select. That's
all tribal knowledge, or off that knowledge article, right now.

**SN:** And this is all done manually?

**Customer:** Yes.

**Customer:** If I think of low-hanging fruit: the decision table for the
assignment group routing, with the machine learning on there, and a little
button or something we can call, from the fulfiller perspective in the classic
UI, or from Virtual Agent, like a skill.

**SN:** We've taken the use case down from this massive thing to a couple of
small things we can really build. We can build this in the lab. I like the
idea of starting out small with just a suggestion, then making it a little
stronger: no, seriously, this is what we want you to do, and they have to
manually override it if they want to do something else. Once you get
confidence that it's making the right decisions, you can completely automate
the process.

**Customer:** We can just start this in the HR space. But I love the idea of
typing in my form and it telling me how to give better information.

**Customer:** Is there a way to transfer tickets between the IT and HR
applications without Universal Request?

**SN:** Not out of the box. You could build something, but you'd basically be
recreating the request. And you'd want a history of that too.

## Sensitive data and cost

**SN:** One thing we maybe didn't cover is HR information: managing personally
identifiable information. Are you familiar with Guardian?

**Customer:** We have it. I've seen the settings and configuration panels. I'm
not sure what its status is right now. Is it on by default?

**SN:** It defaults to on, with some default capture: phone numbers, Social
Security numbers, credit card numbers. Our LLMs are in our secure data center,
not public, but you still don't want to send them private information.
Guardian is the mechanism we use to protect HR data. You asked how we protect
sensitive content: that's how.

**SN:** We always try to be as token efficient as possible. Does this have to
be an agent, or can it just be a skill? A skill is one assist. An agent is a
minimum of 25, and that could be 50 or 100, depending on the complexity. Can
we build a deterministic workflow with a skill that saves us money?

## Choosing the build

**Customer:** I don't think the overall Universal Request is going to work. We
have to align internally more, especially on the triage piece: what do we do
with something that can't be routed? With three tier 1 technology teams, it's
very difficult. What I do think would be a valuable use of our time is using
that decision table logic to build a skill we can call in different things,
whether it's a button or Virtual Agent, just not with Universal Request.

**Customer:** Could we build out that skill and, using our old cases and
incidents from the past year, see what level of these wouldn't have been
triaged? That gives us a sense of how much work we're talking about.

**Customer:** We have the two different use cases: the external one for the shared mailbox,
and the assignment predictor skill, whatever it's called. Leadership would
like to see that too; they've been asking for it. If we could build something
we can call even in that UI macro right next to the assignment group on
incident.

**SN:** Why don't we focus on that as the use case? We'll update the PRD. The
core of what we want to build is this little assignment group suggester.

**Customer:** Are you officially vendors?

**SN:** No, we're not.

**Customer:** If you had a company laptop, maybe I could just export the data for
you. What would be really cool is to have the knowledge article, for both my
team and the tier 1 IT team, so we can update who the fulfillment group is for a
particular service. Or based on the ticket data: 10,000 tickets, honestly, we
probably have 100,000. That hybrid approach we talked about, with the
knowledge article being the start and machine learning helping to build that
confidence.

**Customer:** People from other teams could call that skill too. Just create a
different knowledge article for a different department, and tailor the skill
based on the department.
