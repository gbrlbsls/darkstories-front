import React from 'react';

import { HashRouter, Switch, Route } from 'react-router-dom';
import { GamePage } from './pages/GamePage';
import { GameStoryPage } from './pages/GameStoryPage';

console.log("App.tsx loaded")

const App = () => (
  <div className="container">
    <HashRouter>
      <Switch>
        <Route path="/story/:storyId" component={GameStoryPage} />
        <Route path="/story" component={GameStoryPage} />
        <Route path="/:storyHash" component={GamePage} />
        <Route path="/" component={GamePage} />
      </Switch>
    </HashRouter>
  </div>
);

export default App;