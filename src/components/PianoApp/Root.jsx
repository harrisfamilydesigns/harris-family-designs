import { useRoutes } from "react-router-dom"
import Main from "./Main"
import AppLayout from "../WWWApp/AppLayout"

const routes = [
  { path: '/', element: <AppLayout />, children: [
    { index: true, element: <Main /> }
  ]}
]

export default function PianoApp() {
  return useRoutes(routes)
}
