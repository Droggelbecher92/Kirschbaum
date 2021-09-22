import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import AuthProvider from './Auth/AuthProvider'
import HomePage from './Pages/HomePage'
import UserPage from './Pages/UserPage'
import LogoutPage from './Pages/LogoutPage'
import QuizPage from './Pages/QuizPage'
import ProtectedRoute from './Auth/ProtectedRoute'
import AdminPage from './Pages/AdminPage'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <ProtectedRoute exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <ProtectedRoute path="/user" component={UserPage} />
          <ProtectedRoute path="/logout" component={LogoutPage} />
          <ProtectedRoute
            path="/quiz/:firstFilter/:secondFilter"
            component={QuizPage}
          />
          <ProtectedRoute adminOnly path="/admin" component={AdminPage} />
        </Switch>
      </Router>
    </AuthProvider>
  )
}
