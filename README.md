# Cinema App

![Cinema App Logo](src/assets/images/logo.svg)

## Overview

Cinema App is a web application designed to provide users with information about movies. Users can view details about different movies, explore various genres, and manage their favorite movies. The application is built with Vue.js and TypeScript, ensuring a scalable and maintainable codebase.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Features

- **Movie Listings**: Browse through a vast collection of movies.
- **Genre Exploration**: Discover movies based on genres.
- **Favorite Movies**: Save and manage your favorite movies.
- **User Authentication**: Secure login and registration.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies

- **Frontend**: Vue.js, TypeScript
- **HTTP Client**: Axios
- **State Management**: Pinia
- **Build Tool**: Vite
- **Linting**: ESLint
- **Formatting**: Prettier
- **Testing**: Vitest

## Project Structure

```plaintext
.
├── public/                 # Public assets
│   └── favicon.ico         # Favicon
├── src/                    # Source files
│   ├── api/                # API modules
│   ├── assets/             # Assets (styles, fonts, images)
│   ├── components/         # Vue components
│   ├── router/             # Vue Router configuration
│   ├── stores/             # Pinia stores
│   ├── types/              # TypeScript types
│   ├── utils/              # Utility functions
│   ├── views/              # Vue views (pages)
│   ├── App.vue             # Main App component
│   ├── main.ts             # Application entry point
│   └── shims-vue.d.ts      # Vue shims for TypeScript
├── .eslintrc.cjs           # ESLint configuration
├── .gitignore              # Git ignore file
├── .prettierrc.json        # Prettier configuration
├── env.d.ts                # Environment type declarations
├── index.html              # Main HTML file
├── package.json            # Package configuration
├── package-lock.json       # Package lock file
├── README.md               # Project documentation
├── tsconfig*.json          # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── vitest.config.ts        # Vitest configuration
```

## Installation

To get started with the Cinema App, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/cinema-app.git
    cd cinema-app
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Run the development server**:

    ```bash
    npm run dev
    ```

4. **Build for production**:

    ```bash
    npm run build
    ```

## Usage

After installing the dependencies and starting the development server, you can access the application at `http://localhost:5174` (or a different port if specified in the terminal output). Explore the various features like browsing movies, managing favorites, and more.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
