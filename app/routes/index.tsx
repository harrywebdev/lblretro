import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import ScreenHeader from "~/components/Screen/ScreenHeader"
import { redirect } from "@remix-run/node"

export const action: ActionFunction = () => {
  return redirect("/v2")
}

export const loader: LoaderFunction = async () => {
  return redirect("/v2")
}

export default function IndexRoute() {
  return (
    <>
      <ScreenHeader largeTitle={<>...</>} />
    </>
  )
}
