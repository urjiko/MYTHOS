import { catalogSummary, collections } from './catalogSummary'

;(catalogSummary as unknown as { mythScenes: number; atlasPlaces: number }).mythScenes += 1
;(catalogSummary as unknown as { mythScenes: number; atlasPlaces: number }).atlasPlaces += 1

const olympiansCollection = collections.find((collection) => collection.title === 'Olympians')
if (olympiansCollection) {
  ;(olympiansCollection as unknown as { count: number }).count += 1
}
