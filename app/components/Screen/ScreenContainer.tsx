import type { FC, ReactNode } from "react"

type ScreenContainerProps = {
  children: ReactNode
}
const ScreenContainer: FC<ScreenContainerProps> = ({ children }) => {
  return (
    <div className="max-w-full w-96 pt-safe pb-safe mx-auto antialiased bg-neutral-200 flex flex-col">
      {children}
    </div>
  )
}
export default ScreenContainer
