import { format, parseISO } from "date-fns"

function formatDate(date: Date) {
  return format(date, "d. M. Y")
}

export function getRetroIntervalTitle(
  startDate: Date | string,
  endDate?: Date | string
) {
  const start = typeof startDate === "string" ? parseISO(startDate) : startDate
  const end =
    typeof endDate === "undefined"
      ? "now"
      : typeof endDate === "string"
      ? parseISO(endDate)
      : endDate

  return `${formatDate(start)}–${end === "now" ? end : formatDate(end)}`
}
