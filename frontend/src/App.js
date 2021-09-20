import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import AuthProvider from './Auth/AuthProvider'
import HomePage from './Pages/HomePage'
import UserPage from './Pages/UserPage'
import LogoutPage from './Pages/LogoutPage'
import QuizPage from './Pages/QuizPage'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/user" component={UserPage} />
          <Route path="/logout" component={LogoutPage} />
          <Route path="/quiz/:firstFilter/:secondFilter" component={QuizPage} />
        </Switch>
      </Router>
    </AuthProvider>
  )
}
