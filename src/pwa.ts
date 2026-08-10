export type AppleDeviceSignals = {
  userAgent: string
  platform?: string
  maxTouchPoints?: number
}

export function isAppleMobileDevice({ userAgent, platform = '', maxTouchPoints = 0 }: AppleDeviceSignals) {
  return /iPad|iPhone|iPod/i.test(userAgent)
    || (platform === 'MacIntel' && maxTouchPoints > 1)
}

export function isStandaloneApp(displayModeMatches: boolean, navigatorStandalone = false) {
  return displayModeMatches || navigatorStandalone
}

export function registerMythosServiceWorker() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return

  window.addEventListener('load', () => {
    void navigator.serviceWorker.register(
      `${import.meta.env.BASE_URL}service-worker.js`,
      { scope: import.meta.env.BASE_URL, updateViaCache: 'none' },
    ).catch(() => {
      // The game remains fully usable when private browsing or policy blocks workers.
    })
  }, { once: true })
}
