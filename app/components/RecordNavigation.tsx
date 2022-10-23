import type { FC } from "react"
import { Link } from "@remix-run/react"
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid"
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid"

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
          <ArrowLeftCircleIcon className="w-4 h-4" />
        </Link>
      ) : (
        <span className={`text-gray-300 ${linkClassName}`}>
          <ArrowLeftCircleIcon className="w-4 h-4" />
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
          <ArrowRightCircleIcon className="w-4 h-4" />
        </Link>
      ) : (
        <span className={`text-gray-300 ${linkClassName}`}>
          <ArrowRightCircleIcon className="w-4 h-4" />
        </span>
      )}
    </div>
  )
}

export default RecordNavigation
