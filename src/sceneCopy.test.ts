import { describe, expect, it } from 'vitest'
import { mythScenes } from './data'
import { localiseSceneClues, sceneCluesTr } from './sceneCopy'

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
})
