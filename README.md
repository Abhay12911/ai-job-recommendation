# 🧠 AI Job Recommendation System

A smart job recommendation platform built with **Next.js (TypeScript)** and **MongoDB**, designed to help users find the most relevant job listings by analyzing their **uploaded resumes**. The application extracts relevant keywords from the resume and matches them with real job data to recommend the best-fit opportunities.

## 🚀 Features

- 🔐 **Authentication** using Nextauth
- 📄 **Resume Upload** and parsing
- 🧠 **Keyword Extraction** using AI logic
- 🔎 **Job Matching** with public job APIs
- 💾 **MongoDB integration** for storing user profiles, resumes, and history
- 📊 **Leaderboard (planned)** to gamify engagement (e.g. by resume quality or engagement)
- 🌐 Built with **Next.js 15 App Router**, **TypeScript**, **Tailwind CSS**

## 📁 Tech Stack

| Tech | Description |
|------|-------------|
| **Next.js (App Router)** | React framework for server-side rendering and routing |
| **TypeScript** | Static typing for better maintainability |
| **MongoDB** | NoSQL database for storing resumes, user data |
| **Tailwind CSS** | Utility-first CSS framework for styling |
| **OpenAI / Resume Parser** | (Planned) To extract key data from resumes |
| **Public Job APIs** | Fetching real-time job listings (e.g., Remotive API) |

## 🖼️ How It Works

1. **User signs in** using Google auth
2. **Resume is uploaded**, parsed, and key skills/keywords are extracted.
3. The system uses these keywords to **query job APIs** for relevant job listings.
4. **Matching jobs are displayed** to the user with filters and company info.
5. (Optional) Users may save jobs or see how well their resume fits.


## 📦 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhay12911/ai-job-recommendation.git
   cd ai-job-recommendation
