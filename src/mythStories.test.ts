import { describe, expect, it } from 'vitest'
import { mythScenes } from './data'
import { segmentStoryCharacters } from './mythCharacters'
import { localiseMythStory, splitStorySentences } from './mythStories'

describe('post-round myth stories', () => {
  it('gives every scene a five-sentence story in both languages', () => {
    for (const locale of ['en', 'tr'] as const) {
      mythScenes.forEach((scene) => {
        const story = localiseMythStory(scene, locale)
        expect(splitStorySentences(story), `${scene.id} (${locale})`).toHaveLength(5)
      })
    }
  })

  it('keeps source, map and archaeology commentary outside the result story', () => {
    const metadataTerms = /Homer|Hesiod|Ovid|Apollodorus|Pausanias|ancient author|ancient visitor|map pin|archaeolog|tradition|poem|Homeros|Hesiodos|Ovidius|Apollodoros|antik yazar|antik ziyaretçi|harita|iğne|arkeolojik|gelenek|şiir/iu

    for (const locale of ['en', 'tr'] as const) {
      mythScenes.forEach((scene) => {
        expect(localiseMythStory(scene, locale), `${scene.id} (${locale})`).not.toMatch(metadataTerms)
      })
    }
  })

  it('offers at least one interactive character profile in every story', () => {
    for (const locale of ['en', 'tr'] as const) {
      mythScenes.forEach((scene) => {
        const profiles = segmentStoryCharacters(localiseMythStory(scene, locale), locale)
          .filter((segment) => segment.character)
        expect(profiles.length, `${scene.id} (${locale})`).toBeGreaterThan(0)
      })
    }
  })
})
