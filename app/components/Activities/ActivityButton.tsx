import type { FC } from "react"
import type { ActivityTypeInterface } from "~/models/models"

type ActivityButtonProps = {
  activityType: ActivityTypeInterface
  onClick: (...args: any) => void
  state: ActivityButtonState
  className?: string
}

export enum ActivityButtonState {
  Invisible,
  WaitingForSelection,
  Selected,
  Discarded,
}

const ActivityButton: FC<ActivityButtonProps> = ({
  activityType,
  state,
  onClick,
  className,
}) => {
  let stateStyle = ""

  switch (state) {
    case ActivityButtonState.Invisible:
      stateStyle = "hidden"
      break
    case ActivityButtonState.WaitingForSelection:
      stateStyle = "text-4xl p-3"
      break
    case ActivityButtonState.Selected:
      stateStyle = "text-5xl bg-gray-800 text-white p-3"
      break
    case ActivityButtonState.Discarded:
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
      {activityType.icon}
    </button>
  )
}

export default ActivityButton
