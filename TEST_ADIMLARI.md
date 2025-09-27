# 🧪 Akreditif Sistemi Test Adımları

## 📋 Genel Test Senaryoları

### 1. **Admin Panel Testi**
- [ ] `admin.html` sayfasını aç
- [ ] Giriş ekranının göründüğünü kontrol et
- [ ] Kullanıcı adı: `admin`, Şifre: `12345` ile giriş yap
- [ ] ✅ "Giriş başarılı!" mesajını gör
- [ ] Admin panelinin açıldığını kontrol et
- [ ] Varsayılan API Key'in yüklendiğini kontrol et
- [ ] Kendi OpenAI API Key'ini gir ve kaydet
- [ ] "API Key Test Et" butonuna bas
- [ ] ✅ Başarılı mesajını gör
- [ ] "Ayarları Dışa Aktar" butonuna bas
- [ ] JSON dosyasının indirildiğini kontrol et
- [ ] "Çıkış Yap" butonuna bas
- [ ] Giriş ekranına döndüğünü kontrol et

### 2. **Başvuru Formu Testi**
- [ ] `index.html` sayfasını aç
- [ ] Form alanlarının boş olduğunu kontrol et
- [ ] "Demo Veri" butonuna bas
- [ ] Tüm alanların doldurulduğunu kontrol et
- [ ] Tarih alanlarının takvim formatında olduğunu kontrol et
- [ ] "PDF Önizleme" butonuna bas
- [ ] PDF'de tarihlerin YYMMDD formatında olduğunu kontrol et

### 3. **MT700 Formu Testi**
- [ ] `mt700.html` sayfasını aç
- [ ] Form alanlarının boş olduğunu kontrol et
- [ ] "Demo Veri" butonuna bas
- [ ] Tüm alanların doldurulduğunu kontrol et
- [ ] "PDF Önizleme" butonuna bas
- [ ] PDF'de tarihlerin YYMMDD formatında olduğunu kontrol et

### 4. **Senkronizasyon Testi**
- [ ] Başvuru formunda bir alanı değiştir (örn: f50)
- [ ] MT700 formuna geç
- [ ] Aynı alanın güncellendiğini kontrol et
- [ ] MT700'de bir alanı değiştir (örn: mt59)
- [ ] Başvuru formuna dön
- [ ] Aynı alanın güncellendiğini kontrol et

### 5. **AI Kontrol Testi**
- [ ] Varsayılan API Key ile AI kontrol yap
- [ ] Başvuru formunda "AI Kontrol" butonuna bas
- [ ] AI sonuçlarının görüntülendiğini kontrol et
- [ ] MT700 formunda "AI Kontrol" butonuna bas
- [ ] AI sonuçlarının görüntülendiğini kontrol et
- [ ] Admin panelden kendi API Key'ini kaydet
- [ ] Kendi API Key'i ile AI kontrol yap
- [ ] Sonuçların farklı olduğunu kontrol et

### 6. **Veri Kalıcılığı Testi**
- [ ] Formu doldur
- [ ] "Kaydet" butonuna bas
- [ ] Sayfayı yenile
- [ ] Verilerin korunduğunu kontrol et
- [ ] "Temizle" butonuna bas
- [ ] Tüm alanların temizlendiğini kontrol et
- [ ] Sayfayı yenile
- [ ] Formun boş geldiğini kontrol et

## 🔍 Detaylı Test Adımları

### **Tarih Formatı Testi**
1. **Form Girişi:**
   - Tarih alanlarına tıkla
   - Takvim açıldığını kontrol et
   - Tarih seç (örn: 01.02.2026)
   - Formda doğru göründüğünü kontrol et

2. **PDF Çıktısı:**
   - "PDF Önizleme" butonuna bas
   - PDF'de tarihin "260201" formatında olduğunu kontrol et
   - Tüm tarih alanları için aynı kontrolü yap

### **27 Alanı Testi**
1. **Ek Sayfa Kontrolü:**
   - 27 alanına "1/3" yaz
   - 2 adet ek sayfa alanının göründüğünü kontrol et
   - "Ek Ekle" butonunun gizlendiğini kontrol et
   - 27 alanına "1/1" yaz
   - Ek sayfa alanlarının gizlendiğini kontrol et

2. **Dosya Yükleme:**
   - Ek sayfa alanlarında dosya seç
   - Dosya adının göründüğünü kontrol et
   - "X" butonuna basarak dosyayı sil
   - Dosyanın silindiğini kontrol et

### **42M Karışık Ödeme Testi**
1. **Satır Ekleme:**
   - 41a görevini "BY MIX PAYMENT" yap
   - 42M alanının göründüğünü kontrol et
   - "Satır Ekle" butonuna bas
   - Yeni satırın eklendiğini kontrol et

2. **Yüzde Kontrolü:**
   - Toplam yüzdeyi 100 yap
   - Uyarı mesajının kaybolduğunu kontrol et
   - Toplam yüzdeyi 90 yap
   - Uyarı mesajının göründüğünü kontrol et

### **AI Kontrol Testi**
1. **API Key Kontrolü:**
   - Admin panelden API Key kaydet
   - Formlarda API Key durumunun "✓ Kaydedildi" olduğunu kontrol et

2. **AI Sonuçları:**
   - "AI Kontrol" butonuna bas
   - Sonuçların sayfanın altında göründüğünü kontrol et
   - Her alan için status, message ve suggestions'ı kontrol et
   - Başarılı, uyarı ve hata durumlarını test et

## 🚨 Hata Durumları Testi

### **API Key Hataları**
- [ ] Geçersiz API Key ile test et
- [ ] API Key olmadan AI kontrol yap
- [ ] Hata mesajlarının doğru göründüğünü kontrol et

### **Admin Panel Güvenlik Testi**
- [ ] Yanlış kullanıcı adı ile giriş yapmaya çalış
- [ ] Yanlış şifre ile giriş yapmaya çalış
- [ ] Boş alanlarla giriş yapmaya çalış
- [ ] Hata mesajlarının göründüğünü kontrol et
- [ ] Doğru bilgilerle giriş yap
- [ ] Sayfayı yenile ve otomatik giriş yapıldığını kontrol et
- [ ] Çıkış yap ve tekrar giriş ekranının geldiğini kontrol et

### **Form Validasyonu**
- [ ] Zorunlu alanları boş bırak
- [ ] "Kaydet" butonuna bas
- [ ] Hata mesajlarının göründüğünü kontrol et
- [ ] Alanları doldur
- [ ] Hata mesajlarının kaybolduğunu kontrol et

### **Senkronizasyon Hataları**
- [ ] İki formu aynı anda aç
- [ ] Birinde değişiklik yap
- [ ] Diğerinde güncellemenin geldiğini kontrol et
- [ ] Sayfayı yenile
- [ ] Verilerin korunduğunu kontrol et

## 📊 Performans Testi

### **Büyük Veri Testi**
- [ ] Formu maksimum veri ile doldur
- [ ] PDF oluşturma süresini ölç
- [ ] AI kontrol süresini ölç
- [ ] Senkronizasyon hızını test et

### **Tarayıcı Uyumluluğu**
- [ ] Chrome'da test et
- [ ] Firefox'ta test et
- [ ] Edge'de test et
- [ ] Safari'de test et (Mac varsa)

## 🔧 Teknik Testler

### **LocalStorage Testi**
- [ ] Veri kaydetme işlemini kontrol et
- [ ] Veri yükleme işlemini kontrol et
- [ ] Veri temizleme işlemini kontrol et
- [ ] Çapraz sayfa senkronizasyonunu kontrol et

### **PDF Generation Testi**
- [ ] PDF içeriğinin doğru olduğunu kontrol et
- [ ] Tarih formatlarının doğru olduğunu kontrol et
- [ ] Yazdırma önizlemesinin çalıştığını kontrol et

## ✅ Test Sonuçları

### **Başarılı Testler**
- [ ] Admin Panel: API Key yönetimi
- [ ] Form Doldurma: Demo veri ve manuel giriş
- [ ] PDF Export: Tarih formatları ve içerik
- [ ] Senkronizasyon: Çapraz sayfa güncelleme
- [ ] AI Kontrol: Alan validasyonu
- [ ] Veri Kalıcılığı: Kaydetme ve yükleme

### **Hata Durumları**
- [ ] API Key hataları
- [ ] Form validasyonu
- [ ] Senkronizasyon sorunları
- [ ] PDF generation hataları

## 📝 Test Raporu

**Test Tarihi:** ___________
**Test Eden:** ___________
**Sürüm:** ___________

**Genel Durum:** ✅ Başarılı / ❌ Hatalı
**Kritik Hatalar:** ___________
**Öneriler:** ___________

---

## 🎯 Test Senaryoları Özeti

1. **Temel Fonksiyonellik:** Form doldurma, kaydetme, temizleme
2. **PDF Export:** Tarih formatları, içerik doğruluğu
3. **Senkronizasyon:** Çapraz sayfa veri paylaşımı
4. **AI Kontrol:** Alan validasyonu ve öneriler
5. **Admin Panel:** Güvenli giriş, API Key yönetimi ve sistem durumu
6. **Veri Kalıcılığı:** LocalStorage işlemleri
7. **Hata Yönetimi:** Exception handling ve kullanıcı geri bildirimi
8. **Güvenlik:** Admin panel erişim kontrolü

## 🔐 Admin Panel Giriş Bilgileri

**Kullanıcı Adı:** `admin`  
**Şifre:** `12345`

## 🔑 API Key Yönetimi

### **Varsayılan API Key**
- Sistem varsayılan olarak sabit bir API Key kullanır
- Bu sayede API Key'i olmayan kullanıcılar da AI kontrollerini kullanabilir
- Varsayılan API Key `config.js` dosyasında tanımlanmıştır

### **Kendi API Key'inizi Kullanma**
1. Admin Panel'e giriş yapın (admin/12345)
2. "OpenAI API Key" alanına kendi API Key'inizi girin
3. "API Key Kaydet" butonuna basın
4. Artık kendi API Key'iniz kullanılacak

### **Güvenlik Notları**
- `config.js` dosyası `.gitignore`'a eklenmiştir
- Bu sayede API Key'ler GitHub'a push edilmez
- Gerçek kullanımda güvenli şifreler kullanılmalıdır

Bu test adımlarını takip ederek sistemin tüm fonksiyonlarını kapsamlı şekilde test edebilirsiniz.
