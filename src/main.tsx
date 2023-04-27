import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { TodoContextProvider } from './context/todoContext'
import { RouterProvider } from 'react-router-dom'
import router from './router/Router'
import { ThemeContextProvider } from './context/themeContext'
import { Provider } from 'react-redux'
import store from './store/config'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <TodoContextProvider>
        <ThemeContextProvider>
          <RouterProvider router={router} />
        </ThemeContextProvider>
      </TodoContextProvider>
    </Provider>
  </React.StrictMode>,
)
