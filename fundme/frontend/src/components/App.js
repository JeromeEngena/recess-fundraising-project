import  react from 'react'
import  { makeStyles } from '@material-ui/core/styles'
import './App.css'
import theme from '../theme'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const useStyles = makeStyles({
  primary: {
    fontFamily: theme.typography.fontFamily,
    padding: theme.spacing(2),
    fontWeight: 900
  }
})

function App() {
  const classes = useStyles()
  return (
    // <div className="App" className={classes.primary}>
    //   <h1>Hello</h1>
    //   <p>Hello there, what is your name?</p>
    // </div>
    <Router>
      <Switch>
        <Route exact path='/'>
          <h1>Hello home route</h1>
        </Route>

        <Route path='/mondo'>
          <h1>Helo  Mondo</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
