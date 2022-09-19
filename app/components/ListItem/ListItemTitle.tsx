import type { FC, ReactNode } from "react"

type TodoListItemTitleProps = {
  children: ReactNode
}

const ListItemTitle: FC<TodoListItemTitleProps> = ({ children }) => {
  return (
    <span className="leading-relaxed block font-semibold text-sm">
      {children}
    </span>
  )
}

export default ListItemTitle
