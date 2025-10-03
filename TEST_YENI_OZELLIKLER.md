# Test Adımları - Yeni Özellikler

## ✅ Tamamlanan Değişiklikler

### 🔸 **40A Alanı - Birden Fazla Seçim**
- **Önceki Durum**: Tek seçim dropdown
- **Yeni Durum**: Birden fazla checkbox seçimi
- **Test**: IRREVOCABLE + TRANSFERABLE seçerek "IRREVOCABLE TRANSFERABLE" çıktısı alın

### 🔸 **31D Alanı - Etiket Değişikliği**
- **Önceki Durum**: "31D - Akreditifin vadesi (Place of Expiry)"
- **Yeni Durum**: "31D - Expiry date"
- **Test**: Etiketin değiştiğini ve tarih format notunun silindiğini kontrol edin

### 🔸 **32B Alanı - Para Cinsi Seçimi**
- **Öncesi**: Text input (USD, EUR yazma)
- **Yeni**: Dropdown seçimi (TRY - Türk Lirası, USD - Amerikan Doları, vb.)
- **Test**: Para birimi seçin ve format 00.000,00 olarak girin (örn: 10.000,00)

### 🔸 **39A Alanı - Format Değişikliği**
- **Öncesi**: 00/00 formatı (sadece 2 haneli sayılar)
- **Yeni**: ----/---- formatı (tire de kabul eder)
- **Test**: 10/10, ----/5, 15/---- gibi değerler girin

### 🔸 **39B Alanı - Para Formatı**
- **Öncesi**: 12.345,78 formatı
- **Yeni**: 00.000,00 formatı (pattern kontrolü)
- **Test**: 10.000,00 veya 120.000,00 formatında girin

### 🔸 **39C Alanı - Para Formatı ve Not**
- **Öncesi**: "Küsürat ile yazın" notu
- **Yeni**: "Para formatı: 00.000,00" notu
- **Test**: 5.000,00 formatında girin

### 🔸 **44D Alanı - Zaman Aralığı**
- **Öncesi**: "NOT EARLIER THAN 071120 AND NOT LATER THAN 071122"
- **Yeni**: "10.01.20xx – 14.03.20xx" placeholder
- **Açıklama**: "Yükleme periyodu (örn: BETWEEN …. AND ….., NOT EARLIER THAN..., NOT BEFORE ….)"

### 🔸 **YYMMDD Notları Silindi**
- **Değişiklik**: Tüm "PDF'de YYMMDD formatında görünecek" notları silindi
- **Test**: 31C, 31D, 44C alanlarında bu notun olmadığını kontrol edin

## 🧪 Test Senaryoları

### **Senaryo 1: 40A Birden Fazla Seçim**
1. 40A alanında IRREVOCABLE seçin
2. TRANSFERABLE de seçin
3. PDF önizleme yapın
4. Çıktıda "IRREVOCABLE TRANSFERABLE" göründüğünü kontrol edin

### **Senaryo 2: Para Formatları**
1. 32B para cinsi: USD seçin
2. 32B tutar: 100.000,00 girin
3. 39B: 110.000,00 girin
4. 39C tutar: 5.000,00 girin
5. Tüm formatların doğru kabul edildiğini kontrol edin

### **Senaryo 3: 39A Tolerans Formatı**
1. 39A alanına "10/10" girin ✅
2. "----/5" girin ✅
3. "15/----" girin ✅
4. "ABC/10" girin ❌ (hata vermeli)

### **Senaryo 4: 44D Zaman Aralığı**
1. 44D alanına "BETWEEN 10.01.2025 AND 14.03.2025" girin
2. "NOT EARLIER THAN 01.02.2025" girin
3. "NOT BEFORE 15.01.2025" girin
4. Tüm formatların kabul edildiğini kontrol edin

### **Senaryo 5: MT700 Formu Senkronizasyonu**
1. Ana formda değişiklik yapın
2. MT700 formuna geçin
3. Değişikliklerin senkronize olduğunu kontrol edin
4. MT700'de değişiklik yapın
5. Ana forma geri dönün ve senkronizasyonu kontrol edin

## 🎯 Beklenen Sonuçlar

### ✅ **Başarılı Testler**
- Tüm yeni formatlar kabul edilir
- Checkbox'lar çoklu seçim yapar
- Para birimleri dropdown'dan seçilir
- YYMMDD notları görünmez
- Senkronizasyon çalışır

### ❌ **Hata Durumları**
- Yanlış formatlar reddedilir
- Boş para cinsi seçimi uyarı verir
- Geçersiz 39A formatları hata verir

## 📋 Test Checklist

- [ ] 40A birden fazla seçim çalışıyor
- [ ] 31D etiketi "Expiry date" oldu
- [ ] 32B para cinsi dropdown çalışıyor
- [ ] 32B tutar formatı 00.000,00 kabul ediyor
- [ ] 39A formatı ----/---- kabul ediyor
- [ ] 39B formatı 00.000,00 kabul ediyor
- [ ] 39C formatı 00.000,00 kabul ediyor ve not değişti
- [ ] 44D yeni placeholder ve açıklama var
- [ ] YYMMDD notları silindi
- [ ] MT700 formunda aynı değişiklikler var
- [ ] Senkronizasyon çalışıyor
- [ ] PDF çıktıları doğru
- [ ] Demo data çalışıyor
- [ ] Validasyonlar çalışıyor

## 🚀 Hazır!

Tüm değişiklikler tamamlandı ve test edilmeye hazır!
