
# Game Hub

Game Hub is a web application built with **React**, **TypeScript**, and **Vite**, integrated with **Firebase** for authentication and backend services, and the **RAWG API** for video game data.  
The project was inspired by the course [React 18 for Beginners](https://codewithmosh.com/p/ultimate-react-part1) by Mosh Hamedani and developed as a hands-on implementation to **apply modern React best practices**. Its primary purpose was to strengthen practical experience in areas such as component-driven design, state management with hooks, client-side routing, and the integration of third-party APIs within a scalable frontend architecture.

---

## Features

- User authentication (Login & Signup) using Firebase
- Protected routes for authenticated users
- Integration with the RAWG Video Games Database API
- Modern React architecture with reusable components
- Fast development and build times powered by Vite
- Environment-based configuration using `.env` files

---

## Tech Stack

- **Frontend:** React + TypeScript
- **Build Tool:** Vite
- **Backend Services:** Firebase
- **External API:** RAWG Video Games Database
- **Styling:** CSS / Theme-based styling
- **Package Manager:** npm

---

## Project Structure

```
src/
├── app/          # Application entry point and routing
├── auth/         # Authentication-related components
├── components/   # Reusable UI components
├── services/     # External services (Firebase, APIs)
├── styles/       # Global styles and theme configuration
├── assets/       # Static assets
└── types/        # Shared TypeScript types
```

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/game-hub.git
cd game-hub
```

2. Install dependencies:

```bash
npm install
```

3. Create and configure the environment variables (see below).

4. Start the development server:

```bash
npm run dev
```

---

## Environment Variables Configuration

Create a file named `.env` in the root of the project and add the following variables:

### Firebase Configuration

```env
VITE_FIREBASE_API_KEY=""
VITE_FIREBASE_AUTH_DOMAIN=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_STORAGE_BUCKET=""
VITE_FIREBASE_MESSAGING_SENDER_ID=""
VITE_FIREBASE_APP_ID=""
VITE_FIREBASE_MEASUREMENT_ID=""
```

### RAWG API Configuration

```env
VITE_RAWG_API_KEY=""
```
---

**Autors:** Dylan Molina Arroyo, Fabricio Alfaro, Sharonblanpi1234

**License:** This project is for educational and development purposes.
