### Fluxul de lucru pe scurt (The "Safe" Way)

'git checkout <numele_branchului>' obliga git-ul sa schimbe locatia branchului

1. **START:** `git checkout main` apoi `git pull` (ia ce e nou).
2. **LUCRU:** `git checkout -b <numele_branchului>` (creaza un branch nou cu numele dat).
3. **SALVARE:** `git add .` și `git commit -m "Mesaj clar"`.
4. **FINALIZARE:** `git push origin <numele_branchului>`.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


