import { mythScenes, type MythScene } from './data'
import { sceneCluesTr, sceneDetailsTr } from './sceneCopy'

const scenes: MythScene[] = [
  {
    id: 'persephone-abduction',
    title: 'Hades and Persephone',
    eyebrow: 'Eleusinian Cycle',
    cycle: 'Olympian Age',
    category: 'gods',
    location: 'Enna, Sicily',
    coordinates: { lat: 37.567, lng: 14.279 },
    accuracyRadiusKm: 45,
    mapConfidence: 'traditional',
    geographyNote: 'The Homeric Hymn places the abduction on the Nysian plain without a secure modern identification. Later Greek and Roman tradition strongly localized the episode in central Sicily around Enna, so the map uses Enna as a traditional rather than exact site.',
    image: './assets/registered/scene-persephone-abduction.webp',
    fallback: 'linear-gradient(128deg, #81954f 0%, #d5bd68 44%, #292436 100%)',
    prompt: 'Find the spring flowers, the earth opening beneath the meadow, the dark chariot, and the daughter whose disappearance will change the seasons.',
    clues: [
      'A young goddess is gathering flowers when the ground suddenly opens beneath the meadow.',
      'The ruler of the dead carries her away in a chariot while her mother begins a desperate search.',
      'Her eventual return is incomplete, binding the fertility of the earth to a recurring seasonal cycle.',
    ],
    options: ['Hades and Persephone', 'Orpheus and Eurydice', 'Selene and Endymion', 'Europa and the White Bull'],
    reveal: 'Persephone is seized by Hades and carried into the underworld. Demeter’s grief makes the earth barren until a settlement allows her daughter to return for part of each year, creating the mythic pattern of seasonal loss and renewal.',
    source: 'Homeric Hymn to Demeter; Diodorus Siculus — Bibliotheca Historica V; Ovid — Metamorphoses V',
    sourceNote: 'The earliest hymn names a Nysian plain whose location is uncertain. Enna is used here because Sicily developed one of antiquity’s strongest terrestrial traditions for the abduction.',
    symbol: '✿',
  },
  {
    id: 'golden-fleece',
    title: 'Jason and the Golden Fleece',
    eyebrow: 'Argonautica',
    cycle: 'Age of Heroes',
    category: 'heroes',
    location: 'Colchis / Phasis, western Georgia',
    coordinates: { lat: 42.146, lng: 41.671 },
    accuracyRadiusKm: 110,
    mapConfidence: 'traditional',
    geographyNote: 'Ancient accounts place the Golden Fleece in Colchis and bring the Argonauts to the river Phasis. The modern Poti area is used only as a broad geographic anchor for the Phasis–Colchis tradition, not as the exact sacred grove.',
    image: './assets/registered/scene-golden-fleece.webp',
    fallback: 'linear-gradient(126deg, #243b31 0%, #a67528 50%, #101b21 100%)',
    prompt: 'Find the radiant fleece on the sacred tree, the sleepless guardian coiled around it, the foreign princess helping nearby, and the ship that crossed the Black Sea.',
    clues: [
      'A shining ram’s fleece hangs in a sacred grove at the far eastern end of a heroic sea voyage.',
      'A dragon that never sleeps guards the prize while a local princess uses her knowledge to help the stranger reach it.',
      'The expedition arrived aboard the Argo after sailing through the Bosporus into the Black Sea.',
    ],
    options: ['Jason and the Golden Fleece', 'Perseus and Andromeda', 'Bellerophon and the Chimera', 'Hippolyta’s Girdle'],
    reveal: 'Jason reaches Colchis with the Argonauts to claim the Golden Fleece. Medea helps him survive the tasks imposed by King Aeetes and overcome the sleepless dragon guarding the fleece, allowing the Argonauts to escape with the prize.',
    source: 'Apollodorus — Bibliotheca I.9.16, I.9.23; Apollonius Rhodius — Argonautica',
    sourceNote: 'Colchis and the river Phasis are explicit ancient geographic anchors. The pin represents that broad historical landscape rather than a claimed coordinate for the grove of Ares.',
    symbol: '✦',
  },
  {
    id: 'perseus-andromeda',
    title: 'Perseus and Andromeda',
    eyebrow: 'Perseid Cycle',
    cycle: 'Age of Heroes',
    category: 'heroes',
    location: 'Joppa / Jaffa, ancient local tradition',
    coordinates: { lat: 32.052, lng: 34.752 },
    accuracyRadiusKm: 25,
    mapConfidence: 'traditional',
    geographyNote: 'The literary story is often set in Aithiopia, but an ancient local tradition placed Andromeda’s exposure at Joppa and even identified the coastal rock with her chains. The map deliberately represents that attested ancient localization.',
    image: './assets/registered/scene-perseus-andromeda.webp',
    fallback: 'linear-gradient(126deg, #4b6e7b 0%, #b48654 48%, #27333d 100%)',
    prompt: 'Find the princess chained above the surf, the sea creature rising below, and the returning hero carrying the divine equipment that lets him intervene.',
    clues: [
      'A princess is exposed on a coastal rock as payment for her mother’s boast.',
      'A hero returning from the Gorgon’s lair sees her and confronts the sea monster sent against the kingdom.',
      'Ancient visitors to Joppa were shown a rock associated with the chains of the rescued princess.',
    ],
    options: ['Perseus and Andromeda', 'Jason and the Golden Fleece', 'Theseus and the Minotaur', 'Hero and Leander'],
    reveal: 'Andromeda is chained to a rock to be sacrificed to a sea monster after Poseidon punishes the kingdom. Perseus sees her on his return from killing Medusa, defeats the monster and frees Andromeda.',
    source: 'Apollodorus — Bibliotheca II.4.3; Pliny the Elder — Natural History V',
    sourceNote: 'The broader myth uses Aithiopia, while Joppa preserves a distinct ancient terrestrial localization. MYTHOS maps that ancient Joppa tradition rather than pretending the story has one universally agreed coordinate.',
    symbol: '⚔',
  },
  {
    id: 'europa-white-bull',
    title: 'Europa and the White Bull',
    eyebrow: 'Cretan Origins',
    cycle: 'Olympian Age',
    category: 'gods',
    location: 'Tyre / Phoenician coast',
    coordinates: { lat: 33.270, lng: 35.203 },
    accuracyRadiusKm: 120,
    mapConfidence: 'traditional',
    geographyNote: 'Ancient accounts identify Europa with Phoenicia and describe Zeus carrying her across the sea to Crete in the form of a bull. Tyre is used as a broad Phoenician coastal anchor, not as a claim for the exact beach where she mounted the bull.',
    image: './assets/registered/scene-europa-white-bull.webp',
    fallback: 'linear-gradient(126deg, #69a7b5 0%, #e0c88b 52%, #6b835b 100%)',
    prompt: 'Find the unnaturally gentle white bull among the flowers, the Phoenician princess trusting it, and the sea route opening toward Crete.',
    clues: [
      'A god disguises himself as a remarkably tame white bull to approach a Phoenician princess.',
      'Once she climbs onto his back, the animal leaves the shore and carries her across the sea.',
      'The journey ends on Crete, where her descendants include King Minos.',
    ],
    options: ['Europa and the White Bull', 'Io’s Flight', 'Selene and Endymion', 'Hades and Persephone'],
    reveal: 'Zeus approaches Europa in the form of a gentle white bull. When she mounts him, he carries her from the Phoenician coast across the sea to Crete, where she becomes the mother of Minos and part of the island’s royal mythic genealogy.',
    source: 'Apollodorus — Bibliotheca III.1.1',
    sourceNote: 'Phoenicia and the crossing to Crete are ancient narrative anchors. Tyre functions here as a broad traditional coastal reference, deliberately avoiding a false exact shoreline claim.',
    symbol: '♉',
  },
]

for (const scene of scenes) {
  if (!mythScenes.some((item) => item.id === scene.id)) mythScenes.push(scene)
}

sceneCluesTr['persephone-abduction'] = [
  'Genç bir tanrıça çiçek toplarken çayırın ortasında toprak birden yarılır.',
  'Ölüler ülkesinin hükümdarı onu arabasına alıp götürürken annesi kızını aramaya başlar.',
  'Dönüşü yalnızca yılın bir bölümünü kapsar; toprağın bereketi de bu ayrılık ve kavuşma döngüsüne bağlanır.',
]
sceneDetailsTr['persephone-abduction'] = {
  location: 'Enna, Sicilya',
  geographyNote: 'Demeter’e Homeros İlahisi kaçırılışı kesin yeri bilinmeyen Nysa Ovası’na yerleştirir. Daha sonraki Yunan ve Roma geleneği olayı Sicilya’nın içlerinde, özellikle Enna çevresinde güçlü biçimde yerelleştirmiştir; bu nedenle harita noktası kesin değil, geleneksel bir bağlantıdır.',
  reveal: 'Hades, çiçek toplayan Persephone’yi yeraltı dünyasına kaçırır. Demeter’in yas tuttuğu sürede toprak ürün vermez; sonunda Persephone’nin yılın bir bölümünde annesine dönmesine izin veren düzen, mevsimsel kayıp ve yenilenme mitine dönüşür.',
  sourceNote: 'En eski ilahideki Nysa Ovası kesin olarak tanımlanamaz. Enna, antik çağda kaçırılışla güçlü biçimde ilişkilendirildiği için gerçek dünya haritasında geleneksel konum olarak kullanılır.',
}

sceneCluesTr['golden-fleece'] = [
  'Parlak bir koç postu, kahramanların uzun deniz yolculuğunun en doğu ucundaki kutsal koruda asılıdır.',
  'Ödülü hiç uyumayan bir ejderha korur; yerel bir prenses yabancı kahramana bilgisi ve büyüsüyle yardım eder.',
  'Sefer Argo gemisiyle Bosporos’u geçip Karadeniz üzerinden Kolkhis’e ulaşır.',
]
sceneDetailsTr['golden-fleece'] = {
  location: 'Kolkhis / Phasis, Batı Gürcistan',
  geographyNote: 'Antik anlatılar Altın Post’u Kolkhis’e yerleştirir ve Argonautların Phasis Nehri’ne ulaştığını söyler. Haritadaki Poti çevresi, Phasis–Kolkhis coğrafyasını temsil eden geniş bir referanstır; kutsal korunun kesin koordinatı değildir.',
  reveal: 'Iason, Argonautlarla Kolkhis’e giderek Altın Post’u ister. Kral Aietes’in görevlerini Medea’nın yardımıyla aşar; Medea ayrıca postu koruyan uykusuz ejderhayı etkisiz hâle getirir ve Argonautlar ödülle birlikte kaçar.',
  sourceNote: 'Kolkhis ve Phasis antik kaynaklarda açık coğrafi dayanaklardır. İşaret, Ares korusuna sahte bir GPS kesinliği vermek yerine bu tarihsel bölgeyi gösterir.',
}

sceneCluesTr['perseus-andromeda'] = [
  'Bir prenses, annesinin övünmesinin bedeli olarak deniz kıyısındaki kayaya zincirlenmiştir.',
  'Medusa’dan dönen kahraman onu görür ve krallığı cezalandırmak için gönderilen deniz canavarıyla savaşır.',
  'Antik çağda Yafa’ya gelenlere, prensesin zincirleriyle ilişkilendirilen kıyı kayası gösterilirdi.',
]
sceneDetailsTr['perseus-andromeda'] = {
  location: 'Joppa / Yafa, antik yerel gelenek',
  geographyNote: 'Ana edebî anlatı ülkeyi çoğunlukla Aithiopia olarak adlandırır; buna karşılık antik bir yerel gelenek Andromeda’nın kayaya bağlanışını Joppa’ya yerleştirir ve kıyıdaki kayayı zincirlerle ilişkilendirir. Harita bu antik yerelleştirmeyi gösterir.',
  reveal: 'Andromeda, Poseidon’un gönderdiği deniz canavarına kurban edilmek üzere kayaya zincirlenir. Medusa’yı öldürmüş olarak geri dönen Perseus onu görür, canavarı yenerek Andromeda’yı kurtarır.',
  sourceNote: 'Mitin Aithiopia anlatısı ile Joppa’daki antik yerel gelenek aynı değildir. MYTHOS, gerçek dünya haritasında kanıtlanabilir yerelleştirme olduğu için Joppa geleneğini açıkça “geleneksel” olarak işaretler.',
}

sceneCluesTr['europa-white-bull'] = [
  'Bir tanrı, Fenikeli prensese yaklaşabilmek için olağanüstü uysal beyaz bir boğa görünümüne girer.',
  'Prenses sırtına bindiğinde boğa kıyıdan ayrılır ve onu denizin üzerinden taşır.',
  'Yolculuk Girit’te son bulur; prensesin soyundan Kral Minos gelir.',
]
sceneDetailsTr['europa-white-bull'] = {
  location: 'Tyros / Fenike kıyısı',
  geographyNote: 'Antik anlatı Europa’yı Fenike’ye bağlar ve Zeus’un boğa biçiminde onu denizden Girit’e taşıdığını söyler. Tyros, belirli bir kumsal iddiası değil, Fenike kıyısını temsil eden geniş ve geleneksel bir harita çapasıdır.',
  reveal: 'Zeus, Europa’ya beyaz ve uysal bir boğa görünümünde yaklaşır. Europa sırtına çıkınca onu Fenike kıyısından deniz üzerinden Girit’e götürür; Europa daha sonra Minos’un annesi olur ve Girit’in kraliyet mitlerine bağlanır.',
  sourceNote: 'Fenike ve Girit’e deniz yolculuğu antik anlatının gerçek dünya dayanaklarıdır. Tyros noktası kesin bir sahil koordinatı gibi sunulmaz; geleneksel Fenike referansıdır.',
}
