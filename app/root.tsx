import { Links, LiveReload, Outlet } from "@remix-run/react"
import styles from "./styles/app.css"
import ScreenContainer from "~/components/Screen/ScreenContainer"

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export default function App() {
  return (
    <html lang="en" className="bg-neutral-800">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>What did I do today?</title>
        <Links />
      </head>
      <body className="flex bg-neutral-100 min-h-screen">
        <ScreenContainer>
          <Outlet />
        </ScreenContainer>
        <LiveReload />
      </body>
    </html>
  )
}
