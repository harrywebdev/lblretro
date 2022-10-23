import ActivityTypeButton, {
  ActivityTypeButtonState,
} from "~/components/Activities/ActivityTypeButton"
import type {
  ActivityHashtagInterface,
  ActivityTypeInterface,
  ActivityTypeOrHashtag,
} from "~/models/models"
import {
  AltruismHashtag,
  ChildActivityType,
  FreeTimeActivityType,
  HealthHashtag,
  HomeHashtag,
  MeTimeActivityType,
  ParentsOnlyActivityType,
  WholeFamilyActivityType,
  WorkActivityType,
} from "~/models/models"
import { useCallback, useState } from "react"
import SecondaryTitle from "~/components/SecondaryTitle"
import ActivityButtonGroup from "~/components/Activities/ActivityButtonGroup"

const AddActivityBoard = () => {
  const [firstLevelChoice, setFirstLevelChoice] =
    useState<ActivityTypeInterface>()

  const [freeTimeOptionsChoice, setFreeTimeOptionsChoice] =
    useState<ActivityTypeInterface>()

  const [activityHashtags, setActivityHashtag] = useState<
    ActivityHashtagInterface[]
  >([])

  const [activitySelection, setActivitySelection] = useState<
    ActivityTypeOrHashtag[]
  >([])

  const handleActivityGroupChange = useCallback(
    (
      groupParent: ActivityTypeOrHashtag,
      selectedItem: ActivityTypeOrHashtag | undefined
    ) => {
      // remove any existing choice
      if (typeof selectedItem === "undefined") {
        const rejectItems = (item: ActivityHashtagInterface) => {
          return item !== groupParent && item.parent !== groupParent
        }
        setActivitySelection(activitySelection.filter(rejectItems))
        return
      }

      let newActivitySelection = [...activitySelection]

      // add choice if it doesn't exist
      if (!newActivitySelection.includes(groupParent)) {
        newActivitySelection.push(groupParent)
      }

      if (!newActivitySelection.includes(selectedItem)) {
        newActivitySelection.push(selectedItem)
      }

      setActivitySelection(newActivitySelection)
    },
    [activitySelection]
  )

  const freeTimeActivityTypeState =
    firstLevelChoice === FreeTimeActivityType
      ? ActivityTypeButtonState.Selected
      : typeof firstLevelChoice === "undefined"
      ? ActivityTypeButtonState.WaitingForSelection
      : ActivityTypeButtonState.Discarded

  const workActivityTypeState =
    firstLevelChoice === WorkActivityType
      ? ActivityTypeButtonState.Selected
      : typeof firstLevelChoice === "undefined"
      ? ActivityTypeButtonState.WaitingForSelection
      : ActivityTypeButtonState.Discarded

  const showFreeTimeActivityOptions =
    freeTimeActivityTypeState === ActivityTypeButtonState.Selected

  const showHashtags =
    workActivityTypeState === ActivityTypeButtonState.Selected ||
    (freeTimeActivityTypeState === ActivityTypeButtonState.Selected &&
      typeof freeTimeOptionsChoice !== "undefined")

  return (
    <div className="p-3">
      <div className="flex justify-around items-center relative mb-4">
        {/* TODO: add option for anything just to save a hashtag info without categorization (like charity) */}
        <ActivityTypeButton
          state={freeTimeActivityTypeState}
          activityType={FreeTimeActivityType}
          onClick={() => {
            setFirstLevelChoice(FreeTimeActivityType)
            setActivityHashtag([])
          }}
          className={
            freeTimeActivityTypeState === ActivityTypeButtonState.Discarded
              ? "absolute top-0 left-0"
              : ""
          }
        />
        <ActivityTypeButton
          state={workActivityTypeState}
          activityType={WorkActivityType}
          onClick={() => {
            setFirstLevelChoice(WorkActivityType)
            setActivityHashtag([])
          }}
          className={
            workActivityTypeState === ActivityTypeButtonState.Discarded
              ? "absolute top-0 right-0"
              : ""
          }
        />
      </div>

      {showFreeTimeActivityOptions && (
        <div className="flex justify-around items-center relative mb-3">
          <ActivityTypeButton
            state={
              freeTimeOptionsChoice === ParentsOnlyActivityType
                ? ActivityTypeButtonState.Selected
                : typeof freeTimeOptionsChoice === "undefined"
                ? ActivityTypeButtonState.WaitingForSelection
                : ActivityTypeButtonState.Discarded
            }
            activityType={ParentsOnlyActivityType}
            onClick={() => setFreeTimeOptionsChoice(ParentsOnlyActivityType)}
          />
          <ActivityTypeButton
            state={
              freeTimeOptionsChoice === WholeFamilyActivityType
                ? ActivityTypeButtonState.Selected
                : typeof freeTimeOptionsChoice === "undefined"
                ? ActivityTypeButtonState.WaitingForSelection
                : ActivityTypeButtonState.Discarded
            }
            activityType={WholeFamilyActivityType}
            onClick={() => setFreeTimeOptionsChoice(WholeFamilyActivityType)}
          />
          <ActivityTypeButton
            state={
              freeTimeOptionsChoice === ChildActivityType
                ? ActivityTypeButtonState.Selected
                : typeof freeTimeOptionsChoice === "undefined"
                ? ActivityTypeButtonState.WaitingForSelection
                : ActivityTypeButtonState.Discarded
            }
            activityType={ChildActivityType}
            onClick={() => setFreeTimeOptionsChoice(ChildActivityType)}
          />
          <ActivityTypeButton
            state={
              freeTimeOptionsChoice === MeTimeActivityType
                ? ActivityTypeButtonState.Selected
                : typeof freeTimeOptionsChoice === "undefined"
                ? ActivityTypeButtonState.WaitingForSelection
                : ActivityTypeButtonState.Discarded
            }
            activityType={MeTimeActivityType}
            onClick={() => setFreeTimeOptionsChoice(MeTimeActivityType)}
          />
        </div>
      )}

      {showHashtags && (
        <div>
          <SecondaryTitle
            className={"text-center mt-4 mb-3 border-t border-gray-300 pt-2"}
          >
            Add Hashtags
          </SecondaryTitle>
          <div className="flex justify-around items-center relative mb-3 flex-wrap">
            <ActivityButtonGroup
              groupParent={HealthHashtag}
              onChange={handleActivityGroupChange}
              className={"mb-3 mr-3"}
            />
            <ActivityButtonGroup
              groupParent={HomeHashtag}
              onChange={handleActivityGroupChange}
              className={"mb-3 mr-3"}
            />
            <ActivityButtonGroup
              groupParent={AltruismHashtag}
              onChange={handleActivityGroupChange}
              className={"mb-3 mr-3"}
            />

            {/*<ActivityHashtagButton*/}
            {/*  state={*/}
            {/*    activityHashtags.includes(UnknownHashtag)*/}
            {/*      ? ActivityHashtagButtonState.Selected*/}
            {/*      : ActivityHashtagButtonState.WaitingForSelection*/}
            {/*  }*/}
            {/*  activityHashtag={UnknownHashtag}*/}
            {/*  onClick={() => handleActivityHashtagClick(UnknownHashtag)}*/}
            {/*/>*/}
          </div>
        </div>
      )}
    </div>
  )
}

export default AddActivityBoard
