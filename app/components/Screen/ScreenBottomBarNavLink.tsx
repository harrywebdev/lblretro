import type { FC, ReactElement } from "react"
import { Link } from "@remix-run/react"
import { cloneElement } from "react"

type ScreenBottomBarNavLinkProps = {
  to: string
  isActive: boolean
  label?: string
  icon?: ReactElement
}

const isActiveStyles = "bg-white text-primary-800 rounded-md "
const isNotActiveStyles = "text-white"

const ScreenBottomBarNavLink: FC<ScreenBottomBarNavLinkProps> = ({
  to,
  isActive,
  label,
  icon,
}) => {
  let Icon
  if (typeof icon !== "undefined") {
    Icon = cloneElement(icon, { className: "h-5 w-5" })
  }

  const styles = isActive ? isActiveStyles : isNotActiveStyles

  return (
    <Link
      to={to}
      title={label}
      aria-label={label}
      className={`inline-flex flex-col items-center justify-between px-3 py-1 text-xs font-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 peer ${styles}`}
    >
      {Icon}

      {label && <span className="block">{label}</span>}
    </Link>
  )
}

export default ScreenBottomBarNavLink
