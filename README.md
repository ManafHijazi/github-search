# Github Search Next.js App

This is a simple web application built with Next.js.

- ***To view a live demo: (https://seeragithubsearch.vercel.app)***

![Tux, the Linux mascot](/public/images/github.png)

# Getting Started

First, clone the repository and install the dependencies:

```sh
git clone git@github.com:ManafHijazi/github-search.git
cd github-search
npm install
```

Then, you can start the development server:

```sh
npm run dev
```

This will start the app at http://localhost:3000.

# Production

- Run npm run build to build the app for production.

```sh
npm run build
```

- Run npm start to start the production server.

```sh
npm start
```

- Navigate to http://localhost:3000 to view the app.

# Environment Variables

Create a .env file in the root directory of the project and add the environment variables.

( This step is optional if you want to prevent the time out request error to occure too much )

Example:

```sh
NEXT_PUBLIC_GITHUB_TOKEN=YOUR_TOKEN
```

# Adding new environment

- Create a new file in the root directory and rename it based on the required name, for example .env.example.json. Add the required environment variables to the file.

# Folder Structure

```sh
├── components          # React components used throughout the app
├── app                 # Next.js pages
│   ├── layout.jsx      # Custom App component
│   ├── error.jsx       # Custom Error Handling component
│   └── page.jsx        # Home page
├── public              # Static assets
│   └── images          # Image files
├── styles              # Global styles
│   └──  Fonts.css      # Global Fonts
├── helpers             # Utility functions
├── .env                # Local environment variables
├── .gitignore
├── next.config.js      # Next.js configuration
├── package.json
├── README.md
└── package-lock.json
```

# Testing

This app is useing Cypress for unit tests:

- To run these test run the following command:

```sh
npm run test
```

# Technology Stack

This app uses the following technologies:

- Next.js - A framework for building React applications.
- React - A JavaScript library for building user interfaces.

# Customization

This app can be customized to fit your needs. Here are some tips:

Edit the content of the pages in the pages directory.
Modify the styles in the styles directory.
Add new components to the components directory.
Add new hooks functions to the hooks directory.

# Deployment

To deploy your app, you can use a service like Vercel, which provides automatic deployments for Next.js apps.

For more information on deploying Next.js apps, see the Next.js documentation.

# Notice

This project was built using the new features of Next.js 13. If you are running a lower version of Next.js, you may encounter issues or missing functionality. Please ensure that you have upgraded to the latest version of Next.js before attempting to run this project.

To upgrade Next.js, please follow the official documentation at https://nextjs.org/docs/upgrading.
