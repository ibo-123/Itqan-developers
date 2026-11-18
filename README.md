# ITQAN DEVELOPERS — Community Recruitment Platform

**إتقان** — Code with Purpose. Build with Mastery.

Recruitment and community management platform for **ITQAN DEVELOPERS**, a technology community at Adama Science and Technology University (ASTU).

ASTU_MSJ is one project initiative under the organization — not the purpose of recruitment.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- MongoDB + Mongoose
- React Hook Form + Zod
- Jose JWT admin sessions + bcryptjs
- Optional email via Resend
- Optional Telegram contact via `NEXT_PUBLIC_TELEGRAM_URL`

## Getting started

```bash
npm install
cp .env.local.example .env.local
npm run seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Default admin

- Email: `admin@itqan.local`
- Password: `ItqanAdmin2026!`

## Key env vars

| Variable | Purpose |
|----------|---------|
| `MONGODB_URI` | Database connection |
| `AUTH_SECRET` | Admin JWT secret |
| `NEXT_PUBLIC_TELEGRAM_URL` | Official Telegram support URL |
| `RESEND_API_KEY` | Optional email delivery |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run seed` | Seed admin, interests, settings, example project |
| `npm run test:unit` | Schema unit checks |

## License

Private community project — all rights reserved.
