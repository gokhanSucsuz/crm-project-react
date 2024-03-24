import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <CRMContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CRMContextProvider>

)

import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { CRMContextProvider } from './context/CRMContext.jsx'
