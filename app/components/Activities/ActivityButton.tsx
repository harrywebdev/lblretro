import type { FC } from "react"
import type { ActivityTypeInterface } from "~/models/models"

type ActivityButtonProps = {
  activityType: ActivityTypeInterface
}

const ActivityButton: FC<ActivityButtonProps> = ({ activityType }) => {
  return (
    <button
      className={`border-2 border-gray-800 rounded-full p-2 text-3xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
    >
      {activityType.icon}
    </button>
  )
}

export default ActivityButton
