# Facilitator answer key

## How to use the key

The lists below are not exhaustive and should not be treated as a treasure hunt. During each two-minute debrief, select one issue participants found and one less obvious issue that broadens the discussion. Ask whether a fix changes workload, safety, scientific integrity, or expert efficiency.

The severity labels are plausible defaults for the stated scenario, not universal ratings.

---

## Case 1: Beamline Control Console

### Intended findings and improvements

| Finding | Likely consequence | Suggested improvement | Principle | Severity |
|---|---|---|---|---|
| Measured `12.400` and input `12.700` are colocated but not identified as measured versus requested. | Operator may assume the move completed or start collection at the wrong energy. | Label `Measured energy` and `Requested energy`; show pending/applied state, deviation, and completion criteria. | Visibility of system status; match to real-world state | Critical |
| `MOVE`, `STOP`, `HOME`, `VENT`, `PURGE`, and `RESET` look identical and are tightly packed. | A slip can invoke a disruptive or hazardous operation. | Separate controls by function and consequence; isolate hazardous actions; use state-specific confirmation and role permissions. | Error prevention; proportional safeguards | Critical |
| Beam-path states use unexplained green, red, and gray circles. | Users may mistake alarm, closed, stale, or disconnected state; color-vision differences compound ambiguity. | Add textual states or symbols, a legend, and details on selection; never rely on color alone. | Accessibility; clarity | High |
| Progress says only `Executing...`. | User cannot tell what is moving, whether it is stuck, or whether another action is safe. | Name the operation and target, show phase/progress and expected completion, and provide safe cancel behavior. | Visibility of system status; user control | High |
| `ACK ALL` is prominent while unresolved messages are mixed with logs. | Users may clear attention cues without understanding conditions; critical items can be buried. | Separate alarms from logs, prioritize by consequence, show active/acknowledged state, and acknowledge specific alarms. | Actionable alarms; hierarchy | Critical |
| `START`, `PAUSE`, and `ABORT` are all green. | Meaning and consequence are obscured; users must read carefully under pressure. | Give primary, secondary, and destructive actions distinct treatment; pair color with labels/icons and spacing. | Clear action hierarchy; accessibility | High |
| Values lack units and use unexplained codes such as `PV_27B`. | Misinterpretation and slow diagnosis, especially at handover. | Add units, ranges, plain-language descriptions, and drill-down to technical identifiers. | Match to users’ language; scientific meaning | High |
| `LIVE` plot appears incomplete, and no refresh timestamp is present. | Stale or partial data may be treated as current evidence. | Show last sample time, acquisition/connection state, gaps, and explicit stale-data styling. | Data freshness; honest representation | High |
| Clock lacks date/timezone during an overnight shift. | Handover and log correlation may be wrong. | Show full date, facility timezone/UTC offset, and consistent timestamps. | Temporal clarity; provenance | Medium |
| Density lacks a clear readiness summary. | Operator must synthesize many weak signals to decide whether starting is safe. | Add a readiness checklist/status with blockers and links to evidence, while retaining expert drill-down. | Overview first, details on demand | High |

### Debrief prompt

“Which information must remain dense for an expert, and which parts need stronger prioritization rather than removal?”

---

## Case 2: Sample Queue Builder

### Intended findings and improvements

| Finding | Likely consequence | Suggested improvement | Principle | Severity |
|---|---|---|---|---|
| Units are absent from headers and mixed inside cells (`0.20`, `0.20s`, `200`; `12.7`, `12700 eV`). | Exposures or energies can differ by orders of magnitude. | Put canonical units in headers, parse recognized units explicitly, preview conversions, and block ambiguous values. | Constraints; scientific meaning | Critical |
| Duplicate position `A4` is not detected. | Two samples may target one physical position, invalidating or blocking the run. | Validate uniqueness against container geometry and identify both conflicting rows. | Error prevention; domain validation | High |
| Blank sample ID and negative exposure receive inconsistent, unexplained styling. | Users cannot understand the error or know how to fix it. | Show inline messages with requirement/range, include an error summary linked to cells, and use consistent semantics. | Actionable errors; consistency | High |
| `Run Queue` remains enabled despite errors. | Invalid queue may be submitted or failure may occur much later. | Prevent submission for blocking errors, explain blockers, and distinguish warnings from errors. | Error prevention; clear state | High |
| Bulk apply gives no unit, preview, row count, or undo. | One change can silently corrupt several samples. | Show affected rows and before/after preview, validate units, and provide undo or staged review. | User control; review before commit | High |
| Row delete is an unlabeled `×` and sits in a dense table. | Accidental deletion and poor keyboard/screen-reader access. | Use a labeled accessible action menu, larger target, row identity in confirmation when needed, and undo. | Accessibility; recovery | Medium |
| Import says “3 warnings” but offers no details. | Problems are ignored or cannot be resolved. | Link the toast to an import report and corresponding cells; keep it available after dismissal. | Error recovery; visibility | High |
| Autosave timestamp is old and ambiguous. | Users may submit or leave while changes are unsaved. | Show `Saving…`, `Saved at…`, and failure/offline states; warn before leaving with unsaved changes. | Visibility of system status; trust | High |
| Directory naming inconsistency is not surfaced. | Files may be misplaced, overwritten, or difficult to associate with samples. | Generate paths from validated IDs, preview collisions, and allow deliberate overrides with warnings. | Consistency; provenance | Medium |

### Debrief prompt

“Which validations belong at import time, edit time, and final submission—and why?”

---

## Case 3: Scan Results Explorer

### Intended findings and improvements

| Finding | Likely consequence | Suggested improvement | Principle | Severity |
|---|---|---|---|---|
| Traces rely on red, green, and brown alone and overlap. | Users with color-vision differences—and users viewing a projector—cannot reliably compare samples. | Combine distinct colors with line patterns, direct labels, shapes, selectable highlighting, and accessible palette. | Do not rely on color alone; perceptual clarity | High |
| X-axis appears to use keV while cursor uses eV; neither axis declares units. | Region selection and reported energy can be misunderstood by a factor of 1,000. | Use consistent units in axis, cursor, ROI, and export; provide explicit conversion if switching units. | Consistency; scientific meaning | Critical |
| Legend obscures data and uses shortened IDs. | A peak may be hidden and sample identity confused. | Place legend outside data, allow repositioning, use unique meaningful sample labels, and support focus-on-select. | Data visibility; recognition over recall | Medium |
| Smoothing is active but method and parameters are obscure. | Displayed features may be mistaken for raw evidence; analytical decisions become hard to reproduce. | Make processing state conspicuous, name method/window, offer raw overlay, and record provenance. | Honest representation; reproducibility | Critical |
| `Apply to all` lacks scope and preview. | Calibration or processing can change unintended runs. | State the number and identity of affected runs, preview changes, preserve raw data, and offer undo/history. | User control; review before commit | High |
| Calibration warning lacks unit, meaning, and response. | User may ignore a meaningful offset or overreact to a harmless one. | State magnitude/unit, expected tolerance, affected run, consequence, and actions such as inspect or recalibrate. | Actionable feedback; context | High |
| Export ambiguity: “displayed data” does not reveal processing, selection, or resolution. | Collaborator receives an irreproducible or incomplete dataset. | Provide an export summary, processing recipe, ROI/range, resolution, metadata inclusion, and file preview. | Provenance; clear consequences | Critical |
| Run names are truncated with no recovery. | Similar samples can be selected incorrectly. | Allow sidebar resizing, tooltip/details, search highlighting, and unique visible suffixes. | Recognition; responsive layout | Medium |
| ROI boundaries are not numerically visible. | Selection cannot be communicated or reproduced precisely. | Display editable start/end values with units and show them in exported metadata. | Precision; reproducibility | High |

### Debrief prompt

“How can an interface keep processing convenient while preventing processed data from masquerading as raw measurement?”

---

## Case 4: Experiment Proposal Form

### Intended findings and improvements

| Finding | Likely consequence | Suggested improvement | Principle | Severity |
|---|---|---|---|---|
| Step indicator suggests a staged flow, but all sections appear in one long page and no Next/Back exists. | Users lose orientation and cannot tell what is complete. | Either implement true steps with preserved state or use clear page sections and a progress summary; do not mix models. | Consistency; orientation | Medium |
| Errors are hidden until submission despite `7 errors`; field styling is inconsistent. | Deadline-time rework and difficulty locating problems. | Validate at meaningful points, show inline messages, and link a summary to each problem while preserving input. | Error identification and recovery | High |
| Abstract is over limit but counter is low-emphasis gray. | Submission may fail late or text may be silently truncated. | Show limit before entry, clear over-limit state and amount, and safe editing guidance; never silently truncate. | Constraints; immediate feedback | High |
| Amount lacks a unit. | Safety review receives unusable or dangerous quantity information. | Require a numeric value and explicit unit chosen from suitable options; validate plausible ranges. | Scientific meaning; safety | Critical |
| Hazard defaults to `None declared` without explicit acknowledgement. | Omission can be interpreted as an intentional declaration. | Begin with `Not answered`; require an explicit choice and reveal relevant follow-up fields. | Safe defaults; error prevention | Critical |
| Session timeout threatens unsaved work and offers no extension. | Long technical content may be lost near a deadline. | Autosave securely, show save state, allow session extension/re-authentication, and restore drafts. | Preserve work; recovery | High |
| `Submit proposal` is enabled on an incomplete form. | Users may expect completion, encounter an overwhelming late error, or submit incomplete data if validation is weak. | Change to `Review proposal`, show blockers early, and enable final submission only when requirements are satisfied. | Workflow clarity; error prevention | High |
| Invalid collaborator email gets only a red border. | Error is inaccessible and not actionable. | Add text explaining the expected format, associate it with the field, and retain the entry. | Accessible errors | Medium |
| `Invite all now` appears before submission without consequence details. | Premature notifications and collaborator confusion. | Explain timing and permission effects, show recipients, and let the owner invite now or after submission deliberately. | Clear consequences; user control | Medium |
| Deadline lacks timezone. | Remote users may miss the deadline. | Show facility timezone, UTC offset, and optionally the user’s local equivalent. | Temporal clarity | High |

### Debrief prompt

“Which safety fields should have no default, and when does requiring an explicit choice improve evidence rather than merely add friction?”

---

## Case 5: Vacuum Interlock Alarm Panel

### Intended findings and improvements

| Finding | Likely consequence | Suggested improvement | Principle | Severity |
|---|---|---|---|---|
| A cascade is sorted only newest-first with unrelated rows mixed in. | Operators may treat downstream interlocks as root causes and take the wrong first action. | Correlate by subsystem and time, suggest dependency/root-cause relationships cautiously, and preserve chronological inspection. | Situational awareness; meaningful grouping | Critical |
| Critical, major, and minor alarms all appear red and urgent. | Alarm fatigue; high-consequence signals do not stand out. | Establish a limited, consistent priority system using text/icon/position/sound as well as color. | Hierarchy; alarm prioritization | Critical |
| State codes are unexplained; returned and active alarms look similar. | Operator cannot distinguish ongoing hazard from cleared-but-unacknowledged history. | Use plain state labels, distinct visual treatment, filters, and a legend; keep condition and acknowledgement separate. | Clarity; system status | Critical |
| Values omit units and limits. | Pressure magnitude and severity cannot be judged. | Show engineering unit, trip threshold, current value, trend, and data quality. | Scientific meaning; decision support | Critical |
| `ACK ALL`, `SHELVE`, and `RESET` receive the same emphasis and are adjacent. | Bulk acknowledgement or reset may be invoked without diagnosis. | Separate acknowledgement from control actions, require selection/context, apply permissions, and state consequences. | Proportional safeguards; error prevention | Critical |
| Topology relies on color alone and uses ambiguous orange/red. | Sector state is inaccessible and meaning unclear. | Add labels/icons/patterns and drill-down; show active, isolated, stale, and affected relationships explicitly. | Accessibility; overview and detail | High |
| Recommended action is only a document code. | Response is delayed and depends on recall/manual access. | Show the safe first steps, responsible role, and a direct SOP link while retaining full procedure. | Guidance at point of need | Critical |
| `LIVE` conflicts with a 28-second-old last update. | Stale status may be mistaken for current plant state. | Define freshness thresholds, show latency/connection state, and visibly mark/freeze stale values. | Data freshness; honest state | Critical |
| Audio has been muted for hours in quiet text. | A new critical event may be missed. | Keep muted state persistent and prominent, define re-enable/escalation behavior, and record responsibility. | Redundant alerting; visibility | Critical |
| Raw technical tags dominate descriptions. | New or cross-area operators diagnose slowly. | Lead with asset and plain condition; preserve tags as secondary identifiers for experts. | Match to user language | High |

### Debrief prompt

“Acknowledgement changes the operator’s attention state, not the physical condition. How should the interface keep those two facts separate?”

---

## Case 6: Data Export Dialog

### Intended findings and improvements

| Finding | Likely consequence | Suggested improvement | Principle | Severity |
|---|---|---|---|---|
| CSV is recommended for mixed detector images, metadata, and logs. | Unsupported data may be omitted, flattened, or corrupted. | Recommend formats based on content and recipient needs; show compatibility and fidelity tradeoffs. | Match to task; preserve meaning | Critical |
| Metadata master checkbox is off while checked children look disabled. | User cannot predict whether essential provenance is included. | Use unambiguous parent-child states, default reproducibility metadata on, and summarize included metadata. | Clear state; reproducibility | Critical |
| `Current view` is selected without a summary of filters or processing. | Export may be incomplete or processed unexpectedly. | Display precise rows/files/range, filters, transformations, downsampling, and expected count/size. | Visibility of scope; clear consequences | High |
| Overwrite is enabled by default and duplicate filename preview is visible but unflagged. | Multiple files may overwrite each other or existing collaborator data. | Default to non-destructive naming, detect collisions, block until resolved, and offer append/version patterns. | Safe defaults; error prevention | Critical |
| `Clean destination first` implies deletion with weak presentation. | Existing data could be removed without understanding scope. | Rename explicitly, show exact target and file count, require deliberate review, and prefer a new/versioned folder. | Destructive-action safeguards | Critical |
| Estimated size remains unknown while export is enabled. | User may start an impractical multi-hour transfer or exhaust storage. | Calculate feasibility before commit or clearly allow background estimation; show destination capacity and time range. | Feedback; resource awareness | High |
| Export requires the window to stay open for hours. | Interrupted sessions cause failure and rework. | Run as a durable background job with progress, pause/resume, notification, and retry. | Robustness; recovery | High |
| Source archive is read/write and raw data is selected. | “Export” may be misunderstood as a copy when the system may modify originals. | Guarantee read-only source behavior, state it explicitly, and keep archival deletion/modification outside export. | Trust; preservation of source data | Critical |
| Naming preview shows only the first repeated values. | Collision remains visible but not actionable. | Highlight collision count, identify affected source files, and preview resolved unique names. | Validation; actionable errors | High |

### Debrief prompt

“What should a reproducibility-focused export summary state before the user commits?”

---

## Case 7: Lab Access Training Portal

### Intended findings and improvements

| Finding | Likely consequence | Suggested improvement | Principle | Severity |
|---|---|---|---|---|
| `72%` and “Almost there” do not identify the access blocker. | Visitor spends time on irrelevant training or arrives ineligible. | Lead with `Access blocked by…`, the required course, deadline, expected processing time, and direct action. | Task-oriented hierarchy; actionable status | High |
| Donut status relies on color and has no legend. | Status is inaccessible and categories cannot be interpreted. | Replace or supplement with labeled counts/status list; pair color with text and icons. | Accessibility; clarity | Medium |
| Dates omit years and create an apparently impossible completion/expiry sequence. | User cannot determine whether training is valid tomorrow. | Use unambiguous dates with year and local/facility context; state `valid through` and days remaining. | Temporal clarity; consistency | High |
| Course statuses and action buttons use inconsistent words, case, and styles. | Users cannot predict whether actions start, open, or repeat training. | Standardize state vocabulary and use outcome-specific action labels. | Consistency; clear actions | Medium |
| `Not needed?` expresses system uncertainty without resolution. | Required compliance may be skipped or support burden increased. | State who determined applicability, why, and how to resolve an uncertain requirement. | Explain system decisions | High |
| One status is a green dot only. | Meaning is unavailable to screen readers and color-blind users. | Add visible text and accessible names for every status. | Accessibility; redundant encoding | High |
| Badge request is enabled despite unmet requirements. | Creates false expectations or a doomed workflow. | Show eligibility criteria and either disable with explanation or route to a review that identifies blockers. | Constraints; honest status | Medium |
| Help links do not map to the problem. | User may contact the wrong team under time pressure. | Provide contextual help by blocker and expected response channel/time. | Contextual assistance | Low/Medium |

### Debrief prompt

“What is the difference between showing progress and showing readiness?”

---

## Case 8: Beamtime Schedule and Handover Board

### Intended findings and improvements

| Finding | Likely consequence | Suggested improvement | Principle | Severity |
|---|---|---|---|---|
| Maintenance and machine studies visibly overlap experiments with no conflict warning. | Lost beamtime, unsafe transition, or teams working from incompatible plans. | Detect resource/dependency conflicts, name affected events, and require resolution before publishing. | Error prevention; constraints | Critical |
| Facility timezone is unspecified, and the next team is remote. | Handover and arrival times are misinterpreted. | Display named timezone and UTC offset; optionally show viewer-local time and include timezone in notifications. | Temporal clarity | High |
| Event type depends on color; titles truncate. | Users cannot interpret event purpose or identity, especially on projection or with color-vision differences. | Add text/icon/pattern encoding and accessible details; allow expansion or a linked list view. | Accessibility; recognition | High |
| Handover notes do not identify event/date, and authors are initials. | Notes are detached from the work they affect and responsibility is unclear. | Attach notes to events/resources, use full timestamps and identifiable authors, and support unresolved/action-needed state. | Context preservation; accountability | High |
| Unpublished changes are not marked. | Coordinator cannot review what will change or undo a mistake. | Visually mark changed events, offer a before/after diff, version history, and undo. | Visibility of state; review before commit | High |
| Toast says “Schedule updated” while changes remain unpublished. | User may believe collaborators already see the new schedule. | Distinguish local draft saved from published/shared; state audience and last publication time. | Precise feedback; trust | High |
| Publishing gives no notification preview or audience. | Affected teams may not learn about changes, or irrelevant people may be alerted. | Show recipients, changed items, message preview, communication channel, and confirmation of delivery. | Clear consequences; collaboration | High |
| Gray `Reserved` has no owner or purpose. | Valuable time cannot be coordinated or challenged. | Require owner, reason, resource, status, and contact or approval trail. | Transparency; accountability | Medium |
| `Vacuum check (?)` has uncertain duration. | Dragging it into the calendar can create hidden downstream conflicts. | Require or estimate duration/range, show uncertainty, and recalculate conflicts when scheduled. | Constraints; planning under uncertainty | Medium |
| Now-line is unlabeled and current day is unclear. | Users may misread present state in a multi-day schedule. | Label current time/date and visually distinguish today, using more than color. | Orientation | Medium |

### Debrief prompt

“What exactly does ‘published’ mean here: saved to the server, visible to collaborators, or actively communicated to affected teams?”

---

## Cross-case synthesis

If time permits, ask participants to identify patterns repeated across cases:

- ambiguous state: live versus stale, draft versus published, requested versus measured;
- missing scientific context: units, ranges, precision, processing, provenance;
- color-only meaning;
- equal styling for actions with unequal consequences;
- validation that happens late or gives no recovery path;
- bulk actions with unclear scope;
- missing time/date/timezone context;
- systems that expose data without supporting the user’s decision.

End by reinforcing that a proposed fix is testable. Useful evaluation examples include fewer wrong-unit entries, faster identification of the initiating alarm, higher successful queue submission, more accurate interpretation of processed data, fewer support contacts, and successful keyboard-only task completion.

