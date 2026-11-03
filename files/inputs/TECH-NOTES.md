# Technical notes: the customer's HR case setup

*From the customer's HRSD product manager at the Oct 20 workshop, and the customer's
front-door doc. These describe the customer's **production** instance. Your
instance stands in for it. It won't match every detail, so any fact the
design depends on has to be checked on your own instance.*

- HR cases live in about **10 HR tables**, one per kind of case. The customer
  calls them case types.
- **COE security policies** say which groups can read and which can write
  each HR table. Every HR table has them. A group assigned a case on a table
  it can't read doesn't see the case.
- **Each HR service names the group that owns it.** Transferring a case to
  another service puts that service's group on the case. Fulfillers move a
  case either with the **transfer case** button, which changes the service,
  or by editing the **assignment group** field, which keeps it.
- Where several groups work one service, **assignment rules** pick the group
  by the case's category.
- Groups that can take HR cases are **tagged HR**. Nothing checks whether a
  tagged group can open a given HR table.
- The **tier 1 HR team** can read and write every HR
  table except one.
- Fulfillers' **dashboards filter by case type**, so a case on another table
  doesn't show on them.
- HR services have good descriptions. Most assignment groups don't, and
  the customer uses many acronyms.
- One **knowledge article** explains which group does what. People forget
  it, and new staff don't know it.
- **Now Assist Guardian** is installed. Whether it's switched on isn't
  known.
- ServiceNow isn't one of the customer's vendors: the customer's real cases never leave the customer.
  The lab uses demo data only.
