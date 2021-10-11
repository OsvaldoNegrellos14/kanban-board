import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { TasksGroup } from '../pages/TasksGroup'
import { Home } from '../pages/Home'
import { TasksToday } from '../pages/TasksToday'

export const Routing = () => {
  return (
    <>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/task/group'>
          <TasksGroup />
        </Route>
        <Route exact path='/task/today'>
          <TasksToday />
        </Route>
      </Switch>
    </>
  )
}
