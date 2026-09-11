# Web UX research: bad versus good practices

Research date: September 2, 2026

## Purpose

This document is a research-backed catalog of common website UX problems, their better counterparts, and visible cues that can later be used to prompt an AI agent to create realistic “bad UX detective” interfaces.

The central lesson is that bad UX is not synonymous with ugly design. A polished interface can still be bad if it hides state, obstructs a task, induces error, excludes users, manipulates choice, or fails under realistic conditions. Conversely, a dense or visually plain interface can work well when its structure, state, actions, and consequences are clear for its intended users.

## Research approach and caveats

The four supplied “bad UX” articles were reviewed as practitioner roundups. They consistently identify hidden or confusing navigation, clutter, weak hierarchy, inconsistent presentation, poor mobile responsiveness, slow performance, pop-up overload, autoplay, misleading copy, dark patterns, notification overload, and insufficient accessibility:

- [Design At Work: Examples of Bad UX Design on Websites](https://designatwork.com/websites-with-bad-ux-design/)
- [UX Pilot: 10 bad UX examples](https://uxpilot.ai/blogs/bad-ux-examples)
- [UpfrontOps: Bad UX Design—19 Websites That Missed the Mark](https://upfront-operations.webflow.io/blog/bad-ux-design-website)
- [Jeevi Academy: Common UI/UX Design Mistakes to Avoid](https://www.jeeviacademy.com/common-ui-ux-design-mistakes-to-avoid-complete-guide-for-designers/)

These articles are useful for generating hypotheses and concrete examples, but named-site critiques can become outdated and many numerical claims are repeated from secondary sources. This catalog therefore treats them as leads, not as the sole evidence base.

The synthesis was checked and expanded using more authoritative or research-oriented sources:

- [Nielsen Norman Group’s ten usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) for state, real-world language, control, consistency, prevention, recognition, efficiency, minimalism, recovery, and help.
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and the [WCAG Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/) for perceivable, operable, understandable, and robust web experiences.
- W3C guidance on [accessible forms](https://www.w3.org/WAI/tutorials/forms/), [control labels](https://www.w3.org/WAI/tutorials/forms/labels/), and [accessible web writing](https://www.w3.org/WAI/tips/writing/).
- GOV.UK guidance on [specific error messages](https://design-system.service.gov.uk/components/error-message/), [linked error summaries](https://design-system.service.gov.uk/components/error-summary/), and [task-centered design patterns](https://design-system.service.gov.uk/patterns/).
- [web.dev Core Web Vitals](https://web.dev/articles/vitals) for loading, responsiveness, and visual stability, plus its guidance on [keyboard accessibility](https://web.dev/articles/how-to-review) and [accessible responsive design](https://web.dev/articles/accessible-responsive-design).
- [UI Patterns](https://ui-patterns.com/patterns) as a vocabulary of reusable solutions, including input feedback, autosave, undo, good defaults, wizards, breadcrumbs, progressive disclosure, filters, blank slates, and onboarding patterns.
- Nielsen Norman Group research on [information architecture versus navigation](https://www.nngroup.com/articles/ia-vs-navigation/), [findability and discoverability](https://www.nngroup.com/articles/navigation-ia-tests/), [filters](https://www.nngroup.com/articles/applying-filters/), [carousels](https://www.nngroup.com/articles/designing-effective-carousels/), [login walls](https://www.nngroup.com/articles/login-walls/), and [optional registration](https://www.nngroup.com/articles/optional-registration/).
- Baymard’s research summaries on [e-commerce search](https://baymard.com/blog/ecommerce-search-query-types) and [checkout UX](https://baymard.com/learn/checkout-flow-ux-optimization).
- The US Federal Trade Commission’s report on [dark patterns](https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers), including disguised ads, obstructed cancellation, buried fees, and manipulative privacy choices.

Good practice is contextual. A recommendation should be tested with representative users, tasks, devices, abilities, environments, and failure consequences. A familiar pattern is a starting point, not an automatic answer.

## High-level research findings

1. **State and consequences matter as much as layout.** Many harmful interfaces look polished but fail to say what is selected, saved, live, included, charged, shared, or irreversible.
2. **Findability depends on both information architecture and navigation.** Moving a menu cannot repair categories and labels that do not match how users think.
3. **Error prevention is more valuable than an eloquent error message.** Constraints, useful defaults, review, undo, and scope previews prevent high-cost errors; precise errors then support recovery.
4. **Accessibility failures are often general usability failures at greater severity.** Small targets, low contrast, missing labels, keyboard traps, color-only states, and fixed layouts inconvenience many people and completely block some.
5. **Performance is UX.** Core Web Vitals treat loading, interaction responsiveness, and layout stability as user-centered outcomes, not merely engineering details.
6. **Patterns reduce learning cost when used for the problem they solve.** UI Patterns catalogs recurring solutions, but a pattern used mechanically—an unnecessary wizard, modal, carousel, or infinite feed—can create new problems.
7. **Ethical quality is UX quality.** False hierarchy, buried terms, preselection, disguised advertising, difficult cancellation, and privacy manipulation damage informed choice even if they improve a short-term conversion metric.
8. **Realistic bad interfaces should remain usable enough to investigate.** A workshop case is strongest when it contains a credible task, internally coherent product, and a mix of obvious and subtle defects—not random chaos.

---

# Detailed bad-versus-good catalog

## 1. User understanding and product strategy

| Bad practice | Why it causes problems | Better practice | Visible “bad interface” cue for future AI generation |
|---|---|---|---|
| Design from stakeholder assumptions without observing users. | The interface reflects internal beliefs rather than real goals, language, constraints, and workarounds. | Interview and observe representative users; test key tasks throughout development. | Navigation mirrors department names; important user task has no direct route. |
| Treat “the user” as one generic persona. | Novices, experts, administrators, visitors, keyboard users, and mobile users have different needs and permissions. | Identify primary roles and contexts; provide role-appropriate views on a consistent underlying model. | Same dashboard and actions shown to every role, including unavailable or hazardous ones. |
| Optimize only for conversion, clicks, or time-on-site. | Local metrics can reward interruption, confusion, compulsive behavior, or accidental action. | Pair business metrics with task success, error rate, comprehension, satisfaction, retention, accessibility, and trust. | Aggressive overlays and autoplay presented as “engagement.” |
| Add features without prioritizing tasks. | Feature accumulation produces crowded navigation and competing controls. | Rank tasks by frequency, importance, urgency, and consequence; layer secondary capabilities. | Several navigation systems and dozens of equally prominent actions. |
| Copy a competitor’s pattern without validating fit. | Similar-looking products may have different users, risks, content, or operating conditions. | Start from the user problem and test the pattern in context. | E-commerce-style card grid forced onto complex records or scientific configuration. |
| Treat usability testing as final approval. | Fundamental workflow errors become expensive to change and testing becomes cosmetic. | Test sketches and prototypes early; continue with production behavior and analytics. | Visually polished flow containing redundant steps and a late dead end. |

## 2. Information architecture and navigation

Information architecture defines relationships, grouping, taxonomy, and labels; navigation exposes that structure. Nielsen Norman Group warns that low findability can arise from either layer, so the cause should be tested rather than guessed ([IA versus navigation](https://www.nngroup.com/articles/ia-vs-navigation/); [findability testing](https://www.nngroup.com/articles/navigation-ia-tests/)).

| Bad practice | Why it causes problems | Better practice | Visible bad-interface cue |
|---|---|---|---|
| Organize the site around the organization chart. | Visitors usually think in goals and topics, not internal ownership. | Group by user tasks and recognizable topics; validate with card sorting and tree testing. | Top navigation says “Operations,” “Strategic Enablement,” and “Division 4.” |
| Hide primary desktop navigation behind an unexplained icon. | Important choices lose discoverability and users must remember to reveal them. | Keep high-priority destinations visible; label menu controls; reserve compact navigation for constrained viewports when appropriate. | Tiny hamburger in a corner on a wide desktop page. |
| Use vague or clever category labels. | Low information scent makes users guess which path contains the target. | Use specific, familiar, mutually distinguishable labels. | Links say “Discover,” “Explore,” “Solutions,” and “More.” |
| Mix task, topic, audience, and content-format categories at one level. | Overlapping classification makes several routes seem plausible. | Choose a dominant organizing principle and use filters or secondary navigation for other facets. | Menu contains “Researchers,” “Videos,” “Services,” and “Learn.” |
| Create very deep navigation. | Repeated branching increases effort and makes errors costly. | Flatten where meaningful, expose common destinations, and use breadcrumbs for hierarchical sites. | Six nested flyouts required to reach a common task. |
| Create an enormous ungrouped mega-menu. | Too many equal choices defeat scanning. | Group related items under descriptive headings and prioritize common paths. | Multi-column menu with dozens of alphabetized links and no section labels. |
| Change navigation placement or terminology across pages. | Users must relearn the site and may believe they changed products or contexts. | Use consistent global navigation and stable names; indicate current location. | “Account” becomes “Profile,” then “Settings” on successive pages. |
| Remove orientation cues. | Users cannot tell where they are or how the current page relates to the whole. | Use a unique page title, selected navigation state, breadcrumbs where helpful, and a clear route upward. | Generic heading “Details”; no selected menu item or breadcrumb. |
| Make the logo non-clickable or link it somewhere unexpected. | It violates a widespread recovery convention. | Link the top-left logo to the site home unless the product has a strong reason not to. | Logo is decorative while a hidden icon returns home. |
| Hide essential actions only in the footer. | Many users will not discover them during the task. | Place task-relevant actions in context; reserve the footer for global secondary information. | Support, save, or eligibility link appears only after a very long page. |
| Let internal and external links look identical when the distinction matters. | Users can unexpectedly lose context, enter a new service, or download a file. | Label downloads, file types, sizes, and external destinations when consequence matters. | “View” silently downloads a 300 MB PDF. |
| Use browser Back as the only workflow navigation without preserving state. | Users risk lost selections or accidental exit. | Provide visible Back/Cancel controls and preserve entered data and context. | Multistep form with only Submit and browser navigation. |

## 3. Page purpose, content, and microcopy

W3C recommends informative unique page titles, meaningful headings and links, clear instructions, concise content, and meaningful alternatives for images ([Writing for Web Accessibility](https://www.w3.org/WAI/tips/writing/)).

| Bad practice | Why it causes problems | Better practice | Visible bad-interface cue |
|---|---|---|---|
| Fail to state what the page is for. | Users cannot quickly decide whether they are in the right place. | Lead with a specific page title and short task-oriented explanation where needed. | Hero image with no heading, description, or clear action. |
| Use generic CTAs such as “Submit,” “Continue,” “Go,” or “Click here.” | The outcome and destination are unclear, especially out of context. | Label the outcome: “Send proposal,” “Review order,” “Download CSV,” or “Save draft.” | Several identical “Learn more” links. |
| Make button copy promise more than the function does. | False expectations erode trust and can cause accidental action. | Describe the actual result and any residual state. | “Delete permanently” merely hides an item, or “View” triggers a download. |
| Use internal jargon, codes, and unexplained acronyms as primary language. | Users must translate the system before acting. | Lead with user language; retain technical IDs as secondary detail when experts need them. | Error `AUTH-409_X7`; field `CUST_SEG_TYP`. |
| Write long walls of text without descriptive headings. | Scanning becomes difficult for visual and assistive-technology users. | Chunk content with informative headings, lists, summaries, and progressive detail. | Terms or instructions in an uninterrupted 1,500-word block. |
| Use headings for visual size only or skip semantic levels randomly. | The visible and programmatic structure diverge. | Use semantic heading hierarchy that accurately outlines the page. | Large styled paragraph used as title; multiple unrelated H1s. |
| Use placeholder text as the only form label. | Purpose disappears when users type, harming memory and accessibility. | Keep a persistent visible label; use placeholder only for supplementary examples. | Empty fields show “MM/DD/YYYY” and “Your info” with no labels. |
| Put essential instructions far from the decision point. | Users must remember rules and may discover them only after failure. | Place concise guidance beside the relevant control; link to deeper help. | Password rules shown only after rejection. |
| Use blame, humor, or vague apology in errors. | It adds emotion without helping recovery and may shame users. | State what happened and how to fix it in neutral, specific language. | “Oops! You did it wrong 😜.” |
| Publish stale or undated content as current guidance. | Users cannot judge validity. | Show meaningful publication/update dates, owners, and review status when freshness matters. | Policy page with “recently updated” but no date. |
| Repeat the same content across many panels. | Redundancy increases scanning cost and creates inconsistency when copies drift. | Establish a clear source of truth and reference it in context. | Three banners repeat similar but contradictory deadlines. |
| Overuse uppercase, centered body copy, or very long line lengths. | Reading speed and comprehension decline. | Use readable case, left alignment for long Latin-script text, and sensible measure. | Dense centered paragraph spanning the full viewport. |

## 4. Visual hierarchy and layout

| Bad practice | Why it causes problems | Better practice | Visible bad-interface cue |
|---|---|---|---|
| Give every element equal weight. | Users cannot identify the page purpose, primary action, or urgent state. | Use size, placement, spacing, contrast, and grouping to express priority. | Six identical cards, four blue buttons, and equally bold headings. |
| Use visual emphasis for decoration rather than importance. | Attention is pulled away from the task. | Reserve high contrast, saturated color, and motion for meaningful priority. | Promotional graphic dominates while the required action is a gray text link. |
| Confuse minimalism with hiding. | A sparse screen can withhold navigation, labels, state, and context. | Remove irrelevant information but keep decision-relevant context visible. | Full-screen photo with tiny icon-only navigation. |
| Confuse density with completeness. | More data can obscure relationships and anomalies. | Preserve expert density but group by task, emphasize change and exception, and offer details on demand. | Dashboard displays 80 metrics with no hierarchy or thresholds. |
| Use insufficient whitespace or arbitrary whitespace. | Crowding causes mis-grouping; excessive gaps hide relationships and increase scrolling. | Use spacing consistently to communicate grouping and sequence. | Labels appear closer to the wrong fields; related controls separated by a large void. |
| Misalign labels, values, and controls. | Comparison and association require extra eye movement. | Use a deliberate grid and align comparable values. | Decimal values ragged; labels alternate above and beside fields. |
| Let text overlap imagery or variable backgrounds. | Readability changes unpredictably across content and viewports. | Use a stable text surface, adaptive overlay, or separate content region. | White navigation disappears over a pale hero image. |
| Use too many fonts, type sizes, icon styles, shadows, and colors. | Inconsistency adds noise and makes semantics ambiguous. | Use a design system with a restrained, semantic visual vocabulary. | Each card looks imported from a different product. |
| Use small, pale secondary text for essential terms. | Material information is technically present but functionally hidden. | Give important terms adequate size, contrast, proximity, and plain language. | Price excludes a fee disclosed in 10 px light gray text. |
| Put sticky elements over content. | Focused controls, errors, and last rows can become obscured. | Reserve space, test zoom and small viewports, and ensure focused items remain visible. | Cookie bar covers Submit; sticky header hides anchor targets. |

## 5. Controls, affordances, and action hierarchy

| Bad practice | Why it causes problems | Better practice | Visible bad-interface cue |
|---|---|---|---|
| Make noninteractive elements look clickable. | Users waste effort and lose confidence. | Reserve link/button styling for interactive elements. | Blue underlined headings that do nothing. |
| Make interactive elements look like plain text or decoration. | Actions are not discoverable. | Provide clear shape, label, state change, and pointer/focus feedback. | Card is clickable but has no signifier except cursor change on hover. |
| Use icons without labels for unfamiliar or consequential actions. | Icon interpretation varies by culture, platform, and domain. | Pair specialized icons with visible text; provide accessible names. | Unlabeled wand, cloud, and lightning icons in a toolbar. |
| Put destructive and routine actions together with identical styling. | Motor slips can have disproportionate consequences. | Separate by location and hierarchy; label consequences; support undo or targeted confirmation. | “Save,” “Archive,” and “Delete all” are adjacent blue buttons. |
| Make multiple actions primary. | Users cannot see the intended next step. | Choose one primary action per decision region; style alternatives by importance. | Three filled high-contrast CTAs in one modal. |
| Disable a control without explaining why. | Users cannot diagnose what prerequisite is missing. | Explain the condition near the disabled action or allow activation and give precise guidance. | Pale disabled “Continue” with no nearby errors. |
| Make an unavailable control appear enabled. | Users repeatedly click with no result. | Reflect availability honestly and provide feedback. | Bright button silently ignores clicks. |
| Trigger high-consequence action on one accidental click. | There is no opportunity to catch a slip. | Use review, staged changes, undo, or consequence-specific confirmation proportional to risk. | Single-click “Delete workspace” beside “Edit.” |
| Confirm every trivial action. | Users habituate and dismiss confirmations, weakening important ones. | Confirm only significant, difficult-to-reverse actions; use undo for routine actions. | “Are you sure?” after every checkbox change. |
| Use a vague confirmation dialog. | Users still cannot assess target or consequence. | Name the action, exact target, affected count, consequence, and safe alternative. | “Are you sure you want to proceed? OK / Cancel.” |
| Require hover for core information or actions. | Hover is unavailable to touch and can be difficult for keyboard or motor-impaired users. | Keep essential content visible or make it available through focus and activation. | Prices, labels, and edit controls appear only on mouse hover. |
| Use drag-and-drop as the only method. | Some users cannot perform precise dragging; WCAG 2.2 requires a non-drag alternative when dragging is not essential. | Add move buttons, menus, keyboard operations, or direct value entry. | Schedule items can only be dragged to a narrow time slot. |

## 6. Forms and data entry

W3C’s forms tutorial recommends asking only for necessary information, identifying controls with labels, grouping related controls, and providing instructions and feedback ([W3C Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/)). WCAG 2.2 also addresses redundant entry in the same process ([WCAG 2.2](https://www.w3.org/TR/WCAG22/)).

| Bad practice | Why it causes problems | Better practice | Visible bad-interface cue |
|---|---|---|---|
| Ask for information that is not needed for the task. | Effort, privacy concern, and abandonment increase. | Request the minimum necessary; explain why sensitive or surprising data is needed. | Newsletter form requires phone, address, employer, and birth date. |
| Ask users to re-enter data already supplied in the same process. | Redundant work introduces mismatch and violates current accessibility guidance unless essential. | Auto-populate or let users select prior information; make deliberate edits possible. | Resume uploaded, then every resume field must be typed again. |
| Use missing, ambiguous, or programmatically unassociated labels. | Users cannot reliably identify the control; assistive technology loses context. | Use persistent descriptive labels correctly associated with controls. | Rows of empty rectangles identified only by nearby icons. |
| Omit units, valid ranges, formats, or timezone. | A syntactically valid value can still be dangerously wrong. | Put units and constraints beside the field; use suitable input types and sensible defaults. | Field “Duration” accepts `5` with no indication of seconds or hours. |
| Split data into unnecessary fields. | Extra tabbing and formatting increase error. | Accept forgiving input and normalize it; split only when it materially improves the task. | Phone number divided into four tiny boxes. |
| Reject harmless format variation. | Users must translate valid information into the system’s arbitrary syntax. | Accept spaces, punctuation, case, and common formats where meaning is unambiguous. | Card number rejected because it contains spaces. |
| Use a dropdown for a very small binary choice. | It hides options and adds interaction. | Use radio buttons, checkboxes, or a clearly labeled switch as appropriate. | Dropdown containing only Yes and No. |
| Use a huge dropdown for hundreds of options. | Scrolling and exact matching are slow. | Use autocomplete/search with keyboard support and recognizable labels. | Country or instrument list with 500 unsorted entries. |
| Use a date picker as the only input for distant dates. | Navigating months or years is costly and inaccessible for some users. | Allow typed dates with examples; use a picker when visual calendar context helps. | Birth year requires 600 previous-month clicks. |
| Break browser autofill, paste, password managers, or native input behavior. | Users lose safe, efficient tools and must type error-prone data. | Use semantic fields and autocomplete tokens; allow paste and password managers. | Password field blocks paste and exposes no show-password control. |
| Choose a harmful default. | Many users accept defaults without noticing; consequences scale. | Default to common, reversible, privacy-preserving, and low-risk choices; show assumptions. | Marketing opt-in, public sharing, overwrite, or auto-renew is preselected. |
| Provide no review for costly submissions. | Users cannot catch wrong addresses, quantities, recipients, or configurations. | Offer a concise check-answers step with edit links before commitment. | Purchase or proposal submits directly from the last data-entry field. |
| Clear fields after a validation or server error. | Work is lost and correction cost multiplies. | Preserve all valid input; focus the first issue and retain a draft for long forms. | Twenty-field form returns blank after one invalid date. |
| Time out silently or discard a long draft. | Interruptions and accessibility needs turn into catastrophic loss. | Warn early, offer extension/re-authentication, autosave securely, and restore drafts. | Countdown appears in final minute with no extension. |

## 7. Validation, errors, and recovery

GOV.UK recommends specific, concise, positively phrased errors that say what happened and how to fix it; its error summary links to each affected input and uses the same wording as the inline message ([error messages](https://design-system.service.gov.uk/components/error-message/); [error summaries](https://design-system.service.gov.uk/components/error-summary/)).

| Bad practice | Why it causes problems | Better practice | Visible bad-interface cue |
|---|---|---|---|
| Validate only after final submission. | Users face a large, delayed correction burden. | Validate at meaningful moments, such as after leaving a field or completing a step. | “12 errors” appears only after a five-page form. |
| Show errors before the user has finished typing. | Premature red states interrupt thought and feel hostile. | Wait until the input is meaningfully complete or the user moves on. | Email becomes red after typing the first character. |
| Say only “Invalid input” or show an error code. | Users do not know where, why, or how to recover. | Name the field/problem and acceptable correction in user language. | Toast: `Validation failed: 0x00431`. |
| Use color or a border as the only error indicator. | Some users will not perceive it; the remedy remains unknown. | Add associated text, icon where useful, and an accessible error relationship. | One field gets a red outline with no message. |
| Put all errors at the top without links or inline messages. | Users must search and remember. | Combine a focused, linked summary with matching inline messages. | Static list says “Some fields are wrong.” |
| Use different wording in summary and field. | Users may not know whether the messages refer to the same problem. | Reuse specific wording and link directly to the control. | Summary says “Date error”; field says “Invalid value.” |
| Blame the user. | It increases frustration without improving performance. | Describe the system requirement neutrally and constructively. | “You failed to enter a valid ID.” |
| Prevent error only with a generic confirmation. | Confirmations do not repair misunderstanding or memory burden. | Constrain values, show scope and preview, provide safe defaults, then confirm high-risk consequences specifically. | Confirmation appears after accepting an impossible range. |
| Offer no undo, retry, draft, or restoration. | A small mistake becomes expensive or permanent. | Support reversible actions, retries, version history, and recovery checkpoints. | Closing a modal destroys an hour of configuration. |
| Hide partial success. | Users may repeat successful operations or assume everything failed. | State which items succeeded, which failed, and how to retry only failures. | Batch upload says “Error” after 98 of 100 files succeeded. |
| Use warning styling for harmless information. | Alert fatigue makes real danger less noticeable. | Reserve urgent styling for urgent, actionable states. | Every helper note uses a red triangle. |
| Remove an error as soon as it is acknowledged even though the condition persists. | Attention state is confused with system state. | Represent condition, acknowledgement, and resolution separately. | “Acknowledge all” makes active faults disappear. |

## 8. System status, progress, feedback, and notifications

Visibility of system status is the first Nielsen heuristic. Feedback should communicate the outcome of prior actions and help determine the next step ([ten heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)).

| Bad practice | Why it causes problems | Better practice | Visible bad-interface cue |
|---|---|---|---|
| Give no feedback after activation. | Users cannot tell whether the click registered and may repeat it. | Provide immediate pressed/loading state and eventual success or error at the result location. | Button looks unchanged after click. |
| Show a spinner with no task, scope, or duration. | Users cannot judge progress or whether the system is stuck. | Name the operation and show determinate progress, current phase, elapsed/remaining time when possible, and safe cancellation. | Modal says only “Processing…” indefinitely. |
| Say “Success” without naming what changed. | Users must hunt for the result and may misinterpret scope. | State the completed action, target, location, and next useful action. | Green toast “Done!” while the page remains unchanged. |
| Present stale information as live. | Decisions are made from outdated state. | Show last update, connection/quality, and conspicuous stale or disconnected treatment. | Green LIVE badge beside a timestamp from 20 minutes ago. |
| Confuse requested, queued, saved, published, sent, and applied states. | Users assume a local intention has affected the shared or physical system. | Label each lifecycle state and transition explicitly. | Toast “Updated” while button says “Publish changes.” |
| Hide autosave status. | Users cannot safely navigate away or trust persistence. | Show Saving, Saved with timestamp, Offline, and Save failed; warn on departure when needed. | “Autosaved” timestamp is an hour old with no warning. |
| Use toasts for information users must act on later. | Temporary messages disappear before resolution. | Keep persistent actionable problems near the relevant object or in an inspectable notification center. | Import warning vanishes after four seconds. |
| Send excessive, irrelevant, or duplicate notifications. | Attention becomes saturated and important signals are ignored. | Prioritize by relevance and urgency; choose channels deliberately; provide simple preference controls. | Same low-priority update arrives by email, push, SMS, and in-app. |
| Put notification settings behind many nested screens. | Users cannot regain control. | Provide category-level controls, channel summaries, and sensible low-noise defaults. | Four clicks required to disable each of 30 notification types. |
| Use badges with unexplained counts. | The number creates anxiety without indicating action or priority. | Explain categories, allow triage, and clear counts when genuinely resolved. | Red badge `99+` opens a mixed feed. |
| Use sound alone or allow critical sound to remain silently muted. | Deaf users or muted environments miss signals; operators may forget muted state. | Use redundant visual/haptic cues and keep mute state conspicuous with restoration/escalation rules. | Tiny footer note says “alerts muted.” |
| Auto-refresh while the user is reading or interacting. | Content moves, selection is lost, and focus may jump. | Preserve position, announce updates, and let users review or pause live changes. | Result list reorders every few seconds. |

## 9. Search, filtering, sorting, and results

Large information spaces need both sound structure and effective search. Filters should use categories and values meaningful to user intent, avoid disruptive refresh behavior, and reveal useful result counts ([filter design](https://www.nngroup.com/articles/applying-filters/); [filter categories](https://www.nngroup.com/articles/filter-categories-values/)). Baymard’s search research shows that several medium-level problems can accumulate into abandonment ([e-commerce search](https://baymard.com/blog/ecommerce-search-query-types)).

| Bad practice | Why it causes problems | Better practice | Visible bad-interface cue |
|---|---|---|---|
| Hide search or represent it with only a subtle icon on a large site. | Search-oriented users cannot start their preferred path. | Use a visible, clearly scoped search field in a consistent location. | Magnifying glass appears only in footer or collapsed menu. |
| Fail to show search scope. | Users cannot tell whether they searched the site, project, category, or current page. | Label scope and make it changeable when multiple scopes matter. | Results title says only “12 matches.” |
| Erase the query on the results page. | Users cannot refine spelling or intent. | Preserve the query visibly and allow direct editing. | Empty search field after submission. |
| Require exact wording, spelling, punctuation, or singular/plural. | Users receive false zero results for valid intent. | Support common variants, typo tolerance, synonyms, and domain terminology while showing what was interpreted. | “No results” for `x ray` when only `X-ray` works. |
| Return zero results without recovery. | The journey ends without alternatives. | Suggest corrected terms, related categories, removed filters, and help. | Blank page reading “0.” |
| Use filters whose labels reflect database fields. | Users cannot predict their effect. | Use familiar, specific categories and values ordered by usefulness. | Filters `CAT_T2`, `STAT_CD`, and `MOD_DT`. |
| Apply every filter immediately and jump the page. | Repeated refresh disrupts multi-filter selection. | Choose immediate or explicit Apply behavior based on context; preserve viewport and announce result count. | Page returns to top after each checkbox. |
| Hide active filters. | Users cannot explain missing results. | Show removable filter chips and a clear-all action; persist relevant state. | “No results” while a collapsed panel contains five active filters. |
| Omit result counts or counts per facet. | Users cannot anticipate dead ends or compare paths. | Show counts when accurate and update them predictably. | Category links give no indication one contains zero items. |
| Reset filters, sort, pagination, or scroll position after viewing a result. | Comparison becomes laborious. | Restore the exact result state and visited position. | Back returns to default list page 1. |
| Use ambiguous sorting. | Users cannot predict order or distinguish relevance from recency. | Label the sort criterion and direction; choose a context-appropriate default. | Dropdown says “Recommended” with no explanation. |
| Mix sponsored and organic results without clear labels. | Users mistake paid placement for relevance. | Clearly and consistently label advertising and ranking influence. | Ad card visually identical to first organic result. |

## 10. Tables, dashboards, and data-heavy interfaces

UI Patterns includes table filtering, sort-by-column, dashboards, categorization, pagination, and adaptable views as reusable solutions for data-heavy work ([UI Patterns catalog](https://ui-patterns.com/patterns)).

| Bad practice | Why it causes problems | Better practice | Visible bad-interface cue |
|---|---|---|---|
| Show many numbers without labels, units, ranges, or timestamps. | Values cannot support a decision. | Add clear metric name, unit, acceptable range/benchmark, freshness, and relevant trend. | Card shows a red `12.7` and nothing else. |
| Use color alone for status or series identity. | Meaning is unavailable to some users and weak on projectors or grayscale. | Combine color with text, icon, pattern, line style, shape, or position. | Red/green dots with no legend or state label. |
| Make all alerts equally urgent. | Important anomalies drown in noise. | Prioritize by consequence and urgency; group cascades and show root-cause evidence cautiously. | Every row is red and blinking. |
| Present raw technical identifiers as the only labels. | Cross-role and new users diagnose slowly. | Lead with plain descriptions and keep tags as secondary searchable identifiers. | Table dominated by `PV_B07_0142`. |
| Truncate unique record names without recovery. | Similar records become indistinguishable. | Allow resizing, wrapping, hover/focus details, or show distinguishing suffixes. | Ten rows display `Experiment-2026-…`. |
| Omit sorting/filter state from the header. | Users cannot explain the current view. | Mark active sort direction, filter count, scope, and reset behavior. | Table order changes but no arrow or label appears. |
| Freeze too little context in a large table. | Row identity or column meaning is lost while scrolling. | Use sticky headers/identifier columns without obscuring focus or content. | User horizontally scrolls and can no longer see record name. |
| Freeze too much interface chrome. | Data viewport becomes tiny and focused cells are hidden. | Preserve only task-critical context and test zoom/small screens. | Three sticky bars leave four visible data rows. |
| Hide missing, stale, estimated, and not-applicable values behind the same dash. | Semantically different states become indistinguishable. | Use explicit representations with accessible explanations. | `—` means zero, unavailable, not collected, and not applicable. |
| Imply false precision. | Display suggests greater measurement accuracy than exists. | Use scientifically meaningful precision and show uncertainty/quality when relevant. | Sensor accuracy ±0.1 shown as `12.734928`. |
| Transform or smooth data without prominent disclosure. | Processed information may be mistaken for raw evidence. | Keep processing state visible, show parameters/history, preserve raw data, and include provenance in export. | “Smooth” is active only as a tiny blue icon. |
| Use bulk actions without scope preview. | A single change can affect unintended records. | Show selected count and identity, before/after preview, validation, staged commit, and undo. | “Apply to all” beside a value with no affected count. |

## 11. Accessibility and inclusive interaction

WCAG 2.2 includes requirements covering keyboard access, focus visibility, non-color cues, reflow, labels, status messages, dragging alternatives, target size, consistent help, redundant entry, and accessible authentication. The minimum pointer target criterion is generally 24×24 CSS pixels with defined exceptions ([WCAG 2.2](https://www.w3.org/TR/WCAG22/)).

| Bad practice | Why it causes problems | Better practice | Visible bad-interface cue |
|---|---|---|---|
| Use low-contrast text or controls. | Content becomes difficult or impossible to perceive under low vision, glare, projection, or poor displays. | Meet contrast requirements and test real states, including disabled and placeholder text. | Light gray 11 px text on white. |
| Encode status, errors, or required fields through color alone. | Color-vision differences or monochrome contexts remove the meaning. | Add text, symbols, patterns, and programmatic state. | Required fields identified only by red borders. |
| Remove visible keyboard focus. | Keyboard users lose their location. | Provide a high-contrast visible focus indicator that is not obscured. | CSS-like appearance where tabbing causes no visible change. |
| Create illogical focus order. | Interaction sequence no longer matches the visible page. | Align DOM, reading, and visual order; manage focus after meaningful dynamic changes. | Tab jumps from header to footer to middle form. |
| Create a keyboard trap. | Users cannot leave a widget or modal. | Support standard navigation and Escape/close behavior; return focus to the trigger. | Focus cycles inside date picker with no exit. |
| Use custom controls without name, role, value, or keyboard behavior. | Assistive technology cannot identify or operate them. | Prefer semantic native controls; implement full accessible behavior when custom UI is necessary. | Clickable `div` styled as switch. |
| Provide small or tightly packed targets. | Motor, touch, tremor, and rushed-use errors increase. | Meet target-size/spacing guidance and enlarge the clickable label area. | 14 px close icon directly beside another icon. |
| Require precise pointer gestures. | Dragging, path gestures, and hover exclude some input methods. | Offer single-pointer and keyboard alternatives. | Slider is the only way to set an exact numeric value. |
| Prevent text zoom or break at 200–400% zoom. | Low-vision users lose content or functionality. | Use responsive reflow, flexible text, and layouts that survive magnification. | Fixed two-column form overlaps when text enlarges. |
| Hide content offscreen while leaving it in focus order. | Screen-reader and keyboard users encounter invisible controls. | Remove/inert hidden content and manage expanded/collapsed states correctly. | Closed mobile drawer links remain tabbable. |
| Use images of text for essential content. | Text cannot reflow, scale, translate, or adapt to user preferences. | Use real text except where a specific visual rendering is essential; provide alternatives. | Pricing and instructions embedded in a promotional image. |
| Omit useful alternative text or use filenames as alt text. | Nonvisual users lose purpose and context. | Write concise alternatives based on the image’s function; use empty alt for decorative images. | `alt="IMG_4827_final.jpg"`. |
| Provide video without captions/transcript or audio without control. | Deaf, hard-of-hearing, situationally muted, and some cognitive users lose access. | Provide accurate captions/transcripts and user-controlled playback. | Essential instructions exist only in autoplay video. |
| Use motion, flashing, or parallax without reduction controls. | Motion can distract, induce nausea, or trigger health risks. | Respect reduced-motion preferences; avoid unnecessary flashing and offer pause/stop. | Continuous animated background behind form text. |
| Use CAPTCHAs that depend on a single sensory or cognitive ability. | Legitimate users are blocked. | Prefer risk-based methods and accessible alternatives; do not make verification harder than the task. | Distorted visual puzzle with no alternative. |
| Make authentication depend on memory puzzles or blocked paste. | Cognitive and motor burden rises; password managers fail. | Support password managers, paste, passkeys/appropriate alternatives, and accessible verification. | “Type characters 2, 7, and 11 of your password.” |

## 12. Responsive and mobile UX

Responsive design also supports users who magnify content: the layout should reflow rather than require two-dimensional panning ([accessible responsive design](https://web.dev/articles/accessible-responsive-design)).

| Bad practice | Why it causes problems | Better practice | Visible bad-interface cue |
|---|---|---|---|
| Shrink the desktop page to mobile size. | Text and controls become tiny while layout relationships break. | Reflow and reprioritize content for the viewport while preserving task continuity. | Full desktop navigation compressed into 320 px. |
| Require horizontal scrolling for ordinary page content. | Users lose context and must pan in two dimensions. | Use responsive grids, wrapping, alternative table views, and intentional overflow only where essential. | Form label is left of a field beyond the screen edge. |
| Hide key functionality on mobile without an alternative. | Mobile users receive an incomplete product. | Adapt the interaction rather than simply removing the task. | “This feature is available on desktop only” for a routine action. |
| Put important controls near device/system gesture zones. | Accidental navigation and difficult reach increase. | Respect safe areas and comfortable reach; keep controls adequately sized and spaced. | Tiny destructive button at extreme bottom edge. |
| Ignore on-screen keyboard effects. | The active field or Submit button becomes obscured. | Scroll focused fields into view and test keyboard types and orientation changes. | Keyboard covers validation and Next. |
| Use the wrong mobile input type. | Extra keyboard switching and errors occur. | Use appropriate semantic input types and autocomplete attributes. | Numeric code opens alphabetic keyboard. |
| Depend on hover or right-click. | Touch users cannot discover or invoke actions. | Provide visible tap/focus interactions and explicit action menus. | Edit appears only when a mouse hovers over a row. |
| Place two small actions inside one touch target area. | Users trigger the wrong outcome. | Separate targets and increase their size. | Card tap opens detail while a tiny overlaid star favorites it. |
| Reset the flow on rotation, resize, or breakpoint change. | Entered work and context are lost. | Preserve state across responsive layout transitions. | Rotating the device returns to step 1. |
| Serve very large desktop assets to small devices. | Load time, data use, memory, and battery suffer. | Use responsive images, appropriate formats/sizes, and progressive loading. | 12 MB hero image rendered at 360 px wide. |

## 13. Performance and technical resilience

Core Web Vitals currently cover loading through Largest Contentful Paint, responsiveness through Interaction to Next Paint, and visual stability through Cumulative Layout Shift. web.dev recommends measuring real-user performance at the 75th percentile for both mobile and desktop ([Web Vitals](https://web.dev/articles/vitals)).

| Bad practice | Why it causes problems | Better practice | Visible bad-interface cue |
|---|---|---|---|
| Delay meaningful content behind a long blank or branded loader. | Users cannot assess value or start the task. | Render useful structure/content early and progressively enhance. | Full-page animated logo for several seconds. |
| Make interactions visibly lag. | Users repeat actions, lose confidence, and make errors. | Reduce main-thread work, give immediate feedback, and measure real-user INP. | Button responds seconds later with no pressed state. |
| Allow layout shifts during reading or clicking. | Users lose place or activate the wrong target. | Reserve media/ad space, stabilize fonts and injected content, and monitor CLS. | Late ad pushes “Cancel” under the pointer as user clicks. |
| Load oversized images, fonts, trackers, and scripts eagerly. | Network and processing costs delay the task. | Optimize, subset, defer, lazy-load below-fold assets, and remove low-value third parties. | Five webfonts and autoplay background video before content. |
| Build a loading skeleton that does not match final layout. | The interface shifts and creates false expectations. | Make placeholders structurally representative and accessible; avoid unnecessary animation. | Skeleton has three cards, final content has a tall table. |
| Fail completely on a slow or interrupted connection. | Users lose work or see ambiguous partial state. | Design explicit offline/degraded states, retries, resumable transfer, and local draft preservation where appropriate. | Save spinner continues forever after connection loss. |
| Retry non-idempotent actions silently. | Duplicate orders, messages, or submissions can result. | Design safe retry semantics and show transaction identity/status. | Double order appears after page refresh. |
| Use generic 404/500 pages with no recovery. | Users reach a dead end. | Explain the problem, preserve navigation/search, and offer likely next steps or status information. | Bare “500 Internal Server Error.” |
| Ignore actual device/network variation. | Lab performance hides field failures. | Test representative low-end devices, networks, locales, zoom, and assistive tech; monitor field data. | Site works only on a developer’s high-end desktop. |
| Block the whole interface for a long operation. | Users cannot continue useful work. | Use background jobs, progress, notifications, and safe pause/cancel/retry. | Multi-hour export requires modal and tab to remain open. |

## 14. Pop-ups, overlays, media, animation, and interruption

The supplied articles repeatedly flag intrusive pop-ups and autoplay. WCAG requires controls for autoplaying audio beyond brief limits, and Nielsen Norman Group cautions that auto-forwarding carousels and overlays can reduce visibility and control ([WCAG Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/); [carousel guidance](https://www.nngroup.com/articles/designing-effective-carousels/)).

| Bad practice | Why it causes problems | Better practice | Visible bad-interface cue |
|---|---|---|---|
| Show a newsletter or sales modal immediately on arrival. | It interrupts before the user understands the site’s value. | Ask at a contextually relevant time and keep dismissal easy and durable. | Full-screen signup appears over the page title. |
| Stack cookie, chat, newsletter, app-download, and notification prompts. | The page becomes an obstacle course. | Sequence only necessary requests and defer optional prompts. | Four overlapping layers on first load. |
| Make the close control tiny, low contrast, delayed, or moving. | Users are trapped or accidentally accept. | Provide a stable, prominent close action and Escape behavior. | Gray × blends into a photo after a countdown. |
| Auto-play video or audio without user intent. | It removes control, consumes resources, and creates accessibility problems. | Default to paused and muted preview only when justified; provide obvious controls and remember preference. | Hovering over any card starts loud video. |
| Auto-advance carousel content too quickly. | Users cannot read, interact, or revisit content; focus may shift. | Prefer static content; if carousel is necessary, pause on interaction, provide controls and indicators, and avoid hiding critical content in later slides. | Hero changes every three seconds with tiny dots. |
| Use animation that delays the task. | Decorative transitions add interaction cost. | Keep motion purposeful, brief, interruptible, and reduced when requested. | Page requires a long scroll-jacking intro before navigation. |
| Put essential information only inside a modal. | Linking, comparison, history, and mobile use suffer; focus errors can trap users. | Use a page or nonmodal panel for substantial workflows; reserve modal dialogs for focused decisions. | Account settings implemented as six nested modals. |
| Open unexpected new windows/tabs. | Back behavior and context become confusing. | Reuse the current context by default; warn when a new context is necessary. | Every internal content link opens a new tab. |
| Use an overlay for a nonurgent message that blocks progress. | The interruption is disproportionate. | Use inline or nonmodal status communication based on urgency. | “Try our new theme” blocks checkout. |
| Trigger prompts based on accidental cursor movement or exit intent. | Users feel surveilled and interrupted. | Use explicit, user-initiated actions or genuinely helpful recovery prompts. | Mouse moving toward browser bar opens a discount trap. |

## 15. Onboarding, authentication, accounts, and permissions

Nielsen Norman Group’s usability research finds login walls and forced registration costly, particularly before users understand the product’s value; guest checkout and optional account creation reduce friction ([login walls](https://www.nngroup.com/articles/login-walls/); [optional registration](https://www.nngroup.com/articles/optional-registration/)).

| Bad practice | Why it causes problems | Better practice | Visible bad-interface cue |
|---|---|---|---|
| Force login before showing ordinary public value. | Users pay a high cost before knowing whether the product helps them. | Let users browse or try safe features; authenticate when identity is actually required. | Landing page is only Sign in/Create account. |
| Force account creation for a one-time transaction. | Password and privacy concerns block task completion. | Offer guest completion; invite optional account creation after success with user-centered benefits. | Checkout lacks guest option. |
| Hide whether an email already has an account. | Users oscillate between login and registration. | Support a clear, privacy-conscious identifier-first or unified flow with recovery. | “Email already used” offers no sign-in route. |
| Use unexplained or contradictory password rules. | Trial-and-error and weak workarounds increase. | Show rules before entry, allow password managers and paste, provide show password, and validate clearly. | Rules appear one at a time after each rejection. |
| Use security theater that adds friction without proportional protection. | Users are burdened and may adopt unsafe coping behavior. | Match authentication strength to risk; use accessible modern methods and remember trusted context appropriately. | Repeated CAPTCHA and security questions for low-risk browsing. |
| Request permissions before explaining benefit and context. | Users deny or distrust the request. | Ask just in time, explain why and what changes, and allow later adjustment. | Location permission opens immediately at page load. |
| Show controls the user lacks permission to use, then fail late. | Users invest effort in an impossible path. | Communicate access early, explain how to request it, and preserve work if permissions change. | Long form fails on Submit with “Forbidden.” |
| Log users out without warning or draft preservation. | Work is lost and interruption becomes severe. | Warn, extend/re-authenticate safely, preserve the task, and restore context. | Session expires while typing and redirects to login. |
| Make sign-out, account deletion, export, or cancellation hard to find. | Users cannot exercise control over account and data. | Place account controls in predictable locations with clear consequences and recovery periods where appropriate. | Delete account requires contacting support while signup took one click. |
| Conflate authentication, authorization, and system failure. | Users cannot choose the correct recovery. | Distinguish “sign in,” “request access,” “session expired,” and “service unavailable.” | Every failure returns “Invalid credentials.” |

## 16. Commerce, pricing, trust, consent, and dark patterns

The FTC identifies disguised advertising, obstructed cancellation, buried fees or terms, unwanted cart additions, and interfaces that steer people into sharing more data as common dark-pattern families ([FTC dark-pattern report](https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers)). These are not merely stylistic mistakes; they undermine informed and voluntary choice.

| Bad practice | Why it causes problems | Better practice | Visible bad-interface cue |
|---|---|---|---|
| Reveal mandatory fees late. | Users cannot compare total cost and may feel trapped by sunk effort. | Show total price and mandatory charges early; update it clearly as choices change. | $40 item becomes $67 only on final payment screen. |
| Add products, insurance, tips, or subscriptions by default. | Inaction is converted into unintended spending. | Require explicit, unbundled opt-in with clear price and duration. | Prechecked protection plan in cart. |
| Use false visual hierarchy. | Styling steers users toward the business-preferred choice regardless of their interest. | Give materially equivalent choices comparable prominence and plain consequences. | Huge bright Accept All beside tiny gray “Manage.” |
| Use confirmshaming or fear-inducing copy. | Emotional pressure substitutes for informed value. | Let users decline neutrally and explain genuine consequences factually. | “No thanks, I hate saving money.” |
| Use fake scarcity or resettable countdowns. | False urgency impairs deliberation. | Display verifiable availability or deadlines and remove manufactured pressure. | Timer restarts after refresh. |
| Disguise advertisements as download buttons or editorial content. | Users take unintended and potentially unsafe actions. | Clearly label sponsorship and visually separate ads from task controls. | Large green “DOWNLOAD” ad beside tiny real link. |
| Make cancellation substantially harder than signup. | Users are trapped in recurring charges. | Provide a direct, self-service cancellation path with clear effective date and confirmation. | One-click subscribe; six-screen cancel maze with retention offers. |
| Hide key terms in tooltips, tiny text, or dense legal blocks. | Material limitations are functionally absent at decision time. | Summarize important terms in plain language beside the choice, with full details available. | Auto-renewal disclosed below button in pale 9 px text. |
| Use trick questions or double negatives. | Users select the opposite of their intent. | Phrase choices positively and consistently. | Checkbox: “Do not uncheck if you don’t want emails.” |
| Preselect maximum data sharing. | Default bias undermines meaningful privacy choice. | Use privacy-preserving defaults and granular, comprehensible controls. | All partners toggled on before consent. |
| Make reject/withdraw consent harder than accept. | Choice is not symmetrical or freely manageable. | Offer equivalent accept/reject paths and easy later changes. | Accept All on first layer; reject requires opening 20 vendor toggles. |
| Sneak items or options into the cart. | Contents and total no longer reflect user intent. | Require explicit addition and show every change immediately. | Donation or accessory appears without action. |
| Mix included and paid content without prominent distinction. | Users repeatedly encounter bait-and-switch outcomes. | Label price/access status on browsing cards and provide filters. | Tiny bag icon is the only signal that a movie costs extra. |
| Display ratings without sample size or source. | Weak evidence appears authoritative. | Show rating count, source, distribution, date, and verified status where meaningful. | Five stars based on one review. |
| Use endless retention prompts after a clear decision. | Nagging raises exit cost and disrespects autonomy. | Confirm the choice once, offer optional alternatives without blocking, and complete it. | Cancel button opens successive discount and survey screens. |

## 17. E-commerce and transactional flows

Baymard’s checkout research emphasizes concise flows, editable/verifiable inputs, precise errors, preservation of fields, and reduction of unnecessary friction ([checkout UX guide](https://baymard.com/learn/checkout-flow-ux-optimization)).

| Bad practice | Why it causes problems | Better practice | Visible bad-interface cue |
|---|---|---|---|
| Hide cart contents or order total during checkout. | Users cannot verify the transaction. | Keep an accessible summary with quantities, fees, discounts, and edit routes. | Final Pay screen shows only a button. |
| Make quantity changes or removal difficult. | Users abandon rather than correct the order. | Provide visible, appropriately sized quantity and remove controls with immediate total updates. | Tiny unlabeled × deletes an item permanently. |
| Split checkout into unnecessary steps. | Each step adds delay and another failure opportunity. | Ask only necessary information in a logical sequence; show progress honestly. | Eight-step checkout includes separate salutation and marketing pages. |
| Hide guest checkout. | Users assume registration is mandatory. | Give Guest checkout appropriate prominence and explain optional account creation later. | Guest link appears under the fold in small text. |
| Delay shipping cost or delivery date until after address/payment. | Users cannot judge the offer early. | Provide estimates early and refine transparently as location becomes known. | Product says “free shipping” then adds handling at review. |
| Reject a coupon with vague feedback. | Users cannot tell whether it expired, is inapplicable, or mistyped. | State the specific condition and preserve the code for correction. | “Coupon invalid.” |
| Apply a coupon but hide the changed total. | Users cannot confirm success. | Show discount amount and updated total beside the code and in the summary. | Green check but price appears unchanged. |
| Use address validation that overwrites user data silently. | Correct local or unusual addresses can be corrupted. | Offer suggested normalization versus entered address and let the user choose. | Address changes after blur with no notice. |
| Make payment failure destroy cart or form state. | Recovery cost is disproportionate. | Preserve order and entered non-sensitive data; identify the problem and offer alternatives. | Declined card returns to an empty cart. |
| Place recurring-subscription terms only after payment details. | Users cannot give informed consent. | State cadence, amount, trial conversion, renewal, cancellation, and reminders before commitment. | Button says “Start free” with monthly price hidden below. |

## 18. Help, onboarding, empty states, and learning

UI Patterns identifies contextual help, steps left, completeness meters, blank slates, guided tours, input prompts, autosave, and good defaults as reusable patterns. Nielsen’s help heuristic says documentation should be searchable, task-focused, concise, and concrete ([UI Patterns](https://ui-patterns.com/patterns); [Nielsen heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)).

| Bad practice | Why it causes problems | Better practice | Visible bad-interface cue |
|---|---|---|---|
| Force every user through a long product tour. | It delays value and is forgotten before relevant context occurs. | Make onboarding skippable, role-aware, and task-based; teach features in context. | Twelve mandatory coachmarks before the user can explore. |
| Explain obvious controls while leaving domain concepts unexplained. | Help addresses implementation rather than user uncertainty. | Prioritize unfamiliar decisions, terminology, consequences, and examples. | Tooltip says “Click Save to save” but never defines “publication state.” |
| Use empty states that only say “Nothing here.” | Users do not know whether it is normal, filtered, failed, or how to proceed. | Explain the state and offer the most likely next action, examples, or filter reset. | Blank panel with a sad illustration. |
| Put all help in a large manual. | Users must leave the task and search for context. | Provide concise inline guidance and link to searchable deeper documentation. | Error says “See section 14.3 of manual.” |
| Make help/contact placement inconsistent. | Users cannot find assistance at the moment of failure. | Keep help in a consistent location and add contextual escalation for high-impact tasks. | Support link moves between footer, profile, and chat bubble. |
| Provide a chatbot as the only support route. | The tool may fail to understand urgent or unusual problems. | Offer clear human escalation, service hours, expected response, and alternative channels. | Bot repeats FAQ with no contact option. |
| Use a progress meter that measures completion but not readiness. | A high percentage can conceal one blocking requirement. | Show blockers and eligibility first; use percentage only as supporting context. | “95% complete” while access remains impossible. |
| Hide examples until after an error. | Users learn the format through failure. | Put concise examples and constraints before or beside the input. | Proposal ID format appears only after Submit. |
| Provide no novice path or no expert efficiency. | One group either guesses or performs excessive repetitive work. | Use progressive disclosure, shortcuts, templates, history, and batch actions without obscuring state. | Experts click through ten dialogs; novices face 80 exposed settings. |
| Let help content contradict the current UI. | Users follow steps that no longer exist. | Version, review, and test help alongside the interface; show applicable product/version. | Guide says “click green Save” when button is now “Publish.” |

---

# Good pattern vocabulary and misuse warnings

Patterns are named solutions to recurring problems, not decorations. [UI Patterns](https://ui-patterns.com/patterns) provides a broad vocabulary; the table below translates several useful patterns into appropriate and inappropriate use.

| Pattern | Good use | Common misuse that creates bad UX |
|---|---|---|
| Good defaults | Start with a common, low-risk, reversible choice and expose the assumption. | Preselecting the organization’s preferred paid, public, or data-sharing option. |
| Input feedback | Explain format/range near the control and validate at a meaningful time. | Turning the field red while the user is still typing. |
| Forgiving format | Accept equivalent formatting and normalize visibly. | Silently coercing ambiguous input into a dangerous value. |
| Autosave | Preserve work and show Saving/Saved/Failed/Offline state. | Claiming autosave while showing an old timestamp and no failure state. |
| Undo | Make routine actions recoverable with clear duration/scope. | Offering a toast that disappears before the user notices. |
| Preview | Show a realistic outcome before expensive or bulk commitment. | Preview that omits metadata, recipients, fees, or irreversible consequences. |
| Wizard | Break a genuinely staged, infrequent, complex process into understandable steps. | Fragmenting a short form into many slow screens or mixing steps with one long page. |
| Steps left | Show honest completed/current/upcoming stages. | Using progress to pressure users or hiding optional/conditional steps. |
| Completeness meter | Encourage optional profile/content completion. | Presenting completion percentage as eligibility while a blocker remains. |
| Inline help | Clarify a decision at the point of need. | Hiding material terms behind an obscure tooltip. |
| Breadcrumbs | Show location in a meaningful hierarchy and support upward movement. | Replacing clear primary navigation or exposing internal URL/database structure. |
| Progressive disclosure | Keep common decisions visible and reveal advanced detail when requested. | Hiding essential status, price, navigation, or consequences. |
| Modal | Focus a short, self-contained decision that must be resolved before returning. | Hosting long workflows, nested navigation, or nonurgent marketing. |
| Notification | Communicate relevant events at an appropriate urgency and channel. | Sending everything everywhere or using a transient toast for a persistent blocker. |
| Search filters | Narrow a large result set with familiar categories, counts, active-state visibility, and predictable application. | Database jargon, hidden active filters, disruptive refresh, or zero-result traps. |
| Sort by column | Support predictable comparison with visible criterion and direction. | Invisible default sort or ambiguous “Recommended” ranking. |
| Adaptable view | Let users select table/card/density views while preserving task state. | Different views exposing inconsistent data or resetting filters. |
| Blank slate | Explain why the area is empty and provide the next meaningful action. | Decorative emptiness with no diagnosis or route forward. |
| Guided tour | Offer optional, contextual help for genuinely unfamiliar workflows. | Mandatory front-loaded tutorial describing obvious chrome. |
| Keyboard shortcuts | Accelerate frequent expert actions while retaining visible, accessible alternatives. | Undocumented shortcuts as the only efficient or available route. |

# Guidance for generating believable bad interfaces later

## A useful case recipe

For each generated interface, specify:

1. **User and role:** who is using it and their expertise.
2. **Task:** the concrete outcome they need.
3. **Context:** device, environment, interruption, time pressure, accessibility, collaboration, or cost.
4. **Information required for the decision:** state, labels, units, totals, scope, freshness, ownership, or provenance.
5. **Three to seven planted problems:** mix one obvious, two moderate, and one or two subtle issues.
6. **Consequence chain:** observable cue → likely interpretation/action → plausible harm or friction.
7. **Expected remedies:** enough to create a meaningful improved counterpart.

## Recommended issue mix

Choose issues from different layers so the exercise is not merely visual:

- one hierarchy or discoverability problem;
- one ambiguous state or feedback problem;
- one error-prevention or recovery problem;
- one accessibility/input-method problem;
- one content, trust, or consequence problem;
- optionally one domain-specific integrity issue such as units, provenance, totals, permissions, or timezones.

## Make bad UX plausible

- Keep alignment, typography, and branding competent enough that participants must reason about the task.
- Give every planted issue a believable origin: legacy terminology, competing stakeholder priority, careless default, partial responsive adaptation, hidden system constraint, or metric-driven nudge.
- Let some features work well. Real products are mixtures, and contrast makes critique more precise.
- Include realistic labels, data, counts, timestamps, and states; avoid gibberish unless jargon itself is the issue.
- Make the task possible but risky, inefficient, ambiguous, or exclusionary. A completely unusable joke screen teaches less.
- Do not rely on tiny unreadable text as the only flaw. Projection and image-generation limits can turn the exercise into eyesight testing.
- Do not plant every problem in one screen. Overloading makes prioritization trivial and the interface unbelievable.
- Avoid using a real company or product as the villain. Fictional interfaces keep discussion on principles and prevent outdated claims.

## Prompt language that creates controlled flaws

Use specific, visible instructions such as:

- “Place four equally prominent filled buttons—Save, Publish, Delete, and Reset—in one tight row.”
- “Show a green LIVE badge next to a last-updated timestamp from 18 minutes earlier.”
- “Label an input Duration and populate it with 5; show no unit or acceptable range.”
- “Use red, green, and brown lines of identical weight and no markers or direct labels.”
- “Keep the final price small and place a prominent low initial price in the page header.”
- “After a batch action, show only the toast ‘Success’ without naming the affected records.”
- “Highlight invalid fields only with a red border; include no error text or summary.”
- “Keep the primary navigation behind an unlabeled hamburger icon on a wide desktop canvas.”
- “Show three active filters inside a collapsed panel while the results page says No results.”
- “Preselect public sharing and newsletter subscription; make opt-out links pale and secondary.”

Avoid vague prompt language such as “make the UX bad,” “make it confusing,” or “make it ugly.” Specific behavior and consequence cues produce more teachable results.

## Severity ladder for case design

| Level | Typical effect | Examples |
|---|---|---|
| Low | Small friction; easy recovery | Inconsistent capitalization, slightly weak grouping, redundant click. |
| Medium | Confusion, delay, repeated effort, or exclusion with a workaround | Hidden filter, ambiguous CTA, tiny target, lost scroll position. |
| High | Task failure, data loss, unintended purchase/sharing, major accessibility blocker | Cleared form after error, hidden fee, keyboard trap, unpublished changes shown as sent. |
| Critical | Credible safety, security, equipment, legal, or integrity harm | Unit ambiguity in a control, stale status presented as live, bulk destructive action without scope, active alarm hidden by acknowledgement. |

Severity is contextual. A small target on a casual content card may be medium severity; the same target for an emergency stop can be critical.

# Condensed master checklist

Before calling a website experience “good,” verify:

- Users can state what the page is for and identify the next relevant action.
- Navigation labels and groupings match user goals rather than internal structure.
- Current location, selection, scope, progress, save state, freshness, and completion are visible.
- Actions describe outcomes; destructive or costly actions are separated and proportionally safeguarded.
- Forms ask only what is necessary, preserve work, use labels, show constraints, accept reasonable formats, and avoid redundant entry.
- Validation prevents known errors and supports recovery with specific linked messages.
- Search preserves the query, reveals scope and active filters, tolerates reasonable variation, and helps users recover from zero results.
- Content has meaningful titles, headings, links, instructions, dates, ownership, and plain language.
- Visual hierarchy reflects task importance rather than stakeholder volume or promotional pressure.
- Information is not encoded through color, hover, motion, sound, or icons alone.
- Keyboard order and focus are visible and logical; no traps exist; targets are sufficiently large and spaced.
- Layout reflows under mobile view and magnification without losing content, state, or functionality.
- Loading, responsiveness, and layout stability are measured under real conditions.
- Autoplay, overlays, prompts, animation, and notifications remain under user control.
- Authentication and permissions appear only when needed and preserve the user’s task.
- Prices, subscriptions, privacy, consent, sponsorship, and cancellation are transparent and symmetric.
- Long operations can progress safely in the background, recover from interruption, and communicate partial outcomes.
- Empty, error, offline, unauthorized, expired-session, and no-result states all provide a useful next step.
- Patterns are selected for the user problem and tested, not added because they are fashionable.
- Representative users can complete critical tasks effectively, efficiently, confidently, and accessibly.

