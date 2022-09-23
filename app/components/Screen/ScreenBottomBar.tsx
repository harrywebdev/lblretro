import ScreenBottomBarNavLink from "~/components/Screen/ScreenBottomBarNavLink"
import type { FC } from "react"
import ListIcon from "~/components/Icon/ListIcon"
import PlusIcon from "~/components/Icon/PlusIcon"
import ChartBarSquareIcon from "~/components/Icon/ChartBarSquareIcon"

type ScreenBottomBarProps = {
  activeLink: ScreenBottomBarLink
}

export enum ScreenBottomBarLink {
  Entries,
  NewEntry,
  Retro,
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
            icon={<ListIcon />}
          />
          <ScreenBottomBarNavLink
            to={"/"}
            label={"New Entry"}
            isActive={activeLink === ScreenBottomBarLink.NewEntry}
            icon={<PlusIcon />}
          />
          <ScreenBottomBarNavLink
            to={"/retro"}
            label={"Retro"}
            isActive={activeLink === ScreenBottomBarLink.Retro}
            icon={<ChartBarSquareIcon />}
          />
        </nav>
      </div>
    </footer>
  )
}

export default ScreenBottomBar
