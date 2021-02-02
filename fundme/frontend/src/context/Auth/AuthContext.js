import react, { createContext } from 'react'

const AuthContext = createContext()

const AuthProvider = (props) => {
  const [state, setState] = react.useState({ isAuth: false })

  const login = () => {
    setTimeout(() => setState({ isAuth: true }), 1000)
  }

  const logout = () => {
    setState({ isAuth: false })
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth: state,
        login: login,
        logout: logout
      }}
    >
      { props.children }
    </AuthContext.Provider>
  )
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }