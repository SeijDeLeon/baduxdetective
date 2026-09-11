# Facilitator runbook: Bad UX Detective

## Purpose and learning outcomes

By the end of this 50-minute exercise, participants should be able to:

- distinguish an observable interface problem from a personal preference;
- explain who is affected, in what context, and what the likely consequence is;
- connect a problem to a reusable UX principle;
- recommend a concrete improvement without redesigning the entire product;
- recognize that scientific software must balance usability, safety, precision, and expert efficiency.

The exercise is not a visual-design contest. Reward observations about comprehension, control, error prevention, recovery, accessibility, and workflow fit—not merely aesthetics.

## Before the session

### Room and materials

- Seat people in groups of about five. Four to six works well.
- Make each interface large enough to read from the back of the room. If fine text matters, provide a QR code or one printed copy per group.
- Prepare five live cases and keep three as alternates. The recommended set is in the README.
- Give each group one copy of the participant worksheet per round, or one reusable sheet with five numbered sections.
- Have a visible five-minute countdown timer.
- Provide thick markers if groups will write on paper.
- In a group of five, suggest these lightweight roles: navigator, recorder, risk advocate, accessibility advocate, and reporter. Rotate the reporter each round.
- Keep the facilitator answer key out of view.

### Slide sequence

Prepare these slides in order:

1. Title and premise: “Bad UX Detective: observe, explain, improve.”
2. Learning goals and critique rule.
3. The observation formula.
4. The participant UX checklist.
5. Round instructions and timing.
6–10. One slide per selected interface.
11. Closing reflection.

Each case slide should show only the interface, its one-sentence scenario, and the task the user is trying to complete. Do not label or circle planted flaws.

## The critique format to teach

Ask participants to phrase each finding this way:

> **We noticed** [specific, observable interface behavior]. **This may cause** [effect] **for** [user/context]. **We would change** [specific intervention] **so that** [expected improvement].

Example:

> We noticed that “Vent,” “Purge,” and “Isolate” are identical gray buttons placed next to each other. This may cause an operator under time pressure to choose a hazardous action accidentally. We would separate destructive controls, use explicit state-dependent labels, and require confirmation that states the consequence, so that intent is clearer and slips are less likely.

Discourage “I don’t like it,” “it looks old,” or “make it cleaner” unless the group can name the user impact and a testable improvement.

## Exact 50-minute agenda

| Time | Duration | Activity | Facilitator action |
|---|---:|---|---|
| 0:00–0:02 | 2 min | Welcome and premise | Frame the activity as evidence-based critique, not taste or blame. |
| 0:02–0:08 | 6 min | Good vs. bad UX overview | Teach the checklist from the principles guide with one quick example. |
| 0:08–0:11 | 3 min | Explain roles and method | Form groups, assign the first reporter, teach the observation formula, and explain timing. |
| 0:11–0:18 | 7 min | Round 1 | 5 minutes group investigation; 2 minutes report/debrief. |
| 0:18–0:25 | 7 min | Round 2 | 5 minutes group investigation; 2 minutes report/debrief. |
| 0:25–0:32 | 7 min | Round 3 | 5 minutes group investigation; 2 minutes report/debrief. |
| 0:32–0:39 | 7 min | Round 4 | 5 minutes group investigation; 2 minutes report/debrief. |
| 0:39–0:46 | 7 min | Round 5 | 5 minutes group investigation; 2 minutes report/debrief. |
| 0:46–0:50 | 4 min | Synthesis and close | Identify recurring principles, ask for one takeaway, and give a next-use prompt. |

Total: exactly 50 minutes.

## Opening script (0:00–0:11)

### Welcome and premise — 2 minutes

Suggested wording:

> Today you are UX detectives. You will inspect interfaces, identify evidence of possible trouble, and propose targeted improvements. The question is not whether an interface is pretty. The question is whether a particular person can understand the state of the system, accomplish the task safely and efficiently, and recover when something goes wrong. A strong finding names the evidence, the affected user and context, the consequence, and a plausible change.

Add two ground rules:

1. Critique the interface and workflow, not the people who made it.
2. Treat a proposed fix as a hypothesis to test, not as the single correct answer.

### Good vs. bad UX overview — 6 minutes

Use the mnemonic **S.C.A.N. E.R.** to introduce six lenses:

- **S — State:** Can I tell what the system is doing now, what changed, and whether information is live or stale?
- **C — Clarity:** Are labels, units, hierarchy, and relationships understandable in the user’s language?
- **A — Action:** Is the next action apparent, and are dangerous or irreversible actions distinct?
- **N — Navigation:** Can I find the right place and stay oriented without memorizing the system?
- **E — Error handling:** Does the design prevent mistakes, validate near the source, and help me recover?
- **R — Reach and robustness:** Does it work across vision, color perception, input methods, screen sizes, expertise levels, and realistic operating conditions?

For scientific interfaces, add four domain questions:

- Are units, precision, ranges, timestamps, and provenance explicit?
- Are commanded values distinguishable from measured values?
- Are alarms prioritized by consequence and paired with a response?
- Can an expert move quickly without making the novice guess—and without bypassing safety?

Show one miniature example: a red number reading `12.7` is ambiguous. It needs a label, unit, acceptable range, meaning of red, timestamp, and possibly a next action.

### Roles and method — 3 minutes

Say:

> You will have five minutes per case. First, silently scan for 30 seconds so the first voice does not anchor the group. Then pool findings, choose your strongest issue, and write it using “We noticed / This may cause / We would change / So that.” You may record additional findings, but be ready to report one. Rotate the reporter each round. A useful issue can be obvious, subtle, or a missing piece of information.

Remind groups that the interface is a still image. They may make reasonable assumptions, but should state them: “If this button acts immediately…” or “If the timestamp is local time…”.

## How to run each seven-minute round

### Investigation — 5 minutes

Display the scenario and read the task aloud. Start the timer.

- **0:00–0:30:** Silent individual scan.
- **0:30–3:00:** Share and collect observations. Recorder avoids judging ideas yet.
- **3:00–4:15:** Select the issue with the greatest combination of user impact, likelihood, and evidence.
- **4:15–5:00:** Write one clear finding and choose the proposed fix.

Give a two-minute warning and a 30-second warning. During table visits, ask questions rather than confirming answers:

- “What on the screen is your evidence?”
- “Who is most affected, and under what conditions?”
- “What could happen next?”
- “Does the fix address the cause or only the appearance?”
- “How would you know the change helped?”

### Report and micro-debrief — 2 minutes

Use this strict cadence:

- **0:00–0:40:** Call on one group for one issue and fix.
- **0:40–1:20:** Call on a second group for a different issue, or ask the room for a concise addition.
- **1:20–2:00:** Name one underlying principle, reveal one easily missed consideration from the answer key, and transition.

Keep reports to 20 seconds per speaker. If a report is vague, ask only: “What specifically did you observe, and what user consequence follows?” Do not read the full answer key. It is fine—and desirable—for participants to find issues not planted in the case.

## Closing script (0:46–0:50)

At 0:46, remove the final case and show the six S.C.A.N. E.R. lenses again.

Ask for a quick show of hands: “Which lens caught the most serious problems today?” Then invite two participants to complete one sentence: “In my next design or review, I will look for…”

Close with:

> Good UX is not the absence of complexity. It is complexity organized around the user’s decisions. Before changing a screen, describe the user, task, context, evidence, and consequence. Then propose the smallest change likely to improve the outcome, and test it with the people who do the work.

## Choosing cases for the audience

| Audience emphasis | Suggested five cases |
|---|---|
| Beamline users and experimenters | Beamline Control Console; Sample Queue Builder; Scan Results Explorer; Experiment Proposal Form; Data Export Dialog |
| Accelerator operators and controls engineers | Beamline Control Console; Vacuum Interlock Alarm Panel; Sample Queue Builder; Scan Results Explorer; Beamtime Schedule |
| Mixed scientific and administrative staff | Sample Queue Builder; Scan Results Explorer; Experiment Proposal Form; Lab Access Training Portal; Beamtime Schedule |

Order the cases from obvious to subtle. This builds confidence before asking participants to reason about provenance, misleading defaults, collaboration, and accessibility.

## Facilitation guidance

### What counts as a strong answer

A strong finding:

- points to visible evidence rather than an unsupported guess;
- identifies a user, task, and circumstance;
- describes a plausible cost such as delay, wrong data, lost work, unsafe action, or exclusion;
- proposes a specific change connected to the cause;
- acknowledges tradeoffs when relevant;
- can be evaluated through a usability test, error rate, completion time, support volume, or operational incident data.

There is rarely one correct redesign. For example, confirmation dialogs help only when actions are consequential and the confirmation is informative. Adding a confirmation to every action trains people to dismiss them.

### Handling expert-tool objections

If someone says “operators already know that,” respond:

> Expertise legitimately changes what efficiency looks like, but experts are still interrupted, fatigued, handing over shifts, learning a new beamline, or responding under pressure. What information or shortcut would support expertise while keeping state and risk legible?

If someone says “real scientific software is necessarily complex,” respond:

> The workflow may be complex. Which complexity is intrinsic to the science, and which is created by the way the interface exposes it?

### Avoiding an answer-hunt

- Do not score groups on matching the planted flaw list.
- Ask groups to rank issues by severity, not count them.
- Accept new findings when the evidence and reasoning are sound.
- Point out that fixes can conflict: more safeguards may slow urgent work; more data may reduce clarity; automation may reduce workload while obscuring system state.

## Contingencies

### If time is running short

Do not shorten silent scanning or group discussion below four minutes. Instead, take only one report in a debrief, then name the principle yourself. Preserve the four-minute closing.

### If attendance is larger than expected

Keep groups at four to six. Ask all groups to record findings, but preassign two reporting groups per round so transitions remain fast.

### If attendance is smaller than expected

Use pairs or trios. Have each team report the highest-risk issue and one “small friction” issue. You can run four cases and spend an extra two minutes comparing alternative fixes after each.

### If the room is quiet

Prompt with a context change: “Now imagine it is 3 a.m., an alarm is sounding, the operator is color-blind, the run is worth several hours, and shift handover just occurred. What becomes risky?”

### If discussion becomes overly visual

Ask: “What decision does the user need to make here, and what evidence does the interface provide?”

## Optional lightweight evaluation

At the start, ask participants to rate their confidence in spotting UX issues from 1–5. Repeat at the end. For a stronger measure, give a new interface after the session and evaluate whether findings include evidence, user impact, and an actionable fix.

