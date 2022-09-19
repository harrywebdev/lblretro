export const getFormDataValueAsString = (
  formData: FormData,
  entryName: string,
  defaultValue?: string
): string => {
  const value = formData.get(entryName)

  if (value === null) {
    return typeof defaultValue !== "undefined" ? defaultValue : ""
  }

  return value.toString()
}
