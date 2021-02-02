import  react from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './pages/public/HomePage/HomePage'
import Dashboard from './pages/protected/Dashboard'
import LoginPage from './pages/public/LoginPage/LoginPage'
import ResetPasswordPage from './pages/protected/ResetPasswordPage/ResetPasswordPage'
import NotFound from './pages/public/NotFound'
import Authenticate from './pages/protected/Authenticate'
import RegisterPage from './pages/public/RegisterPage/RegisterPage'

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />

          <Route exact path='/dashboard' component={Dashboard} />

          <Route exact path='/login' component={LoginPage} />

          <Route exact path='/reset-password' component={ResetPasswordPage} />

          <Route exact path='/register' component={RegisterPage} />

          <Route exact path='/auth'>
            <Authenticate />
          </Route>

          <Route path='/donate'>
            <h1>Hello  fund me route</h1>
          </Route>

          {/* <Route path='/forgot-password' component={ForgotPasswordPage} /> */}

          <Route>
            <NotFound />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
