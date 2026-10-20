# AgencyOS luxury specialization

Research reviewed October 20, 2026. Recommendation: begin with independent fine-jewelry and heirloom-redesign businesses, helping them convert interest into attended consultations and profitable client relationships. This is a market-entry hypothesis; validate willingness to pay before promising results.

## Niche comparison

| Niche | Problem to investigate | Initial agency service | Measurement | Constraint |
|---|---|---|---|---|
| Independent fine jewelry | Interest does not reach an adviser or appointment | Craft narrative, appointment landing page, inquiry follow-up | Qualified/attended appointments, order contribution | Access to actual inquiry and sales outcomes |
| Heirloom redesign | Sentimental trust and unclear process inhibit inquiries | Approved process case studies, consultation funnel, existing-client invitation | Estimates approved, contribution per redesign | Permissions for client stories; production capacity |
| Boutique luxury hotels | Dependence on third-party booking channels | Direct-booking audit, value proposition, past-guest reactivation | Incremental direct contribution after channel costs | Booking/CRM integration and seasonality |
| Emerging luxury accessories | Premium price lacks distinct identity and proof | Founder/craft narrative, product information, collection preview | Qualified inquiries, attendance, contribution | Broader competition and less domain advantage |

## Evidence and limits

- [Jewel360 2026 report](https://jewel360.com/jewelry-industry-report-2026): transaction data from 132 stores and 117 survey responses. Strong social influence, face-to-face closing and growing custom work suggest a discovery-to-consultation opportunity. Vendor sample; independent jewelry is not synonymous with luxury. Report combines different time windows and samples: avoid treating headline revenue growth as demand growth.
- [McKinsey State of Luxury, June 29, 2026](https://www.mckinsey.com/industries/retail/our-insights/state-of-luxury): US/China client research connects desirability with emotional meaning, insider access and personal service; discovery increasingly includes AI and resale. Supports positioning and information quality, not a guarantee that SEO or AI visibility produces leads.
- [D-EDGE 2025 distribution research](https://www.d-edge.com/2025-hotel-direct-distribution-report/): Europe/APAC hotel evidence on direct distribution economics. Vendor customer outcomes are directional and should not become a promised client savings figure.

## Validate with five owner conversations

1. Ask where their last ten qualified inquiries originated and how many became attended appointments and orders.
2. Identify unanswered inquiries, follow-up delays and missing evidence with owner permission. Do not infer a failure from sector statistics.
3. Check margin, appointment capacity, sales cycle, permissions and ability to measure outcomes.
4. Offer a fixed-scope 30-day pilot: one audience, one offer, one response destination, one accountable owner, one randomized holdout where feasible.
5. Define a useful outcome and reporting period with the owner. Track sales contribution and sample limitations; avoid promises about ROAS or statistically significant results from small samples.

## Curriculum mapping

Source basis: local Fall 2026 DM-300 syllabus and consolidated lecture notes through October 14. The mastery guide heading says DM303, while the syllabus/course overview identify DM-300; use the syllabus identifier. This file contains application summaries, not copied course materials or personal class data.

Implemented: six-part copy strategy; behavioral selection/RFM planning; CRM trigger/owner/stop-condition planning; response URL with UTM tracking; discounted profit LTV; normalized treatment/control conversion lift; incremental gross profit net of campaign cost; break-even orders; browser save/backup; editable campaign handoff.

Syllabus topics also mapped: purchase funnel, trial/loyalty offers, direct-mail packages, CPC/CPM and channel choice, mobile, privacy, automation/fulfillment, integrated ads/email, team accountability and presentations. Future topics are planning prompts, not a claim that the future lectures have been studied or integrations implemented. Add new insights manually in the strategy field; no automatic course monitoring is configured.

Next development candidates: consented CRM imports with suppression/deduplication, tested RFM cohorts, CPM/CPC scenario comparisons, multi-client strategy records, holdout assignment and uncertainty reporting, owner/task tracking and approved CRM integrations. Current software provides planning fields rather than these automated systems.

## Model assumptions

Profit LTV = sum of annual average order value × gross margin × expected annual orders discounted at each year-end, minus acquisition cost. No retention decay or overhead included. Incremental orders = (treatment conversion rate − control conversion rate) × treatment group size. Incremental campaign profit = incremental orders × gross profit per order − campaign cost. Conversions must be completed orders for the profit estimate, not leads or appointments. Group comparisons require randomization and the same observation window to support causal interpretation; the tool does not perform significance testing.

## Verification

Four Node tests cover discounted cash flow, unequal group normalization/negative lift, zero denominators and invalid inputs. Browser checks cover playbook population, saving, calculations and starter-campaign creation with a tracked URL. The new module requires no OpenAI API access and makes no external marketing actions.
