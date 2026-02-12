# PhoodLen Frontend

PhoodLen ("พูดเล่น") is an interactive English learning platform designed to make learning feel like playing. It focuses on helping users improve their English skills, starting with TOEIC preparation and advancing to confident speaking for career opportunities.

## Features

-   **Brand Landing Page**: Engaging introduction to the platform's mission and roadmap.
-   **TOEIC Preparation**:
    -   **Assessment**: Check your current level.
    -   **Practice**: Targeted exercises for Listening and Reading.
    -   **Analytics**: Track your progress and identify weak points.
-   **Interactive Learning**:
    -   **Speaking Practice**: AI-powered conversation partners (Coming Soon).
    -   **Business English**: Professional communication skills (Coming Soon).
-   **User System**:
    -   **Authentication**: Secure login and registration.
    -   **Profile**: manage user settings and progress.

## Tech Stack

This project is built with modern web technologies:

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
-   **Forms**: [React Hook Form](https://react-hook-form.com/)
-   **HTTP Client**: [Axios](https://axios-http.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/phoodlen-frontend.git
    cd phoodlen-frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    Create a `.env.local` file in the root directory and add necessary variables (e.g., API base URL).
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8000
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the application for production.
-   `npm run start`: Starts the production server.
-   `npm run lint`: Runs ESLint to check for code quality issues.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
