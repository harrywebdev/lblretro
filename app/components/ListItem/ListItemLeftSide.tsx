import type { FC, ReactNode } from "react"

type TodoListItemLeftSideProps = {
  children: ReactNode
}

const ListItemLeftSide: FC<TodoListItemLeftSideProps> = ({ children }) => {
  return <span className="pr-3">{children}</span>
}

export default ListItemLeftSide
