# Notes App With NEVM Stack

A simple, challenge-driven project for recording text-based notes utilizing the **NEVM Stack**. This application serves as a practical exercise to explore the capabilities of **Vue.js** and enhance **Node.js** backend skills.

## 🛠️ Technologies Used

This project is built using the **NEVM Stack** (Node, Express.js, Vue.js and Mongodb) components, along with modern web technologies

![Nodejs](https://img.shields.io/badge/Node.js-333333?style=for-the-badge&logo=node.js&logoColor=6da65e)
![Express](https://img.shields.io/badge/Express-white?style=for-the-badge&logo=express&logoColor=black)
![Vue.js](https://img.shields.io/badge/Vue.js-3ecf8e?style=for-the-badge&logo=vue.js&logoColor=white)
![Mongodb](https://img.shields.io/badge/Mongodb-171717?style=for-the-badge&logo=mongodb&logoColor=3ecf8e)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_Css-00bcff?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 🚀 Getting Started

Follow these steps to get the application up and running on your local machine using Docker.

### Prerequisites

Ensure you have the following installed:

* **Docker**
* **Docker Compose**

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ernestoyoofi/notes-app.nevmstack.git
   cd notes-app.nevmstack
   ```

2. **Build the Docker image:**

   This command tags the built image for easy management.

   ```bash
   docker build -t ernestoyoofi/notes-app.nevmstack .
   ```

   Or using image on [Docker Hub](https://hub.docker.com/r/ernestoyoofi/notes-app.nevmstack)

   ```
   docker pull ernestoyoofi/notes-app.nevmstack:latest
   ```

4. **Configure Environment:**

   Open the `docker-compose.yml` file and adjust any necessary environment variables for the NEVM connection (e.g., API keys, port mappings, etc.).

   ```bash
   nano docker-compose.yml 
   # Or your preferred text editor
   ```

   ```bash
   version: "3.8"
   services:
     database:
       image: mongodb/mongodb-community-server:8.2-ubi9
       container_name: notes-app-nevmstack-mongodb
       restart: always
       environment:
         - "MONGODB_INITDB_ROOT_USERNAME=notes-appnevimstack" # PLEASE CHANGE
         - "MONGODB_INITDB_ROOT_PASSWORD=notes-appnevimstack" # PLEASE CHANGE
       volumes:
         - notes-app-nevmstack-mongodb:/data/db
       networks:
         - notes-app-nevmstack
 
     app:
       image: ernestoyoofi/notes-app.nevmstack:latest
       restart: always
       ports:
         # Exposes Port
         - 3002:80
       environment:
         # Database (FOLLOWING STACK)
         - "MONGODB_URI=mongodb://notes-appnevimstack:notes-appnevimstack@database:27017/nevmstack-notes-app?authSource=admin" # PLEASE CHANGE
         # Server (REQUIRE)
         - "JSONWEBTOKEN_SECRET_KEY=TOKENTOKENTOKEN!!!" # PLEASE CHANGE
         # Google OAuth (REQUIRED)
         - "GOOGLE_CLIENT_ID=XXXXXXXX-XXXXXXX.apps.googleusercontent.com" # PLEASE CHANGE
         - "GOOGLE_CLIENT_SECRET=GOCS-XXXXXXXX" # PLEASE CHANGE
         - "GOOGLE_REDIRECT=http://localhost:3002/api/v1/oauth/callback" # > URL Proxy Backend # PLEASE CHANGE
       networks:
         - notes-app-nevmstack

   volumes:
     notes-app-nevmstack-mongodb:

   networks:
     notes-app-nevmstack:
   ```

5. **Run the application with Docker Compose:**

   The `-d` flag runs the containers in detached (background) mode.

   ```bash
   docker compose up -d
   ```

6. **Access the application:**

   Open your web browser and navigate to the specified URL (usually `http://localhost:[PORT]`, check your `docker-compose.yml` for the port).

## 🎯 Project Goals

This project was developed primarily as a personal challenge and a learning opportunity to:

* Deeply understand and integrate with the **NEVM Stack**.
* Improve proficiency in building single-page applications with **Vue.js**.
* Refine backend development skills using **Node.js/Express**.

## 📄 License

No license on this project, you can use it freely.
