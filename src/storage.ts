export type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

export function getBrowserStorage(): StorageLike | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage
  } catch {
    return null
  }
}

export function readStoredValue(
  key: string,
  storage: StorageLike | null = getBrowserStorage(),
) {
  if (!storage) return null
  try {
    return storage.getItem(key)
  } catch {
    return null
  }
}

export function writeStoredValue(
  key: string,
  value: string,
  storage: StorageLike | null = getBrowserStorage(),
) {
  if (!storage) return false
  try {
    storage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

export function removeStoredValue(
  key: string,
  storage: StorageLike | null = getBrowserStorage(),
) {
  if (!storage) return false
  try {
    storage.removeItem(key)
    return true
  } catch {
    return false
  }
}

export function readStoredNumber(
  key: string,
  fallback = 0,
  storage: StorageLike | null = getBrowserStorage(),
) {
  const encoded = readStoredValue(key, storage)
  if (encoded === null) return fallback
  const value = Number(encoded)
  return Number.isFinite(value) ? value : fallback
}
