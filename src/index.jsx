import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AuthProvider} from './Authentication/authContext'

ReactDOM.render(
    <React.StrictMode>
            <AuthProvider>
      <App />
    </AuthProvider>

    </React.StrictMode>,
    document.getElementById('root')
);
