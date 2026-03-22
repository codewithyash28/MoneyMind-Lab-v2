# 🧠 MoneyMind Lab

**MoneyMind Lab** is an interactive financial literacy platform specifically designed for teenagers and young adults (ages 15-24). It provides a risk-free "playground" to master essential money management skills through AI-driven guidance, realistic simulations, and engaging mini-games.

---

## 🚀 Key Features

- **🤖 AI Money Chat**: Powered by Google Gemini, offering personalized, friendly, and educational financial advice.
- **🛡️ Scenario Simulations**: Real-world financial decision-making exercises to build practical experience.
- **🎮 Mini-Games**: Interactive tools like Budget Builder and Debt Visualizer to make learning fun.
- **📈 Progress Tracking**: Gamified experience with XP points and module completion tracking.
- **🌍 Global Readiness**: Dynamic currency support and localized financial guidance.
- **🎙️ Voice Integration**: Built-in Web Speech API for interactive voice conversations with the AI.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Frontend**: [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **AI**: [Google Gemini API](https://ai.google.dev/) (@google/generative-ai)
- **Database**: [SQLite](https://www.sqlite.org/) with `better-sqlite3`
- **Authentication**: Stateless JWT sessions with `jose` and `bcryptjs`
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📋 Project Structure

```text
src/
├── app/              # Next.js App Router pages and API routes
│   ├── api/          # Backend API endpoints (onboarding, auth, progress)
│   ├── chat/         # AI Chat interface
│   ├── games/        # Financial mini-games
│   └── scenarios/    # Realistic simulation modules
├── components/       # Reusable UI components (Navbar, Modals, etc.)
├── data/             # Static data and simulation content
├── lib/              # Core utilities (DB, Auth, Gemini, XP logic)
└── proxy.ts          # Custom request proxy (replaces middleware.ts)
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- A Google Gemini API Key

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd moneymind-lab
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env.local` file in the root and add your API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Initialize Database**:
   The application uses a local SQLite database (`moneymind.db`). It will be automatically initialized on first run.

5. **Run the development server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🛡️ Architecture & Design Decisions

- **Proxy Layer**: Uses `src/proxy.ts` for request handling instead of the standard `middleware.ts`.
- **State Management**: Leverages `UserContext` for real-time XP synchronization and profile management.
- **Security**: Implements secure password hashing and stateless JWT-based authentication.
- **Educational Guardrails**: AI assistant is strictly governed by a system prompt to ensure safe, age-appropriate, and non-advisory financial education.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
