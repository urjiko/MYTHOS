import type { AtlasPlace } from './data'
import type { Locale } from './i18n'

const mapTypesTr: Record<string, string> = {
  Gods: 'Tanrılar',
  Oracle: 'Kehanet',
  Polis: 'Polis',
  Heroes: 'Kahramanlar',
  War: 'Savaş',
  Odyssey: 'Odysseia',
  Tragedy: 'Tragedya',
  Kings: 'Krallar',
  Sanctuary: 'Kutsal alan',
  Underworld: 'Yeraltı Dünyası',
  Metamorphosis: 'Dönüşüm',
  'Trojan Prelude': 'Troya’ya Giden Yol',
  'Theban Cycle': 'Thebai Döngüsü',
  'Phrygian Cycle': 'Phrygia Döngüsü',
  'Lydian Cycle': 'Lydia Döngüsü',
  'Carian Cycle': 'Karia Döngüsü',
  Argonautica: 'Argonautika',
  'Sea Legend': 'Deniz Efsanesi',
  'Labours of Heracles': 'Herakles’in Görevleri',
  'Lycian Sanctuary': 'Lykia Kutsal Alanı',
  'Phrygian Sanctuary': 'Phrygia Kutsal Alanı',
  'Ancient Strait': 'Antik Boğaz',
}

const mapPeriodsTr: Record<string, string> = {
  'Mythic landscape': 'Mitik coğrafya',
  'Archaic–Roman': 'Arkaik–Roma',
  'Bronze Age–Roman': 'Tunç Çağı–Roma',
  'Bronze Age': 'Tunç Çağı',
  'Homeric landscape': 'Homeros coğrafyası',
  'Homeric regional placement': 'Homeros anlatısına dayalı bölgesel konum',
  'Traditional placement': 'Geleneksel konumlandırma',
  'Underworld analogue': 'Yeraltı dünyası benzeri',
  'Literary landscape': 'Edebî coğrafya',
  'Mythic direction': 'Mitik yön',
  'Ancient mountain': 'Antik dağ',
  'Low-confidence literary placement': 'Düşük kesinlikli edebî konum',
  'Iron Age–Roman': 'Demir Çağı–Roma',
  'Phrygian–Roman': 'Phrygia–Roma',
  'Carian–Roman': 'Karia–Roma',
  'Lydian–Roman': 'Lydia–Roma',
  'Ancient literary landscape': 'Antik edebî coğrafya',
  'Low-confidence regional placement': 'Düşük kesinlikli bölgesel konum',
  'Classical–Roman': 'Klasik–Roma',
}

const mapRegionsTr: Record<string, string> = {
  'MAGNA GRAECIA': 'BÜYÜK YUNANİSTAN',
  HELLAS: 'HELLAS',
  MACEDONIA: 'MAKEDONYA',
  THRACE: 'TRAKYA',
  'ASIA MINOR': 'KÜÇÜK ASYA',
  CRETE: 'GİRİT',
  LYCIA: 'LİKYA',
  'AEGEAN SEA': 'EGE DENİZİ',
  'IONIAN SEA': 'İYON DENİZİ',
  SICILIA: 'SİCİLYA',
}

export function mapLabelForPlace(place: AtlasPlace, locale: Locale) {
  return place.gameName?.[locale] ?? place.name
}

export function mapTypeLabel(type: string, locale: Locale) {
  return locale === 'tr' ? mapTypesTr[type] ?? type : type
}

export function mapPeriodLabel(period: string, locale: Locale) {
  return locale === 'tr' ? mapPeriodsTr[period] ?? period : period
}

export function mapRegionLabel(region: string, locale: Locale) {
  return locale === 'tr' ? mapRegionsTr[region] ?? region : region
}
