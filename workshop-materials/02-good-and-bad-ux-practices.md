# Good and bad UX practices

## A practical definition

Good UX helps a specific user accomplish a meaningful task in a real context with appropriate effectiveness, efficiency, safety, confidence, and accessibility. Bad UX creates avoidable uncertainty, effort, error, exclusion, or loss of control.

“Good” and “bad” are not properties of a screen in isolation. A dense dashboard may be appropriate for a trained operator monitoring a system continuously, yet unsuitable for an occasional visiting researcher. Judge the fit among user, task, context, information, and consequence.

## The S.C.A.N. E.R. checklist

### 1. State: make system status visible

Good practices:

- Show what the system is doing, whether it is idle, busy, paused, complete, degraded, or disconnected.
- Distinguish requested, commanded, queued, and measured values.
- Show data freshness, timestamps, timezone, and connection quality where they matter.
- Provide progress for operations that take time and a realistic indication of what remains.
- Confirm completed actions in the place where the result is visible.

Bad practices:

- Use a spinner with no task name, progress, duration, or cancel behavior.
- Display stale data as though it were live.
- Say “Success” without saying what succeeded or where the result went.
- Change a value without indicating whether it is pending or applied.
- Hide a critical system state on another tab.

### 2. Clarity: match the user’s mental model

Good practices:

- Use domain terms familiar to the intended users, with help for uncommon abbreviations.
- Establish clear visual hierarchy: task, section, label, value, supporting detail.
- Show units, valid ranges, precision, coordinate systems, and scientific notation consistently.
- Group related controls and separate unrelated or conflicting actions.
- Use plain, specific labels that describe outcomes.

Bad practices:

- Rely on internal codes such as `PV_27B`, unexplained acronyms, or database field names.
- Mix units or omit them.
- Use vague labels such as “Submit,” “Execute,” “Process,” or “OK” when a more specific outcome is possible.
- Give every panel, number, and button equal visual weight.
- Use icons without labels when the meaning is specialized or ambiguous.

### 3. Action: make intent and consequences clear

Good practices:

- Make the primary next action easy to find.
- Visually and spatially separate hazardous, destructive, or irreversible actions.
- Disable impossible actions and explain why, or allow the attempt and give precise guidance.
- Preserve user-entered values and provide undo where feasible.
- Make confirmations specific: name the action, target, consequence, and safe alternative.
- Provide shortcuts and batch operations for frequent expert tasks without hiding state.

Bad practices:

- Put “Start,” “Stop,” “Vent,” and “Reset” in an identical row with equal styling.
- Use a destructive action as the default focused button.
- Ask “Are you sure?” without explaining what will happen.
- Make a control look enabled when it is unavailable.
- Trigger a high-consequence action on a single accidental click.
- Add confirmation dialogs to routine, reversible actions until users click through automatically.

### 4. Navigation: support finding and orientation

Good practices:

- Organize around user tasks and workflow stages, not the organization chart or implementation architecture.
- Use consistent navigation, names, and page locations.
- Show where the user is, what is complete, and what remains in multistep work.
- Preserve context when moving between overview and detail.
- Support search, filtering, saved views, and sensible recent items for large information spaces.

Bad practices:

- Move controls between screens or use different names for the same concept.
- Hide frequent tasks several levels deep.
- Open a detail page that loses the selected experiment, sample, or time range.
- Depend on browser back to preserve a complex workflow without actually preserving it.
- Present a long flat list with no grouping, search, or prioritization.

### 5. Error handling: prevent, explain, and support recovery

Good practices:

- Constrain values when the rules are known: type, format, range, dependencies, and permissions.
- Validate close to the field and at a useful time, without interrupting every keystroke.
- Write errors that state what happened, why if known, and how to proceed.
- Preserve valid work after an error.
- Allow review before committing high-cost batches or configurations.
- Provide safe defaults based on context, while making assumptions visible.
- Record an audit trail for consequential operations.

Bad practices:

- Show `Error 0x8004` or “Invalid input” with no location or remedy.
- Reject a long form only after submission and clear its fields.
- Silently coerce an out-of-range value.
- Default to the most hazardous or expensive option.
- Let one malformed row invalidate a batch without identifying it.
- Blame the user: “You entered the sample incorrectly.”

### 6. Reach and robustness: design for human variation and real conditions

Good practices:

- Meet suitable contrast and text-size expectations.
- Never encode meaning through color alone; pair color with text, shape, icon, position, or pattern.
- Support keyboard navigation, visible focus, appropriate control names, and logical reading order.
- Use sufficiently large targets with enough spacing for hurried or gloved interaction when relevant.
- Avoid relying solely on hover.
- Account for interruptions, fatigue, shift handovers, low bandwidth, large data volumes, and different display sizes.
- Offer novice guidance and expert efficiency through progressive disclosure rather than separate inconsistent systems.

Bad practices:

- Use only red/green to distinguish unsafe/safe or fail/pass.
- Put pale gray text on white or make status depend on tiny colored dots.
- Require precise pointer movement for critical controls.
- Time out and discard work without warning or recovery.
- Use motion, flashing, or sound without prioritization or a way to manage it.
- Assume every user has the same permissions, language fluency, vision, dexterity, or domain knowledge.

## Additional principles for scientific and control interfaces

### Preserve scientific meaning

Good practices:

- Display units next to both inputs and outputs.
- Make conversion explicit and avoid mixing unit systems in one task.
- Show meaningful precision; do not imply accuracy the instrument does not have.
- Include uncertainty, quality flags, calibration state, and missing-data treatment where relevant.
- Preserve provenance: source, sample, detector, configuration, processing version, timestamp, and operator.

Failure patterns:

- An axis says “Energy” with no unit.
- A field accepts `5` but does not say whether that means eV, keV, seconds, or millimeters.
- Rounded display values are reused as though they were raw measurements.
- Processed data can overwrite raw data.
- Exported files use opaque names and omit experiment metadata.

### Support situational awareness

Good practices:

- Give an overview first and details on demand.
- Show relationships among subsystem state, current task, constraints, and next consequence.
- Keep persistent, safety-critical context visible.
- Make automatic system actions observable.
- Support handover with recent changes, acknowledgements, responsible person, and unresolved items.

Failure patterns:

- Hundreds of values are visible, but the operator cannot tell what needs attention.
- A critical alarm disappears after acknowledgement even though the condition remains.
- A queue automatically reorders itself without explanation.
- A screen shows current values but no trend, setpoint, or acceptable range.

### Make alarms actionable

Good practices:

- Prioritize by consequence and urgency, not simply the time received.
- Distinguish a new alarm, acknowledged alarm, cleared condition, suppressed alarm, and stale/disconnected signal.
- State the affected asset, condition, time, and recommended first response.
- Group cascades around a probable root cause where defensible.
- Avoid excessive alarms that make everything feel equally urgent.

Failure patterns:

- Every alarm is red and blinking.
- “Acknowledge all” hides unresolved conditions.
- Alarm codes require a separate manual to interpret.
- A quiet, high-consequence alarm is buried below many low-value warnings.

### Balance safeguards and expert flow

Good practices:

- Use role-appropriate permissions and explanations.
- Provide previews, dry runs, templates, and reversible staging for complex configurations.
- Let experts use keyboard shortcuts, copy/paste, batch editing, and saved configurations.
- Require stronger friction in proportion to consequence, uncertainty, and reversibility.

Failure patterns:

- Routine changes require repeated confirmations.
- A novice can trigger a hazardous operation because the button is visible.
- Experts work around the interface with untracked scripts because batch work is impossible.
- Permission failure appears only after a long form has been completed.

## Common design traps and better responses

| Trap | Why it fails | Better response |
|---|---|---|
| “Make it intuitive” | Intuition depends on prior experience and domain conventions. | Name the intended users, test key tasks, use familiar language, and provide discoverable guidance. |
| “Make it cleaner by hiding things” | Hidden information may reduce awareness or increase navigation. | Prioritize and layer information; keep critical state persistent. |
| “Use red for errors and green for success” | Color alone excludes some users and may be ambiguous. | Pair color with text, icon, shape, and position; verify contrast. |
| “Add a confirmation” | Repetition creates habituation and does not clarify consequences. | Prefer constraints, undo, review, and consequence-specific confirmation for high-risk actions. |
| “Users should read the manual” | Memory and attention are limited, especially under pressure. | Put essential guidance at the decision point; keep deeper reference material available. |
| “Experts want every value on one screen” | Density without hierarchy weakens attention and comparison. | Preserve density but organize by task, priority, relationship, and change. |
| “One dashboard works for everyone” | Roles have different goals, permissions, time horizons, and vocabulary. | Create role-aware views on a consistent underlying model. |
| “More data means better decisions” | Unfiltered data raises cognitive load and can mask weak signals. | Show decision-relevant summaries with drill-down and provenance. |

## A quick severity rubric

Ask three questions for each finding:

1. **Impact:** If the issue occurs, is the result cosmetic irritation, delay, lost work, invalid science, equipment damage, or personal risk?
2. **Likelihood:** How often will the relevant users encounter the condition, and how easily can the error occur?
3. **Detectability/recovery:** Will the user notice before harm, understand what happened, and recover cheaply?

Use simple labels during the exercise:

- **Critical:** plausible safety, equipment, security, or scientific-integrity consequence; difficult to detect or recover from.
- **High:** blocks a key task, causes major delay or data loss, or creates frequent serious errors.
- **Medium:** causes confusion, rework, or avoidable mistakes but has a practical workaround.
- **Low:** small friction or cosmetic inconsistency with limited task impact.

Severity depends on context. Do not assign a critical rating without describing a credible consequence chain.

## One-page participant checklist

When examining a screen, ask:

- What is the user trying to do, and what matters most at this moment?
- Can they tell the current state, data freshness, progress, and result of an action?
- Are labels, units, ranges, timestamps, and relationships clear?
- Is the primary action obvious? Are risky actions distinct and proportional to consequence?
- Can errors be prevented, understood, and recovered from without losing work?
- Can the user navigate without losing experiment, sample, selection, or time context?
- Is meaning available without relying on color, memory, tiny targets, hover, or perfect vision/dexterity?
- Are measured versus commanded values, uncertainty, calibration, and provenance handled honestly?
- Does the interface support both careful novices and efficient experts?
- What evidence supports the critique, who is affected, and how would a proposed change be tested?

