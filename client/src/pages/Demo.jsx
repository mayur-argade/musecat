import React from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

const scopes = ['email', 'profile', 'https://www.googleapis.com/auth/calendar'];

const Demo = () => {
    function oauthSignIn() {
        // Google's OAuth 2.0 endpoint for requesting an access token
        var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
      
        // Create <form> element to submit parameters to OAuth 2.0 endpoint.
        var form = document.createElement('form');
        form.setAttribute('method', 'GET'); // Send as a GET request.
        form.setAttribute('action', oauth2Endpoint);
      
        // Parameters to pass to OAuth 2.0 endpoint.
        var params = {'client_id': '502871150406-dr5vdb11majpgovhsksk6f4pacaj8fcq.apps.googleusercontent.com',
                      'redirect_uri': 'https://localhost:3000',
                      'response_type': 'token',
                      'scope': 'https://www.googleapis.com/auth/calendar',
                      'include_granted_scopes': 'true',
                      'state': 'pass-through value'};
      
        // Add form parameters as hidden input values.
        for (var p in params) {
          var input = document.createElement('input');
          input.setAttribute('type', 'hidden');
          input.setAttribute('name', p);
          input.setAttribute('value', params[p]);
          form.appendChild(input);
        }
      
        // Add form to page and submit it to open the OAuth 2.0 endpoint.
        document.body.appendChild(form);
        form.submit();
      }

    const scopes = ['email', 'profile', 'https://www.googleapis.com/auth/calendar'];
    return (
        <div>
            <h2>Login Page</h2>
            <button onClick={oauthSignIn}>Login with Google</button>
        </div>
    )
}

export default Demo