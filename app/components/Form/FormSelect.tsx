import type { FC } from "react"

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
    <select
      name={name}
      id={id}
      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2"
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
  )
}

export default FormSelect
