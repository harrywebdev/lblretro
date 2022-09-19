import type { FC, ReactNode } from "react"

type TodoListItemRightSideProps = {
  children: ReactNode
}

const ListItemRightSide: FC<TodoListItemRightSideProps> = ({ children }) => {
  return <span className="pl-3">{children}</span>
}

export default ListItemRightSide
