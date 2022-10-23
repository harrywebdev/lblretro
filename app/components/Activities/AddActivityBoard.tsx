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

  console.log("firstLevelChoice", firstLevelChoice)

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

  return (
    <div className="p-3">
      <div className="flex justify-around items-center relative">
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
      <ActivityButton
        state={ActivityButtonState.Invisible}
        activityType={ParentsOnlyActivityType}
        onClick={() => {}}
      />
      {/*<ActivityButton*/}
      {/*  state={ActivityButtonState.Invisible}*/}
      {/*  activityType={PartialFamilyActivityType}*/}
      {/*  onClick=() => {}*/}
      {/*/>*/}
      <ActivityButton
        state={ActivityButtonState.Invisible}
        activityType={MeTimeActivityType}
        onClick={() => {}}
      />
      <ActivityButton
        state={ActivityButtonState.Invisible}
        activityType={ChildActivityType}
        onClick={() => {}}
      />
      <ActivityButton
        state={ActivityButtonState.Invisible}
        activityType={WholeFamilyActivityType}
        onClick={() => {}}
      />
    </div>
  )
}

export default AddActivityBoard
