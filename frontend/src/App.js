import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Pages/Login'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  )
}

export default App
