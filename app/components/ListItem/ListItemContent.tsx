import type { FC, ReactNode } from "react"

type TodoListItemContentProps = {
  children: ReactNode
}

const ListItemContent: FC<TodoListItemContentProps> = ({ children }) => {
  return <span className="flex-auto">{children}</span>
}

export default ListItemContent
