# React Authentication App

This project is a simple authentication application built with React for the frontend and Node.js with Express for the backend. It includes user registration and login functionality, with data stored in a PostgreSQL database.

## Project Structure

```
react-auth-app
├── backend
│   ├── src
│   │   ├── index.ts                # Entry point for the backend application
│   │   ├── controllers             # Contains authentication logic
│   │   │   ├── authController.ts    # Handles user registration and login
│   │   └── models                  # Defines the user model
│   │       └── userModel.ts         # User schema and database interaction
│   ├── package.json                 # Backend dependencies and scripts
│   ├── tsconfig.json                # TypeScript configuration for the backend
│   └── .env                         # Environment variables for the backend
├── frontend
│   ├── public
│   │   └── index.html               # Main HTML file for the frontend
│   ├── src
│   │   ├── components               # Contains React components
│   │   │   ├── Login.tsx            # Login form component
│   │   │   ├── Register.tsx         # Registration form component
│   │   │   └── App.tsx              # Main component managing routing
│   │   ├── styles                   # CSS styles for the frontend
│   │   │   └── App.css              # Styles for the application
│   │   ├── index.tsx                # Entry point for the React application
│   │   └── api                      # API calls to the backend
│   │       └── authApi.ts           # Functions for authentication requests
│   ├── package.json                 # Frontend dependencies and scripts
│   ├── tsconfig.json                # TypeScript configuration for the frontend
│   └── .env                         # Environment variables for the frontend
├── docker-compose.yaml               # Docker configuration for the application
├── README.md                        # Project documentation
└── .gitignore                       # Files to ignore in version control
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- PostgreSQL
- Docker (optional, for running with Docker)

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd react-auth-app
   ```

2. Set up the backend:

   - Navigate to the `backend` directory:
     ```
     cd backend
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Create a `.env` file in the `backend` directory with your database connection details.

3. Set up the frontend:

   - Navigate to the `frontend` directory:
     ```
     cd ../frontend
     ```
   - Install dependencies:
     ```
     npm install
     ```

### Running the Application

- To run the backend server:
  ```
  cd backend
  npm start
  ```

- To run the frontend application:
  ```
  cd frontend
  npm start
  ```

### Using Docker

If you prefer to use Docker, you can run the application using Docker Compose:

```
docker-compose up
```

### API Endpoints

- **POST /register**: Register a new user.
- **POST /login**: Authenticate a user and return a token.
- **GET /names**: Fetch all registered users (for demonstration purposes).

### License

This project is licensed under the MIT License.