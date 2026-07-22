import { useEffect, useState } from 'react'
import { collections } from './data'
import {
  ArrowRight,
  BookOpen,
  Compass,
  Game,
  IconForMode,
  Logo,
  Map,
  Menu,
  MythMap,
  Ornament,
  Sparkles,
  Swords,
  Trophy,
  X,
} from './components'

type View = 'home' | 'game' | 'atlas' | 'archive'

const modes = [
  { type: 'daily', title: 'Günün Kehaneti', note: 'Her gün aynı beş mit. Tek şans, tek skor.', badge: 'YENİ' },
  { type: 'journey', title: 'Klasik Yolculuk', note: 'Beş rastgele sahne. Kaderini özgürce dene.' },
  { type: 'duel', title: 'Tanrıların Düellosu', note: 'İkinci fazda canlı 1v1 karşılaşmalar.', badge: 'YAKINDA' },
  { type: 'archive', title: 'Mit Kütüphanesi', note: 'Tanrıları, kahramanları ve yaratıkları keşfet.' },
]

function FateDisk() {
  return (
    <div className="fate-disk" aria-hidden="true">
      <div className="fate-disk__aura" />
      <div className="fate-disk__orbit fate-disk__orbit--outer">
        <span>OLYMPOS</span><span>DELPHI</span><span>TROIA</span><span>KNOSSOS</span>
      </div>
      <div className="fate-disk__orbit fate-disk__orbit--middle" />
      <div className="fate-disk__face">
        <div className="fate-disk__sun" />
        <span className="fate-disk__symbol fate-disk__symbol--one">ϟ</span>
        <span className="fate-disk__symbol fate-disk__symbol--two">Ψ</span>
        <span className="fate-disk__symbol fate-disk__symbol--three">☿</span>
        <span className="fate-disk__symbol fate-disk__symbol--four">☾</span>
        <div className="fate-disk__eye"><i /></div>
      </div>
      <span className="fate-pin fate-pin--one"><i />Olimpos</span>
      <span className="fate-pin fate-pin--two"><i />Truva</span>
      <span className="fate-pin fate-pin--three"><i />Girit</span>
    </div>
  )
}

function Header({ onNavigate }: { onNavigate: (view: View) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <button className="logo-button" onClick={() => onNavigate('home')}><Logo /></button>
      <nav className={open ? 'is-open' : ''} aria-label="Ana navigasyon">
        <button onClick={() => { onNavigate('archive'); setOpen(false) }}>Kütüphane</button>
        <button onClick={() => { onNavigate('atlas'); setOpen(false) }}>Atlas</button>
        <a href="#manifesto" onClick={() => setOpen(false)}>Hakkında</a>
        <button className="nav-play" onClick={() => { onNavigate('game'); setOpen(false) }}><Sparkles size={15} /> Kehanete başla</button>
      </nav>
      <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Menüyü aç veya kapat">
        {open ? <X /> : <Menu />}
      </button>
    </header>
  )
}

function Home({ onNavigate }: { onNavigate: (view: View) => void }) {
  const [best, setBest] = useState(0)
  useEffect(() => setBest(Number(localStorage.getItem('mythos-best-score') || 0)), [])

  return (
    <>
      <Header onNavigate={onNavigate} />
      <main>
        <section className="hero">
          <div className="hero__noise" />
          <div className="hero__copy">
            <span className="kicker"><span className="kicker__line" /> İLK KEHANET SENİ BEKLİYOR</span>
            <h1>Efsanenin<br /><em>içine gir.</em></h1>
            <p>Tanrıların, kahramanların ve canavarların dünyasına adım at. İpuçlarını oku, miti tanı ve kadim haritadaki yerini bul.</p>
            <div className="hero__actions">
              <button className="button button--terracotta" onClick={() => onNavigate('game')}>
                Kehanete başla <ArrowRight size={17} />
              </button>
              <button className="button button--ghost" onClick={() => onNavigate('atlas')}>
                Mitolojik atlas <Map size={17} />
              </button>
            </div>
            <div className="hero__meta">
              <span><strong>5</strong> sahne / oyun</span>
              <span><strong>50.000</strong> azami KP</span>
              <span><strong>{best ? best.toLocaleString('tr-TR') : '—'}</strong> kişisel rekor</span>
            </div>
          </div>
          <div className="hero__visual"><FateDisk /></div>
          <div className="hero__scroll"><span /> AŞAĞI İN</div>
        </section>

        <section className="modes section-shell">
          <div className="section-heading">
            <span className="kicker">KADERİNİ SEÇ</span>
            <h2>Her yolculuk bir<br /><em>kehanetle başlar.</em></h2>
            <p>İlk sürümde klasik ve günlük oyun aynı sağlam puanlama çekirdeğini kullanıyor. Düello, oyuncu tabanı oluşmadan eklenmeyecek.</p>
          </div>
          <div className="mode-grid">
            {modes.map((mode, index) => (
              <button
                key={mode.title}
                className={`mode-card ${index > 1 ? 'mode-card--muted' : ''}`}
                onClick={() => index < 2 ? onNavigate('game') : index === 3 ? onNavigate('archive') : undefined}
              >
                <span className="mode-card__number">0{index + 1}</span>
                <span className="mode-card__icon"><IconForMode type={mode.type} /></span>
                {mode.badge && <small>{mode.badge}</small>}
                <h3>{mode.title}</h3>
                <p>{mode.note}</p>
                <i><ArrowRight size={17} /></i>
              </button>
            ))}
          </div>
        </section>

        <section className="collections">
          <div className="section-shell">
            <div className="section-heading section-heading--row">
              <div><span className="kicker">MİT KÜTÜPHANESİ</span><h2>Ölümsüz hikâyeler,<br /><em>ölümlü zaaflar.</em></h2></div>
              <button className="text-link" onClick={() => onNavigate('archive')}>Tüm koleksiyonu gör <ArrowRight size={16} /></button>
            </div>
            <div className="collection-grid">
              {collections.map((collection) => (
                <article className="collection-card" key={collection.title} style={{ '--accent': collection.color } as React.CSSProperties}>
                  <img src={collection.art} alt="" onError={(event) => { event.currentTarget.style.display = 'none' }} />
                  <div className="collection-card__veil" />
                  <span>{collection.count} ANLATI</span>
                  <div><h3>{collection.title}</h3><p>{collection.note}</p></div>
                  <ArrowRight />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="atlas-preview section-shell">
          <div className="atlas-preview__copy">
            <span className="kicker">KUTSAL COĞRAFYA</span>
            <h2>Efsaneler boşlukta<br /><em>yaşanmadı.</em></h2>
            <p>Olimpos’tan Truva’ya, Delfi’den Girit’e… Her anlatı bir dağın, adanın veya kentin hafızasına bağlandı. Haritadaki noktaları açarak birbirine geçen mitleri izle.</p>
            <div className="atlas-preview__stats">
              <span><strong>08</strong><small>Başlangıç noktası</small></span>
              <span><strong>05</strong><small>Oynanabilir mit</small></span>
              <span><strong>01</strong><small>Yaşayan atlas</small></span>
            </div>
            <button className="button button--ink" onClick={() => onNavigate('atlas')}>Atlası keşfet <Compass size={17} /></button>
          </div>
          <div className="atlas-preview__map">
            <div className="browser-bar"><i /><i /><i /><span>MYTHOS / ATLAS</span></div>
            <MythMap />
            <span className="atlas-preview__legend">TANRILAR · KAHRAMANLAR · YARATIKLAR</span>
          </div>
        </section>

        <section className="manifesto" id="manifesto">
          <Ornament />
          <span className="manifesto__symbol">Ω</span>
          <blockquote>“Mitler geçmişte kalmış yalanlar değil;<br /><em>insanın kendine anlattığı en eski gerçeklerdir.</em>”</blockquote>
          <p>MYTHOS; Yunan mitolojisini bir ezber listesi olmaktan çıkarıp keşfedilebilir, oynanabilir ve kaynakları görülebilir bir dünyaya dönüştürür.</p>
          <button className="button button--gold" onClick={() => onNavigate('game')}>İlk kehanetini yap <ArrowRight size={17} /></button>
        </section>
      </main>
      <Footer onNavigate={onNavigate} />
    </>
  )
}

function AtlasPage({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <div className="inner-page">
      <Header onNavigate={onNavigate} />
      <main className="inner-page__main section-shell">
        <span className="kicker">KUTSAL COĞRAFYA</span>
        <h1>Mitolojik <em>Atlas</em></h1>
        <p className="inner-page__lede">Tarihî kesinlik iddiası değil; antik metinlerde ve sonraki gelenekte oluşan mitolojik coğrafyanın yaşayan bir taslağı.</p>
        <div className="atlas-page__layout">
          <MythMap />
          <aside>
            <span>SEÇİLİ ROTA</span>
            <h2>Odysseus’un dönüşü</h2>
            <p>Truva’dan İthaka’ya uzanan rota, gerçek bir seyir haritası değildir. Antik coğrafya, şiir ve yüzyıllar boyunca yapılan yorumlar burada üst üste gelir.</p>
            <ol>
              <li><i>01</i> Truva <small>Savaşın sonu</small></li>
              <li><i>02</i> Siren Kayalıkları <small>Yasak şarkı</small></li>
              <li><i>03</i> İthaka <small>Eve dönüş</small></li>
            </ol>
            <button className="button button--terracotta" onClick={() => onNavigate('game')}>Rotayı oyna <ArrowRight size={17} /></button>
          </aside>
        </div>
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  )
}

function ArchivePage({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <div className="inner-page">
      <Header onNavigate={onNavigate} />
      <main className="inner-page__main section-shell">
        <span className="kicker">MİT KÜTÜPHANESİ</span>
        <h1>Kadim <em>anlatılar</em></h1>
        <p className="inner-page__lede">Şimdilik beş oynanabilir anlatı var. Yeni panorama eklendikçe kütüphane büyüyecek; boş kartlarla kalabalık görünmeye çalışmayacak.</p>
        <div className="archive-page__filters">
          <button className="is-active">Tümü</button><button>Tanrılar</button><button>Kahramanlar</button><button>Canavarlar</button><button>Truva</button>
        </div>
        <div className="archive-page__grid">
          {collections.map((collection, index) => (
            <article key={collection.title} style={{ '--accent': collection.color } as React.CSSProperties}>
              <div><img src={collection.art} alt="" onError={(event) => { event.currentTarget.style.display = 'none' }} /><span>0{index + 1}</span></div>
              <small>{collection.count} PLANLANAN ANLATI</small>
              <h2>{collection.title}</h2>
              <p>{collection.note}</p>
              <button onClick={() => onNavigate('game')}>İlk sahneyi oyna <ArrowRight size={15} /></button>
            </article>
          ))}
        </div>
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  )
}

function Footer({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <footer className="site-footer">
      <div><Logo inverse /><p>Yunan mitolojisini keşfetmenin oynanabilir yolu.</p></div>
      <nav><button onClick={() => onNavigate('game')}>Oyna</button><button onClick={() => onNavigate('atlas')}>Atlas</button><button onClick={() => onNavigate('archive')}>Kütüphane</button><a href="#manifesto">Hakkında</a></nav>
      <span>MYTHOS · PROTOTİP 0.1<br />ÖZGÜN GÖRSEL VE KOD</span>
    </footer>
  )
}

export default function App() {
  const [view, setView] = useState<View>('home')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [view])

  if (view === 'game') return <Game onExit={() => setView('home')} />
  if (view === 'atlas') return <AtlasPage onNavigate={setView} />
  if (view === 'archive') return <ArchivePage onNavigate={setView} />
  return <Home onNavigate={setView} />
}
