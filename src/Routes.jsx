import { useRoutes } from 'react-router-dom'
import ConfirmEmail from './components/SecondHandApp/ConfirmEmail'
import ResetPasswordPage from './components/shared/ResetPasswordPage'
import WWWApp from './components/WWWApp/Root'
import SecondHandApp from './components/SecondHandApp/Root'
import GolfShotApp from './components/GolfShotApp/Root'
import PianoApp from './components/PianoApp/Root'

export const SECOND_HAND_ROOT = '/second_hand';
export const GOLF_SHOT_ROOT = '/golf_shot';
export const PIANO_APP_ROOT = '/chord_or_notes';

const Routes = () =>
  useRoutes([
    { path: '/email/confirm', element: <ConfirmEmail /> },
    { path: '/password/reset', element: <ResetPasswordPage /> },
    { path: `${SECOND_HAND_ROOT}/*`, element: <SecondHandApp /> },
    { path: `${GOLF_SHOT_ROOT}/*`, element: <GolfShotApp/> },
    { path: `${PIANO_APP_ROOT}/*`, element: <PianoApp /> },
    { path: '*', element: <WWWApp /> }
  ])

export default Routes;
