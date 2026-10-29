# Intake questions for the Flutter app's Claude Code chat

**To the AI reading this:** another Claude session designed a set of UI changes in a web prototype. Your app is the real one: Flutter, already built, running on the iOS simulator. You will **not** receive code. You will receive guidance describing what to change in the app you already have.

Before anything is sent, inspect your own project and answer the questions below so the handover can be shaped to what you can consume best. **Do not change any code yet.** Answer from the repository, not from assumptions. If something does not exist, say "none".

Reply as one markdown message using the headings and numbers below, as literal and brief as you can.

---

## A. Project facts (read the repo, do not guess)

1. Flutter and Dart versions (`flutter --version`) and minimum iOS target.
2. State management in use (Provider, Riverpod, Bloc, setState, other) and one example file path.
3. Navigation approach (Navigator 1/2, go_router, other) and the file that defines routes.
4. Folder structure, two levels deep (`lib/` tree).
5. Theming: where colours, text styles and spacing are defined (file paths). Is there a design-token file or only `ThemeData`? Paste the colour and text-style names.
6. Fonts declared in `pubspec.yaml` (is **Bricolage Grotesque** or **Roboto** present? which weights?).
7. Icon approach today (Material icons, SVG, a package?). Are you allowed to add a package or SVG assets?
8. Asset handling: current `assets:` folders in `pubspec.yaml`. Which image formats are used? Is `flutter_svg` installed? Does WebP with transparency work in your setup?
9. Animation tooling present (implicit animations, `flutter_animate`, Rive, Lottie, none).
10. How bottom sheets are built today (`showModalBottomSheet`, `DraggableScrollableSheet`, custom). Is drag-to-dismiss already handled?
11. Charts: library or `CustomPainter`? Which file(s)?
12. Any use of `BackdropFilter` or frosted-glass effects?
13. Lint and format rules (`analysis_options.yaml`), and how tests are run (widget, golden, integration). How do you run the app on the simulator?
14. Localization and RTL: is Arabic/RTL text supported already? Dark mode? `Semantics` and text scaling support?

## B. Screen and widget inventory

List every screen, route and major widget with its **file path** and a one-line purpose. Then map them to this list and mark each as `exists`, `partial` or `missing`:

- Home (header with deficit number and progress bar, macros, entries list)
- Entry details bottom sheet
- Add menu (the + button)
- Bottom navigation bar
- Streak / calendar sheet
- Progress screen (Week view and Weight view)
- Settings screen

Also list the data models these screens use (class names and fields): entries and categories, macros, streak, weekly data. The handover will refer to your real names.

## C. Your optimal input standard (the most important part)

Tell us exactly how you want to receive the handover. Answer each:

1. **Format:** markdown with change IDs, YAML, JSON, or something else? Give a short example of one change written the way you prefer.
2. **Granularity:** one narrative per screen, or one entry per widget with before/after? Which makes you most accurate?
3. **Design tokens:** as a table of values (colours, sizes, weights, radii, durations), or as Dart snippets? We can send values but not code.
4. **Units:** confirm that logical pixels (dp) are what you expect for sizes, and how you want font weight written (`FontWeight.w600` or numbers).
5. **Images:** can you read PNG, JPG and WebP pasted into the chat? How many and what size per message? Do you want a screenshot per screen as the visual target, and at which device size (for example iPhone 15, 393×852)?
6. **Files:** can you read SVG, WebP and ZIP files, or must files already be inside the repo? Where should assets go (folder and naming convention)? Do you need @1x/@2x/@3x variants?
7. **Size limits:** the largest single message or file you can handle reliably. Should the handover be split into batches, and in what order do you recommend?
8. **Animation:** how should we describe it, in milliseconds with named Flutter curves (for example `Curves.easeOutCubic`), or another way?
9. **Acceptance criteria:** a checklist per change, a golden test, or a visual comparison? What proves a change is done to you?
10. **Conflicts:** when the app already differs from the new design, should you keep existing behaviour unless told otherwise, or follow the new design? Propose the rule you would follow.
11. **Packages:** may you add dependencies? List any you would avoid, and any you already prefer.
12. **Git:** do you want one commit per change ID, a branch, a PR? Anything to avoid touching?
13. **Open items:** what do you need that is **not** asked above (for example brand colours in a specific format, copy strings, sample data, API shapes)?

## D. Reply template

```
A. Project facts
1. ...
...
B. Inventory
- Home: <path> | exists/partial/missing
...
Models: ...
C. Input standard
1. ...
...
D. Anything else I need: ...
```

When you have answered, stop and wait. Do not start implementing.
