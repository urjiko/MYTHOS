import { useEffect, useState } from 'react'
import { Download, Share2, X } from 'lucide-react'
import { ui, type Locale } from './i18n'
import { isAppleMobileDevice, isStandaloneApp } from './pwa'
import { readStoredValue, writeStoredValue } from './storage'

const INSTALL_HINT_STORAGE_KEY = 'mythos-install-hint-v1-dismissed'

type DeferredInstallPrompt = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

type StandaloneNavigator = Navigator & {
  standalone?: boolean
}

export default function InstallPrompt({ locale }: { locale: Locale }) {
  const copy = ui[locale].home
  const [prompt, setPrompt] = useState<DeferredInstallPrompt | null>(null)
  const [isIos, setIsIos] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const navigatorWithStandalone = navigator as StandaloneNavigator
    const standalone = isStandaloneApp(
      window.matchMedia('(display-mode: standalone)').matches,
      Boolean(navigatorWithStandalone.standalone),
    )
    if (standalone || readStoredValue(INSTALL_HINT_STORAGE_KEY) === '1') return

    const appleMobile = isAppleMobileDevice({
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      maxTouchPoints: navigator.maxTouchPoints,
    })
    if (appleMobile) {
      setIsIos(true)
      setVisible(true)
    }

    const offerInstall = (event: Event) => {
      event.preventDefault()
      setPrompt(event as DeferredInstallPrompt)
      setVisible(true)
    }
    const hideAfterInstall = () => {
      writeStoredValue(INSTALL_HINT_STORAGE_KEY, '1')
      setVisible(false)
    }

    window.addEventListener('beforeinstallprompt', offerInstall)
    window.addEventListener('appinstalled', hideAfterInstall)
    return () => {
      window.removeEventListener('beforeinstallprompt', offerInstall)
      window.removeEventListener('appinstalled', hideAfterInstall)
    }
  }, [])

  function dismiss() {
    writeStoredValue(INSTALL_HINT_STORAGE_KEY, '1')
    setVisible(false)
  }

  async function install() {
    if (!prompt) return
    await prompt.prompt()
    await prompt.userChoice
    dismiss()
  }

  if (!visible) return null

  return (
    <aside className="install-hint" aria-label={copy.installLabel}>
      <span className="install-hint__icon" aria-hidden="true">
        {isIos ? <Share2 size={19} /> : <Download size={19} />}
      </span>
      <div>
        <strong>{copy.installTitle}</strong>
        <p>{isIos ? copy.installIos : copy.installBody}</p>
      </div>
      {prompt && (
        <button className="install-hint__action" type="button" onClick={() => void install()}>
          {copy.installAction}
        </button>
      )}
      <button className="install-hint__dismiss" type="button" onClick={dismiss} aria-label={copy.installDismiss}>
        <X size={18} />
      </button>
    </aside>
  )
}
