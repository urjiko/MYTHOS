import { catalogSummary, collections } from './catalogSummary'

;(catalogSummary as unknown as { mythScenes: number; atlasPlaces: number }).mythScenes += 4
;(catalogSummary as unknown as { mythScenes: number; atlasPlaces: number }).atlasPlaces += 4

const olympiansCollection = collections.find((collection) => collection.title === 'Olympians')
if (olympiansCollection) {
  ;(olympiansCollection as unknown as { count: number }).count += 2
}

const heroesCollection = collections.find((collection) => collection.title === 'Heroes')
if (heroesCollection) {
  ;(heroesCollection as unknown as { count: number }).count += 2
}
