import React, { useState } from 'react';
import google from '../assets/google.png';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from "../firebase";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/user/userSlice';

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
     
  const handleGoogleClick = async () => {
    if (loading) return; // Prevent multiple clicks
    
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      
      // Add additional scopes if needed
      provider.addScope('profile');
      provider.addScope('email');
      
      const result = await signInWithPopup(auth, provider);
      
      // Check if user data exists
      if (!result.user) {
        throw new Error('No user data received from Google');
      }
      
      const res = await fetch('/user/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: result.user.displayName || '',
          email: result.user.email || '',
          photo: result.user.photoURL || '',
        })
      });
       
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      dispatch(signInSuccess(data));
      navigate('/');
      
    } catch (error) {
      console.error('Could not sign in with Google', error);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('Sign-in popup was closed by user');
      } else if (error.code === 'auth/popup-blocked') {
        console.error('Sign-in popup was blocked by browser');
        // You might want to show a user-friendly message here
      } else if (error.code === 'auth/cancelled-popup-request') {
        console.log('Sign-in popup request was cancelled');
      } else {
        // Handle other errors - you might want to show user feedback
        console.error('Authentication error:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };
   
  return (
    <button 
      onClick={handleGoogleClick} 
      type='button' 
      disabled={loading}
      className="w-full my-7 py-2 text-black bg-white font-semibold rounded-md text-center flex items-center justify-center uppercase hover:opacity-75 disabled:opacity-80"
    >
      <img src={google} className="h-6 mr-2" alt="Google Icon" />
      {loading ? 'Signing In...' : 'Sign In with Google'}
    </button>
  );
}

export default OAuth;