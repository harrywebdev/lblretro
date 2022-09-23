import type { FC } from "react"
import type { SerializeFrom } from "@remix-run/node"
import type { Area } from "@prisma/client"

type AreaCountProps = {
  area: SerializeFrom<Area>
  count: number
}

const AreaCount: FC<AreaCountProps> = ({ area, count }) => {
  // scale: xl, 2xl, 3xl, 4xl, 5xl
  // verbose code for tailwind content configuration (purging)

  // max size by default = ceiling
  let textSizeClassName = "text-6xl"
  switch (count) {
    case 0:
    case 1:
      textSizeClassName = "text-2xl"
      break
    case 2:
      textSizeClassName = "text-3xl"
      break
    case 3:
      textSizeClassName = "text-4xl"
      break
    case 4:
      textSizeClassName = "text-5xl"
      break
  }

  // HACK: we don't care so much about balance of notes and other things,
  // so let's override the watermelon one
  if (area.emoji === "🍉") {
    textSizeClassName = "text-2xl"
  }

  let emojiClassName = `${textSizeClassName} h-16 flex items-center`
  if (count === 0) {
    emojiClassName += " grayscale"
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <div className={emojiClassName}>{area.emoji}</div>
      <div className="text-sm text-neutral-400">{count}</div>
    </div>
  )
}

export default AreaCount
