import ActivityButton from "~/components/Activities/ActivityButton"
import {
  ChildActivityType,
  FreeTimeActivityType,
  MeTimeActivityType,
  ParentsOnlyActivityType,
  PartialFamilyActivityType,
  WholeFamilyActivityType,
  WorkActivityType,
} from "~/models/models"

const AddActivityBoard = () => {
  return (
    <div className="p-3 mb-3">
      <ActivityButton activityType={FreeTimeActivityType} />
      <ActivityButton activityType={WorkActivityType} />
      <ActivityButton activityType={ParentsOnlyActivityType} />
      <ActivityButton activityType={PartialFamilyActivityType} />
      <ActivityButton activityType={MeTimeActivityType} />
      <ActivityButton activityType={ChildActivityType} />
      <ActivityButton activityType={WholeFamilyActivityType} />
    </div>
  )
}

export default AddActivityBoard
