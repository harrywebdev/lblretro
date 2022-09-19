import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { useActionData, useLoaderData } from "@remix-run/react"
import { format } from "date-fns"
import { getToday } from "~/utils/get-today"
import ScreenHeader from "~/components/Screen/ScreenHeader"
import ScreenContent from "~/components/Screen/ScreenContent"
import DailyLogForm, {
  action as dailyLogFormAction,
} from "~/forms/DailyLogForm"
import type { ActionData } from "~/forms/DailyLogForm"
import { json, redirect } from "@remix-run/node"
import type { Question } from "@prisma/client"
import { db } from "~/utils/db.server"

export const action: ActionFunction = dailyLogFormAction(() => {
  return redirect("/")
})

type LoaderData = {
  questions: Question[]
  isNew: boolean
}

export const loader: LoaderFunction = async () => {
  const questions = await db.question.findMany()

  return json({ questions })
}

export default function IndexRoute() {
  const today = getToday()
  const { questions } = useLoaderData<LoaderData>()
  const actionData = useActionData<ActionData>()

  return (
    <>
      <ScreenHeader
        largeTitle={
          <>
            Today, <small>{format(today, "d/M/y")}</small>
          </>
        }
      />
      <ScreenContent>
        {/*{actionData?.formError && (*/}
        {/*  <p className="text-danger-600">{actionData?.formError}</p>*/}
        {/*)}*/}
        <div className="px-4">
          <DailyLogForm
            actionData={actionData}
            isNew={true}
            formAction="?index"
            questions={questions}
          />
        </div>
      </ScreenContent>
    </>
  )
}
