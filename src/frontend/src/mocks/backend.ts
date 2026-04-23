import type { backendInterface } from "../backend";

const sampleSloka = {
  chapterNumber: BigInt(2),
  slokaNumber: BigInt(47),
  sanskritText: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
  transliteration: "karmaṇy-evādhikāras te mā phaleṣhu kadāchana, mā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi",
  meanings: {
    english: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
    hindi: "तुम्हारा कर्म करने में ही अधिकार है, फल में नहीं। कर्म के फल की इच्छा मत करो और अकर्मण्यता से भी मत चिपको।",
    telugu: "నీకు కేవలం కర్మ చేయుటలోనే హక్కు ఉన్నది, దాని ఫలాలపై కాదు. కర్మ ఫలాలకు కారణం నీవు కాదు అని తెలుసుకో.",
    sanskrit: "कर्मण्येव ते अधिकारः, न फलेषु। कदाचन अपि कर्मफलस्य हेतुः मा भूः।"
  },
  explanation: "This is one of the most celebrated verses in the Bhagavad Gita. Lord Krishna instructs Arjuna to focus on action without attachment to results. This teaching forms the foundation of Karma Yoga."
};

const sampleChapters = [
  {
    chapterNumber: BigInt(1),
    englishName: "Arjuna's Dilemma",
    sanskritName: "अर्जुन विषाद योग",
    totalSlokas: BigInt(47),
    summary: "Arjuna surveys the battlefield and is overwhelmed by grief and confusion at the prospect of fighting his own kinsmen. He turns to Krishna for guidance."
  },
  {
    chapterNumber: BigInt(2),
    englishName: "The Yoga of Knowledge",
    sanskritName: "सांख्य योग",
    totalSlokas: BigInt(72),
    summary: "Krishna begins his teachings to Arjuna, explaining the immortality of the soul, the importance of duty, and introduces the concept of Yoga."
  },
  {
    chapterNumber: BigInt(3),
    englishName: "Karma Yoga",
    sanskritName: "कर्म योग",
    totalSlokas: BigInt(43),
    summary: "Krishna explains the path of selfless action (Karma Yoga), emphasizing that one must perform their duties without attachment to the fruits of action."
  },
  {
    chapterNumber: BigInt(4),
    englishName: "The Yoga of Divine Knowledge",
    sanskritName: "ज्ञान कर्म संन्यास योग",
    totalSlokas: BigInt(42),
    summary: "Krishna reveals his divine nature and the concept of avatars, explaining how he incarnates to restore righteousness whenever it declines."
  },
  {
    chapterNumber: BigInt(5),
    englishName: "Karma Sannyasa Yoga",
    sanskritName: "कर्म संन्यास योग",
    totalSlokas: BigInt(29),
    summary: "Krishna discusses the path of renunciation of action and the path of action in devotion, concluding that both paths lead to liberation."
  },
  {
    chapterNumber: BigInt(6),
    englishName: "Dhyana Yoga",
    sanskritName: "आत्मसंयम योग",
    totalSlokas: BigInt(47),
    summary: "Krishna describes the practice of meditation and the path of self-discipline, explaining how to control the mind and achieve inner peace."
  }
];

export const mockBackend: backendInterface = {
  getChapters: async () => sampleChapters,

  getChapter: async (chapterNumber: bigint) => {
    return sampleChapters.find(c => c.chapterNumber === chapterNumber) || null;
  },

  getChapterSlokas: async (_chapterNumber: bigint) => [sampleSloka],

  getDailySloka: async () => sampleSloka,

  getSloka: async (_chapterNumber: bigint, _slokaNumber: bigint) => sampleSloka,

  searchSlokas: async (_keyword: string, page: bigint, pageSize: bigint) => ({
    page,
    pageSize,
    totalCount: BigInt(1),
    items: [sampleSloka]
  })
};
