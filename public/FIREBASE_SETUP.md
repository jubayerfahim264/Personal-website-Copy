# Firebase Setup Guide for Contact Form

This guide will help you set up Firebase Firestore for your contact form submissions.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a new project"
3. Enter project name: `jubayer-portfolio` (or your preferred name)
4. Accept the terms and click "Continue"
5. Enable Google Analytics (optional) and click "Create project"
6. Wait for the project to be created (2-3 minutes)

## Step 2: Get Your Firebase Credentials

1. In the Firebase Console, click the **Settings icon** (⚙️) at the top left
2. Select **Project Settings**
3. Go to the **Service Accounts** tab
4. Click **Generate new private key** (you'll get a JSON file - keep it safe!)
5. Go to the **General** tab to find your project credentials:
   - **API Key**
   - **Auth Domain** (project-id.firebaseapp.com)
   - **Project ID**
   - **Storage Bucket**
   - **Messaging Sender ID**
   - **App ID**

## Step 3: Enable Firestore Database

1. In the Firebase Console, go to **Build** section (left sidebar)
2. Click **Firestore Database**
3. Click **Create Database**
4. Select region: **us-central1** (or closest to your location)
5. Start in **Test Mode** (we'll secure it later)
6. Click **Enable**

## Step 4: Create Contact Messages Collection

1. In Firestore, click **+ Start Collection**
2. Collection ID: `contact_messages`
3. Click **Next**
4. Skip adding the first document (click **Save**)

### Collection Structure

The `contact_messages` collection will automatically store documents with this structure:

```
contact_messages/
├── documentId (auto-generated)
│   ├── name (string) - Visitor's full name
│   ├── email (string) - Visitor's email address
│   ├── subject (string) - Message subject
│   ├── message (string) - Full message text
│   ├── timestamp (timestamp) - Submission time
│   └── status (string) - "new" | "read" | "responded"
```

## Step 5: Set Firestore Security Rules

1. In Firestore Database, go to **Rules** tab
2. Replace the default rules with the following:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to submit contact messages
    match /contact_messages/{document=**} {
      allow create: if request.resource.data.name is string 
        && request.resource.data.email is string
        && request.resource.data.subject is string
        && request.resource.data.message is string;
      
      // Optional: Allow reads only from authenticated admin users
      allow read, update, delete: if false;
    }
    
    // Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

3. Click **Publish**

**Security Note**: These rules allow anyone to write to the collection but prevent them from reading or modifying other submissions. This is ideal for public contact forms.

## Step 6: Update Your Firebase Configuration

Update the `firebase-config.js` file in your project with your credentials:

```javascript
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Step 7: Test Your Setup

1. Open your website in a browser
2. Navigate to the Contact section
3. Fill out the form with test data
4. Click "Send Message"
5. Check your Firestore console - you should see a new document in `contact_messages`

## Step 8: Enable Production Mode (Optional)

Once you're confident everything works:

1. Go to Firestore **Rules**
2. Update the security rules to be more restrictive
3. Remove Test Mode warning

## Monitoring Submissions

To view and manage contact submissions:

1. Go to Firebase Console → Firestore Database
2. Open the `contact_messages` collection
3. You can:
   - View all submissions
   - Update the `status` field ("new", "read", "responded")
   - Delete old messages
   - Export data for analysis

## Advanced: Email Notifications (Optional)

You can set up Firebase Cloud Functions to send you email notifications when new messages arrive:

1. Go to **Functions** in Firebase Console
2. Click **Create Function**
3. Set up a function triggered by `onCreate` event in `contact_messages`
4. Use a service like SendGrid or Mailgun to send emails

## Troubleshooting

### Messages Not Being Saved?
- Check browser console for errors (F12)
- Verify Firebase config credentials are correct
- Ensure Firestore is enabled in Firebase Console
- Check Firestore Rules allow write access

### Getting CORS Errors?
- This is normal with Firebase SDK
- Check that your domain is authorized in Firebase settings
- Add your domain to Firebase Console → Settings → Authorized Domains

### Collection Not Appearing?
- The collection appears only after the first document is created
- Submit the form once and refresh Firestore console

## File Structure

```
public/
├── index.html (contains Firebase script)
├── assets/
│   ├── js/
│   │   ├── firebase-config.js (your Firebase config)
│   │   └── custom.js
│   └── css/
│       └── contact.css
├── FIREBASE_SETUP.md (this file)
└── FIRESTORE_RULES.txt (security rules backup)
```

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Best Practices](https://firebase.google.com/docs/firestore/best-practices)
- [Firebase Security Rules](https://firebase.google.com/docs/firestore/security)
- [Firebase Console](https://console.firebase.google.com/)

---

**Need Help?**
- Check the browser console (F12) for error messages
- Review Firebase logs in the Console
- Read the official Firebase documentation
