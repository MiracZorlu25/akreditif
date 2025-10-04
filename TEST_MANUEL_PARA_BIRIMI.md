# Manuel Para Birimi Test Senaryoları

## 📋 Test Amaçı
"Diğer" seçeneği ile manuel para birimi girişi ve senkronizasyon

## 🎯 Test Alanları
- **32B Para Cinsi** (`f32B_ccy` + `f32B_ccy_other`)
- **39C Para Cinsi** (`f39C_ccy` + `f39C_ccy_other`)

## 🧪 Test Senaryoları

### ✅ Senaryo 1: 32B'de "Diğer" Seçimi
**Test:** 32B para biriminde "Diğer (Manuel Giriş)" seç

**Beklenen Sonuç:** Manuel giriş alanı görünür ve odaklanır

**Test Adımları:**
1. Ana formu aç (`index.html`)
2. 32B Para Cinsi'nden `Diğer (Manuel Giriş)` seç
3. Manuel giriş alanının göründüğünü kontrol et
4. Alanın otomatik odaklandığını kontrol et
5. Placeholder: `"Para birimi kodunu yazın (örn: CNY)"`

---

### ✅ Senaryo 2: Manuel Para Birimi Girişi
**Test:** Manuel alana "CNY" yaz

**Beklenen Sonuç:** Otomatik büyük harfe dönüşür ve 39C'ye kopyalanır

**Test Adımları:**
1. 32B'de "Diğer" seçili iken manuel alana `cny` yaz
2. Değerin otomatik `CNY` olduğunu kontrol et
3. 39C Para Cinsi'nin `Diğer (Manuel Giriş)` olduğunu kontrol et
4. 39C manuel alanının `CNY` olduğunu kontrol et
5. Console'da log mesajını kontrol et: `"32B manuel para birimi: CNY -> 39C'ye kopyalandı"`

---

### ✅ Senaryo 3: 39C'den Manuel Giriş
**Test:** 39C'de "Diğer" seçip "JPY" yaz

**Beklenen Sonuç:** 32B'ye otomatik kopyalanır

**Test Adımları:**
1. 39C Para Cinsi'nden `Diğer (Manuel Giriş)` seç
2. Manuel alana `jpy` yaz
3. Değerin otomatik `JPY` olduğunu kontrol et
4. 32B Para Cinsi'nin `Diğer (Manuel Giriş)` olduğunu kontrol et
5. 32B manuel alanının `JPY` olduğunu kontrol et
6. Console'da log mesajını kontrol et: `"39C manuel para birimi: JPY -> 32B'ye kopyalandı"`

---

### ✅ Senaryo 4: Dropdown'dan Manuel'e Geçiş
**Test:** USD seçili iken "Diğer"e geç

**Beklenen Sonuç:** Manuel alan açılır, diğer alan da senkronize olur

**Test Adımları:**
1. 32B Para Cinsi'ni `USD - Amerikan Doları` seç
2. 39C'nin otomatik `USD - Amerikan Doları` olduğunu kontrol et
3. 32B'yi `Diğer (Manuel Giriş)` yap
4. Manuel alanın göründüğünü kontrol et
5. 39C'nin hala `USD - Amerikan Doları` olduğunu kontrol et (değişmemeli)

---

### ✅ Senaryo 5: Manuel'den Dropdown'a Geçiş
**Test:** Manuel "CNY" iken dropdown seçimi yap

**Beklenen Sonuç:** Manuel alan gizlenir, senkronizasyon çalışır

**Test Adımları:**
1. 32B'de "Diğer" seçili ve manuel alan `CNY` olsun
2. 32B'yi `EUR - Euro` yap
3. Manuel alanın gizlendiğini kontrol et
4. 39C'nin otomatik `EUR - Euro` olduğunu kontrol et
5. 39C manuel alanının gizlendiğini kontrol et

---

### ✅ Senaryo 6: Kısa Giriş Kontrolü
**Test:** 3 karakterden az giriş

**Beklenen Sonuç:** Senkronizasyon çalışmaz

**Test Adımları:**
1. 32B'de "Diğer" seçili iken manuel alana `CN` yaz
2. 39C'nin değişmediğini kontrol et (senkronize olmamalı)
3. Manuel alana `CNY` yaz (3 karakter)
4. Şimdi 39C'nin senkronize olduğunu kontrol et

---

### ✅ Senaryo 7: PDF Generation Test
**Test:** Manuel para birimi ile PDF oluştur

**Beklenen Sonuç:** PDF'de manuel para birimi görünür

**Test Adımları:**
1. 32B'de "Diğer" seç ve `CNY` yaz
2. 32B Tutar'a `50.000,00` yaz
3. Diğer gerekli alanları doldur
4. "PDF Oluştur" butonuna tıkla
5. PDF'de `32B: Currency Code, Amount` satırında `CNY50.000,00` göründüğünü kontrol et

---

### ✅ Senaryo 8: MT700 Form Testi
**Test:** MT700 formunda manuel para birimi

**Beklenen Sonuç:** MT700'de de aynı özellikler çalışır

**Test Adımları:**
1. MT700 formu aç (`mt700.html`)
2. 32B Para Kodu'ndan `Diğer (Manuel Giriş)` seç
3. Manuel alana `KRW` yaz
4. 39C Para Cinsi'nin otomatik senkronize olduğunu kontrol et
5. Console'da `"MT700 32B manuel para birimi: KRW -> 39C'ye kopyalandı"` mesajını kontrol et

---

### ✅ Senaryo 9: Form Arası Senkronizasyon
**Test:** Ana form → MT700 manuel para birimi aktarımı

**Beklenen Sonuç:** Manuel girişler de aktarılır

**Test Adımları:**
1. Ana formda 32B'de "Diğer" seç ve `THB` yaz
2. "MT700 Formuna Git" butonuna tıkla
3. MT700'de mt32B_ccy'nin `Diğer (Manuel Giriş)` olduğunu kontrol et
4. mt32B_ccy_other alanının `THB` olduğunu kontrol et
5. mt39C_ccy'nin de senkronize olduğunu kontrol et

---

### ✅ Senaryo 10: Validation Test
**Test:** Manuel alanda geçersiz giriş

**Beklenen Sonuç:** Pattern validation çalışır

**Test Adımları:**
1. 32B'de "Diğer" seç
2. Manuel alana `12345` yaz (sayı)
3. Form validation'ın çalıştığını kontrol et
4. Pattern: `[A-Z]{3}` (3 büyük harf)
5. `CNY` gibi geçerli giriş yapınca validation'ın geçtiğini kontrol et

---

## 🔄 MT700 Formu Testleri

**MT700 Test Alanları:**
- `mt32B_ccy` + `mt32B_ccy_other`
- `mt39C_ccy` + `mt39C_ccy_other`

**Test Senaryoları:**
- Yukarıdaki tüm senaryolar MT700 için de geçerli
- Console log'ları `"MT700"` prefix'i ile başlar

---

## 🎮 Hızlı Test Komutu

**Console'da Test:**
```javascript
// Manuel para birimi test et
document.getElementById('f32B_ccy').value = 'OTHER';
document.getElementById('f32B_ccy').dispatchEvent(new Event('change'));
document.getElementById('f32B_ccy_other').value = 'CNY';
document.getElementById('f32B_ccy_other').dispatchEvent(new Event('input'));

// Sonucu kontrol et
console.log('32B:', document.getElementById('f32B_ccy').value);
console.log('32B Other:', document.getElementById('f32B_ccy_other').value);
console.log('39C:', document.getElementById('f39C_ccy').value);
console.log('39C Other:', document.getElementById('f39C_ccy_other').value);
```

---

## 🧪 Test Kontrol Listesi

### ✅ Ana Form (index.html):
- [ ] 32B "Diğer" seçimi → manuel alan görünür
- [ ] 39C "Diğer" seçimi → manuel alan görünür
- [ ] Manuel giriş → otomatik büyük harf
- [ ] Manuel giriş → senkronizasyon (3+ karakter)
- [ ] Dropdown → Manuel geçiş
- [ ] Manuel → Dropdown geçiş
- [ ] PDF generation ile manuel para birimi
- [ ] Validation (pattern [A-Z]{3})

### ✅ MT700 Form (mt700.html):
- [ ] mt32B_ccy "Diğer" seçimi
- [ ] mt39C_ccy "Diğer" seçimi
- [ ] Manuel giriş senkronizasyonu
- [ ] PDF generation ile manuel para birimi
- [ ] Form arası veri aktarımı

### 🎯 Test Sonuçları:
- **Toplam Senaryo:** 10 x 2 form = 20 test
- **Başarılı:** ___/20
- **Başarısız:** ___/20
- **Test Tarihi:** ___________
- **Test Eden:** ___________

---

## 🚀 Demo Test

**Hızlı Demo:**
1. Ana formu aç
2. 32B Para Cinsi → `Diğer (Manuel Giriş)` seç
3. Manuel alana `cny` yaz → `CNY` olur
4. 39C'nin otomatik senkronize olduğunu gör
5. F12 → Console'da log mesajlarını kontrol et

**Beklenen Console Çıktısı:**
```
32B manuel para birimi: CNY -> 39C'ye kopyalandı
```

**PDF Test:**
1. Gerekli alanları doldur
2. "PDF Oluştur" tıkla
3. PDF'de `32B: Currency Code, Amount` satırında `CNY` göründüğünü kontrol et
