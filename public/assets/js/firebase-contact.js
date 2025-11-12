/**
 * Firebase Contact Form Handler
 * Handles form submission and stores data in Firestore
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get form elements
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

/**
 * Handle contact form submission
 */
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get form values
  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Validation
  if (!fullName || !email || !subject || !message) {
    showMessage('Please fill in all fields.', 'danger');
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showMessage('Please enter a valid email address.', 'danger');
    return;
  }

  // Show loading state
  const submitBtn = contactForm.querySelector('.btn-submit');
  const originalText = submitBtn.innerHTML;
  setLoadingState(submitBtn, true, originalText);

  try {
    // Add document to Firestore
    const docRef = await addDoc(collection(db, 'contact_messages'), {
      name: fullName,
      email: email,
      subject: subject,
      message: message,
      timestamp: serverTimestamp(),
      status: 'new'
    });

    console.log('✅ Message sent successfully! Document ID:', docRef.id);
    
    // Show success message
    showMessage(
      '✅ Message sent successfully! I\'ll get back to you as soon as possible.',
      'success'
    );
    
    // Reset form
    contactForm.reset();

    // Clear message after 5 seconds
    setTimeout(() => {
      formMessage.innerHTML = '';
    }, 5000);

  } catch (error) {
    console.error('❌ Error sending message:', error);
    
    let errorMessage = 'Error sending message. Please try again.';
    
    // Handle specific Firebase errors
    if (error.code === 'permission-denied') {
      errorMessage = 'Permission denied. Please check Firebase security rules.';
    } else if (error.code === 'not-found') {
      errorMessage = 'Database not found. Please check your Firebase configuration.';
    } else if (error.code === 'invalid-argument') {
      errorMessage = 'Invalid form data. Please check all fields.';
    } else if (!navigator.onLine) {
      errorMessage = 'No internet connection. Please check your connection and try again.';
    }
    
    showMessage(errorMessage, 'danger');
    
  } finally {
    // Restore button
    setLoadingState(submitBtn, false, originalText);
  }
});

/**
 * Display success or error message
 * @param {string} message - Message text
 * @param {string} type - 'success' or 'danger'
 */
function showMessage(message, type = 'success') {
  const alertIcon = type === 'success' 
    ? '<i class="fas fa-check-circle"></i>' 
    : '<i class="fas fa-exclamation-circle"></i>';
  
  formMessage.innerHTML = `
    <div class="alert alert-${type}" role="alert">
      ${alertIcon} ${message}
    </div>
  `;
}

/**
 * Set button loading state
 * @param {HTMLElement} btn - Button element
 * @param {boolean} isLoading - Is loading
 * @param {string} originalText - Original button HTML
 */
function setLoadingState(btn, isLoading, originalText) {
  if (isLoading) {
    btn.innerHTML = '<span class="button-text">Sending...</span><span class="button-icon"><i class="fas fa-spinner fa-spin"></i></span>';
    btn.disabled = true;
  } else {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}

// Make database accessible for debugging
window.firebaseDB = db;
window.firebaseConfig = firebaseConfig;

// Log when Firebase is ready
console.log('✅ Firebase Contact Form initialized successfully');
console.log('📊 Firestore Project ID:', firebaseConfig.projectId);
