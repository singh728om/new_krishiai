# KrishiAI | Your Farm, Fully Connected.

KrishiAI is an AI-powered precision agriculture platform designed for Bharat. It leverages Gemini Vision AI for disease diagnosis, IOT sensor networks for soil monitoring, and a secure marketplace for organic produce.

## Deployment to Vercel

Follow these steps to deploy this application to Vercel:

### 1. Push to GitHub
Ensure your code is pushed to a Git provider (GitHub, GitLab, or Bitbucket).

### 2. Create a Vercel Project
1. Go to the [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New** > **Project**.
3. Import your KrishiAI repository.

### 3. Configure Environment Variables
During the import process, or in the Project Settings, add the following Environment Variables:
- `GEMINI_API_KEY`: Your Google AI Studio API key (required for plant disease diagnosis and AI advisory).
- `NEXT_PUBLIC_FIREBASE_API_KEY`: (Optional, if you wish to override the default config).

### 4. Authorize your Domain in Firebase
For Firebase Authentication to work on your Vercel deployment:
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your project.
3. Go to **Authentication** > **Settings** > **Authorized Domains**.
4. Add your Vercel deployment domain (e.g., `krishi-ai-v1.vercel.app`).

### 5. Deploy Firestore Security Rules
Vercel only hosts your frontend. You must ensure your `firestore.rules` are deployed to your Firebase project. You can do this by copying the content of `firestore.rules` into the **Rules** tab of the Firestore section in the Firebase Console.

### 6. Build & Deploy
Once configured, Vercel will automatically build and deploy your application. Future pushes to your main branch will trigger automatic redeployments.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + ShadCN UI
- **Database/Auth**: Firebase Firestore & Firebase Auth
- **AI**: Genkit + Gemini 2.5 Flash
- **Icons**: Lucide React
