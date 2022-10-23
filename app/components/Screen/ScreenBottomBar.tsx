import ScreenBottomBarNavLink from "~/components/Screen/ScreenBottomBarNavLink"
import type { FC } from "react"
import { ListBulletIcon } from "@heroicons/react/24/solid"
import { PlusIcon } from "@heroicons/react/24/solid"
import { ChartBarSquareIcon as ChartBarSquareIconOutline } from "@heroicons/react/24/outline"
import { ChartBarSquareIcon as ChartBarSquareIconSolid } from "@heroicons/react/24/solid"
import { Cog8ToothIcon as Cog8ToothIconSolid } from "@heroicons/react/24/solid"
import { Cog8ToothIcon as Cog8ToothIconOutline } from "@heroicons/react/24/outline"

type ScreenBottomBarProps = {
  activeLink: ScreenBottomBarLink
}

export enum ScreenBottomBarLink {
  Entries,
  NewEntry,
  Retro,
  Settings,
}

const ScreenBottomBar: FC<ScreenBottomBarProps> = ({ activeLink }) => {
  const className = `
    max-w-full w-96 mx-auto
    px-4 py-2
    bg-neutral-800 text-white
  `

  return (
    <footer className="sticky bottom-0 left-0 w-full self-end">
      <div className={className}>
        <nav className="flex items-center justify-between">
          <ScreenBottomBarNavLink
            to={"/entries"}
            label={"Entries"}
            isActive={activeLink === ScreenBottomBarLink.Entries}
            icon={<ListBulletIcon className="w-4 h-4" />}
          />
          <ScreenBottomBarNavLink
            to={"/"}
            label={"New Entry"}
            isActive={activeLink === ScreenBottomBarLink.NewEntry}
            icon={<PlusIcon className="w-4 h-4" />}
          />
          <ScreenBottomBarNavLink
            to={"/retro"}
            label={"Retro"}
            isActive={activeLink === ScreenBottomBarLink.Retro}
            icon={
              activeLink === ScreenBottomBarLink.Retro ? (
                <ChartBarSquareIconSolid className="w-4 h-4" />
              ) : (
                <ChartBarSquareIconOutline className="w-4 h-4" />
              )
            }
          />
          <ScreenBottomBarNavLink
            to={"/settings"}
            label={"Settings"}
            isActive={activeLink === ScreenBottomBarLink.Settings}
            icon={
              activeLink === ScreenBottomBarLink.Settings ? (
                <Cog8ToothIconSolid className="w-4 h-4" />
              ) : (
                <Cog8ToothIconOutline className="w-4 h-4" />
              )
            }
          />
        </nav>
      </div>
    </footer>
  )
}

export default ScreenBottomBar
