import type { FC, ReactNode } from "react"
import { Link } from "@remix-run/react"

type LinkProps = {
  to: string
  title: string
}

type TodoListItemProps = {
  className?: string
  children?: ReactNode
  link?: LinkProps
}

const ListItem: FC<TodoListItemProps> = ({ className, children, link }) => {
  if (typeof link !== "undefined") {
    return (
      <li className="flex-1">
        <Link
          to={link.to}
          title={link.title}
          aria-label={link.title}
          className={`not-last:border-b border-gray-200 py-2 ml-4 px-2 flex flex-row items-center ${className}`}
        >
          {children}
        </Link>
      </li>
    )
  }

  return (
    <li
      className={`not-last:border-b border-gray-200 py-2 ml-4 px-2 flex flex-row items-center ${className}`}
    >
      {children}
    </li>
  )
}

export default ListItem
