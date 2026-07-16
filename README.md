# Club Intellectuals — нов сайт (Next.js + Supabase + Vercel)

Двуезичен (EN/SK) сайт с админ панел за новини, събития и проекти.

## Структура
- `app/[locale]/…` — публичните страници (EN/SK)
- `app/admin` — админ панел (login със Supabase Auth)
- `lib/i18n.ts` — всички текстове на двата езика (редактирай тук)
- `supabase/schema.sql` — схемата на базата (изпълнява се веднъж в Supabase)

## 1. Supabase (безплатно)
1. Регистрирай се на https://supabase.com и създай нов проект (region: EU).
2. В **SQL Editor** → New query → постави съдържанието на `supabase/schema.sql` → Run.
3. В **Authentication → Users** → Add user → създай админ акаунт (email + парола).
   Препоръка: в Authentication → Sign In / Up изключи "Allow new users to sign up".
4. От **Project Settings → API** копирай `Project URL` и `anon public` ключа.

## 2. Локално стартиране
```bash
cp .env.example .env.local   # попълни URL и anon key
npm install
npm run dev                  # http://localhost:3000
```
Админ панелът е на http://localhost:3000/admin

## 3. Deploy във Vercel (безплатно)
1. Качи кода в GitHub репо.
2. https://vercel.com → Add New Project → импортирай репото.
3. В Environment Variables добави:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy. Накрая: Settings → Domains → добави clubintellectuals.com.

## Сигурност
- Данните са защитени с Row Level Security: анонимните посетители виждат само
  публикувано съдържание и могат само да изпращат съобщения.
- Само логнат (authenticated) потребител може да създава/редактира съдържание
  и да чете съобщенията от контактната форма.
