# MYTHOS

Yunan mitolojisini bir ezber listesinden çıkarıp oynanabilir bir keşif deneyimine dönüştüren web oyunu.

## İlk prototip

- Beş sahnelik tam oyun döngüsü
- Mit seçimi ve mitolojik harita tahmini
- Her turda 10.000, oyunda 50.000 azami Kehanet Puanı
- Kademeli kahin ipuçları
- Tur sonu kaynak ve bağlam kartı
- Kişisel rekoru tarayıcıda saklama
- Mit kütüphanesi ve atlas sayfaları
- Beş gerçek 2:1 equirectangular 360° sahne
- Kürenin merkezinden WebGL POV; sürükleme, dokunma, klavye ve FOV kontrolü
- Mobil ve masaüstü yerleşimler

## Puanlama

| Bileşen | Azami puan |
| --- | ---: |
| Miti doğru tanıma | 3.500 |
| Harita yakınlığı | 4.000 |
| Kalan süre | 1.500 |
| Kahinsiz tamamlama | 1.000 |
| **Tur toplamı** | **10.000** |

Konum puanı, işaretlenen noktanın doğru noktaya Öklid uzaklığına göre üstel biçimde azalır. İlk ipucu kahinsiz bonusunu 750 puana düşürür; sonraki ipuçları bonusu azaltmaya devam eder.

## Yerel geliştirme

```bash
npm install
npm run dev
```

Üretim kontrolü:

```bash
npm run check
npm run build
```

## 360° sahneler

Sahneler `public/assets/` altında 1774×887 WebP dosyaları olarak tutulur. Bunlar yatayda 360°, dikeyde 180° alan kaplayan, ufku orta çizgide bulunan equirectangular küre dokularıdır. `SphereViewer.tsx`, dokuyu iç yüzü çevrilmiş bir Three.js küresine sarar ve kamerayı kürenin merkezinde tutar.

Bir görsel yalnızca 2:1 olduğu için 360° kabul edilmez. Entegrasyon öncesinde sol–sağ dikiş, zenit/nadir ve 0°/90°/180°/270° perspektifleri yeniden projeksiyonla kontrol edilir. Üretim sözleşmesi ve sahne istemleri `docs/` klasöründedir.

## Yayın

`.github/workflows/deploy-pages.yml`, `main` dalına gönderilen her değişiklikte Vite çıktısını GitHub Pages’e hazırlar. Depo ayarlarında Pages kaynağı olarak **GitHub Actions** seçilmelidir.
