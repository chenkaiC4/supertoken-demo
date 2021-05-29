import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Session from 'supertokens-auth-react/recipe/session';

import Footer from './Footer';
import Home from './Home';

export function getApiDomain() {
  const apiPort = process.env.REACT_APP_API_PORT || 3001;
  const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
  return apiUrl;
}

export function getWebsiteDomain() {
  const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
  const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
  return websiteUrl;
}

SuperTokens.init({
    appInfo: {
      appName: 'test',
      websiteDomain:`http://localhost:3000`,
      apiDomain: `http://localhost:3001`,
    },
  recipeList: [
    EmailPassword.init(),
    Session.init()
  ]
});


function App() {
  return (
    <div className="App">
      <Router>
        <div className="fill">
          <Switch>
            {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}
            <Route path="/">
              <EmailPassword.EmailPasswordAuth>
                <Home />
              </EmailPassword.EmailPasswordAuth>
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router >
    </div>
  );
}

export default App;
