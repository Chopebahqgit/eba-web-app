# 🥗 EBA - Eat Big Affordably

EBA is a modern web application designed to **reduce food wastage** by connecting **supermarkets, grocery stores, and food vendors** with **buyers** who want quality food items at **discounted prices** before they reach their expiry date.

The platform works like an e-commerce marketplace, but with a mission-driven approach: **save food, save money, and protect the environment**.

---

## 🌍 Problem Statement

Every year, tons of edible food are wasted due to expiry dates, overstocking, and inefficient distribution. Supermarkets often discard products that are still safe for consumption, while many people struggle with food affordability.

**EBA bridges this gap** by enabling vendors to sell near-expiry food items at slashed prices, and buyers to access affordable, quality food—**a win-win for everyone**.

---

## 💡 Solution Overview

FreshSave provides:

* A marketplace for **near-expiry food items**
* **Discounted pricing** controlled by vendors
* Real-time inventory visibility
* Secure checkout and order tracking
* Vendor dashboards for managing listings

---

## 🚀 Key Features

### 🛒 Buyer Features

* Browse discounted food items
* Filter by expiry date, category, price, and location
* View detailed product information
* Add to cart and checkout securely
* Track orders and purchase history
* Receive notifications for flash deals

### 🏪 Vendor Features

* Vendor registration and verification
* Create and manage product listings
* Set expiry dates and dynamic discounts
* Track sales and inventory
* Analytics dashboard (sales, waste reduction impact)

### 🛠️ Admin Features

* Manage users (buyers & vendors)
* Approve or suspend vendor accounts
* Monitor platform transactions
* Platform analytics and reporting

---

## 🧱 Tech Stack

### Frontend

* **Next.js** – React framework for production-grade apps
* **TypeScript** – Type-safe development
* **Tailwind CSS** – Utility-first styling
* **React Query / TanStack Query** – Server state management
* **Zod** – Schema validation

### Backend (Planned / Optional)

* **Node.js /Next.js /Django /Go API Routes**
* **PostgreSQL** (via Prisma)
* **Authentication** – NextAuth / Auth.js
* **Payments** – Stripe / Paystack (region-based)


---

## 🗂️ Project Structure Pattern

```bash
src/
├── app/                # App router
│   ├── (auth)/         # Auth routes
│   ├── (dashboard)/    # User dashboards
│   ├── products/       # Product listings
│   └── checkout/       # Checkout flow
├── components/         # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and helpers
├── services/           # API & data services
├── styles/             # Global styles
└── types/              # TypeScript types
```

---

## 🔐 Authentication & Authorization

* Role-based access control (Buyer, Vendor, Admin)
* Secure session handling
* Protected routes using middleware

---

## ♻️ Sustainability Impact

EBA is more than a marketplace:

* Reduces food waste
* Lowers carbon footprint
* Promotes responsible consumption
* Supports affordable food access

Future versions will include **impact metrics** such as:

* Food saved (kg)
* CO₂ emissions reduced

---

## 🧪 Testing (Planned)

* Unit tests (Jest / Vitest)
* Integration tests

---

## 🧭 Roadmap

* [ ] MVP launch (buyers & vendors)
* [ ] Mobile responsiveness
* [ ] Vendor analytics dashboard
* [ ] Flash sales & smart discounts
* [ ] Push notifications
* [ ] Mobile app (React Native / Expo)

---

## 🛠️ Getting Started

### Prerequisites

* Node.js >= 18
* npm / yarn / pnpm

### Installation

```bash
git clone https://github.com/Chopebahqgit/eba-web-app.git
cd eba-web-app
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙌 Acknowledgements

Built with the goal of combining **technology**, **sustainability**, and **community impact**.

> *Save food. Save money. Save the planet.* 🌱
