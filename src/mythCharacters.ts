import { figureProfiles } from './figures'
import type { MythScene } from './data'
import type { Locale } from './i18n'
import { localiseMythStory } from './mythStories'

type LocalisedText = Record<Locale, string>

export type MythCharacter = {
  id: string
  name: LocalisedText
  aliases: Record<Locale, readonly string[]>
  info: LocalisedText
  facts?: readonly LocalisedText[]
}

const figureAliasOverrides: Record<string, Partial<Record<Locale, readonly string[]>>> = {
  achilles: { tr: ['Akhilleus'], en: ['Achilles'] },
  arachne: { tr: ['Arakhne', 'Arachne'] },
  charybdis: { tr: ['Kharybdis'] },
  chimera: { tr: ['Khimaira'] },
  hector: { tr: ['Hektor'] },
  hermaphroditus: { tr: ['Hermaphroditos'] },
  hydra: { en: ['Lernaean Hydra', 'Hydra'], tr: ['Lerna Hydra’sı', 'Hydra'] },
  io: { tr: ['İo', 'Io'] },
  leander: { tr: ['Leandros'] },
  medusa: { en: ['Medusa'], tr: ['Medusa', 'Gorgon Medusa'] },
  minotaur: { tr: ['Minotauros'] },
  oedipus: { tr: ['Oidipus'] },
  polyphemus: { tr: ['Polyphemos'] },
  scylla: { tr: ['Skylla'] },
  sirens: { en: ['Sirens'], tr: ['Sirenler'] },
  sphinx: { en: ['Sphinx'], tr: ['Sfenks'] },
}

const figureCharacters: MythCharacter[] = figureProfiles.map((profile) => ({
  id: profile.id,
  name: profile.name,
  aliases: {
    en: figureAliasOverrides[profile.id]?.en ?? [profile.name.en],
    tr: figureAliasOverrides[profile.id]?.tr ?? [profile.name.tr],
  },
  info: profile.summary,
  facts: profile.facts,
}))

const additionalCharacters: MythCharacter[] = [
  {
    id: 'laocoon',
    name: { en: 'Laocoön', tr: 'Laokoon' },
    aliases: { en: ['Laocoön', 'Laocoon'], tr: ['Laokoon'] },
    info: {
      en: 'A Trojan priest who warns his city not to trust the wooden horse. His warning is ignored before Troy falls.',
      tr: 'Kentini tahta ata güvenmemesi için uyaran Troyalı rahiptir. Troya düşmeden önce uyarısı dikkate alınmaz.',
    },
  },
  {
    id: 'ariadne',
    name: { en: 'Ariadne', tr: 'Ariadne' },
    aliases: { en: ['Ariadne'], tr: ['Ariadne'] },
    info: {
      en: 'Daughter of King Minos and Pasiphaë. She gives Theseus the thread that lets him escape the labyrinth.',
      tr: 'Kral Minos ile Pasiphaë’nin kızıdır. Theseus’a labirentten çıkmasını sağlayan ipi verir.',
    },
  },
  {
    id: 'daedalus',
    name: { en: 'Daedalus', tr: 'Daidalos' },
    aliases: { en: ['Daedalus'], tr: ['Daidalos'] },
    info: {
      en: 'A master craftsman and inventor who builds the Cretan labyrinth for Minos. He is also the father of Icarus.',
      tr: 'Minos için Girit labirentini kuran usta zanaatkâr ve mucittir. Aynı zamanda Ikaros’un babasıdır.',
    },
  },
  {
    id: 'minos',
    name: { en: 'Minos', tr: 'Minos' },
    aliases: { en: ['Minos'], tr: ['Minos'] },
    info: {
      en: 'King of Crete and son of Zeus and Europa. He orders the Minotaur hidden inside Daedalus’s labyrinth.',
      tr: 'Girit kralı, Zeus ile Europa’nın oğludur. Minotauros’un Daidalos’un labirentine kapatılmasını emreder.',
    },
  },
  {
    id: 'prometheus',
    name: { en: 'Prometheus', tr: 'Prometheus' },
    aliases: { en: ['Prometheus'], tr: ['Prometheus'] },
    info: {
      en: 'A Titan and champion of humankind who steals fire from the gods. Zeus punishes him by chaining him in the Caucasus.',
      tr: 'İnsanların koruyucusu olan ve tanrılardan ateşi çalan bir Titan’dır. Zeus onu Kafkaslar’da zincire vurarak cezalandırır.',
    },
  },
  {
    id: 'apollo',
    name: { en: 'Apollo', tr: 'Apollon' },
    aliases: { en: ['Apollo'], tr: ['Apollon'] },
    info: {
      en: 'Son of Zeus and Leto and twin of Artemis. He is a god of prophecy, music, healing and archery.',
      tr: 'Zeus ile Leto’nun oğlu, Artemis’in ikizidir. Kehanet, müzik, şifa ve okçuluk tanrısıdır.',
    },
  },
  {
    id: 'python',
    name: { en: 'Python', tr: 'Python' },
    aliases: { en: ['Python'], tr: ['Python'] },
    info: {
      en: 'The great serpent associated with the sanctuary at Delphi. Apollo defeats it before establishing his oracle there.',
      tr: 'Delphoi kutsal alanıyla ilişkili büyük yılandır. Apollon kehanet merkezini kurmadan önce onu yener.',
    },
  },
  {
    id: 'zeus',
    name: { en: 'Zeus', tr: 'Zeus' },
    aliases: { en: ['Zeus'], tr: ['Zeus'] },
    info: {
      en: 'King of the Olympian gods and wielder of the thunderbolt. He is a son of Cronus and Rhea and brother of Hera and Poseidon.',
      tr: 'Olympos tanrılarının kralı ve yıldırımın sahibidir. Kronos ile Rhea’nın oğlu, Hera ile Poseidon’un kardeşidir.',
    },
  },
  {
    id: 'athena',
    name: { en: 'Athena', tr: 'Athena' },
    aliases: { en: ['Athena'], tr: ['Athena'] },
    info: {
      en: 'Goddess of wisdom, crafts and strategic warfare. She is born from Zeus’s head and often protects resourceful heroes.',
      tr: 'Bilgelik, zanaat ve stratejik savaş tanrıçasıdır. Zeus’un başından doğar ve becerikli kahramanları sık sık korur.',
    },
  },
  {
    id: 'hermes',
    name: { en: 'Hermes', tr: 'Hermes' },
    aliases: { en: ['Hermes'], tr: ['Hermes'] },
    info: {
      en: 'Messenger of the gods and guide of travellers and souls. He is the son of Zeus and Maia.',
      tr: 'Tanrıların habercisi; yolcuların ve ruhların rehberidir. Zeus ile Maia’nın oğludur.',
    },
  },
  {
    id: 'poseidon',
    name: { en: 'Poseidon', tr: 'Poseidon' },
    aliases: { en: ['Poseidon'], tr: ['Poseidon'] },
    info: {
      en: 'God of the sea, earthquakes and horses and brother of Zeus. Polyphemus is one of his sons.',
      tr: 'Deniz, deprem ve at tanrısı; Zeus’un kardeşidir. Polyphemos onun oğullarından biridir.',
    },
  },
  {
    id: 'circe',
    name: { en: 'Circe', tr: 'Kirke' },
    aliases: { en: ['Circe'], tr: ['Kirke'] },
    info: {
      en: 'A powerful enchantress and daughter of Helios who lives on Aeaea. She transforms Odysseus’s crew and later guides their voyage.',
      tr: 'Aiaia’da yaşayan güçlü büyücü ve Helios’un kızıdır. Odysseus’un tayfasını dönüştürür, sonra yolculuklarına rehberlik eder.',
    },
  },
  {
    id: 'aeolus',
    name: { en: 'Aeolus', tr: 'Aiolos' },
    aliases: { en: ['Aeolus'], tr: ['Aiolos'] },
    info: {
      en: 'Keeper of the winds who hosts Odysseus. He seals the dangerous winds inside a leather bag for the voyage home.',
      tr: 'Odysseus’u ağırlayan rüzgârların bekçisidir. Tehlikeli rüzgârları dönüş yolculuğu için deri bir torbaya kapatır.',
    },
  },
  {
    id: 'teiresias',
    name: { en: 'Tiresias', tr: 'Teiresias' },
    aliases: { en: ['Tiresias'], tr: ['Teiresias'] },
    info: {
      en: 'A blind Theban seer whose wisdom continues after death. His shade tells Odysseus how the journey home may succeed.',
      tr: 'Bilgeliği ölümden sonra da süren kör Thebaili kâhindir. Gölgesi Odysseus’a eve dönüşün nasıl başarıya ulaşacağını anlatır.',
    },
  },
  {
    id: 'helios',
    name: { en: 'Helios', tr: 'Helios' },
    aliases: { en: ['Helios'], tr: ['Helios'] },
    info: {
      en: 'The personified Sun who crosses the sky in a chariot. His sacred cattle must not be harmed by Odysseus’s crew.',
      tr: 'Gökyüzünü arabasıyla geçen kişileştirilmiş Güneş’tir. Odysseus’un tayfasının onun kutsal sığırlarına dokunmaması gerekir.',
    },
  },
  {
    id: 'eurylochus',
    name: { en: 'Eurylochus', tr: 'Eurylochos' },
    aliases: { en: ['Eurylochus'], tr: ['Eurylochos'] },
    info: {
      en: 'A senior member of Odysseus’s crew and his relative by marriage. He persuades the starving sailors to kill the cattle of Helios.',
      tr: 'Odysseus’un tayfasındaki kıdemli denizci ve evlilik yoluyla akrabasıdır. Aç denizcileri Helios’un sığırlarını kesmeye ikna eder.',
    },
  },
  {
    id: 'calypso',
    name: { en: 'Calypso', tr: 'Kalypso' },
    aliases: { en: ['Calypso'], tr: ['Kalypso'] },
    info: {
      en: 'An immortal nymph who keeps Odysseus on Ogygia for years. She offers him immortality before Zeus orders his release.',
      tr: 'Odysseus’u yıllarca Ogygia’da tutan ölümsüz nymphedir. Zeus serbest bırakılmasını emretmeden önce ona ölümsüzlük önerir.',
    },
  },
  {
    id: 'penelope',
    name: { en: 'Penelope', tr: 'Penelope' },
    aliases: { en: ['Penelope'], tr: ['Penelope'] },
    info: {
      en: 'Queen of Ithaca, wife of Odysseus and mother of Telemachus. Her weaving ruse delays the suitors while she waits for Odysseus.',
      tr: 'İthaka kraliçesi, Odysseus’un eşi ve Telemakhos’un annesidir. Dokuma hilesiyle talipleri oyalayarak Odysseus’u bekler.',
    },
  },
  {
    id: 'daphne',
    name: { en: 'Daphne', tr: 'Daphne' },
    aliases: { en: ['Daphne'], tr: ['Daphne'] },
    info: {
      en: 'A nymph pursued by Apollo after Eros’s arrows set their opposed desires. She becomes a laurel tree to escape him.',
      tr: 'Eros’un okları ikisinde karşıt arzular uyandırdıktan sonra Apollon’un kovaladığı nymphedir. Ondan kurtulmak için defne ağacına dönüşür.',
    },
  },
  {
    id: 'echo',
    name: { en: 'Echo', tr: 'Ekho' },
    aliases: { en: ['Echo'], tr: ['Ekho'] },
    info: {
      en: 'A mountain nymph punished by Hera so she can repeat only the last words she hears. She fades after Narcissus rejects her.',
      tr: 'Hera’nın yalnız duyduğu son sözleri yineleyebilmekle cezalandırdığı dağ nymphesidir. Narkissos onu reddedince silinip gider.',
    },
  },
  {
    id: 'narcissus',
    name: { en: 'Narcissus', tr: 'Narkissos' },
    aliases: { en: ['Narcissus'], tr: ['Narkissos'] },
    info: {
      en: 'A beautiful youth who rejects others and becomes captivated by his own reflection. His name is carried by the narcissus flower.',
      tr: 'Başkalarını reddeden ve kendi yansımasına kapılan güzel bir gençtir. Adını nergis çiçeği taşır.',
    },
  },
  {
    id: 'hera',
    name: { en: 'Hera', tr: 'Hera' },
    aliases: { en: ['Hera'], tr: ['Hera'] },
    info: {
      en: 'Goddess of marriage and queenship, sister and wife of Zeus. Her interventions often defend divine rank and marital order.',
      tr: 'Evlilik ve kraliçelik tanrıçası, Zeus’un kız kardeşi ve eşidir. Müdahaleleri çoğu kez tanrısal konumu ve evlilik düzenini korur.',
    },
  },
  {
    id: 'eros',
    name: { en: 'Eros', tr: 'Eros' },
    aliases: { en: ['Eros'], tr: ['Eros'] },
    info: {
      en: 'God and personification of desire. In the Daphne story, his golden and leaden arrows create pursuit and rejection.',
      tr: 'Arzunun tanrısı ve kişileşmiş hâlidir. Daphne anlatısında altın ve kurşun okları kovalamayı ve reddedişi doğurur.',
    },
  },
  {
    id: 'aphrodite',
    name: { en: 'Aphrodite', tr: 'Aphrodite' },
    aliases: { en: ['Aphrodite'], tr: ['Aphrodite'] },
    info: {
      en: 'Goddess of love, beauty and desire. Hesiod has her rise from sea foam, while Homeric tradition calls her the daughter of Zeus and Dione.',
      tr: 'Aşk, güzellik ve arzu tanrıçasıdır. Hesiodos onu deniz köpüğünden doğururken Homeros geleneği Zeus ile Dione’nin kızı sayar.',
    },
  },
  {
    id: 'artemis',
    name: { en: 'Artemis', tr: 'Artemis' },
    aliases: { en: ['Artemis'], tr: ['Artemis'] },
    info: {
      en: 'Goddess of the hunt, wilderness and childbirth. She is the daughter of Zeus and Leto and twin sister of Apollo.',
      tr: 'Av, yaban doğası ve doğum tanrıçasıdır. Zeus ile Leto’nun kızı ve Apollon’un ikiz kız kardeşidir.',
    },
  },
  {
    id: 'leto',
    name: { en: 'Leto', tr: 'Leto' },
    aliases: { en: ['Leto'], tr: ['Leto'] },
    info: {
      en: 'A Titan goddess and mother of Apollo and Artemis by Zeus. Her search for refuge and water shapes several myths.',
      tr: 'Bir Titan tanrıça; Zeus’tan Apollon ile Artemis’in annesidir. Sığınak ve su arayışı birçok miti biçimlendirir.',
    },
  },
  {
    id: 'iphigenia',
    name: { en: 'Iphigenia', tr: 'Iphigeneia' },
    aliases: { en: ['Iphigenia'], tr: ['Iphigeneia'] },
    info: {
      en: 'Daughter of Agamemnon and Clytemnestra, summoned to Aulis under a false promise of marriage. Artemis rescues her in an influential version.',
      tr: 'Agamemnon ile Klytaimnestra’nın kızıdır; sahte evlilik vaadiyle Aulis’e çağrılır. Etkili bir anlatıda Artemis onu kurtarır.',
    },
  },
  {
    id: 'agamemnon',
    name: { en: 'Agamemnon', tr: 'Agamemnon' },
    aliases: { en: ['Agamemnon'], tr: ['Agamemnon'] },
    info: {
      en: 'King of Mycenae, brother of Menelaus and commander of the Achaean expedition to Troy. He is Iphigenia’s father.',
      tr: 'Mykenai kralı, Menelaos’un kardeşi ve Troya seferindeki Akhaların komutanıdır. İphigeneia’nın babasıdır.',
    },
  },
  {
    id: 'andromache',
    name: { en: 'Andromache', tr: 'Andromakhe' },
    aliases: { en: ['Andromache'], tr: ['Andromakhe'] },
    info: {
      en: 'Wife of Hector and mother of Astyanax. She is a princess of Cilician Thebe who has already lost her birth family to war.',
      tr: 'Hektor’un eşi ve Astyanaks’ın annesidir. Doğduğu ailesini savaşa kurban vermiş Kilikia Thebai’si prensesidir.',
    },
  },
  {
    id: 'patroclus',
    name: { en: 'Patroclus', tr: 'Patroklos' },
    aliases: { en: ['Patroclus'], tr: ['Patroklos'] },
    info: {
      en: 'Achilles’ closest companion. He enters battle in Achilles’ armour and his death draws the warrior back into the fighting.',
      tr: 'Akhilleus’un en yakın yoldaşıdır. Onun zırhıyla savaşa girer ve ölümü savaşçıyı yeniden çatışmaya çeker.',
    },
  },
  {
    id: 'priam',
    name: { en: 'Priam', tr: 'Priamos' },
    aliases: { en: ['Priam'], tr: ['Priamos'] },
    info: {
      en: 'The elderly king of Troy and father of Hector and Paris. He risks entering the Achaean camp to recover Hector’s body.',
      tr: 'Troya’nın yaşlı kralı, Hektor ile Paris’in babasıdır. Hektor’un bedenini almak için Akha kampına girme riskini göze alır.',
    },
  },
  {
    id: 'eurydice',
    name: { en: 'Eurydice', tr: 'Eurydike' },
    aliases: { en: ['Eurydice'], tr: ['Eurydike'] },
    info: {
      en: 'Wife of Orpheus, lost to death soon after their marriage. His music wins her a conditional return from the Underworld.',
      tr: 'Orpheus’un evliliklerinden kısa süre sonra ölüme kaybettiği eşidir. Orpheus’un müziği ona yeraltı dünyasından koşullu bir dönüş kazandırır.',
    },
  },
  {
    id: 'iolaus',
    name: { en: 'Iolaus', tr: 'İolaos' },
    aliases: { en: ['Iolaus'], tr: ['İolaos', 'Iolaos'] },
    info: {
      en: 'Heracles’ nephew, charioteer and frequent companion. He seals the Hydra’s severed necks with fire.',
      tr: 'Herakles’in yeğeni, araba sürücüsü ve sık yol arkadaşıdır. Hydra’nın kesilen boyunlarını ateşle dağlar.',
    },
  },
  {
    id: 'dionysus',
    name: { en: 'Dionysus', tr: 'Dionysos' },
    aliases: { en: ['Dionysus'], tr: ['Dionysos'] },
    info: {
      en: 'God of wine, theatre and ecstatic transformation and son of Zeus and Semele. He grants Midas the dangerous golden wish.',
      tr: 'Şarap, tiyatro ve esrik dönüşüm tanrısı; Zeus ile Semele’nin oğludur. Midas’a tehlikeli altın dileğini verir.',
    },
  },
  {
    id: 'selene',
    name: { en: 'Selene', tr: 'Selene' },
    aliases: { en: ['Selene'], tr: ['Selene'] },
    info: {
      en: 'The personified Moon and daughter of the Titans Hyperion and Theia. She loves the sleeping mortal Endymion.',
      tr: 'Kişileşmiş Ay; Titanlar Hyperion ile Theia’nın kızıdır. Uyuyan ölümlü Endymion’u sever.',
    },
  },
  {
    id: 'ares',
    name: { en: 'Ares', tr: 'Ares' },
    aliases: { en: ['Ares'], tr: ['Ares'] },
    info: {
      en: 'God of the violent force of war and son of Zeus and Hera. He gives Hippolyta her distinctive war belt.',
      tr: 'Savaşın şiddetli gücünün tanrısı, Zeus ile Hera’nın oğludur. Hippolyta’ya ayırt edici savaş kuşağını verir.',
    },
  },
  {
    id: 'eurystheus',
    name: { en: 'Eurystheus', tr: 'Eurystheus' },
    aliases: { en: ['Eurystheus'], tr: ['Eurystheus'] },
    info: {
      en: 'King of Tiryns and Mycenae who assigns the labours to his cousin Heracles. His command turns Admete’s desire for Hippolyta’s belt into the ninth labour.',
      tr: 'Kuzeni Herakles’e görevleri veren Tiryns ve Mykenai kralıdır. Buyruğu, Admete’nin Hippolyta’nın kuşağına duyduğu isteği dokuzuncu göreve dönüştürür.',
    },
    facts: [
      { en: 'Father of Admete', tr: 'Admete’nin babasıdır' },
      { en: 'Grandson of Perseus and rival claimant to heroic prestige', tr: 'Perseus’un torunu ve kahramanlık saygınlığında Herakles’in rakibidir' },
    ],
  },
  {
    id: 'admete',
    name: { en: 'Admete', tr: 'Admete' },
    aliases: { en: ['Admete'], tr: ['Admete'] },
    info: {
      en: 'Daughter of Eurystheus. Her desire to possess Hippolyta’s war belt supplies the immediate reason for Heracles’ ninth labour in Pseudo-Apollodorus.',
      tr: 'Eurystheus’un kızıdır. Ps.-Apollodoros’ta Hippolyta’nın savaş kuşağına sahip olma isteği, Herakles’in dokuzuncu görevinin doğrudan gerekçesidir.',
    },
    facts: [
      { en: 'Princess of Mycenae in the labour tradition', tr: 'Görev geleneğinde Mykenai prensesidir' },
      { en: 'She does not join the expedition', tr: 'Sefere katılmaz' },
    ],
  },
  {
    id: 'alcaeus',
    name: { en: 'Alcaeus', tr: 'Alkaios' },
    aliases: { en: ['Alcaeus'], tr: ['Alkaios'] },
    info: {
      en: 'A son of Androgeus and grandson of Minos. He joins Heracles on Paros as one of two replacements for the companions killed there.',
      tr: 'Androgeos’un oğlu, Minos’un torunudur. Paros’ta öldürülen yoldaşların yerine Herakles’e katılan iki kişiden biridir.',
    },
  },
  {
    id: 'sthenelus',
    name: { en: 'Sthenelus', tr: 'Sthenelos' },
    aliases: { en: ['Sthenelus'], tr: ['Sthenelos'] },
    info: {
      en: 'Brother of Alcaeus, son of Androgeus and grandson of Minos. He becomes a replacement voyager during the settlement on Paros.',
      tr: 'Alkaios’un kardeşi, Androgeos’un oğlu ve Minos’un torunudur. Paros’taki uzlaşmada sefere katılan yeni yolculardan biri olur.',
    },
  },
  {
    id: 'lycus-mariandynian',
    name: { en: 'King Lycus', tr: 'Kral Lykos' },
    aliases: { en: ['King Lycus', 'Lycus'], tr: ['Kral Lykos', 'Lykos'] },
    info: {
      en: 'King of the Mariandynians who welcomes Heracles in northern Anatolia. Heracles helps him defeat Mygdon and gives him the conquered land.',
      tr: 'Kuzey Anadolu’da Herakles’i ağırlayan Mariandynia kralıdır. Herakles Mygdon’u yenmesine yardım eder ve ele geçirilen toprağı ona verir.',
    },
  },
  {
    id: 'mygdon',
    name: { en: 'Mygdon', tr: 'Mygdon' },
    aliases: { en: ['Mygdon'], tr: ['Mygdon'] },
    info: {
      en: 'King of the Bebryces and enemy of Lycus. He is defeated during Heracles’ stop in Mysia before the expedition continues to the Amazons.',
      tr: 'Bebrykler’in kralı ve Lykos’un düşmanıdır. Herakles’in Mysia durağında yenilir; ardından sefer Amazonlara doğru sürer.',
    },
  },
  {
    id: 'hesione',
    name: { en: 'Hesione', tr: 'Hesione' },
    aliases: { en: ['Hesione'], tr: ['Hesione'] },
    info: {
      en: 'Princess of Troy, daughter of Laomedon and sister of Priam. Heracles rescues her from a sea monster on the return voyage from Themiskyra.',
      tr: 'Troya prensesi, Laomedon’un kızı ve Priamos’un kız kardeşidir. Herakles onu Themiskyra dönüşünde bir deniz canavarından kurtarır.',
    },
    facts: [
      { en: 'Daughter of Laomedon', tr: 'Laomedon’un kızıdır' },
      { en: 'Sister of Priam', tr: 'Priamos’un kız kardeşidir' },
    ],
  },
  {
    id: 'laomedon',
    name: { en: 'Laomedon', tr: 'Laomedon' },
    aliases: { en: ['Laomedon'], tr: ['Laomedon'] },
    info: {
      en: 'King of Troy and father of Hesione and Priam. He promises Heracles divine mares for rescuing Hesione, then refuses to pay and creates a later feud.',
      tr: 'Troya kralı, Hesione ile Priamos’un babasıdır. Hesione’yi kurtarması karşılığında Herakles’e tanrısal kısraklar vaat eder; sonra ödemeyi reddederek daha sonraki düşmanlığı başlatır.',
    },
  },
  {
    id: 'chrysaor',
    name: { en: 'Chrysaor', tr: 'Khrysaor' },
    aliases: { en: ['Chrysaor'], tr: ['Khrysaor'] },
    info: {
      en: 'A warrior born from Medusa at the same moment as Pegasus. His name is commonly understood as “he of the golden sword.”',
      tr: 'Pegasus’la aynı anda Medusa’dan doğan savaşçıdır. Adı genellikle “altın kılıcın sahibi” olarak anlaşılır.',
    },
  },
  {
    id: 'iobates',
    name: { en: 'Iobates', tr: 'Iobates' },
    aliases: { en: ['Iobates'], tr: ['Iobates'] },
    info: {
      en: 'King of Lycia who receives Bellerophon with a sealed request for the hero’s death. He assigns the Chimera as the first deadly task.',
      tr: 'Bellerophon’u, kahramanın ölümünü isteyen mühürlü mektupla kabul eden Lykia kralıdır. İlk ölümcül görev olarak Khimaira’yı verir.',
    },
  },
  {
    id: 'agdistis',
    name: { en: 'Agdistis', tr: 'Agdistis' },
    aliases: { en: ['Agdistis'], tr: ['Agdistis'] },
    info: {
      en: 'A powerful Phrygian divinity closely linked with the Great Mother. Agdistis’s arrival turns Attis’s wedding into divine madness.',
      tr: 'Büyük Ana’yla yakından ilişkili güçlü bir Phrygia tanrısıdır. Agdistis’in gelişi Attis’in düğününü tanrısal çılgınlığa çevirir.',
    },
  },
  {
    id: 'great-mother',
    name: { en: 'Great Mother', tr: 'Büyük Ana' },
    aliases: { en: ['Great Mother'], tr: ['Büyük Ana'] },
    info: {
      en: 'Anatolia’s powerful mother goddess, widely identified with Cybele. Her cult centre at Pessinus binds her mythology to Attis.',
      tr: 'Anadolu’nun güçlü ana tanrıçası, yaygın adıyla Kybele’dir. Pessinus’taki kült merkezi onu Attis anlatısına bağlar.',
    },
  },
  {
    id: 'ganymedes',
    name: { en: 'Ganymedes', tr: 'Ganymedes' },
    aliases: { en: ['Ganymedes', 'Ganymede'], tr: ['Ganymedes'] },
    info: {
      en: 'A Trojan prince, son of King Tros and brother of Ilus and Assaracus. Zeus carries him to Olympus, grants him immortality and makes him cupbearer of the gods.',
      tr: 'Troya prensi; Kral Tros’un oğlu, İlos ile Assarakos’un kardeşidir. Zeus onu Olympos’a taşır, ölümsüz kılar ve tanrıların sakisi yapar.',
    },
    facts: [
      { en: 'Father: Tros', tr: 'Babası: Tros' },
      { en: 'Divine role: cupbearer of the gods', tr: 'Tanrısal görevi: tanrıların sakisi' },
      { en: 'The constellation Aquarius is later associated with him.', tr: 'Kova takımyıldızı sonraki gelenekte onunla ilişkilendirilir.' },
    ],
  },
  {
    id: 'tros',
    name: { en: 'Tros', tr: 'Tros' },
    aliases: { en: ['Tros'], tr: ['Tros'] },
    info: {
      en: 'Eponymous king of the Trojans and father of Ganymedes, Ilus and Assaracus. Hermes ends his grief by explaining Ganymedes’ immortality and bringing Zeus’s extraordinary horses.',
      tr: 'Troyalılara adını veren kral; Ganymedes, İlos ve Assarakos’un babasıdır. Hermes, Ganymedes’in ölümsüzlüğünü açıklayıp Zeus’un olağanüstü atlarını getirerek yasını dindirir.',
    },
    facts: [
      { en: 'Wife: Callirhoe, daughter of Scamander', tr: 'Eşi: Skamandros’un kızı Kallirhoe' },
      { en: 'His name becomes attached to the Trojans and the Troad.', tr: 'Adı Troyalılar ve Troas bölgesiyle özdeşleşir.' },
    ],
  },
]

export const mythCharacters: readonly MythCharacter[] = [
  ...figureCharacters,
  ...additionalCharacters,
]

export type StoryCharacterSegment = {
  text: string
  character?: MythCharacter
}

const escapePattern = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export function segmentStoryCharacters(text: string, locale: Locale): StoryCharacterSegment[] {
  const aliases = mythCharacters
    .flatMap((character) => character.aliases[locale].map((alias) => ({ alias, character })))
    .sort((left, right) => right.alias.length - left.alias.length)
  const characterByAlias = new Map(aliases.map(({ alias, character }) => [alias, character]))
  const pattern = new RegExp(
    `(?<![\\p{L}\\p{N}])(${aliases.map(({ alias }) => escapePattern(alias)).join('|')})(?![\\p{L}\\p{N}])`,
    'gu',
  )
  const segments: StoryCharacterSegment[] = []
  let cursor = 0

  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0
    if (index > cursor) segments.push({ text: text.slice(cursor, index) })
    const alias = match[0]
    segments.push({ text: alias, character: characterByAlias.get(alias) })
    cursor = index + alias.length
  }

  if (cursor < text.length) segments.push({ text: text.slice(cursor) })
  return segments
}

export function mythCharactersForScene(scene: MythScene, locale: Locale): MythCharacter[] {
  const storyCharacters = segmentStoryCharacters(localiseMythStory(scene, locale), locale)
    .flatMap((segment) => segment.character ? [segment.character] : [])
  const featuredIds = figureProfiles
    .filter((profile) => profile.appearanceIds.includes(scene.id))
    .map((profile) => profile.id)
  const ordered = [
    ...featuredIds.flatMap((id) => mythCharacters.find((character) => character.id === id) ?? []),
    ...storyCharacters,
  ]
  const seen = new Set<string>()

  return ordered.filter((character) => {
    if (seen.has(character.id)) return false
    seen.add(character.id)
    return true
  })
}
