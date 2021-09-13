import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Pages/Login'
import AuthProvider from './Auth/AuthProvider'
import Home from './Pages/Home'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </AuthProvider>
  )
}
