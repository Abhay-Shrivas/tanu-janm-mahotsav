/**
 * 12-Day Master Data Architecture for Tanu Janm Mahotsav
 * Edit themes, stories, and placeholders here.
 */
const DAYS = {
  1: {
    day: 1,
    theme: "Where It All Began",
    title: "1 Wish Under the Stars",
    intro: "A quiet, secret prologue where the universe aligns for one silent birthday wish.",
    icon: "🌸",
    location: "Near the Puppy Shelter",
    music: "music/day01.mp3",
    story: "A delicate start known only to two souls. Finding the ribbon-tied note and sealing a wish with the stars.",
    quote: "Some wishes are better when they're kept between you and the universe.",
    photos: ["assets/day01/memory1.jpg"]
  },
  2: {
    day: 2,
    theme: "Our Precious Memories",
    title: "Chai Kappi & Old Dates",
    intro: "Revisiting where we sat as two people figuring each other out.",
    icon: "☕",
    location: "Chai Kappi",
    music: "music/day02.mp3",
    story: "We sat here once figuring each other out... P.S. Meena Chachi still doesn’t know! 😂",
    quote: "Sitting here today with a whole lot more memories.",
    photos: ["assets/day02/photo1.jpg"]
  },
  3: {
    day: 3,
    theme: "What Makes You, You",
    title: "DohDoh's World & Pure Joy",
    intro: "Celebrating the inner child, the creative artist, and DohDoh's favorite human.",
    icon: "🐰",
    location: "Zudio & Home",
    music: "music/day03.mp3",
    story: "Styling sessions, infectious laughter, and that gentle love only DohDoh understands.",
    quote: "A girl whose joy fills every corner of the room.",
    photos: ["assets/day03/photo1.jpg"]
  },
  4: {
    day: 4,
    theme: "Dadiji's Little Lado",
    title: "Carrying Everlasting Love",
    intro: "A tribute to family, roots, and the blessings of Shrimati Lila ji.",
    icon: "🪷",
    location: "Chai Kappi",
    music: "music/day04.mp3",
    story: "The little Lado she once held in her lap grew up, but never stopped carrying that unconditional love.",
    quote: "Blessings that stay forever in your heart.",
    photos: ["assets/day04/photo1.jpg"]
  },
  5: {
    day: 5,
    theme: "5 Experiences I Still Want",
    title: "Arcades, Bowling & Pure Fire",
    intro: "Playful competition, nervous laughs, and an undefeated spirit.",
    icon: "🎳",
    location: "Arcade Arena",
    music: "music/day05.mp3",
    story: "No cheating, total focus, and that radiant smile when you hit the pins.",
    quote: "The experience itself is the greatest keepsake.",
    photos: ["assets/day05/photo1.jpg"]
  },
  6: {
    day: 6,
    theme: "6 Little Ways I Take Care of You",
    title: "30-Day Breakfast Routine",
    intro: "Nourishment for the girl who forgets to eat while chasing her CA dream.",
    icon: "🥣",
    location: "Morning Kitchen",
    music: "music/day06.mp3",
    story: "Overnight oats, wholesome nuts, and a daily reminder to pause and take care of yourself.",
    quote: "For the girl busy building her future.",
    photos: ["assets/day06/photo1.jpg"]
  },
  7: {
    day: 7,
    theme: "7 Rang — Shringar Day",
    title: "Sawan Somvar at ISKCON",
    intro: "Traditional elegance, fresh mogra gajra, and quiet spiritual grace.",
    icon: "🛕",
    location: "ISKCON Temple",
    music: "music/day07.mp3",
    story: "Bindi, chudi, kurti, and peaceful prayers wrapped in auspicious Sawan light.",
    quote: "Seven colors that look prettiest on you.",
    photos: ["assets/day07/photo1.jpg"]
  },
  8: {
    day: 8,
    theme: "Cupcake Care Kit",
    title: "Open-When Envelopes",
    intro: "Comfort for difficult days, late-night study sessions, and moments of doubt.",
    icon: "💌",
    location: "Cozy Room",
    music: "music/day08.mp3",
    story: "A care kit packed with love, Masala Munch, and letters for when you need a gentle reminder.",
    quote: "Warning: Contains one extremely caring companion.",
    photos: ["assets/day08/photo1.jpg"]
  },
  9: {
    day: 9,
    theme: "9 Reasons I'm Proud of You",
    title: "The CA Dream & Unshakable Heart",
    intro: "Quiet resilience, library hours, loyalty to friends, and unconditional empathy.",
    icon: "📚",
    location: "The Library",
    music: "music/day09.mp3",
    story: "Showing up for your goals, defending those you love, and standing tall through setbacks.",
    quote: "You are writing a story worth being proud of.",
    photos: ["assets/day09/photo1.jpg"]
  },
  10: {
    day: 10,
    theme: "Let's Get Lost Together",
    title: "Jam Gate to Maheshwar",
    intro: "A road expedition into history, misty hills, and sunset reflections over the Narmada.",
    icon: "🛵",
    location: "Jam Gate → Maheshwar",
    music: "music/day10.mp3",
    story: "Wind in our hair, winding ghats, deep 10-question talks, and the road pass with compulsory return.",
    quote: "Wherever the road takes us.",
    photos: ["assets/day10/photo1.jpg"]
  },
  11: {
    day: 11,
    theme: "Home Minister Day",
    title: "11:11 Wish & PA Mode",
    intro: "Complete authority over the home: PA on standby, white sauce pasta, and one special wish.",
    icon: "👑",
    location: "The BHK Sanctuary",
    music: "music/day11.mp3",
    story: "“Noted, Ma'am!” Relaxed living, mutual blind drawings, and an authentic 11:11 grant.",
    quote: "Comfortable enough to ask for whatever you desire.",
    photos: ["assets/day11/photo1.jpg"]
  },
  12: {
    day: 12,
    theme: "The Day That Was Always Yours",
    title: "Grand Coronation (20!)",
    intro: "The milestone 20th birthday celebration: candlelit elegance, paper bouquets, and peaceful joy.",
    icon: "🏰",
    location: "Lotus Valley & Grand Evening Date",
    music: "music/day12.mp3",
    story: "Midnight cake, charity meals, stray dog treats, evening dress reveal, and a walk under the golden lights.",
    quote: "The best part? This isn’t the end.",
    photos: ["assets/day12/photo1.jpg"]
  }
};