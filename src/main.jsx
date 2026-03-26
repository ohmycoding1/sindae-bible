import App from './App.jsx'
import Admin from './admin.jsx'
import Install from './install.jsx'

const path = window.location.search
const isAdmin = path.includes('admin')
const isInstall = path.includes('install')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isAdmin ? <Admin /> : isInstall ? <Install /> : <App />}
  </React.StrictMode>
)