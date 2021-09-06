import { createTheme, ThemeProvider, Typography } from '@material-ui/core'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { blue, cyan } from '@material-ui/core/colors'

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: cyan,
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/login">
            <Typography align="center" color="secondary">
              Moin
            </Typography>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
