export const getFormDataValueAsString = (
  formData: FormData,
  entryName: string
): string => {
  const value = formData.get(entryName)

  if (value === null) {
    return ""
  }

  return value.toString()
}
