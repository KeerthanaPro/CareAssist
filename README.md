# CareAssist – AI-Based Response Suggestion System for Hospitals

## Overview

CareAssist is an AI-powered system designed to assist hospital staff in responding to patient queries efficiently. The platform generates intelligent response suggestions for incoming patient messages while allowing staff members to review, edit, and approve the responses before sending them.

The goal of the system is to improve communication efficiency in healthcare environments while maintaining human oversight and accuracy.

---

## Problem Statement

Hospitals receive a large number of patient queries related to appointments, symptoms, medications, and reports. Responding to these queries manually can be time-consuming and may delay patient communication.

CareAssist helps healthcare staff by generating AI-based response suggestions, reducing workload and improving response time.

---

## Key Features

### AI-Based Response Suggestions

The system analyzes patient queries and generates multiple suggested responses using AI.

### Human-in-the-Loop Review

Hospital staff can review, modify, and approve AI-generated responses before sending them to patients.

### Multilingual Query Support

Patients can submit queries in multiple languages to improve accessibility.

### Criticality-Based Categorization

Queries are classified based on urgency levels such as:

* Critical
* Moderate
* Normal

This helps staff prioritize urgent cases.

### Acknowledgement Tracking

The system records which staff member handled or acknowledged the query, improving accountability.

### Analytics Dashboard

The platform provides insights such as:

* number of patient queries
* category distribution
* response statistics

---

## System Architecture

The system follows a simple workflow:

Patient Query → Query Processing → AI Response Generation → Staff Review → Response Sent → Data Stored

---

## Technology Stack

### Frontend

* React
* Vite
* Tailwind CSS

### Backend

* Node.js
* Express.js

### AI Integration

* Google Gemini API

### Database

* SQLite (using better-sqlite3)

### Data Visualization

* Recharts

---

## Project Structure

```
CareAssist
│
├── src
│   ├── components
│   ├── pages
│   └── main.tsx
│
├── server.ts
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## Installation and Setup

### Prerequisites

* Node.js installed
* Gemini API key

### Step 1: Clone the Repository

```
git clone https://github.com/your-username/careassist.git
```

### Step 2: Navigate to the Project Folder

```
cd careassist
```

### Step 3: Install Dependencies

```
npm install
```

### Step 4: Add Environment Variables

Create a file named `.env.local` in the root folder and add:

```
GEMINI_API_KEY=your_api_key_here
```

### Step 5: Run the Application

```
npm run dev
```

### Step 6: Open in Browser

```
http://localhost:3000
```

---

## Future Enhancements

* Voice-based patient query input
* Image upload for medical condition analysis
* Document and file upload for lab reports and prescriptions
* Integration with hospital management systems
* Mobile application for hospital staff

---

## Unique Selling Points

* AI-assisted healthcare communication
* Human-reviewed responses for safety
* Multilingual patient support
* Criticality-based query prioritization
* Staff acknowledgement tracking

---

## Contributors

Team CareAssist

---

## License

This project is developed for educational and hackathon purposes.
