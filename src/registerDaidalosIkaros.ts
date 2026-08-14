import { mythScenes, type MythScene } from './data'
import { mythCharacters, type MythCharacter } from './mythCharacters'
import { sceneCluesTr, sceneDetailsTr } from './sceneCopy'

const scene: MythScene = {
  id: 'daidalos-ikaros',
  title: 'Daidalos and Ikaros',
  eyebrow: 'Cretan Cycle',
  cycle: 'Age of Heroes',
  category: 'heroes',
  location: 'Knossos, Crete',
  coordinates: { lat: 35.2989, lng: 25.1603 },
  accuracyRadiusKm: 35,
  mapConfidence: 'traditional',
  geographyNote: 'The escape belongs to the mythic cycle of Minos and the labyrinth. Knossos is used as the Cretan anchor for the story, not as a claim for an exact historical launch point.',
  pleiadesUrl: 'https://pleiades.stoa.org/places/589872',
  image: './assets/scene-daidalos-ikaros.webp',
  fallback: 'linear-gradient(126deg, #6e7f8f 0%, #c7924a 48%, #1b5f79 100%)',
  prompt: 'Find the feathered wings, softened wax, the labyrinth below, and the brilliant sun pulling one flyer dangerously higher.',
  clues: [
    'A master craftsman builds feathered wings to escape an island ruled by Minos.',
    'The son is warned not to fly too close to the sea or too near the sun.',
    'When the binding material softens in the heat, the reckless flight ends in the sea.',
  ],
  options: ['Daidalos and Ikaros', 'Bellerophon and the Chimera', 'Perseus and Medusa', 'Theseus and the Minotaur'],
  reveal: 'Daidalos fashions wings of feathers and binding material so that he and his son Ikaros can escape Crete by air. Ikaros ignores his father’s warning, climbs too high, and falls when the heat loosens his wings.',
  source: 'Apollodorus — Epitome I.12–13; Ovid — Metamorphoses VIII.183–235',
  sourceNote: 'Ancient sources agree on the escape from Crete and Ikaros’s fatal climb, but the game uses Knossos as a traditional Cretan map anchor rather than a precise launch site.',
  symbol: '☼',
}

if (!mythScenes.some((item) => item.id === scene.id)) mythScenes.push(scene)

sceneCluesTr[scene.id] = [
  'Usta bir zanaatkâr, Minos’un yönettiği adadan kaçmak için tüylerden kanatlar yapar.',
  'Oğlunu denize fazla yaklaşmaması ve güneşe gereğinden çok yükselmemesi konusunda uyarır.',
  'Kanatları bir arada tutan madde sıcakta yumuşayınca gözü kara uçuş denizde son bulur.',
]

sceneDetailsTr[scene.id] = {
  location: 'Knossos, Girit',
  geographyNote: 'Kaçış, Minos ve labirent çevresindeki mitolojik döngüye aittir. Haritadaki Knossos noktası hikâyeyi Girit’e bağlamak için kullanılır; kesin bir tarihsel kalkış noktası iddiası değildir.',
  reveal: 'Daidalos, kendisi ile oğlu Ikaros’un Girit’ten havadan kaçabilmesi için tüylerden kanatlar yapar. Ikaros babasının uyarısını dinlemeyip fazla yükselir; sıcak kanatlarını gevşetince denize düşer.',
  sourceNote: 'Antik kaynaklar Girit’ten kaçış ve Ikaros’un ölümcül yükselişinde birleşir; oyundaki Knossos işareti kesin bir kalkış noktası değil, geleneksel Girit bağlantısıdır.',
}

const extraCharacters: MythCharacter[] = [
  {
    id: 'daidalos',
    name: { en: 'Daidalos', tr: 'Daidalos' },
    aliases: { en: ['Daidalos', 'Daedalus'], tr: ['Daidalos', 'Daedalus'] },
    info: {
      en: 'The legendary master craftsman who designed the labyrinth for Minos. Trapped on Crete, he builds wings for himself and his son Ikaros and warns the boy to keep a middle course.',
      tr: 'Minos için labirenti tasarlayan efsanevi usta zanaatkârdır. Girit’te kapana kısılınca kendisi ile oğlu Ikaros için kanatlar yapar ve oğlunu ölçülü bir rota izlemeye çağırır.',
    },
    facts: [
      { en: 'Craft: architect, inventor and master artisan', tr: 'Ustalığı: mimar, mucit ve zanaatkâr' },
      { en: 'Designed the labyrinth for King Minos', tr: 'Kral Minos için labirenti tasarladı' },
    ],
  },
  {
    id: 'ikaros',
    name: { en: 'Ikaros', tr: 'Ikaros' },
    aliases: { en: ['Ikaros', 'Icarus'], tr: ['Ikaros', 'Icarus'] },
    info: {
      en: 'The son of Daidalos who escapes Crete on artificial wings. Ignoring his father’s warning, he climbs too high and falls into the sea after the wings fail.',
      tr: 'Daidalos’un yapay kanatlarla Girit’ten kaçan oğludur. Babasının uyarısını dinlemeyip fazla yükselir ve kanatları bozulunca denize düşer.',
    },
    facts: [
      { en: 'Father: Daidalos', tr: 'Babası: Daidalos' },
      { en: 'His fall gives the Icarian Sea its mythic name.', tr: 'Düşüşü, mitolojik anlatıda İkaria Denizi’ne adını verir.' },
    ],
  },
]

const mutableCharacters = mythCharacters as MythCharacter[]
for (const character of extraCharacters) {
  if (!mutableCharacters.some((item) => item.id === character.id)) mutableCharacters.push(character)
}
