# ITQAN DEVELOPERS

**إتقان** — Code with Purpose. Build with Excellence.

Official website and recruitment platform for ITQAN DEVELOPERS, a growing software development and technology community at ASTU.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- MongoDB + Mongoose
- React Hook Form + Zod
- Lucide React
- Jose (admin JWT sessions) + bcryptjs

## Getting started

```bash
# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local

# Ensure MongoDB is running, then seed defaults
npm run seed

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Default admin (after seed)

- Email: `admin@itqan.local`
- Password: `ItqanAdmin2026!`

Change these in production.

## Scripts

| Command         | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Start development server   |
| `npm run build` | Production build           |
| `npm run start` | Start production server    |
| `npm run seed`  | Seed admin, specs, project  |
| `npm run lint`  | Run ESLint                 |

## Key routes

- `/` — Homepage
- `/apply` — Membership application
- `/projects` — Public projects
- `/admin/login` — Admin sign-in
- `/admin/dashboard` — Protected dashboard

## Membership note

There is **no fixed maximum** number of members. Founding specializations are focus areas — multiple people can join each specialization.

## License

Private community project — all rights reserved.
