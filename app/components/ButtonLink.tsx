import type { FC } from "react"
import {
  defaultButtonStyles,
  primaryButtonStyles,
} from "~/components/Button.styles"
import { Link } from "@remix-run/react"

type ButtonLinkProps = {
  href: string
  label: string
  className?: string
  primary?: boolean
}

const ButtonLink: FC<ButtonLinkProps> = (props) => {
  const { href, label, primary, className, ...attrs } = props

  const styles =
    typeof primary !== "undefined" ? primaryButtonStyles : defaultButtonStyles

  return (
    <Link
      to={href}
      className={`${styles} ${className}`}
      {...attrs}
      aria-label={label}
    >
      {label}
    </Link>
  )
}

export default ButtonLink
