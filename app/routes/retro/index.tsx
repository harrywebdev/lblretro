import { useLoaderData } from "@remix-run/react"
import type { LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import type { Area, Retro } from "@prisma/client"
import { db } from "~/utils/db.server"
import ScreenHeader from "~/components/Screen/ScreenHeader"
import ScreenContent from "~/components/Screen/ScreenContent"
import SecondaryTitle from "~/components/SecondaryTitle"
import ScreenBottomBar, {
  ScreenBottomBarLink,
} from "~/components/Screen/ScreenBottomBar"
import ButtonLink from "~/components/ButtonLink"
import RecordNavigation from "~/components/RecordNavigation"
import ScreenHeaderNavLink from "~/components/Screen/ScreenHeaderNavLink"
import { getRetroIntervalTitle } from "~/utils/get-retro-interval-title"
import { getAreaCountGroupsFromDailyLogs } from "~/utils/get-area-count-groups-from-daily-logs"
import RetroEmojiOverview from "~/components/RetroEmojiOverview"

type AreaCountGroup = {
  area: Area
  count: number
}

type LoaderData = {
  areaCounts: AreaCountGroup[]
  currentStartDate: Date
  previousRetro: Retro | null
}

export const loader: LoaderFunction = async ({ request }) => {
  const previousRetro = await db.retro.findFirst({
    orderBy: [
      {
        dateTo: "desc",
      },
    ],
  })

  // to get all the areas from daily logs, we need to fetch daily logs,
  // get their questions and then their relevant areas
  const dailyLogs = await db.dailyLog.findMany({
    where: {
      retroId: {
        equals: null,
      },
    },
    orderBy: [
      {
        logDate: "desc",
      },
    ],
    include: { question: { select: { area: true } } },
  })

  // "now" is a good fallback for empty state for start date
  let currentStartDate = new Date()
  if (dailyLogs.length > 0) {
    currentStartDate = new Date(dailyLogs[dailyLogs.length - 1].logDate)
  }

  const allAreas = await db.area.findMany()
  const areaCounts = getAreaCountGroupsFromDailyLogs(dailyLogs, allAreas)

  const data = {
    areaCounts,
    currentStartDate,
    previousRetro,
  }

  return json(data)
}

export default function RetroIndexRoute() {
  const { areaCounts, currentStartDate, previousRetro } =
    useLoaderData<LoaderData>()
  const isEmpty =
    areaCounts.filter((areaCount) => areaCount.count > 0).length === 0

  const recordNavigationTitle = getRetroIntervalTitle(currentStartDate)

  return (
    <>
      <ScreenHeader
        title={"Retro"}
        rightAction={
          !isEmpty && (
            <ScreenHeaderNavLink to={"/retro/new"} label={"Start\u00A0New"} />
          )
        }
      />

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
        />

        {isEmpty && (
          <>
            <SecondaryTitle className="text-primary-500">
              No Entries yet.
            </SecondaryTitle>

            <p className="mt-2">
              <ButtonLink
                href={"/entries/new"}
                label={"Add New Entry"}
                primary
              />
            </p>
          </>
        )}

        {!isEmpty && <RetroEmojiOverview areaCounts={areaCounts} />}
      </ScreenContent>

      <ScreenBottomBar activeLink={ScreenBottomBarLink.Retro} />
    </>
  )
}
