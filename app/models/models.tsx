import {
  BsHeartFill,
  FaRobot,
  GiBalloons,
  GiFruitTree,
  GiTopHat,
  MdOutlineFamilyRestroom,
  TbMoodBoy,
} from "react-icons/all"
import type { ReactNode } from "react"

export interface ActivityTypeInterface {
  id: string
  name: string
  icon: ReactNode
  parent?: ActivityTypeInterface
}

export interface OngoingInterface {
  healthGaugeInDays: number | null
  hasHealthGauge: boolean
}

export interface ProportionalActivityTypeInterface
  extends ActivityTypeInterface {
  weight: number
}

export interface OngoingActivityTypeInterface
  extends ActivityTypeInterface,
    OngoingInterface {}

export const FreeTimeActivityType: ActivityTypeInterface = {
  id: "free_time_activity_type",
  name: "Free Time",
  icon: <GiFruitTree />,
}

export const ParentsOnlyActivityType: ProportionalActivityTypeInterface = {
  id: "parents_only_activity_type",
  name: "Parents Only",
  icon: <BsHeartFill />,
  weight: 8,
}

export const PartialFamilyActivityType: ActivityTypeInterface = {
  id: "partial_family_activity_type",
  name: "Partial Family",
  icon: <GiBalloons />,
}

export const MeTimeActivityType: ProportionalActivityTypeInterface = {
  id: "me_time_activity_type",
  name: "Me-time",
  icon: <GiTopHat />,
  weight: 4,
  parent: PartialFamilyActivityType,
}

export const ChildActivityType: ProportionalActivityTypeInterface = {
  id: "child_activity_type",
  name: "Me & the Child",
  icon: <TbMoodBoy />,
  weight: 4,
  parent: PartialFamilyActivityType,
}

export const WholeFamilyActivityType: ActivityTypeInterface = {
  id: "whole_family_activity_type",
  name: "Whole Family",
  icon: <MdOutlineFamilyRestroom />,
}

export const WorkActivityType: OngoingActivityTypeInterface = {
  id: "work_activity_type",
  name: "Work",
  icon: <FaRobot />,
  healthGaugeInDays: 1,
  hasHealthGauge: true,
}
