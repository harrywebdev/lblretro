import { useLoaderData } from "@remix-run/react"
import type { LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import type { Area, Retro } from "@prisma/client"
import { db } from "~/utils/db.server"
import ScreenHeader from "~/components/Screen/ScreenHeader"
import ScreenContent from "~/components/Screen/ScreenContent"
import ScreenBottomBar, {
  ScreenBottomBarLink,
} from "~/components/Screen/ScreenBottomBar"
import RecordNavigation from "~/components/RecordNavigation"
import { getRetroIntervalTitle } from "~/utils/get-retro-interval-title"
import { getAreaCountGroupsFromDailyLogs } from "~/utils/get-area-count-groups-from-daily-logs"
import RetroEmojiOverview from "~/components/RetroEmojiOverview"

type AreaCountGroup = {
  area: Area
  count: number
}

type LoaderData = {
  areaCounts: AreaCountGroup[]
  currentRetro: Retro
  previousRetro: Retro | null
  nextRetro: Retro | null
}

export const loader: LoaderFunction = async ({ params }) => {
  const currentRetro = await db.retro.findUniqueOrThrow({
    where: { id: params.retroId },
  })

  const previousRetro = await db.retro.findFirst({
    orderBy: [
      {
        dateTo: "desc",
      },
    ],
    where: {
      dateTo: {
        lt: currentRetro.dateFrom,
      },
    },
  })

  const nextRetro = await db.retro.findFirst({
    orderBy: [
      {
        dateFrom: "asc",
      },
    ],
    where: {
      dateTo: {
        gt: currentRetro.dateTo,
      },
    },
  })

  // to get all the areas from daily logs, we need to fetch daily logs,
  // get their questions and then their relevant areas
  const dailyLogs = await db.dailyLog.findMany({
    where: {
      retroId: {
        equals: currentRetro.id,
      },
    },
    include: { question: { select: { area: true } } },
  })

  const allAreas = await db.area.findMany()
  const areaCounts = getAreaCountGroupsFromDailyLogs(dailyLogs, allAreas)

  const data = {
    areaCounts,
    currentRetro,
    previousRetro,
    nextRetro,
  }

  return json(data)
}

export default function RetroDetailRoute() {
  const { areaCounts, currentRetro, previousRetro, nextRetro } =
    useLoaderData<LoaderData>()

  const recordNavigationTitle = getRetroIntervalTitle(
    currentRetro.dateFrom,
    currentRetro.dateTo
  )

  return (
    <>
      <ScreenHeader title={"Retro"} />

      <ScreenContent>
        <RecordNavigation
          title={recordNavigationTitle}
          leftLink={
            previousRetro
              ? {
                  to: `/retro/${previousRetro.id}`,
                  title: "Previous Retro",
                }
              : undefined
          }
          rightLink={
            nextRetro
              ? {
                  to: `/retro/${nextRetro.id}`,
                  title: "Next Retro",
                }
              : {
                  to: `/retro`,
                  title: "Current Retro",
                }
          }
        />

        <RetroEmojiOverview
          areaCounts={areaCounts}
          currentRetro={currentRetro}
        />
      </ScreenContent>

      <ScreenBottomBar activeLink={ScreenBottomBarLink.Retro} />
    </>
  )
}
