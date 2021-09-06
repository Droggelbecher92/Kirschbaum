import { ThemeProvider, Typography } from '@material-ui/core'
import { theme } from './Components/Styles'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <ThemeProvider theme={theme}>
          <Route path="/login">
            <Typography align="center" color="secondary">
              Moin
            </Typography>
          </Route>
        </ThemeProvider>
      </Switch>
    </Router>
  )
}

export default App
