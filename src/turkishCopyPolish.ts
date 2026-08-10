import { ui } from './i18n'

type MutableSection = Record<string, unknown>

type MutableTurkishUi = {
  nav: MutableSection
  accessibility: MutableSection
  home: MutableSection
  modes: MutableSection
  collections: MutableSection
  atlas: MutableSection
  archive: MutableSection
  figures: MutableSection
  game: MutableSection
  viewer: MutableSection
  footer: MutableSection
}

export function applyTurkishCopyPolish() {
  const tr = ui.tr as unknown as MutableTurkishUi

  Object.assign(tr.nav, {
    primary: 'Ana menü',
    footer: 'Alt menü',
    begin: 'Kehaneti başlat',
  })

  Object.assign(tr.accessibility, {
    figureCategories: 'Karakter kategorileri',
  })

  Object.assign(tr.home, {
    intro: 'Tanrıların, kahramanların ve yaratıkların dünyasına adım at. İpuçlarını incele, miti tanı ve hikâyenin geçtiği yeri antik haritada işaretle.',
    randomScenes: 'oyun başına rastgele sahne',
    max: 'azami OP',
    descend: 'KEŞFE DEVAM',
    prototype: 'MYTHOS; dikkatli okumayı, mekânsal düşünmeyi ve antik kaynakları tek bir kesintisiz Yunan mitolojisi yolculuğunda buluşturur.',
    geographyText: 'Olympos’tan Troya’ya, Delphoi’den Girit’e uzanan her hikâye bir dağ, ada, kutsal alan ya da kentle ilişkilidir. Antik bağlamı keşfetmek için haritada yakınlaş, sürükle ve yer kayıtlarını aç.',
    manifesto: 'MYTHOS, Yunan mitolojisini ezberlenecek bir listeden çıkarıp keşfedilecek, oynanacak, sorgulanacak ve antik kaynaklarına kadar izlenebilecek bir dünyaya dönüştürür.',
    installIos: 'Safari’de Paylaş’a, ardından “Ana Ekrana Ekle”ye dokun. Son oynadığın mobil sahneler, bağlantının zayıf olduğu anlar için hazır tutulur.',
    installBody: 'Tam ekran açılış ve daha hızlı geri dönüş için MYTHOS’u cihazına ekle.',
  })

  Object.assign(tr.modes, {
    classicNote: 'Tam arşivden seçilen beş mit, her oyunda farklı bir sırayla karşına çıkar.',
    resumeNote: (round: number, total: number) => `${total} turluk kayıtlı yolculuğa ${round}. turdan devam et.`,
    resultsSaved: 'Tamamladığın yolculuğu ve final puanını yeniden incele.',
    odysseyNote: (count: number) => `Yalnızca Odysseia rotasından ${count} karşılaşma; sıra her oyunda yeniden karışır.`,
    iliadNote: (count: number) => `Troya çevrimi ve Homeros’un İlyada’sından ${count} karşılaşma; sıra her oyunda yeniden karışır.`,
    hippolytaNote: (count: number) => `Herakles’in dokuzuncu görevi boyunca ${count} karşılaşma; Pseudo-Apollodoros’un anlatısını izler.`,
    archiveNote: 'Tanrıları, kahramanları, yaratıkları ve onları anlatan antik kaynakları keşfet.',
  })

  Object.assign(tr.collections, {
    creaturesNote: 'Canavarlar, melez varlıklar ve ölümlü düzenin dışındakiler',
  })

  Object.assign(tr.atlas, {
    lede: 'Modern siyasi sınırlara değil, gerçek kıyı çizgilerine ve antik yer kayıtlarına dayanan gezilebilir bir harita. Belgelenmiş yerler, sonraki dönem gelenekleri ve bütünüyle mitolojik konumlar birbirinden ayrılır.',
    routeText: 'Troya’dan İthaka’ya uzanan bu rota birebir bir denizcilik haritası değildir. Antik coğrafya, epik şiir ve yüzyıllar boyunca yapılan yorumlar burada üst üste gelir.',
  })

  Object.assign(tr.archive, {
    lede: (count: number) => `Arşivde şu anda ${count} oynanabilir hikâye var. Yeni panoramik sahneler araştırılıp üretildikçe arşiv büyümeye devam edecek.`,
    showing: (visible: number, total: number) => `${total} hikâyenin ${visible} tanesi gösteriliyor`,
    planned: 'OYNANABİLİR HİKÂYELER',
    openStory: 'Hikâyenin tamamını aç',
    storyTitle: 'MİTİN HİKÂYESİ',
    charactersTitle: 'KARAKTERLER VE İLİŞKİLER',
    charactersHeading: 'Bu hikâyede kim kimdir?',
    charactersLede: 'Her karakter dosyası; kişinin hikâyedeki rolünü, aile bağlarını, müttefiklerini, rakiplerini ve antik geleneğin aktardığı ayırt edici özelliklerini açıklar.',
    facts: 'TEMEL İLİŞKİLER VE ÖZELLİKLER',
  })

  Object.assign(tr.figures, {
    kicker: 'KARAKTERLER VE VARLIKLAR',
    heroesLede: 'Oynanabilir hikâyelerde yer alan ölümlüler, savaşçılar, hükümdarlar ve gezginler.',
    creaturesLede: 'Canavarlar, melezler, ölümsüz varlıklar ve kişileştirilmiş tehlikeler. Hepsi düşman değildir, hatta hepsi canavar da değildir.',
    appears: 'YER ALDIĞI HİKÂYELER',
    facts: 'KISA BİLGİLER',
  })

  Object.assign(tr.game, {
    guideKicker: 'OYUN REHBERİ',
    guideTitle: 'Hikâyeyi gör. Yerini bul.',
    guideLede: 'İlk turda süre, bu rehberi kapatıp panorama ile harita hazır olduktan sonra başlar. Her tur için 75 saniyen var.',
    guideHelpLede: 'Oyunun kısa özeti burada. Hazır olduğunda sahneye dön; aktif turun süresi bu ekran açıkken durmaz.',
    guideLive: 'Tur başladıysa yardım ekranı açıkken süre işlemeye devam eder.',
    guideLookTitle: 'Sahneyi incele',
    guideLookBody: 'Panoramayı sürükle veya ok tuşlarını kullan. İpuçları 360° sahnenin farklı noktalarına dağılmıştır.',
    guideAnswerTitle: 'Miti belirle',
    guideAnswerBody: 'Dört seçenekten doğru miti seç. Masaüstünde A–D tuşlarını da kullanabilirsin.',
    guideMapTitle: 'Hikâyenin yerini bul',
    guideMapBody: 'Antik haritayı sürükleyip yakınlaştır, ardından işaretini bırak. Hedef tek bir piksel değil, kabul edilen bir bölgedir.',
    guideScoreTitle: 'Puanını koru',
    guideScoreBody: 'Süre dolmadan miti ve yeri gönder. Kehanet ipuçları işini kolaylaştırır fakat ipucusuz tamamlama bonusunu azaltır.',
    guideBegin: '75 saniyelik turu başlat',
    guideWaiting: 'Sayaç oyun rehberinin kapanmasını bekliyor',
    fate: 'Kader',
    remember: 'seni hatırlayacak.',
    identified: 'Doğru bilinen mit',
    mastery: 'Başarı',
    reportEvenTitle: 'Dört beceri dengede',
    reportEvenNote: 'Dört beceri birbirine çok yakın. Bir sonraki gelişim için en düşük yüzdeli alana odaklan.',
    reportBalancedTitle: 'Belirgin bir zayıf alan yok',
    reportBalancedNote: 'Dört beceri de %90’ın üzerinde. Bundan sonrası eksik kapatmak değil, isabeti ve hızı daha da geliştirmek.',
    reportRecognition: 'Mit tanıma',
    reportGeography: 'Coğrafi isabet',
    reportSpeed: 'Karar hızı',
    reportOracle: 'İpucu kullanımı',
    reportRecognitionStrength: 'Anlatıdaki ipuçlarını doğru mitlerle tutarlı biçimde eşleştirdin.',
    reportRecognitionFocus: 'Kaçırdığın sahnelerdeki karakterleri, nesneleri ve dönüşümleri yeniden incele.',
    reportGeographyStrength: 'Hikâyeleri kabul gören mitolojik bölgelerine yakın yerleştirdin.',
    reportGeographyFocus: 'Aşağıdaki yerleri Atlas’ta aç ve her hikâyeyi içinde bulunduğu geniş coğrafyayla ilişkilendir.',
    reportSpeedStrength: 'Aktif süreyi verimli kullanarak turları zamanında tamamladın.',
    reportSpeedFocus: 'Önce sahneyi hızlıca tara, sonra kararını ver. Süre dolduğunda tamamlanmamış seçimler puan kazandırmaz.',
    reportOracleStrength: 'Sahneleri az ipucuyla çözerek kehanet bonusunu korudun.',
    reportOracleFocus: 'Yeni bir ipucu istemeden önce panoramayı bir kez daha tara. Her ek ipucu kesinlik kazandırırken bonusundan götürür.',
    reportTitle: 'Kehanetin sana ne gösterdiğine bak.',
    reportOverview: (review: number, total: number, timeouts: number, averageDistance: number | null) => {
      const reviewNote = review === 0
        ? `${total} turun tamamında performansın dengeliydi.`
        : `${total} turun ${review} tanesinde geliştirebileceğin belirgin bir alan var.`
      const timeoutNote = timeouts === 0 ? '' : ` ${timeouts} turda süre doldu.`
      return averageDistance === null
        ? `${reviewNote}${timeoutNote} Coğrafi ortalama hesaplanamadı.`
        : `${reviewNote}${timeoutNote} Haritadaki tahminlerin referans noktasından ortalama ${averageDistance} km uzaktaydı.`
    },
    reportDimensions: 'Puan bileşenlerine göre genel performans',
    reportMetric: (label: string, percentage: number) => `${label}: %${percentage}`,
    reportRoundsTitle: 'Tur bazında değerlendirme',
    reportRoundsLede: 'Her işaret, ham puanı en düşük bileşeni değil; o bileşenin kendi azami puanına göre en zayıf kaldığın alanı gösterir.',
    reportDistance: (distance: number) => `Referans noktasından ${distance} km uzakta`,
    ask: 'Kehanetten ipucu al',
    preserved: '+1.000 OP bonusu korunuyor',
    whispers: 'KEHANET FISILTIYOR',
    journeyRestored: 'YOLCULUK GERİ YÜKLENDİ',
    journeyRestoredNote: (round: number, total: number) => `${total} turun ${round}. turu ve yaptığın seçimler geri yüklendi.`,
    startFresh: 'Yeni bir yolculuk başlat',
    dismissRestore: 'Geri yükleme bildirimini kapat',
    roundPreparingNote: '75 saniyelik sayaç, panorama ve harita hazır olduğunda başlar.',
    roundRestoringNote: 'Panorama ve harita yeniden yüklenirken kayıtlı süren işlemeye devam eder.',
    timeoutNote: 'Tamamladığın seçimler puanlandı; eksik kalan seçimler sıfır puan aldı.',
    make: 'KEHANETİNİ TAMAMLA',
    inside: 'Bu sahne hangi mite ait?',
    where: 'Bu hikâye antik haritada nerede geçiyor?',
    mobileOpenMap: 'Haritada yer seç',
    mobileChangeMap: 'Seçilen yeri değiştir',
    mobileSceneBack: 'Sahneye dön',
    mobileMapBack: 'Mit seçimine dön',
    mobileMapTitle: 'Hikâyeyi haritaya yerleştir',
    pinPlaced: 'İşareti taşımak için haritada başka bir noktaya dokun. Tam koordinat gerekmez; kabul edilen bölgenin içinde tam coğrafya puanı alabilirsin.',
    pinEmpty: 'Haritayı sürükle veya yakınlaştır, sonra hikâyenin geçtiğini düşündüğün yere dokun. Tam puan tek bir koordinata değil, kabul edilen bölgeye göre hesaplanır.',
    seal: 'Yanıtı mühürle',
    sealReady: 'MİT VE YER HAZIR',
    sealWaiting: 'ÖNCE MİT VE YER SEÇ',
    correct: 'MİT DOĞRU',
    wrong: 'MİT YANLIŞ',
    fullCredit: (radius: number) => `Referans noktasının ${radius} km çevresindeki tahminler tam coğrafya puanı alır.`,
    final: 'Final puanını gör',
    next: 'Sonraki tur',
  })

  Object.assign(tr.viewer, {
    aria: '360° mit sahnesi. Bakış yönünü sürükleyerek veya ok tuşlarıyla değiştirebilir; görünümü iki parmakla, fare tekerleğiyle ya da artı/eksi denetimleriyle yakınlaştırıp uzaklaştırabilirsin.',
    loading: '360° sahne hazırlanıyor…',
    error: '360° görünüm açılamadı · düz önizleme gösteriliyor',
    drag: '360° · sürükle · iki parmakla yakınlaştır/uzaklaştır',
    zoom: 'Yakınlaştırma ve uzaklaştırma denetimleri',
    heading: 'Yön',
    fieldOfView: 'Görüş açısı',
    reset: 'Görüşü sıfırla',
  })

  Object.assign(tr.footer, {
    tagline: 'Yunan mitolojisini keşfetmenin oynanabilir bir yolu.',
    credit: 'ÖZGÜN GÖRSELLER VE KOD',
  })
}
