import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { TodoContextProvider } from './context/todoContext'
import { RouterProvider } from 'react-router-dom'
import router from './router/Router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TodoContextProvider>
      <RouterProvider router={router} />
    </TodoContextProvider>
  </React.StrictMode>,
)
