# 51A Alanı Uyarı Sistemi Test Senaryoları

## 📋 Test Amaçı
51A alanı boş olduğunda kullanıcıya uyarı göstermek ama PDF oluşturmaya izin vermek

## 🎯 Test Senaryoları

### ⚠️ Senaryo 1: 51A Boş - Uyarı Göster (PDF İptal)
**Amaç:** 51A boş olduğunda uyarı gösterilmeli ve kullanıcı iptal edebilmeli

**Test Adımları:**
1. Formu doldur (51A alanını boş bırak)
2. Diğer zorunlu alanları doldur
3. "PDF Oluştur" butonuna tıkla
4. Uyarı popup'ında "İptal" (Cancel) seç

**Beklenen Sonuç:** 
- ⚠️ Popup mesajı görülür:
  ```
  ⚠️ UYARI: 51A - Amir/Alıcının bankası alanı boş!
  
  Bu alan opsiyonel olmasına rağmen, akreditif işlemlerinde önemlidir.
  Boş bırakmanız durumunda:
  • Banka işlem süreçlerinde gecikme olabilir
  • Ek bilgi talep edilebilir
  • İşlem reddedilebilir
  
  PDF oluşturmaya devam etmek istiyor musunuz?
  ```
- ❌ PDF oluşturulmaz
- 🎯 Focus 51A alanına gider

---

### ✅ Senaryo 2: 51A Boş - Uyarı Göster (PDF Devam)
**Amaç:** 51A boş olduğunda uyarı gösterilmeli ama kullanıcı devam edebilmeli

**Test Adımları:**
1. Formu doldur (51A alanını boş bırak)
2. Diğer zorunlu alanları doldur
3. "PDF Oluştur" butonuna tıkla
4. Uyarı popup'ında "Tamam" (OK) seç

**Beklenen Sonuç:**
- ⚠️ Popup mesajı görülür (yukarıdaki ile aynı)
- ✅ PDF başarıyla oluşturulur
- 📄 PDF'de 51A alanı boş görünür

---

### ✅ Senaryo 3: 51A Dolu - Uyarı Yok
**Amaç:** 51A dolu olduğunda uyarı gösterilmemeli

**Test Adımları:**
1. 51A alanını doldur: `AKBANK T.A.S. SWIFT: AKBKTRIS`
2. Diğer zorunlu alanları doldur
3. "PDF Oluştur" butonuna tıkla

**Beklenen Sonuç:**
- ✅ Hiçbir uyarı gösterilmez
- ✅ PDF doğrudan oluşturulur
- 📄 PDF'de 51A alanı dolu görünür

---

### ⚠️ Senaryo 4: 51A Sadece Boşluk - Uyarı Göster
**Amaç:** 51A sadece boşluk karakterleri içeriyorsa uyarı gösterilmeli

**Test Adımları:**
1. 51A alanına sadece boşluk karakterleri gir: `   `
2. Diğer zorunlu alanları doldur
3. "PDF Oluştur" butonuna tıkla
4. Uyarı popup'ında "Tamam" seç

**Beklenen Sonuç:**
- ⚠️ Popup mesajı görülür (boş kabul edilir)
- ✅ PDF oluşturulur (kullanıcı onaylarsa)

---

### 🔄 Senaryo 5: MT700 Formu - Aynı Davranış
**Amaç:** MT700 formunda da aynı uyarı sistemi çalışmalı

**Test Adımları:**
1. MT700 sayfasına git (`mt700.html`)
2. Formu doldur (51A boş bırak)
3. "MT700 PDF Oluştur" butonuna tıkla
4. Uyarı popup'ında "İptal" seç

**Beklenen Sonuç:**
- ⚠️ Aynı popup mesajı görülür
- ❌ PDF oluşturulmaz

---

### ✅ Senaryo 6: Demo Veri ile Test
**Amaç:** Demo veri yüklendikten sonra 51A'yı silip test etmek

**Test Adımları:**
1. "Demo Veri Yükle" butonuna tıkla
2. 51A alanını temizle (boş yap)
3. "PDF Oluştur" butonuna tıkla
4. Uyarı popup'ında "Tamam" seç

**Beklenen Sonuç:**
- ⚠️ Popup mesajı görülür
- ✅ PDF oluşturulur (diğer veriler dolu)

---

## 🧪 Test Kontrol Listesi

### ✅ Başarılı Test Kriterleri:
- [ ] Senaryo 1: Boş 51A - Uyarı göster, iptal edilebilir
- [ ] Senaryo 2: Boş 51A - Uyarı göster, devam edilebilir
- [ ] Senaryo 3: Dolu 51A - Uyarı gösterilmez
- [ ] Senaryo 4: Boşluk 51A - Uyarı gösterilir
- [ ] Senaryo 5: MT700 - Aynı davranış
- [ ] Senaryo 6: Demo veri - Çalışır

### 📝 Uyarı Mesajı Kontrolü:
- [ ] Başlık: "⚠️ UYARI: 51A - Amir/Alıcının bankası alanı boş!"
- [ ] Açıklama: "Bu alan opsiyonel olmasına rağmen..."
- [ ] Risk listesi: 3 madde (gecikme, bilgi talebi, red)
- [ ] Soru: "PDF oluşturmaya devam etmek istiyor musunuz?"
- [ ] Butonlar: "Tamam" ve "İptal"

### 🎯 Test Sonuçları:
- **Toplam Senaryo:** 6
- **Başarılı:** ___/6
- **Başarısız:** ___/6
- **Test Tarihi:** ___________
- **Test Eden:** ___________

---

## 🚀 Hızlı Test Komutu

**En Hızlı Test:**
1. Sayfayı aç
2. Sadece zorunlu alanları doldur (51A boş bırak)
3. PDF butonuna tıkla
4. Popup'ı kontrol et

**Beklenen:** ⚠️ "51A - Amir/Alıcının bankası alanı boş!" uyarısı

---

## 📋 Test Notları

- **51A Alanı:** Opsiyonel ama önemli
- **Uyarı Türü:** Bilgilendirme (engelleyici değil)
- **PDF Oluşturma:** Kullanıcı onayıyla devam eder
- **Focus:** İptal durumunda 51A alanına gider
- **MT700:** Ana form ile aynı davranış
