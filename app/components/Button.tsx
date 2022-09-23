import type { FC } from "react"
import {
  defaultButtonStyles,
  primaryButtonStyles,
} from "~/components/Button.styles"

type ButtonProps = {
  type: "submit" | "button" | "reset"
  label: string
  name?: string
  value?: string
  className?: string
  primary?: boolean
}

const Button: FC<ButtonProps> = (props) => {
  const { type, label, primary, className, ...attrs } = props

  const styles =
    typeof primary !== "undefined" ? primaryButtonStyles : defaultButtonStyles

  return (
    <button type={type} className={`${styles} ${className}`} {...attrs}>
      {/*Heroicon name: */}
      {/* svg `className="-ml-1 mr-2 h-5 w-5"` */}
      {label}
    </button>
  )
}

export default Button
