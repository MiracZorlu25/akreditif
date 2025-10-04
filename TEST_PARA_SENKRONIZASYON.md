# Para Birimi Senkronizasyon Test Senaryoları

## 📋 Test Amaçı
32B ve 39C para birimlerinin her zaman aynı olması

## 🎯 Test Alanları
- **32B Para Cinsi** (`f32B_ccy`)
- **39C Para Cinsi** (`f39C_ccy`)

## 🧪 Test Senaryoları

### ✅ Senaryo 1: 32B Değiştiğinde 39C Güncellenir
**Test:** 32B para birimini USD'den EUR'ya değiştir

**Beklenen Sonuç:** 39C para birimi otomatik olarak EUR olur

**Test Adımları:**
1. Ana formu aç (`index.html`)
2. 32B Para Cinsi'ni `EUR - Euro` seç
3. 39C Para Cinsi'nin otomatik olarak `EUR - Euro` olduğunu kontrol et
4. F12 → Console'da log mesajını kontrol et: `"32B para birimi değişti: EUR -> 39C'ye kopyalandı"`

---

### ✅ Senaryo 2: 39C Değiştiğinde 32B Güncellenir
**Test:** 39C para birimini USD'den GBP'ye değiştir

**Beklenen Sonuç:** 32B para birimi otomatik olarak GBP olur

**Test Adımları:**
1. Ana formu aç (`index.html`)
2. 39C Para Cinsi'ni `GBP - İngiliz Sterlini` seç
3. 32B Para Cinsi'nin otomatik olarak `GBP - İngiliz Sterlini` olduğunu kontrol et
4. F12 → Console'da log mesajını kontrol et: `"39C para birimi değişti: GBP -> 32B'ye kopyalandı"`

---

### ✅ Senaryo 3: Demo Data ile Test
**Test:** Demo veri yükle ve para birimlerini kontrol et

**Beklenen Sonuç:** Hem 32B hem 39C para birimi USD olur

**Test Adımları:**
1. Ana formu aç (`index.html`)
2. "Demo Veri Yükle" butonuna tıkla
3. 32B Para Cinsi = `USD - Amerikan Doları` olduğunu kontrol et
4. 39C Para Cinsi = `USD - Amerikan Doları` olduğunu kontrol et

---

### ✅ Senaryo 4: Çoklu Değişiklik Testi
**Test:** Para birimlerini birkaç kez değiştir

**Beklenen Sonuç:** Her değişiklikte senkronizasyon çalışır

**Test Adımları:**
1. 32B'yi `TRY - Türk Lirası` yap → 39C otomatik TRY olmalı
2. 39C'yi `CHF - İsviçre Frangı` yap → 32B otomatik CHF olmalı
3. 32B'yi `CAD - Kanada Doları` yap → 39C otomatik CAD olmalı
4. Her adımda console log'ları kontrol et

---

### ✅ Senaryo 5: MT700 Formu Senkronizasyonu
**Test:** MT700 formunda para birimi senkronizasyonu

**Beklenen Sonuç:** MT700'de de aynı senkronizasyon çalışır

**Test Adımları:**
1. MT700 formu aç (`mt700.html`)
2. 32B Para Kodu'nu `EUR` seç
3. 39C Para Cinsi'nin otomatik `EUR` olduğunu kontrol et
4. Console'da `"MT700 32B para birimi değişti: EUR -> 39C'ye kopyalandı"` mesajını kontrol et

---

### ✅ Senaryo 6: Boş Değer Testi
**Test:** Para birimini boş bırak

**Beklenen Sonuç:** Boş değer diğer alana kopyalanmaz

**Test Adımları:**
1. 32B Para Cinsi'ni `USD` seç (39C otomatik USD olur)
2. 32B Para Cinsi'ni `Seçiniz` (boş) yap
3. 39C'nin USD olarak kalması gerekir (değişmemeli)
4. Console'da herhangi bir log mesajı olmamalı

---

### ✅ Senaryo 7: Form Arası Senkronizasyon
**Test:** Ana form → MT700 veri aktarımı

**Beklenen Sonuç:** Veriler aktarılırken para birimleri aynı kalır

**Test Adımları:**
1. Ana formda 32B = `EUR`, 39C = `EUR` yap
2. "MT700 Formuna Git" butonuna tıkla
3. MT700'de mt32B_ccy = `EUR`, mt39C_ccy = `EUR` olduğunu kontrol et

---

## 🔄 MT700 Formu Testleri

**MT700 Test Alanları:**
- `mt32B_ccy` (32B Para Kodu)
- `mt39C_ccy` (39C Para Cinsi)

**Test Senaryoları:**
- Yukarıdaki tüm senaryolar MT700 için de geçerli
- Console log'ları `"MT700"` prefix'i ile başlar

---

## 🎮 Hızlı Test Komutu

**Console'da Test:**
```javascript
// Para birimi senkronizasyonunu test et
document.getElementById('f32B_ccy').value = 'EUR';
document.getElementById('f32B_ccy').dispatchEvent(new Event('change'));
// 39C'nin EUR olup olmadığını kontrol et
console.log('39C değeri:', document.getElementById('f39C_ccy').value);
```

---

## 🧪 Test Kontrol Listesi

### ✅ Ana Form (index.html):
- [ ] 32B → 39C senkronizasyonu
- [ ] 39C → 32B senkronizasyonu  
- [ ] Demo data para birimleri aynı
- [ ] Çoklu değişiklik testi
- [ ] Boş değer testi
- [ ] Console log mesajları

### ✅ MT700 Form (mt700.html):
- [ ] mt32B_ccy → mt39C_ccy senkronizasyonu
- [ ] mt39C_ccy → mt32B_ccy senkronizasyonu
- [ ] Form arası veri aktarımı
- [ ] Console log mesajları (MT700 prefix)

### 🎯 Test Sonuçları:
- **Toplam Senaryo:** 7 x 2 form = 14 test
- **Başarılı:** ___/14
- **Başarısız:** ___/14
- **Test Tarihi:** ___________
- **Test Eden:** ___________

---

## 🚀 Otomatik Test

**Hızlı Test Adımları:**
1. F12 → Console aç
2. Ana formu aç
3. Aşağıdaki kodu çalıştır:

```javascript
// Test 1: 32B değiştir
document.getElementById('f32B_ccy').value = 'EUR';
document.getElementById('f32B_ccy').dispatchEvent(new Event('change'));
console.log('Test 1 - 39C değeri:', document.getElementById('f39C_ccy').value);

// Test 2: 39C değiştir  
document.getElementById('f39C_ccy').value = 'GBP';
document.getElementById('f39C_ccy').dispatchEvent(new Event('change'));
console.log('Test 2 - 32B değeri:', document.getElementById('f32B_ccy').value);
```

**Beklenen Console Çıktısı:**
```
32B para birimi değişti: EUR -> 39C'ye kopyalandı
Test 1 - 39C değeri: EUR
39C para birimi değişti: GBP -> 32B'ye kopyalandı  
Test 2 - 32B değeri: GBP
```
