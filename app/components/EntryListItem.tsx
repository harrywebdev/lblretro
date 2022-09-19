import ListItem from "~/components/ListItem/ListItem"
import ListItemContent from "~/components/ListItem/ListItemContent"
import ListItemTitle from "~/components/ListItem/ListItemTitle"
import type { FC } from "react"
import type { SerializeFrom } from "@remix-run/node"
import type { Prisma } from "@prisma/client"
import ListItemDescription from "~/components/ListItem/ListItemDescription"
import ListItemLeftSide from "~/components/ListItem/ListItemLeftSide"

type DailyLogWithQuestion = Prisma.DailyLogGetPayload<{
  include: { question: true }
}>

type EntryListItemProps = {
  dailyLog: SerializeFrom<DailyLogWithQuestion>
}

const EntryListItem: FC<EntryListItemProps> = ({ dailyLog }) => {
  return (
    <ListItem>
      <ListItemLeftSide>
        <span className="text-2xl">{dailyLog.question.emoji}</span>
      </ListItemLeftSide>
      <ListItemContent>
        <ListItemTitle>{dailyLog.title}</ListItemTitle>
        <ListItemDescription>{dailyLog.content}</ListItemDescription>
      </ListItemContent>
    </ListItem>
  )
}

export default EntryListItem
