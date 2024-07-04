import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {ErrorBoundary} from 'react-error-boundary';
import PageError from './components/base/PageError.tsx';

const container = document.getElementById('root')!;
ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <ErrorBoundary
          fallback={<PageError message="An unexpected error occurred. Please try again later."/>}>
        <App/>
      </ErrorBoundary>
    </React.StrictMode>,
);
