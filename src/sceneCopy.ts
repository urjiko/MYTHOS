import type { MythScene } from './data'
import type { Locale } from './i18n'

export const sceneCluesTr: Record<string, readonly [string, string, string]> = {
  labyrinth: [
    'Bu ip, onu taşıyan kişinin çıkış yolunu yeniden bulabilmesi için bırakıldı.',
    'Bu saray Kral Minos’un yönettiği adadadır.',
    'Yaratık yarı insan, yarı boğadır.',
  ],
  medusa: [
    'Kahraman hedefini yalnızca kalkanındaki yansımadan izler.',
    'Athena ona parlak bir kalkan, Hermes ise kıvrık bir kılıç vermiştir.',
    'Canavarın saçları canlı yılanlardan oluşur.',
  ],
  sirens: [
    'Mürettebatın kulakları balmumuyla kapatılmıştır.',
    'Kaptan şarkıyı duymak istediği için kendisini gemi direğine bağlatır.',
    'Bu olay Troya’dan İthaka’ya dönüş yolculuğunda yaşanır.',
  ],
  'trojan-horse': [
    'Kuşatmayı sürdüren ordu kıyıdan kaybolmuş, geride yalnızca bir armağan bırakmıştır.',
    'Laokoon bu nesnenin kente sokulmaması gerektiğini savunmuştur.',
    'İçinde saklanan savaşçılar gece kapıları açacaktır.',
  ],
  prometheus: [
    'Çalınan şey insan uygarlığının başlangıcını simgeler.',
    'Hırsız, Kafkaslar’da zincire vurulacak bir Titan’dır.',
    'Bir kartal her gün yeniden oluşan karaciğerini yiyecektir.',
  ],
  'apollo-python': [
    'Bu kutsal alan Yunan dünyasının en ünlü kehanet merkezine dönüşecektir.',
    'Genç tanrı, büyük yılan bekçisiyle yüzleşerek burayı sahiplenir.',
    'Zaferi, kehanetin ve oyunların Pythia adıyla anılmasında yaşar.',
  ],
  cicones: [
    'Kenti aldıktan sonra mürettebat ayrılma emrini dinlemez ve kıyıda ziyafete devam eder.',
    'Maron adlı bir rahip yolcuya, daha sonra bir Kyklop mağarasında işe yarayacak güçlü bir şarap verir.',
    'Troya’nın müttefiki olan bu Trakya kentinin halkı içeriden gelen takviyelerle geri döner.',
  ],
  'lotus-eaters': [
    'Ada halkı barışçıldır; fakat yiyecekleri eve dönme arzusunu tamamen eritir.',
    'Kaptan etkilenen gözcüleri zorla gemiye sürükler ve kürek sıralarının altına bağlar.',
    'Bu karşılaşma, filoyu Malea Burnu’ndan uzaklaştıran fırtınanın ardından gelir.',
  ],
  aeolus: [
    'Rüzgârların bekçisi bütün tehlikeli rüzgârları öküz derisi bir torbaya kapatır ve yalnızca batı rüzgârını serbest bırakır.',
    'Eve yaklaşmışken mürettebat kapalı armağanı hazine sanıp kaptan uyurken açar.',
    'Bronz duvarlı adaya ikinci geliş, yeni bir kurtuluşla değil reddedilişle sonuçlanır.',
  ],
  laestrygonians: [
    'Bir kaptan dışında herkes gemisini dik kayalıklarla çevrili, dar girişli limanın içine bağlar.',
    'Burada yaşayan dev yamyamlar yukarıdan kayalar fırlatarak gemileri parçalar.',
    'Yalnızca limanın dışında bağlı duran gemi, kaptanı halatı kestiğinde kaçabilir.',
  ],
  polyphemus: [
    'Yolcu tutsak edene şarap verir ve adının “Hiç Kimse” olduğunu söyler.',
    'Mağaranın ağzı yalnızca dev sahibinin oynatabildiği bir kayayla kapalıdır.',
    'Hayatta kalanlar sürünün yanında yürümek yerine hayvanların altına saklanarak kaçar.',
  ],
  circe: [
    'Hermes yolcuya, kadehin etkisinden koruyan beyaz çiçekli bir bitki verir.',
    'Kaybolan mürettebat saraydan ayrılmamıştır; yalnızca biçimleri değiştirilmiştir.',
    'Büyücü daha sonra Sirenler ile boğazdaki iki tehlike hakkında uyarıda bulunur.',
  ],
  'scylla-charybdis': [
    'Kirke, geminin iki tehlikeyi birden bütünüyle atlatamayacağını söyler.',
    'Tehditlerden biri yüksek bir mağarada yaşar, diğeri denizi yutup geri püskürtür.',
    'Denizciler hâlâ imkânsız seçimleri bu iki adın arasında kalmakla anlatır.',
  ],
  underworld: [
    'Yolcu ölülerin konuşabilmesi için bir hendeğe süt, bal, şarap, su ve kan döker.',
    'Teiresias yolculukta bekleyen tehlikeleri bildirir ve Güneş’in sığırlarına dokunulmaması gerektiğini söyler.',
    'Elpenor gömülmeyi ister; yolcu ayrıca annesi Antikleia’nın gölgesiyle karşılaşır.',
  ],
  'cattle-helios': [
    'Sürüler Güneş’e aittir ve kötü hava ne kadar uzun sürerse sürsün onlara zarar verilmemelidir.',
    'Kaptan uyurken aç denizciler en iyi hayvanları kurban eder ve yaptıklarını ibadet gibi göstermeye çalışır.',
    'Lampetie suçu haber verir; gemi ayrıldıktan sonra Zeus onu yıldırımla yok eder.',
  ],
  calypso: [
    'Adanın ölümsüz hâkimi konuğuna yaşlanmayan bir yaşam önerir; fakat yolcu hâlâ evini özler.',
    'Hermes, Zeus’un tutsağın serbest bırakılması emriyle gelir.',
    'Yedi yılın ardından ağaçları keser ve Phaiaklara doğru götürecek salı yapar.',
  ],
  phaeacians: [
    'Bir prenses ve hizmetçileri, çamaşır yıkadıkları nehir kıyısında kazazede yabancıyı bulur.',
    'Kral Alkinoos’un sarayında ozan Demodokos Troya’yı anlatınca kimliğini saklayan konuk ağlamaya başlar.',
    'Ev sahipleri uyuyan yolcuyu, denizde yolunu kendisi bilen bir gemiyle yurduna götürür.',
  ],
  homecoming: [
    'Dönen kral kendi salonuna kılık değiştirerek girer; onu hemen yalnızca yaşlı köpek Argos tanır.',
    'Penelope, kayıp kralın yayını kurup on iki balta başının arasından ok geçiren kişiyle evleneceğini bildirir.',
    'Karı kocanın bildiği bir sır—kök salmış zeytin ağacının çevresine yapılan yatak—kimliğini kanıtlar.',
  ],
  daphne: [
    'Altın bir ok tanrıda arzu uyandırırken kurşun bir ok kovalanan nymphenin onu reddetmesine yol açar.',
    'Kovalamaca sona yaklaşırken nymphe nehir tanrısı babası Peneus’a seslenir.',
    'Dönüşümü, defnenin neden Apollon’a kutsal sayıldığını ve şairlerle galipleri taçlandırdığını açıklar.',
  ],
  echo: [
    'Hera konuşkan bir dağ nymphesini yalnızca başkasının söylediği son sözleri yineleyebilmekle sınırlar.',
    'Ceza bir aldatmacanın sonucudur: uzun konuşmalar Zeus’un yanındaki nymphelere kaçacak zaman kazandırmıştır.',
    'Narkissos onu reddettikten sonra bedeni kayaya dönüşür; geriye yalnızca yanıt veren sesi kalır.',
  ],
  'pegasus-birth': [
    'Medusa yenildiği anda beyaz kanatlı bir at ile savaşçı Khrysaor birlikte ortaya çıkar.',
    'Hesiodos, atın adını Okeanos’un pınarları yanındaki doğumuyla ilişkilendirir.',
    'Yeni doğan yaratık daha sonra Olympos’a yükselir ve Zeus’un gök gürültüsüyle yıldırımını taşır.',
  ],
  chimera: [
    'Canavar aslan gövdesinin önünü, sırtından yükselen keçiyi ve yılan kuyruğunu bir araya getirir.',
    'Kral Iobates kahramanı Lykia’da imkânsız olması gereken bir savaşa gönderir.',
    'Bellerophon Pegasus’a binerek yukarıdan saldırır; geç gelenekte mızrağındaki kurşun yaratığın ateşinde erir.',
  ],
  'judgement-paris': [
    'Eris, Peleus ile Thetis’in düğününe altın bir ödül atarak şöleni yarışmaya dönüştürür.',
    'Hermes; Hera, Athena ve Aphrodite’yi İda Dağı’nda çobanlık yapan Troyalı bir prense götürür.',
    'Kazanan teklif krallık ya da savaş zaferi değil, Helene’nin eli olur.',
  ],
  'iphigenia-aulis': [
    'Akha donanmasının tamamı, Troya’ya taşıyacak rüzgâr çıkmadığı için limanda kalır.',
    'Agamemnon kızını Akhilleus’la evleneceğini söyleyerek kampa getirir.',
    'Etkili bir anlatıda Artemis kızı uzaklaştırır ve yerine bir geyik bırakır.',
  ],
  'hector-andromache': [
    'Çocuk bronz miğfer ile at kılından sorgucundan korkar; babası miğferi çıkarıp gülümser.',
    'Kapıdaki kadın babasını ve kardeşlerini daha önce Akhilleus’un elinde kaybetmiştir.',
    'Savaşçı Troya’nın düşebileceğini bilir; yine de utanç ve görev duygusunun surların gerisinde kalmasına izin vermediğini söyler.',
  ],
  'patroclus-falls': [
    'Bir savaşçı Akha gemilerini kurtarmak için savaşa, cephede olmayan dostunun zırhıyla girer.',
    'Apollon arkadan vurur ve ödünç miğferi tozların içine yuvarlar.',
    'Önce Euphorbos yaralar, ardından Hektor son darbeyi vurur ve Akhilleus’u yeniden savaşa çeker.',
  ],
  'achilles-hector': [
    'Kovalanan savunucu düşmanına dönmeden önce kendi kentinin çevresini üç kez dolaşır.',
    'Athena Deiphobos’un kılığına girerek kardeşinin yanında savaşacağına inanmasını sağlar.',
    'Pelion mızrağı düelloyu bitirmeden önce Zeus iki kaderi altın terazide tartar.',
  ],
  'priam-achilles': [
    'Yaşlı bir kral Hermes’in rehberliğinde düşman kampına girer ve oğlunu öldüren adamın ellerini öper.',
    'Akhilleus’tan kendi babası Peleus’u hatırlamasını ister; yas, savaşçının öfkesini kırar.',
    'Fidye Hektor’un bedenini geri getirir ve İlyada’yı kapatan ateşkesi sağlar.',
  ],
  'orpheus-eurydice': [
    'Bir müzisyenin ezgisi ölüler ülkesinin hükümdarlarını, imkânsız bir dönüşe izin vermeye ikna etmiştir.',
    'Koşul basittir: ikisi de yeryüzüne çıkana kadar arkasına dönüp bakmamalıdır.',
    'Son eşikte kuşku Orpheus’u yener ve Eurydike ikinci kez kaybedilir.',
  ],
  'oedipus-sphinx': [
    'Yaratık tek sesi olduğu hâlde önce dört, sonra iki, en sonunda üç destekle yürüyenin ne olduğunu sorar.',
    'Yanıt insandır: bebekken emekler, yetişkinlikte dik yürür, yaşlılıkta bastona dayanır.',
    'Bilmeceyi çözmek Oidipus’a Thebai tahtını kazandırır; aynı zamanda kaçmaya çalıştığı kadere daha da yaklaştırır.',
  ],
  'lernaean-hydra': [
    'Kesilen her ölümlü başın kökü yakılmazsa yerine iki baş çıkar.',
    'Iolaos ateşle yardım ederken Hera’nın gönderdiği dev bir yengeç kahramanın ayağına saldırır.',
    'Eurystheus, Herakles görevi tek başına tamamlamadığı için bu işi saymayı reddeder.',
  ],
  'midas-gold': [
    'Kral kayıp Silenos’u geri götürünce Dionysos ona bir ödül verir.',
    'Başta dokunduğu her şeyin dönüşmesi mucize gibi görünür; sonra yiyecek ve içecek ağzına varmadan katılaşır.',
    'Kral gücü Paktolos’ta yıkayarak uzaklaştırmalıdır; bu da ırmağın efsanevi altın kumlarını açıklar.',
  ],
  'apollo-marsyas': [
    'Athena’yla ilişkilendirilen, terk edilmiş çift aulos Phrygialı bir rakibin çalgısı olur.',
    'Rakibi lir, müzik, kehanet ve Delphoi yayının tanrısıdır.',
    'Kelainai’yi gezen antik ziyaretçilere nehir mağarası ile yarışmanın acı sonunu koruduğu söylenen yerel bir kalıntı gösterilirdi.',
  ],
  'niobe-sipylus': [
    'Bir kraliçe çok sayıdaki çocuğunun onu Apollon ile Artemis’in annesinden daha talihli yaptığını söyler.',
    'Tanrısal ikizler bu hakarete oklarla karşılık verir; antik yazarlar çocukların ve hayatta kalanların sayısında ayrılır.',
    'Felaketten sonra anne Sipylos’a döner ve durmadan ağlayan bir taşa dönüşür.',
  ],
  'selene-endymion': [
    'Olağanüstü güzellikteki bir ölümlüyü Ay’ın kişileşmiş tanrıçası sever.',
    'Zeus bir seçim sunduğunda sonsuz uykuda ölümsüz ve yaşlanmadan kalmayı ister.',
    'Herakleia halkı onun Latmos Dağı’na çekildiğini söyler ve orada kutsal alanını korurdu.',
  ],
  'hylas-nymphs': [
    'Genç bir yol arkadaşı akşam yemeği için su almaya, bronz bir kapla Argonaut kampından ayrılır.',
    'Bir pınar nymphesi onu dolunayda görür ve suya çeker.',
    'Herakles Mysia ormanlarında o kadar uzun arar ki Argo onsuz yola çıkar.',
  ],
  'arachne-athena': [
    'İki dokuma yalnızca ustalıklarıyla değil, tanrıların nasıl gösterildiğiyle de yargılanır.',
    'Ölümlü dokumacı hiçbir tanrıçanın kendisini geçemeyeceğini söyler; Athena yaşlı bir kadın kılığında gelir.',
    'Hikâye, mekik ile iğin düşmesi ve dokumacının örümceğe dönüşmesiyle sona erer.',
  ],
  'salmacis-hermaphroditus': [
    'Yolcunun adı, anne ve babası Hermes ile Aphrodite’nin adlarını birleştirir.',
    'Karia’daki berrak pınarın nymphesi, sularına giren gence tutulur.',
    'Nymphenin ikisinin bir daha ayrılmaması dileği, iki bedeni tek bir biçimde birleştirir.',
  ],
  'hero-leander': [
    'Gece yanan bir kandil, dar boğazın karşı kıyısından yüzen gence yol gösterir.',
    'Aphrodite rahibesi Sestos’ta, sevgilisi ise karşıdaki Abydos’ta yaşar.',
    'Kış fırtınası ışığı söndürünce yüzücü karanlık akıntıda yönünü kaybeder.',
  ],
  'hippolyta-girdle': [
    'Dokuzuncu görev, Ares’in bir Amazon kraliçesine verdiği savaş kuşağını getirmektir.',
    'Kraliçe önce kuşağı isteyerek vermeyi kabul eder.',
    'Hera kılık değiştirip yabancıların kraliçeyi kaçıracağını söyleyince barışçıl buluşma savaşa dönüşür.',
  ],
  'leto-lycians': [
    'Kucağında tanrısal ikizleri taşıyan gezgin anne, berrak bir gölden yalnızca bir yudum su ister.',
    'Kamış toplayan köylüler onu reddeder ve suyu bilerek çamurlandırır.',
    'Lanet onları gölde kalıp kurbağa gibi vıraklamaya mahkûm eder.',
  ],
  'telephus-achilles': [
    'Akhalar Mysia’ya çıkar, burayı yanlışlıkla Troya sanır ve ülkeyi yağmalamaya başlar.',
    'Bölgenin kralı bir asmaya takılır ve Pelion mızrağıyla yaralanır.',
    'Daha sonra aynı mızrağın pası yarayı iyileştirir; kral da filoya Troya yolunu gösterir.',
  ],
  'attis-great-mother': [
    'Phrygialı genç Pessinus’a bir kral kızıyla evlenmek üzere gelir.',
    'Agdistis düğünde belirince kutlama tanrısal bir çılgınlığa dönüşür.',
    'Pişman olan güç, gencin bedeninin çürümemesi için bir söz alır; herdem yeşil çam onun anısını taşır.',
  ],
  'io-flight': [
    'Hera’nın gönderdiği at sineği Argoslu bir rahibeyi ülkeden ülkeye sürükler.',
    'Boynuzlu, inek biçimli gezgin Avrupa ile Asya’yı ayıran boğazdan geçer.',
    'Bosporos adı halk etimolojisinde “inek geçidi” olarak açıklanır.',
  ],
}

export function localiseSceneClues(
  scene: Pick<MythScene, 'id' | 'clues'>,
  locale: Locale,
): readonly string[] {
  if (locale === 'en') return scene.clues
  return sceneCluesTr[scene.id] ?? scene.clues
}
