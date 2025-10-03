# 44D Alanı Test Rehberi

## 📋 **44D Alanı Özellikleri**

### **Tanım:**
44D - Yükleme Süresi/Periyodu alanı, yüklemenin ne kadar sürede, zaman aralığında yapılacağını belirtir. Sürenin nereden başladığı ve zaman aralığının tarih veya hesaplama yöntemlerinin verilmesi gerekir.

### **Özellikler:**
- ✅ Manuel giriş yapılabilir
- ✅ Çeşitli format seçenekleri desteklenir
- ✅ Detaylı açıklama ve örnekler mevcut
- ✅ Her iki formda (Ana Form + MT700) aynı işlevsellik

## 🧪 **Test Senaryoları**

### **Senaryo 1: Standart Format (YYMMDD)**
```
NOT EARLIER THAN 071120 AND NOT LATER THAN 071122
```
- **Test**: Bu formatı 44D alanına girin
- **Beklenen**: Kabul edilmeli ve PDF'de görünmeli

### **Senaryo 2: Tarih Aralığı (DD.MM.YYYY)**
```
BETWEEN 10.01.2025 AND 14.03.2025
```
- **Test**: Bu formatı 44D alanına girin
- **Beklenen**: Kabul edilmeli ve PDF'de görünmeli

### **Senaryo 3: Başlangıç Tarihi**
```
NOT BEFORE 15.01.2025
```
- **Test**: Bu formatı 44D alanına girin
- **Beklenen**: Kabul edilmeli ve PDF'de görünmeli

### **Senaryo 4: Tarih Aralığı (FROM-TO)**
```
FROM 01.02.2025 TO 28.02.2025
```
- **Test**: Bu formatı 44D alanına girin
- **Beklenen**: Kabul edilmeli ve PDF'de görünmeli

### **Senaryo 5: Serbest Metin**
```
WITHIN 30 DAYS FROM B/L DATE
```
- **Test**: Bu formatı 44D alanına girin
- **Beklenen**: Kabul edilmeli ve PDF'de görünmeli

## 🎯 **Detaylı Test Adımları**

### **1. Ana Form Testi (index.html)**
1. Ana formu açın
2. 44D alanını bulun
3. Placeholder'ı kontrol edin: `NOT EARLIER THAN 071120 AND NOT LATER THAN 071122`
4. Açıklama metnini kontrol edin
5. Farklı formatları test edin
6. PDF önizleme yapın

### **2. MT700 Form Testi (mt700.html)**
1. MT700 formunu açın
2. 44D alanını bulun
3. Placeholder'ı kontrol edin: `NOT EARLIER THAN 071120 AND NOT LATER THAN 071122`
4. Açıklama metnini kontrol edin
5. Farklı formatları test edin
6. PDF önizleme yapın

### **3. Senkronizasyon Testi**
1. Ana formda 44D alanına değer girin
2. MT700 formuna geçin
3. Değerin senkronize olduğunu kontrol edin
4. MT700'de değiştirin
5. Ana forma geri dönün ve senkronizasyonu kontrol edin

### **4. Demo Data Testi**
1. "Demo Veri" butonuna tıklayın
2. 44D alanının `NOT EARLIER THAN 071120 AND NOT LATER THAN 071122` ile doldurulduğunu kontrol edin
3. PDF önizleme yapın ve çıktıyı kontrol edin

## ✅ **Beklenen Sonuçlar**

### **UI Kontrolü:**
- [ ] Placeholder doğru görünüyor
- [ ] Açıklama metni detaylı ve örnekli
- [ ] Alan manuel giriş kabul ediyor
- [ ] Her iki formda aynı özellikler var

### **Fonksiyonellik Kontrolü:**
- [ ] Tüm format örnekleri kabul ediliyor
- [ ] Senkronizasyon çalışıyor
- [ ] Demo data doğru yükleniyor
- [ ] PDF çıktısında doğru görünüyor

### **Validasyon Kontrolü:**
- [ ] 31D tarihini geçen değerler uyarı veriyor (varsa)
- [ ] Boş alan kabul ediliyor (opsiyonel alan)

## 🔍 **Görsel Kontrol**

### **Açıklama Metni Şu Şekilde Olmalı:**
```
Yüklemenin ne kadar sürede, zaman aralığında yapılacağı belirtilir. 
Sürenin nereden başladığı ve zaman aralığının tarih veya hesaplama 
yöntemlerinin verilmesi gerekir.

Örnekler:
• NOT EARLIER THAN 071120 AND NOT LATER THAN 071122
• BETWEEN 10.01.2025 AND 14.03.2025
• NOT BEFORE 15.01.2025
• FROM 01.02.2025 TO 28.02.2025
```

## 🚀 **Test Başlayalım!**

1. **Ana formu açın** → `index.html`
2. **44D alanını bulun**
3. **Placeholder ve açıklamayı kontrol edin**
4. **Farklı formatları test edin**
5. **MT700 formunda da aynı testleri yapın**
6. **Senkronizasyonu test edin**
7. **PDF çıktılarını kontrol edin**

### **Hızlı Test Değerleri:**
```
NOT EARLIER THAN 071120 AND NOT LATER THAN 071122
BETWEEN 10.01.2025 AND 14.03.2025
NOT BEFORE 15.01.2025
FROM 01.02.2025 TO 28.02.2025
WITHIN 30 DAYS FROM B/L DATE
```

## ✨ **44D Alanı Hazır!**

Tüm özellikler implement edildi ve test edilmeye hazır! 🎉
