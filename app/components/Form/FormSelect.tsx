import type { FC } from "react"
import { ChevronDownIcon } from "@heroicons/react/24/solid"

type Option = {
  value: string
  label: string
}

type FormSelectProps = {
  id: string
  name: string
  defaultValue?: string | number
  required?: boolean
  options: Option[]
}

const FormSelect: FC<FormSelectProps> = (props) => {
  const { id, name, defaultValue, options, ...attrs } = props
  return (
    <span className="relative block mt-1">
      <select
        name={name}
        id={id}
        className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 appearance-none bg-white"
        defaultValue={defaultValue}
        {...attrs}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          )
        })}
      </select>
      <span className="pointer-events-none absolute top-3 right-3 text-sm">
        <ChevronDownIcon className="w-4 h-4" />
      </span>
    </span>
  )
}

export default FormSelect
