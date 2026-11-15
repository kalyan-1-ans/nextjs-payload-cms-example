import type { Payload } from 'payload'

const pasta = {
  title: 'Your next weeknight tomato pasta',
  slug: 'your-next-weeknight-tomato-pasta',
  meal: 'dinner',
  minutes: 20,
  serves: 2,
  sortOrder: 1,
  excerpt:
    'A handful of ingredients, a little patience, and a sauce that tastes like you spent all afternoon on it.',
  summary:
    'For the evenings when you want something really good, without making a project of dinner.',
  why: 'It’s comforting, inexpensive, and mostly made from things you probably already have. The trick is letting the tomatoes cook down before the pasta goes in.',
  ingredients: `200 g pasta · 400 g canned tomatoes · 2 garlic cloves
2 tbsp olive oil · A handful of basil · Parmesan · Salt`,
  method:
    'Gently cook the sliced garlic in olive oil. Add the tomatoes and a pinch of salt, then simmer for 15 minutes. Cook the pasta until just shy of done and save a mug of its cooking water. Toss everything together, loosening the sauce with a splash of that water.',
  tip: 'Finish with torn basil and plenty of Parmesan. A little chili is always a good idea.',
} as const

const sandwich = {
  title: 'A very good chickpea sandwich',
  slug: 'a-very-good-chickpea-sandwich',
  meal: 'lunch',
  minutes: 15,
  serves: 2,
  sortOrder: 2,
  excerpt:
    'Crispy chickpeas, lemony yogurt, and something crunchy. An easy lunch that earns a spot in your rotation.',
  summary: 'Crunchy, creamy, a little tangy. Everything a quick lunch should be.',
  why: 'Chickpeas turn a few cupboard staples into a satisfying lunch. A hot pan gives them crisp edges, while lemony yogurt keeps every bite fresh.',
  ingredients: `400 g canned chickpeas, drained · 4 slices of bread
4 tbsp yogurt · ½ lemon · Cucumber · Smoked paprika · Olive oil`,
  method:
    'Pat the chickpeas dry, then fry in a little olive oil for 8–10 minutes. Add smoked paprika and salt. Stir lemon juice into the yogurt. Toast the bread, spread with the yogurt, and pile on the chickpeas and thinly sliced cucumber.',
  tip: 'Add a handful of fresh herbs or your favorite hot sauce. Eat straight away, while the toast is still crunchy.',
} as const

const dal = {
  title: 'A weeknight bowl of dal',
  slug: 'a-weeknight-bowl-of-dal',
  meal: 'dinner',
  minutes: 30,
  serves: 2,
  sortOrder: 3,
  excerpt: 'Red lentils, ginger, and a spoon of butter. A quiet Indian dinner that reheats well tomorrow.',
  summary: 'For the nights when you want something warm, and the pot can do most of the work.',
  why: 'Dal is inexpensive, filling, and hard to get wrong. A little ginger and turmeric do more than a long ingredient list.',
  ingredients: `200 g red lentils · 1 small onion · 2 garlic cloves
1 thumb ginger · 1 tsp ground turmeric · 1 tsp cumin seeds · Butter or ghee · Salt`,
  method:
    'Rinse the lentils and simmer them with the onion, turmeric, and salt until soft, about 20 minutes. In a small pan, warm the butter with cumin seeds, sliced garlic, and ginger until they smell sweet. Stir that into the dal and loosen it with a splash of water.',
  tip: 'Finish with lemon and a handful of cilantro. Eat it with rice, or with toast if that’s what’s around.',
} as const

const noodles = {
  title: 'Garlic ginger noodles',
  slug: 'garlic-ginger-noodles',
  meal: 'lunch',
  minutes: 15,
  serves: 2,
  sortOrder: 4,
  excerpt: 'Noodles, garlic, ginger, and soy. A hot Chinese lunch from the pantry.',
  summary: 'Salty, warm, and ready before you have time to overthink it.',
  why: 'A few pantry bottles turn plain noodles into lunch. The ginger keeps it bright, so it doesn’t taste flat.',
  ingredients: `200 g dried wheat noodles · 3 garlic cloves · 1 thumb ginger
2 tbsp soy sauce · 1 tsp sesame oil · 2 scallions · Neutral oil`,
  method:
    'Boil the noodles until just tender. While they cook, warm the oil with sliced garlic and ginger until fragrant, not brown. Toss the drained noodles with the soy sauce, sesame oil, and the garlic-ginger oil. Scatter the scallions on top.',
  tip: 'Add a fried egg if you want it more filling. A pinch of chili oil is welcome, not required.',
} as const

const recommendations = [pasta, sandwich, dal, noodles]

export async function seedContent(payload: Payload) {
  const docs: { id: number; title: string }[] = []
  let createdAny = false

  for (const recommendation of recommendations) {
    const found = await payload.find({
      collection: 'recommendations',
      limit: 1,
      where: {
        slug: {
          equals: recommendation.slug,
        },
      },
    })

    const existing = found.docs[0]

    if (existing) {
      docs.push(existing)
      continue
    }

    docs.push(
      await payload.create({
        collection: 'recommendations',
        data: recommendation,
      }),
    )
    createdAny = true
  }

  if (createdAny) {
    for (let index = 0; index < docs.length; index++) {
      const current = docs[index]
      const next = docs[(index + 1) % docs.length]

      await payload.update({
        collection: 'recommendations',
        id: current.id,
        data: {
          title: current.title,
          upNext: next.id,
        },
      })
    }
  }

  const home = await payload.findGlobal({ slug: 'home' })

  if (!home.headline) {
    await payload.updateGlobal({
      slug: 'home',
      data: {
        eyebrow: 'GOOD FOOD. NO FUSS.',
        headline: 'A few good things to eat.',
        intro:
          'Simple recommendations for everyday cravings. Nothing fancy. Just food worth making.',
      },
    })
  }

  const about = await payload.findGlobal({ slug: 'about' })
  const aboutStillMentionsTwo =
    about.sections?.some((section) => section.body?.includes('two recommendations')) ?? false

  if (!about.headline || aboutStillMentionsTwo) {
    await payload.updateGlobal({
      slug: 'about',
      data: {
        eyebrow: 'ABOUT SMALL BITES',
        headline: 'Good food. A little less overthinking.',
        intro:
          'A small collection of things worth eating, for people who just want a good meal.',
        sections: [
          {
            heading: 'Nothing fancy. That’s the idea.',
            body: 'Small bites is about everyday food: a reliable bowl of pasta, a better lunch, and simple ingredients that work well together. Short recommendations, a few useful tips, and no long stories before the good part.',
          },
          {
            heading: 'A small blog, on purpose.',
            body: 'This is a demo blog with a home page, four recommendations, and an about page. No accounts, comments, search, or live updates.',
          },
        ],
      },
    })
  }
}
