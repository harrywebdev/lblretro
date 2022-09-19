import type { FC, ReactNode } from "react"

type ScreenContentProps = {
  children: ReactNode
}

const ScreenContent: FC<ScreenContentProps> = ({ children }) => {
  return <section className="flex-1 py-2">{children}</section>
}

export default ScreenContent
