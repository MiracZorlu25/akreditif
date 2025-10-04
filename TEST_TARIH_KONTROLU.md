# Tarih Kontrolü Test Senaryoları

## 📋 Test Amaçı
31C, 44C tarihlerinin 31D'den büyük olması durumunda PDF oluşturulmasının engellenmesi

## 🎯 Test Senaryoları

### ✅ Senaryo 1: Normal Durum (PDF Oluşturulmalı)
**Amaç:** Tüm tarihler doğru olduğunda PDF oluşturulabilmeli

**Test Adımları:**
1. 31D (Vade tarihi): `2025-12-31` seç
2. 31C (Başlangıç tarihi): `2025-01-15` seç  
3. 44C (Son yükleme tarihi): `2025-11-30` seç
4. "PDF Oluştur" butonuna tıkla

**Beklenen Sonuç:** ✅ PDF başarıyla oluşturulur

---

### ❌ Senaryo 2: 31C > 31D (PDF Oluşturulmamalı)
**Amaç:** Başlangıç tarihi vade tarihinden büyükse PDF oluşturulmamalı

**Test Adımları:**
1. 31D (Vade tarihi): `2025-06-15` seç
2. 31C (Başlangıç tarihi): `2025-07-20` seç (31D'den büyük!)
3. 44C (Son yükleme tarihi): `2025-05-10` seç
4. "PDF Oluştur" butonuna tıkla

**Beklenen Sonuç:** 
- ❌ PDF oluşturulmaz
- ⚠️ Alert mesajı: "Başlangıç tarihi (31C) akreditifin vadesinden (31D) büyük olamaz. PDF oluşturulamıyor."
- 🎯 Focus 31C alanına gider

---

### ❌ Senaryo 3: 44C > 31D (PDF Oluşturulmamalı)
**Amaç:** Son yükleme tarihi vade tarihinden büyükse PDF oluşturulmamalı

**Test Adımları:**
1. 31D (Vade tarihi): `2025-08-10` seç
2. 31C (Başlangıç tarihi): `2025-03-05` seç
3. 44C (Son yükleme tarihi): `2025-09-15` seç (31D'den büyük!)
4. "PDF Oluştur" butonuna tıkla

**Beklenen Sonuç:**
- ❌ PDF oluşturulmaz
- ⚠️ Alert mesajı: "Son yükleme tarihi (44C) akreditifin vadesinden (31D) büyük olamaz. PDF oluşturulamıyor."
- 🎯 Focus 44C alanına gider

---

### ❌ Senaryo 4: Hem 31C Hem 44C > 31D (PDF Oluşturulmamalı)
**Amaç:** Birden fazla tarih yanlışsa ilk hatayı yakalamalı

**Test Adımları:**
1. 31D (Vade tarihi): `2025-05-20` seç
2. 31C (Başlangıç tarihi): `2025-06-10` seç (31D'den büyük!)
3. 44C (Son yükleme tarihi): `2025-07-25` seç (31D'den büyük!)
4. "PDF Oluştur" butonuna tıkla

**Beklenen Sonuç:**
- ❌ PDF oluşturulmaz
- ⚠️ Alert mesajı: "Başlangıç tarihi (31C) akreditifin vadesinden (31D) büyük olamaz. PDF oluşturulamıyor."
- 🎯 Focus 31C alanına gider (ilk hata)

---

### ✅ Senaryo 5: Aynı Tarih (PDF Oluşturulmalı)
**Amaç:** Tarihler eşit olduğunda PDF oluşturulabilmeli

**Test Adımları:**
1. 31D (Vade tarihi): `2025-10-15` seç
2. 31C (Başlangıç tarihi): `2025-10-15` seç (eşit)
3. 44C (Son yükleme tarihi): `2025-10-15` seç (eşit)
4. "PDF Oluştur" butonuna tıkla

**Beklenen Sonuç:** ✅ PDF başarıyla oluşturulur

---

### ✅ Senaryo 6: Boş Tarihler (PDF Oluşturulmalı)
**Amaç:** Tarih alanları boşsa kontrol yapılmamalı

**Test Adımları:**
1. 31D (Vade tarihi): Boş bırak
2. 31C (Başlangıç tarihi): Boş bırak
3. 44C (Son yükleme tarihi): Boş bırak
4. "PDF Oluştur" butonuna tıkla

**Beklenen Sonuç:** ✅ PDF başarıyla oluşturulur (tarih kontrolü yapılmaz)

---

### ✅ Senaryo 7: Sadece 31D Dolu (PDF Oluşturulmalı)
**Amaç:** Sadece vade tarihi doluysa kontrol yapılmamalı

**Test Adımları:**
1. 31D (Vade tarihi): `2025-12-25` seç
2. 31C (Başlangıç tarihi): Boş bırak
3. 44C (Son yükleme tarihi): Boş bırak
4. "PDF Oluştur" butonuna tıkla

**Beklenen Sonuç:** ✅ PDF başarıyla oluşturulur

---

## 🔄 MT700 Formu Test Senaryoları

**Not:** Yukarıdaki tüm senaryolar MT700 formu için de geçerlidir.

**MT700 Test Adımları:**
1. MT700 sayfasına git (`mt700.html`)
2. Yukarıdaki senaryoları tekrarla
3. "MT700 PDF Oluştur" butonunu kullan

**Beklenen Sonuçlar:** Ana form ile aynı davranış

---

## 🧪 Test Kontrol Listesi

### ✅ Başarılı Test Kriterleri:
- [ ] Senaryo 1: Normal durum - PDF oluşturulur
- [ ] Senaryo 2: 31C > 31D - PDF oluşturulmaz, doğru alert
- [ ] Senaryo 3: 44C > 31D - PDF oluşturulmaz, doğru alert  
- [ ] Senaryo 4: Çoklu hata - İlk hata yakalanır
- [ ] Senaryo 5: Eşit tarihler - PDF oluşturulur
- [ ] Senaryo 6: Boş tarihler - PDF oluşturulur
- [ ] Senaryo 7: Sadece 31D - PDF oluşturulur
- [ ] MT700 formu - Tüm senaryolar çalışır

### 🎯 Test Sonuçları:
- **Toplam Senaryo:** 7 + MT700 testleri
- **Başarılı:** ___/7
- **Başarısız:** ___/7
- **Test Tarihi:** ___________
- **Test Eden:** ___________

---

## 🚀 Hızlı Test Komutu

**Demo Verilerle Test:**
1. "Demo Veri Yükle" butonuna tıkla
2. 31C'yi `2025-12-31`'den `2026-01-15`'e değiştir (hatalı yap)
3. "PDF Oluştur" butonuna tıkla
4. Alert mesajını kontrol et

**Beklenen:** ❌ "Başlangıç tarihi (31C) akreditifin vadesinden (31D) büyük olamaz. PDF oluşturulamıyor."
