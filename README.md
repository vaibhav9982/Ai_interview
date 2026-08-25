# 🤖 AI Interviewer

<div align="center">

![AI Interviewer Banner](https://img.shields.io/badge/AI-Interviewer-6C63FF?style=for-the-badge&logo=robot&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

**An Intelligent AI-Powered Interview Platform — Parse Resume, Generate Questions, Evaluate in Real-time.**

[Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

# 🤖 AI Interviewer

An AI-powered mock interview platform that helps candidates practice
interviews using their **resume, job role, and job description**.

The platform uses a MERN-style full-stack architecture with **React +
Vite** on the frontend and **Node.js + Express + MongoDB** on the
backend. AI features are powered by **Groq**, while **Hugging Face
embeddings** are used for the RAG pipeline.


------------------------------------------------------------------------

## ✨ Features

### 👤 Authentication

-   User registration and login
-   JWT-based authentication
-   Protected user routes
-   Password hashing with bcrypt
-   Separate admin authentication and protected admin routes

### 📄 Resume Management

-   Upload resume PDFs
-   Resume text extraction
-   Resume processing for interview personalization
-   Cloudinary-based file storage
-   View and manage uploaded resumes

### 🧠 AI-Powered Interview Generation

-   Create interviews using:
    -   Job title
    -   Job description
    -   Experience level
    -   Number of questions
-   Generates technical and behavioral questions
-   Questions are grounded in retrieved resume/job-description context
-   Difficulty levels can vary from easy to hard
-   Expected keywords are generated for evaluation

### 🔎 RAG-Based Context Retrieval

The application uses a retrieval-augmented generation pipeline to make
interview questions more relevant.

The current RAG implementation: - Splits resume and job-description
content into semantic chunks - Normalizes the chunks - Generates
embeddings using Hugging Face - Uses
`sentence-transformers/all-MiniLM-L6-v2` - Calculates cosine similarity
in Node.js - Applies section-based ranking boosts - Retrieves the most
relevant chunks - Sends the retrieved context to the Groq LLM

### 🎤 Real-Time Interview

-   Interactive interview sessions
-   Candidate answers are submitted during the session
-   Socket.io enables real-time AI interaction
-   AI-generated follow-up responses can be streamed to the client
-   Session progress and answers are stored

### 📊 AI Answer Evaluation

Each answer can be evaluated using AI based on factors such as: -
Correctness - Clarity - Depth - Expected concepts/keywords - Strengths
and weaknesses - Missed concepts - Improvement suggestions

### 📑 Final Interview Report

After an interview, the system can generate an overall evaluation
containing: - Overall score - Skill breakdown - Key strengths - Key
weaknesses - Improvement plan - Hiring-style assessment

### 📈 Dashboard & History

Users can access: - Interview history - Session history - Interview
results - Performance information - Resume management - Profile
information

------------------------------------------------------------------------

## 🧱 Technology Stack

### Frontend

  Technology                   Purpose
  ---------------------------- ---------------------------------
  React 18                     User interface
  Vite                         Frontend development/build tool
  React Router                 Client-side routing
  Tailwind CSS                 Styling
  Zustand                      Client state management
  TanStack React Query         Server-state/data fetching
  Axios                        HTTP requests
  Socket.io Client             Real-time communication
  React Hook Form              Form handling
  Framer Motion                Animations
  Recharts                     Charts and analytics
  React Markdown               Markdown rendering
  React Hot Toast              Notifications
  Lucide React / React Icons   Icons

### Backend

  Technology               Purpose
  ------------------------ ---------------------------------------------
  Node.js                  Backend runtime
  Express.js               REST API
  MongoDB                  Database
  Mongoose                 MongoDB ODM
  Groq SDK                 LLM-powered interview generation/evaluation
  Hugging Face Inference   Text embeddings
  LangChain                Text-processing/RAG ecosystem
  Socket.io                Real-time interview communication
  PDF Parse                Resume PDF text extraction
  Cloudinary               Resume/file storage
  Multer                   File upload handling
  JWT                      Authentication
  bcryptjs                 Password hashing
  Helmet                   Security headers
  CORS                     Cross-origin configuration
  Express Rate Limit       API rate limiting
  Compression              Response compression
  Winston / Morgan         Logging
  Jest                     Backend testing

------------------------------------------------------------------------

## 🧠 AI / RAG Architecture

The main interview-generation flow is approximately:

``` text
                Resume PDF
                    │
                    ▼
             PDF Text Extraction
                    │
                    ▼
          Resume + Job Description
                    │
                    ▼
             Semantic Chunking
                    │
                    ▼
               Normalization
                    │
                    ▼
        Hugging Face Embeddings
                    │
                    ▼
          In-Memory Vector Store
                    │
                    ▼
        Query Optimization / Retrieval
                    │
                    ▼
       Relevant Context Selection
                    │
                    ▼
                Groq LLM
                    │
                    ▼
        Technical + Behavioral
              Questions
                    │
                    ▼
             Interview Session
                    │
                    ▼
             Answer Evaluation
                    │
                    ▼
            Final Feedback Report
```

### Embedding Model

The current implementation uses:

``` text
sentence-transformers/all-MiniLM-L6-v2
```

Embeddings are generated through the Hugging Face Inference API.

The application calculates cosine similarity directly in Node.js instead
of requiring a native FAISS dependency.

------------------------------------------------------------------------

## 🔄 Interview Flow

1.  User creates an account.
2.  User logs in.
3.  User uploads a resume.
4.  User creates a new interview.
5.  User provides the job title and job description.
6.  User selects the experience level and number of questions.
7.  The backend processes the resume and job-description context.
8.  The RAG pipeline retrieves relevant context.
9.  Groq generates interview questions.
10. User starts an interview session.
11. User answers the questions.
12. The backend evaluates the answers.
13. Real-time AI interaction is handled through Socket.io.
14. The session is completed.
15. A final AI-generated evaluation report is produced.
16. The user can review the interview result and history.

------------------------------------------------------------------------

## 🏗️ Project Structure

``` text
Ai_interview/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scripts/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   ├── server.js
│   │   └── socket.js
│   │
│   ├── .env.example
│   ├── package.json
│   └── BACKEND_STRUCTURE.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── .gitignore
├── CONTRIBUTING.md
├── SECURITY.md
└── README.md
```

------------------------------------------------------------------------

## 🚀 Getting Started

### Prerequisites

Install the following before running the project:

-   Node.js 18+
-   MongoDB Atlas or a local MongoDB instance
-   Groq API key
-   Hugging Face access token
-   Cloudinary account

------------------------------------------------------------------------

## 📥 Clone the Repository

``` bash
git clone https://github.com/vaibhav9982/Ai_interview.git
cd Ai_interview
```

------------------------------------------------------------------------

## ⚙️ Backend Setup

``` bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory.

You can start from:

``` text
backend/.env.example
```

### Backend Environment Variables

``` env
PORT=5000
NODE_ENV=development

REDIS_ENABLED=false

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRE=30d

GROQ_API_KEY=your_groq_api_key

HF_TOKEN=your_huggingface_token

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

CLIENT_URL=http://localhost:5173

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

------------------------------------------------------------------------

## 🎨 Frontend Setup

Open another terminal:

``` bash
cd frontend
npm install
```

Create a frontend `.env` file:

``` env
VITE_API_URL=http://localhost:5000
```

------------------------------------------------------------------------

## ▶️ Run the Application

### Terminal 1 --- Backend

``` bash
cd backend
npm run dev
```

Backend:

``` text
http://localhost:5000
```

### Terminal 2 --- Frontend

``` bash
cd frontend
npm run dev
```

Frontend:

``` text
http://localhost:5173
```

------------------------------------------------------------------------

## 🔌 Main API Endpoints

### Authentication

``` text
POST /api/auth/register
POST /api/auth/login
```

### Users

``` text
GET /api/users/...
```

### Resumes

``` text
GET  /api/resumes
POST /api/resumes/upload
```

### Interviews

``` text
GET    /api/interviews
POST   /api/interviews
GET    /api/interviews/:id
POST   /api/interviews/:id/generate
DELETE /api/interviews/:id
```

### Interview Sessions

``` text
GET  /api/sessions
POST /api/sessions/start
GET  /api/sessions/:id
POST /api/sessions/:id/answer
POST /api/sessions/:id/complete
```

### Health Check

``` text
GET /api/health
```

------------------------------------------------------------------------

## 🔐 Security

The backend includes several security-related mechanisms:

-   JWT authentication
-   Password hashing with bcrypt
-   Helmet security headers
-   CORS configuration
-   API rate limiting
-   Input validation with `express-validator`
-   Environment variables for secrets
-   Centralized error handling
-   Authentication middleware for protected routes

**Never commit your `.env` file or API keys to GitHub.**

------------------------------------------------------------------------

## 🧪 Testing

The backend includes Jest as the testing framework.

Run:

``` bash
cd backend
npm test
```

The backend also provides a build command:

``` bash
npm run build
```

For the frontend:

``` bash
cd frontend
npm run lint
npm run build
```

------------------------------------------------------------------------

## 📝 Important Project Scope

This project focuses on **AI-powered interview preparation and
evaluation**.

It includes:

-   Resume-based interview preparation
-   Job-role/job-description-based interview generation
-   RAG-based context retrieval
-   Technical and behavioral questions
-   Real-time interview interaction
-   AI answer evaluation
-   Interview reports
-   Interview history
-   User dashboard
-   Admin management


------------------------------------------------------------------------

## 🛣️ Future Improvements

Possible future improvements include:

-   Voice-based question and answer interaction
-   More advanced speech analysis
-   Improved RAG retrieval
-   Persistent vector database
-   More detailed skill analytics
-   Interview difficulty adaptation
-   Better automated test coverage
-   Deployment automation
-   More AI evaluation metrics

------------------------------------------------------------------------

## 🤝 Contributing

Contributions are welcome.

1.  Fork the repository.
2.  Create a feature branch.

``` bash
git checkout -b feature/your-feature
```

3.  Make your changes.
4.  Commit your changes.

``` bash
git commit -m "Add your feature"
```

5.  Push the branch.

``` bash
git push origin feature/your-feature
```

6.  Open a Pull Request.

------------------------------------------------------------------------

## 📄 License

This project is licensed under the MIT License.

------------------------------------------------------------------------

## 👨‍💻 Author

**Mehul**
**Vaibhav**


GitHub:\
https://github.com/vaibhav9982

------------------------------------------------------------------------

⭐ If you find this project useful, consider giving the repository a
star.
