# 🐶 Beloved Dogs

[![Deployment](https://img.shields.io/badge/deployed-netlify-00C7B7)](https://beloved-dogs.netlify.app/)

A modern React application for exploring dog breeds using real [The Dog API](https://docs.thedogapi.com/) data, built as part of the [RS School (React Course)](https://rs.school/courses/reactjs).

## 🛠 Tech Stack

The project is built using the following technologies:

- **TypeScript**
- **React**
- **React Router**
- **TanStack Query**
- **Zustand**
- **React Testing Library (RTL)**
- **Mock Service Worker**
- **SASS**
- **VITE**

## 📦 Installation

1. Clone the repository [url](https://github.com/Ryhus/rs-react-app.git)
2. Install dependencies `npm install`

   ℹ️ The project includes an .nvmrc file.
   You can switch to the required Node.js version (v20.19.0) using:

   `nvm install`

   `nvm use`

   More details about nvm can be found [here](https://github.com/nvm-sh/nvm)

3. Environment variables
   - Create a .env file in the project root
   - Copy the contents from .env.example
   - Add your own API key from https://docs.thedogapi.com/

## 🧪 Linting & Formatting

ESLint and Prettier are used to ensure consistent code style and best practices.

## 🐕 Husky & Git Hooks

- Husky is configured to run on pre-commit
- lint-staged is used to lint and format only staged files

This helps maintain code quality before every commit.

## ✨ Features

- Browse and explore dog breeds
- View detailed breed information
- Client-side routing with clean URL state
- Efficient data fetching and caching
- Global state management for shared UI state
- Theme switcher
- Download data about the breeds into Excel file
- Scalable project architecture following best practices
