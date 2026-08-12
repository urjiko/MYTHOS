import { catalogSummary, collections } from './catalogSummary'
import { mythScenes, type MythScene } from './data'
import { mythCharacters, type MythCharacter } from './mythCharacters'
import { sceneCluesTr, sceneDetailsTr } from './sceneCopy'

const scenes: MythScene[] = [
  {
    id: 'pandora-jar',
    title: 'Pandora',
    eyebrow: 'Age of the Gods',
    cycle: 'Olympian Order',
    category: 'gods',
    location: 'Mount Olympus, mythic divine anchor',
    coordinates: { lat: 40.0856, lng: 22.3586 },
    accuracyRadiusKm: 120,
    mapConfidence: 'mythic',
    geographyNote: 'Hesiod does not give the jar-opening episode a secure terrestrial location. Olympus is used as a mythic anchor for the gods who fashion and equip Pandora, not as a claim that the jar was opened on the mountain.',
    pleiadesUrl: 'https://pleiades.stoa.org/places/491677',
    image: './assets/scene-pandora-jar.webp',
    fallback: 'linear-gradient(126deg, #251d21 0%, #6a4939 46%, #d69d58 100%)',
    prompt: 'Find the enormous pithos, the divine gifts, the dark afflictions escaping into the world, and the small light that remains behind.',
    clues: [
      'A woman fashioned and adorned by the gods lifts the lid of a great storage jar.',
      'Afflictions spread into mortal life, while one bright presence remains associated with the vessel.',
      'The Greek poem speaks of a pithos, a huge storage jar; the famous “box” belongs to a much later retelling tradition.',
    ],
    options: ['Pandora', 'Psyche’s Trials', 'Demeter and Metaneira', 'Arachne and Athena'],
    reveal: 'Zeus sends Pandora to Epimetheus as part of his answer to Prometheus and the theft of fire. When Pandora opens the great pithos, evils and hardships escape into human life; Elpis, usually translated as Hope, remains with the jar.',
    source: 'Hesiod — Works and Days 47–105',
    sourceNote: 'Hesiod calls the vessel a pithos, a large storage jar. The familiar “Pandora’s box” comes from a later translation tradition rather than the Greek text.',
    symbol: '⚱',
  },
  {
    id: 'sisyphus-stone',
    title: 'Sisyphus',
    eyebrow: 'Corinthian Cycle',
    cycle: 'Age of Heroes',
    category: 'heroes',
    location: 'Corinth / Ephyra',
    coordinates: { lat: 37.906, lng: 22.879 },
    accuracyRadiusKm: 70,
    mapConfidence: 'traditional',
    geographyNote: 'The punishment itself takes place among the dead and has no terrestrial coordinate. Corinth, ancient Ephyra and the kingdom attached to Sisyphus, is used as the mortal-world map anchor.',
    pleiadesUrl: 'https://pleiades.stoa.org/places/570182',
    image: './assets/scene-sisyphus.webp',
    fallback: 'linear-gradient(126deg, #161517 0%, #4a3a32 47%, #8c5b36 100%)',
    prompt: 'Find the king straining uphill, the impossible boulder at the crest, the road worn by repetition, and the shades of the dead below.',
    clues: [
      'A cunning king is condemned to repeat one useless task in the world of the dead.',
      'He must force an immense stone toward the summit of a hill.',
      'Whenever success seems close, the stone rolls back and the labour begins again.',
    ],
    options: ['Sisyphus', 'Prometheus Bound', 'Tantalus Tests the Gods', 'Perseus and Atlas'],
    reveal: 'Sisyphus, the notorious king of Corinth, is punished after death with an endless labour. He pushes a huge stone toward a summit, only to watch it roll back whenever he is about to complete the task.',
    source: 'Homer — Odyssey XI.593–600; Apollodorus — Bibliotheca I.9.3',
    sourceNote: 'Homer gives the famous image of the endless stone in Hades; later mythography expands the crimes and tricks that lead to Sisyphus’s punishment.',
    symbol: '●',
  },
  {
    id: 'phaethon-chariot',
    title: 'The Fall of Phaethon',
    eyebrow: 'Solar Cycle',
    cycle: 'Age of Heroes',
    category: 'heroes',
    location: 'Eridanos, traditional Po River association',
    coordinates: { lat: 44.91, lng: 11.61 },
    accuracyRadiusKm: 180,
    mapConfidence: 'traditional',
    geographyNote: 'Ancient authors treat Eridanos as both a remote mythic river and, in some traditions, a river associated with northern Italy. The pin uses the Po-region tradition as a playable geographic anchor rather than an exact crash site.',
    image: './assets/scene-phaethon.webp',
    fallback: 'linear-gradient(126deg, #34150d 0%, #d06b20 47%, #39455e 100%)',
    prompt: 'Find the uncontrolled solar chariot, four blazing horses, the scorched earth below, and Zeus raising the thunderbolt that will end the flight.',
    clues: [
      'A young man asks to prove his divine parentage by driving his father’s vehicle for a single day.',
      'The horses leave their proper path, scorching some parts of the earth and freezing others as the chariot veers wildly.',
      'Zeus finally stops the disaster with a thunderbolt, and the driver falls into the river Eridanos.',
    ],
    options: ['The Fall of Phaethon', 'Bellerophon Tames Pegasus', 'The Fall of Hephaestus', 'Apollo and Python'],
    reveal: 'Phaethon persuades his father Helios to let him drive the chariot of the sun. Unable to control its horses, he threatens the order of the world until Zeus strikes him with a thunderbolt and he falls into Eridanos.',
    source: 'Ovid — Metamorphoses I.750–II.400; Hyginus — Fabulae 152A',
    sourceNote: 'The Po association is one ancient geographic interpretation of Eridanos; the river also functions as a remote and partly mythic feature in Greek cosmography.',
    symbol: '☄',
  },
  {
    id: 'rhea-hides-zeus',
    title: 'Rhea and Zeus',
    eyebrow: 'Birth of the Olympians',
    cycle: 'Rise of Zeus',
    category: 'gods',
    location: 'Mount Ida, Crete',
    coordinates: { lat: 35.226, lng: 24.771 },
    accuracyRadiusKm: 80,
    mapConfidence: 'traditional',
    geographyNote: 'Cretan traditions place the hidden infant Zeus in a sacred cave, but ancient and later accounts differ between Idaean and Dictaean locations. Mount Ida is used here as one major traditional anchor.',
    image: './assets/scene-zeus-hidden.webp',
    fallback: 'linear-gradient(126deg, #33281d 0%, #866546 46%, #7ca5c0 100%)',
    prompt: 'Find the hidden infant, the swaddled stone, Amalthea the goat, and the armed Curetes crashing their shields so Cronus cannot hear the child.',
    clues: [
      'A mother hides her youngest child because the child’s father swallows each newborn to prevent a prophecy from coming true.',
      'A stone wrapped like a baby is offered as the substitute.',
      'On Crete, armed attendants clash their shields to conceal the infant’s cries while the future ruler of Olympus grows in secret.',
    ],
    options: ['Rhea and Zeus', 'The Birth of Dionysus', 'Demeter at Eleusis', 'The Wanderings of Leto'],
    reveal: 'Rhea saves the infant Zeus from Cronus by giving Cronus a stone wrapped in swaddling clothes. Zeus is hidden and raised on Crete, where later tradition surrounds him with the goat Amalthea and the shield-clashing Curetes.',
    source: 'Hesiod — Theogony 453–500; Apollodorus — Bibliotheca I.1.5–7',
    sourceNote: 'Hesiod places the concealment on Crete; details such as the Curetes, Amalthea and the precise cave develop across later traditions, which disagree over Ida and Dikte.',
    symbol: '⚡',
  },
  {
    id: 'aphrodite-birth',
    title: 'Aphrodite',
    eyebrow: 'Birth of the Gods',
    cycle: 'Olympian Order',
    category: 'gods',
    location: 'Paphos, Cyprus',
    coordinates: { lat: 34.709, lng: 32.573 },
    accuracyRadiusKm: 65,
    mapConfidence: 'traditional',
    geographyNote: 'Hesiod sends the newly born goddess first past Cythera and then to Cyprus. Paphos, one of her great ancient cult centres, is used as the Cypriot map anchor rather than a literal pinpoint for emergence from the sea.',
    pleiadesUrl: 'https://pleiades.stoa.org/places/707498',
    image: './assets/scene-aphrodite-birth.webp',
    fallback: 'linear-gradient(126deg, #8bb7ca 0%, #e6bc9f 48%, #f2d5bd 100%)',
    prompt: 'Find the goddess rising from sea foam, the Cypriot shore, the divine attendants with garments and flowers, and the doves circling the luminous water.',
    clues: [
      'A goddess comes into being from foam upon the sea and travels toward Cyprus.',
      'Her power belongs to desire, attraction and sexual love.',
      'The island that receives her becomes one of the most important centres of her worship in the ancient Mediterranean.',
    ],
    options: ['Aphrodite', 'The Birth of Pegasus', 'The Birth of Dionysus', 'Leda and the Swan'],
    reveal: 'In Hesiod’s account, Aphrodite forms from the foam of the sea after the severed genitals of Uranus fall into the water. She reaches Cyprus, where the goddess of desire and sexual love becomes especially at home in cult and myth.',
    source: 'Hesiod — Theogony 188–206; Homeric Hymn to Aphrodite',
    sourceNote: 'The famous shell is a much later artistic convention and is not required by Hesiod. The game uses Paphos as a traditional Cypriot cult anchor for the broader birth story.',
    symbol: '♀',
  },
]

let addedGods = 0
let addedHeroes = 0
for (const scene of scenes) {
  if (mythScenes.some((item) => item.id === scene.id)) continue
  mythScenes.push(scene)
  if (scene.category === 'gods') addedGods += 1
  if (scene.category === 'heroes') addedHeroes += 1
}

sceneCluesTr['pandora-jar'] = [
  'Tanrıların biçimlendirip armağanlarla donattığı bir kadın, dev bir saklama küpünün kapağını kaldırır.',
  'Felaketler ölümlülerin dünyasına yayılırken kapla ilişkili tek bir aydınlık varlık geride kalır.',
  'Yunanca şiirde söz konusu nesne küçük bir kutu değil, pithos denen büyük bir saklama küpüdür.',
]
sceneDetailsTr['pandora-jar'] = {
  location: 'Olympos Dağı, mitolojik tanrısal referans',
  geographyNote: 'Hesiodos küpün açıldığı yere kesin bir yeryüzü konumu vermez. Olympos, Pandora’yı biçimlendirip armağanlarla donatan tanrılar için mitolojik referans olarak kullanılır; küpün dağda açıldığı iddiası değildir.',
  reveal: 'Zeus, Prometheus ve ateşin çalınmasına verdiği karşılığın bir parçası olarak Pandora’yı Epimetheus’a gönderir. Pandora büyük pithosu açınca kötülükler ve güçlükler insan yaşamına yayılır; genellikle Umut diye çevrilen Elpis ise kapla birlikte geride kalır.',
  sourceNote: 'Hesiodos kabı pithos, yani büyük bir saklama küpü olarak adlandırır. Ünlü “Pandora’nın kutusu” ifadesi Yunanca metinden değil, çok daha sonraki bir çeviri geleneğinden gelir.',
}

sceneCluesTr['sisyphus-stone'] = [
  'Kurnaz bir kral, ölüler ülkesinde sonuçsuz kalan tek bir işi sonsuza dek tekrarlamaya mahkûm edilir.',
  'Dev bir kayayı dik bir yamacın zirvesine doğru itmek zorundadır.',
  'Başarıya yaklaşır yaklaşmaz kaya yeniden aşağı yuvarlanır ve görev baştan başlar.',
]
sceneDetailsTr['sisyphus-stone'] = {
  location: 'Korinthos / Ephyra',
  geographyNote: 'Cezanın kendisi ölüler ülkesinde geçer ve yeryüzünde koordinatı yoktur. Haritada Sisyphos’la özdeşleşen ölümlü krallık Korinthos, yani eski Ephyra referans alınır.',
  reveal: 'Korinthos’un kurnaz kralı Sisyphos, ölümden sonra sonsuz bir işe mahkûm edilir. Dev bir kayayı zirveye doğru iter; fakat işi tamamlamak üzereyken kaya yeniden aşağı yuvarlanır.',
  sourceNote: 'Homeros Hades’teki sonsuz kaya cezasının ünlü görüntüsünü verir; sonraki mitograflar Sisyphos’u bu cezaya götüren suçları ve hileleri ayrıntılandırır.',
}

sceneCluesTr['phaethon-chariot'] = [
  'Genç bir adam tanrısal soyunu kanıtlamak için babasının aracını yalnızca bir günlüğüne sürmek ister.',
  'Atlar doğru rotadan çıkar; araba savruldukça yeryüzünün kimi bölgeleri kavrulur, kimileri aşırı soğur.',
  'Zeus felaketi bir yıldırımla durdurur ve sürücü Eridanos Irmağı’na düşer.',
]
sceneDetailsTr['phaethon-chariot'] = {
  location: 'Eridanos, geleneksel Po Irmağı bağlantısı',
  geographyNote: 'Antik yazarlar Eridanos’u hem uzak ve mitolojik bir ırmak hem de bazı geleneklerde Kuzey İtalya’yla ilişkili bir akarsu olarak ele alır. Harita işareti kesin düşüş noktası değil, oynanabilir bir coğrafi referans olarak Po bölgesini kullanır.',
  reveal: 'Phaethon, babası Helios’u Güneş’in arabasını bir günlüğüne sürmesine izin vermeye ikna eder. Atları kontrol edemeyince dünyanın düzenini tehdit eder; Zeus onu yıldırımla vurur ve Phaethon Eridanos’a düşer.',
  sourceNote: 'Po bağlantısı Eridanos için antik coğrafi yorumlardan biridir; ırmak Yunan kozmografisinde uzak ve kısmen mitolojik bir unsur olarak da kullanılır.',
}

sceneCluesTr['rhea-hides-zeus'] = [
  'Bir anne, kehanetten korkan babası her yeni doğan çocuğu yuttuğu için en küçük oğlunu saklar.',
  'Bebeğin yerine kundaklanmış bir taş sunulur.',
  'Girit’te silahlı Kuretler bebeğin ağlamasını bastırmak için kalkanlarını çarpıştırırken Olympos’un gelecekteki hükümdarı gizlice büyür.',
]
sceneDetailsTr['rhea-hides-zeus'] = {
  location: 'İda Dağı, Girit',
  geographyNote: 'Girit gelenekleri bebek Zeus’u kutsal bir mağarada saklar; ancak antik ve sonraki anlatılar İda ile Dikte arasında farklılık gösterir. Burada başlıca geleneksel referanslardan biri olan İda Dağı kullanılır.',
  reveal: 'Rhea, Kronos’a kundak bezine sarılmış bir taş vererek bebek Zeus’u kurtarır. Zeus Girit’te gizlenip büyütülür; sonraki gelenek onu keçi Amaltheia ve kalkanlarını çarpıştıran Kuretlerle çevreler.',
  sourceNote: 'Hesiodos saklanışı Girit’e yerleştirir; Kuretler, Amaltheia ve mağaranın tam yeri gibi ayrıntılar sonraki geleneklerde gelişir ve İda ile Dikte konusunda farklı anlatılar bulunur.',
}

sceneCluesTr['aphrodite-birth'] = [
  'Bir tanrıça denizin köpüğünden doğar ve Kıbrıs’a doğru ilerler.',
  'Onun gücü arzu, çekim ve cinsel aşkla ilişkilidir.',
  'Onu karşılayan ada, antik Akdeniz’de kültünün en önemli merkezlerinden birine dönüşür.',
]
sceneDetailsTr['aphrodite-birth'] = {
  location: 'Paphos, Kıbrıs',
  geographyNote: 'Hesiodos yeni doğan tanrıçayı önce Kythera’nın yanından geçirir, ardından Kıbrıs’a ulaştırır. Büyük antik kült merkezlerinden Paphos, denizden çıkış için kesin bir nokta iddiası değil, Kıbrıs’taki geleneksel harita referansıdır.',
  reveal: 'Hesiodos’un anlatısında Aphrodite, Uranos’un kesilen cinsel organları denize düştükten sonra oluşan köpükten doğar. Kıbrıs’a ulaşır ve arzu ile cinsel aşkın tanrıçası özellikle bu adayla özdeşleşir.',
  sourceNote: 'Ünlü deniz kabuğu çok daha geç bir sanat geleneğidir ve Hesiodos’un anlatısında zorunlu değildir. Oyun, doğum öyküsünün Kıbrıs bağlantısını Paphos kült merkezi üzerinden haritalandırır.',
}

const extraCharacters: MythCharacter[] = [
  {
    id: 'pandora',
    name: { en: 'Pandora', tr: 'Pandora' },
    aliases: { en: ['Pandora'], tr: ['Pandora'] },
    info: {
      en: 'The first woman in Hesiod’s punishment story, fashioned by Hephaestus and adorned with gifts from the gods before being sent to Epimetheus.',
      tr: 'Hesiodos’un ceza anlatısındaki ilk kadındır; Hephaistos tarafından biçimlendirilir, tanrıların armağanlarıyla donatılır ve Epimetheus’a gönderilir.',
    },
  },
  {
    id: 'epimetheus',
    name: { en: 'Epimetheus', tr: 'Epimetheus' },
    aliases: { en: ['Epimetheus'], tr: ['Epimetheus'] },
    info: {
      en: 'Brother of Prometheus. Despite a warning not to accept gifts from Zeus, he receives Pandora.',
      tr: 'Prometheus’un kardeşidir. Zeus’tan armağan kabul etmemesi yönündeki uyarıya rağmen Pandora’yı kabul eder.',
    },
  },
  {
    id: 'sisyphus',
    name: { en: 'Sisyphus', tr: 'Sisyphos' },
    aliases: { en: ['Sisyphus'], tr: ['Sisyphos'] },
    info: {
      en: 'The cunning king associated with Corinth whose attempts to outwit death lead to the most famous endless labour in Greek myth.',
      tr: 'Korinthos’la özdeşleşen kurnaz kraldır; ölümü alt etmeye yönelik hileleri Yunan mitolojisinin en ünlü sonsuz cezasına bağlanır.',
    },
  },
  {
    id: 'phaethon',
    name: { en: 'Phaethon', tr: 'Phaethon' },
    aliases: { en: ['Phaethon'], tr: ['Phaethon'] },
    info: {
      en: 'The son who asks to drive the sun chariot to prove his descent from Helios, but loses control of its divine horses.',
      tr: 'Helios’un oğlu olduğunu kanıtlamak için Güneş arabasını sürmek isteyen, fakat tanrısal atların kontrolünü kaybeden gençtir.',
    },
  },
  {
    id: 'helios',
    name: { en: 'Helios', tr: 'Helios' },
    aliases: { en: ['Helios'], tr: ['Helios'] },
    info: {
      en: 'The solar god who crosses the sky in a radiant chariot. He reluctantly grants Phaethon a single day at the reins.',
      tr: 'Göğü ışıldayan arabasıyla geçen Güneş tanrısıdır. Phaethon’a dizginleri bir günlüğüne gönülsüzce verir.',
    },
  },
  {
    id: 'rhea',
    name: { en: 'Rhea', tr: 'Rhea' },
    aliases: { en: ['Rhea'], tr: ['Rhea'] },
    info: {
      en: 'Titan daughter of Gaia and Uranus, consort of Cronus and mother of the first Olympian generation. She saves Zeus with the swaddled-stone deception.',
      tr: 'Gaia ile Uranos’un Titan kızı, Kronos’un eşi ve ilk Olympos kuşağının annesidir. Kundaklanmış taş hilesiyle Zeus’u kurtarır.',
    },
  },
  {
    id: 'cronus',
    name: { en: 'Cronus', tr: 'Kronos' },
    aliases: { en: ['Cronus'], tr: ['Kronos'] },
    info: {
      en: 'Titan ruler who swallows his children because he fears the prophecy that one of them will overthrow him.',
      tr: 'Çocuklarından birinin kendisini devireceği kehanetinden korktuğu için onları yutan Titan hükümdardır.',
    },
  },
  {
    id: 'amalthea',
    name: { en: 'Amalthea', tr: 'Amaltheia' },
    aliases: { en: ['Amalthea'], tr: ['Amaltheia'] },
    info: {
      en: 'The nurturing figure, often imagined as a goat or goat-associated nymph, connected with the hidden infant Zeus in Cretan tradition.',
      tr: 'Girit geleneğinde saklanan bebek Zeus’u besleyen, çoğu kez keçi ya da keçiyle ilişkili bir nymphe olarak düşünülen figürdür.',
    },
  },
]

const mutableCharacters = mythCharacters as MythCharacter[]
for (const character of extraCharacters) {
  if (!mutableCharacters.some((item) => item.id === character.id)) mutableCharacters.push(character)
}

;(catalogSummary as unknown as { mythScenes: number }).mythScenes = mythScenes.length
const olympiansCollection = collections.find((collection) => collection.title === 'Olympians')
if (olympiansCollection && addedGods > 0) {
  ;(olympiansCollection as unknown as { count: number }).count += addedGods
}
const heroesCollection = collections.find((collection) => collection.title === 'Heroes')
if (heroesCollection && addedHeroes > 0) {
  ;(heroesCollection as unknown as { count: number }).count += addedHeroes
}
