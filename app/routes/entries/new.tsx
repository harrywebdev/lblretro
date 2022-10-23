import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { useActionData, useLoaderData } from "@remix-run/react"
import ScreenHeader from "~/components/Screen/ScreenHeader"
import ScreenContent from "~/components/Screen/ScreenContent"
import DailyLogForm, {
  action as dailyLogFormAction,
} from "~/forms/DailyLogForm"
import type { ActionData } from "~/forms/DailyLogForm"
import { json, redirect } from "@remix-run/node"
import type { Question } from "@prisma/client"
import { db } from "~/utils/db.server"
import ScreenBottomBar, {
  ScreenBottomBarLink,
} from "~/components/Screen/ScreenBottomBar"

export const action: ActionFunction = dailyLogFormAction(() => {
  return redirect("/entries/new")
})

type LoaderData = {
  questions: Question[]
  isNew: boolean
}

export const loader: LoaderFunction = async () => {
  const questions = await db.question.findMany({ orderBy: { sequence: "asc" } })

  return json({ questions })
}

export default function EntriesNewRoute() {
  const { questions } = useLoaderData<LoaderData>()
  const actionData = useActionData<ActionData>()

  return (
    <>
      <ScreenHeader largeTitle={<>Add New Entry</>} />

      <ScreenContent>
        {/*{actionData?.formError && (*/}
        {/*  <p className="text-danger-600">{actionData?.formError}</p>*/}
        {/*)}*/}
        <DailyLogForm
          actionData={actionData}
          isNew={true}
          formAction="?index"
          questions={questions}
        />
      </ScreenContent>

      <ScreenBottomBar activeLink={ScreenBottomBarLink.NewEntry} />
    </>
  )
}
