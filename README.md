# GFF 2026 Digital Pass & Contact Card

Mobile-first Digital Business Card & Networking CRM for Global Fintech Fest 2026 (GFF 2026).

## Features
- **Dynamic Profiles**:
  - **Abhigya Kanungo** (`Open for Product & Growth Roles`)
  - **Rishi Raj** (`Senior Associate NBBL | GFF 2026`)
  - **Kamal Parihar** (`Marketing & Growth Executive | Tapits / Fingpay`)
- **One-Tap Save Contact**: Generates standard RFC 2426 `.vcf` file for iOS & Android contacts.
- **WhatsApp Intro**: Pre-filled networking message.
- **On-Screen QR Sharing**: Modal to share profile URL via QR code.
- **Private Owner Vault**: Locked by default (PIN: `2026`) to log contacts met at GFF.

## Deployment Instructions

### Option 1: GitHub Pages
1. Push this folder to a new GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for GFF 2026 Digital Pass"
   git remote add origin https://github.com/YOUR_USERNAME/gff-digital-card.git
   git push -u origin main
   ```
2. In GitHub repository settings -> **Pages** -> Select `main` branch -> **Save**.

### Option 2: Vercel / Netlify
1. Connect your GitHub repository to Vercel or Netlify.
2. Publish with root directory `./` (no build step required).
