# Task Manager using React and Firestore Firebase)

Task management application using ReactJS,
Fastify (for the backend), and Firebase Firestore. The application should allow users to
add, delete, and update tasks.

## Frontend Development Requirement:
- Set up a React application with at least three components: TaskList, TaskForm,
and Task.
- Implement routing with React Router.
- Use Axios or Fetch API to connect to the backend APIs.

## Backend Development Requirement:
- Initialize a Fastify project
- Set up middleware for parsing JSON and handling CORS.
- Create endpoints for managing tasks (GET, POST, PUT, DELETE).
- Integrate with Firestore to perform CRUD operations on tasks.

## Database Integration:
- Design and set up a Firestore database schema suitable for task management.
- Implement security rules in Firestore to protect the data.

## Getting Started

Instructions for setting up your project locally.

### Prerequisites

List any software or libraries that need to be installed before your project can be set up.

- [Node.js](https://nodejs.org/) version 14.x or above
- [npm](https://www.npmjs.com/) version 6.x or above

# Installation
```sh
git clone https://github.com/kevinjanbarluado2/taskmanager-react-firestore

# Navigate to the project directory
cd taskmanager-react-firestore/

# Install dependencies
npm install

# Install dependencies in both server and client directories (see package.json to see scripts)
npm run install

# One done, duplicate service-account-key.json.example to service-account-key.json
cp server/config/service-account-key.json.example server/config/service-account-key.json

# Follow the instruction below how to get the service account key, and overwrite 'server/config/service-account-key.json' file

# Finally, start both React and Node.js concurrently. (see package.json to see scripts)
npm start

# (Optional) You can modify the API port by changing the .env files in both the server and client directories. The default port is 3001.
```

# Get service-account-key.json
Here’s a step-by-step guide to set up Firestore in Native mode and integrate it with your Fastify project

1. Create a Google Cloud Project:
- Go to the Google Cloud Console.
- Click on the project drop-down menu at the top of the page and select "New Project".
- Enter a project name and click "Create".

2. Enable Firestore:
- Navigate to the Firestore section in the Google Cloud Console.
- Select your project from the project drop-down menu.
- Click "Create Database".
- Choose "Start in Native mode" and select a location that is geographically close to your users for lower latency.
- Click "Next" and follow the prompts to complete the setup.

3. Create a Service Account and Download Credentials:
- Go to the Service Accounts page in the Google Cloud Console.
- Click "Create Service Account".
- Enter a name for the service account and an optional description, then click "Create".
- Grant the "Cloud Datastore User" role to the service account and click "Continue".
- Click "Done" to finish creating the service account.
- Find the service account you just created, click on it, then go to the "Keys" tab.
- Click "Add Key" > "Create new key" and select "JSON". A JSON file will be downloaded to your computer.
