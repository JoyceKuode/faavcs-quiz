# FAAVCS Quiz App — Project Rules

## Stack
- Vite + React (no TypeScript)
- Tailwind CSS v4 (CSS-first, `@theme` block in index.css — no tailwind.config.js)
- Supabase for leaderboard persistence and real-time subscriptions
- Google Fonts: Fredoka One (headings) + Inter (body)

## Key Rules
- Do NOT write code. We vibe code.
- Do NOT commit before the human has tested the change.
- Do NOT add TypeScript — this project is intentionally plain JS.
- Do NOT create unnecessary files or abstractions.

## Color Tokens (defined in src/index.css @theme)
- `plejd-teal` #00857A — primary buttons, accents
- `plejd-teal-light` #00A896 — hover states
- `plejd-teal-dark` #005F57 — active states
- `plejd-teal-pale` #E0F5F3 — light backgrounds
- `plejd-teal-mid` #4DB8B0 — secondary text, progress
- `plejd-dark` #0D1F1E — page background
- `plejd-charcoal` #1A2E2D — card backgrounds
- `plejd-offwhite` #F0FAFA — body text

## File Structure
```
src/
  App.jsx              # Screen state machine (splash|name|quiz|results|leaderboard)
  data/questions.js    # 10 quiz questions (static)
  lib/supabase.js      # Supabase client (gracefully null if env vars missing)
  hooks/useQuiz.js     # Timer, scoring, question progression
  components/
    SplashScreen.jsx
    NameEntry.jsx
    TimerBar.jsx
    QuizQuestion.jsx
    ResultsScreen.jsx
    Leaderboard.jsx
```

## Supabase Setup
Run this SQL in the Supabase SQL editor:
```sql
create table public.leaderboard (
  id         uuid default gen_random_uuid() primary key,
  name       text not null,
  score      integer not null default 0,
  total_time integer not null default 0,
  created_at timestamptz default now()
);
alter table public.leaderboard enable row level security;
create policy "Anyone can insert" on public.leaderboard for insert with check (true);
create policy "Anyone can read"   on public.leaderboard for select using (true);
create index leaderboard_score_idx on public.leaderboard (score desc, total_time asc);
```

Then add keys to `.env.local`:
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

## Dev Commands
```bash
npm run dev    # local development
npm run build  # production build
```
