import FormFieldGroup from "~/components/Form/FormFieldGroup"
import FormLabel from "~/components/Form/FormLabel"
import FormField from "~/components/Form/FormField"
import type { ActionFunction, SerializeFrom } from "@remix-run/node"
import { json } from "@remix-run/node"
import { db } from "~/utils/db.server"
import type { FC } from "react"
import type { DailyLog } from "@prisma/client"
import Button from "~/components/Button"
import FormError from "~/components/Form/FormError"
import { getToday } from "~/utils/get-today"
import { parseISO } from "date-fns"
import invariant from "tiny-invariant"
import { getFormDataValueAsString } from "~/utils/get-form-data-value"
import type { Question } from "@prisma/client"
import FormSelect from "~/components/Form/FormSelect"
import FormTextarea from "~/components/Form/FormTextarea"

export type ActionData = {
  fieldErrors?: {
    content?: string
    questionId?: string
  }
  fields?: {
    content?: FormDataEntryValue
    logDate?: FormDataEntryValue
    questionId?: FormDataEntryValue
  }
}

type DailyLogFormProps = {
  formAction: string
  isNew: boolean
  questions: SerializeFrom<Question[]>
  actionData?: SerializeFrom<ActionData>
  dailyLog?: DailyLog
}

const badRequest = (data: ActionData) => json(data, { status: 400 })

const validateContent = (value: any) => {
  return typeof value !== "string" || value.trim().length < 1
    ? `Content is too short`
    : undefined
}

const validateLogDate = (value: any) => {
  return typeof value === "string" && parseISO(value)
    ? undefined
    : "Date is invalid"
}

export const action = (onSuccess: () => unknown) => {
  const dailyLogFormAction: ActionFunction = async ({ request, params }) => {
    const form: FormData = await request.formData()

    // // not supported yet
    // if (form.get("delete") === "yes") {
    //   await db.dailyLog.delete({
    //     where: {
    //       id: params.dailyLogId,
    //     },
    //   })
    //
    //   return onSuccess()
    // }

    const fields = {
      content: getFormDataValueAsString(form, "content"),
      logDate: getFormDataValueAsString(form, "logDate"),
      questionId: getFormDataValueAsString(form, "questionId"),
    }

    let question
    if (fields.questionId) {
      question = await db.question.findUnique({
        where: { id: fields.questionId.toString() },
      })
    }

    const fieldErrors = {
      content: validateContent(fields.content),
      logDate: validateLogDate(fields.logDate),
      questionId: question ? undefined : "Question is invalid",
    }

    if (Object.values(fieldErrors).some(Boolean)) {
      return badRequest({ fieldErrors, fields })
    }

    invariant(question, "Question is required")

    const data = {
      content: fields.content.toString(),
      logDate: new Date(fields.logDate),
      title: question.text,
      questionId: question.id,
    }

    if (!params.dailyLogId) {
      await db.dailyLog.create({ data })
    } else {
      await db.dailyLog.update({
        where: {
          id: params.dailyLogId,
        },
        data,
      })
    }

    return onSuccess()
  }

  return dailyLogFormAction
}

const DailyLogForm: FC<DailyLogFormProps> = ({
  actionData,
  dailyLog,
  isNew,
  formAction,
  questions,
}) => {
  const questionsAsOptions = questions.map((question) => {
    return {
      value: question.id,
      label: `${question.emoji} ${question.text}`,
    }
  })

  return (
    <form method="post" action={formAction}>
      <input
        type="hidden"
        name="logDate"
        value={
          dailyLog?.logDate
            ? dailyLog.logDate.toString()
            : getToday().toString()
        }
      />

      <FormFieldGroup>
        <FormLabel htmlFor="questionId">Entry type</FormLabel>
        <FormField>
          <FormSelect
            id="questionId"
            name="questionId"
            defaultValue={
              typeof actionData?.fields?.questionId === "string"
                ? actionData.fields.questionId
                : dailyLog?.questionId
                ? dailyLog.questionId
                : questionsAsOptions.length > 0
                ? questionsAsOptions[0].value
                : ""
            }
            options={questionsAsOptions}
            aria-invalid={
              Boolean(actionData?.fieldErrors?.questionId) || undefined
            }
            aria-errormessage={
              actionData?.fieldErrors?.questionId
                ? "questionId-error"
                : undefined
            }
            required
          />
        </FormField>
        <FormError
          errorText={actionData?.fieldErrors?.questionId}
          id="questionId-error"
        />
      </FormFieldGroup>

      <FormFieldGroup>
        <FormLabel htmlFor="content">Entry content</FormLabel>
        <FormField>
          <FormTextarea
            id="content"
            name="content"
            placeholder="Your answer"
            defaultValue={
              typeof actionData?.fields?.content === "string"
                ? actionData?.fields?.content
                : dailyLog?.content
            }
            aria-invalid={
              Boolean(actionData?.fieldErrors?.content) || undefined
            }
            aria-errormessage={
              actionData?.fieldErrors?.content ? "content-error" : undefined
            }
            required
          />
        </FormField>
        <FormError
          errorText={actionData?.fieldErrors?.content}
          id="content-error"
        />
      </FormFieldGroup>

      <FormFieldGroup>
        <div className="pb-2 flex justify-center">
          <Button primary type="submit" label={!isNew ? "Update" : "Create"} />
        </div>
      </FormFieldGroup>
    </form>
  )
}

export default DailyLogForm
