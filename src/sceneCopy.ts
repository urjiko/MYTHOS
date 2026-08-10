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
  'admete-request': [
    'İstenen kuşak, Ares’in bir Amazon kraliçesine verdiği ve yetkesini simgeleyen armağandır.',
    'Dokuzuncu görev Herakles’i Ege üzerinden doğuya, Thermodon’a gönderir.',
    'Yolculuk Themiskyra’ya varmadan önce Paros ve Mysia’dan geçecektir.',
  ],
  'paros-crisis': [
    'Geminin yanındaki iki boş kalkan, karaya çıktıktan sonra kaybedilen yoldaşları gösterir.',
    'Ölümler Hippolyta’nın kuşağını alma yolculuğunu kesintiye uğratır.',
    'Çatışma sona erince Alkaios ile Sthenelos Paros’tan Herakles’le birlikte ayrılır.',
  ],
  'heracles-mygdon': [
    'Ele geçirilen toprak zaferden sonra Herakleia adını alır.',
    'Kral Lykos toprak kazanırken sefer güvenilir bir ev sahibi ve müttefik kazanır.',
    'Herakles ile yoldaşları Themiskyra’ya doğru doğu yolculuğunu sürdürür.',
  ],
  'hippolyta-girdle': [
    'Dokuzuncu görev, Ares’in bir Amazon kraliçesine verdiği savaş kuşağını getirmektir.',
    'Kraliçe önce kuşağı isteyerek vermeyi kabul eder.',
    'Kısa bir süre için görev, zor kullanmak yerine konukseverlikle sonuçlanacak gibi görünür.',
  ],
  'hera-amazons': [
    'Silahlı biniciler yabancıların gemisine doğru atılınca barışçıl söz bozulur.',
    'Bu anlatıda Herakles, Hippolyta’nın kendisine ihanet ettiğini sanarak onu öldürür ve kuşağı alır.',
    'Sefer kıyıya kadar savaşarak Themiskyra’dan denize açılır.',
  ],
  'hesione-rescue': [
    'Laomedon kızı kurtarıldıktan sonra söz verdiği kısrakları vermeyi reddeder.',
    'Herakles öcünü erteler; fakat daha sonra bozulan yemini cezalandırmak için geri döner.',
    'Sefer Troya’dan ayrılır ve sonunda Hippolyta’nın kuşağını Eurystheus’a teslim eder.',
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
  'ganymedes-zeus': [
    'Olympos’ta Ganymedes ölümsüzlüğe kavuşur ve tanrıların sakisi olarak altın kâseyi eline alır.',
    'Tros, Zeus Troyalı krala acıyıncaya dek oğlunun kayboluşunun yasını tutar.',
    'Hermes karşılık olarak görkemli ölümsüz atlar getirir ve Tros’a oğlunun asla yaşlanmayacağını söyler.',
  ],
}

type SceneDetails = Pick<MythScene, 'location' | 'geographyNote' | 'reveal' | 'sourceNote'>

export const sceneDetailsTr: Record<string, SceneDetails> = {
  labyrinth: {
    location: 'Knossos, Girit',
    geographyNote: 'Mit Knossos’la ilişkilendirilir; arkeolojik saray anlatıdaki labirentin kendisi değildir.',
    reveal: 'Ariadne’nin ipi sayesinde Theseus, Daidalos’un tasarladığı labirentten çıkar. Mit Knossos’a bağlanır; ancak kazılmış saray ile efsanevi labirent aynı yer değildir.',
    sourceNote: 'Antik anlatılar bazı ayrıntılarda uyuşmaz.',
  },
  medusa: {
    location: 'Okeanos’un uzak batı sınırı',
    geographyNote: 'Antik şiir Gorgonları uzak batıya yerleştirir; bu iğne kazılmış bir alanı değil, mitik bir yönü gösterir.',
    reveal: 'Perseus, Medusa’nın bakışından kaçınmak için parlak kalkanı ayna gibi kullanır. Antik yazarlar Gorgonları hayal edilen dünyanın uzak batı sınırına yakın bir yere koyar.',
    sourceNote: 'Haritadaki iğne açıkça mitik bir konumlandırmadır; tarihsel kesinlik iddiası taşımaz.',
  },
  sirens: {
    location: 'Siren Kayalıkları, geleneksel Campania konumu',
    geographyNote: 'Homeros kesin koordinat vermez; sonraki gelenek Sirenleri çoğunlukla Campania açıklarındaki adalarla özdeşleştirir.',
    reveal: 'Kirke’nin uyarısını izleyen Odysseus, tayfasının kulaklarını balmumuyla kapatır ve kendisini gemi direğine bağlatır. Böylece Sirenlerin şarkısını duyup hayatta kalır.',
    sourceNote: 'Sirenlerin kesin yeri antik ve modern yorumlar arasında değişir.',
  },
  'trojan-horse': {
    location: 'İlion / Troya, Anadolu',
    geographyNote: 'İğne, antik İlion/Troya ile özdeşleştirilen Hisarlık höyüğünü gösterir.',
    reveal: 'Tahta at hilesi Troya’nın düşüşüne ilişkin en ünlü anlatıdır. Homeros olaya dolaylı biçimde değinir; en tanınmış ayrıntılı anlatım Vergilius’un Aeneis’inde yer alır.',
    sourceNote: 'Troya geleneği, aralarında yüzyıllar bulunan Yunan ve Roma katmanlarını birleştirir.',
  },
  prometheus: {
    location: 'Olympos Dağı',
    geographyNote: 'İğne, tanrıların yurdu için Yunan geleneğindeki baskın konum olan Olympos Dağı’nı gösterir.',
    reveal: 'Prometheus, dev bir rezene sapında köz saklayarak ateşi yeniden ölümlülere ulaştırır. Cezası hem hırsızlığa hem de Zeus’un yeni düzenine meydan okuyuşuna karşılıktır.',
    sourceNote: 'Aiskhylos geleneği Prometheus’u uygarlığın kurucularından biri hâline getirir.',
  },
  'apollo-python': {
    location: 'Delphoi, Phokis',
    geographyNote: 'İğne, Phaidriades kayalıklarının altındaki Delphoi kutsal alanını gösterir.',
    reveal: 'Apollon’a Homeros İlahisi, Apollon’un yılanı yenerek Delphoi kutsal alanını nasıl kurduğunu anlatır. Öykü, kâhinin ve festivalin Pythia adıyla anılmasını açıklar.',
    sourceNote: 'Kutsal alan gerçektir; çatışma ve kronolojisi mitik bir köken açıklamasıdır.',
  },
  cicones: {
    location: 'Ismaros, Trakya’da bölgesel konum',
    geographyNote: 'Homeros Ismaros’un adını verir; ancak kesin yeri bulunamamıştır. İğne, antik Ismaris Gölü yakınındaki olası bölgeyi gösterir.',
    reveal: 'Odysseus Troya’dan ayrıldıktan sonra Ismaros’u yağmalar, fakat tayfasını yola çıkmaya ikna edemez. Takviye alan Kikonlar saldırganları denize sürer; bu, yolculuğun ölçüsüzlükten doğan ilk ağır kaybıdır.',
    sourceNote: 'Kent şiirde adlandırılır; antik yer güvenle saptanamadığı için haritadaki bölgesel konum yaklaşıktır.',
  },
  'lotus-eaters': {
    location: 'Lotus Yiyenlerin Ülkesi, geleneksel Cerbe ilişkisi',
    geographyNote: 'Homeros kesin koordinat vermez; antik çağda Lotophagitis diye bilinen Cerbe daha sonraki bir geleneksel eşleştirmedir.',
    reveal: 'Lotus, Odysseus’un gözcülerini öldürmez; yolculuk amaçlarını unutturur. Odysseus, tayfanın geri kalanı da tatmadan önce onları zorla gemiye bindirir.',
    sourceNote: 'Cerbe konumu Homeros’un belirlediği bir yer değil, coğrafi geleneğin ürünüdür.',
  },
  aeolus: {
    location: 'Aiolia, geleneksel Lipari ilişkisi',
    geographyNote: 'Homeros yüzen, tunç duvarlı bir ada anlatır; Lipari Adaları daha sonraki geleneksel eşleştirmeyi temsil eder.',
    reveal: 'Aiolos, Odysseus’a ters yöndeki rüzgârları içinde tutan bir torba verir. Kuşkulu tayfa İthaka’ya çok yaklaşmışken torbayı açar ve serbest kalan fırtına gemiyi yeniden Aiolia’ya sürükler.',
    sourceNote: 'Lipari, Aiolia için geleneksel bir adaydır; Homeros’un olağanüstü yüzen adası tarihsel bir yer gibi haritalanamaz.',
  },
  laestrygonians: {
    location: 'Telepylos, geleneksel Formiae ilişkisi',
    geographyNote: 'Homeros’un Telepylos’u güvenle konumlandırılamaz; antik ve sonraki gelenek bölümü Formiae ile ilişkilendirir.',
    reveal: 'Laistrygonlar filoyu Telepylos limanında tuzağa düşürüp Odysseus’un gemisi dışındaki bütün gemileri kayalarla parçalar. Gemisini limanın dışına bağlaması son tekneyi kurtarır.',
    sourceNote: 'Formiae geleneksel bir özdeşleştirmedir; Homeros’un Telepylos’u için kesin bir koordinat değildir.',
  },
  polyphemus: {
    location: 'Kykloplar Kıyısı, geleneksel Doğu Sicilya',
    geographyNote: 'Homeros Sicilya’nın adını vermez; Doğu Sicilya’daki Kyklop kıyısı daha sonraki, etkili bir coğrafi eşleştirmedir.',
    reveal: 'Odysseus kendisini “Hiç Kimse” diye tanıttıktan sonra Kyklop’u kör eder; arkadaşlarını Polyphemos’un koçlarının altına bağlayarak kaçırır. Ardından övünmesi Poseidon’un öfkesini yolculuğun üzerine çeker.',
    sourceNote: 'Sicilya konumu Homeros’un verdiği kesin bir koordinattan değil, sonraki coğrafi gelenekten gelir.',
  },
  circe: {
    location: 'Aiaia, geleneksel Monte Circeo ilişkisi',
    geographyNote: 'Aiaia güvenilir koordinatları olmayan mitik bir adadır; Monte Circeo, uzun ömürlü İtalya eşleştirmelerinden biridir.',
    reveal: 'Kirke, Odysseus’un arkadaşlarını domuza dönüştürür; Hermes’in verdiği moly ise kahramanı iksirden korur. Kirke tayfayı eski hâline getirir ve ilerideki tehlikeler konusunda onlara yol gösterir.',
    sourceNote: 'Antik ve sonraki yazarlar Aiaia için çeşitli yerler önerir; hiçbiri tarihsel olarak kesin değildir.',
  },
  'scylla-charybdis': {
    location: 'Messina Boğazı, geleneksel konum',
    geographyNote: 'Messina Boğazı, Homeros’un karşılıklı iki deniz tehlikesi için antik çağdan beri baskın özdeşleştirme olmuştur.',
    reveal: 'Odysseus, Kharybdis bütün gemiyi yok edebileceği için Skylla’ya daha yakın geçer. Altı arkadaşını yitirdiği bu bölüm, şiirin eşit olmayan iki felaket arasındaki en sert seçimlerinden biridir.',
    sourceNote: 'Messina eşleştirmesi gelenekseldir; Homeros’un şiirsel coğrafyası modern bir seyir haritası değildir.',
  },
  underworld: {
    location: 'Ölüler Ülkesi, Ephyra / Akheron üzerinden gösterim',
    geographyNote: 'Homeros ölüleri Okeanos’un ötesine koyar. Akheron iğnesi, şiirden çıkarılmış kesin bir koordinat değil, Yunan ritüeli ve coğrafyasındaki bir benzeridir.',
    reveal: 'Kirke’nin talimatlarını izleyen Odysseus, Okeanos’u geçip ölüler için ayin yapar. Teiresias eve dönüşün koşullarını bildirir; Elpenor, Antikleia ve düşmüş kahramanlarla karşılaşmalar yolculuğu hafıza ve ölümlülükle hesaplaşmaya dönüştürür.',
    sourceNote: 'Ephyra ile Akheron, sonraki Yunan geleneğinde yeraltı dünyasının coğrafi benzeridir; Homeros’un Ölüler Ülkesi’nin kesin yeri değildir.',
  },
  'cattle-helios': {
    location: 'Thrinakia, geleneksel Sicilya ilişkisi',
    geographyNote: 'Homeros Thrinakia’nın adını verir ama onu güvenle Sicilya’yla özdeşleştirmez; ada antik ve sonraki gelenekte öne çıkan bir eşleştirme olmuştur.',
    reveal: 'Yinelenen uyarılara rağmen Eurylochos, aç tayfayı Helios’un kutsal sığırlarını kesmeye ikna eder. Zeus, Güneş’in adalet talebine gemiyi parçalayarak karşılık verir ve Odysseus yolculuğun tek sağ kalanı olur.',
    sourceNote: 'Sicilya, Homeros coğrafyasındaki tartışmasız bir koordinat değil, Thrinakia için geleneksel bir özdeşleştirmedir.',
  },
  calypso: {
    location: 'Ogygia, geleneksel Gozo ilişkisi',
    geographyNote: 'Ogygia güvenilir koordinatları olmayan olağanüstü bir adadır; Gozo, Akdeniz’de uzun süredir önerilen birkaç adaydan biridir.',
    reveal: 'Kalypso, Odysseus’u Ogygia’da ağırlar ve ona ölümsüzlük önerir; o ise İthaka’ya uzanan belirsiz, ölümlü yolculuğu seçer. Ancak Hermes’in getirdiği Zeus buyruğu Kalypso’yu ayrılışına yardım etmeye zorlar.',
    sourceNote: 'Gozo eşleştirmesi geleneksel ve tartışmalıdır; Homeros’un Ogygia’sı modern haritada güvenle konumlandırılamaz.',
  },
  phaeacians: {
    location: 'Skheria, geleneksel Korkyra ilişkisi',
    geographyNote: 'Skheria güvenle konumlandırılamaz; günümüzde Korfu olan Korkyra, Akdeniz geleneğindeki baskın eşleştirme olmuştur.',
    reveal: 'Nausikaa’nın iyiliği Odysseus’u Alkinoos ile Arete’nin sarayına götürür; Odysseia’nın büyük bölümünü oluşturan maceralarını ilk kez burada anlatır. Phaiaklar daha sonra onu uyurken İthaka’ya taşır.',
    sourceNote: 'Korkyra, şiirin tartışmasız biçimde belirlediği bir yer değil, Skheria için geleneksel bir adaydır.',
  },
  homecoming: {
    location: 'İthaka, geleneksel Homeros özdeşleştirmesi',
    geographyNote: 'İthaka gerçek ve antik bir adadır; şiirdeki saray ile bütün coğrafi ayrıntılar kazılmış tek bir noktaya bağlanamaz.',
    reveal: 'İthaka’ya dönen Odysseus, Penelope’nin yay yarışmasını kazanıp kimliğini açıklamadan önce dostlarını ve düşmanlarını sınar. Son tanıma işareti kahramanlık değil, evlerinin merkezindeki zeytin köklü yatağa ilişkin ortak sırdır.',
    sourceNote: 'Harita antik İthaka’yı gösterir; şiirdeki sarayın kesin yeri ve tarihselliği tartışmalıdır.',
  },
  daphne: {
    location: 'Tempe Vadisi, geleneksel Peneios ilişkisi',
    geographyNote: 'Ovidius, Daphne’nin babasını ırmak tanrısı Peneios olarak adlandırır. Tempe, anlatı için geleneksel bir Peneios coğrafyasıdır; kazılmış bir olay yeri değildir.',
    reveal: 'Apollon Eros’un yayını küçümseyince Eros iki okla karşılık verir: arzu için altın, kaçınma için kurşun. Daphne kovalamacadan defneye dönüşerek kurtulur; Apollon da ağacı kutsal simgesi ilan eder.',
    sourceNote: 'Günümüze ulaşan en ayrıntılı anlatı Roma dönemindendir; Tempe ve Peneios konumu arkeolojik değil, edebî ve gelenekseldir.',
  },
  echo: {
    location: 'Thespiai ve Helikon Dağı, Boiotia',
    geographyNote: 'Ovidius öyküyü genel olarak Boiotia’nın şiirsel coğrafyası Aonia’ya yerleştirir. İğne, kazılmış bir olay yerini değil, Helikon eteklerindeki Thespiai’yi gösterir.',
    reveal: 'Ekho, başka nymphaların kaçabilmesi için Hera’yı bitmeyen konuşmalarla oyalar. Hera onun bağımsız sözünü alır ve yalnızca duyduğu son kelimeleri bırakır. Narkissos’un reddinden sonra bedeni silinir; geriye adını taşıyan yankı kalır.',
    sourceNote: 'Günümüze ulaşan en tanınmış anlatı Ovidius’a aittir. Eski Yunancadaki Ēkhō doğal olguyu da kişileştirir; öykü bir köken anlatısıdır, dilbilimsel kanıt değildir.',
  },
  'pegasus-birth': {
    location: 'Gorgonların Kıyısı, mitik Batı Okeanosu',
    geographyNote: 'Hesiodos doğumu dünyanın uzak sınırında, Okeanos’un kaynakları yanına yerleştirir. Batıdaki bu iğne tarihsel coğrafyayı değil, şiirsel yönü gösterir.',
    reveal: 'Perseus ölümlü Gorgon’u öldürdüğünde Pegasus ile Khrysaor birlikte ortaya çıkar. Hesiodos mucizevi doğumu Okeanos kıyısına koyar; Pegasus daha sonra Olympos’a ulaşır ve Bellerophon anlatısından ayrılmaz hâle gelir.',
    sourceNote: 'Batı konumu bilinçli biçimde mitiktir; antik kaynaklar Pegasus’un sonraki maceralarının sırasında farklılaşır.',
  },
  chimera: {
    location: 'Yanartaş / Khimaira Dağı, Lykia',
    geographyNote: 'Yanartaş, sürekli yanan gerçek bir doğal gaz alanıdır. Khimaira ile özdeşleştirilmesi antik ve sonraki bir coğrafi gelenektir; savaşın burada gerçekleştiğini kanıtlamaz.',
    reveal: 'Bellerophon, ateş püskürten Khimaira’ya Pegasus’un üzerinden saldırarak Iobates’in ölümcül görevinden sağ çıkar. Lykia kıyısının üstündeki Yanartaş alevleri zamanla canavarla en güçlü biçimde ilişkilendirilen coğrafya olur.',
    sourceNote: 'Mit antiktir; dağın günümüzdeki Yanartaş’la tam olarak özdeşleştirilmesi geleneksel bir yorumdur.',
  },
  'judgement-paris': {
    location: 'İda Dağı, Troas',
    geographyNote: 'İda Dağı gerçek ve antik kaynaklarda belgelenmiş bir dağdır. Yargı sahnesi Troya Savaşı’nın mitik başlangıcına aittir.',
    reveal: 'Hera hükümdarlık, Athena zafer, Aphrodite ise Helene’yi önerir. Paris kararını Aphrodite’den yana verir ve tanrısal rekabeti Troya Savaşı’nın en ünlü başlangıcına dönüştürür.',
    sourceNote: 'Kayıp Kypria daha geniş başlangıç öyküsünü anlatıyordu. Günümüze ulaşan özetler ve sonraki derlemeler her ayrıntıda uyuşmaz.',
  },
  'iphigenia-aulis': {
    location: 'Aulis, Boiotia',
    geographyNote: 'Aulis, seferle ilişkilendirilen belgelenmiş bir antik yerleşimdir. Kurban ve yerine geyik bırakılması edebî geleneğe aittir.',
    reveal: 'Kalkhas, Artemis’in donanmayı ancak Agamemnon kızını sunduğunda bırakacağını söyler. Ps.-Apollodoros’un aktardığı anlatıda Artemis bir geyik bırakıp İphigeneia’yı uzaklaştırır.',
    sourceNote: 'Antik anlatılar İphigeneia’nın öldüğü, kurtarıldığı veya ölümsüz bir varlığa dönüştüğü konusunda ayrılır.',
  },
  'hector-andromache': {
    location: 'Skai Kapısı, İlion / Troya',
    geographyNote: 'Arkeolojik höyük antik İlion’la özdeşleştirilir. Homeros’un Skai Kapısı’nın kesin yeri ve biçimi saptanamaz.',
    reveal: 'Hektor miğferini çıkarır, Astyanaks’ı kucaklar ve oğlunun kendisini aşması için dua eder. Andromakhe’nin yakarışı onu savaştan alıkoyamaz; sahne bir savaş destanının içindeki aile vedasına dönüşür.',
    sourceNote: 'Sahne Homeros’a aittir; Troya kapısının ve giysilerin görsel yeniden kurulumu yoruma dayalıdır.',
  },
  'patroclus-falls': {
    location: 'İlion dışındaki Troya Ovası',
    geographyNote: 'Sahne Troya çevresindeki ovada geçer; şiir savaşın kesin noktasını modern bir iğneyle göstermeye izin vermez.',
    reveal: 'Patroklos Troyalıları gemilerden uzaklaştırır; ancak Akhilleus’un koyduğu sınırı aşıp Troya’ya ilerler. Apollon üstünlüğünü elinden alır, Euphorbos onu yaralar ve Hektor saldırıyı tamamlar.',
    sourceNote: 'Homeros sorumluluğu basit bir düello olarak değil, bir tanrı ile iki ölümlü saldırgan arasında paylaştırır.',
  },
  'achilles-hector': {
    location: 'İlion / Troya surlarının dışı',
    geographyNote: 'Düello Troya surları dışında, Skai Kapısı ve pınarlar yakınında geçer; Homeros coğrafyasındaki kesin konum tartışmalıdır.',
    reveal: 'Troya’nın çevresinde üç kez döndükten sonra Hektor, Athena’nın Deiphobos kılığıyla yaptığı aldatmaca üzerine durur. Akhilleus, Hektor’un Patroklos’tan aldığı zırhtaki savunmasız noktayı bulur.',
    sourceNote: 'Sahne ölümcül bir düellodur; ancak Homeros onu yalın kahramanlık yerine korku, aldatma, yas ve kader üzerinden kurar.',
  },
  'priam-achilles': {
    location: 'Troya aşağısındaki kıyıda Akha kampı',
    geographyNote: 'Akha kampı Troya’nın aşağısındaki kıyıya aittir. Tunç Çağı kıyı çizgileri ve Homeros’un kamp coğrafyası tek bir güvenilir modern koordinat vermez.',
    reveal: 'Priamos’un yakarışı Akhilleus’a Peleus’u düşündürür; iki adam farklı ölülerin yasını tutar. Akhilleus fidyeyi kabul eder, Hektor’u geri verir ve cenaze için süre tanır; İlyada bu merhamet eylemiyle biter.',
    sourceNote: 'Tahta At ve kentin düşüşü destan döngüsünde daha sonra gelir; İlyada, Hektor’un cenazesiyle sona erer.',
  },
  'orpheus-eurydice': {
    location: 'Tainaron Kapısı, Tainaron Burnu',
    geographyNote: 'Ovidius yeraltı dünyasına açılan bir Tainaron kapısı anar. İğne, gerçek bir yeraltı yolunu değil, Tainaron Burnu’ndaki mağara geleneğini gösterir.',
    reveal: 'Orpheus müziğiyle Eurydike’nin bırakılmasını sağlar; fakat gün ışığına ulaşmadan hemen önce arkasına bakar. Ovidius onu açıkça Tainaron kapısından indirir ve ikinci kaybın nedenini kaygılı sevgisi yapar.',
    sourceNote: 'Ünlü geriye bakış, daha eski Yunan geleneğinin Roma dönemi edebî anlatılarında en ayrıntılı biçimini alır.',
  },
  'oedipus-sphinx': {
    location: 'Phikion Dağı, Thebai yakınları',
    geographyNote: 'Apollodoros Phikion Dağı’nın adını verir. Thebai yakınındaki modern özdeşleştirme düşük kesinliklidir; iğne güvenilir bir alanı değil, edebî coğrafyayı gösterir.',
    reveal: 'Oidipus, Sphinx’in değişen yaratığının insan olduğunu söyler. Thebai kurtulur; fakat ödülü olan krallık ve dul kraliçeyle evlilik, kaçtığı kehaneti bilmeden yerine getirir.',
    sourceNote: 'Bilmece bölümü Sophokles’in tragedyasının eyleminden önce gelir; Apollodoros kısa bir anlatı sürümünü korur.',
  },
  'lernaean-hydra': {
    location: 'Lerna, Argolis',
    geographyNote: 'İğne Lerna’nın kazılmış Tunç Çağı yerleşimini ve sulak coğrafyasını gösterir; çok başlı yaratık mite aittir.',
    reveal: 'Herakles yenilenmeyi yalnızca güçle alt edemez. İolaos kesilen her boynu yakar, ölümsüz baş bir kayanın altına gömülür ve Hydra’nın zehri kahramanın oklarında kullanılmak üzere alınır.',
    sourceNote: 'Antik kaynaklar başların sayısında ayrılır; Apollodoros biri ölümsüz olmak üzere dokuz baş verir.',
  },
  'midas-gold': {
    location: 'Gordion, Phrygia',
    geographyNote: 'Gordion, Midas’la geleneksel olarak ilişkilendirilen belgelenmiş Phrygia başkentidir. Ovidius ilk dönüşümü burada konumlandırmaz; çözümü Sardis yakınındaki Paktolos’a yerleştirir.',
    reveal: 'Midas, Dionysos’tan dokunduğu her şeyi altına çevirmesini ister. Açlık ve susuzluk armağanın bir lanet olduğunu gösterince tanrı ona gücü Paktolos’ta yıkamasını söyler.',
    sourceNote: 'Altına dönüşen kız çocuğu çok daha geç bir ektir ve bu sahnede bilinçli olarak yer almaz.',
  },
  'apollo-marsyas': {
    location: 'Kelainai, Phrygia',
    geographyNote: 'Kelainai belgelenmiş bir Phrygia kentidir. Herodotos ile Ksenophon ırmağın kaynağını ve mağarayı Marsyas’a açıkça bağlar; müzik yarışması ise mitik gelenektir.',
    reveal: 'Marsyas çift aulosla, Apollon’un kitharasına karşı bir müzik yarışmasına girer. Yenilip acımasız bir bedel öder; sahne şiddetten önce durur ve geleneği Kelainai’nin kaynak coğrafyasına bağlar.',
    sourceNote: 'Antik anlatılar jüri ve yarışmanın kesin kuralları konusunda uyuşmaz. Herodotos, Kelainai’deki yerel Phrygia geleneğini tarihsel bir olay gibi sunmaz.',
  },
  'niobe-sipylus': {
    location: 'Magnesia üzerindeki Sipylos Dağı, Lydia',
    geographyNote: 'Sipylos Dağı belgelenmiş bir Anadolu simgesidir. Homeros, Apollodoros ve Pausanias, Niobe’nin kalıcı taşını ve gözyaşlarını bu dağa bağlar; tek bir kaya mitik dönüşümü kanıtlayamaz.',
    reveal: 'Niobe kendisini Leto’yla kıyaslar; Apollon ile Artemis çocuklarını yok eder. Apollodoros, yaslı anneyi babası Tantalos’un yanına, Sipylos’a yollar; Zeus onu gözyaşları hiç dinmeyen bir taşa dönüştürür.',
    sourceNote: 'Niobe’nin çocuklarının sayısı antik kaynaklar arasında büyük ölçüde değişir. Panorama tek bir sayı seçmez ve ölümleri göstermez.',
  },
  'selene-endymion': {
    location: 'Herakleia üzerindeki Latmos Dağı, Karia',
    geographyNote: 'Latmos eteklerindeki Herakleia belgelenmiş bir Karia kentidir. Yerel gelenek Endymion’u dağda onurlandırır; başka Yunan toplulukları farklı yaşam öyküleri ve mezarlar ileri sürer.',
    reveal: 'Selene, sonsuz uykuda ebedî gençliği seçen Endymion’a âşık olur. Öykülerinin en ünlü coğrafyası Karia’daki Latmos Dağı’nda bir mağaradır; Elis’te rakip bir gelenek bulunur.',
    sourceNote: 'Kaynaklar Endymion’a ilişkin çoban, prens, kral, gökbilimci, Latmos’ta uyuyan kişi ve Elisli ata gibi birçok geleneği birleştirir.',
  },
  'hylas-nymphs': {
    location: 'Kios yakınındaki Mysia kıyısı, Bithynia',
    geographyNote: 'Kios, Propontis kıyısında belgelenmiş bir limandır. Rodoslu Apollonios, Hylas’ın kayboluşunu çevredeki Mysia pınar coğrafyasına yerleştirir; günümüzde bulunabilecek belirli bir çeşmeye değil.',
    reveal: 'Hylas, Artemis için toplanan nymphalar sırasında Pegai adlı pınara ulaşır. Bir su nymphası onu yüzeyin altına çeker; Herakles ile Polyphemos ararken Argonautlar yola çıkar.',
    sourceNote: 'Sonraki gelenekler Mysia’daki arama törenini ve Kios’un kuruluşunu bu kayboluşa bağlar. Sahne olayı şiddet göstermeden gizemli bir kaçırılma olarak sunar.',
  },
  'arachne-athena': {
    location: 'Hypaipa, Lydia (Ödemiş yakınları)',
    geographyNote: 'Hypaipa belgelenmiş bir Lydia kentidir. Ovidius Arakhne’nin ününü buraya yerleştirir; dokuma yarışması kazılmış bir olay değil, edebî anlatıdır.',
    reveal: 'Arakhne’nin kusursuz dokuması tanrıların kötülüklerini gösterir ve Athena’yı öfkelendirir. Ovidius genç zanaatkârın ününü Lydia’daki Hypaipa’ya yerleştirir; cezasını örümceğin bitmeyen dokumasına ilişkin köken öyküsüne dönüştürür.',
    sourceNote: 'Günümüze ulaşan en ayrıntılı antik anlatıyı Ovidius verir ve Arakhne’yi açıkça Lydia’daki Hypaipa ile ilişkilendirir.',
  },
  'salmacis-hermaphroditus': {
    location: 'Salmakis pınarı, Halikarnassos',
    geographyNote: 'Halikarnassos belgelenmiş bir Karia kentidir; antik yazarlar buradaki Salmakis pınarını biliyordu. Dönüşümün kendisi edebî geleneğe aittir.',
    reveal: 'Salmakis pınarında naias, Hermaphroditos’a sarılıp bir daha ayrılmamalarını diler; Ovidius iki biçimin tek bedende birleşmesini anlatır. Öykünün merkezindeki birleşme karşılıklı seçime dayanmadığından dikkatle ele alınmalıdır.',
    sourceNote: 'Dönüşümü Ovidius anlatır; Strabon ile Vitruvius pınarın Halikarnassos bağlantısını korurken suyu hakkındaki aşırı iddiaları reddeder.',
  },
  'hero-leander': {
    location: 'Sestos ile Abydos arasındaki Hellespontos',
    geographyNote: 'Abydos ile Sestos, Hellespontos’un karşı kıyılarında belgelenmiş kentlerdir. İğne, bilinen bir kuleyi değil, aralarındaki dar geçidi gösterir.',
    reveal: 'Leandros geceleri Sestos’taki Hero’nun kandiline doğru Hellespontos’u yüzer. Ovidius ile Musaios’un koruduğu trajik sonda fırtına ışığı söndürür ve sevgililer aynı geçidin karşı kıyılarında ölür.',
    sourceNote: 'Kentler ve boğaz tarihseldir; âşıkların kulesi ile gece yüzüşleri antik edebî geleneğe aittir.',
  },
  'admete-request': {
    location: 'Mykenai, Argolis',
    geographyNote: 'İğne Tunç Çağı Mykenai’sini gösterir. Kraliyet buyruğu mite aitken, kale arkeolojik olarak belgelenmiş bir yerdir.',
    reveal: 'Eurystheus, kızı Admete istediği için Herakles’e Hippolyta’nın savaş kuşağını getirmesini emreder. Herakles gönüllü yoldaşlarını toplar ve Mykenai’den tek bir gemiyle ayrılır.',
    sourceNote: 'Bu güzergâh Ps.-Apollodoros’un sırasını izler; sonraki anlatımlar her durağı ya da gerekçeyi korumaz.',
  },
  'paros-crisis': {
    location: 'Paros, Kykladlar',
    geographyNote: 'Paros belgelenmiş bir Kyklad adasıdır; çatışma ile kesin limanı mitik güzergâha aittir.',
    reveal: 'Paros’ta Minos’un oğulları, karaya çıkan Herakles’in iki yoldaşını öldürür. Herakles adalılara saldırır; çatışma sona erdiğinde Alkaios ile Sthenelos’u kayıpların yerine kabul eder.',
    sourceNote: 'Ps.-Apollodoros, Paros’u sefer Mysia’ya ve Amazonlara varmadan önce ayrı bir durak yapar.',
  },
  'heracles-mygdon': {
    location: 'Mariandynia Herakleia’sı, Kuzey Anadolu',
    geographyNote: 'Herakleia Pontike, Mariandynia ortamını bölgesel olarak sabitler. Mygdon’a karşı sefer edebî gelenek olduğundan puan çemberi geniş tutulur.',
    reveal: 'Kral Lykos Mysia’da Herakles’i ağırlar ve komşu Bebrykler’e karşı yardımını ister. Herakles onların kralı Mygdon’u yenerek ele geçirilen toprağı Lykos’a verir.',
    sourceNote: 'Güzergâh, kesin bir savaş alanı ileri sürmeden Mariandynia bölümü için Herakleia Pontike’yi dayanak alır.',
  },
  'hippolyta-girdle': {
    location: 'Thermodon üzerindeki Themiskyra, Pontos',
    geographyNote: 'Antik kaynaklar Themiskyra’yı Thermodon yakınlarına yerleştirir. Kesin alanı güvenle saptanamadığından bölgesel çember, belgelenmiş kentlere göre bilinçli biçimde daha geniştir.',
    reveal: 'Herakles Themiskyra limanına ulaşır ve neden geldiğini açıklar. Hippolyta onu düşmanca karşılamaz ve kuşağı gönüllü vermeyi vaat eder.',
    sourceNote: 'Antik anlatılar savaş, Hippolyta’nın sonu ve daha sonra Theseus’a eşlik eden Amazon konusunda farklılaşır.',
  },
  'hera-amazons': {
    location: 'Thermodon üzerindeki Themiskyra, Pontos',
    geographyNote: 'Sahne barışçıl buluşmayla aynı geleneksel Themiskyra bölgesini paylaşır; antik yerin kesin konumu güvenle saptanamamıştır.',
    reveal: 'Hera bir Amazon kılığına girip yabancıların Hippolyta’yı kaçıracağını söyler. Silahlı biniciler gemiye doğru atılınca Herakles bu alarmı ihanet sanır.',
    sourceNote: 'Bu sahne Ps.-Apollodoros’u izler; başka antik anlatılar savaşı, Hippolyta’nın sonunu ya da olayın Amazonunu değiştirir.',
  },
  'hesione-rescue': {
    location: 'İlion / Troya, Anadolu',
    geographyNote: 'İğne Hisarlık’taki arkeolojik höyüğü gösterir. Hesione’nin deniz canavarından kurtarılması, İlyada savaşından daha eski bir Troya’da geçen mitik bölümdür.',
    reveal: 'Dönüş yolunda Herakles, Hesione’nin bir deniz canavarına sunulduğu sırada Troya’ya ulaşır. Laomedon tanrısal kısraklarını vaat edince yaratığı öldürür ve prensesi kurtarır.',
    sourceNote: 'Bu bölüm daha sonraki Troya Savaşı değil, Hesione’nin daha eski anlatısıdır; Ps.-Apollodoros onu Themiskyra dönüşüne yerleştirir.',
  },
  'leto-lycians': {
    location: 'Letoon ve Ksantos Vadisi, Lykia',
    geographyNote: 'Letoon, Lykialı Leto’nun belgelenmiş federal kutsal alanıdır. Bölgesel geleneği sabitler; günümüze kalan havuzların Ovidius’un anlattığı gölet olduğunu ileri sürmez.',
    reveal: 'Apollon ile Artemis’i taşırken Lykia’da susayan Leto’ya, suyu bulandıran köylüler içecek vermez. Leto onları kurbağaya dönüştürür ve reddedişlerini göletin bitmeyen vıraklamasına ilişkin bir köken öyküsü yapar.',
    sourceNote: 'Ovidius bölümü Lykia’ya yerleştirir. Letoon, anlatıdaki kesin göletin kanıtı değil, bölgesel bir kült odağı olarak kullanılır.',
  },
  'telephus-achilles': {
    location: 'Mysia’daki Teuthrania',
    geographyNote: 'Teuthrania, Pleiades’te yaklaşık konumu bulunan belgelenmiş bir Mysia yerleşimidir. Savaş ve iyileşme Troya döngüsü geleneğine aittir.',
    reveal: 'Yunanların yanlış ilk çıkarmasında Telephos, bir asmaya takılıp Akhilleus tarafından yaralanana dek Mysia’yı savunur. Kehanet daha sonra onu yaralayan silahı iyileşmenin aracı yapar; Telephos da filoya Troya yolunu gösterir.',
    sourceNote: 'Sahne yanlış Mysia çıkarmasını sonraki iyileşmenin simgeleriyle birleştirir; yaralanmadan önce durur ve görsel şiddet göstermez.',
  },
  'attis-great-mother': {
    location: 'Pessinus, Phrygia',
    geographyNote: 'Pessinus belgelenmiş bir Phrygia kenti ve Ana Tanrıça’nın önemli kült merkezidir. Trajik düğün anlatısı edebîdir ve birbiriyle yarışan sürümleri vardır.',
    reveal: 'Pausanias, Attis’in kraliyet düğünü için Pessinus’a geldiği ve Agdistis’in kutlamayı yıkıcı tanrısal çılgınlığa çevirdiği Phrygia anlatısını korur. Görsel sahne trajediden önce durur; kalıcı anının ölçülü işareti olarak herdem yeşil çamı kullanır.',
    sourceNote: 'Attis’in Yunan ve Roma anlatıları büyük ölçüde farklıdır. Bu sürüm Pausanias’ı izler ve kendine zarar vermeyi bilinçli olarak göstermez.',
  },
  'io-flight': {
    location: 'Trakya Bosporosu',
    geographyNote: 'Bosporos, Avrupa ile Asya arasındaki belgelenmiş antik boğazdır. Aiskhylos İo’yu buradan geçirir; başka antik anlatılar farklı güzergâhlar çizer.',
    reveal: 'Hera’nın at sineği tarafından sürülen İo, Trakya Bosporosu’ndan Avrupa’dan Asya’ya geçer. Aiskhylos bu geçişi çok daha uzun yolculuğun bir aşaması yapar; boğazın adı halk arasında ineğin geçişiyle açıklanır.',
    sourceNote: 'Antik yazarlar İo’nun rotasının her aşamasında uyuşmaz. İğne, Aiskhylos’un güzergâhında adı verilen Bosporos geçişini gösterir.',
  },
  'ganymedes-zeus': {
    location: 'İda Dağı ve Troas',
    geographyNote: 'Erken şiirler Ganymedes’i Troya kralı Tros’un oğlu yapar; ancak kaçırılış için güvenilir tek bir yer belirtmez. İda Dağı geleneksel Troas ortamı olarak kullanılır; Strabon Dardanos ve Harpagia yakınındaki başka konumları da aktarır.',
    reveal: 'Zeus, Kral Tros’un oğlu Ganymedes’i babasının sürülerini güderken görür. Tanrı büyük kartalını onu Olympos’a taşıması için gönderir.',
    sourceNote: 'Homeros Troya soy bağını ve tanrısal sakiliği verir; ilahi Tros’un yasını, Hermes’i ve atları ekler; Ps.-Apollodoros ise kartalı açıkça Zeus’un aracısı yapar.',
  },
}

const sceneCyclesTr: Record<string, string> = {
  'Age of Heroes': 'Kahramanlar Çağı',
  'After Troy': 'Troya’dan Sonra',
  'Trojan War': 'Troya Savaşı',
  'Olympian Order': 'Olympos Düzeni',
  'Age of the Gods': 'Tanrılar Çağı',
  'Boeotian Tales': 'Boiotia Anlatıları',
  'Perseus Cycle': 'Perseus Döngüsü',
  'The Iliad': 'İlyada',
  'Love and the Underworld': 'Aşk ve Yeraltı Dünyası',
  'The House of Laius': 'Laios Hanedanı',
  'Kings and Consequences': 'Krallar ve Sonuçları',
  'Music and Hubris': 'Müzik ve Kibir',
  'Divine Retribution': 'Tanrısal Ceza',
  'Moon and Mortal': 'Ay ve Ölümlü',
  'Voyage of the Argo': 'Argo Yolculuğu',
  'Olympian Encounters': 'Olympos Karşılaşmaları',
  'Anatolian Sea Legends': 'Anadolu Deniz Efsaneleri',
  'Labours of Heracles': 'Herakles’in Görevleri',
  'Trojan Prelude': 'Troya’ya Giden Yol',
  'Trojan Origins': 'Troya’nın Kökenleri',
  'Gods of Anatolia': 'Anadolu Tanrıları',
}

const sourceNameReplacements: readonly (readonly [string, string])[] = [
  ['Homeric Hymn to Aphrodite', 'Aphrodite’ye Homeros İlahisi'],
  ['Homeric Hymn to Apollo', 'Apollon’a Homeros İlahisi'],
  ['Pseudo-Apollodorus', 'Ps.-Apollodoros'],
  ['Apollonius Rhodius', 'Rodoslu Apollonios'],
  ['Diodorus Siculus', 'Sicilyalı Diodoros'],
  ['Iphigenia at Aulis', 'Aulis’te İphigeneia'],
  ['Description of Greece', 'Yunanistan’ın Tasviri'],
  ['Library of History', 'Tarih Kitaplığı'],
  ['Oedipus Tyrannus', 'Kral Oidipus'],
  ['Suppliant Women', 'Yakaran Kadınlar'],
  ['Works and Days', 'İşler ve Günler'],
  ['Hero and Leander', 'Hero ile Leandros'],
  ['summary of the Cypria', 'Kypria özeti'],
  ['Metamorphoses', 'Dönüşümler'],
  ['Aeneid', 'Aeneis'],
  ['Apollodorus', 'Apollodoros'],
  ['Sophocles', 'Sophokles'],
  ['Aeschylus', 'Aiskhylos'],
  ['Euripides', 'Euripides'],
  ['Herodotus', 'Herodotos'],
  ['Pausanias', 'Pausanias'],
  ['Plutarch', 'Plutarkhos'],
  ['Musaeus', 'Musaios'],
  ['Proclus', 'Proklos'],
  ['Bibliotheca', 'Bibliotheke'],
  ['Argonautica', 'Argonautika'],
  ['Theogony', 'Theogonia'],
  ['Georgics', 'Georgica'],
  ['Geography', 'Coğrafya'],
  ['Histories', 'Tarihler'],
  ['Odyssey', 'Odysseia'],
  ['Iliad', 'İlyada'],
  ['Virgil', 'Vergilius'],
  ['Hesiod', 'Hesiodos'],
  ['Homer', 'Homeros'],
  ['Ovid', 'Ovidius'],
  ['Strabo', 'Strabon'],
  [' and ', ' ve '],
]

const sourceNameReplacementByEnglish = new Map(sourceNameReplacements)
const sourceNamePattern = new RegExp(
  sourceNameReplacements
    .map(([english]) => english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|'),
  'g',
)

export function localiseAncientSource(source: string, locale: Locale) {
  if (locale === 'en') return source
  return source.replace(
    sourceNamePattern,
    (english) => sourceNameReplacementByEnglish.get(english) ?? english,
  )
}

export type ScenePresentation = Pick<
  MythScene,
  'cycle' | 'location' | 'geographyNote' | 'reveal' | 'source' | 'sourceNote'
>

export function localiseScenePresentation(scene: MythScene, locale: Locale): ScenePresentation {
  if (locale === 'en') {
    return {
      cycle: scene.cycle,
      location: scene.location,
      geographyNote: scene.geographyNote,
      reveal: scene.reveal,
      source: scene.source,
      sourceNote: scene.sourceNote,
    }
  }

  const details = sceneDetailsTr[scene.id]
  return {
    cycle: sceneCyclesTr[scene.cycle] ?? scene.cycle,
    location: details?.location ?? scene.location,
    geographyNote: details?.geographyNote ?? scene.geographyNote,
    reveal: details?.reveal ?? scene.reveal,
    source: localiseAncientSource(scene.source, locale),
    sourceNote: details?.sourceNote ?? scene.sourceNote,
  }
}

export function localiseSceneClues(
  scene: Pick<MythScene, 'id' | 'clues'>,
  locale: Locale,
): readonly string[] {
  if (locale === 'en') return scene.clues
  return sceneCluesTr[scene.id] ?? scene.clues
}
