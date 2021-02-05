import  react from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './pages/public/HomePage/HomePage'
import Dashboard from './pages/protected/Dashboard'
import LoginPage from './pages/public/LoginPage/LoginPage'
import ResetPasswordPage from './pages/protected/ResetPasswordPage/ResetPasswordPage'
import NotFound from './pages/public/NotFound'
import Authenticate from './pages/protected/Authenticate'
import RegisterPage from './pages/public/RegisterPage/RegisterPage'
import ProjectPage from './pages/public/ProjectPage/ProjectPage'
import DonatePage from './pages/public/DonatePage/DonatePage'
import { userContext } from './context/Auth/'

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />

          <Route exact path='/register' component={RegisterPage} />

          <Route exact path='/project/:id' component={ProjectPage} />

          <Route exact path='/donate' component={DonatePage} />

          <Route exact path='/auth'>
            <Authenticate />
          </Route>

          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/reset-password' component={ResetPasswordPage} />

          {/* <Route path='/forgot-password' component={ForgotPasswordPage} /> */}

          <Route>
            <NotFound />
          </Route>

        </Switch>
    </Router>
  );
}

export default App;
