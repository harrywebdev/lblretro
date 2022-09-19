import FormFieldDescription from "~/components/Form/FormFieldDescription"
import type { FC } from "react"

type FormErrorProps = {
  errorText: string | undefined
  id: string
}

const FormError: FC<FormErrorProps> = ({ errorText, id }) => {
  return errorText ? (
    <FormFieldDescription>
      <p className="text-danger-600" role="alert" id={id}>
        {errorText}
      </p>
    </FormFieldDescription>
  ) : null
}

export default FormError
