import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import AuthProvider from './Auth/AuthProvider'
import HomePage from './Pages/HomePage'
import UserPage from './Pages/UserPage'
import LogoutPage from './Pages/LogoutPage'
import QuizPage from './Pages/QuizPage'
import ProtectedRoute from './Auth/ProtectedRoute'
import AdminPage from './Pages/AdminPage'
import RegisterPage from './Pages/RegisterPage'
import StatsPage from './Pages/StatsPage'
import SolutionPage from './Pages/SolutionPage'

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
          <ProtectedRoute adminOnly exact path="/admin" component={AdminPage} />
          <ProtectedRoute
            adminOnly
            path="/admin/add"
            component={RegisterPage}
          />
          <ProtectedRoute adminOnly path="/admin/stats" component={StatsPage} />
          <ProtectedRoute
            adminOnly
            path="/admin/solution"
            component={SolutionPage}
          />
        </Switch>
      </Router>
    </AuthProvider>
  )
}
