import type { FC } from "react"
import type { ActivityHashtagInterface } from "~/models/models"

type ActivityHashtagButtonProps = {
  activityHashtag: ActivityHashtagInterface
  onClick: (...args: any) => void
  state: ActivityHashtagButtonState
  className?: string
}

export enum ActivityHashtagButtonState {
  Invisible,
  WaitingForSelection,
  Selected,
  Discarded,
}

const ActivityHashtagButton: FC<ActivityHashtagButtonProps> = ({
  activityHashtag,
  state,
  onClick,
  className,
}) => {
  let stateStyle = ""

  switch (state) {
    case ActivityHashtagButtonState.Invisible:
      stateStyle = "hidden"
      break
    case ActivityHashtagButtonState.WaitingForSelection:
      stateStyle = "text-4xl p-3"
      break
    case ActivityHashtagButtonState.Selected:
      stateStyle = "text-5xl bg-gray-800 text-white p-3"
      break
    case ActivityHashtagButtonState.Discarded:
      stateStyle = "text-4xl"
      break
  }
  return (
    <button
      className={`border-4 border-gray-800 rounded-full p-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${stateStyle} ${
        className ? className : ""
      }`}
      onClick={() => onClick()}
    >
      {activityHashtag.icon}
    </button>
  )
}

export default ActivityHashtagButton
