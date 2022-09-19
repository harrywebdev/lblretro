import ListItem from "~/components/ListItem/ListItem"
import ListItemContent from "~/components/ListItem/ListItemContent"
import ListItemTitle from "~/components/ListItem/ListItemTitle"
import type { FC } from "react"
import type { SerializeFrom } from "@remix-run/node"
import type { DailyLog } from "@prisma/client"
import ListItemDescription from "~/components/ListItem/ListItemDescription"

type EntryListItemProps = {
  dailyLog: SerializeFrom<DailyLog>
}

const EntryListItem: FC<EntryListItemProps> = ({ dailyLog }) => {
  return (
    <ListItem>
      <ListItemContent>
        <ListItemTitle>{dailyLog.title}</ListItemTitle>
        <ListItemDescription>{dailyLog.content}</ListItemDescription>
      </ListItemContent>
    </ListItem>
  )
}

export default EntryListItem
