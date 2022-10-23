import type { FC } from "react"
import type { ActivityTypeInterface } from "~/models/models"

type ActivityTypeButtonProps = {
  activityType: ActivityTypeInterface
  onClick: (...args: any) => void
  state: ActivityTypeButtonState
  className?: string
}

export enum ActivityTypeButtonState {
  Invisible,
  WaitingForSelection,
  Selected,
  Discarded,
}

const ActivityTypeButton: FC<ActivityTypeButtonProps> = ({
  activityType,
  state,
  onClick,
  className,
}) => {
  let stateStyle = ""

  switch (state) {
    case ActivityTypeButtonState.Invisible:
      stateStyle = "hidden"
      break
    case ActivityTypeButtonState.WaitingForSelection:
      stateStyle = "text-4xl p-3"
      break
    case ActivityTypeButtonState.Selected:
      stateStyle = "text-5xl bg-gray-800 text-white p-3"
      break
    case ActivityTypeButtonState.Discarded:
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

export default ActivityTypeButton
