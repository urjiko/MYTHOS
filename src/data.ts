export type Point = { x: number; y: number }

export type MythScene = {
  id: string
  title: string
  eyebrow: string
  cycle: string
  location: string
  coordinates: Point
  image: string
  fallback: string
  prompt: string
  clues: string[]
  options: string[]
  reveal: string
  source: string
  sourceNote: string
  symbol: string
}

export const mythScenes: MythScene[] = [
  {
    id: 'labyrinth',
    title: 'Theseus ve Minotor',
    eyebrow: 'Girit Döngüsü',
    cycle: 'Kahramanlar Çağı',
    location: 'Knossos, Girit',
    coordinates: { x: 47, y: 79 },
    image: './assets/scene-labyrinth.webp',
    fallback: 'linear-gradient(118deg, #13110d 0%, #4e2b1e 44%, #a56136 100%)',
    prompt: 'Duvarlardaki çift ağızlı baltayı, uzak boğa gölgesini ve yerde uzanan kırmızı ipi ara.',
    clues: [
      'Yerdeki ip, buraya girenin geri dönebilmesi için bırakılmış.',
      'Bu saray, Kral Minos’un hüküm sürdüğü adada.',
      'Canavar yarı insan, yarı boğa.',
    ],
    options: ['Theseus ve Minotor', 'Orpheus ve Eurydike', 'Herakles ve Hydra', 'Bellerophon ve Khimaira'],
    reveal:
      'Ariadne’nin ipi sayesinde Theseus, Daidalos’un tasarladığı labirentten çıkmayı başarır. Mit Knossos ile özdeşleştirilse de arkeolojik saray ile efsanedeki labirent aynı şey değildir.',
    source: 'Apollodoros — Bibliotheka; Plutarkhos — Theseus',
    sourceNote: 'Antik anlatılar ayrıntılarda birbirinden farklılaşır.',
    symbol: '𐂂',
  },
  {
    id: 'medusa',
    title: 'Perseus ve Medusa',
    eyebrow: 'Perseus Döngüsü',
    cycle: 'Kahramanlar Çağı',
    location: 'Gorgonların Ülkesi',
    coordinates: { x: 13, y: 38 },
    image: './assets/scene-medusa.webp',
    fallback: 'linear-gradient(120deg, #101713 0%, #31453d 45%, #a09878 100%)',
    prompt: 'Doğrudan bakma. Taş kesilmiş savaşçılar ve ayna gibi parlayan bir kalkan sana yeter.',
    clues: [
      'Kahraman hedefini yalnızca kalkanındaki yansımadan izliyor.',
      'Athena ona cilalı bir kalkan, Hermes ise kıvrık bir kılıç verdi.',
      'Canavarın saçları canlı yılanlardan oluşuyor.',
    ],
    options: ['Perseus ve Medusa', 'Apollon ve Python', 'Kadmos ve Ejderha', 'Odysseus ve Polyphemos'],
    reveal:
      'Perseus, Medusa’nın bakışından korunmak için cilalı kalkanı ayna gibi kullanır. Gorgonların ülkesi antik kaynaklarda dünyanın uzak batı sınırlarına yerleştirilir.',
    source: 'Hesiodos — Theogonia; Apollodoros — Bibliotheka II',
    sourceNote: 'Coğrafi nokta, mitik anlatıların yaklaşık yer tarifidir.',
    symbol: '◉',
  },
  {
    id: 'sirens',
    title: 'Odysseus ve Sirenler',
    eyebrow: 'Odysseia',
    cycle: 'Truva Sonrası',
    location: 'Siren Kayalıkları',
    coordinates: { x: 17, y: 67 },
    image: './assets/scene-sirens.webp',
    fallback: 'linear-gradient(132deg, #071c24 0%, #22616a 48%, #e0a45e 100%)',
    prompt: 'Fırtınalı suya, balmumuyla kapatılmış kulaklara ve direğe bağlanmış yolcuya dikkat et.',
    clues: [
      'Mürettebatın kulakları balmumuyla kapatıldı.',
      'Kaptan şarkıyı duymak istediği için geminin direğine bağlandı.',
      'Bu olay, Truva’dan İthaka’ya dönüş yolculuğunda yaşanır.',
    ],
    options: ['Odysseus ve Sirenler', 'Jason ve Harpyalar', 'Theseus ve Ariadne', 'Phaethon’un Düşüşü'],
    reveal:
      'Kirke’nin uyarısını dinleyen Odysseus, tayfasının kulaklarını balmumuyla kapatır; kendisini de geminin direğine bağlatır. Böylece Sirenlerin şarkısını duyup hayatta kalan kişi olur.',
    source: 'Homeros — Odysseia XII',
    sourceNote: 'Sirenlerin tam coğrafi konumu antik ve modern yorumlarda değişir.',
    symbol: '≈',
  },
  {
    id: 'trojan-horse',
    title: 'Truva Atı',
    eyebrow: 'Truva Döngüsü',
    cycle: 'Truva Savaşı',
    location: 'Truva, Anadolu',
    coordinates: { x: 66, y: 31 },
    image: './assets/scene-trojan-horse.webp',
    fallback: 'linear-gradient(126deg, #17130f 0%, #744425 49%, #df9b4d 100%)',
    prompt: 'Şafakta açılmış kapılara, terk edilmiş sahile ve surların gölgesindeki dev tahta armağana bak.',
    clues: [
      'Kıyıda kuşatma ordusundan eser yok; geride yalnızca bir armağan kalmış.',
      'Laokoon bu nesnenin şehre alınmamasını savundu.',
      'İçinde saklanan savaşçılar gece kapıları açacak.',
    ],
    options: ['Truva Atı', 'Argonautların Dönüşü', 'Devler Savaşı', 'Yedi Komutanın Thebai Seferi'],
    reveal:
      'Tahta at hilesi, Truva’nın düşüşünün en ünlü anlatısıdır. Homeros atı dolaylı biçimde anar; ayrıntılı düşüş sahnesi özellikle Vergilius’un Aeneis’inde işlenir.',
    source: 'Homeros — Odysseia VIII; Vergilius — Aeneis II',
    sourceNote: 'Truva anlatısı Yunan ve Roma kaynaklarında farklı katmanlar taşır.',
    symbol: '♘',
  },
  {
    id: 'prometheus',
    title: 'Prometheus Ateşi Çalıyor',
    eyebrow: 'Tanrıların Çağı',
    cycle: 'Olimpos Düzeni',
    location: 'Olimpos Dağı',
    coordinates: { x: 50, y: 29 },
    image: './assets/scene-prometheus.webp',
    fallback: 'linear-gradient(130deg, #11131a 0%, #49331f 48%, #e7772e 100%)',
    prompt: 'Gece Olimpos’ta saklanan koru, içi boş rezene sapını ve uzaktaki kartal siluetini izle.',
    clues: [
      'Çalınan şey, insan uygarlığının başlangıcını simgeliyor.',
      'Hırsız bir Titan; cezası Kafkas Dağları’nda zincire vurulmak.',
      'Bir kartal her gün onun yeniden oluşan karaciğerini yiyecek.',
    ],
    options: ['Prometheus Ateşi Çalıyor', 'Hephaistos’un Düşüşü', 'Psykhe’nin Sınavı', 'Dionysos’un Doğuşu'],
    reveal:
      'Prometheus, Zeus’un insanlardan sakladığı ateşi rezene sapında taşıyarak geri getirir. Cezası yalnızca hırsızlık için değil, Zeus’un yeni düzenine meydan okuması içindir.',
    source: 'Hesiodos — Theogonia ve İşler ve Günler',
    sourceNote: 'Aiskhylos geleneği Prometheus’u uygarlık kurucusu olarak daha da büyütür.',
    symbol: '△',
  },
]

export const atlasPlaces = [
  { name: 'Olimpos', x: 50, y: 29, type: 'Tanrılar' },
  { name: 'Delfi', x: 43, y: 48, type: 'Kehanet' },
  { name: 'Atina', x: 48, y: 55, type: 'Polis' },
  { name: 'Knossos', x: 47, y: 79, type: 'Kahramanlar' },
  { name: 'Truva', x: 66, y: 31, type: 'Savaş' },
  { name: 'İthaka', x: 29, y: 58, type: 'Odysseia' },
  { name: 'Thebai', x: 44, y: 46, type: 'Trajedi' },
  { name: 'Hades Kapısı', x: 35, y: 72, type: 'Yeraltı' },
]

export const collections = [
  {
    title: 'Olimposlular',
    count: 12,
    note: 'İktidar, kıskançlık ve kutsal düzen',
    color: '#bf8e42',
    art: './assets/scene-prometheus.webp',
  },
  {
    title: 'Kahramanlar',
    count: 18,
    note: 'Zaferin bedelini ödeyen ölümlüler',
    color: '#94422d',
    art: './assets/scene-medusa.webp',
  },
  {
    title: 'Canavarlar',
    count: 14,
    note: 'Düzenin sınırında bekleyen yaratıklar',
    color: '#53624c',
    art: './assets/scene-labyrinth.webp',
  },
  {
    title: 'Truva Döngüsü',
    count: 10,
    note: 'Bir savaş, yüzlerce kader',
    color: '#71503c',
    art: './assets/scene-trojan-horse.webp',
  },
]
