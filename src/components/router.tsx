import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import BoardPage from './BoardPage';
import TicketPage from './TicketPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/:alias/:ticketId">
          <TicketPage />
        </Route>
        <Route path="/:alias">
          <BoardPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
