import { PrismaClient } from "@prisma/client"
import { Prisma } from "@prisma/client"

const db = new PrismaClient()

async function seed() {
  // seed areas
  const areaLove = await createOrUpdateArea({
    data: {
      text: "Love",
      description: "Parents-only time.",
      emoji: "❤️",
      sequence: 100,
      weight: 8,
      isFamily: true,
    },
  })

  const areaPartialFamily = await createOrUpdateArea({
    data: {
      text: "Partial Family",
      description: "Single parent with a child kind of activity.",
      emoji: "👨‍👦",
      sequence: 200,
      weight: 0,
      isFamily: true,
    },
  })

  const areaMeTime = await createOrUpdateArea({
    data: {
      text: "Me-time",
      description: "Time alone or with friends.",
      emoji: "🎩",
      sequence: 300,
      weight: 4,
      parentId: areaPartialFamily.id,
      isFamily: true,
    },
  })

  const areaJonas = await createOrUpdateArea({
    data: {
      text: "Jonas",
      description: "Time with Jonas.",
      emoji: "👶🏻",
      sequence: 400,
      weight: 4,
      parentId: areaPartialFamily.id,
      isFamily: true,
    },
  })

  const areaFamily = await createOrUpdateArea({
    data: {
      text: "Family",
      description: "Whole family together.",
      emoji: "👨‍👩‍👧",
      sequence: 500,
      weight: 4,
      isFamily: true,
    },
  })

  const areaWork = await createOrUpdateArea({
    data: {
      text: "Work",
      description: "Only significant work related things.",
      emoji: "🤖",
      sequence: 600,
      weight: 1,
      isFamily: false,
    },
  })

  const areaHealth = await createOrUpdateArea({
    data: {
      text: "Health",
      description: "Health in mind, body and spirit.",
      emoji: "☯️",
      sequence: 700,
      weight: 2,
      isFamily: false,
    },
  })

  const areaHealthMind = await createOrUpdateArea({
    data: {
      text: "Mind",
      description: "Healthy mind.",
      emoji: "🧠",
      sequence: 800,
      weight: 0,
      isFamily: false,
    },
  })

  const areaHealth = await createOrUpdateArea({
    data: {
      text: "Mind",
      description: "Healthy mind.",
      emoji: "🧠",
      sequence: 800,
      weight: 0,
      isFamily: false,
    },
  })

  // await Promise.all(
  //   getAreas().map(async (area) => {
  //     if (await db.area.findFirst({ where: { text: area.text } })) {
  //       return null
  //     }
  //     return db.area.create({ data: area })
  //   })
  // )
  //
  // await Promise.all(
  //   (
  //     await getQuestions()
  //   ).map(async (question) => {
  //     if (await db.question.findFirst({ where: { text: question.text } })) {
  //       return null
  //     }
  //
  //     return db.question.create({ data: question })
  //   })
  // )
}

async function createOrUpdateArea(areaData: Prisma.AreaCreateArgs) {
  let area = await db.area.findFirst({
    where: { emoji: areaData.data.emoji },
  })

  if (area) {
    area = await db.area.update({
      where: { id: area.id },
      data: {
        ...areaData.data,
      },
    })
  } else {
    area = await db.area.create({ data: areaData.data })
  }

  return area
}

void seed()

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
