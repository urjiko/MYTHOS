import { catalogSummary, collections } from './catalogSummary'
import { mythScenes, type MythScene } from './data'
import { sceneCluesTr, sceneDetailsTr } from './sceneCopy'
import prometheusBoundPanorama from './prometheusBoundPanorama'

const scene: MythScene = {
  id: 'prometheus-bound',
  title: 'Prometheus Bound',
  eyebrow: 'Titan Cycle',
  cycle: 'Olympian Order',
  category: 'gods',
  location: 'The Caucasus, mythic eastern frontier',
  coordinates: { lat: 42.5, lng: 44.5 },
  accuracyRadiusKm: 220,
  mapConfidence: 'mythic',
  geographyNote: 'Aeschylus opens on a remote Scythian crag, while later mythography explicitly places Prometheus on the Caucasus. The pin is a regional mythic anchor, not a historical site.',
  image: `data:image/jpeg;base64,${prometheusBoundPanorama}`,
  fallback: 'linear-gradient(126deg, #111823 0%, #4b4237 47%, #d89143 100%)',
  prompt: 'Find the divine chains, the exposed mountain crag, the descending eagle, Zeus’s storm, and the distant human fires that explain the punishment.',
  clues: [
    'A Titan is fastened to a remote mountain because he defied Zeus for the sake of mortals.',
    'The gift at the heart of his crime is fire, stolen back for humankind after Zeus withheld it.',
    'An eagle repeatedly attacks the prisoner until a later hero ends the torment.',
  ],
  options: ['Prometheus Bound', 'Atlas Bears the Sky', 'The Punishment of Tantalus', 'Sisyphus and the Stone'],
  reveal: 'After giving fire to mortals and challenging Zeus’s authority, Prometheus is chained to a remote crag. In the wider tradition an eagle repeatedly feeds on his regenerating liver until Heracles eventually kills the bird and frees him.',
  source: 'Aeschylus — Prometheus Bound; Hesiod — Theogony 521–616; Apollodorus — Bibliotheca I.7.1',
  sourceNote: 'Aeschylus dramatizes the chaining on a remote Scythian crag; later mythography identifies the punishment with the Caucasus and preserves the eagle-and-Heracles sequence.',
  symbol: '⛓',
}

if (!mythScenes.some((item) => item.id === scene.id)) mythScenes.push(scene)

sceneCluesTr[scene.id] = [
  'Bir Titan, ölümlüler uğruna Zeus’a karşı geldiği için uzak bir dağa zincirlenir.',
  'Suçunun merkezindeki armağan, Zeus’un insanlardan esirgediği ve onun yeniden çaldığı ateştir.',
  'Bir kartal mahkûma tekrar tekrar saldırır; işkenceyi daha sonra başka bir kahraman sona erdirecektir.',
]

sceneDetailsTr[scene.id] = {
  location: 'Kafkaslar, mitolojik doğu sınırı',
  geographyNote: 'Aiskhylos sahneyi uzak bir İskit kayalığında açar; daha sonraki mitograflar Prometheus’un cezasını açıkça Kafkaslar’a yerleştirir. Harita işareti tarihsel bir nokta değil, bölgesel ve mitolojik bir referanstır.',
  reveal: 'Prometheus, insanlara ateşi verdiği ve Zeus’un otoritesine meydan okuduğu için uzak bir kayalığa zincirlenir. Daha geniş anlatı geleneğinde bir kartal her gün yeniden oluşan karaciğerini parçalar; Herakles daha sonra kartalı öldürerek bu işkenceyi sona erdirir.',
  sourceNote: 'Aiskhylos zincire vurulma sahnesini uzak bir İskit kayalığında anlatır; sonraki mitografi cezayı Kafkaslar’la özdeşleştirir ve kartal ile Herakles bölümünü aktarır.',
}

;(catalogSummary as unknown as { mythScenes: number }).mythScenes = mythScenes.length
const olympiansCollection = collections.find((collection) => collection.title === 'Olympians')
if (olympiansCollection) {
  ;(olympiansCollection as unknown as { count: number }).count += 1
}
