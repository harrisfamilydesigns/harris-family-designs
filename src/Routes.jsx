import React from 'react'
import { useRoutes } from 'react-router-dom'
import ConfirmEmail from './components/SecondHandApp/ConfirmEmail'
import ResetPasswordPage from './components/shared/ResetPasswordPage'
import WWWApp from './components/WWWApp/Root'
import SecondHandApp from './components/SecondHandApp/Root'

const Routes = () =>
  useRoutes([
    { path: '/email/confirm', element: <ConfirmEmail /> },
    { path: '/password/reset', element: <ResetPasswordPage /> },
    { path: '/second_hand/*', element: <SecondHandApp /> },
    { path: '*', element: <WWWApp /> }
  ])

export default Routes;
