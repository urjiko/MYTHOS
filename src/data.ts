export type Point = { lat: number; lng: number }

export type MapConfidence = 'attested' | 'traditional' | 'mythic'
export type MythCategory = 'gods' | 'heroes' | 'odyssey' | 'trojan'

export type MythScene = {
  id: string
  title: string
  eyebrow: string
  cycle: string
  category: MythCategory
  location: string
  coordinates: Point
  accuracyRadiusKm: number
  mapConfidence: MapConfidence
  geographyNote: string
  pleiadesUrl?: string
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
    title: 'Theseus and the Minotaur',
    eyebrow: 'Cretan Cycle',
    cycle: 'Age of Heroes',
    category: 'heroes',
    location: 'Knossos, Crete',
    coordinates: { lat: 35.2989, lng: 25.1603 },
    accuracyRadiusKm: 90,
    mapConfidence: 'attested',
    geographyNote: 'The myth is associated with Knossos; the archaeological palace is not literally the maze of the story.',
    pleiadesUrl: 'https://pleiades.stoa.org/places/589872',
    image: './assets/scene-labyrinth.webp',
    fallback: 'linear-gradient(118deg, #13110d 0%, #4e2b1e 44%, #a56136 100%)',
    prompt: 'Find the double axes on the walls, the distant horned shadow, and the red thread crossing the floor.',
    clues: [
      'The thread was left so that its bearer could find the way out again.',
      'This palace belongs to the island ruled by King Minos.',
      'The creature is half man and half bull.',
    ],
    options: ['Orpheus and Eurydice', 'Theseus and the Minotaur', 'Heracles and the Hydra', 'Bellerophon and the Chimera'],
    reveal:
      'With Ariadne’s thread, Theseus escapes the labyrinth designed by Daedalus. The myth is tied to Knossos, although the excavated palace and the legendary maze are not the same thing.',
    source: 'Apollodorus — Bibliotheca; Plutarch — Theseus',
    sourceNote: 'Ancient versions disagree on several details.',
    symbol: '𐂂',
  },
  {
    id: 'medusa',
    title: 'Perseus and Medusa',
    eyebrow: 'Perseus Cycle',
    cycle: 'Age of Heroes',
    category: 'heroes',
    location: 'The far western edge of Oceanus',
    coordinates: { lat: 35.9, lng: -7.2 },
    accuracyRadiusKm: 500,
    mapConfidence: 'mythic',
    geographyNote: 'Ancient poetry places the Gorgons in the distant west; this pin visualises a mythic direction, not an excavated site.',
    image: './assets/scene-medusa.webp',
    fallback: 'linear-gradient(120deg, #101713 0%, #31453d 45%, #a09878 100%)',
    prompt: 'Do not look directly. Petrified warriors and a mirror-bright shield should be enough.',
    clues: [
      'The hero watches his target only through a reflection in his shield.',
      'Athena gave him a polished shield; Hermes supplied a curved blade.',
      'The monster’s hair is made of living snakes.',
    ],
    options: ['Apollo and Python', 'Cadmus and the Dragon', 'Perseus and Medusa', 'Odysseus and Polyphemus'],
    reveal:
      'Perseus uses the polished shield as a mirror to avoid Medusa’s gaze. Ancient authors place the Gorgons near the remote western boundary of the imagined world.',
    source: 'Hesiod — Theogony; Apollodorus — Bibliotheca II',
    sourceNote: 'The map pin is an explicitly mythic placement, not a claim of historical precision.',
    symbol: '◉',
  },
  {
    id: 'sirens',
    title: 'Odysseus and the Sirens',
    eyebrow: 'The Odyssey',
    cycle: 'After Troy',
    category: 'odyssey',
    location: 'The Siren Rocks, traditional Campanian placement',
    coordinates: { lat: 40.5808, lng: 14.4296 },
    accuracyRadiusKm: 240,
    mapConfidence: 'traditional',
    geographyNote: 'Homer gives no secure coordinates; later tradition often identifies the Sirens with islands off Campania.',
    image: './assets/scene-sirens.webp',
    fallback: 'linear-gradient(132deg, #071c24 0%, #22616a 48%, #e0a45e 100%)',
    prompt: 'Study the storm-dark water, the wax-sealed ears, and the traveller bound to the mast.',
    clues: [
      'The crew’s ears have been sealed with beeswax.',
      'The captain wants to hear the song, so he has himself tied to the mast.',
      'This happens during the voyage home from Troy to Ithaca.',
    ],
    options: ['Jason and the Harpies', 'Theseus and Ariadne', 'The Fall of Phaethon', 'Odysseus and the Sirens'],
    reveal:
      'Following Circe’s warning, Odysseus seals his crew’s ears with wax and has himself bound to the mast. He hears the Sirens and survives.',
    source: 'Homer — Odyssey XII',
    sourceNote: 'The exact location of the Sirens changes across ancient and modern interpretations.',
    symbol: '≈',
  },
  {
    id: 'trojan-horse',
    title: 'The Trojan Horse',
    eyebrow: 'Trojan Cycle',
    cycle: 'Trojan War',
    category: 'trojan',
    location: 'Ilion / Troy, Anatolia',
    coordinates: { lat: 39.9575, lng: 26.2389 },
    accuracyRadiusKm: 90,
    mapConfidence: 'attested',
    geographyNote: 'The pin marks the archaeological mound at Hisarlık, identified with ancient Ilion/Troy.',
    pleiadesUrl: 'https://pleiades.stoa.org/places/550595',
    image: './assets/scene-trojan-horse.webp',
    fallback: 'linear-gradient(126deg, #17130f 0%, #744425 49%, #df9b4d 100%)',
    prompt: 'Look for the open gates at dawn, the abandoned shore, and the immense wooden offering beneath the walls.',
    clues: [
      'The besieging army has vanished from the coast, leaving only a gift.',
      'Laocoön argued that this object must not be brought into the city.',
      'Warriors hidden inside will open the gates at night.',
    ],
    options: ['The Return of the Argonauts', 'The Trojan Horse', 'The War of the Giants', 'The Seven against Thebes'],
    reveal:
      'The wooden-horse ruse is the most famous story of Troy’s fall. Homer refers to it indirectly; Virgil’s Aeneid supplies the best-known extended account.',
    source: 'Homer — Odyssey VIII; Virgil — Aeneid II',
    sourceNote: 'The Trojan tradition contains Greek and Roman layers written centuries apart.',
    symbol: '♘',
  },
  {
    id: 'prometheus',
    title: 'Prometheus Steals Fire',
    eyebrow: 'Age of the Gods',
    cycle: 'Olympian Order',
    category: 'gods',
    location: 'Mount Olympus',
    coordinates: { lat: 40.0856, lng: 22.3586 },
    accuracyRadiusKm: 150,
    mapConfidence: 'traditional',
    geographyNote: 'The pin marks Mount Olympus, the dominant Greek location of the gods’ dwelling.',
    pleiadesUrl: 'https://pleiades.stoa.org/places/491677',
    image: './assets/scene-prometheus.webp',
    fallback: 'linear-gradient(130deg, #11131a 0%, #49331f 48%, #e7772e 100%)',
    prompt: 'Track the hidden ember on Olympus, the hollow fennel stalk, and the eagle shape in the distant storm.',
    clues: [
      'The stolen object symbolises the beginning of human civilisation.',
      'The thief is a Titan who will be chained in the Caucasus.',
      'An eagle will consume his renewed liver each day.',
    ],
    options: ['The Fall of Hephaestus', 'Psyche’s Trials', 'Prometheus Steals Fire', 'The Birth of Dionysus'],
    reveal:
      'Prometheus restores fire to mortals by hiding an ember in a giant fennel stalk. His punishment answers both the theft and his challenge to Zeus’s new order.',
    source: 'Hesiod — Theogony and Works and Days',
    sourceNote: 'The Aeschylean tradition expands Prometheus into a founder of civilisation.',
    symbol: '△',
  },
  {
    id: 'apollo-python',
    title: 'Apollo and Python',
    eyebrow: 'Delphic Cycle',
    cycle: 'Olympian Order',
    category: 'gods',
    location: 'Delphi, Phocis',
    coordinates: { lat: 38.4824, lng: 22.501 },
    accuracyRadiusKm: 80,
    mapConfidence: 'attested',
    geographyNote: 'The pin marks the sanctuary of Delphi beneath the Phaedriades cliffs.',
    pleiadesUrl: 'https://pleiades.stoa.org/places/540726',
    image: './assets/scene-apollo-python.webp',
    fallback: 'linear-gradient(128deg, #171512 0%, #665033 48%, #d4a853 100%)',
    prompt: 'Find the laurel, the omphalos, the bronze tripod, a lowered bow, and the serpent hidden among the rocks.',
    clues: [
      'The sanctuary will become the most famous oracle in the Greek world.',
      'The young god claims the site after confronting its great serpent guardian.',
      'His victory is remembered in the Pythian name of the oracle and games.',
    ],
    options: ['Apollo and Python', 'Cadmus and the Dragon', 'Heracles and Ladon', 'Zeus and Typhon'],
    reveal:
      'The Homeric Hymn to Apollo tells how Apollo established his Delphic sanctuary after defeating the serpent. The story explains the Pythian title attached to the oracle and its festival.',
    source: 'Homeric Hymn to Apollo 300–374; Apollodorus — Bibliotheca I.4.1',
    sourceNote: 'The sanctuary is real; the combat and its chronology belong to mythic aetiology.',
    symbol: '☀',
  },
  {
    id: 'polyphemus',
    title: 'Odysseus and Polyphemus',
    eyebrow: 'The Odyssey',
    cycle: 'After Troy',
    category: 'odyssey',
    location: 'The Cyclopes’ Coast, traditional eastern Sicily',
    coordinates: { lat: 37.5633, lng: 15.1619 },
    accuracyRadiusKm: 220,
    mapConfidence: 'traditional',
    geographyNote: 'Homer does not name Sicily; the eastern Sicilian Cyclops coast is a later and influential geographic association.',
    image: './assets/scene-polyphemus.webp',
    fallback: 'linear-gradient(125deg, #0b0c0c 0%, #49382b 48%, #8b6a45 100%)',
    prompt: 'Search the immense cave for a giant wine bowl, a fire-hardened olive stake, and sailors hidden beneath rams.',
    clues: [
      'The traveller gives his captor wine and says that his name is Nobody.',
      'The cave entrance is sealed by a stone that only its giant owner can move.',
      'The survivors escape beneath the flock instead of walking beside it.',
    ],
    options: ['Theseus and the Minotaur', 'Odysseus and Polyphemus', 'Jason and the Harpies', 'Heracles and Cacus'],
    reveal:
      'Odysseus blinds the Cyclops after naming himself “Nobody,” then escapes by fastening his companions beneath Polyphemus’s rams. His later boast brings Poseidon’s anger upon the voyage.',
    source: 'Homer — Odyssey IX',
    sourceNote: 'The Sicilian location belongs to later geographic tradition rather than a precise coordinate supplied by Homer.',
    symbol: '◌',
  },
  {
    id: 'circe',
    title: 'Odysseus and Circe',
    eyebrow: 'The Odyssey',
    cycle: 'After Troy',
    category: 'odyssey',
    location: 'Aeaea, traditional Monte Circeo association',
    coordinates: { lat: 41.232, lng: 13.055 },
    accuracyRadiusKm: 300,
    mapConfidence: 'traditional',
    geographyNote: 'Aeaea is a mythic island without secure coordinates; Monte Circeo represents one long-lived Italian association.',
    image: './assets/scene-circe.webp',
    fallback: 'linear-gradient(126deg, #10130d 0%, #3e4a2b 46%, #b08c50 100%)',
    prompt: 'Find the loom, the herb-filled cup, tame lions and wolves, swine in the court, and the white moly flower.',
    clues: [
      'Hermes gives the traveller a white-flowered herb that protects him from the cup.',
      'The missing crew have not left the palace; their shapes have been changed.',
      'The enchantress later warns the crew about the Sirens and the two dangers of the strait.',
    ],
    options: ['Medea and the Argonauts', 'Calypso and Odysseus', 'Odysseus and Circe', 'Demeter and Metaneira'],
    reveal:
      'Circe transforms Odysseus’s companions into swine, but Hermes’s moly protects the hero from her potion. She restores the crew and later becomes their guide to the dangers ahead.',
    source: 'Homer — Odyssey X–XII',
    sourceNote: 'Ancient and later authors proposed several locations for Aeaea; none is historically certain.',
    symbol: '✺',
  },
  {
    id: 'scylla-charybdis',
    title: 'Scylla and Charybdis',
    eyebrow: 'The Odyssey',
    cycle: 'After Troy',
    category: 'odyssey',
    location: 'Strait of Messina, traditional placement',
    coordinates: { lat: 38.254, lng: 15.64 },
    accuracyRadiusKm: 180,
    mapConfidence: 'traditional',
    geographyNote: 'The Strait of Messina became the dominant ancient and later identification of Homer’s opposing sea dangers.',
    image: './assets/scene-scylla-charybdis.webp',
    fallback: 'linear-gradient(124deg, #07191d 0%, #285a62 48%, #b7a16d 100%)',
    prompt: 'Turn between the cliff’s many canine shadows and the enormous whirlpool pulling foam and driftwood from the opposite side.',
    clues: [
      'Circe warns that the ship cannot avoid both dangers completely.',
      'One threat lives high in a cave; the other swallows and releases the sea.',
      'Sailors still describe impossible choices as being caught between these two names.',
    ],
    options: ['The Symplegades', 'Poseidon and Minos', 'The Flood of Deucalion', 'Scylla and Charybdis'],
    reveal:
      'Odysseus steers closer to Scylla because Charybdis could destroy the entire ship. The passage costs six companions, making the episode one of the poem’s starkest choices between unequal disasters.',
    source: 'Homer — Odyssey XII',
    sourceNote: 'The Messina identification is traditional; Homer’s poetic geography does not function as a modern nautical chart.',
    symbol: '↯',
  },
]

export type AtlasPlace = Point & {
  name: string
  type: string
  period: string
  confidence: MapConfidence
  pleiadesUrl?: string
}

export const atlasPlaces: AtlasPlace[] = [
  { name: 'Olympus', lat: 40.0856, lng: 22.3586, type: 'Gods', period: 'Mythic landscape', confidence: 'traditional', pleiadesUrl: 'https://pleiades.stoa.org/places/491677' },
  { name: 'Delphi', lat: 38.4824, lng: 22.501, type: 'Oracle', period: 'Archaic–Roman', confidence: 'attested', pleiadesUrl: 'https://pleiades.stoa.org/places/540726' },
  { name: 'Athens', lat: 37.9715, lng: 23.7267, type: 'Polis', period: 'Bronze Age–Roman', confidence: 'attested', pleiadesUrl: 'https://pleiades.stoa.org/places/579885' },
  { name: 'Knossos', lat: 35.2989, lng: 25.1603, type: 'Heroes', period: 'Bronze Age', confidence: 'attested', pleiadesUrl: 'https://pleiades.stoa.org/places/589872' },
  { name: 'Ilion / Troy', lat: 39.9575, lng: 26.2389, type: 'War', period: 'Bronze Age–Roman', confidence: 'attested', pleiadesUrl: 'https://pleiades.stoa.org/places/550595' },
  { name: 'Ithaca', lat: 38.367, lng: 20.718, type: 'Odyssey', period: 'Mythic landscape', confidence: 'traditional' },
  { name: 'Thebes', lat: 38.3192, lng: 23.3176, type: 'Tragedy', period: 'Bronze Age–Roman', confidence: 'attested' },
  { name: 'Mycenae', lat: 37.7308, lng: 22.7561, type: 'Kings', period: 'Bronze Age', confidence: 'attested' },
  { name: 'Corinth', lat: 37.9056, lng: 22.8797, type: 'Polis', period: 'Archaic–Roman', confidence: 'attested' },
  { name: 'Delos', lat: 37.4009, lng: 25.2674, type: 'Sanctuary', period: 'Archaic–Roman', confidence: 'attested' },
  { name: 'Sparta', lat: 37.0755, lng: 22.4303, type: 'Polis', period: 'Archaic–Roman', confidence: 'attested' },
  { name: 'Tainaron', lat: 36.3972, lng: 22.4772, type: 'Underworld', period: 'Mythic landscape', confidence: 'traditional' },
  { name: 'Cyclopes’ Coast', lat: 37.5633, lng: 15.1619, type: 'Odyssey', period: 'Traditional placement', confidence: 'traditional' },
  { name: 'Aeaea / Circeo', lat: 41.232, lng: 13.055, type: 'Odyssey', period: 'Traditional placement', confidence: 'traditional' },
  { name: 'Messina Strait', lat: 38.254, lng: 15.64, type: 'Odyssey', period: 'Traditional placement', confidence: 'traditional' },
]

export const ancientRegions: Array<Point & { name: string; kind: 'land' | 'sea' }> = [
  { name: 'MAGNA GRAECIA', lat: 38.9, lng: 16.2, kind: 'land' },
  { name: 'HELLAS', lat: 39.2, lng: 22.4, kind: 'land' },
  { name: 'MACEDONIA', lat: 41.05, lng: 22.7, kind: 'land' },
  { name: 'THRACE', lat: 41.75, lng: 27.0, kind: 'land' },
  { name: 'ASIA MINOR', lat: 38.8, lng: 31.0, kind: 'land' },
  { name: 'CRETE', lat: 35.15, lng: 24.6, kind: 'land' },
  { name: 'AEGEAN SEA', lat: 38.3, lng: 25.2, kind: 'sea' },
  { name: 'IONIAN SEA', lat: 37.4, lng: 18.7, kind: 'sea' },
  { name: 'SICILIA', lat: 37.6, lng: 13.7, kind: 'land' },
]

export const odysseyRoute: Point[] = [
  { lat: 39.9575, lng: 26.2389 },
  { lat: 37.5633, lng: 15.1619 },
  { lat: 41.232, lng: 13.055 },
  { lat: 40.5808, lng: 14.4296 },
  { lat: 38.254, lng: 15.64 },
  { lat: 38.367, lng: 20.718 },
]

export const collections = [
  {
    title: 'Olympians',
    count: 12,
    note: 'Power, jealousy, and sacred order',
    color: '#bf8e42',
    art: './assets/scene-prometheus.webp',
  },
  {
    title: 'Heroes',
    count: 18,
    note: 'Mortals who pay the price of victory',
    color: '#94422d',
    art: './assets/scene-medusa.webp',
  },
  {
    title: 'Monsters',
    count: 14,
    note: 'Creatures waiting at the edge of order',
    color: '#53624c',
    art: './assets/scene-labyrinth.webp',
  },
  {
    title: 'Trojan Cycle',
    count: 10,
    note: 'One war, hundreds of destinies',
    color: '#71503c',
    art: './assets/scene-trojan-horse.webp',
  },
]
