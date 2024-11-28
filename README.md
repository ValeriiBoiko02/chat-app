# Chat Room Application with Automated Testing

This project implements a simple chat room application with automated testing using WebdriverIO and Cucumber.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Chrome browser (for testing)

## Project Structure

```
├── backend/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── ...
│   └── package.json
├── features/
│   ├── login.feature
│   ├── chat.feature
│   └── step-definitions/
│       └── steps.js
│   └── pages/
│       └── ChatPage.js
│       └── LoginPage.js
├── wdio.conf.js
└── package.json
```

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
npm start
```

The backend will run on http://localhost:3001

### 2. Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will run on http://localhost:3000

### 3. Database Setup

Make sure MongoDB is running locally on port 27017. The application will automatically create a database named `chatapp`.

### 4. Running Tests

```bash
# Install test dependencies
npm install

# Run all tests
npm run test:all 
# Run UI tests
npm run test:ui 
# Run API tests
npm run test:api 
```

## Test Reports

After running the tests, you can find the Allure report in the `allure-results` directory. To view the report:

```bash
npm install -g allure-commandline
npm run allure-report 
```

## Default Test User

The application comes with a default test user