# Para Formatı Test Senaryoları

## 📋 Test Amaçı
Para alanlarının otomatik olarak Türkçe formatına (000.000.000,00) dönüştürülmesi

## 🎯 Test Alanları
- **32B Tutar** (`f32B_amt`)
- **39B Azami Tutar** (`f39B`) 
- **39C İlave Tutar** (`f39C_amt`)

## 🧪 Test Senaryoları

### ✅ Senaryo 1: Basit Sayılar
**Test:** Kullanıcı `1000000` yazar

**Beklenen Sonuç:** `1.000.000,00`

**Test Adımları:**
1. 32B Tutar alanına `1000000` yaz
2. Alandan çık (Tab veya başka alana tıkla)
3. Değerin `1.000.000,00` olduğunu kontrol et

---

### ✅ Senaryo 2: Ondalıklı Sayılar (Nokta)
**Test:** Kullanıcı `12345.67` yazar

**Beklenen Sonuç:** `12.345,67`

**Test Adımları:**
1. 39B alanına `12345.67` yaz
2. Enter tuşuna bas VEYA alandan çık
3. Değerin `12.345,67` olduğunu kontrol et

---

### ✅ Senaryo 3: Ondalıklı Sayılar (Virgül)
**Test:** Kullanıcı `5000,50` yazar

**Beklenen Sonuç:** `5.000,50`

**Test Adımları:**
1. 39C Tutar alanına `5000,50` yaz
2. Alandan çık
3. Değerin `5.000,50` olduğunu kontrol et

---

### ✅ Senaryo 4: Büyük Sayılar
**Test:** Kullanıcı `123456789` yazar

**Beklenen Sonuç:** `123.456.789,00`

**Test Adımları:**
1. 32B Tutar alanına `123456789` yaz
2. Alandan çık
3. Değerin `123.456.789,00` olduğunu kontrol et

---

### ✅ Senaryo 5: Zaten Doğru Format
**Test:** Kullanıcı `10.000,00` yazar

**Beklenen Sonuç:** `10.000,00` (değişmez)

**Test Adımları:**
1. 39B alanına `10.000,00` yaz
2. Alandan çık
3. Değerin `10.000,00` olarak kaldığını kontrol et

---

### ✅ Senaryo 6: Amerikan Formatı
**Test:** Kullanıcı `1,234,567.89` yazar

**Beklenen Sonuç:** `1.234.567,89`

**Test Adımları:**
1. 32B Tutar alanına `1,234,567.89` yaz
2. Alandan çık
3. Değerin `1.234.567,89` olduğunu kontrol et

---

### ✅ Senaryo 7: Küçük Ondalık
**Test:** Kullanıcı `5.5` yazar

**Beklenen Sonuç:** `5,50`

**Test Adımları:**
1. 39C Tutar alanına `5.5` yaz
2. Enter tuşuna bas
3. Değerin `5,50` olduğunu kontrol et

---

### ❌ Senaryo 8: Geçersiz Giriş
**Test:** Kullanıcı `abc123` yazar

**Beklenen Sonuç:** Boş alan (temizlenir)

**Test Adımları:**
1. 32B Tutar alanına `abc123` yaz
2. Alandan çık
3. Alanın boş kaldığını kontrol et

---

### ✅ Senaryo 9: Sıfır Değerler
**Test:** Kullanıcı `0` yazar

**Beklenen Sonuç:** `0,00`

**Test Adımları:**
1. 39B alanına `0` yaz
2. Alandan çık
3. Değerin `0,00` olduğunu kontrol et

---

### ✅ Senaryo 10: Negatif Sayılar
**Test:** Kullanıcı `-1000` yazar

**Beklenen Sonuç:** Boş alan (negatif kabul edilmez)

**Test Adımları:**
1. 39C Tutar alanına `-1000` yaz
2. Alandan çık
3. Alanın boş kaldığını kontrol et

---

## 🔄 MT700 Formu Testleri

**Not:** Yukarıdaki tüm senaryolar MT700 formu için de geçerlidir.

**MT700 Test Alanları:**
- `mt32B_amt` (32B Tutar)
- `mt39B` (39B Azami Tutar)
- `mt39C_amt` (39C İlave Tutar)

---

## 🎮 Hızlı Test Komutu

**Console'da Test:**
```javascript
// Fonksiyonu test et
formatToTurkishCurrency('1000000')     // → "1.000.000,00"
formatToTurkishCurrency('12345.67')    // → "12.345,67"
formatToTurkishCurrency('5000,50')     // → "5.000,50"
formatToTurkishCurrency('abc123')      // → ""
```

**Manuel Test:**
1. F12 → Console aç
2. Yukarıdaki komutları çalıştır
3. Sonuçları kontrol et

---

## 🧪 Test Kontrol Listesi

### ✅ Ana Form (index.html):
- [ ] 32B Tutar - Basit sayılar
- [ ] 32B Tutar - Ondalıklı sayılar
- [ ] 32B Tutar - Büyük sayılar
- [ ] 39B - Zaten doğru format
- [ ] 39B - Amerikan formatı
- [ ] 39C Tutar - Küçük ondalık
- [ ] Geçersiz giriş temizleniyor
- [ ] Sıfır değerler çalışıyor
- [ ] Negatif sayılar reddediliyor

### ✅ MT700 Form (mt700.html):
- [ ] mt32B_amt - Tüm formatlar
- [ ] mt39B - Tüm formatlar  
- [ ] mt39C_amt - Tüm formatlar

### 🎯 Test Sonuçları:
- **Toplam Senaryo:** 10 x 2 form = 20 test
- **Başarılı:** ___/20
- **Başarısız:** ___/20
- **Test Tarihi:** ___________
- **Test Eden:** ___________

---

## 🚀 Otomatik Test

**Demo ile Test:**
1. "Demo Veri Yükle" butonuna tıkla
2. 32B Tutar alanını `1000000` olarak değiştir
3. Alandan çık
4. `1.000.000,00` formatına dönüştüğünü kontrol et

**Console Log Kontrolü:**
- F12 → Console aç
- Para alanlarından çıkarken log mesajları görülmeli
- Örnek: `"Formatted f32B_amt: 1000000 -> 1.000.000,00"`
