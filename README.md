# ถึงเวลาคุยกับใครสักคนหรือยัง? — ooca check-in

A 2-minute, no-login, nothing-saved web check-in. Five light questions, then a
non-judgemental suggestion with the reasons behind it.

Built with Next.js 15 (App Router), React 19, TypeScript and CSS Modules. There is
no backend and no third-party request at runtime: fonts and mooca images are self-hosted.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Node 18.18+ (20 or 22 recommended).

## Routes

| Route   | Screen                                                         |
| ------- | -------------------------------------------------------------- |
| `/`     | Entry — mooca greeting, "เริ่มเลย"                              |
| `/quiz` | Q1–Q5 → loading (1.2 s) → Result L1 / L2 / L3, or Crisis       |
| `/help` | Crisis screen on its own (shareable, opened from any page)     |

Inside `/quiz` the help link opens the crisis screen **in place**, so "ย้อนกลับ"
returns to the same question with the answers kept.

## Structure

```
app/
  layout.tsx          root layout, <html lang="th">
  globals.css         ooca CI tokens (colour, elevation, radius), buttons, reduced motion
  fonts.css           self-hosted Prompt @font-face (Thai + Latin)
  page.tsx            /
  quiz/page.tsx       /quiz
  help/page.tsx       /help
components/
  AppShell.tsx        top bar (logo · progress · help link) + footer
  EntryScreen.tsx
  QuizFlow.tsx        state machine: question → loading → result | crisis
  QuestionScreen.tsx  40/60 desktop layout, avatar layout on mobile
  OptionCard.tsx      radio / checkbox card with number-key badge
  LoadingScreen.tsx
  ResultScreen.tsx    title, "เพราะอะไร", next-step cards
  CrisisScreen.tsx    single centred column, 1323 first
  HelpPage.tsx        /help wrapper with back button
  Mooca.tsx, Icon.tsx
hooks/
  useQuizKeyboard.ts  1–N pick, Enter next, Esc back
lib/
  questions.ts        questions, options, mooca reactions (copy lives here)
  result.ts           result rules + "เพราะอะไร" sentences
  resultContent.ts    copy and next steps for each level
  config.ts           links, loading time, which mooca pose each screen uses
  types.ts
public/
  mooca/*.png         cropped from the official mooca sheet
  fonts/*.woff2       Prompt (SIL OFL)
```

## Result rules (`lib/result.ts`)

Checked from the strongest signal down; the first match wins, so one serious
answer is never averaged away. No score is ever shown.

- **Crisis** — Q1 = "รู้สึกไม่อยากอยู่แล้ว" (after pressing ถัดไป), or the help link
- **L3** — any of: Q1 หนักมาก · Q2 เกิน 2 สัปดาห์ / หลายเดือน · Q3 two or more areas · Q4 แย่ลง · Q5 ไม่มีเลย
- **L2** — any of: Q1 หนักใจพอสมควร · Q2 1–2 สัปดาห์ · Q3 one area · Q4 เหมือนเดิม · Q5 มี แต่ไม่อยากเล่า
- **L1** — everything else

"เพราะอะไร" shows up to three of the user's own answers, starting with the ones
that caused the level.

## Accessibility & interaction

- Real `<input type="radio|checkbox">` inside each card; fieldset + legend per question.
- Focus moves to each new question heading; mooca's reaction is an `aria-live` region.
- Visible focus ring in Accent Blue 1 (#1F77DF), distinct from the turquoise selected state.
- Text on Turquoise 1 buttons is `#0F2E2B` (6.6:1). White would be 2.2:1.
- Keyboard: `1–N` pick, `Enter` next, `Esc` back. Hint and number badges are hidden on touch.
- `prefers-reduced-motion`: no slides, hover lifts or bouncing mooca; loading dots stay still.
- Below 860px the layout switches to mobile: mooca becomes a 64px avatar, options stack,
  ถัดไป sits in a sticky footer.

## Before launch

- [ ] Replace the text logo in `components/AppShell.tsx` with the official ooca logo.
- [ ] Confirm `LINKS.oocaBooking` and `LINKS.firstSession` in `lib/config.ts`.
- [ ] Ask ooca for full-resolution mooca files (the PNGs here are cropped from the
      CI sheet, about 240px wide) and, if available, wave / head-tilt poses.
- [ ] Have a clinician review the copy and the result rules.
- [ ] Add the licensed Gotham Rounded web font if ooca wants it for Latin text.
