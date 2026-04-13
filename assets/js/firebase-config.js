// Firebase Configuration
// Replace with your Firebase project settings
  const firebaseConfig = {
    apiKey: "AIzaSyAtduM2t1jzgVs0TfPD48t3LJB5UJ90BrQ",
    authDomain: "fundmonitoring-3c89f.firebaseapp.com",
    projectId: "fundmonitoring-3c89f",
    storageBucket: "fundmonitoring-3c89f.firebasestorage.app",
    messagingSenderId: "630221204555",
    appId: "1:630221204555:web:fa5116e95ad993093bb1ce",
    measurementId: "G-MQ35CGE6EB"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Enable offline persistence
db.enablePersistence()
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser does not support offline persistence');
    }
  });

// Collection References
const fundsCollection = db.collection('funds');
const transactionsCollection = db.collection('transactions');
const settingsCollection = db.collection('settings');

// Helper Functions
function formatCurrency(amount) {
  return '₱' + parseFloat(amount || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function formatNumber(amount) {
  return parseFloat(amount || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function showToast(message, type = 'success') {
  if (typeof Toastify !== 'undefined') {
    Toastify({
      text: message,
      duration: 3000,
      gravity: 'top',
      position: 'right',
      backgroundColor: type === 'success' ? '#198754' : '#dc3545',
    }).showToast();
  } else {
    alert(message);
  }
}

// Get current date in YYYY-MM-DD format
function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

// Get current year
function getCurrentYear() {
  return new Date().getFullYear();
}

// Generate unique ID
function generateId(prefix = '') {
  return prefix + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}