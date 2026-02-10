// KRYPTOVALUTA
function showKrypto() {
    const items = Storage.getItems('krypto');
    
    const html = `
        <div class="page">
            <h1 class="page-title">₿ Kryptovaluta</h1>
            <p class="page-description">Wallets, seed phrases og digitale verdier</p>
            
            <div class="success-msg" id="successMsg">Lagret!</div>
            
            <div class="form-box">
                <h3>Legg til wallet</h3>
                <form onsubmit="saveKrypto(event)">
                    <div class="form-row">
                        <div class="form-field">
                            <label>Type</label>
                            <select name="type" required>
                                <option value="">Velg...</option>
                                <option value="Bitcoin">Bitcoin (BTC)</option>
                                <option value="Ethereum">Ethereum (ETH)</option>
                                <option value="Annet">Annet</option>
                            </select>
                        </div>
                        <div class="form-field">
                            <label>Plattform</label>
                            <input type="text" name="plattform" placeholder="Coinbase, MetaMask">
                        </div>
                    </div>
                    <div class="form-field">
                        <label>Wallet-adresse</label>
                        <input type="text" name="adresse">
                    </div>
                    <div class="form-field">
                        <label>Seed phrase (kryptert lagring)</label>
                        <textarea name="seedPhrase" placeholder="12 eller 24 ord..."></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Lagre wallet</button>
                </form>
            </div>
            
            <div class="items-list">
                <h3 style="color: var(--gold); margin-bottom: 1rem;">Mine wallets (${items.length})</h3>
                ${items.length === 0 ? `
                    <div class="empty">
                        <div class="icon">₿</div>
                        <h3>Ingen wallets</h3>
                    </div>
                ` : items.map(item => `
                    <div class="item">
                        <div class="item-header">
                            <div class="item-title">${item.type}${item.plattform ? ` – ${item.plattform}` : ''}</div>
                            <div class="item-actions">
                                <button class="btn-icon" onclick="deleteItem('krypto', '${item.id}')">🗑️</button>
                            </div>
                        </div>
                        <div class="item-body">
                            ${item.adresse ? `<p><strong>Adresse:</strong> ${item.adresse}</p>` : ''}
                            ${item.seedPhrase ? `<p><strong>Seed:</strong> <span style="filter: blur(4px);">${item.seedPhrase.substring(0, 30)}...</span></p>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.getElementById('mainContent').innerHTML = html;
}

function saveKrypto(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    if (Storage.addItem('krypto', {
        type: formData.get('type'),
        plattform: formData.get('plattform'),
        adresse: formData.get('adresse'),
        seedPhrase: formData.get('seedPhrase')
    })) {
        showSuccess();
        e.target.reset();
        updateCounts();
        loadCategory('krypto');
    }
}

// FORSIKRINGER (with file upload)
function showForsikringer() {
    const items = Storage.getItems('forsikringer');
    
    const html = `
        <div class="page">
            <h1 class="page-title">🛡️ Forsikringer</h1>
            <p class="page-description">Poliser, dokumentasjon og premier</p>
            
            <div class="success-msg" id="successMsg">Lagret!</div>
            
            <div class="form-box">
                <h3>Legg til forsikring</h3>
                <form onsubmit="saveForsikring(event)">
                    <div class="form-row">
                        <div class="form-field">
                            <label>Selskap</label>
                            <input type="text" name="selskap" required>
                        </div>
                        <div class="form-field">
                            <label>Type</label>
                            <select name="type">
                                <option value="Liv">Liv</option>
                                <option value="Helse">Helse</option>
                                <option value="Hus">Hus</option>
                                <option value="Bil">Bil</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-field">
                            <label>Polisenummer</label>
                            <input type="text" name="polisenummer">
                        </div>
                        <div class="form-field">
                            <label>Årlig premie (kr)</label>
                            <input type="number" name="premie">
                        </div>
                    </div>
                    <div class="form-field">
                        <label>Last opp dokumenter</label>
                        <div class="file-upload" onclick="document.getElementById('forsikringFiles').click()">
                            <div class="icon">📄</div>
                            <p>Klikk for å laste opp filer</p>
                            <div class="file-names" id="forsikringFiles-list"></div>
                        </div>
                        <input type="file" id="forsikringFiles" multiple accept=".pdf,.jpg,.png" style="display:none" onchange="displayFiles('forsikringFiles')">
                    </div>
                    <button type="submit" class="btn-primary">Lagre</button>
                </form>
            </div>
            
            <div class="items-list">
                <h3 style="color: var(--gold); margin-bottom: 1rem;">Mine forsikringer (${items.length})</h3>
                ${items.length === 0 ? `
                    <div class="empty">
                        <div class="icon">🛡️</div>
                        <h3>Ingen forsikringer</h3>
                    </div>
                ` : items.map(item => `
                    <div class="item">
                        <div class="item-header">
                            <div class="item-title">${item.selskap} – ${item.type}</div>
                            <div class="item-actions">
                                <button class="btn-icon" onclick="deleteItem('forsikringer', '${item.id}')">🗑️</button>
                            </div>
                        </div>
                        <div class="item-body">
                            ${item.polisenummer ? `<p><strong>Polisenr:</strong> ${item.polisenummer}</p>` : ''}
                            ${item.premie ? `<p><strong>Premie:</strong> ${item.premie} kr/år</p>` : ''}
                            ${item.filer && item.filer.length > 0 ? `<p><strong>Filer:</strong> ${item.filer.join(', ')}</p>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.getElementById('mainContent').innerHTML = html;
}

function saveForsikring(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const files = handleFileUpload('forsikringFiles', 'forsikringFiles-list');
    
    if (Storage.addItem('forsikringer', {
        selskap: formData.get('selskap'),
        type: formData.get('type'),
        polisenummer: formData.get('polisenummer'),
        premie: formData.get('premie'),
        filer: files
    })) {
        showSuccess();
        e.target.reset();
        updateCounts();
        loadCategory('forsikringer');
    }
}

// BANK (with file upload)
function showBank() {
    const items = Storage.getItems('bank');
    
    const html = `
        <div class="page">
            <h1 class="page-title">🏦 Bank & økonomi</h1>
            <p class="page-description">Kontoer, investeringer og lån</p>
            
            <div class="success-msg" id="successMsg">Lagret!</div>
            
            <div class="form-box">
                <h3>Legg til</h3>
                <form onsubmit="saveBank(event)">
                    <div class="form-row">
                        <div class="form-field">
                            <label>Bank</label>
                            <input type="text" name="bank" required>
                        </div>
                        <div class="form-field">
                            <label>Type</label>
                            <select name="type">
                                <option value="Brukskonto">Brukskonto</option>
                                <option value="Sparekonto">Sparekonto</option>
                                <option value="Aksjefond">Aksjefond</option>
                                <option value="Lån">Lån</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-field">
                            <label>Kontonummer</label>
                            <input type="text" name="kontonummer" placeholder="xxxx.xx.xxxxx">
                        </div>
                        <div class="form-field">
                            <label>Saldo/Verdi (kr)</label>
                            <input type="number" name="saldo">
                        </div>
                    </div>
                    <div class="form-field">
                        <label>Last opp dokumenter</label>
                        <div class="file-upload" onclick="document.getElementById('bankFiles').click()">
                            <div class="icon">📄</div>
                            <p>Klikk for å laste opp filer</p>
                            <div class="file-names" id="bankFiles-list"></div>
                        </div>
                        <input type="file" id="bankFiles" multiple accept=".pdf,.jpg,.png,.xlsx" style="display:none" onchange="displayFiles('bankFiles')">
                    </div>
                    <button type="submit" class="btn-primary">Lagre</button>
                </form>
            </div>
            
            <div class="items-list">
                <h3 style="color: var(--gold); margin-bottom: 1rem;">Mine kontoer (${items.length})</h3>
                ${items.length === 0 ? `
                    <div class="empty">
                        <div class="icon">🏦</div>
                        <h3>Ingen kontoer</h3>
                    </div>
                ` : items.map(item => `
                    <div class="item">
                        <div class="item-header">
                            <div class="item-title">${item.bank} – ${item.type}</div>
                            <div class="item-actions">
                                <button class="btn-icon" onclick="deleteItem('bank', '${item.id}')">🗑️</button>
                            </div>
                        </div>
                        <div class="item-body">
                            ${item.kontonummer ? `<p><strong>Konto:</strong> ${item.kontonummer}</p>` : ''}
                            ${item.saldo ? `<p><strong>Saldo:</strong> ${parseInt(item.saldo).toLocaleString('no-NO')} kr</p>` : ''}
                            ${item.filer && item.filer.length > 0 ? `<p><strong>Filer:</strong> ${item.filer.join(', ')}</p>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.getElementById('mainContent').innerHTML = html;
}

function saveBank(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const files = handleFileUpload('bankFiles', 'bankFiles-list');
    
    if (Storage.addItem('bank', {
        bank: formData.get('bank'),
        type: formData.get('type'),
        kontonummer: formData.get('kontonummer'),
        saldo: formData.get('saldo'),
        filer: files
    })) {
        showSuccess();
        e.target.reset();
        updateCounts();
        loadCategory('bank');
    }
}

// EIENDOMMER, KJØRETØY, DIGITALT, DOKUMENTER, MINNER
// Simplified implementations - følger samme mønster

function showEiendommer() {
    showSimpleCategory('eiendommer', '🏠 Eiendommer', 'Hus, hytte, tomt', 
        ['adresse', 'type'], true);
}

function showKjoretoy() {
    showSimpleCategory('kjoretoy', '🚗 Kjøretøy', 'Bil, båt, MC', 
        ['type', 'merke', 'regnummer'], false);
}

function showDigitalt() {
    showSimpleCategory('digitalt', '💻 Digitalt liv', 'Kontoer og passord', 
        ['tjeneste', 'brukernavn', 'epost'], true);
}

function showDokumenter() {
    showSimpleCategory('dokumenter', '📄 Dokumenter', 'Testament, fullmakter', 
        ['type', 'beskrivelse'], true);
}

function showMinner() {
    showSimpleCategory('minner', '💝 Minner & Saga', 'Bilder, videoer, budskap', 
        ['tittel', 'beskrivelse', 'mottaker'], true);
}

// Generic category handler
function showSimpleCategory(cat, title, desc, fields, hasFiles) {
    const items = Storage.getItems(cat);
    const icon = title.split(' ')[0];
    
    const html = `
        <div class="page">
            <h1 class="page-title">${title}</h1>
            <p class="page-description">${desc}</p>
            
            <div class="success-msg" id="successMsg">Lagret!</div>
            
            <div class="form-box">
                <h3>Legg til</h3>
                <form onsubmit="saveSimple(event, '${cat}')">
                    ${fields.map(field => `
                        <div class="form-field">
                            <label>${field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            <input type="text" name="${field}" ${field === fields[0] ? 'required' : ''}>
                        </div>
                    `).join('')}
                    ${hasFiles ? `
                        <div class="form-field">
                            <label>Last opp filer</label>
                            <div class="file-upload" onclick="document.getElementById('${cat}Files').click()">
                                <div class="icon">📁</div>
                                <p>Klikk for å laste opp</p>
                                <div class="file-names" id="${cat}Files-list"></div>
                            </div>
                            <input type="file" id="${cat}Files" multiple style="display:none" onchange="displayFiles('${cat}Files')">
                        </div>
                    ` : ''}
                    <button type="submit" class="btn-primary">Lagre</button>
                </form>
            </div>
            
            <div class="items-list">
                <h3 style="color: var(--gold); margin-bottom: 1rem;">Mine oppføringer (${items.length})</h3>
                ${items.length === 0 ? `
                    <div class="empty">
                        <div class="icon">${icon}</div>
                        <h3>Ingen oppføringer</h3>
                    </div>
                ` : items.map(item => `
                    <div class="item">
                        <div class="item-header">
                            <div class="item-title">${item[fields[0]]}</div>
                            <div class="item-actions">
                                <button class="btn-icon" onclick="deleteItem('${cat}', '${item.id}')">🗑️</button>
                            </div>
                        </div>
                        <div class="item-body">
                            ${fields.slice(1).map(f => item[f] ? `<p><strong>${f}:</strong> ${item[f]}</p>` : '').join('')}
                            ${item.filer && item.filer.length > 0 ? `<p><strong>Filer:</strong> ${item.filer.join(', ')}</p>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.getElementById('mainContent').innerHTML = html;
}

function saveSimple(e, cat) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    const fileInput = document.getElementById(`${cat}Files`);
    if (fileInput && fileInput.files.length > 0) {
        data.filer = Array.from(fileInput.files).map(f => f.name);
    }
    
    if (Storage.addItem(cat, data)) {
        showSuccess();
        e.target.reset();
        updateCounts();
        loadCategory(cat);
    }
}

// LIVSMANUAL
function showLivsmanual() {
    const data = Storage.getSection('livsmanual') || {};
    
    const html = `
        <div class="page">
            <h1 class="page-title">📖 Livsmanualen</h1>
            <p class="page-description">Praktisk info om hverdagen</p>
            
            <div class="success-msg" id="successMsg">Lagret!</div>
            
            <form onsubmit="saveLivsmanual(event)">
                <div class="form-box">
                    <h3>Hjem</h3>
                    <div class="form-field">
                        <label>Nøkler</label>
                        <textarea name="nokler">${data.nokler || ''}</textarea>
                    </div>
                    <div class="form-field">
                        <label>Varme & fyring</label>
                        <textarea name="varme">${data.varme || ''}</textarea>
                    </div>
                    <div class="form-field">
                        <label>WiFi & passord</label>
                        <textarea name="wifi">${data.wifi || ''}</textarea>
                    </div>
                </div>
                
                <div class="form-box">
                    <h3>Dyr & planter</h3>
                    <div class="form-field">
                        <label>Dyrefôring</label>
                        <textarea name="dyrefor">${data.dyrefor || ''}</textarea>
                    </div>
                    <div class="form-field">
                        <label>Plantestell</label>
                        <textarea name="planter">${data.planter || ''}</textarea>
                    </div>
                </div>
                
                <div class="form-box">
                    <h3>Annet viktig</h3>
                    <div class="form-field">
                        <label>Spesielle instruksjoner</label>
                        <textarea name="annet">${data.annet || ''}</textarea>
                    </div>
                </div>
                
                <button type="submit" class="btn-primary">Lagre livsmanual</button>
            </form>
        </div>
    `;
    
    document.getElementById('mainContent').innerHTML = html;
}

function saveLivsmanual(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    if (Storage.updateSection('livsmanual', data)) {
        showSuccess();
    }
}

// ETTERLATTE
function showEtterlatte() {
    const items = Storage.getItems('etterlatte');
    
    const html = `
        <div class="page">
            <h1 class="page-title">🔐 Etterlatteprofiler</h1>
            <p class="page-description">Hvem får tilgang til hva</p>
            
            <div class="success-msg" id="successMsg">Lagret!</div>
            
            <div class="form-box">
                <h3>Ny profil</h3>
                <form onsubmit="saveEtterlatte(event)">
                    <div class="form-row">
                        <div class="form-field">
                            <label>Navn</label>
                            <input type="text" name="navn" required>
                        </div>
                        <div class="form-field">
                            <label>Relasjon</label>
                            <select name="relasjon">
                                <option value="Ektefelle">Ektefelle</option>
                                <option value="Barn">Barn</option>
                                <option value="Venn">Venn</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-field">
                        <label>E-post</label>
                        <input type="email" name="epost">
                    </div>
                    <button type="submit" class="btn-primary">Lagre profil</button>
                </form>
            </div>
            
            <div class="items-list">
                <h3 style="color: var(--gold); margin-bottom: 1rem;">Profiler (${items.length})</h3>
                ${items.length === 0 ? `
                    <div class="empty">
                        <div class="icon">🔐</div>
                        <h3>Ingen profiler</h3>
                    </div>
                ` : items.map(item => `
                    <div class="item">
                        <div class="item-header">
                            <div class="item-title">${item.navn} – ${item.relasjon}</div>
                            <div class="item-actions">
                                <button class="btn-icon" onclick="deleteItem('etterlatte', '${item.id}')">🗑️</button>
                            </div>
                        </div>
                        <div class="item-body">
                            ${item.epost ? `<p><strong>E-post:</strong> ${item.epost}</p>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.getElementById('mainContent').innerHTML = html;
}

function saveEtterlatte(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    if (Storage.addItem('etterlatte', {
        navn: formData.get('navn'),
        relasjon: formData.get('relasjon'),
        epost: formData.get('epost')
    })) {
        showSuccess();
        e.target.reset();
        updateCounts();
        loadCategory('etterlatte');
    }
}

// AKTIVERING & BRUKER - simplified
function showAktivering() {
    document.getElementById('mainContent').innerHTML = `
        <div class="page">
            <h1 class="page-title">⏳ Aktivering</h1>
            <p class="page-description">Konfigurasjon kommer...</p>
        </div>
    `;
}

function showBruker() {
    document.getElementById('mainContent').innerHTML = `
        <div class="page">
            <h1 class="page-title">👤 Min bruker</h1>
            <p class="page-description">Profilinnstillinger kommer...</p>
        </div>
    `;
}
