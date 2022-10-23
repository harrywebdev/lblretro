import ActivityTypeButton, {
  ActivityTypeButtonState,
} from "~/components/Activities/ActivityTypeButton"
import {
  ActivityHashtagInterface,
  ActivityTypeInterface,
  UnknownHashtag,
} from "~/models/models"
import {
  ChildActivityType,
  FreeTimeActivityType,
  HealthHashtag,
  HealthyBodyHashtag,
  HealthyMindHashtag,
  HealthySpiritHashtag,
  HomeHashtag,
  HomeRepairHashtag,
  HomeUpgradeHashtag,
  MeTimeActivityType,
  ParentsOnlyActivityType,
  WholeFamilyActivityType,
  WorkActivityType,
} from "~/models/models"
import { useState } from "react"
import ActivityHashtagButton, {
  ActivityHashtagButtonState,
} from "~/components/Activities/ActivityHashtagButton"
import SecondaryTitle from "~/components/SecondaryTitle"

const AddActivityBoard = () => {
  const [firstLevelChoice, setFirstLevelChoice] =
    useState<ActivityTypeInterface>()

  const [freeTimeOptionsChoice, setFreeTimeOptionsChoice] =
    useState<ActivityTypeInterface>()

  const [activityHashtags, setActivityHashtag] = useState<
    ActivityHashtagInterface[]
  >([])

  const handleActivityHashtagClick = (
    activityHashtag: ActivityHashtagInterface
  ) => {
    if (activityHashtags.includes(activityHashtag)) {
      const rejectHashtag = (stateHashtag: ActivityHashtagInterface) =>
        stateHashtag !== activityHashtag
      setActivityHashtag(activityHashtags.filter(rejectHashtag))
      return
    }

    setActivityHashtag([...activityHashtags, activityHashtag])
  }

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
            <ActivityHashtagButton
              state={
                activityHashtags.includes(HealthHashtag)
                  ? ActivityHashtagButtonState.Selected
                  : ActivityHashtagButtonState.WaitingForSelection
              }
              activityHashtag={HealthHashtag}
              onClick={() => handleActivityHashtagClick(HealthHashtag)}
            />
            <ActivityHashtagButton
              state={
                !activityHashtags.includes(HealthHashtag)
                  ? ActivityHashtagButtonState.Invisible
                  : activityHashtags.includes(HealthyMindHashtag)
                  ? ActivityHashtagButtonState.Selected
                  : ActivityHashtagButtonState.WaitingForSelection
              }
              activityHashtag={HealthyMindHashtag}
              onClick={() => handleActivityHashtagClick(HealthyMindHashtag)}
            />
            <ActivityHashtagButton
              state={
                !activityHashtags.includes(HealthHashtag)
                  ? ActivityHashtagButtonState.Invisible
                  : activityHashtags.includes(HealthyBodyHashtag)
                  ? ActivityHashtagButtonState.Selected
                  : ActivityHashtagButtonState.WaitingForSelection
              }
              activityHashtag={HealthyBodyHashtag}
              onClick={() => handleActivityHashtagClick(HealthyBodyHashtag)}
            />
            <ActivityHashtagButton
              state={
                !activityHashtags.includes(HealthHashtag)
                  ? ActivityHashtagButtonState.Invisible
                  : activityHashtags.includes(HealthySpiritHashtag)
                  ? ActivityHashtagButtonState.Selected
                  : ActivityHashtagButtonState.WaitingForSelection
              }
              activityHashtag={HealthySpiritHashtag}
              onClick={() => handleActivityHashtagClick(HealthySpiritHashtag)}
            />
            <ActivityHashtagButton
              state={
                activityHashtags.includes(HomeHashtag)
                  ? ActivityHashtagButtonState.Selected
                  : ActivityHashtagButtonState.WaitingForSelection
              }
              activityHashtag={HomeHashtag}
              onClick={() => handleActivityHashtagClick(HomeHashtag)}
            />
            <ActivityHashtagButton
              state={
                !activityHashtags.includes(HomeHashtag)
                  ? ActivityHashtagButtonState.Invisible
                  : activityHashtags.includes(HomeRepairHashtag)
                  ? ActivityHashtagButtonState.Selected
                  : ActivityHashtagButtonState.WaitingForSelection
              }
              activityHashtag={HomeRepairHashtag}
              onClick={() => handleActivityHashtagClick(HomeRepairHashtag)}
            />
            <ActivityHashtagButton
              state={
                !activityHashtags.includes(HomeHashtag)
                  ? ActivityHashtagButtonState.Invisible
                  : activityHashtags.includes(HomeUpgradeHashtag)
                  ? ActivityHashtagButtonState.Selected
                  : ActivityHashtagButtonState.WaitingForSelection
              }
              activityHashtag={HomeUpgradeHashtag}
              onClick={() => handleActivityHashtagClick(HomeUpgradeHashtag)}
            />
            <ActivityHashtagButton
              state={
                activityHashtags.includes(UnknownHashtag)
                  ? ActivityHashtagButtonState.Selected
                  : ActivityHashtagButtonState.WaitingForSelection
              }
              activityHashtag={UnknownHashtag}
              onClick={() => handleActivityHashtagClick(UnknownHashtag)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default AddActivityBoard
