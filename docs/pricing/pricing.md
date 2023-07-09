---
title: Pricing 
description: Casdoor pricing overview
keywords: [pricing]
authors: [isulimanov]
---

`Pricing` contains one or more `plan` and provide ability to sing up to application with selected plan.

General flow might looks like on picture below:

![pricing.png](/img/pricing/pricing_flow.png)

## Pricing properties

Every Pricing has these properties:

* `Owner`
* `Name`
* `CreatedTime`
* `DisplayName`
* `Description`
* `Plans` - Array of plans
* `IsEnabled`
* `Has trial` - any payments will not be reqiured for sign up in case of true
* `TrialDuration` - impact on subscription end days
* `Application`
* `Submitter`
* `Approver`
* `ApproveTime`
* `State`
