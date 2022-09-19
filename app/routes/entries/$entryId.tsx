import type { ActionFunction } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import { getFormDataValueAsString } from "~/utils/get-form-data-value"
import { db } from "~/utils/db.server"

export const action: ActionFunction = async ({ request, params }) => {
  const form: FormData = await request.formData()

  const redirectTo = getFormDataValueAsString(form, "redirectTo", "/")

  if (form.get("delete") === "yes") {
    await db.dailyLog.delete({
      where: {
        id: params.entryId,
      },
    })

    return redirect(redirectTo)
  }

  // no-op
  return redirect(redirectTo)
}
