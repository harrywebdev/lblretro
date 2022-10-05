import ListItem from "~/components/ListItem/ListItem"
import ListItemContent from "~/components/ListItem/ListItemContent"
import ListItemTitle from "~/components/ListItem/ListItemTitle"
import type { FC } from "react"
import type { SerializeFrom } from "@remix-run/node"
import type { Prisma } from "@prisma/client"
import ListItemDescription from "~/components/ListItem/ListItemDescription"
import ListItemLeftSide from "~/components/ListItem/ListItemLeftSide"
import ListItemRightSide from "~/components/ListItem/ListItemRightSide"
import MinusCircleIcon from "~/components/Icon/MinusCircleIcon"

type DailyLogWithQuestion = Prisma.DailyLogGetPayload<{
  include: { question: true }
}>

type EntryListItemProps = {
  dailyLog: SerializeFrom<DailyLogWithQuestion>
  isEditing: boolean
}

const EntryListItem: FC<EntryListItemProps> = ({ dailyLog, isEditing }) => {
  return (
    <ListItem
      link={
        isEditing
          ? { to: `/entries/${dailyLog.id}`, title: "Edit Entry" }
          : undefined
      }
    >
      <ListItemLeftSide>
        <span className="text-2xl">{dailyLog.question.emoji}</span>
      </ListItemLeftSide>
      <ListItemContent>
        <ListItemTitle>{dailyLog.title}</ListItemTitle>
        <ListItemDescription>{dailyLog.content}</ListItemDescription>
      </ListItemContent>
      {isEditing && (
        <ListItemRightSide>
          <form
            method="post"
            action={`/entries/${dailyLog.id}`}
            className="flex"
          >
            <input type="hidden" name="redirectTo" value="/entries?edit" />
            <button
              type="submit"
              name="delete"
              value="yes"
              className="text-danger-600"
            >
              <MinusCircleIcon />
            </button>
          </form>
        </ListItemRightSide>
      )}
    </ListItem>
  )
}

export default EntryListItem
