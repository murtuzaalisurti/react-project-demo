import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { TodoContextProvider } from './context/todoContext'
import { RouterProvider } from 'react-router-dom'
import router from './router/Router'
import { ThemeContextProvider } from './context/themeContext'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ErrorBoundary } from 'react-error-boundary'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TodoContextProvider>
      <ThemeContextProvider>
        <ErrorBoundary FallbackComponent={({error}) => <>{error}</>}>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </ThemeContextProvider>
    </TodoContextProvider>
  </React.StrictMode>,
)
