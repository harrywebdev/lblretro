import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import { db } from "~/utils/db.server"

export const loader: LoaderFunction = async () => {
  return redirect("/settings")
}

export const action: ActionFunction = async () => {
  await Promise.all(
    getAreas().map(async (area) => {
      if (await db.area.findFirst({ where: { text: area.text } })) {
        return null
      }
      return db.area.create({ data: area })
    })
  )

  await Promise.all(
    (
      await getQuestions()
    ).map(async (question) => {
      if (await db.question.findFirst({ where: { text: question.text } })) {
        return null
      }

      return db.question.create({ data: question })
    })
  )

  return redirect("/settings")
}

function getAreas() {
  return [
    {
      text: "Doma",
      emoji: "🏡",
      sequence: 100,
    },
    {
      text: "Laska",
      emoji: "❤️",
      sequence: 200,
    },
    {
      text: "Ja",
      emoji: "☯️",
      sequence: 300,
    },
    {
      text: "Prace",
      emoji: "🤖",
      sequence: 400,
    },
    {
      text: "Ostatni",
      emoji: "🍀",
      sequence: 500,
    },
    {
      text: "Jine",
      emoji: "🍉",
      sequence: 600,
    },
  ]
}

async function getAreaByEmoji(emoji: string) {
  return await db.area.findFirstOrThrow({ where: { emoji } })
}

async function getQuestions() {
  return [
    {
      text: "Co jsi udelal pro domacnost?",
      emoji: "🏡",
      sequence: 100,
      areaId: (await getAreaByEmoji("🏡")).id,
    },
    {
      text: "Co jsme delali jako rodina?",
      emoji: "👨‍👩‍👧",
      sequence: 200,
      areaId: (await getAreaByEmoji("🏡")).id,
    },
    {
      text: "Co jsi udelal pro Editu?",
      emoji: "🧚🏻‍♀️",
      sequence: 300,
      areaId: (await getAreaByEmoji("❤️")).id,
    },
    {
      text: "Rande s Editou?",
      emoji: "❤️",
      sequence: 400,
      areaId: (await getAreaByEmoji("❤️")).id,
    },
    {
      text: "Co jsi udelal pro Jonika?",
      emoji: "🤡",
      sequence: 500,
      areaId: (await getAreaByEmoji("🏡")).id,
    },
    {
      text: "Co jsi delal s Jonim?",
      emoji: "👨‍👦",
      sequence: 600,
      areaId: (await getAreaByEmoji("🏡")).id,
    },
    {
      text: "Co jsi udelal pro sebe?",
      emoji: "☯️",
      sequence: 700,
      areaId: (await getAreaByEmoji("☯️")).id,
    },
    {
      text: "Co jsi delal sam?",
      emoji: "🎩",
      sequence: 800,
      areaId: (await getAreaByEmoji("☯️")).id,
    },
    {
      text: "Co jsi udelal v praci?",
      emoji: "🤖",
      sequence: 900,
      areaId: (await getAreaByEmoji("🤖")).id,
    },
    {
      text: "Pomohl jsi nekomu jinymu?",
      emoji: "🍀",
      sequence: 1000,
      areaId: (await getAreaByEmoji("🍀")).id,
    },
    {
      text: "Neco jinyho?",
      emoji: "🍉",
      sequence: 1100,
      areaId: (await getAreaByEmoji("🍉")).id,
    },
  ]
}
