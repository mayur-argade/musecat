import React from 'react';
import { useGoogleLogin, hasGrantedAllScopesGoogle } from '@react-oauth/google';

const GoogleLogin = ({ onSuccess, onError }) => {
  const scopes = ['email', 'profile', 'https://www.googleapis.com/auth/calendar'];

  const handleSuccess = (codeResponse) => {
    // Check if the user has granted the required scopes
    const hasAccess = hasGrantedAllScopesGoogle(
      codeResponse,
      'email',
      'profile',
      'https://www.googleapis.com/auth/calendar'
    );

    if (hasAccess) {
      console.log('Google Login Success:', codeResponse);
      if (onSuccess) onSuccess(codeResponse);
    } else {
      console.log('Insufficient scopes granted.');
      if (onError) onError('Insufficient scopes granted.');
    }
  };

  const handleError = (error) => {
    console.log('Google Login Failed:', error);
    if (onError) onError(error);
  };

  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: handleError,
    flow: 'auth-code',
    scopes: scopes,
  });

  return (
    <button onClick={() => login()} type="button">
      Sign in with Google 🚀
    </button>
  );
};

export default GoogleLogin;