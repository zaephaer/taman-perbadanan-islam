# Taman Perbadanan Islam Rengit — Landing Page

A bilingual (Malay/English) property marketing landing page for **Taman Perbadanan Islam, Rengit**, a residential development project (RMMJ-D) by **PIJ Property Development Sdn Bhd** under Perbadanan Islam Johor (PIJ).

Live preview is hosted on Replit and deployable via Replit Deployments.

---

## About the Project

**Taman Perbadanan Islam Rengit** is a freehold Rezab Melayu housing development in Rengit, Johor. The development offers:

- **Property type**: 2-Storey Terrace House
- **Built-up area**: 1,400 sq ft
- **Bedrooms / Bathrooms**: 3 + 1 / 2
- **Land area**: 20' × 70'
- **Price**: From RM300,000
- **Title**: Freehold (Rezab Melayu)
- **CCC target**: June 2026
- **Total units**: 35

The landing page serves as the primary lead-capture and information hub for prospective buyers.

---

## Page Sections

| Section | Description |
|---|---|
| **Navbar** | Sticky navigation with PIJ logo and CTA button |
| **Hero** | Split layout — project title & key specs (left), property photo (right) |
| **Stats Strip** | Key highlights: price, units, title type, CCC date |
| **About** | Project overview and developer background |
| **Specifications** | Detailed unit specs, land details, finishes |
| **Gallery** | Property photo gallery |
| **Location** | Map embed and nearby amenities |
| **How to Apply** | Step-by-step application process |
| **Lead Form** | Contact & interest capture form (saves to Google Sheets) |
| **CTA Bar** | WhatsApp and registration CTAs |
| **Footer** | Developer info and contact links |

---

## Tech Stack

### Frontend (`artifacts/taman-perbadanan-islam`)

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite** | Build tool & dev server |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Page animations and scroll-triggered reveals |
| **React Hook Form** | Form state management |
| **Zod** | Form validation schema |
| **Lucide React** | Icons |
| **Poppins / Open Sans** | Fonts (via Google Fonts) |

### Backend (`artifacts/api-server`)

| Technology | Purpose |
|---|---|
| **Express 5** | HTTP API server |
| **TypeScript** | Type safety |
| **@replit/connectors-sdk** | OAuth-authenticated Google Sheets & GitHub API access |
| **Drizzle ORM** | Database ORM (PostgreSQL) |
| **Pino** | Structured logging |
| **Zod** | Request validation |

### Infrastructure

| Service | Purpose |
|---|---|
| **Replit** | Hosting, secrets management, OAuth integrations |
| **Google Sheets** | Lead capture storage (via Replit Google Sheets connector) |
| **GitHub** | Source code repository |
| **pnpm workspaces** | Monorepo package management |

---

## Project Structure

```
/
├── artifacts/
│   ├── taman-perbadanan-islam/     # React + Vite frontend
│   │   ├── public/
│   │   │   ├── hero.jpeg           # Property photo
│   │   │   └── logo.png            # PIJ logo (transparent)
│   │   └── src/
│   │       └── pages/home.tsx      # Main landing page (all sections)
│   └── api-server/                 # Express API backend
│       └── src/
│           └── routes/
│               └── leads.ts        # POST /api/leads → Google Sheets
├── lib/                            # Shared workspace libraries
│   ├── api-spec/                   # OpenAPI contract
│   ├── api-client-react/           # Auto-generated React Query hooks
│   ├── api-zod/                    # Auto-generated Zod schemas
│   └── db/                        # Drizzle ORM schema & migrations
├── replit.md                       # Project notes and key commands
└── README.md
```

---

## Lead Capture Flow

1. Visitor fills in the interest form (nama, telefon, emel, lokasi, pendapatan, status pemilikan, cara hubungi, catatan)
2. Form submits a `POST` request to `/api/leads`
3. The API server validates required fields and calls the Google Sheets API via the Replit connector
4. A new row is appended to the configured Google Sheet (ID stored in `GOOGLE_SHEET_ID` environment variable)
5. The sheet columns are: `Tarikh/Masa | Nama | Telefon | E-mel | Lokasi | Pendapatan | Status | Cara Hubungi | Catatan`

---

## Environment Variables

| Variable | Description |
|---|---|
| `GOOGLE_SHEET_ID` | Google Spreadsheet ID for lead capture |
| `GITHUB_PAT` | GitHub Personal Access Token for pushing to GitHub |
| `SESSION_SECRET` | Secret for session signing |
| `PORT` | Auto-assigned by Replit per artifact |

---

## Running Locally (Replit)

Both services run automatically via Replit Workflows:

```bash
# Frontend
pnpm --filter @workspace/taman-perbadanan-islam run dev

# API Server
pnpm --filter @workspace/api-server run dev
```

---

## Pushing to GitHub

Since git config modifications are blocked in some environments, push using the inline authenticated URL:

```bash
git push "https://zaephaer:${GITHUB_PAT}@github.com/zaephaer/taman-perbadanan-islam.git" main
```

---

## Developer

**PIJ Property Development Sdn Bhd**
Subsidiary of Perbadanan Islam Johor (PIJ)

- Phone: +60 12-434 6073
- WhatsApp: [wa.me/60124346073](https://wa.me/60124346073)
