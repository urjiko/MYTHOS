import './registerDaidalosIkaros'
import './registerPrometheusBound'
import './registerFiveIconicMyths'
import { mythScenes, type MythScene } from './data'
import { figureProfiles } from './figures'

export type ArchiveFilter = 'all' | 'gods' | 'heroes' | 'creatures' | 'odyssey' | 'trojan'

const creatureSceneIds = new Set(
  figureProfiles
    .filter((profile) => profile.category === 'creatures')
    .flatMap((profile) => profile.appearanceIds),
)

export function archiveScenesForFilter(
  filter: ArchiveFilter,
  scenes: readonly MythScene[] = mythScenes,
) {
  if (filter === 'all') return [...scenes]
  if (filter === 'creatures') return scenes.filter((scene) => creatureSceneIds.has(scene.id))
  return scenes.filter((scene) => scene.category === filter)
}
