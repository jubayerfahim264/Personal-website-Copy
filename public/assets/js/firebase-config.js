// Firebase Configuration File
// Update this file with your actual Firebase credentials from Firebase Console

// Go to: https://console.firebase.google.com/
// Project Settings → General tab to find these values

export const firebaseConfig = {
  // Your Firebase API Key - found in Project Settings
  apiKey: "AIzaSyBstzBekr9eHWZ0tPBryiXRvH8I40NsBzQ",
  
  // Your project's authentication domain
  // Format: your-project-id.firebaseapp.com
  authDomain: "jubayerfahim2002.firebaseapp.com",
  
  // Your Firestore project ID
  projectId: "jubayerfahim2002",
  
  // Your Firebase Storage bucket
  // Format: your-project-id.appspot.com
  storageBucket: "jubayerfahim2002.firebasestorage.app",
  
  // Your Firestore messaging sender ID
  messagingSenderId: "93767581835",
  
  // Your Firebase App ID
  appId: "1:93767581835:web:6165eadca299fe113f548e"
};

/**
 * IMPORTANT INSTRUCTIONS:
 * 
 * 1. Replace the placeholder values with your actual Firebase credentials
 * 2. Get credentials from: https://console.firebase.google.com/
 * 3. Go to Project Settings (gear icon) → General tab
 * 4. Copy each value from the "Web apps" section
 * 
 * 5. Ensure Firestore Database is enabled:
 *    - Go to Build → Firestore Database
 *    - Click "Create Database"
 *    - Use "Test Mode" for development
 * 
 * 6. Create the contact_messages collection:
 *    - In Firestore, click "+ Start Collection"
 *    - Collection ID: contact_messages
 *    - Click Save
 * 
 * 7. Security Rules (copy to Firestore Rules tab):
 *    See FIRESTORE_RULES.txt for production-ready rules
 * 
 * DO NOT COMMIT REAL CREDENTIALS TO PUBLIC REPOSITORIES!
 * Consider using environment variables for production.
 */
