(function(){
  const form = document.getElementById('mt700Form');

  // Sayfa açılışında otomatik doldurma YOK; sadece demo ile veya sizin girişinizle doldurulur

  // Mirror changes back to storage and to paired fields on the main form key names
  form.addEventListener('input', (e)=>{
    if (!(e.target instanceof HTMLElement)) return;
    persistToStorage();
    // Real-time sync to main form
    syncToMainForm(e.target.id, e.target.value);
  });

  // Real-time sync function to main form
  function syncToMainForm(mt700FieldId, value) {
    // Mapping from MT700 fields to main form fields
    const syncMap = {
      'mt27': 'f27', 'mt40A': 'f40A', 'mt20': 'f20', 'mt23': 'f23', 'mt31C': 'f31C', 'mt40E': 'f40E',
      'mt31D': 'f31D', 'mt51a': 'f51a', 'mt50': 'f50', 'mt59': 'f59', 'mt32B': 'f32B_amt',
      'mt39A': 'f39A', 'mt39B': 'f39B', 'mt39C': 'f39C', 'mt41a': 'f41a_bank', 'mt42C': 'f42C',
      'mt42a': 'f42a_drawee', 'mt42M': 'f42M', 'mt42P': 'f42P', 'mt43P': 'f43P', 'mt43T': 'f43T',
      'mt44A': 'f44A', 'mt44E': 'f44E', 'mt44F': 'f44F', 'mt44B': 'f44B', 'mt44C': 'f44C', 'mt44D': 'f44D',
      'mt45A': 'f45A', 'mt46A': 'f46A', 'mt47A': 'f47A', 'mt49G': 'f49G', 'mt49H': 'f49H',
      'mt71D': 'f71D', 'mt48': 'f48', 'mt49': 'f49', 'mt58a': 'f58a', 'mt57a': 'f57a'
    };
    
    const mainFieldId = syncMap[mt700FieldId];
    if (mainFieldId) {
      // Save to localStorage for main form to pick up
      localStorage.setItem(mainFieldId, value);
      
      // If main form page is open in another tab, sync immediately
      if (window.opener || window.parent !== window) {
        const message = { type: 'sync', fieldId: mainFieldId, value: value };
        if (window.opener) window.opener.postMessage(message, '*');
        if (window.parent !== window) window.parent.postMessage(message, '*');
      }
    }
  }

  // Listen for sync messages from other pages
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'sync') {
      const field = document.getElementById(event.data.fieldId);
      if (field && field.value !== event.data.value) {
        field.value = event.data.value;
        // Also save to localStorage
        localStorage.setItem(event.data.fieldId, event.data.value);
      }
    }
  });

  // Demo fill: pull from storage; if empty, set defaults similar to main demo
  document.getElementById('mtDemoBtn')?.addEventListener('click', ()=>{
    const demo = {
      f27:'1/3', f40A:'IRREVOCABLE', f20:'LC2025001', f23:'REF123456',       f31C:'2025-09-01', f40E:'UCP LATEST VERSION',
      f31D:'2025-12-31', f51a:'ISBKTRISXXX', f50:'ABC IMPORT LTD., 123 Main St, City, Country',
      f59:'XYZ EXPORT LLC, 456 Business Ave, City, Country', f32B_ccy:'USD', f32B_amt:'100000.00', f39A:'10/10', f39B:'110000',
      f39C:'FREIGHT, INSURANCE', f41a_bank:'NOMINATED BANK XYZ', f41a_role:'BY MIX PAYMENT', f42C:'60 DAYS FROM B/L DATE',
      f42a_drawee:'NOMINATED BANK XYZ', f42M:'%60 BY DEF PAYMENT, %30 BY ACCEPTANCE, %10 RED CLAUSE', f42P:'60 DAYS FROM B/L DATE',
      f43P:'ALLOWED', f43T:'ALLOWED', f44A:'ISTANBUL', f44E:'MERSIN', f44F:'HAMBURG', f44B:'HAMBURG CITY', f44C:'2025-10-15', f44D:'NOT EARLIER THAN 250901 AND NOT LATER THAN 251015',
      f45A:'ELECTRONICS, 1000 PCS, FOB ISTANBUL', f46A:'SIGNED COMMERCIAL INVOICE ...', f47A:'ALL DOCUMENTS MUST STATE L/C NUMBER',
      f49G:'POST FINANCING AVAILABLE', f49H:'BANK DISCOUNT TERMS APPLY', f71D:'ALL CHARGES OUTSIDE OUR OFFICE ARE ON BENEFICIARY', f48:'21', f49:'MAY ADD',
      f58a:'CONFIRMING BANK ABC', f53a:'REIMBURSING BANK XYZ', f78:'FOLLOW STANDARD INSTRUCTIONS', f57a:'SECOND ADVISING BANK DEF', f72Z:'N/A'
    };
    // write both to storage and to visible mt700 fields
    Object.entries(demo).forEach(([k,v])=>localStorage.setItem(k,String(v)));
    // Mark that user has used the form
    localStorage.setItem('userHasUsedForm', 'true');
    // map to mt700 inputs where id starts with mt and sync keys exist
    const map = {
      mt27:'f27', mt40A:'f40A', mt20:'f20', mt23:'f23', mt31C:'f31C', mt40E:'f40E', mt31D:'f31D', mt51a:'f51a', mt50:'f50', mt59:'f59', mt32B:'f32B_amt',
      mt39A:'f39A', mt39B:'f39B', mt39C:'f39C', mt41a:'f41a_bank', mt42C:'f42C', mt42a:'f42a_drawee', mt42M:'f42M', mt42P:'f42P', mt43P:'f43P', mt43T:'f43T',
      mt44A:'f44A', mt44E:'f44E', mt44F:'f44F', mt44B:'f44B', mt44C:'f44C', mt44D:'f44D', mt45A:'f45A', mt46A:'f46A', mt47A:'f47A', mt49G:'f49G', mt49H:'f49H',
      mt71D:'f71D', mt48:'f48', mt49:'f49', mt58a:'f58a', mt53a:'f53a', mt78:'f78', mt57a:'f57a', mt72Z:'f72Z'
    };
    Object.entries(map).forEach(([mtId, key])=>{
      const el = document.getElementById(mtId);
      if (el) {
        el.value = localStorage.getItem(key) || '';
        // Sync to main form
        syncToMainForm(mtId, el.value);
      }
    });
  });

  // PDF: MT700'ye özel çıktı (bold başlıklar, değerler normal; tarih alanları YYMMDD)
  document.getElementById('mtPdfBtn')?.addEventListener('click', ()=>{
    persistToStorage();
    generateMt700Pdf();
  });

  document.querySelector('button[type="reset"]').addEventListener('click', ()=>{
    setTimeout(()=>{
      form.reset();
      // Clear localStorage to start fresh
      localStorage.clear();
    }, 10);
  });

  function applyFromStorage(){
    form.querySelectorAll('[data-sync]').forEach(el=>{
      const key = el.getAttribute('data-sync');
      const val = localStorage.getItem(key || '') || '';
      el.value = val;
    });
  }

  function persistToStorage(){
    form.querySelectorAll('[data-sync]').forEach(el=>{
      const key = el.getAttribute('data-sync');
      if (!key) return;
      localStorage.setItem(key, el.value || '');
    });
  }

  function generateMt700Pdf(){
    const get = id => (localStorage.getItem(id) || '').toString();
    const v = {
      f27:get('f27'), f40A:get('f40A'), f20:get('f20'), f23:get('f23'), f31C:get('f31C'), f40E:get('f40E')||get('f40E_other'),
      f31D:get('f31D'), f51a:get('f51a'), f50:get('f50'), f59:get('f59'), f32B_ccy:get('f32B_ccy'), f32B_amt:get('f32B_amt'),
      f39A:get('f39A'), f39B:get('f39B'), f39C:get('f39C'), f41a_bank:get('f41a_bank'), f41a_role:get('f41a_role'),
      f42C:get('f42C'), f42a:get('f42a_drawee'), f42M:get('f42M'), f42P:get('f42P'), f43P:get('f43P'), f43T:get('f43T'),
      f44A:get('f44A'), f44E:get('f44E'), f44F:get('f44F'), f44B:get('f44B'), f44C:get('f44C'), f44D:get('f44D'),
      f45A:get('f45A'), f46A:get('f46A'), f47A:get('f47A'), f49G:get('f49G'), f49H:get('f49H'), f71D:get('f71D'),
      f48:get('f48'), f49:get('f49'), f58a:get('f58a'), f53a:get('f53a'), f78:get('f78'), f57a:get('f57a'), f72Z:get('f72Z')
    };
    // Ensure YYMMDD for date fields in the PDF
    v.f31C = toYYMMDD(v.f31C);
    v.f31D = toYYMMDD(v.f31D);
    v.f44C = toYYMMDD(v.f44C);

    const sections = [
      ['27 : Sequence of Total', v.f27],
      ['40A: Form of Documentary Credit', v.f40A],
      ['20 : Documentary Credit Number', v.f20],
      ['23 : Reference to Pre-Advice', v.f23],
      ['31C: Date of Issue', v.f31C],
      ['40E: Applicable Rules', v.f40E],
      ['31D: Date and Place of Expiry', v.f31D],
      ['51a : Applicant Bank', v.f51a],
      ['50 : Applicant', v.f50],
      ['59 : Beneficiary', v.f59],
      ['32B: Currency Code, Amount', `${(v.f32B_ccy||'').toUpperCase()}${formatAmount(v.f32B_amt)}`],
      ['39A: Percentage Credit Amount Tolerance', v.f39A],
      ['39B: Maximum Credit Amount', v.f39B],
      ['39C: Additional Amounts Covered', v.f39C],
      ['41a : Available With ... By ...', `${v.f41a_bank}\n${v.f41a_role}`],
      ['42C: Drafts at ...', v.f42C],
      ['42a : Drawee', v.f42a],
      ['42M: Mixed Payment Details', v.f42M],
      ['42P: Negotiation/Deferred Payment Details', v.f42P],
      ['43P: Partial Shipments', v.f43P],
      ['43T: Transhipment', v.f43T],
      ['44A: Place of Taking in Charge/Dispatch from .../Place of Receipt', v.f44A],
      ['44E: Port of Loading/Airport of Departure', v.f44E],
      ['44F: Port of Discharge/Airport of Destination', v.f44F],
      ['44B: Place of Final Destination/For Transportation to .../Place of Delivery', v.f44B],
      ['44C: Latest Date of Shipment', v.f44C],
      ['44D: Shipment Period', v.f44D],
      ['45A: Description of Goods and/or Services', v.f45A],
      ['46A: Documents Required', v.f46A],
      ['47A: Additional Conditions', v.f47A],
      ['49G: Special Payment Conditions for Beneficiary', v.f49G],
      ['49H: Special Payment Conditions for Receiving Bank', v.f49H],
      ['71D: Charges', v.f71D],
      ['48 : Period for Presentation in Days', v.f48],
      ['49 : Confirmation Instructions', v.f49],
      ['58a: Requested Confirmation Party', v.f58a],
      ['53a: Reimbursing Bank', v.f53a],
      ['78 : Instructions to the Paying/Accepting/Negotiating Bank', v.f78],
      ['57a: Second Advising Bank', v.f57a],
      ['72Z: Sender to Receiver Information', v.f72Z],
    ];

    const win = window.open('', '_blank');
    if (!win) return alert('Açılır pencere engellendi. Lütfen izin verin.');
    const style = `
      body{font:12px/1.6 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;white-space:pre-wrap;padding:24px;color:#111}
      .row{margin:0 0 12px 0}
      .label{font-weight:700}
      .value{margin-top:2px;}
    `;
    const escapeHtml = (s)=>String(s).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]));
    const html = [`<html><head><title>MT700</title><style>${style}</style></head><body>`];
    sections.forEach(([label, value])=>{
      html.push(`<div class="row"><div class="label">${escapeHtml(label)}</div><div class="value">${escapeHtml(value||'')}</div></div>`);
    });
    html.push('</body></html>');
    win.document.write(html.join(''));
    win.document.close();
    win.focus();
    win.print();
    
    // Update statistics
    localStorage.setItem('last_pdf_export', new Date().toISOString());
  }

  function toYYMMDD(raw){
    if (!raw) return '';
    const s = String(raw).trim();
    if (/^\d{6}$/.test(s)) return s;
    let m = s.match(/^(\d{1,2})[\.\/](\d{1,2})[\.\/-](\d{2,4})$/);
    if (m){
      const dd = m[1].padStart(2,'0');
      const mm = m[2].padStart(2,'0');
      const yyyy = m[3].length===2 ? ('20'+m[3]) : m[3];
      return yyyy.slice(2)+mm+dd;
    }
    m = s.match(/^(\d{4})[-\.\/](\d{1,2})[-\.\/](\d{1,2})$/);
    if (m){
      const yyyy = m[1];
      const mm = m[2].padStart(2,'0');
      const dd = m[3].padStart(2,'0');
      return yyyy.slice(2)+mm+dd;
    }
    return s.replace(/\D/g,'').slice(0,6);
  }

  function formatAmount(raw){
    if (!raw) return '';
    const s = String(raw).trim();
    const num = parseFloat(s.replace(/[^0-9.]/g,''));
    if (isNaN(num)) return s;
    return num.toFixed(2);
  }

  // Load saved data on page load - ONLY if user has previously entered data
  function loadFormData() {
    if (!form) return;
    
    // Check if user has ever used the form (has any saved data)
    const hasUserData = localStorage.getItem('userHasUsedForm');
    if (!hasUserData) {
      // First time user - don't load anything, keep form empty
      return;
    }
    
    form.querySelectorAll('input, textarea, select').forEach(el => {
      const savedValue = localStorage.getItem(el.id);
      if (savedValue !== null) {
        el.value = savedValue;
      }
    });
  }

  // Load data when page loads
  document.addEventListener('DOMContentLoaded', loadFormData);

  // Form submission handler - Kaydet butonu
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Save all form data to localStorage
    form.querySelectorAll('input, textarea, select').forEach(el => {
      if (el.id) {
        localStorage.setItem(el.id, el.value || '');
      }
    });
    
    // Mark that user has saved data
    localStorage.setItem('userHasUsedForm', 'true');
    
    alert('MT700 formu başarıyla kaydedildi! Sayfa yenilendiğinde verileriniz korunacak.');
  });

  // Debug function to test sync
  window.testSyncMT700 = function() {
    console.log('Testing MT700 sync...');
    document.getElementById('mt59').value = 'TEST SYNC MT700 - ' + new Date().toLocaleTimeString();
    syncToMainForm('mt59', document.getElementById('mt59').value);
    console.log('Sync sent to main form');
  };

  // API Key Management for MT700
  const mtApiKeyStatus = document.getElementById('mtApiKeyStatus');
  const mtApiKeyDisplay = document.getElementById('mtApiKeyDisplay');

  // Load and display saved API key
  function updateMT700ApiKeyDisplay() {
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
      mtApiKeyStatus.textContent = '✓ API Key kaydedildi';
      mtApiKeyStatus.style.color = '#10b981';
      mtApiKeyDisplay.textContent = savedApiKey.substring(0, 20) + '...';
    } else {
      // Use default API key from config
      if (typeof CONFIG !== 'undefined' && CONFIG.DEFAULT_OPENAI_API_KEY) {
        mtApiKeyStatus.textContent = '✓ Varsayılan API Key kullanılıyor';
        mtApiKeyStatus.style.color = '#10b981';
        mtApiKeyDisplay.textContent = CONFIG.DEFAULT_OPENAI_API_KEY.substring(0, 20) + '... (Varsayılan)';
      } else {
        mtApiKeyStatus.textContent = '❌ API Key yüklenemedi';
        mtApiKeyStatus.style.color = '#ef4444';
        mtApiKeyDisplay.textContent = 'Yüklenemedi';
      }
    }
  }

  // Load default field rules from GitHub repo (shared across all users)
  async function loadDefaultFieldRules() {
    try {
      // First try to load from GitHub repo
      const response = await fetch('default-rules.json');
      if (response.ok) {
        const repoRules = await response.json();
        const existingRules = JSON.parse(localStorage.getItem('field_rules') || '{}');
        
        // Merge repo rules with local rules (local rules take priority)
        const mergedRules = { ...repoRules, ...existingRules };
        
        // Save merged rules back to localStorage
        localStorage.setItem('field_rules', JSON.stringify(mergedRules));
        
        console.log('Default field rules loaded from repo:', Object.keys(repoRules).length, 'rules');
        return;
      }
    } catch (error) {
      console.warn('Could not load rules from repo:', error.message);
    }

    // Fallback to CONFIG if repo loading fails
    if (typeof CONFIG !== 'undefined' && CONFIG.DEFAULT_FIELD_RULES) {
      const existingRules = JSON.parse(localStorage.getItem('field_rules') || '{}');
      const defaultRules = CONFIG.DEFAULT_FIELD_RULES;
      
      // Merge default rules with existing rules (existing rules take priority)
      const mergedRules = { ...defaultRules, ...existingRules };
      
      // Save merged rules back to localStorage
      localStorage.setItem('field_rules', JSON.stringify(mergedRules));
      
      console.log('Default field rules loaded from config:', Object.keys(defaultRules).length, 'rules');
    }
  }

  // Load default field rules
  loadDefaultFieldRules();

  // AI Check functionality for MT700
  const mtAiCheckBtn = document.getElementById('mtAiCheckBtn');
  mtAiCheckBtn?.addEventListener('click', performMT700AICheck);

  async function performMT700AICheck() {
    const savedApiKey = localStorage.getItem('openai_api_key');
    const defaultApiKey = (typeof CONFIG !== 'undefined' && CONFIG.DEFAULT_OPENAI_API_KEY) ? CONFIG.DEFAULT_OPENAI_API_KEY : null;
    const apiKey = savedApiKey || defaultApiKey;
    
    // Always use available key without user prompts
    if (!apiKey) {
      console.warn('No API key available for MT700 AI check');
      document.getElementById('mtAiResults').innerHTML = '<div class="ai-result error">API anahtarı bulunamadı. AI kontrolü yapılamıyor.</div>';
      return;
    }

    mtAiCheckBtn.disabled = true;
    mtAiCheckBtn.textContent = 'AI Kontrol Ediliyor...';

    try {
      const formData = collectMT700FormData();
      const results = await checkMT700FieldsWithAI(formData, apiKey);
      displayMT700AIResults(results);
      
      // Update statistics
      localStorage.setItem('last_ai_check', new Date().toISOString());
      const totalForms = parseInt(localStorage.getItem('total_forms') || '0') + 1;
      localStorage.setItem('total_forms', totalForms.toString());
    } catch (error) {
      console.error('AI Check Error:', error);
      alert('AI kontrolü sırasında hata oluştu: ' + error.message);
    } finally {
      mtAiCheckBtn.disabled = false;
      mtAiCheckBtn.textContent = 'AI Kontrol';
    }
  }

  function collectMT700FormData() {
    const form = document.getElementById('mt700Form');
    const data = {};
    form.querySelectorAll('input, textarea, select').forEach(el => {
      if (el.id) {
        data[el.id] = el.value || '';
      }
    });
    return data;
  }

  async function checkMT700FieldsWithAI(formData, apiKey) {
    const results = [];
    
    for (const [fieldId, value] of Object.entries(formData)) {
      const fieldInfo = getMT700FieldInfo(fieldId);
      if (!fieldInfo) continue;

      // Skip empty fields for now, but we can add validation for required fields later
      if (!value || !value.trim()) {
        results.push({
          fieldId,
          fieldName: fieldInfo.name,
          status: 'success',
          message: 'Alan boş - kontrol edilmedi'
        });
        continue;
      }

      try {
        const result = await checkMT700FieldWithAI(fieldId, value, fieldInfo, apiKey);
        results.push(result);
      } catch (error) {
        results.push({
          fieldId,
          fieldName: fieldInfo.name,
          status: 'error',
          message: 'AI kontrolü başarısız: ' + error.message
        });
      }
    }
    
    return results;
  }

  function getMT700FieldInfo(fieldId) {
    const fieldMap = {
      'mt27': { name: '27 - Sequence of Total', type: 'sequence' },
      'mt40A': { name: '40A - Form of Documentary Credit', type: 'select' },
      'mt20': { name: '20 - Documentary Credit Number', type: 'text' },
      'mt23': { name: '23 - Reference to Pre-Advice', type: 'text' },
      'mt31C': { name: '31C - Date of Issue', type: 'date' },
      'mt40E': { name: '40E - Applicable Rules', type: 'select' },
      'mt31D': { name: '31D - Date and Place of Expiry', type: 'date' },
      'mt51a': { name: '51a - Applicant Bank', type: 'bank' },
      'mt50': { name: '50 - Applicant', type: 'address' },
      'mt59': { name: '59 - Beneficiary', type: 'address' },
      'mt32B': { name: '32B - Currency Code, Amount', type: 'amount' },
      'mt39A': { name: '39A - Percentage Credit Amount Tolerance', type: 'percentage' },
      'mt39B': { name: '39B - Maximum Credit Amount', type: 'amount' },
      'mt39C': { name: '39C - Additional Amounts Covered', type: 'text' },
      'mt41a': { name: '41a - Available With ... By ...', type: 'bank' },
      'mt42C': { name: '42C - Drafts at ...', type: 'text' },
      'mt42a': { name: '42a - Drawee', type: 'bank' },
      'mt42M': { name: '42M - Mixed Payment Details', type: 'text' },
      'mt42P': { name: '42P - Deferred Payment Details', type: 'text' },
      'mt43P': { name: '43P - Partial Shipments', type: 'select' },
      'mt43T': { name: '43T - Transhipment', type: 'select' },
      'mt44A': { name: '44A - Place of Taking in Charge', type: 'location' },
      'mt44E': { name: '44E - Port of Loading', type: 'location' },
      'mt44F': { name: '44F - Port of Discharge', type: 'location' },
      'mt44B': { name: '44B - Place of Final Destination', type: 'location' },
      'mt44C': { name: '44C - Latest Date of Shipment', type: 'date' },
      'mt44D': { name: '44D - Shipment Period', type: 'text' },
      'mt45A': { name: '45A - Description of Goods', type: 'text' },
      'mt46A': { name: '46A - Documents Required', type: 'text' },
      'mt47A': { name: '47A - Additional Conditions', type: 'text' },
      'mt49G': { name: '49G - Special Payment Conditions for Beneficiary', type: 'text' },
      'mt49H': { name: '49H - Special Payment Conditions for Receiving Bank', type: 'text' },
      'mt71D': { name: '71D - Charges', type: 'text' },
      'mt48': { name: '48 - Period for Presentation', type: 'number' },
      'mt49': { name: '49 - Confirmation Instructions', type: 'select' },
      'mt58a': { name: '58a - Requested Confirmation Party', type: 'bank' },
      'mt53a': { name: '53a - Reimbursing Bank', type: 'bank' },
      'mt78': { name: '78 - Instructions to Paying Bank', type: 'text' },
      'mt57a': { name: '57a - Second Advising Bank', type: 'bank' },
      'mt72Z': { name: '72Z - Sender to Receiver Information', type: 'text' }
    };
    
    return fieldMap[fieldId];
  }

  async function checkMT700FieldWithAI(fieldId, value, fieldInfo, apiKey) {
    // Load custom field rules
    const fieldRules = JSON.parse(localStorage.getItem('field_rules') || '{}');
    const customRule = fieldRules[fieldId];
    
    let prompt = `MT700 akreditif formu alanı kontrolü yapıyorum. Sen bir SWIFT MT700 akreditif uzmanısın ve resmi dairelerde kullanılacak formlar için kontroller yapıyorsun.

Alan: ${fieldInfo.name} (${fieldId})
Değer: "${value}"
Alan Tipi: ${fieldInfo.type}`;

    if (customRule) {
      prompt += `

ÖZEL KURAL (Admin tarafından tanımlanmış):
${customRule.rule}

Örnek Değerler: ${customRule.examples || 'Yok'}

Bu özel kurala göre analiz yap ve aşağıdaki kontrolleri uygula:`;
    } else {
      prompt += `

Bu MT700 alanı için aşağıdaki kontrolleri yap:`;
    }

    prompt += `
1. SWIFT MT700 formatına uygunluk
2. Alan içeriği doğruluğu ve tutarlılığı
3. Uluslararası standartlara uygunluk
4. Potansiyel hatalar ve eksiklikler
5. Resmi daire standartlarına uygunluk
6. SWIFT mesaj formatı kurallarına uygunluk

Özellikle dikkat et:
- SWIFT MT700 formatına uygunluk
- Alan içeriği doğru mu?
- Tarih formatları doğru mu?
- Para birimi kodları ISO standartlarına uygun mu?
- Banka bilgileri doğru mu?
- Adres bilgileri eksiksiz mi?
- Tutarlar mantıklı mı?
- Uluslararası akreditif kurallarına uygunluk`;

    if (!customRule) {
      prompt += `

Her MT700 alanı için örnek doğru kullanım:
- 27: "1/1" (tek sayfa), "1/2" (bir ana + bir ek)
- 40A: "IRREVOCABLE" (geri alınamaz)
- 20: "LC2025001" (akreditif numarası)
- 23: "REF123456" (ön ihbar referansı)
- 31C: "2025-09-01" (düzenlenme tarihi)
- 40E: "UCP LATEST VERSION" (uygulanacak kurallar)
- 31D: "2025-12-31" (vade tarihi)
- 51a: "ISBKTRISXXX" (amir banka SWIFT)
- 50: "ABC IMPORT LTD., 123 Main St, City, Country" (amir tam adres)
- 59: "XYZ EXPORT LLC, 456 Business Ave, City, Country" (lehtar tam adres)
- 32B: "USD" + "100000.00" (para birimi + tutar)
- 39A: "10/10" (tolerans yüzdesi)
- 39B: "110000" (maksimum tutar)
- 39C: "FREIGHT, INSURANCE" (ek masraflar)
- 41a: "NOMINATED BANK XYZ" + "BY PAYMENT" (banka + görev)
- 42C: "SIGHT" veya "90 DAYS FROM B/L DATE" (poliçe vadesi)
- 42a: "NOMINATED BANK XYZ" (drawee)
- 42M: "%60 BY DEF PAYMENT, %30 BY ACCEPTANCE, %10 RED CLAUSE" (karışık ödeme)
- 42P: "60 DAYS FROM B/L DATE" (vadeli detay)
- 43P: "ALLOWED" veya "NOT ALLOWED" (kısmi yükleme)
- 43T: "ALLOWED" veya "NOT ALLOWED" (aktarma)
- 44A: "ISTANBUL" (teslim alma yeri)
- 44E: "MERSIN" (yükleme limanı)
- 44F: "HAMBURG" (boşaltma limanı)
- 44B: "HAMBURG CITY" (teslim yeri)
- 44C: "2025-10-15" (son yükleme tarihi)
- 44D: "NOT EARLIER THAN 250901 AND NOT LATER THAN 251015" (yükleme süresi)
- 45A: "ELECTRONICS, 1000 PCS, FOB ISTANBUL" (mal tanımı)
- 46A: "SIGNED COMMERCIAL INVOICE IN 5 FOLDS; PACKING LIST IN 4 FOLDS" (belgeler)
- 47A: "ALL DOCUMENTS MUST STATE L/C NUMBER" (ilave şartlar)
- 49G: "POST FINANCING AVAILABLE" (lehtar özel ödeme)
- 49H: "BANK DISCOUNT TERMS APPLY" (banka özel ödeme)
- 71D: "ALL CHARGES OUTSIDE OUR OFFICE ARE ON BENEFICIARY" (masraflar)
- 48: "21" (ibraz süresi gün)
- 49: "WITHOUT" veya "CONFIRM" veya "MAY ADD" (teyit talimatı)
- 58a: "CONFIRMING BANK ABC" (teyit bankası)
- 53a: "REIMBURSING BANK XYZ" (ödeme bankası)
- 78: "FOLLOW STANDARD INSTRUCTIONS" (ödeme talimatları)
- 57a: "SECOND ADVISING BANK DEF" (ikinci ihbar bankası)
- 72Z: "N/A" (serbest mesaj)`;
    }

    prompt += `

Sadece JSON formatında yanıt ver:
{
  "status": "success|warning|error",
  "message": "Detaylı kontrol sonucu açıklaması",
  "suggestions": ["öneri1", "öneri2"]
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: (typeof CONFIG !== 'undefined' && CONFIG.OPENAI_MODEL) ? CONFIG.OPENAI_MODEL : 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Sen bir SWIFT MT700 akreditif uzmanısın. MT700 formatına uygunluk kontrollerini detaylı yaparsın.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: (typeof CONFIG !== 'undefined' && CONFIG.MAX_TOKENS) ? CONFIG.MAX_TOKENS : 500,
        temperature: (typeof CONFIG !== 'undefined' && CONFIG.TEMPERATURE) ? CONFIG.TEMPERATURE : 0.1
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    try {
      const result = JSON.parse(aiResponse);
      return {
        fieldId,
        fieldName: fieldInfo.name,
        value,
        status: result.status,
        message: result.message,
        suggestions: result.suggestions || []
      };
    } catch (e) {
      return {
        fieldId,
        fieldName: fieldInfo.name,
        value,
        status: 'error',
        message: 'AI yanıtı parse edilemedi',
        suggestions: []
      };
    }
  }

  function displayMT700AIResults(results) {
    // Remove previous results
    const existingResults = document.querySelector('.ai-results');
    if (existingResults) {
      existingResults.remove();
    }

    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'ai-results';
    resultsContainer.innerHTML = '<h3>MT700 AI Kontrol Sonuçları</h3>';

    results.forEach(result => {
      const resultDiv = document.createElement('div');
      resultDiv.className = `ai-result ${result.status === 'error' ? 'ai-error' : result.status === 'warning' ? 'ai-warning' : ''}`;
      
      let html = `<strong>${result.fieldName}</strong><br>`;
      html += `<em>Değer:</em> ${result.value}<br>`;
      html += `<em>Durum:</em> ${result.status}<br>`;
      html += `<em>Mesaj:</em> ${result.message}<br>`;
      
      if (result.suggestions && result.suggestions.length > 0) {
        html += `<em>Öneriler:</em><ul>`;
        result.suggestions.forEach(suggestion => {
          html += `<li>${suggestion}</li>`;
        });
        html += `</ul>`;
      }
      
      resultDiv.innerHTML = html;
      resultsContainer.appendChild(resultDiv);
    });

    form.appendChild(resultsContainer);
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
  }
})();


