# Eight generator-ready sample interface briefs

## How to use these briefs

Each brief describes a single desktop interface image for group critique. The specifications deliberately include questionable choices, but this document does not identify them. Generate the screens faithfully; do not “improve” them during generation.

For consistency, use a 16:9 desktop screenshot at 1600×900 or similar. Interfaces should look plausible and production-grade rather than comedic, broken, or obviously malicious. Use fictional facilities, samples, people, and identifiers. Do not copy a real facility’s branding.

When using an AI coding or image-generation agent, provide the entire brief for one case and add:

> Reproduce every stated label, value, state, layout relationship, and visual treatment. Do not add explanatory callouts, annotations, numbered flaw markers, or a device frame. The result should look like a screenshot that an actual user could encounter. Preserve the intentional ambiguities and inconsistencies in the specification.

---

## Case 1: Beamline Control Console

**Difficulty:** Introductory; several visible issues with deeper operational implications.

**Participant scenario:** You are taking over an overnight shift at the fictional Aurora synchrotron. You need to confirm the beamline is ready, change the target energy to 12.7 keV, and begin acquisition without disturbing a sample already positioned in the chamber.

**Interface type:** Dense desktop control dashboard for beamline BL-7A.

**Visual specification:**

- Dark navy header reading `AURORA CONTROL / BL-7A`, with a small green circular dot followed only by `ONLINE` at top left.
- Top right shows `operator: m.chen`, a bell icon with a red badge `14`, and a digital clock `02:13:08`. Do not show date, timezone, or last refresh.
- Below the header, split the page into a wide main area (about 72%) and a right sidebar (28%).
- At the top of the main area, show four equal cards:
  - `Ring Current` value `298.4` with no unit, green sparkline.
  - `Beam Energy` value `6.00 GeV`, green dot.
  - `Photon Energy` value `12.400` and underneath a small input containing `12.700`; do not label one as measured and the other as requested.
  - `Flux` value `3.1e12`, yellow sparkline, no unit or explanation.
- Under the cards, show a simplified horizontal beam path diagram: `Front End` → `Mono` → `Slits` → `Sample` → `Detector`. Use small green circles for most components, a red circle at `Slits`, and a gray circle at `Detector`. Include no legend and no textual state on the circles.
- Beneath the diagram, include a control block titled `Monochromator`. It contains inputs labeled `E`, `dE`, `H`, and `V` with values `12.700`, `0.002`, `0.18`, and `0.22`. Only `E` displays `keV`; other units are absent.
- Place six equally sized gray buttons in one line: `MOVE`, `STOP`, `HOME`, `VENT`, `PURGE`, `RESET`. Use uppercase labels, identical styling, and only 6 px gaps. `VENT` should be directly between `HOME` and `PURGE`.
- Under the buttons, show a thin progress bar at 62% with the text `Executing...`. Do not say which command is executing or whether it can be cancelled.
- Lower left: a plot titled `I0` with a thin cyan trace and axes labeled only `Time` and `Value`. The x-axis ends at `120`; no units. A small `LIVE` word appears in green within the plot, while the final plotted point is visibly at x=86 and the remainder is blank.
- Right sidebar title: `Messages`. Show a scrollable list where every row is identical dark gray except:
  - red text `02:11 PV_27B LIMIT`;
  - yellow text `02:10 Mono settling`;
  - white text `02:08 User note saved`;
  - red text `01:54 Vacuum interlock`; and
  - ten additional low-level log lines.
- Put a prominent red `ACK ALL` button under the message list.
- At the bottom of the sidebar, show three large equal green buttons: `START`, `PAUSE`, `ABORT`. Make all three green despite their different meaning.
- Use 11–12 px condensed type for most labels, tight spacing, faint gray dividers, and no inline help.

**Task shown beside the screenshot:** “Confirm readiness, set photon energy to 12.7 keV, and begin acquisition.”

---

## Case 2: Sample Queue Builder

**Difficulty:** Introductory to intermediate; workflow and data-integrity issues.

**Participant scenario:** You have 18 protein crystal samples to run. You imported a spreadsheet, need to correct two rows, apply a standard exposure to several samples, and submit the overnight queue.

**Interface type:** Light-theme table editor inside a scientific experiment portal.

**Visual specification:**

- Header reads `Experiment PX-24819 / Queue Setup`, with breadcrumb `Home / Experiments / PX-24819 / Setup / Queue`.
- A summary row says `18 samples | Est. runtime: 06:40 | Storage: 81%` in small gray text.
- Main content is a spreadsheet-style table with 18 rows and columns: checkbox, `#`, `Sample ID`, `Position`, `Exposure`, `Osc.`, `Energy`, `Frames`, `Directory`, and an unlabeled final icon column.
- Show rows 1–9 without vertical scrolling and imply more below.
- Use these representative values:
  - Row 1: `LYS-001`, `A1`, exposure `0.20`, oscillation `0.1°`, energy `12.7`, frames `1800`, directory `/data/px24819/lys001`.
  - Row 2: `LYS-002`, `A2`, exposure `0.20s`, oscillation `0.1`, energy `12700 eV`, frames `1800`, directory `/data/px24819/lys002`.
  - Row 3: `LYS_003`, `A3`, exposure `200`, oscillation `.1`, energy `12.7`, frames `1800`, directory `/data/px24819/LYS-003`.
  - Row 4: sample ID blank, position `A4`, otherwise matching row 1.
  - Row 5: `LYS-005`, position `A4`, exposure `0.20`, matching other values.
  - Row 6: `LYS-006`, position `B1`, exposure `-0.2`, matching other values.
- Do not put units in column headers. Mix units and formats inside cells exactly as above.
- Highlight the entire row 4 with a pale red background but show no inline error message. Highlight only row 6’s exposure cell with a yellow border. Do not visually flag duplicate position `A4`.
- Select rows 2, 3, and 4 using checkboxes. Above the table, show buttons `Add`, `Duplicate`, `Delete`, `Apply to selected`, and `Import CSV`, all as identical outlined buttons.
- At upper right, include a filled blue button `Run Queue` even though errors remain.
- Clicking is not required, but show an open `Apply to selected` popover. It contains a dropdown defaulted to `Exposure`, an empty text input, and a blue `Apply` button. No unit, current-value preview, affected-row count, undo note, or validation is visible.
- The final table column uses an `×` icon on each row, with no header or label.
- At the bottom, show small text `Autosaved 12:41` while the header clock reads `13:06`. Do not explain whether edits since 12:41 are saved.
- Show a toast in the lower-right corner: `Import completed with 3 warnings`, with a `Dismiss` link but no way to inspect warnings.
- Use white background, thin gray grid lines, 12 px cell text, truncated directory paths, and horizontal scrolling for the final two columns.

**Task shown beside the screenshot:** “Correct the imported samples, apply exposure settings to selected rows, and submit the overnight queue.”

---

## Case 3: Scan Results Explorer

**Difficulty:** Intermediate; visual encoding, analysis integrity, and accessibility.

**Participant scenario:** You are comparing fluorescence scans from three samples to decide where to collect the next spectrum and then export the comparison for a colleague.

**Interface type:** Scientific plotting and data-analysis application.

**Visual specification:**

- Light gray application chrome with title `ScanView — Fe K-edge comparison`.
- Left sidebar width 260 px contains a search field and a tree under `Runs`:
  - checkbox with red line swatch `run_0842 / sample-A`;
  - checkbox with green line swatch `run_0843 / sample-B`;
  - checkbox with brown line swatch `run_0844 / sample-C`;
  - three unchecked older runs.
- All three active run names are truncated after about 20 characters; the sidebar cannot be widened and has no tooltip visible.
- Main plot occupies about two-thirds of the center. Title `Normalized μ(E)`. X-axis label `Energy`; y-axis label `Intensity`. Do not include units.
- Plot the three active traces with nearly identical line weight: red, green, and brown. Make the red and brown traces overlap for much of the range. Use color alone to identify them—no direct labels, dash patterns, or point shapes.
- Put a floating legend over the upper-right data region, covering part of a peak. Legend entries say only `0842`, `0843`, `0844`.
- The x-axis runs from 6.9 to 7.3 with tick labels `6.9`, `7.0`, `7.1`, `7.2`, `7.3`. The status bar at bottom reads `Cursor: 7112.4 eV`, creating a unit-scale inconsistency.
- A shaded vertical selection spans roughly 7.105–7.125. Label it `ROI 1`, but provide no numeric boundaries on screen.
- Above the plot, show icon-only controls for pan hand, magnifier, crosshair, reset arrows, smoothing wave, and fit curve. Make the smoothing icon active in blue. Do not show the smoothing method or parameters near the plot.
- Right panel titled `Processing` contains:
  - checked `Normalize`;
  - checked `Remove baseline`;
  - checked `Smooth` with slider at `7` but no scale or unit;
  - dropdown `Calibration: Auto`;
  - button `Apply to all`.
- A small collapsed section reads `History (4)` but processing history and raw-data comparison are not currently visible.
- At bottom right, show a prominent blue `Export` button. Next to it, small gray text says `CSV • displayed data` without saying whether the values are processed, smoothed, cropped, or full resolution.
- Include a yellow banner above the plot: `Run 0843 calibration differs by 0.8`, with no unit, severity explanation, or recommended response. The only action is `×`.
- Use a professional science-software appearance, small typography, and dense but aligned controls.

**Task shown beside the screenshot:** “Compare the three samples, choose a useful energy region, and export the data for a colleague.”

---

## Case 4: Experiment Proposal Form

**Difficulty:** Intermediate; long-form design, validation, and preservation of work.

**Participant scenario:** You are a visiting researcher submitting a beamtime proposal shortly before the deadline. You have collaborators, a safety-relevant sample, and a technical abstract copied from a document.

**Interface type:** Multi-section web form.

**Visual specification:**

- Header with fictional logo `NEXUS LIGHT SOURCE`, nav links, and user avatar.
- Page title `New General User Proposal` and small text `Deadline today, 17:00` without timezone.
- Under the title, show a five-step indicator: `1 Basics`, `2 Science`, `3 Samples`, `4 Team`, `5 Review`. All steps are gray text in a single line; current step is indicated only by a slightly darker gray number `2`.
- Despite the stepper, show a single very long page containing portions of all five sections and a thin browser scrollbar indicating the user is about 40% down.
- Visible section begins with `Scientific case` and includes:
  - required title field labeled `Title*` with text;
  - required dropdown `Technique*` defaulted to `Select`;
  - textarea `Abstract*` containing several paragraphs;
  - small counter `2,146 / 2,000` in gray, not red;
  - label `Why is synchrotron radiation required?*` with an empty textarea.
- A sidebar card titled `Proposal status` says `Incomplete`, lists `7 errors`, and has a link `View`, but does not identify errors until submission.
- Below, show `Samples` with one sample row. Fields: `Material name`, `Composition`, `Amount`, `State`, `Hazards`, and `Disposal`. `Amount` has value `5` with no unit. `Hazards` is a dropdown defaulted to `None declared` even though no explicit choice was made. A tiny `?` icon appears only by `Composition`.
- Show an outlined button `+ Add another sample` and a red text link `Remove sample` immediately below it.
- Show `Collaborators` with three email fields. The second contains `ana@university` and has only a red border—no message. The third is empty. A button says `Invite all now`, though the proposal is not submitted.
- Fixed footer contains left-aligned gray button `Cancel`, centered outlined `Save draft`, and right-aligned blue `Submit proposal`. All remain visible while scrolling.
- Show a pale banner above the footer: `Session expires in 04:12`. It offers no extension control and does not state whether unsaved text will be retained.
- `Submit proposal` appears enabled. No `Back` or `Next` button is visible in the footer.
- Use 13 px text, light gray helper copy, wide text fields, and generous whitespace within fields but weak separation between sections.

**Task shown beside the screenshot:** “Complete and safely submit the proposal without losing work or omitting required scientific and safety information.”

---

## Case 5: Vacuum Interlock Alarm Panel

**Difficulty:** Advanced; alarm design, prioritization, and operational state.

**Participant scenario:** During user operation, several vacuum alarms appear within seconds. You need to identify the initiating problem, decide what is still active, and take the correct first response.

**Interface type:** Industrial control-system alarm summary on a wide desktop monitor.

**Visual specification:**

- Charcoal background, top title `Accelerator Alarm Summary`, with tabs `ALL (127)`, `UNACK (31)`, `ACTIVE (19)`, `SHELVED (8)`.
- Use a dense table with columns `Time`, `Pri`, `State`, `Area`, `Tag`, `Description`, `Value`, and `Ack`.
- Show 17 visible rows. Most have black or very dark red backgrounds, white text, and blinking-looking red square icons. Use red for critical, major, and several minor rows, differentiated only by abbreviations `C`, `M`, and `m` in the narrow `Pri` column.
- Arrange rows newest first. Include this cascade across about 11 seconds:
  - `14:32:07.482` priority `m`, area `FE-07`, tag `VGC_07_14`, description `Gauge comm loss`, value `BAD`;
  - `14:32:09.017` priority `M`, tag `VV_07_03`, description `Valve not open`, value `0`;
  - `14:32:10.201` priority `C`, tag `PSH_07_01`, description `Pressure high`, value `2.4E-5`;
  - `14:32:11.890` priority `C`, tag `BL07_PERMIT`, description `Beam permit lost`, value `FALSE`;
  - `14:32:14.113` priority `M`, tag `SHUTTER_07`, description `Shutter closed`, value `CLS`;
  - additional unrelated warning and information rows mixed between them.
- Do not show units in the value column, alarm limits, duration, likely dependency, or grouping.
- Mix state abbreviations `UNACK`, `ACK`, `RTN`, and `RTN/UNACK` with no legend. Keep returned-to-normal rows red until acknowledged, visually similar to active alarms.
- On the far right of every row, put a small checkbox. At the bottom, show large buttons `ACK SELECTED`, `ACK PAGE`, `ACK ALL`, `SHELVE`, and `RESET`. Give all buttons the same steel-blue style.
- Place `ACK ALL` immediately next to `RESET`.
- A small topology diagram on the right shows vacuum sectors as rectangles linked in a line. Sector `07` is red; sectors `06` and `08` are orange. Use color only, with no labels for active/isolated/unknown.
- Below the topology, show a card `Recommended action` containing only `See SOP VAC-12` and a tiny document icon.
- Top right says `LIVE` in green and `Last update 14:32:15`, while the top clock reads `14:32:43`.
- Include a quiet gray status line at the very bottom: `Audio muted by operator m.chen at 12:05`.
- Make the screen credible, highly dense, and visually urgent without adding annotations.

**Task shown beside the screenshot:** “Identify the initiating condition, determine what remains active, and choose the correct first response.”

---

## Case 6: Data Export Dialog

**Difficulty:** Intermediate; defaults, provenance, and irreversible consequences.

**Participant scenario:** You need to send a manageable dataset to an external collaborator while preserving enough metadata for the analysis to be reproduced. Raw detector data must remain untouched.

**Interface type:** Modal export dialog over a dimmed data-management application.

**Visual specification:**

- Large modal titled simply `Export`, width about 720 px, white background.
- Top line says `42 files selected (1.8 TB)` in small gray text.
- `Format` section uses a dropdown defaulted to `CSV`, though selected files include detector images and metadata. Helper text says `Recommended` without saying for whom or why.
- `Data` section contains checked boxes:
  - `Raw data`;
  - `Processed data`;
  - `Preview images`;
  - `Logs`.
- `Metadata` section has an unchecked master checkbox `Include metadata`. Under it are disabled-looking but checked subitems `Instrument`, `Calibration`, `Sample`, `Processing history`, and `User notes`. Make it unclear whether they will be included.
- `Range` uses radio buttons `All`, `Current view`, and `Selected region`; `Current view` is selected. No summary of the current filters, cropping, downsampling, or selected region is displayed.
- `Destination` has a text field `/shared/outgoing/final` and a folder icon. Below it, a checked checkbox reads `Replace files with same name`.
- `File naming` field contains `{sample}_{scan}.csv`; preview shows `sample_001.csv, sample_001.csv, sample_001.csv...`, with duplicate names visible but not flagged.
- A dropdown `Compression` is set to `Maximum`; estimated output still reads `Calculating…` with an indefinite spinner.
- Small gray copy says `Export may take several hours. Keep this window open.` No resume, background task, or notification option is shown.
- Footer has gray `Cancel`, gray `Save preset`, and blue `Export` buttons. Make `Export` enabled.
- Place an underlined text link `Clean destination first` directly under the destination field, with no explanation.
- Behind the modal, faintly show a file table and a banner `Raw archive: read/write`.

**Task shown beside the screenshot:** “Create a reproducible, shareable export without overwriting or altering the source data.”

---

## Case 7: Lab Access Training Portal

**Difficulty:** Introductory to intermediate; admin workflow, status, and accessibility.

**Participant scenario:** A visiting scientist arrives tomorrow. You need to determine which training is missing, complete it, and prove eligibility for unescorted access.

**Interface type:** Corporate learning/compliance dashboard.

**Visual specification:**

- Header reads `Nexus User Access`, with navigation `Dashboard`, `Training`, `Documents`, `Visits`.
- Main title `Welcome, Dr. Rivera` and subtitle `Your access status`.
- A large donut chart uses green, orange, and red segments with center text `72%`. There is no legend; below it says only `Almost there!`.
- To the right, a card says `Badge status: Pending` in orange and `Visit begins Sep 1`. Do not identify the current year, timezone, or blocking requirement.
- Underneath, a table titled `Required training` with columns `Course`, `Status`, `Completed`, `Expires`, `Action`.
- Include rows:
  - `General Safety Orientation`, green dot plus `Complete`, completed `Aug 12`, expires `Aug 12`;
  - `Radiation Worker I`, orange dot plus `Expiring`, completed `Sep 3`, expires `Sep 2`;
  - `Beamline 7A Local Induction`, red dot plus `Required`, em dash in dates;
  - `Cybersecurity Basics`, gray dot plus `Not needed?`, completed `—`, expires `—`;
  - `Oxygen Deficiency Hazard`, green dot only with no status text, dates shown.
- Use ambiguous date formats without year. The `Radiation Worker I` dates appear chronologically impossible without explaining that they refer to different years.
- Action buttons vary: `RETAKE`, `Start`, `OPEN`, `N/A`, and an icon-only right arrow. Use different capitalization and styles.
- A yellow banner above the table says `You have outstanding requirements.` with a `Learn more` link that opens elsewhere; it does not list the requirement.
- A sidebar titled `Need help?` contains three similar links: `Access help`, `Training support`, and `User office`. Do not explain which issue each handles.
- Use color as a prominent status cue, pale gray small text, no visible keyboard focus, and several icon-only links.
- Bottom right has a prominent blue button `Request badge`, enabled even though status is pending and requirements remain.

**Task shown beside the screenshot:** “Find the access blocker, complete the correct training, and verify that the visitor will be eligible tomorrow.”

---

## Case 8: Beamtime Schedule and Handover Board

**Difficulty:** Advanced; temporal reasoning, collaboration, and conflict visibility.

**Participant scenario:** You coordinate a beamline. A run is delayed, maintenance has been added, and the next team is in another timezone. You must update the schedule and communicate what changed without creating a conflict.

**Interface type:** Weekly calendar with resource schedule and handover notes.

**Visual specification:**

- Header `BL-4 Weekly Schedule`, date range `Aug 31 – Sep 6`, arrows for previous/next, and button `Today`.
- Top right dropdown says `Facility time`, but does not state the timezone or UTC offset.
- Main area is a week grid with columns Mon–Sun and horizontal time labels 00:00, 06:00, 12:00, 18:00, 24:00. Each day column is narrow.
- Use colored blocks:
  - blue `PRO-1842 / Li battery operando` Monday 08:00 through Tuesday 14:00;
  - purple `Maintenance: mono cooling` Tuesday 12:00–16:00, visibly overlapping the blue block;
  - green `PRO-1911 / Catalysis` Tuesday 14:00 through Thursday 08:00;
  - orange `Machine studies` Thursday 06:00–12:00, overlapping green;
  - gray `Reserved` Friday 00:00–12:00 with no owner or reason.
- Events show only abbreviated titles in the grid; long titles truncate. Color is the only indication of event type.
- A thin red horizontal `now` line is shown on Monday at 10:35, but the header’s current date is not highlighted and the line has no label.
- Below the calendar, show a `Handover notes` panel with a reverse chronological list:
  - `09:58 — +2h due to cryostream instability — MK`;
  - `09:41 — sample env ready — AR`;
  - `Yesterday — detector rebooted — system`.
- Notes do not explicitly name the event or date, and initials have no hover labels visible.
- Right sidebar has `Unscheduled` cards: `Detector calibration (2h)`, `User setup (1h)`, and `Vacuum check (?)`. Cards have six-dot drag handles.
- At the bottom of the sidebar is a blue `Publish changes` button and gray text `3 unpublished changes`, but changed events are not marked in the calendar and no collaborator list is shown.
- Show a small toast: `Schedule updated` while the button still says `Publish changes`.
- Include no conflict warning, dependency visualization, version history, undo, notification summary, or confirmation of which teams will be contacted.
- Use a clean modern scheduling UI that initially appears polished. Use 12 px text, pastel event colors, and subtle borders.

**Task shown beside the screenshot:** “Accommodate the delay and maintenance, resolve conflicts, and hand over an understandable plan to the next team.”

