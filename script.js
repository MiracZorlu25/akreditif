(function(){
  const form = document.getElementById('lcForm');
  const role = document.getElementById('f41a_role');
  const sec42M = document.getElementById('sec42M');
  const sec42P = document.getElementById('sec42P');
  const mixList = document.getElementById('mixList');
  const addMixBtn = document.getElementById('addMix');
  const mixPercent = document.getElementById('mixPercent');
  const mixType = document.getElementById('mixType');
  const mixHidden = document.getElementById('f42M');
  const mixSumEl = document.getElementById('mixSum');
  const f40E = document.getElementById('f40E');
  const f40E_other = document.getElementById('f40E_other');
  // 42C composed control
  const f42C_hidden = document.getElementById('f42C');
  const f42C_hasMaturity = document.getElementById('f42C_hasMaturity');
  const f42C_select_no = document.getElementById('f42C_select_no');
  const f42C_var_box = document.getElementById('f42C_var_box');
  const f42C_select = document.getElementById('f42C_select');
  const f42C_other = document.getElementById('f42C_other');
  // 27 attachments
  const f27 = document.getElementById('f27');
  const sec27 = document.getElementById('sec27');
  const attachmentsList = document.getElementById('attachmentsList');
  const addAttachmentBtn = document.getElementById('addAttachment');
  const attRelated = document.getElementById('attRelated');
  const attTitle = document.getElementById('attTitle');
  const f27_list = document.getElementById('f27_list');
  // Per-attachment files
  let attachmentRows = [];

  function toggleConditional() {
    const selected = role.value;
    // 42P required for BY DEF PAYMENT and BY NEGOTIATION
    if (selected === 'BY DEF PAYMENT' || selected === 'BY NEGOTIATION') {
      sec42P.classList.remove('hidden');
    } else {
      sec42P.classList.add('hidden');
      document.getElementById('f42P').value = '';
    }
    // 42M visible for MIX PAYMENT
    if (selected === 'BY MIX PAYMENT') {
      sec42M.classList.remove('hidden');
    } else {
      sec42M.classList.add('hidden');
      clearMix();
    }
  }

  function clearMix(){
    mixList.innerHTML = '';
    mixHidden.value = '';
    if (mixSumEl) mixSumEl.textContent = '0%';
  }

  function addMixRow() {
    const p = parseInt(mixPercent.value, 10);
    const t = mixType.value;
    if (Number.isNaN(p) || p <= 0 || p > 100) return;
    const node = document.createElement('div');
    node.className = 'pill';
    node.dataset.percent = String(p);
    node.dataset.type = t;
    node.innerHTML = `%${p} ${t} <button type="button">Sil</button>`;
    node.querySelector('button').addEventListener('click', ()=>{
      node.remove();
      serializeMix();
    });
    mixList.appendChild(node);
    serializeMix();
    mixPercent.value = '';
  }

  function serializeMix(){
    const items = Array.from(mixList.children).map(x=>({p: Number(x.dataset.percent), t: x.dataset.type}));
    const sum = items.reduce((a,b)=>a+(b.p||0),0);
    if (mixSumEl) mixSumEl.textContent = `${sum}%`;
    // warn on not 100
    Array.from(mixList.children).forEach(x=>{
      if (sum!==100) x.classList.add('warn'); else x.classList.remove('warn');
    });
    mixHidden.value = items.map(i=>`%${i.p} ${i.t}`).join(', ');
  }

  addMixBtn?.addEventListener('click', addMixRow);
  role?.addEventListener('change', toggleConditional);
  toggleConditional();

  // 40E OTHER toggle
  function toggle40E() {
    if (f40E.value === 'OTHER') {
      f40E_other.classList.remove('hidden');
      f40E_other.required = true;
    } else {
      f40E_other.classList.add('hidden');
      f40E_other.required = false;
      f40E_other.value = '';
    }
  }
  f40E.addEventListener('change', toggle40E);
  toggle40E();

  // 42C behavior
  function update42C(){
    const mode = f42C_hasMaturity.value;
    // Toggle groups
    if (mode === 'NO'){
      f42C_select_no.classList.remove('hidden');
      f42C_var_box.classList.add('hidden');
      f42C_other.classList.add('hidden');
      f42C_hidden.value = f42C_select_no.value || '';
    } else if (mode === 'YES'){
      f42C_select_no.classList.add('hidden');
      f42C_var_box.classList.remove('hidden');
      const v = f42C_select.value;
      if (v === 'OTHER'){
        f42C_other.classList.remove('hidden');
        f42C_hidden.value = (f42C_other.value||'').trim();
      } else {
        f42C_other.classList.add('hidden');
        f42C_other.value = '';
        f42C_hidden.value = v || '';
      }
    } else {
      f42C_select_no.classList.add('hidden');
      f42C_var_box.classList.add('hidden');
      f42C_other.classList.add('hidden');
      f42C_hidden.value = '';
    }
  }
  f42C_hasMaturity?.addEventListener('change', update42C);
  f42C_select_no?.addEventListener('change', update42C);
  f42C_select?.addEventListener('change', update42C);
  f42C_other?.addEventListener('input', update42C);
  update42C();

  // 42a behavior: autofill by source and confirmation
  const f42a_confirm = document.getElementById('f42a_confirm');
  const f42a_source = document.getElementById('f42a_source');
  const f42a_drawee = document.getElementById('f42a_drawee');
  const f58a = document.getElementById('f58a');
  const f51a = document.getElementById('f51a');
  const f41a_bank = document.getElementById('f41a_bank');

  function update42aFromSource(){
    const src = f42a_source.value;
    if (src === 'CONFIRMATION'){
      f42a_drawee.value = (f58a?.value || '').trim();
    } else if (src === 'APPLICANT'){
      f42a_drawee.value = (f51a?.value || '').trim();
    } else if (src === 'NOMINATED'){
      f42a_drawee.value = (f41a_bank?.value || '').trim();
    }
  }
  f42a_source?.addEventListener('change', update42aFromSource);
  f42a_confirm?.addEventListener('change', ()=>{
    if (f42a_confirm.value === 'CONFIRMING' && (f58a?.value || '').trim()){
      f42a_source.value = 'CONFIRMATION';
      update42aFromSource();
    }
  });

  // Contextual helper texts under fields
  installFieldHelps();
  function installFieldHelps(){
    const helps = {
      f27: "Bu alanda başvuru formu ve ek sayfa adedi 1/N olarak yazılır (örn: 1/3).",
      sec27: "1/1'den farklıysa ek sayfaları burada satır satır ve dosyalarıyla ekleyin.",
      f40A: "Akreditifin yapısal türü: AT SIGHT, IRREVOCABLE, TRANSFERABLE vb.",
      f20: "Akreditif/başvuru referans numarası. Banka veriyorsa boş bırakılabilir.",
      f23: "Ön ihbara referans (varsa).",
      f31C: "Düzenlenme tarihi YYMMDD formatında (örn: 250901).",
      f40E: "UCP/EUCP LATEST VERSION veya OTHER seçiniz.",
      f31D: "Akreditifin vadesi YYMMDD (Place of Expiry).",
      f51a: "Amir/Alıcının bankası: SWIFT veya ad.",
      f50: "Amir/Alıcı tam unvan ve adres.",
      f59: "Lehtar/Satıcı tam unvan ve adres.",
      f32B_ccy: "Para birimi (3 harf: USD, EUR, TRY).",
      f32B_amt: "Akreditif tutarı (tolerans hariç).",
      f39A: "Tutar toleransı +/- (örn: 10/10).",
      f39B: "Maksimum kredi tutarı.",
      f39C: "Navlun, sigorta, faiz gibi ilave tutarlar.",
      f41a_bank: "Kullanımda olacağı/görevli banka adı veya SWIFT.",
      f41a_role: "BY PAYMENT / BY DEF PAYMENT / BY ACCEPTANCE / BY NEGOTIATION / BY MIX PAYMENT.",
      f42C_select_no: "Vade yok ise SIGHT veya AT SIGHT seçiniz.",
      f42C_select: "Vade var ise şablon seçin veya OTHER ile serbest ifade girin.",
      f42a_drawee: "Poliçeyi ödeyecek banka (teyit varsa teyit bankası; yoksa amir veya görevli).",
      f42P: "Vadeli/iştira akreditifler için vade şartı (örn: 90 DAYS FROM B/L DATE).",
      f43P: "Kısmi yüklemeler: İzin var/yok/şartlı.",
      f44A: "Malı teslim alma yeri (liman/havalimanı dışı).",
      f44E: "Yükleme limanı/havalimanı.",
      f44F: "Boşaltma limanı/varış havalimanı.",
      f44B: "Teslim etme yeri (varış).",
      f44C: "Son yükleme tarihi YYMMDD.",
      f44D: "Yükleme periyodu (örn: NOT EARLIER THAN ...).",
      f45A: "Mal ve hizmetlerin detaylı tanımı (miktar, birim fiyat, Incoterms).",
      f46A: "Gerekli belge listesi ve adetleri.",
      f47A: "İlave şartlar ve belge üzeri ibareler.",
      f49G: "Lehtar için özel ödeme şartları (postfinansman/iskonto vb.).",
      f49H: "Alan banka için özel ödeme şartları.",
      f71D: "Masrafların kime ait olduğu (örn: all charges ... are on beneficiary).",
      f48: "İbraz süresi gün olarak (boşsa 21 gün kabul).",
      f49: "Teyit talimatı: WITHOUT / CONFIRM / MAY ADD.",
      f58a: "Teyit talep edilen taraf (banka adı/SWIFT).",
      f57a: "İkinci ihbar bankası."
    };
    Object.entries(helps).forEach(([id, text])=>{
      const el = document.getElementById(id);
      if (!el) return;
      const group = el.closest('.field-group') || el.parentElement;
      if (!group) return;
      const sm = document.createElement('small');
      sm.textContent = text;
      group.appendChild(sm);
    });
  }

  // Helper: normalize date inputs to YYMMDD if user types DD.MM.YYYY or YYYY-MM-DD
  const dateInputs = ['f31C','f31D','f44C'].map(id=>document.getElementById(id));
  dateInputs.forEach(inp=>{
    if (inp && inp.type === 'date') {
      // Date inputs are already in YYYY-MM-DD format, no conversion needed
      return;
    }
    inp?.addEventListener('blur', ()=>{
      if (!inp.value) return;
      inp.value = toYYMMDD(inp.value);
    });
  });

  function toYYMMDD(raw){
    let s = String(raw).trim();
    if (/^\d{6}$/.test(s)) return s; // already YYMMDD
    //  DD.MM.YYYY or DD/MM/YYYY
    let m = s.match(/^(\d{1,2})[\.\/](\d{1,2})[\.\/-](\d{2,4})$/);
    if (m){
      const dd = m[1].padStart(2,'0');
      const mm = m[2].padStart(2,'0');
      const yyyy = m[3].length===2 ? ('20'+m[3]) : m[3];
      return yyyy.slice(2)+mm+dd;
    }
    // YYYY-MM-DD (date input format)
    m = s.match(/^(\d{4})[-\.\/](\d{1,2})[-\.\/](\d{1,2})$/);
    if (m){
      const yyyy = m[1];
      const mm = m[2].padStart(2,'0');
      const dd = m[3].padStart(2,'0');
      return yyyy.slice(2)+mm+dd;
    }
    return s.replace(/\D/g,'').slice(0,6);
  }

  // 27 parsing and UI toggle
  function parse27(val){
    const m = String(val||'').match(/^(\s*)(\d+)(\s*)\/(\s*)(\d+)(\s*)$/);
    if (!m) return null;
    const top = parseInt(m[2],10);
    const bottom = parseInt(m[5],10);
    if (top!==1 || bottom<1) return null;
    return {top, bottom};
  }

  function toggle27(){
    const info = parse27(f27.value);
    if (!info){
      sec27.classList.add('hidden');
      attachmentsList.innerHTML='';
      f27_list.value='';
      return;
    }
    if (info.bottom>1){
      sec27.classList.remove('hidden');
      // Check if we have the correct number of attachments
      const currentCount = attachmentsList.children.length;
      const requiredCount = info.bottom - 1;
      
      if (currentCount < requiredCount) {
        // Show add button if we need more attachments
        addAttachmentBtn.style.display = 'block';
      } else if (currentCount > requiredCount) {
        // Remove excess attachments
        while (attachmentsList.children.length > requiredCount) {
          attachmentsList.lastChild.remove();
        }
        serializeAttachments();
        addAttachmentBtn.style.display = 'none';
      } else {
        // Exact count - hide add button
        addAttachmentBtn.style.display = 'none';
      }
    } else {
      sec27.classList.add('hidden');
      attachmentsList.innerHTML='';
      f27_list.value='';
      addAttachmentBtn.style.display = 'block';
    }
  }

  function addAttachment(){
    const rel = attRelated.value;
    const title = attTitle.value.trim();
    if (!title) return;
    
    // Check if we can add more attachments
    const info = parse27(f27.value);
    if (info && info.bottom > 1) {
      const currentCount = attachmentsList.children.length;
      const requiredCount = info.bottom - 1;
      if (currentCount >= requiredCount) {
        return; // Don't add more than required
      }
    }
    
    const row = document.createElement('div');
    row.className='attachment';
    const rowId = cryptoRandomId();
    row.dataset.id = rowId;
    row.innerHTML = `<span class="tag">${rel}</span><span>${escapeHtml(title)}</span><span class="spacer"></span><input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.txt"><button type="button">Sil</button>`;
    const fileInput = row.querySelector('input[type=file]');
    fileInput.addEventListener('change', ()=> serializeAttachments());
    row.querySelector('button').addEventListener('click',()=>{ 
      row.remove(); 
      attachmentRows = attachmentRows.filter(x=>x.id!==rowId);
      serializeAttachments();
      toggle27(); // Re-check if we need to show add button
    });
    attachmentsList.appendChild(row);
    attachmentRows.push({id: rowId, rel, title});
    attTitle.value='';
    serializeAttachments();
    
    // Check if we need to hide the add button after adding
    toggle27();
  }

  function serializeAttachments(){
    const rows = Array.from(attachmentsList.children).map(el=>{
      const id = el.dataset.id;
      const tag = el.querySelector('.tag').textContent;
      const text = el.querySelector('span:nth-child(2)').textContent;
      const fileInput = el.querySelector('input[type=file]');
      const file = (fileInput && fileInput.files && fileInput.files[0]) ? fileInput.files[0] : null;
      return { id, field: tag, title: text, fileName: file? file.name : null };
    });
    f27_list.value = JSON.stringify({ attachments: rows });
  }

  function escapeHtml(s){
    return s.replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]));
  }

  f27.addEventListener('input', toggle27);
  addAttachmentBtn?.addEventListener('click', addAttachment);
  toggle27();

  function cryptoRandomId(){
    return (Math.random().toString(36).slice(2))+Date.now().toString(36);
  }

  // Validation
  form?.addEventListener('submit', (e)=>{
    clearFieldErrors();
    // Tüm görünür alanları zorunlu olarak değerlendir
    const allFields = Array.from(form.querySelectorAll('input, select, textarea'))
      .filter(el => shouldValidateField(el));
    allFields.forEach(el => {
      const val = (el.value||'').toString().trim();
      if (!val) addFieldError(el, 'Bu alan boş bırakılamaz');
    });
    // Currency code 3 letters
    const ccy = document.getElementById('f32B_ccy').value.trim();
    if (ccy && !/^[A-Z]{3}$/.test(ccy.toUpperCase())) addFieldError(document.getElementById('f32B_ccy'), 'Para cinsi 3 harf olmalı (örn: USD)');
    // Date validation for date inputs
    ['f31D','f44C'].forEach(id=>{
      const el = document.getElementById(id);
      if (el && el.type === 'date') {
        const v = el.value.trim();
        if (v && !/^\d{4}-\d{2}-\d{2}$/.test(v)) addFieldError(el, 'Geçerli bir tarih seçin');
      } else if (el) {
        const v = el.value.trim();
        if (v && !/^\d{6}$/.test(v)) addFieldError(el, 'Tarih formatı YYMMDD olmalı (örn: 250909)');
      }
    });
    // Role-based checks
    const r = role.value;
    if ((r==='BY DEF PAYMENT' || r==='BY NEGOTIATION') && !document.getElementById('f42P').value.trim()){
      addFieldError(document.getElementById('f42P'), 'Vadeli/iştira detayını giriniz');
    }
    if (r==='BY MIX PAYMENT' && !mixHidden.value.trim()){
      addFieldError(document.getElementById('sec42M'), 'Karışık ödeme satırlarını ekleyiniz (toplam 100% olmalı)');
    }
    if (r==='BY MIX PAYMENT'){
      // enforce 100%
      const items = Array.from(mixList.children).map(x=>Number(x.dataset.percent));
      const total = items.reduce((a,b)=>a+(b||0),0);
      if (total !== 100) addFieldError(document.getElementById('sec42M'), '42M toplam yüzde 100 olmalıdır');
    }
    // If role implies time-based instruments and user chose OTHER but left empty
    if ((r==='BY ACCEPTANCE' || r==='BY NEGOTIATION' || r==='BY MIX PAYMENT' || r==='BY DEF PAYMENT') && !f42C_hidden.value.trim()){
      addFieldError(document.getElementById('f42C_select')||document.getElementById('f42C_select_no')||document.getElementById('f42C_hasMaturity'), 'Poliçe vadesini belirtiniz');
    }
    // 42a required for time-based instruments
    if ((r==='BY ACCEPTANCE' || r==='BY NEGOTIATION' || r==='BY MIX PAYMENT' || r==='BY DEF PAYMENT') && !f42a_drawee.value.trim()){
      addFieldError(f42a_drawee, 'Drawee (poliçeyi ödeyecek banka) yazılmalı');
    }
    if (f40E.value==='OTHER' && !f40E_other.value.trim()){
      addFieldError(f40E_other, 'OTHER seçildi, kuralı yazınız');
    }
    // 27 validation
    const p27 = parse27(f27.value);
    if (!p27){
      addFieldError(document.getElementById('f27'), 'Format 1/N (N≥1) ve üst her zaman 1 olmalıdır');
    } else if (p27.bottom>1){
      const rows = Array.from(attachmentsList.children);
      if (rows.length !== (p27.bottom-1)){
        addFieldError(document.getElementById('sec27'), `Ek sayfa sayısı ${p27.bottom-1} olmalıdır`);
      }
      const missing = rows.filter(el=>{
        const fileInput = el.querySelector('input[type=file]');
        return !(fileInput && fileInput.files && fileInput.files[0]);
      });
      if (missing.length){
        addFieldError(document.getElementById('sec27'), 'Her ek sayfa için bir dosya yükleyiniz');
      }
    }
    if (document.querySelector('.error-msg')) e.preventDefault();
  });

  // Also validate optional fields on blur/change to show guidance immediately
  const watchInputs = Array.from(document.querySelectorAll('input, textarea, select'));
  watchInputs.forEach(el=>{
    const handler = ()=>{
      // clear previous error for this field only
      const group = el.closest('.field-group') || el.parentElement;
      group?.querySelector('.error-msg')?.remove();
      el.classList.remove('invalid');
      // basic live rules
      if (shouldValidateField(el)){
        if (!(el.value||'').toString().trim()) addFieldError(el,'Bu alan boş bırakılamaz');
      }
      if (el.id==='f32B_ccy'){
        const v = el.value.trim();
        if (v && !/^[A-Z]{3}$/.test(v.toUpperCase())) addFieldError(el,'Para cinsi 3 harf olmalı (örn: USD)');
      }
      if (el.id==='f44C' || el.id==='f31D' || el.id==='f31C'){
        if (el.type === 'date') {
          const v = el.value.trim();
          if (v && !/^\d{4}-\d{2}-\d{2}$/.test(v)) addFieldError(el,'Geçerli bir tarih seçin');
        } else {
          const v = el.value.trim();
          if (v && !/^\d{6}$/.test(v)) addFieldError(el,'Tarih formatı YYMMDD olmalı (örn: 250909)');
        }
      }
    };
    el.addEventListener('blur', handler);
    el.addEventListener('change', handler);
  });

  function addFieldError(element, message){
    if (!element) return;
    const container = element.closest('.field-group') || element.parentElement;
    element.classList?.add('invalid');
    // Avoid duplicate error messages
    if (container && !container.querySelector('.error-msg')){
      const msg = document.createElement('div');
      msg.className = 'error-msg';
      msg.textContent = message;
      container.appendChild(msg);
    }
  }

  function clearFieldErrors(){
    document.querySelectorAll('.error-msg').forEach(n=>n.remove());
    document.querySelectorAll('.invalid').forEach(n=>n.classList.remove('invalid'));
  }

  function isVisible(el){
    if (!el) return false;
    if (el.classList && el.classList.contains('hidden')) return false;
    let p = el.parentElement;
    while (p){
      if (p.classList && p.classList.contains('hidden')) return false;
      p = p.parentElement;
    }
    return true;
  }

  function shouldValidateField(el){
    if (!isVisible(el)) return false;
    if (el.type === 'hidden') return false;
    if (el.disabled) return false;
    // Don't validate 42M input fields when 42M is complete (100%)
    if (el.id === 'mixPercent' || el.id === 'mixType'){
      const items = Array.from(mixList.children).map(x=>Number(x.dataset.percent));
      const total = items.reduce((a,b)=>a+(b||0),0);
      if (total === 100) return false;
    }
    // Don't validate 27 attachment input fields when add button is hidden
    if (el.id === 'attRelated' || el.id === 'attTitle'){
      const info = parse27(f27.value);
      if (info && info.bottom > 1) {
        const currentCount = attachmentsList.children.length;
        const requiredCount = info.bottom - 1;
        if (currentCount >= requiredCount) return false;
      }
    }
    return true;
  }

  // Demo data filler
  const demoBtn = document.getElementById('demoBtn');
  demoBtn?.addEventListener('click', fillDemoData);
  const pdfBtn = document.getElementById('pdfBtn');
  pdfBtn?.addEventListener('click', generatePdf);

  // Persist main form fields to localStorage for MT700 sync (yalnızca yazarken kaydet, sayfa açılışında otomatik doldurma YOK)
  const mainForm = document.getElementById('lcForm');
  // Save
  mainForm?.addEventListener('input', (e)=>{
    if (!(e.target instanceof HTMLElement)) return;
    const id = e.target.id;
    if (id) {
      localStorage.setItem(id, (e.target.value||'').toString());
      // Mark that user has used the form
      localStorage.setItem('userHasUsedForm', 'true');
      // Real-time sync to MT700 form
      syncToMT700(id, e.target.value);
    }
  });

  // Real-time sync function to MT700 form
  function syncToMT700(fieldId, value) {
    // Mapping from main form fields to MT700 fields
    const syncMap = {
      'f27': 'mt27', 'f40A': 'mt40A', 'f20': 'mt20', 'f23': 'mt23', 'f31C': 'mt31C', 'f40E': 'mt40E',
      'f31D': 'mt31D', 'f51a': 'mt51a', 'f50': 'mt50', 'f59': 'mt59', 'f32B_amt': 'mt32B',
      'f39A': 'mt39A', 'f39B': 'mt39B', 'f39C': 'mt39C', 'f41a_bank': 'mt41a', 'f42C': 'mt42C',
      'f42a_drawee': 'mt42a', 'f42M': 'mt42M', 'f42P': 'mt42P', 'f43P': 'mt43P', 'f43T': 'mt43T',
      'f44A': 'mt44A', 'f44E': 'mt44E', 'f44F': 'mt44F', 'f44B': 'mt44B', 'f44C': 'mt44C', 'f44D': 'mt44D',
      'f45A': 'mt45A', 'f46A': 'mt46A', 'f47A': 'mt47A', 'f49G': 'mt49G', 'f49H': 'mt49H',
      'f71D': 'mt71D', 'f48': 'mt48', 'f49': 'mt49', 'f58a': 'mt58a', 'f57a': 'mt57a'
    };
    
    const mt700FieldId = syncMap[fieldId];
    if (mt700FieldId) {
      // Save to localStorage for MT700 form to pick up
      localStorage.setItem(mt700FieldId, value);
      
      // If MT700 page is open in another tab, sync immediately
      if (window.opener || window.parent !== window) {
        const message = { type: 'sync', fieldId: mt700FieldId, value: value };
        if (window.opener) window.opener.postMessage(message, '*');
        if (window.parent !== window) window.parent.postMessage(message, '*');
      }
    }
  }

  // Listen for sync messages from MT700 page
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

  // Reset button handler
  const resetBtn = document.querySelector('button[type="reset"]');
  resetBtn?.addEventListener('click', ()=>{
    setTimeout(()=>{
      clearMix();
      attachmentsList.innerHTML = '';
      f27_list.value = '';
      clearFieldErrors();
      // Clear localStorage to start fresh
      localStorage.clear();
    }, 10);
  });

  function fillDemoData(){
    clearFieldErrors();
    // Reset form first
    form.reset();
    clearMix();
    clearFieldErrors();

    document.getElementById('f27').value = '1/3';
    toggle27();
    // add two attachments
    attRelated.value = '45A'; attTitle.value = 'Detailed goods description'; addAttachment();
    attRelated.value = '46A'; attTitle.value = 'Document list extension'; addAttachment();
    // set files placeholders cannot be programmatically for security; leave empty

    document.getElementById('f40A').value = 'IRREVOCABLE';
    document.getElementById('f20').value = 'LC2025001';
    document.getElementById('f31C').value = '2025-09-01';
    document.getElementById('f40E').value = 'UCP LATEST VERSION'; toggle40E();
    document.getElementById('f31D').value = '2025-12-31';
    document.getElementById('f51a').value = 'ISBKTRISXXX';
    document.getElementById('f50').value = 'ABC IMPORT LTD., 123 Main St, City, Country';
    document.getElementById('f59').value = 'XYZ EXPORT LLC, 456 Business Ave, City, Country';
    document.getElementById('f32B_ccy').value = 'USD';
    document.getElementById('f32B_amt').value = '100000';
    document.getElementById('f39A').value = '10/10';
    document.getElementById('f39B').value = '110000';
    document.getElementById('f39C').value = 'FREIGHT, INSURANCE';
    document.getElementById('f41a_bank').value = 'NOMINATED BANK XYZ';
    document.getElementById('f41a_role').value = 'BY MIX PAYMENT'; toggleConditional();

    // 42C: vade var, 60 days from B/L date
    document.getElementById('f42C_hasMaturity').value = 'YES'; update42C();
    document.getElementById('f42C_select').value = '60 DAYS FROM B/L DATE'; update42C();

    // 42a drawee
    document.getElementById('f42a_confirm').value = 'NON-CONFIRMING';
    document.getElementById('f42a_source').value = 'NOMINATED';
    update42aFromSource();
    if (!document.getElementById('f42a_drawee').value) document.getElementById('f42a_drawee').value = 'NOMINATED BANK XYZ';

    // 42M: 60 DEF, 30 ACCEPTANCE, 10 RED CLAUSE
    mixPercent.value = 60; mixType.value = 'BY DEF PAYMENT'; addMixRow();
    mixPercent.value = 30; mixType.value = 'BY ACCEPTANCE'; addMixRow();
    mixPercent.value = 10; mixType.value = 'RED CLAUSE'; addMixRow();

    document.getElementById('f42P').value = '60 DAYS FROM BILL OF LADING DATE';
    document.getElementById('f23').value = 'REF123456';
    document.getElementById('f43P').value = 'İzin var';
    document.getElementById('f43T').value = 'İzin var';
    document.getElementById('f44A').value = 'ISTANBUL';
    document.getElementById('f44E').value = 'MERSİN';
    document.getElementById('f44F').value = 'HAMBURG';
    document.getElementById('f44B').value = 'HAMBURG CITY';
    document.getElementById('f44C').value = '2025-10-15';
    document.getElementById('f44D').value = 'NOT EARLIER THAN 250901 AND NOT LATER THAN 251015';
    document.getElementById('f45A').value = 'ELECTRONICS, 1000 PCS, FOB ISTANBUL';
    document.getElementById('f46A').value = 'SIGNED COMMERCIAL INVOICE IN 5 FOLDS; PACKING LIST IN 4 FOLDS';
    document.getElementById('f47A').value = 'ALL DOCUMENTS MUST STATE L/C NUMBER';
    document.getElementById('f49G').value = 'POST FINANCING AVAILABLE';
    document.getElementById('f49H').value = 'BANK DISCOUNT TERMS APPLY';
    document.getElementById('f71D').value = 'ALL CHARGES OUTSIDE OUR OFFICE ARE ON BENEFICIARY';
    document.getElementById('f48').value = 21;
    document.getElementById('f49').value = 'MAY ADD';
    document.getElementById('f58a').value = 'CONFIRMING BANK ABC';
    document.getElementById('f57a').value = 'SECOND ADVISING BANK DEF';

    // Sync all fields to MT700 after demo data is loaded
    Array.from(document.querySelectorAll('#lcForm [id]')).forEach(el=>{
      const id = el.id; 
      if (id) {
        localStorage.setItem(id, (el.value||'').toString());
        syncToMT700(id, el.value);
      }
    });
  }

  // Build printable text and open in new window; user can print to PDF
  function generatePdf(){
    // collect values
    const get = id => (document.getElementById(id)?.value||'').toString().trim();
    const v = {
      f27:get('f27'), f40A:get('f40A'), f20:get('f20'), f23:get('f23'), f31C:get('f31C'), f40E:get('f40E')||get('f40E_other'),
      f31D:get('f31D'), f51a:get('f51a'), f50:get('f50'), f59:get('f59'), f32B_ccy:get('f32B_ccy'), f32B_amt:get('f32B_amt'),
      f39A:get('f39A'), f39B:get('f39B'), f39C:get('f39C'), f41a_bank:get('f41a_bank'), f41a_role:get('f41a_role'),
      f42C:get('f42C'), f42a:get('f42a_drawee'), f42M:get('f42M'), f42P:get('f42P'), f43P:get('f43P'), f43T:get('f43T'),
      f44A:get('f44A'), f44E:get('f44E'), f44F:get('f44F'), f44B:get('f44B'), f44C:get('f44C'), f44D:get('f44D'),
      f45A:get('f45A'), f46A:get('f46A'), f47A:get('f47A'), f49G:get('f49G'), f49H:get('f49H'), f71D:get('f71D'),
      f48:get('f48'), f49:get('f49'), f58a:get('f58a'), f57a:get('f57a')
    };
    const sections = [
      ['27 : Sequence of Total', v.f27],
      ['40A: Form of Documentary Credit', v.f40A],
      ['20 : Documentary Credit Number', v.f20],
      ['23 : Reference to Pre-Advice', v.f23],
      ['31C: Date of Issue', toIso(v.f31C)],
      ['40E: Applicable Rules', v.f40E],
      ['31D: Date and Place of Expiry', toIso(v.f31D)],
      ['51a : Applicant Bank', v.f51a],
      ['50 : Applicant', v.f50],
      ['59 : Beneficiary', v.f59],
      ['32B: Currency Code, Amount', `${(v.f32B_ccy||'').toUpperCase()}${Number(v.f32B_amt||0).toFixed(2)}`],
      ['39A: Percentage Credit Amount Tolerance', v.f39A],
      ['39B: Maximum Credit Amount', v.f39B],
      ['39C: Additional Amounts Covered', v.f39C],
      ['41a : Available With ... By ...', `${v.f41a_bank}\n${v.f41a_role}`],
      ['42C: Drafts at ...', v.f42C],
      ['42a : Drawee', v.f42a],
      ['42M: Mixed Payment Details', v.f42M],
      ['42P: Deferred Payment Details', v.f42P],
      ['43P: Partial Shipments', v.f43P],
      ['43T: Transhipment', v.f43T],
      ['44A: Place of Taking in Charge/Dispatch from', v.f44A],
      ['44E: Port of Loading/Airport of Departure', v.f44E],
      ['44F: Port of Discharge/Airport of Destination', v.f44F],
      ['44B: Place of Final Destination', v.f44B],
      ['44C: Latest Date of Shipment', toIso(v.f44C)],
      ['44D: Shipment Period', v.f44D],
      ['45A: Description of Goods and/or Services', v.f45A],
      ['46A: Documents Required', v.f46A],
      ['47A: Additional Conditions', v.f47A],
      ['49G: Special Payment Conditions for Beneficiary', v.f49G],
      ['49H: Special Payment Conditions for Applicant Bank', v.f49H],
      ['71D: Charges', v.f71D],
      ['48 : Period for Presentation in Days', v.f48],
      ['49 : Confirmation Instructions', v.f49],
      ['58a: Requested Confirmation Party', v.f58a],
      ['57a: Second Advising Bank', v.f57a]
    ];
    const win = window.open('', '_blank');
    if (!win) return alert('Açılır pencere engellendi. Lütfen izin verin.');
    const style = `
      body{font:12px/1.6 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;white-space:pre-wrap;padding:24px;color:#111}
      .row{margin:0 0 12px 0}
      .label{font-weight:700}
      .value{margin-top:2px;}
    `;
    const html = [`<html><head><title>Başvuru Formu</title><style>${style}</style></head><body>`];
    sections.forEach(([label, value])=>{
      html.push(`<div class="row"><div class="label">${escapeHtml(label)}</div><div class="value">${escapeHtml(String(value||''))}</div></div>`);
    });
    html.push(`</body></html>`);
    win.document.write(html.join(''));
    win.document.close();
    win.focus();
    win.print();
    
    // Update statistics
    localStorage.setItem('last_pdf_export', new Date().toISOString());
  }

  function toIso(dateValue){
    if (!dateValue) return '';
    const s = String(dateValue).trim();
    
    // If already in YYMMDD format, return as is
    if (/^\d{6}$/.test(s)) return s;
    
    // If in YYYY-MM-DD format (date input), convert to YYMMDD
    const m = s.match(/^(\d{4})[-\.\/](\d{1,2})[-\.\/](\d{1,2})$/);
    if (m){
      const yyyy = m[1];
      const mm = m[2].padStart(2,'0');
      const dd = m[3].padStart(2,'0');
      return yyyy.slice(2)+mm+dd;
    }
    
    // If in DD.MM.YYYY format, convert to YYMMDD
    const m2 = s.match(/^(\d{1,2})[\.\/](\d{1,2})[\.\/-](\d{2,4})$/);
    if (m2){
      const dd = m2[1].padStart(2,'0');
      const mm = m2[2].padStart(2,'0');
      const yyyy = m2[3].length===2 ? ('20'+m2[3]) : m2[3];
      return yyyy.slice(2)+mm+dd;
    }
    
    return s.replace(/\D/g,'').slice(0,6);
  }

  function addFieldError(element, message){
    if (!element) return;
    const container = element.closest('.field-group') || element.parentElement;
    element.classList?.add('invalid');
    if (container && !container.querySelector('.error-msg')){
      const msg = document.createElement('div');
      msg.className = 'error-msg';
      msg.textContent = message;
      container.appendChild(msg);
    }
  }

  function clearFieldErrors(){
    document.querySelectorAll('.error-msg').forEach(n=>n.remove());
    document.querySelectorAll('.invalid').forEach(n=>n.classList.remove('invalid'));
  }

  // Load saved data on page load - ONLY if user has previously entered data
  function loadFormData() {
    const form = document.getElementById('lcForm');
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
    
    // Load 27 attachments if any
    const savedAttachments = localStorage.getItem('f27_list');
    if (savedAttachments) {
      f27_list.value = savedAttachments;
      // Parse and recreate attachment rows
      try {
        const attachments = JSON.parse(savedAttachments);
        attachments.forEach(att => {
          attRelated.value = att.related;
          attTitle.value = att.title;
          addAttachment();
        });
      } catch (e) {
        console.warn('Could not parse saved attachments');
      }
    }
    
    // Load 42M mix rows if any
    const savedMix = localStorage.getItem('f42M');
    if (savedMix) {
      try {
        const mixData = JSON.parse(savedMix);
        mixData.forEach(mix => {
          mixPercent.value = mix.percent;
          mixType.value = mix.type;
          addMixRow();
        });
      } catch (e) {
        console.warn('Could not parse saved mix data');
      }
    }
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
    
    // Save 27 attachments
    serializeAttachments();
    
    // Save 42M mix data
    serializeMix();
    
    // Mark that user has saved data
    localStorage.setItem('userHasUsedForm', 'true');
    
    alert('Form başarıyla kaydedildi! Sayfa yenilendiğinde verileriniz korunacak.');
  });

  // Debug function to test sync
  window.testSync = function() {
    console.log('Testing sync...');
    document.getElementById('f50').value = 'TEST SYNC - ' + new Date().toLocaleTimeString();
    syncToMT700('f50', document.getElementById('f50').value);
    console.log('Sync sent to MT700');
  };

  // API Key Management
  const apiKeyStatus = document.getElementById('apiKeyStatus');
  const apiKeyDisplay = document.getElementById('apiKeyDisplay');

  // Load and display saved API key
  function updateApiKeyDisplay() {
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
      apiKeyStatus.textContent = '✓ API Key kaydedildi';
      apiKeyStatus.style.color = '#10b981';
      apiKeyDisplay.textContent = savedApiKey.substring(0, 20) + '...';
    } else {
      // Use default API key from config
      if (typeof CONFIG !== 'undefined' && CONFIG.DEFAULT_OPENAI_API_KEY) {
        apiKeyStatus.textContent = '✓ Varsayılan API Key kullanılıyor';
        apiKeyStatus.style.color = '#10b981';
        apiKeyDisplay.textContent = CONFIG.DEFAULT_OPENAI_API_KEY.substring(0, 20) + '... (Varsayılan)';
      } else {
        apiKeyStatus.textContent = '❌ API Key yüklenemedi';
        apiKeyStatus.style.color = '#ef4444';
        apiKeyDisplay.textContent = 'Yüklenemedi';
      }
    }
  }

  // Update display on load
  updateApiKeyDisplay();

  // AI Check functionality
  const aiCheckBtn = document.getElementById('aiCheckBtn');
  aiCheckBtn?.addEventListener('click', performAICheck);

  async function performAICheck() {
    const savedApiKey = localStorage.getItem('openai_api_key');
    const defaultApiKey = (typeof CONFIG !== 'undefined' && CONFIG.DEFAULT_OPENAI_API_KEY) ? CONFIG.DEFAULT_OPENAI_API_KEY : null;
    const apiKey = savedApiKey || defaultApiKey;
    
    if (!apiKey) {
      alert('API Key bulunamadı! Lütfen Admin Panel\'den API Key\'inizi kaydedin.');
      return;
    }

    aiCheckBtn.disabled = true;
    aiCheckBtn.textContent = 'AI Kontrol Ediliyor...';

    try {
      const formData = collectFormData();
      const results = await checkAllFieldsWithAI(formData, apiKey);
      displayAIResults(results);
      
      // Update statistics
      localStorage.setItem('last_ai_check', new Date().toISOString());
      const totalForms = parseInt(localStorage.getItem('total_forms') || '0') + 1;
      localStorage.setItem('total_forms', totalForms.toString());
    } catch (error) {
      console.error('AI Check Error:', error);
      alert('AI kontrolü sırasında hata oluştu: ' + error.message);
    } finally {
      aiCheckBtn.disabled = false;
      aiCheckBtn.textContent = 'AI Kontrol';
    }
  }

  function collectFormData() {
    const data = {};
    form.querySelectorAll('input, textarea, select').forEach(el => {
      if (el.id && el.value) {
        data[el.id] = el.value;
      }
    });
    return data;
  }

  async function checkAllFieldsWithAI(formData, apiKey) {
    const results = [];
    
    for (const [fieldId, value] of Object.entries(formData)) {
      if (!value.trim()) continue;
      
      const fieldInfo = getFieldInfo(fieldId);
      if (!fieldInfo) continue;

      try {
        const result = await checkFieldWithAI(fieldId, value, fieldInfo, apiKey);
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

  function getFieldInfo(fieldId) {
    const fieldMap = {
      'f27': { name: '27 - Teklif ve ekleri', type: 'sequence' },
      'f40A': { name: '40A - Akreditifin Formu', type: 'select' },
      'f20': { name: '20 - Akreditif numarası', type: 'text' },
      'f31C': { name: '31C - Düzenlenme tarihi', type: 'date' },
      'f40E': { name: '40E - Uygulanacak kurallar', type: 'select' },
      'f31D': { name: '31D - Akreditifin vadesi', type: 'date' },
      'f51a': { name: '51a - Amir/Alıcının bankası', type: 'bank' },
      'f50': { name: '50 - Amir/Alıcı', type: 'address' },
      'f59': { name: '59 - Lehtar/Satıcı', type: 'address' },
      'f32B_ccy': { name: '32B - Para Cinsi', type: 'currency' },
      'f32B_amt': { name: '32B - Tutar', type: 'amount' },
      'f39A': { name: '39A - Tolerans', type: 'percentage' },
      'f39B': { name: '39B - Maksimum Tutar', type: 'amount' },
      'f39C': { name: '39C - İlave Dahili Tutarlar', type: 'text' },
      'f41a_bank': { name: '41a - Banka', type: 'bank' },
      'f41a_role': { name: '41a - Görev', type: 'select' },
      'f42C': { name: '42C - Poliçe vadesi', type: 'text' },
      'f42a_drawee': { name: '42a - Drawee', type: 'bank' },
      'f42M': { name: '42M - Karışık Ödeme Detayları', type: 'text' },
      'f42P': { name: '42P - İştira/Vadeli Akreditif Detayları', type: 'text' },
      'f43P': { name: '43P - Kısmi Yüklemeler', type: 'select' },
      'f43T': { name: '43T - Aktarma', type: 'select' },
      'f44A': { name: '44A - Malı Teslim Alma Yeri', type: 'location' },
      'f44E': { name: '44E - Yükleme Limanı', type: 'location' },
      'f44F': { name: '44F - Boşaltma Limanı', type: 'location' },
      'f44B': { name: '44B - Teslim Etme Yeri', type: 'location' },
      'f44C': { name: '44C - Son Yükleme Tarihi', type: 'date' },
      'f44D': { name: '44D - Yükleme Süresi', type: 'text' },
      'f45A': { name: '45A - Mal ve Hizmetlerin Tanımı', type: 'text' },
      'f46A': { name: '46A - Gerekli Belgeler', type: 'text' },
      'f47A': { name: '47A - İlave Şartlar', type: 'text' },
      'f49G': { name: '49G - Lehtar için Özel Ödeme', type: 'text' },
      'f49H': { name: '49H - Alan Banka için Özel Ödeme', type: 'text' },
      'f71D': { name: '71D - Masraflar', type: 'text' },
      'f48': { name: '48 - İbraz süresi', type: 'number' },
      'f49': { name: '49 - Teyit Talimatı', type: 'select' },
      'f58a': { name: '58a - Teyit Talep Edilen Taraf', type: 'bank' },
      'f57a': { name: '57a - İkinci İhbar Bankası', type: 'bank' }
    };
    
    return fieldMap[fieldId];
  }

  async function checkFieldWithAI(fieldId, value, fieldInfo, apiKey) {
    const prompt = `Akreditif başvuru formu alanı kontrolü yapıyorum. Sen bir akreditif uzmanısın ve resmi dairelerde kullanılacak formlar için kontroller yapıyorsun.

Alan: ${fieldInfo.name} (${fieldId})
Değer: "${value}"
Alan Tipi: ${fieldInfo.type}

Bu alan için aşağıdaki kontrolleri yap:
1. Format doğruluğu (tarih, para birimi, SWIFT kodu vb.)
2. İçerik tutarlılığı ve doğruluğu
3. Eksik bilgi kontrolü
4. Potansiyel hatalar ve riskler
5. Resmi daire standartlarına uygunluk
6. Uluslararası akreditif kurallarına uygunluk

Özellikle dikkat et:
- Tarih formatları doğru mu?
- Para birimi kodları ISO standartlarına uygun mu?
- SWIFT kodları doğru formatta mı?
- Adres bilgileri eksiksiz mi?
- Banka bilgileri doğru mu?
- Tutarlar mantıklı mı?

Her alan için örnek doğru kullanım:
- 27: "1/1" (tek sayfa), "1/2" (bir ana + bir ek)
- 40A: "IRREVOCABLE" (geri alınamaz)
- 20: "LC2025001" (akreditif numarası)
- 31C: "2025-09-01" (tarih formatı)
- 40E: "UCP LATEST VERSION" (kurallar)
- 31D: "2025-12-31" (vade tarihi)
- 51a: "ISBKTRISXXX" (SWIFT kodu)
- 50: "ABC IMPORT LTD., 123 Main St, City, Country" (tam adres)
- 59: "XYZ EXPORT LLC, 456 Business Ave, City, Country" (tam adres)
- 32B: "USD" + "100000.00" (para birimi + tutar)
- 39A: "10/10" (tolerans)
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
- 57a: "SECOND ADVISING BANK DEF" (ikinci ihbar bankası)

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
            content: 'Sen bir akreditif uzmanısın. Alan kontrollerini detaylı ve doğru yaparsın.'
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

  function displayAIResults(results) {
    // Remove previous results
    const existingResults = document.querySelector('.ai-results');
    if (existingResults) {
      existingResults.remove();
    }

    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'ai-results';
    resultsContainer.innerHTML = '<h3>AI Kontrol Sonuçları</h3>';

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


