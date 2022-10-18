import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';  

import { AuthProvider } from './hooks/auth';

import GlobalStyles from './styles/global';

import theme from './styles/theme';

// import { Details } from './pages/Details';
// import { SignIn } from './pages/SignIn';
// import { SignUp } from './pages/SignUp';
// import { Profile } from './pages/Profile';
// import { New } from './pages/New';

import { Routes } from './routes/';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles/> {/* fica dentro do ThemeProvider para acessar o tema */}
      <AuthProvider>
      <Routes />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)

