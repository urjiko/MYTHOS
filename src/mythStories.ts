import type { MythScene } from './data'
import type { Locale } from './i18n'
import { localiseSceneClues, localiseScenePresentation } from './sceneCopy'

type LocalisedStory = Record<Locale, string>

// Most canonical reveals already contain two compact story sentences. These
// overrides remove source criticism, archaeology and map commentary from the
// handful that mixed learning metadata into the post-round narrative.
const storyOpeningOverrides: Partial<Record<string, LocalisedStory>> = {
  labyrinth: {
    en: 'Theseus enters the labyrinth to confront the Minotaur, the bull-headed being hidden there by King Minos. Ariadne gives him a thread so he can retrace his path after surviving the encounter.',
    tr: 'Theseus, Kral Minos’un sakladığı boğa başlı Minotauros’la yüzleşmek için labirente girer. Ariadne ona, karşılaşmadan sağ çıktıktan sonra yolunu yeniden bulabilmesi için bir ip verir.',
  },
  medusa: {
    en: 'Perseus approaches Medusa without meeting the mortal Gorgon’s petrifying gaze. He watches her reflection in Athena’s polished shield and strikes with the curved blade given by Hermes.',
    tr: 'Perseus, ölümlü Gorgon Medusa’nın taşa çeviren bakışına yakalanmadan ona yaklaşır. Athena’nın parlak kalkanındaki yansımayı izler ve Hermes’in verdiği kıvrık kılıçla saldırır.',
  },
  'trojan-horse': {
    en: 'The Achaeans pretend to abandon Troy and leave an immense wooden horse on the shore. Hidden warriors emerge after dark, open the city gates and bring the long siege to its fatal end.',
    tr: 'Akhalar Troya’yı terk etmiş gibi davranır ve kıyıda dev bir tahta at bırakır. Saklanan savaşçılar gece dışarı çıkar, kent kapılarını açar ve uzun kuşatmayı ölümcül sonuna götürür.',
  },
  'apollo-python': {
    en: 'Apollo reaches Delphi while seeking a sanctuary where mortals can receive his prophecies. He defeats Python, the great serpent guarding the place, and makes the sanctuary his oracle.',
    tr: 'Apollon, ölümlülerin kehanetlerini alabileceği bir kutsal alan ararken Delphoi’ya ulaşır. Burayı koruyan büyük yılan Python’u yenerek kutsal alanı kendi kehanet merkezine dönüştürür.',
  },
  'scylla-charybdis': {
    en: 'Circe warns Odysseus that no course can carry the whole crew safely past both sea dangers. He steers closer to Scylla because Charybdis could swallow the ship and everyone aboard.',
    tr: 'Kirke, Odysseus’u iki deniz tehlikesini de hiçbir kayıp vermeden geçemeyeceği konusunda uyarır. Kharybdis bütün gemiyi yutabileceği için Odysseus rotasını Skylla’ya daha yakın tutar.',
  },
  'pegasus-birth': {
    en: 'When Perseus defeats Medusa, Pegasus and Chrysaor spring from the Gorgon together. The immortal winged horse rises to Olympus and later becomes inseparable from Bellerophon’s adventures.',
    tr: 'Perseus Medusa’yı yendiğinde Pegasus ile Khrysaor Gorgon’dan birlikte doğar. Ölümsüz kanatlı at Olympos’a yükselir ve daha sonra Bellerophon’un maceralarından ayrılmaz olur.',
  },
  chimera: {
    en: 'King Iobates sends Bellerophon against the Chimera in a mission meant to kill him. Riding Pegasus above the fire-breathing beast, the hero attacks beyond the reach of its lion, goat and serpent body.',
    tr: 'Kral Iobates, ölmesi için Bellerophon’u Khimaira’nın karşısına gönderir. Kahraman Pegasus’la ateş püskürten canavarın üzerine yükselir ve aslan, keçi ile yılan parçalarının erişemediği yerden saldırır.',
  },
  'iphigenia-aulis': {
    en: 'The Achaean fleet cannot sail from Aulis because Artemis withholds the wind. Agamemnon summons his daughter Iphigenia under the pretence of marriage, but the goddess replaces her with a deer and carries her away.',
    tr: 'Artemis rüzgârı kestiği için Akha donanması Aulis’ten ayrılamaz. Agamemnon kızı Iphigeneia’yı evlilik bahanesiyle çağırır; fakat tanrıça onun yerine bir geyik bırakıp genç kızı uzaklaştırır.',
  },
  'priam-achilles': {
    en: 'Priam enters the enemy camp and asks Achilles to remember his own ageing father. Their shared grief softens Achilles, who accepts the ransom and returns Hector’s body for burial.',
    tr: 'Priamos düşman kampına girer ve Akhilleus’tan yaşlanan kendi babasını hatırlamasını ister. Ortak yasları Akhilleus’u yumuşatır; fidyeyi kabul eder ve Hektor’un bedenini cenaze için geri verir.',
  },
  'orpheus-eurydice': {
    en: 'Orpheus descends among the dead and moves its rulers with music until they release Eurydice. He must not look back before both reach daylight, but doubt overcomes him at the final threshold.',
    tr: 'Orpheus ölüler ülkesine iner ve müziğiyle hükümdarlarını etkileyerek Eurydike’nin bırakılmasını sağlar. İkisi de gün ışığına ulaşana kadar arkasına bakmamalıdır; fakat son eşikte kuşkuya yenilir.',
  },
  'apollo-marsyas': {
    en: 'Marsyas challenges Apollo to a musical contest, setting his double aulos against the god’s kithara. Apollo wins, and the satyr’s pride brings a cruel punishment after the music ends.',
    tr: 'Marsyas, çift aulosunu tanrının kitharasına karşı çıkararak Apollon’a bir müzik yarışmasında meydan okur. Apollon kazanır ve satyrin gururu müzik bittikten sonra acımasız bir cezaya dönüşür.',
  },
  'niobe-sipylus': {
    en: 'Niobe boasts that her many children make her greater than Leto, mother of only two. Apollo and Artemis kill Niobe’s children, and Zeus turns the grieving mother into a stone that continues to weep.',
    tr: 'Niobe çok sayıdaki çocuğunun onu yalnızca iki çocuk annesi Leto’dan üstün yaptığını söyler. Apollon ile Artemis Niobe’nin çocuklarını öldürür; Zeus da yaslı anneyi gözyaşları dinmeyen bir taşa dönüştürür.',
  },
  'selene-endymion': {
    en: 'Selene, the Moon goddess, falls in love with the beautiful mortal Endymion. He remains forever young in an unending sleep, and Selene visits him in his mountain cave.',
    tr: 'Ay tanrıçası Selene, güzel ölümlü Endymion’a âşık olur. Endymion sonsuz bir uykuda hep genç kalır; Selene de onu dağdaki mağarasında ziyaret eder.',
  },
  'arachne-athena': {
    en: 'Arachne claims that no goddess can surpass her skill at weaving, so Athena comes to test her. Her flawless tapestry angers Athena, and the young weaver becomes a spider condemned to weave without end.',
    tr: 'Arakhne hiçbir tanrıçanın dokuma ustalığında kendisini geçemeyeceğini söyleyince Athena onu sınamaya gelir. Kusursuz dokuması Athena’yı öfkelendirir ve genç dokumacı sonsuza dek ağ örmek üzere örümceğe dönüşür.',
  },
  'salmacis-hermaphroditus': {
    en: 'The spring nymph Salmacis desires Hermaphroditus, the child of Hermes and Aphrodite, when he enters her water. She asks that they never be separated, and their two bodies are joined into one form.',
    tr: 'Pınar nymphesi Salmakis, Hermes ile Aphrodite’nin çocuğu Hermaphroditos’u suyuna girdiğinde arzular. Bir daha ayrılmamalarını diler ve ikisinin bedeni tek bir biçimde birleşir.',
  },
  'hero-leander': {
    en: 'Leander swims across the Hellespont each night toward the lamp lit by Hero in Sestos. A winter storm extinguishes the light, leaving him without a guide in the dark current and ending both lovers’ lives.',
    tr: 'Leandros her gece Hellespontos’u yüzerek Sestos’ta Hero’nun yaktığı kandile ilerler. Bir kış fırtınası ışığı söndürür; karanlık akıntıda yönünü kaybeden Leandros’un ölümü iki sevgilinin de yaşamını sona erdirir.',
  },
  'hippolyta-girdle': {
    en: 'Heracles reaches the Amazons to obtain the war belt that Ares gave their queen Hippolyta. She receives him without hostility and agrees to surrender it willingly.',
    tr: 'Herakles, Ares’in Amazon kraliçesi Hippolyta’ya verdiği savaş kuşağını almak için Amazonlara ulaşır. Hippolyta onu düşmanca karşılamaz ve kuşağı gönüllü vermeyi kabul eder.',
  },
  'attis-great-mother': {
    en: 'Attis comes to Pessinus to marry a king’s daughter, but Agdistis appears and casts the celebration into divine madness. The young man dies beneath a pine, and the Great Mother ensures that his body and memory do not decay.',
    tr: 'Attis bir kral kızıyla evlenmek için Pessinus’a gelir; fakat Agdistis belirip kutlamayı tanrısal bir çılgınlığa sürükler. Genç adam bir çamın altında ölür ve Büyük Ana onun bedeninin ve anısının çürümemesini sağlar.',
  },
  'io-flight': {
    en: 'Hera sends a gadfly that drives Io across country after country in the form of a horned cow. Io crosses the strait between Europe and Asia and continues the long flight that will eventually carry her to Egypt.',
    tr: 'Hera’nın gönderdiği at sineği, boynuzlu bir inek biçimindeki İo’yu ülkeden ülkeye sürer. İo Avrupa ile Asya arasındaki boğazı geçer ve sonunda Mısır’a varacak uzun kaçışını sürdürür.',
  },
}

const narrativeClueOverrides: Partial<Record<string, LocalisedStory[]>> = {
  'pegasus-birth': [
    {
      en: 'The white winged horse and the warrior Chrysaor emerge at the same instant.',
      tr: 'Beyaz kanatlı at ile savaşçı Khrysaor aynı anda ortaya çıkar.',
    },
    {
      en: 'Pegasus receives a name associated with the springs of Oceanus.',
      tr: 'Pegasus’un adı Okeanos’un pınarlarıyla ilişkilendirilir.',
    },
    {
      en: 'On Olympus he carries thunder and lightning for Zeus.',
      tr: 'Olympos’ta Zeus için gök gürültüsü ile yıldırımı taşır.',
    },
  ],
  chimera: [
    {
      en: 'The monster joins a lion, a goat rising from its back and a serpent for a tail.',
      tr: 'Canavar aslanı, sırtından yükselen keçiyi ve kuyruk yerine bir yılanı birleştirir.',
    },
    {
      en: 'King Iobates expects the impossible mission in Lycia to destroy Bellerophon.',
      tr: 'Kral Iobates, Lykia’daki imkânsız görevin Bellerophon’u yok etmesini bekler.',
    },
    {
      en: 'Pegasus lets the hero stay above the flames and strike from the air.',
      tr: 'Pegasus kahramanın alevlerin üzerinde kalıp havadan saldırmasını sağlar.',
    },
  ],
  'iphigenia-aulis': [
    {
      en: 'The entire Achaean fleet waits in harbour without a wind to carry it to Troy.',
      tr: 'Akha donanmasının tamamı kendisini Troya’ya götürecek rüzgâr olmadan limanda bekler.',
    },
    {
      en: 'Agamemnon brings his daughter to camp by promising a marriage to Achilles.',
      tr: 'Agamemnon kızını Akhilleus’la evlilik vaat ederek kampa getirir.',
    },
    {
      en: 'At the altar Artemis carries Iphigenia away and leaves a deer in her place.',
      tr: 'Artemis sunakta Iphigeneia’yı uzaklaştırır ve onun yerine bir geyik bırakır.',
    },
  ],
  'apollo-marsyas': [
    {
      en: 'Marsyas plays the double aulos once discarded by Athena.',
      tr: 'Marsyas, Athena’nın bir zamanlar bıraktığı çift aulosu çalar.',
    },
    {
      en: 'His opponent is the god of the lyre, music, prophecy and the Delphic bow.',
      tr: 'Rakibi lir, müzik, kehanet ve Delphoi yayının tanrısıdır.',
    },
    {
      en: 'The challenge ends with Apollo’s victory and a punishment meant to warn against reckless pride.',
      tr: 'Meydan okuma Apollon’un zaferi ve ölçüsüz gurura karşı uyarı olan bir cezayla sona erer.',
    },
  ],
  'niobe-sipylus': [
    {
      en: 'The queen boasts that her many children make her more fortunate than Leto.',
      tr: 'Kraliçe çok sayıdaki çocuğunun onu Leto’dan daha talihli yaptığını söyler.',
    },
    {
      en: 'Apollo and Artemis answer the insult with their arrows.',
      tr: 'Apollon ile Artemis bu hakarete oklarıyla karşılık verir.',
    },
    {
      en: 'After the catastrophe, the mother becomes a stone that continues to shed tears.',
      tr: 'Felaketten sonra anne, gözyaşı dökmeyi sürdüren bir taşa dönüşür.',
    },
  ],
  'selene-endymion': [
    {
      en: 'The personified Moon loves an exceptionally beautiful mortal.',
      tr: 'Ay’ın kişileşmiş tanrıçası olağanüstü güzellikteki bir ölümlüyü sever.',
    },
    {
      en: 'Endymion chooses an immortal, ageless existence in perpetual sleep.',
      tr: 'Endymion sürekli uykuda ölümsüz ve yaşlanmayan bir varoluşu seçer.',
    },
    {
      en: 'His cave becomes the secret meeting place of the sleeping youth and the Moon.',
      tr: 'Mağarası uyuyan genç ile Ay’ın gizli buluşma yerine dönüşür.',
    },
  ],
  'io-flight': [
    {
      en: 'A gadfly sent by Hera drives an Argive priestess from land to land.',
      tr: 'Hera’nın gönderdiği at sineği Argoslu bir rahibeyi ülkeden ülkeye sürükler.',
    },
    {
      en: 'The horned wanderer crosses the narrow water separating Europe and Asia.',
      tr: 'Boynuzlu gezgin Avrupa ile Asya’yı ayıran dar sudan geçer.',
    },
    {
      en: 'Her wandering continues until she regains human form far from Argos.',
      tr: 'Yolculuğu, Argos’tan çok uzakta insan biçimine yeniden kavuşana kadar sürer.',
    },
  ],
}

export function splitStorySentences(text: string): string[] {
  return text
    .trim()
    .split(/(?<=[.!?])\s+/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
}

export function localiseMythStory(scene: MythScene, locale: Locale): string {
  const opening = storyOpeningOverrides[scene.id]?.[locale]
    ?? localiseScenePresentation(scene, locale).reveal
  const openingSentences = splitStorySentences(opening).slice(0, 2)
  const clues = narrativeClueOverrides[scene.id]?.map((clue) => clue[locale])
    ?? [...localiseSceneClues(scene, locale)]

  return [...openingSentences, ...clues].slice(0, 5).join(' ')
}
