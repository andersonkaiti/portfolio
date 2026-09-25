# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary — recruiters / hiring managers** and **freelance / project clients**, weighted roughly equally. They arrive from a job application, LinkedIn, GitHub, or a referral and scan quickly to judge whether Anderson is a fit for a full-time role (remote or hybrid) or for project work, then look for a way to reach out.
- **Secondary — developer peers** browsing for credibility, technical depth, and GitHub activity.

The shared job: assess credibility and range fast, in their own language, and find a contact path with minimal friction.

## Product Purpose

A personal portfolio that presents Anderson Kaiti as a full-stack web developer and converts a qualified visitor into a contact — for a role or a project. Success is a recruiter or client reaching out.

## Positioning

Breadth of production domains actually shipped — full-stack web interfaces, Smart TV & digital signage, gamification/engagement, fintech & admin dashboards, and logistics/tracking — paired with architectural rigor ("code that survives the next release": scalable, resilient, understanding the *why* behind each choice). The differentiator is concrete, shipped, cross-domain range plus engineering judgment, not a generic list of technologies.

## Operating Context

- Bilingual: full English and Brazilian Portuguese parity via `next-intl`.
- Consumes the GitHub API to display repositories dynamically (ISR, 1h revalidation) with a live contribution graph.
- Deployed on Vercel at `andersonkaiti.com`.
- Sections: Header, About, Solutions, Experiences, Projects, Technologies, Education, Contact/Footer.
- Dark/light mode; contact via email, WhatsApp, LinkedIn, and GitHub.

## Capabilities and Constraints

- **Bilingual EN / PT-BR parity is a hard constraint.** All future content ships in both locales.
- **Projects are pulled live from the GitHub API, not hardcoded** (ISR). Filter rules: a repo must have topics and a description; results are sorted by `pushed_at` (most recently pushed first). This dynamic pipeline is a real constraint, not a convenience.
- **Name and domain identity are fixed:** "Anderson Kaiti" / `andersonkaiti.com`. Do not genericize or rebrand the name.
- Requires `NEXT_PUBLIC_GITHUB_TOKEN` at startup (validated by `@t3-oss/env-nextjs`).
- **Decided:** the downloadable résumé is to be **removed** — it changes too frequently to be kept current, so it is not a durable asset and future work should not treat it as one. (Removal is a follow-up code task, not yet applied.)

## Brand Commitments

- **Name:** Anderson Kaiti. **Role label:** Full-Stack Web Developer.
- **Voice:** confident and technically substantive; bilingual EN/PT-BR.
- **Contact identities (real):** email `anderkaiti@gmail.com`, WhatsApp `+55 14 99805-3657`, LinkedIn `andersonkaiti`, GitHub `andersonkaiti`.

## Evidence on Hand

- **Real work history:** Borebi City Hall (current Full Stack internship — Laravel, React/TypeScript via Inertia.js), Solid Tech (freelance full-stack & mobile — React/Next.js, React Native TVOS, WebSockets), Funprev Bauru (IT internship — PHP, JavaScript, PostgreSQL).
- **Real GitHub repositories**, surfaced live via the API, plus a live contribution graph.
- **Education:** UNISAGRADO — Computer Science bachelor's, 2022–2025 (graduated); English at CNA, C1 advancing to C2.
- **Asserted stat claims in copy:** 4+ years developing, 2 companies, 20+ projects delivered, 5 domains shipped. Treat as the owner's own claims.
- **Absences future work must not fabricate:** no testimonials, no named clients beyond those listed, no benchmarks, no pricing, no licensing or deployment claims beyond the facts above. The résumé PDF currently exists but is slated for removal.

## Product Principles

1. **Show shipped breadth, not stack lists.** Lead with real production domains and outcomes.
2. **Truth over inflation.** Every claim maps to real work; never fabricate proof.
3. **Fast to fit, fast to contact.** A visitor should judge fit and find a contact path within moments — in their language.
4. **Bilingual parity is non-negotiable.** EN and PT-BR always ship together.
5. **Living data.** Projects and activity reflect current GitHub state, not a frozen snapshot.
