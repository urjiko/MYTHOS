import { describe, expect, it } from 'vitest'
import { mythScenes } from './data'
import {
  localiseSceneClues,
  localiseScenePresentation,
  sceneCluesTr,
  sceneDetailsTr,
} from './sceneCopy'

describe('scene clue localisation', () => {
  it('has a complete Turkish clue set for every playable myth', () => {
    expect(Object.keys(sceneCluesTr)).toHaveLength(mythScenes.length)

    mythScenes.forEach((scene) => {
      expect(sceneCluesTr[scene.id]).toHaveLength(scene.clues.length)
      expect(sceneCluesTr[scene.id]).not.toEqual(scene.clues)
    })
  })

  it('switches only the displayed copy and preserves canonical English data', () => {
    const scene = mythScenes.find((item) => item.id === 'daphne')
    expect(scene).toBeDefined()
    if (!scene) return

    expect(localiseSceneClues(scene, 'tr')).toEqual(sceneCluesTr.daphne)
    expect(localiseSceneClues(scene, 'en')).toBe(scene.clues)
  })

  it('has complete Turkish result and archive copy for every playable myth', () => {
    expect(Object.keys(sceneDetailsTr)).toHaveLength(mythScenes.length)

    mythScenes.forEach((scene) => {
      const details = sceneDetailsTr[scene.id]
      const presentation = localiseScenePresentation(scene, 'tr')
      expect(details).toBeDefined()
      expect(details.geographyNote).not.toBe(scene.geographyNote)
      expect(details.reveal).not.toBe(scene.reveal)
      expect(details.sourceNote).not.toBe(scene.sourceNote)
      expect(presentation.cycle).not.toBe(scene.cycle)
      expect(presentation.source).not.toBe(scene.source)
    })
  })

  it('translates compound source names without reprocessing translated words', () => {
    const scene = mythScenes.find((item) => item.id === 'apollo-python')
    expect(scene).toBeDefined()
    if (!scene) return

    const source = localiseScenePresentation(scene, 'tr').source
    expect(source).toContain('Apollon’a Homeros İlahisi')
    expect(source).not.toContain('Homerosos')
  })
})
