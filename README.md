# 🌍 Superteam Global Builder Dashboard (Solana)

A public dashboard to visualize, rank, and celebrate **Solana builders across the globe**.

This project focuses on:
- 🌎 Geographic distribution of builders
- 🏆 Country & region leaderboards
- ⭐ Contribution-based rankings
- 🔍 Builder discovery
- 😅 Friendly internal competition between Superteam chapters

---

## ✨ Why this exists

Superteam is a global, community-driven ecosystem — but its impact is fragmented across regions.

This dashboard aims to:
- Make Superteam’s global builder footprint visible
- Encourage healthy competition between countries & chapters
- Recognize top contributors publicly
- Serve as a future internal tool for country leads

---

## 🧱 Data Model (MVP)

The project is intentionally **scrappy-first**.  
We launch with partial data and enrich over time.

### Core CSV Schema (v1)

```csv
wallet,
display_name,
title,
country,
country_code,
earned,
submissions,
won,
score
```

### Column details

| Column         | Description                             |
| -------------- | --------------------------------------- |
| `wallet`       | Unique identifier for the builder       |
| `display_name` | Builder name or handle                  |
| `title`        | Role (dev, designer, writer, etc.)      |
| `country`      | Builder’s country                       |
| `country_code` | ISO country code (derived from country) |
| `earned`       | Total earnings from bounties / grants   |
| `submissions`  | Number of submissions made              |
| `won`          | Number of wins                          |
| `score`        | Derived contribution score              |

> Fields like `chapter`, `profile_url`, and `points` are intentionally optional and will be added later once access is available.

---

## ⭐ Scoring System

Inspired by Talent Protocol points, but tailored for Superteam & Solana.

### v1 Scoring Formula

```text
score =
  (won * 50)
+ (submissions * 10)
+ (earned * 0.01)
```

### Rationale

* 🏆 Wins matter most
* 🧪 Effort is rewarded
* 💰 Earnings count, but don’t dominate

The formula is configurable and can evolve without breaking the UI.

---

## 🏆 Leaderboards & Rankings

### Country-level

* Total builders per country
* Country ranking by:
  * Builder count
  * Total score
* Top builder per country

### Region-level

* Aggregate score by region
* Region vs region comparison

### Builder-level

* Overall rank (by score)
* Country rank (derived)
* Metric-specific leaderboards:
  * Most wins
  * Most submissions
  * Highest earnings

---

## 🗺️ Map & Discovery

* World map shaded by builder count
* Click a country to:
  * View total builders
  * See rankings
  * Discover builders from that country

This turns the dashboard into a **discovery tool**, not just stats.

---

## 🧩 Handling Missing Data (Important)

This project launches **before full access** to all Superteam data.

### Principles:

* Missing data ≠ bad builder
* No “0 earned” shaming
* Graceful fallbacks everywhere

### UX behavior:

* Show “Stats coming soon”
* Encourage “Claim your profile” (future)
* Rank by builder count when scores are unavailable

---

## 🚀 Launch Philosophy

This project intentionally:

* Ships early
* Improves iteratively
* Prioritizes visibility over perfection

We prioritize being:

* Simple
* Visual
* Social-first
* Slightly incomplete, but confident

This dashboard follows this philosophy.

---

## 🛣️ Roadmap

### Phase 1 (Current)

* CSV-based ingestion
* Country & region leaderboards
* Score-based rankings
* Public map & discovery

### Phase 2

* Builder profile pages
* Chapter-based leaderboards
* Claim-your-profile flow
* Profile verification

### Phase 3

* Auto-sync from Superteam bounties
* GitHub & onchain signals
* Time-based seasons
* Internal dashboards for country leads

---

## 🤝 Transparency

All data used in v1 is:

* Public
* Curated
* Subject to correction

Builders will be able to claim and update profiles in future versions.

---

## 🫡 Credits & Inspiration

Inspired by:

* Talent Protocol’s identity & scoring model
* Superteam’s global community ethos

Built for the Solana ecosystem.

---

## 📬 Feedback

If you’re a builder, chapter lead, or Superteam contributor:

* Feedback is welcome
* Corrections are encouraged
* Contributions are appreciated

Let’s make Superteam’s global impact visible 🌍
