import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Pages/Login'
import AuthProvider from './Auth/AuthProvider'
import Home from './Pages/Home'
import UserPage from './Pages/UserPage'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/user" component={UserPage} />
        </Switch>
      </Router>
    </AuthProvider>
  )
}
