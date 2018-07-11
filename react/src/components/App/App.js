import React from 'react'
import { Route, Switch } from 'react-router' /* react-router v4 */
import { ConnectedRouter } from 'connected-react-router'
import { Browse, Item } from '../';

const App = ({ history }) => ( /* receive history object via props */
  <ConnectedRouter history={history}>
    <div>
      <Switch>
        <Route exact path="/item/:itemId" render={({ match }) => (<Item itemId={match.params.itemId} />)} />
        <Route render={() => (<Browse />)} />
      </Switch>
    </div>
  </ConnectedRouter>
)

export default App;
