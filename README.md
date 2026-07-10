# 🏥 CareAssist – AI-Based Hospital Query Response Assistant

> 🚀 Developed during **TetherX 24-Hour Hackathon** organized by **CodeChef VIT Chennai**
>
> 💡 An AI-powered healthcare communication platform that helps hospitals manage patient queries efficiently through intelligent response suggestions, secure authentication, and real-time analytics.

![Hackathon](https://img.shields.io/badge/Hackathon-TetherX%202026-blue)
![Status](https://img.shields.io/badge/Status-Prototype-success)
![Built With](https://img.shields.io/badge/Built%20With-React%20%7C%20Node.js%20%7C%20Gemini-orange)
![License](https://img.shields.io/badge/License-Educational-green)

---

# 📖 Overview

CareAssist is an AI-powered healthcare communication platform designed to assist hospital staff in responding to patient queries quickly, accurately, and securely.

Instead of manually replying to every patient query, the system intelligently generates AI-assisted draft responses while keeping healthcare professionals in complete control through a review and approval workflow.

The platform was developed during the **24-hour TetherX Hackathon at VIT Chennai**, where our team successfully progressed from the online screening round to the offline Grand Finale.

---

# 🎯 Problem Statement

Hospitals receive hundreds of patient queries every day regarding:

- Appointment scheduling
- Symptoms
- Medications
- Laboratory reports
- General healthcare assistance

Responding manually increases staff workload and often delays patient communication.

**CareAssist** addresses this challenge using Artificial Intelligence to assist healthcare professionals while ensuring every response is verified before reaching the patient.

---

# ✨ Key Features

## 🤖 AI-Based Response Suggestions

Generates multiple intelligent draft responses using **Google Gemini AI**.

---

## 👨‍⚕️ Human-in-the-Loop Approval

AI never sends responses directly.

Hospital staff can:

- Review
- Edit
- Approve
- Reject

before sending responses.

---

## 🌍 Multilingual Support

Supports patient queries in multiple languages, making healthcare communication more accessible.

---

## 🚨 Criticality-Based Categorization

Automatically classifies patient queries into:

- 🔴 Critical
- 🟡 Moderate
- 🟢 Normal

allowing staff to prioritize urgent cases.

---

## ✅ Staff Acknowledgement Tracking

Tracks which healthcare professional handled each patient query to improve accountability and workflow management.

---

## 📊 Hospital Analytics Dashboard

Provides administrators with insights including:

- Total Patient Queries
- Response Time Analytics
- Department Workload
- Query Categories
- Pending Requests
- Resolution Trends

---

## 🔐 Secure Authentication

Implements JWT-based authentication with secure role-based access.

Supported Roles:

- Administrator
- Doctor
- Nurse
- Hospital Staff

---

# 🏗 System Workflow

```
Patient Query
      │
      ▼
Query Processing
      │
      ▼
Gemini AI Response Generation
      │
      ▼
Staff Review & Approval
      │
      ▼
Patient Response
      │
      ▼
Analytics & Database Storage
```

---

# 💻 Technology Stack

## Frontend

- React
- Vite
- Tailwind CSS

## Backend

- Node.js
- Express.js

## Artificial Intelligence

- Google Gemini API

## Database

- SQLite (better-sqlite3)

## Data Visualization

- Recharts

---

# 📂 Project Structure

```
CareAssist
│
├── src
│   ├── components
│   ├── pages
│   ├── services
│   ├── hooks
│   └── main.tsx
│
├── server.ts
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

# 📸 Screenshots
<img width="1600" height="743" alt="image" src="https://github.com/user-attachments/assets/b9980ee6-960c-4c49-a7c2-c696d6530716" />
<img width="1889" height="883" alt="image" src="https://github.com/user-attachments/assets/a0438b6b-f368-4500-b2e7-f93a8e2bb968" />
<img width="1884" height="878" alt="image" src="https://github.com/user-attachments/assets/9034f4e8-ac2c-48e7-b9fc-3d81a9fa2ebf" />



### 🏥 Hospital Analytics Dashboard

<img src="assets/dashboard.png" width="900"/>

---

### 👨‍⚕️ Patient Query Management

<img src="assets/patient-dashboard.png" width="900"/>

---

### 🤖 AI Response Suggestions

<img src="assets/ai-response.png" width="900"/>

---

### 📊 Analytics Overview

<img src="assets/analytics.png" width="900"/>

---

# 🚀 Installation

## Prerequisites

- Node.js
- npm
- Google Gemini API Key

---

### Clone Repository

```bash
git clone https://github.com/Keerthanaproject/CareAssist.git
```

---

### Navigate into Project

```bash
cd CareAssist
```

---

### Install Dependencies

```bash
npm install
```

---

### Configure Environment Variables

Create a file named:

```
.env.local
```

Add:

```env
GEMINI_API_KEY=your_api_key_here
```

---

### Start Development Server

```bash
npm run dev
```

---

### Open Browser

```
http://localhost:3000
```

---

# 🎯 Unique Selling Points

✅ AI-assisted Healthcare Communication

✅ Human-in-the-Loop Verification

✅ Secure JWT Authentication

✅ Role-Based Access Control

✅ Multilingual Patient Support

✅ Criticality-Based Query Prioritization

✅ Hospital Analytics Dashboard

✅ Staff Accountability Tracking

---

# 🌱 Future Enhancements

- 🎤 Voice-based patient interaction
- 📷 Medical image upload and AI analysis
- 📄 Prescription & Lab Report Processing
- 🏥 Hospital Management System Integration
- 📱 Mobile Application
- ☁ Cloud Deployment
- 📈 Predictive Analytics for Hospital Operations

---

# 🏆 Hackathon Journey

This project was developed during the **TetherX 24-Hour Hackathon** organized by **CodeChef VIT Chennai**.

Our journey included:

### ✅ Online Screening Round

Built an initial prototype that was shortlisted for the offline finals.

### ✅ Offline Grand Finale

Worked continuously for **24 hours**, improving the system across multiple rounds.

Project Evolution:

- 🏥 CareOps – Hospital Analytics Dashboard
- 🤖 CareAssist – AI Query Response Assistant
- 🔐 CareAuth – Secure Authentication
- 🌐 CareSync – Integrated Hospital Administration Ecosystem

---

# 👥 Team QuadraSquad

Developed collaboratively by:

- **Keerthana P**
- **Mirdhula**
- **Kalai**
- **Lavanya**

---

# 🙏 Acknowledgements

Special thanks to:

- 💙 CodeChef VIT Chennai
- 💙 TetherX Hackathon Organizers
- 💙 VIT Chennai
- 💙 Google Gemini API

for providing the opportunity and resources that inspired this project.

---

# 📜 License

This repository was developed for **educational, research, and hackathon purposes**.

---

⭐ **If you found this project interesting, consider giving this repository a star!**
