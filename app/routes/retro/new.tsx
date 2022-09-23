import type { LoaderFunction } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import { db } from "~/utils/db.server"
import { prop } from "ramda"

export const loader: LoaderFunction = async ({ request }) => {
  const dailyLogs = await db.dailyLog.findMany({
    where: {
      retroId: {
        equals: null,
      },
    },
    orderBy: [
      {
        logDate: "asc",
      },
    ],
  })

  if (dailyLogs.length === 0) {
    // TODO: flash error message?
    return redirect("/retro")
  }

  const currentStartDate = new Date(dailyLogs[0].logDate)

  const newRetro = await db.retro.create({
    data: {
      dateFrom: currentStartDate,
      dateTo: new Date(),
    },
  })

  await db.dailyLog.updateMany({
    where: {
      id: {
        in: dailyLogs.map(prop("id")),
      },
    },
    data: {
      retroId: newRetro.id,
    },
  })

  return redirect("/retro")
}
