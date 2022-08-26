import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthContextProvider } from './CONTEXT/AuthContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      {/* <Provider store={store}> */}
        <App />
      {/* </Provider> */}
    </AuthContextProvider>
  </React.StrictMode>
)
