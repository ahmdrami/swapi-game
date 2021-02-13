import { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { History, Home, Game } from './pages'
import { Nav } from './components'

const App = (): JSX.Element => {
  return (
    <Fragment>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/history">
            <History />
          </Route>
          <Route path="/game/:profile">
            <Game />
          </Route>
        </Switch>
      </Router>
    </Fragment>
  )
}

export default App
