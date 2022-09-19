import type { FC, ReactNode } from "react"
import ScreenTitle from "~/components/Screen/ScreenTitle"

type ScreenHeaderProps = {
  leftAction?: ReactNode
  title?: string
  largeTitle?: ReactNode
  rightAction?: ReactNode
}

const ScreenHeader: FC<ScreenHeaderProps> = ({
  leftAction,
  rightAction,
  title,
  largeTitle,
}) => {
  const className = `
    max-w-full w-96 mx-auto
    px-4 py-2
    bg-neutral-800 text-white
  `
  return (
    <header className="sticky top-0 left-0 w-full">
      <div className={className}>
        <div className="flex items-center justify-between">
          <div className="flex-none w-20">{leftAction}</div>
          <ScreenTitle className="flex-auto">{title}</ScreenTitle>
          <div className="flex-none w-20 flex justify-end">{rightAction}</div>
        </div>
        {largeTitle && (
          <h1 className="text-2xl font-bold mt-4">{largeTitle}</h1>
        )}
      </div>
    </header>
  )
}

export default ScreenHeader
