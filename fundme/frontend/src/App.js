import  react, { useState, useMemo } from 'react'
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
import CreateFundraiserPage from './pages/protected/CreateProjectPage/CreateProjectPage'
import { UserContext } from './context/Auth/'

function App() {
  const [ user, setUser ] = useState('hello')
  const userProviderValue = useMemo(() => ({ user, setUser }), [user, setUser])

  return (
    <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />

          <Route exact path='/register' component={RegisterPage} />

          <Route exact path='/project/:id' component={ProjectPage} />

          <Route exact path='/:id/donate' component={DonatePage} />

          <Route exact path='/auth'>
            <Authenticate />
          </Route>

          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/reset-password' component={ResetPasswordPage} />

          <UserContext.Provider value={userProviderValue}>
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/create' component={CreateFundraiserPage} />
          </UserContext.Provider>

          <Route>
            <NotFound />
          </Route>

        </Switch>
    </Router>
  );
}

export default App;
