# InsuranceBuddy 🛡️
> Independent, cross-Atlantic insurance guides and premium estimator platform targeting consumers and families in the **United States (USA)** and **United Kingdom (UK)**.

Designed with a clean, modern **White and Blue** color palette, typography (`Plus Jakarta Sans` & `Inter`), dynamic country switcher, real-time premium estimator, and in-depth educational policy analyses.

---

## 🌟 Key Features

1. **White & Blue Aesthetic**:
   - Clean white surfaces, royal navy headings, vibrant cobalt buttons, ice blue highlights, and subtle modern box-shadows.
   - Fully responsive design engineered from scratch with Vanilla CSS.

2. **USA & UK Dual-Market Focus**:
   - **Interactive Jurisdiction Switcher**: Instantly toggles between 🇺🇸 United States (USD `$`) and 🇬🇧 United Kingdom (GBP `£`), dynamically adapting currency markers, insurance terms, and coverage guidelines.
   - **Cross-Border Rosetta Stone**: Side-by-side glossary comparing US concepts (Deductibles, Copays, ACA Marketplace, MOOP, HO-3/HO-5) with UK equivalents (Excess, NHS, Private Medical Insurance / PMI, Buildings & Contents, Written-in-Trust IHT rules).

3. **3 Comprehensive, In-Depth Insurance Guides**:
   - **Guide 1 (Health & Medical)**: *US vs UK Healthcare & Insurance: Deciphering Deductibles, PMI, and NHS Coverage* (Knee arthroscopy case study, HSA tax rules, ACA tiers vs Bupa/AXA PMI).
   - **Guide 2 (Life & Income)**: *Term vs Whole Life Insurance in 2025: A Cross-Atlantic Guide for Families* (The D.I.M.E. formula, avoiding whole-life commission traps, writing UK policies in trust to dodge 40% IHT).
   - **Guide 3 (Home & Hazard)**: *Homeowners & Property Protection: US Hazard & Flood vs UK Buildings & Contents Cover* (Rebuild cost vs market value fallacy, FEMA/NFIP flood vs UK Flood Re, and subsidence).

4. **Interactive Tools & Pages**:
   - **Quick Premium Estimator**: Real-time baseline cost estimator based on insurance category, coverage tier, and applicant age.
   - **Search & Category Filter**: Live filter on homepage and blog hub by keyword and category tag (Health, Life, Homeowners).
   - **Pages Included**:
     - `index.html` (Homepage & Hero Estimator)
     - `blog.html` (Knowledge Hub & Search Filter)
     - `post-health-insurance-us-uk.html` (Health Insurance Deep-Dive)
     - `post-life-insurance-guide.html` (Life Insurance Deep-Dive)
     - `post-property-insurance-guide.html` (Property & Hazard Deep-Dive)
     - `about.html` (Mission, Editorial Board & Compliance)
     - `contact.html` (Transatlantic Bureaus & Inquiry Form)

---

## 📁 Project Structure

```
adstra web 3/
├── index.html                           # Main Homepage with interactive estimator
├── blog.html                            # Blog Directory & Search Hub
├── post-health-insurance-us-uk.html     # Guide 1: US vs UK Health Insurance
├── post-life-insurance-guide.html       # Guide 2: Term vs Whole Life
├── post-property-insurance-guide.html   # Guide 3: Home & Hazard Protection
├── about.html                           # About Us & Editorial Standards
├── contact.html                         # Contact & Cross-Atlantic Hubs
├── css/
│   └── styles.css                       # White and Blue modern CSS design system
├── js/
│   └── main.js                          # Region switcher, calculator, filter & modal
├── images/
│   ├── health-insurance.svg             # Vector illustration for Health Guide
│   ├── life-insurance.svg               # Vector illustration for Life Guide
│   └── property-insurance.svg           # Vector illustration for Property Guide
└── README.md                            # Documentation
```

---

## 🚀 Running Locally

No dependencies or build steps are required. You can open any HTML file directly in any modern web browser or run with any local dev server:

```bash
# Using python http server:
python -m http.server 8000

# Or with npx serve:
npx serve .
```

Navigate to `http://localhost:8000` to view **InsuranceBuddy**.
