import type { FC } from "react"
import type { ActivityTypeOrHashtag } from "~/models/models"
import { findChildrenForActivityTypeOrHashtag } from "~/models/models"
import { useState } from "react"
import ActivityButton, {
  ActivityButtonState,
} from "~/components/Activities/ActivityButton"
import { IoClose } from "react-icons/io5"

type ActivityButtonGroupProps = {
  groupParent: ActivityTypeOrHashtag
  onChange: (
    groupParent: ActivityTypeOrHashtag,
    selectedItem: ActivityTypeOrHashtag | undefined
  ) => void
  className?: string
}

const ActivityButtonGroup: FC<ActivityButtonGroupProps> = ({
  groupParent,
  onChange,
  className,
}) => {
  const [currentSelection, setCurrentSelection] =
    useState<ActivityTypeOrHashtag>()

  const [isExpanded, setIsExpanded] = useState(false)
  const stateStyle = isExpanded ? "" : ""
  const groupChildren = findChildrenForActivityTypeOrHashtag(groupParent)

  const handleActivityButtonClick = (item: ActivityTypeOrHashtag) => {
    if (currentSelection === item) {
      setCurrentSelection(undefined)

      onChange(groupParent, undefined)
      return
    }

    setCurrentSelection(item)
    onChange(groupParent, item)
  }

  return (
    <div
      className={`border-4 border-gray-800 rounded-full p-2 bg-white shadow-sm flex justify-between items-center ${stateStyle} ${className}`}
    >
      <button
        className={`text-4xl`}
        onClick={() => {
          // reset all selected items
          if (isExpanded) {
            setCurrentSelection(undefined)
            onChange(groupParent, undefined)
          }

          // toggle expanded
          setIsExpanded(!isExpanded)
        }}
      >
        {isExpanded ? <IoClose /> : groupParent.icon}
      </button>

      {isExpanded && (
        <>
          {groupChildren.map((item) => (
            <ActivityButton
              key={item.id}
              state={
                currentSelection === item
                  ? ActivityButtonState.Selected
                  : ActivityButtonState.WaitingForSelection
              }
              activityItem={item}
              onClick={() => handleActivityButtonClick(item)}
              className={"ml-2"}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default ActivityButtonGroup
