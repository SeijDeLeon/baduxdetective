# Bad UX Detective workshop kit

This folder contains a facilitator-ready kit for a 50-minute small-group UX exercise aimed at people who work with scientific instruments, synchrotrons, accelerators, controls, and supporting administrative systems.

## Files

- [01-facilitator-runbook.md](01-facilitator-runbook.md) — exact timing, setup, script, round mechanics, debrief prompts, and contingency plans.
- [02-good-and-bad-ux-practices.md](02-good-and-bad-ux-practices.md) — the teaching content for the opening overview and a compact checklist participants can use.
- [03-interface-briefs.md](03-interface-briefs.md) — eight detailed, generator-ready interface specifications. This file describes what to show without revealing the intended problems.
- [04-facilitator-answer-key.md](04-facilitator-answer-key.md) — intended flaws, suggested fixes, relevant UX principles, and discussion prompts for all eight cases.
- [05-participant-worksheet.md](05-participant-worksheet.md) — a reusable worksheet for recording observations and proposed improvements.
- [06-image-gallery.md](06-image-gallery.md) — presentation-ready previews and direct links to all eight generated interface images.
- [07-improved-interface-gallery.md](07-improved-interface-gallery.md) — paired flawed/improved comparisons, direct image links, and a concise summary of what changed.
- [08-web-ux-research-bad-vs-good-practices.md](08-web-ux-research-bad-vs-good-practices.md) — online research synthesis and a large bad-versus-good website UX catalog, including cues for future AI-generated cases.

## Generated interface images

The `images/` folder contains eight 1672×941 PNG screenshots generated from the specifications in `03-interface-briefs.md`. They intentionally preserve the planted UX problems. Use the images for participant-facing slides and keep `04-facilitator-answer-key.md` private.

The `images/improved/` folder contains a corresponding improved PNG for each case. These redesigns keep the same product and task while applying the remedies from `04-facilitator-answer-key.md`. They are useful for a post-debrief reveal or before/after discussion.

## Recommended live set

Use five cases during the 50-minute session:

1. Beamline Control Console — safety, hierarchy, and system status
2. Sample Queue Builder — data entry, validation, and error prevention
3. Scan Results Explorer — visual encoding and accessibility
4. Experiment Proposal Form — forms, progressive disclosure, and recovery
5. Beamtime Schedule — scheduling, conflicts, and collaboration

The remaining cases are alternates:

- Vacuum Interlock Alarm Panel — best for an operations-heavy audience
- Data Export Dialog — a compact case for a faster group
- Lab Access Training Portal — a general/admin example

Do not give participants the answer key before the exercise. The cases intentionally contain both planted issues and room for legitimate alternative interpretations; the goal is reasoned critique, not guessing a secret list.
