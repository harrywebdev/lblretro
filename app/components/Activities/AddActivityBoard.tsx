import ActivityButton, {
  ActivityButtonState,
} from "~/components/Activities/ActivityButton"
import type { ActivityTypeInterface } from "~/models/models"
import {
  ChildActivityType,
  FreeTimeActivityType,
  MeTimeActivityType,
  ParentsOnlyActivityType,
  WholeFamilyActivityType,
  WorkActivityType,
} from "~/models/models"
import { useState } from "react"

const AddActivityBoard = () => {
  const [firstLevelChoice, setFirstLevelChoice] =
    useState<ActivityTypeInterface>()

  const [freeTimeOptionsChoice, setFreeTimeOptionsChoice] =
    useState<ActivityTypeInterface>()

  const freeTimeActivityTypeState =
    firstLevelChoice === FreeTimeActivityType
      ? ActivityButtonState.Selected
      : typeof firstLevelChoice === "undefined"
      ? ActivityButtonState.WaitingForSelection
      : ActivityButtonState.Discarded

  const workActivityTypeState =
    firstLevelChoice === WorkActivityType
      ? ActivityButtonState.Selected
      : typeof firstLevelChoice === "undefined"
      ? ActivityButtonState.WaitingForSelection
      : ActivityButtonState.Discarded

  const showFreeTimeActivityOptions =
    freeTimeActivityTypeState === ActivityButtonState.Selected

  return (
    <div className="p-3">
      <div className="flex justify-around items-center relative mb-4">
        <ActivityButton
          state={freeTimeActivityTypeState}
          activityType={FreeTimeActivityType}
          onClick={() => setFirstLevelChoice(FreeTimeActivityType)}
          className={
            freeTimeActivityTypeState === ActivityButtonState.Discarded
              ? "absolute top-0 left-0"
              : ""
          }
        />
        <ActivityButton
          state={workActivityTypeState}
          activityType={WorkActivityType}
          onClick={() => setFirstLevelChoice(WorkActivityType)}
          className={
            workActivityTypeState === ActivityButtonState.Discarded
              ? "absolute top-0 right-0"
              : ""
          }
        />
      </div>
      {showFreeTimeActivityOptions && (
        <div className="flex justify-around items-center relative mb-3">
          <ActivityButton
            state={
              freeTimeOptionsChoice === ParentsOnlyActivityType
                ? ActivityButtonState.Selected
                : typeof freeTimeOptionsChoice === "undefined"
                ? ActivityButtonState.WaitingForSelection
                : ActivityButtonState.Discarded
            }
            activityType={ParentsOnlyActivityType}
            onClick={() => setFreeTimeOptionsChoice(ParentsOnlyActivityType)}
          />
          <ActivityButton
            state={
              freeTimeOptionsChoice === WholeFamilyActivityType
                ? ActivityButtonState.Selected
                : typeof freeTimeOptionsChoice === "undefined"
                ? ActivityButtonState.WaitingForSelection
                : ActivityButtonState.Discarded
            }
            activityType={WholeFamilyActivityType}
            onClick={() => setFreeTimeOptionsChoice(WholeFamilyActivityType)}
          />
          <ActivityButton
            state={
              freeTimeOptionsChoice === ChildActivityType
                ? ActivityButtonState.Selected
                : typeof freeTimeOptionsChoice === "undefined"
                ? ActivityButtonState.WaitingForSelection
                : ActivityButtonState.Discarded
            }
            activityType={ChildActivityType}
            onClick={() => setFreeTimeOptionsChoice(ChildActivityType)}
          />
          <ActivityButton
            state={
              freeTimeOptionsChoice === MeTimeActivityType
                ? ActivityButtonState.Selected
                : typeof freeTimeOptionsChoice === "undefined"
                ? ActivityButtonState.WaitingForSelection
                : ActivityButtonState.Discarded
            }
            activityType={MeTimeActivityType}
            onClick={() => setFreeTimeOptionsChoice(MeTimeActivityType)}
          />
        </div>
      )}
    </div>
  )
}

export default AddActivityBoard
