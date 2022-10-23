import {
  BsHeartFill,
  CgYinyang,
  FaFirstAid,
  FaRobot,
  // GiBalloons,
  GiBrain,
  GiFruitTree,
  GiTopHat,
  GiUpgrade,
  HiHomeModern,
  HiWrenchScrewdriver,
  IoBarbell,
  IoPeopleCircleOutline,
  MdHealthAndSafety,
  MdOutlineFamilyRestroom,
  RiHandCoinLine,
  RiHandHeartLine,
  TbMoodBoy,
  VscWorkspaceUnknown,
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

export interface ActivityHashtagInterface {
  id: string
  name: string
  icon: ReactNode
  parent?: ActivityHashtagInterface
}

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
  // icon: <GiBalloons />,
  icon: <IoPeopleCircleOutline />,
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

export const HealthHashtag: ActivityHashtagInterface = {
  id: "health_hashtag",
  name: "#health",
  icon: <MdHealthAndSafety />,
}

export const HealthyMindHashtag: ActivityHashtagInterface = {
  id: "healthy_mind_hashtag",
  name: "#mind",
  icon: <GiBrain />,
  parent: HealthHashtag,
}

export const HealthyBodyHashtag: ActivityHashtagInterface = {
  id: "healthy_body_hashtag",
  name: "#body",
  icon: <IoBarbell />,
  parent: HealthHashtag,
}

export const HealthySpiritHashtag: ActivityHashtagInterface = {
  id: "healthy_spirit_hashtag",
  name: "#spirit",
  icon: <CgYinyang />,
  parent: HealthHashtag,
}

export const HomeHashtag: ActivityHashtagInterface = {
  id: "home_hashtag",
  name: "#home",
  icon: <HiHomeModern />,
}

export const HomeRepairHashtag: ActivityHashtagInterface = {
  id: "home_repair_hashtag",
  name: "#repair",
  icon: <HiWrenchScrewdriver />,
  parent: HomeHashtag,
}

export const HomeUpgradeHashtag: ActivityHashtagInterface = {
  id: "home_upgrade_hashtag",
  name: "#upgrade",
  icon: <GiUpgrade />,
  parent: HomeHashtag,
}

export const AltruismHashtag: ActivityHashtagInterface = {
  id: "altruism_hashtag",
  name: "#altruism",
  icon: <FaFirstAid />,
}

export const AltruismCharityHashtag: ActivityHashtagInterface = {
  id: "altruism_charity_hashtag",
  name: "#charity",
  icon: <RiHandCoinLine />,
  parent: AltruismHashtag,
}

export const AltruismGiveHandHashtag: ActivityHashtagInterface = {
  id: "altruism_give_hand_hashtag",
  name: "#givehand",
  icon: <RiHandHeartLine />,
  parent: HomeHashtag,
}

export const UnknownHashtag: ActivityHashtagInterface = {
  id: "unknown_hashtag",
  name: "#unknown",
  icon: <VscWorkspaceUnknown />,
}
