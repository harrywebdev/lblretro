import AreaCount from "~/components/AreaCount"
import ListItem from "~/components/ListItem/ListItem"
import ListItemContent from "~/components/ListItem/ListItemContent"
import ListItemRightSide from "~/components/ListItem/ListItemRightSide"
import ChevronRightIcon from "~/components/Icon/ChevronRightIcon"
import ItemGroup from "~/components/ItemGroup"
import type { FC } from "react"
import type { Area } from "@prisma/client"
import type { SerializeFrom } from "@remix-run/node"
import { useLocation } from "@remix-run/react"
import type { Retro } from "@prisma/client"

type AreaCountGroup = {
  area: SerializeFrom<Area>
  count: number
}

type RetroEmojiOverviewProps = {
  areaCounts: AreaCountGroup[]
  currentRetro?: SerializeFrom<Retro>
}

const RetroEmojiOverview: FC<RetroEmojiOverviewProps> = ({
  areaCounts,
  currentRetro,
}) => {
  const location = useLocation()

  const allEntriesQueryParams = new URLSearchParams()
  allEntriesQueryParams.append("backToUrl", location.pathname)
  allEntriesQueryParams.append("backToLabel", "Retro")
  allEntriesQueryParams.append(
    "retroId",
    typeof currentRetro !== "undefined" ? currentRetro.id : "null"
  )

  const allEntriesLinkUrl = `/entries?${allEntriesQueryParams.toString()}`

  return (
    <ItemGroup>
      <div className="flex items-center justify-between py-2 px-3">
        {areaCounts.map((areaCount) => (
          <AreaCount
            key={areaCount.area.id}
            area={areaCount.area}
            count={areaCount.count}
          />
        ))}
      </div>
      <ul>
        <ListItem
          className="border-t"
          link={{ to: allEntriesLinkUrl, title: "See all Entries" }}
        >
          <ListItemContent>See all Entries</ListItemContent>

          <ListItemRightSide>
            <span className={"text-secondary-500"}>
              <ChevronRightIcon />
            </span>
          </ListItemRightSide>
        </ListItem>
      </ul>
    </ItemGroup>
  )
}

export default RetroEmojiOverview
