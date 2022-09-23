import type { Area } from "@prisma/client"
import { sortBy } from "ramda"
import type { Prisma } from "@prisma/client"

type DailyLogWithArea = Prisma.DailyLogGetPayload<{
  include: { question: { select: { area: true } } }
}>

type AreaCountGroups = Record<string, AreaCountGroup>

type AreaCountGroup = {
  area: Area
  count: number
}

export function getAreaCountGroupsFromDailyLogs(
  dailyLogs: DailyLogWithArea[],
  allAreas: Area[]
) {
  const areaCountGroups = dailyLogs.reduce((acc, cur) => {
    const areaId = cur.question.area.id

    if (typeof acc[areaId] === "undefined") {
      acc[areaId] = {
        area: cur.question.area,
        count: 1,
      }
    } else {
      acc[areaId].count++
    }

    return acc
  }, {} as AreaCountGroups)

  // and we need to merge it with all areas (not all are listed via the questions)
  const areaCounts = allAreas.map((area) => {
    if (typeof areaCountGroups[area.id] === "undefined") {
      return {
        area,
        count: 0,
      }
    }

    return areaCountGroups[area.id]
  })

  const getAreaCountSequence = (areaCount: AreaCountGroup) => {
    return areaCount.area.sequence
  }
  const sortBySequence = sortBy(getAreaCountSequence)

  return sortBySequence(areaCounts)
}
