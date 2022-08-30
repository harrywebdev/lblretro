import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

async function seed() {
  await Promise.all(
    getQuestions().map((question) => {
      return db.question.create({ data: question })
    })
  )

  await Promise.all(
    await getDailyLogs().map((dailyLog) => {
      return db.dailyLog.create({ data: dailyLog })
    })
  )
}

seed()

function getQuestions() {
  return [
    {
      text: "🏡 Co jsi udelal pro domacnost?",
    },
    {
      text: "👨‍👩‍👧 Co jsme delali jako rodina?",
    },
    {
      text: "🧚🏻‍♀️ Co jsi udelal pro Editu?",
    },
    {
      text: "❤️ Rande s Editou?",
    },
    {
      text: "🤡 Co jsi udelal pro Jonika?",
    },
    {
      text: "👨‍👦 Co jsi delal s Jonim?",
    },
    {
      text: "☯️ Co jsi udelal pro sebe?",
    },
    {
      text: "🎩 Co jsi delal sam?",
    },
    {
      text: "🍀 Pomohl jsi nekomu jinymu?",
    },
    {
      text: "🍉 Neco jinyho?",
    }
  ]
}

async function getDailyLogs() {
  // get today's log or create new one
  const today = new Date()

  // querying by datetime, let's normalize and use the date part only
  today.setUTCHours(0)
  today.setUTCMinutes(0)
  today.setUTCSeconds(0)
  today.setUTCMilliseconds(0)

  const questions = await db.question.findMany()

  return [
    {
      logDate: today,
      content: "Vycistil si zbran",
      title: questions[6].text,
      questionId: questions[6].id,
    },
    {
      logDate: today,
      content: "Dokoukal taktickej kurz od HT",
      title: questions[6].text,
      questionId: questions[6].id,
    },
    {
      logDate: today,
      content: "Posedel s Joni v bagru pred barakem",
      title: questions[5].text,
      questionId: questions[5].id,
    },
  ]
}
