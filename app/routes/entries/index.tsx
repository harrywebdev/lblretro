import { useLoaderData } from "@remix-run/react"
import type { LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import type { Prisma } from "@prisma/client"
import { db } from "~/utils/db.server"
import ScreenHeader from "~/components/Screen/ScreenHeader"
import ScreenHeaderNavLink from "~/components/Screen/ScreenHeaderNavLink"
import ScreenContent from "~/components/Screen/ScreenContent"
import { format, parseISO } from "date-fns"
import SecondaryTitle from "~/components/SecondaryTitle"
import ItemGroup from "~/components/ItemGroup"
import EntryListItem from "~/components/EntryListItem"
import ScreenBottomBar, {
  ScreenBottomBarLink,
} from "~/components/Screen/ScreenBottomBar"

type DailyLogWithQuestion = Prisma.DailyLogGetPayload<{
  include: { question: true }
}>

type DailyLogGroups = Record<string, DailyLogGroup>

type DailyLogGroup = {
  logDate: Date
  items: DailyLogWithQuestion[]
}

type LoaderData = { dailyLogGroups: DailyLogGroup[]; isEditing: boolean }

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const isEditing = url.searchParams.has("edit")

  const dailyLogs = await db.dailyLog.findMany({
    orderBy: [
      {
        logDate: "desc",
      },
    ],
    include: { question: true },
  })

  const dailyLogGroups = dailyLogs.reduce((acc, cur) => {
    const groupDate = cur.logDate.toString()

    if (typeof acc[groupDate] === "undefined") {
      acc[groupDate] = {
        logDate: cur.logDate,
        items: [cur],
      }
    } else {
      acc[groupDate].items.push(cur)
    }

    return acc
  }, {} as DailyLogGroups)

  const data = { dailyLogGroups: Object.values(dailyLogGroups), isEditing }

  return json(data)
}

export default function EntriesIndexRoute() {
  const { dailyLogGroups, isEditing } = useLoaderData<LoaderData>()

  return (
    <>
      <ScreenHeader
        title={"Entries"}
        rightAction={
          isEditing ? (
            <ScreenHeaderNavLink to={"/entries"} label={"Done"} />
          ) : (
            <ScreenHeaderNavLink to={"/entries?edit"} label={"Edit"} />
          )
        }
      />

      <ScreenContent>
        {dailyLogGroups.length === 0 && (
          <SecondaryTitle className="px-4 text-primary-500">
            No Entries yet.
          </SecondaryTitle>
        )}

        {dailyLogGroups.map((group) => (
          <div key={group.logDate}>
            <SecondaryTitle className="px-4 mt-6">
              {format(parseISO(group.logDate), "do MMM, y")}
            </SecondaryTitle>
            <ItemGroup>
              <ul>
                {group.items.map((dailyLog) => (
                  <EntryListItem
                    key={dailyLog.id}
                    dailyLog={dailyLog}
                    isEditing={isEditing}
                  />
                ))}
              </ul>
            </ItemGroup>
          </div>
        ))}
      </ScreenContent>

      <ScreenBottomBar activeLink={ScreenBottomBarLink.Entries} />
    </>
  )
}
