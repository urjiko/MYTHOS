import { describe, expect, it } from 'vitest'
import { readStoredNumber, readStoredValue, removeStoredValue, writeStoredValue } from './storage'

function memoryStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial))
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value) },
    removeItem: (key: string) => { values.delete(key) },
  }
}

describe('safe browser storage', () => {
  it('reads, writes, and removes values', () => {
    const storage = memoryStorage()

    expect(writeStoredValue('mythos-test', '42', storage)).toBe(true)
    expect(readStoredValue('mythos-test', storage)).toBe('42')
    expect(removeStoredValue('mythos-test', storage)).toBe(true)
    expect(readStoredValue('mythos-test', storage)).toBeNull()
  })

  it('returns a numeric fallback for missing or malformed scores', () => {
    const storage = memoryStorage({ valid: '12500', malformed: 'oracle' })

    expect(readStoredNumber('valid', 0, storage)).toBe(12_500)
    expect(readStoredNumber('missing', 7, storage)).toBe(7)
    expect(readStoredNumber('malformed', 7, storage)).toBe(7)
  })

  it('never throws when browser storage is blocked', () => {
    const blocked = {
      getItem: () => { throw new Error('blocked') },
      setItem: () => { throw new Error('blocked') },
      removeItem: () => { throw new Error('blocked') },
    }

    expect(readStoredValue('x', blocked)).toBeNull()
    expect(writeStoredValue('x', 'y', blocked)).toBe(false)
    expect(removeStoredValue('x', blocked)).toBe(false)
  })
})
