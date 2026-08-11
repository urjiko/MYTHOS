import { catalogSummary, collections } from './catalogSummary'

;(catalogSummary as unknown as { mythScenes: number }).mythScenes += 1

const heroesCollection = collections.find((collection) => collection.title === 'Heroes')
if (heroesCollection) {
  ;(heroesCollection as unknown as { count: number }).count += 1
}
