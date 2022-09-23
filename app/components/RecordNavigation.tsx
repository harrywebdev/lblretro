import type { FC } from "react"
import { Link } from "@remix-run/react"
import ArrowLeftCircle from "~/components/Icon/ArrowLeftCircle"
import ArrowRightCircle from "~/components/Icon/ArrowRightCircle"

type LinkProps = {
  to: string
  title: string
}

type RecordNavigationProps = {
  leftLink?: LinkProps
  rightLink?: LinkProps
  title: string
}

const RecordNavigation: FC<RecordNavigationProps> = ({
  leftLink,
  rightLink,
  title,
}) => {
  const linkClassName = "p-2 flex items-center justify-center"

  return (
    <div className="flex items-center justify-between p-2 shadow bg-white border-b border-gray-300 -mx-3 -mt-3 mb-3">
      {leftLink ? (
        <Link
          to={leftLink.to}
          title={leftLink.title}
          aria-label={leftLink.title}
          className={`text-secondary-500 ${linkClassName}`}
        >
          <ArrowLeftCircle />
        </Link>
      ) : (
        <span className={`text-gray-300 ${linkClassName}`}>
          <ArrowLeftCircle />
        </span>
      )}

      <h3
        className={
          "flex-auto text-md font-semibold leading-relaxed whitespace-nowrap text-center"
        }
      >
        {title}
      </h3>

      {rightLink ? (
        <Link
          to={rightLink.to}
          title={rightLink.title}
          aria-label={rightLink.title}
          className={`text-secondary-500 ${linkClassName}`}
        >
          <ArrowRightCircle />
        </Link>
      ) : (
        <span className={`text-gray-300 ${linkClassName}`}>
          <ArrowRightCircle />
        </span>
      )}
    </div>
  )
}

export default RecordNavigation
