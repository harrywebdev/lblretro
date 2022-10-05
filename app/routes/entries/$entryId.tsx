import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { db } from "~/utils/db.server"
import { useActionData, useLoaderData } from "@remix-run/react"
import type { ActionData } from "~/forms/DailyLogForm"
import DailyLogForm, {
  action as dailyLogFormAction,
} from "~/forms/DailyLogForm"
import ScreenHeader from "~/components/Screen/ScreenHeader"
import ScreenContent from "~/components/Screen/ScreenContent"
import ScreenBottomBar, {
  ScreenBottomBarLink,
} from "~/components/Screen/ScreenBottomBar"
import type { Question, DailyLog } from "@prisma/client"

type LoaderData = {
  questions: Question[]
  dailyLog: DailyLog
  isNew: boolean
}

export const action: ActionFunction = dailyLogFormAction((redirectTo) => {
  return redirect(redirectTo)
})

export const loader: LoaderFunction = async ({ params }) => {
  const questions = await db.question.findMany({ orderBy: { sequence: "asc" } })
  const dailyLog = await db.dailyLog.findUnique({
    where: { id: params.entryId },
  })

  return json({ questions, dailyLog })
}

export default function EntryDetailRoute() {
  const { questions, dailyLog } = useLoaderData<LoaderData>()
  const actionData = useActionData<ActionData>()

  return (
    <>
      <ScreenHeader largeTitle={<>Edit Entry</>} />

      <ScreenContent>
        <DailyLogForm
          actionData={actionData}
          isNew={false}
          dailyLog={dailyLog}
          formAction={`/entries/${dailyLog.id}`}
          questions={questions}
        >
          <input type="hidden" name="redirectTo" value="/entries?edit" />
        </DailyLogForm>
      </ScreenContent>

      <ScreenBottomBar activeLink={ScreenBottomBarLink.NewEntry} />
    </>
  )
}
