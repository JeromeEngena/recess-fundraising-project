import React from 'react'

/**
 * User dashboard: This is the page seen by the user after successfully logging in.
 * 
 * The following are some of the visible compoenents:
 * Header: -logout option  -create project option  -user settings option  -view my projects
 * Body: -user project(s) - any information that could be vital to the owner of the project. ie. current funds, funders
 * Footer:
 */

function Dashboard() {
  return (
    <div>
      <h1>Hello; I am the dashboard. You logged in successfully!</h1>
      <button>Log out</button>
    </div>
  )
}

export default Dashboard
