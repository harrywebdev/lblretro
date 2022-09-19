import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

async function seed() {
  await Promise.all(
    getQuestions().map((question) => {
      return db.question.create({ data: question })
    })
  )
}

void seed()

function getQuestions() {
  return [
    {
      text: "Co jsi udelal pro domacnost?",
      emoji: "🏡",
      sequence: 100,
    },
    {
      text: "Co jsme delali jako rodina?",
      emoji: "👨‍👩‍👧",
      sequence: 200,
    },
    {
      text: "Co jsi udelal pro Editu?",
      emoji: "🧚🏻‍♀️",
      sequence: 300,
    },
    {
      text: "Rande s Editou?",
      emoji: "❤️",
      sequence: 400,
    },
    {
      text: "Co jsi udelal pro Jonika?",
      emoji: "🤡",
      sequence: 500,
    },
    {
      text: "Co jsi delal s Jonim?",
      emoji: "👨‍👦",
      sequence: 600,
    },
    {
      text: "Co jsi udelal pro sebe?",
      emoji: "☯️",
      sequence: 700,
    },
    {
      text: "Co jsi delal sam?",
      emoji: "🎩",
      sequence: 800,
    },
    {
      text: "Co jsi udelal v praci?",
      emoji: "🤖",
      sequence: 900,
    },
    {
      text: "Pomohl jsi nekomu jinymu?",
      emoji: "🍀",
      sequence: 1000,
    },
    {
      text: "Neco jinyho?",
      emoji: "🍉",
      sequence: 1100,
    },
  ]
}
