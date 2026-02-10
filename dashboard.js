// Check if user is logged in
if (!Auth.isLoggedIn()) {
    window.location.href = 'index.html';
}

// Display user name
const user = Auth.getCurrentUser();
document.getElementById('userName').textContent = user.name;

// Current section
let currentSection = 'kontakter';

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    loadSection('kontakter');
});

// Setup navigation
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Load section
            const section = this.dataset.section;
            loadSection(section);
        });
    });
}

// Load section content
function loadSection(section) {
    currentSection = section;
    const mainContent = document.getElementById('mainContent');
    
    // Clear current content
    mainContent.innerHTML = '';
    
    // Load appropriate section
    switch(section) {
        case 'kontakter':
            loadKontakter();
            break;
        case 'abonnementer':
            loadAbonnementer();
            break;
        case 'krypto':
            loadKrypto();
            break;
        case 'forsikringer':
            loadForsikringer();
            break;
        case 'bank':
            loadBank();
            break;
        case 'eiendommer':
            loadEiendommer();
            break;
        case 'kjoretoy':
            loadKjoretoy();
            break;
        case 'digitalt':
            loadDigitalt();
            break;
        case 'dokumenter':
            loadDokumenter();
            break;
        case 'minner':
            loadMinner();
            break;
        case 'livsmanual':
            loadLivsmanual();
            break;
        case 'etterlatte':
            loadEtterlatte();
            break;
        case 'aktivering':
            loadAktivering();
            break;
    }
}

// ===== KONTAKTER =====
function loadKontakter() {
    const items = Storage.getItems('kontakter');
    
    const html = `
        <div class="section">
            <h1 class="section-title">👥 Kontakter</h1>
            <p class="section-description">
                Viktige personer i livet ditt – advokat, lege, regnskapsfører, nære venner og familie.
            </p>

            <div class="success-message" id="successMessage">
                Kontakt lagret!
            </div>

            <div class="form-section">
                <h3>Legg til ny kontakt</h3>
                <form id="kontaktForm" onsubmit="saveKontakt(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Navn</label>
                            <input type="text" name="navn" required>
                        </div>
                        <div class="form-group">
                            <label>Rolle</label>
                            <input type="text" name="rolle" placeholder="f.eks. Advokat, Fastlege">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Telefon</label>
                            <input type="tel" name="telefon">
                        </div>
                        <div class="form-group">
                            <label>E-post</label>
                            <input type="email" name="epost">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Notater</label>
                        <textarea name="notater" placeholder="Eventuelle viktige notater..."></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Lagre kontakt</button>
                </form>
            </div>

            <div class="item-list">
                <h3 style="color: var(--gold); margin-bottom: 1rem;">Mine kontakter (${items.length})</h3>
                ${items.length === 0 ? `
                    <div class="empty-state">
                        <div class="empty-state-icon">👥</div>
                        <h3>Ingen kontakter lagt til ennå</h3>
                        <p>Legg til viktige kontaktpersoner ovenfor</p>
                    </div>
                ` : items.map(item => `
                    <div class="item-card">
                        <div class="item-header">
                            <div class="item-title">${item.navn} ${item.rolle ? `<span style="font-weight: normal; color: var(--warm-gold);">– ${item.rolle}</span>` : ''}</div>
                            <div class="item-actions">
                                <button class="btn-icon" onclick="deleteItem('kontakter', '${item.id}')">🗑️ Slett</button>
                            </div>
                        </div>
                        <div class="item-details">
                            ${item.telefon ? `<p><strong>Telefon:</strong> ${item.telefon}</p>` : ''}
                            ${item.epost ? `<p><strong>E-post:</strong> ${item.epost}</p>` : ''}
                            ${item.notater ? `<p><strong>Notater:</strong> ${item.notater}</p>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.getElementById('mainContent').innerHTML = html;
}

function saveKontakt(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    const kontakt = {
        navn: formData.get('navn'),
        rolle: formData.get('rolle'),
        telefon: formData.get('telefon'),
        epost: formData.get('epost'),
        notater: formData.get('notater')
    };
    
    if (Storage.addItem('kontakter', kontakt)) {
        showSuccess();
        form.reset();
        loadKontakter();
    }
}

// ===== ABONNEMENTER =====
function loadAbonnementer() {
    const items = Storage.getItems('abonnementer');
    
    const html = `
        <div class="section">
            <h1 class="section-title">📱 Abonnementer & tjenester</h1>
            <p class="section-description">
                Alle dine abonnementer, medlemskap og tjenester som må avsluttes eller overføres.
            </p>

            <div class="success-message" id="successMessage">
                Abonnement lagret!
            </div>

            <div class="form-section">
                <h3>Legg til abonnement</h3>
                <form id="abonnementForm" onsubmit="saveAbonnement(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Tjeneste</label>
                            <input type="text" name="tjeneste" placeholder="f.eks. Netflix, Spotify" required>
                        </div>
                        <div class="form-group">
                            <label>Pris per måned</label>
                            <input type="number" name="pris" placeholder="149">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Faktureringsdato</label>
                            <input type="number" name="fakturaDag" placeholder="f.eks. 15" min="1" max="31">
                        </div>
                        <div class="form-group">
                            <label>Kontaktinfo for avslutning</label>
                            <input type="text" name="kontakt" placeholder="Telefon eller e-post">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Notater</label>
                        <textarea name="notater" placeholder="Innloggingsinfo, viktig info..."></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Lagre abonnement</button>
                </form>
            </div>

            <div class="item-list">
                <h3 style="color: var(--gold); margin-bottom: 1rem;">Mine abonnementer (${items.length})</h3>
                ${items.length === 0 ? `
                    <div class="empty-state">
                        <div class="empty-state-icon">📱</div>
                        <h3>Ingen abonnementer registrert</h3>
                        <p>Legg til dine abonnementer og tjenester</p>
                    </div>
                ` : items.map(item => `
                    <div class="item-card">
                        <div class="item-header">
                            <div class="item-title">${item.tjeneste} ${item.pris ? `<span style="font-weight: normal; color: var(--warm-gold);">– ${item.pris},- /mnd</span>` : ''}</div>
                            <div class="item-actions">
                                <button class="btn-icon" onclick="deleteItem('abonnementer', '${item.id}')">🗑️ Slett</button>
                            </div>
                        </div>
                        <div class="item-details">
                            ${item.fakturaDag ? `<p><strong>Faktureres:</strong> ${item.fakturaDag}. hver måned</p>` : ''}
                            ${item.kontakt ? `<p><strong>Kontakt:</strong> ${item.kontakt}</p>` : ''}
                            ${item.notater ? `<p><strong>Notater:</strong> ${item.notater}</p>` : ''}
                        </div>
                    </div>
                `).join('')}
                ${items.length > 0 ? `
                    <div style="margin-top: 2rem; padding: 1.5rem; background: rgba(212, 175, 55, 0.08); border-radius: 12px;">
                        <p style="color: var(--gold); font-size: 1.2rem; font-weight: 500;">
                            Total månedlig kostnad: ${items.reduce((sum, item) => sum + (parseInt(item.pris) || 0), 0)},- kr
                        </p>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    document.getElementById('mainContent').innerHTML = html;
}

function saveAbonnement(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    const abonnement = {
        tjeneste: formData.get('tjeneste'),
        pris: formData.get('pris'),
        fakturaDag: formData.get('fakturaDag'),
        kontakt: formData.get('kontakt'),
        notater: formData.get('notater')
    };
    
    if (Storage.addItem('abonnementer', abonnement)) {
        showSuccess();
        form.reset();
        loadAbonnementer();
    }
}

// ===== KRYPTOVALUTA =====
function loadKrypto() {
    const items = Storage.getItems('krypto');
    
    const html = `
        <div class="section">
            <h1 class="section-title">₿ Kryptovaluta</h1>
            <p class="section-description">
                Dine digitale verdier trygt dokumentert – lommebøker, seed phrases og instruksjoner.
            </p>

            <div class="success-message" id="successMessage">
                Wallet lagret!
            </div>

            <div class="form-section">
                <h3>Legg til wallet</h3>
                <form id="kryptoForm" onsubmit="saveKrypto(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Type</label>
                            <select name="type" required>
                                <option value="">Velg type...</option>
                                <option value="Bitcoin">Bitcoin (BTC)</option>
                                <option value="Ethereum">Ethereum (ETH)</option>
                                <option value="Binance">Binance Coin (BNB)</option>
                                <option value="Annet">Annet</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Plattform</label>
                            <input type="text" name="plattform" placeholder="f.eks. Coinbase, MetaMask">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Wallet-adresse</label>
                        <input type="text" name="adresse" placeholder="Offentlig wallet-adresse">
                    </div>
                    <div class="form-group">
                        <label>Seed phrase / Private key (lagres kryptert)</label>
                        <textarea name="seedPhrase" placeholder="Skriv inn seed phrase eller private key..."></textarea>
                    </div>
                    <div class="form-group">
                        <label>Instruksjoner for tilgang</label>
                        <textarea name="instruksjoner" placeholder="Hvordan få tilgang til midlene..."></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Lagre wallet</button>
                </form>
            </div>

            <div class="item-list">
                <h3 style="color: var(--gold); margin-bottom: 1rem;">Mine wallets (${items.length})</h3>
                ${items.length === 0 ? `
                    <div class="empty-state">
                        <div class="empty-state-icon">₿</div>
                        <h3>Ingen wallets registrert</h3>
                        <p>Legg til dine krypto-wallets og nøkler</p>
                    </div>
                ` : items.map(item => `
                    <div class="item-card">
                        <div class="item-header">
                            <div class="item-title">${item.type} ${item.plattform ? `<span style="font-weight: normal; color: var(--warm-gold);">– ${item.plattform}</span>` : ''}</div>
                            <div class="item-actions">
                                <button class="btn-icon" onclick="deleteItem('krypto', '${item.id}')">🗑️ Slett</button>
                            </div>
                        </div>
                        <div class="item-details">
                            ${item.adresse ? `<p><strong>Adresse:</strong> ${item.adresse}</p>` : ''}
                            ${item.seedPhrase ? `<p><strong>Seed phrase:</strong> <span style="filter: blur(4px);">${item.seedPhrase.substring(0, 30)}...</span> <button class="btn-icon" onclick="alert('I produksjon vil dette være kryptert og kreve ekstra autentisering')">👁️ Vis</button></p>` : ''}
                            ${item.instruksjoner ? `<p><strong>Instruksjoner:</strong> ${item.instruksjoner}</p>` : ''}
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
    const form = e.target;
    const formData = new FormData(form);
    
    const krypto = {
        type: formData.get('type'),
        plattform: formData.get('plattform'),
        adresse: formData.get('adresse'),
        seedPhrase: formData.get('seedPhrase'),
        instruksjoner: formData.get('instruksjoner')
    };
    
    if (Storage.addItem('krypto', krypto)) {
        showSuccess();
        form.reset();
        loadKrypto();
    }
}

// ===== Continue with more sections... =====
// I'll create simplified versions for the remaining sections

function loadForsikringer() {
    const items = Storage.getItems('forsikringer');
    
    const html = `
        <div class="section">
            <h1 class="section-title">🛡️ Forsikringer</h1>
            <p class="section-description">
                Oversikt over alle forsikringer – liv, helse, hus, bil og innbo.
            </p>

            <div class="success-message" id="successMessage">Forsikring lagret!</div>

            <div class="form-section">
                <h3>Legg til forsikring</h3>
                <form id="forsikringForm" onsubmit="saveForsikring(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Selskap</label>
                            <input type="text" name="selskap" required>
                        </div>
                        <div class="form-group">
                            <label>Type forsikring</label>
                            <select name="type">
                                <option value="Liv">Livsforsikring</option>
                                <option value="Helse">Helseforsikring</option>
                                <option value="Hus">Husforsikring</option>
                                <option value="Bil">Bilforsikring</option>
                                <option value="Innbo">Innboforsikring</option>
                                <option value="Reise">Reiseforsikring</option>
                                <option value="Annet">Annet</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Polisenummer</label>
                            <input type="text" name="polisenummer">
                        </div>
                        <div class="form-group">
                            <label>Årlig premie (kr)</label>
                            <input type="number" name="premie">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Forfall / Fornyelsesdato</label>
                        <input type="date" name="forfall">
                    </div>
                    <div class="form-group">
                        <label>Last opp dokumenter (polise, vilkår)</label>
                        <div class="file-upload-area" onclick="document.getElementById('forsikringFiles').click()">
                            <div class="upload-icon">📄</div>
                            <p>Klikk for å laste opp filer</p>
                            <p id="forsikringFileList" style="font-size: 0.9rem; color: var(--light-gold); margin-top: 0.5rem;"></p>
                        </div>
                        <input type="file" id="forsikringFiles" name="filer" multiple accept=".pdf,.jpg,.png,.doc,.docx" style="display: none;" onchange="displayFileNames('forsikringFileList', this.files)">
                    </div>
                    <div class="form-group">
                        <label>Notater</label>
                        <textarea name="notater" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Lagre forsikring</button>
                </form>
            </div>

            <div class="item-list">
                <h3 style="color: var(--gold); margin-bottom: 1rem;">Mine forsikringer (${items.length})</h3>
                ${items.length === 0 ? `
                    <div class="empty-state">
                        <div class="empty-state-icon">🛡️</div>
                        <h3>Ingen forsikringer registrert</h3>
                    </div>
                ` : items.map(item => `
                    <div class="item-card">
                        <div class="item-header">
                            <div class="item-title">${item.selskap} - ${item.type}</div>
                            <div class="item-actions">
                                <button class="btn-icon" onclick="deleteItem('forsikringer', '${item.id}')">🗑️ Slett</button>
                            </div>
                        </div>
                        <div class="item-details">
                            ${item.polisenummer ? `<p><strong>Polisenummer:</strong> ${item.polisenummer}</p>` : ''}
                            ${item.premie ? `<p><strong>Årlig premie:</strong> ${item.premie} kr</p>` : ''}
                            ${item.forfall ? `<p><strong>Forfall:</strong> ${item.forfall}</p>` : ''}
                            ${item.filer && item.filer.length > 0 ? `
                                <p><strong>Dokumenter:</strong></p>
                                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
                                    ${item.filer.map(fil => `
                                        <span style="background: rgba(212, 175, 55, 0.2); padding: 0.4rem 0.8rem; border-radius: 20px; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.3rem;">
                                            📎 ${fil}
                                        </span>
                                    `).join('')}
                                </div>
                            ` : ''}
                            ${item.notater ? `<p><strong>Notater:</strong> ${item.notater}</p>` : ''}
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
    const form = e.target;
    const formData = new FormData(form);
    const fileInput = document.getElementById('forsikringFiles');
    
    const forsikring = {
        selskap: formData.get('selskap'),
        type: formData.get('type'),
        polisenummer: formData.get('polisenummer'),
        premie: formData.get('premie'),
        forfall: formData.get('forfall'),
        notater: formData.get('notater'),
        filer: Array.from(fileInput.files).map(f => f.name)
    };
    
    if (Storage.addItem('forsikringer', forsikring)) {
        showSuccess();
        form.reset();
        loadForsikringer();
    }
}

function loadBank() {
    const items = Storage.getItems('bank');
    
    const html = `
        <div class="section">
            <h1 class="section-title">🏦 Bankforhold & økonomi</h1>
            <p class="section-description">
                Kontoer, lån, investeringer og verdipapirer samlet og oversiktlig.
            </p>

            <div class="success-message" id="successMessage">Bank-info lagret!</div>

            <div class="form-section">
                <h3>Legg til bankkonto/investering</h3>
                <form id="bankForm" onsubmit="saveBank(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Bank/institusjon</label>
                            <input type="text" name="bank" required>
                        </div>
                        <div class="form-group">
                            <label>Type</label>
                            <select name="type">
                                <option value="Brukskonto">Brukskonto</option>
                                <option value="Sparekonto">Sparekonto</option>
                                <option value="BSU">BSU</option>
                                <option value="Aksjesparekonto">Aksjesparekonto</option>
                                <option value="Aksjefond">Aksjefond</option>
                                <option value="Lån">Lån</option>
                                <option value="Kredittkort">Kredittkort</option>
                                <option value="Annet">Annet</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Kontonummer</label>
                            <input type="text" name="kontonummer" placeholder="xxxx.xx.xxxxx">
                        </div>
                        <div class="form-group">
                            <label>Saldo / Verdi (kr)</label>
                            <input type="number" name="saldo">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Last opp dokumenter (kontoutskrifter, avtaler)</label>
                        <div class="file-upload-area" onclick="document.getElementById('bankFiles').click()">
                            <div class="upload-icon">📄</div>
                            <p>Klikk for å laste opp filer</p>
                            <p id="bankFileList" style="font-size: 0.9rem; color: var(--light-gold); margin-top: 0.5rem;"></p>
                        </div>
                        <input type="file" id="bankFiles" name="filer" multiple accept=".pdf,.jpg,.png,.doc,.docx,.xls,.xlsx" style="display: none;" onchange="displayFileNames('bankFileList', this.files)">
                    </div>
                    <div class="form-group">
                        <label>Notater</label>
                        <textarea name="notater" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Lagre</button>
                </form>
            </div>

            <div class="item-list">
                <h3 style="color: var(--gold); margin-bottom: 1rem;">Mine kontoer (${items.length})</h3>
                ${items.length === 0 ? `
                    <div class="empty-state">
                        <div class="empty-state-icon">🏦</div>
                        <h3>Ingen kontoer registrert</h3>
                    </div>
                ` : items.map(item => `
                    <div class="item-card">
                        <div class="item-header">
                            <div class="item-title">${item.bank} - ${item.type}</div>
                            <div class="item-actions">
                                <button class="btn-icon" onclick="deleteItem('bank', '${item.id}')">🗑️ Slett</button>
                            </div>
                        </div>
                        <div class="item-details">
                            ${item.kontonummer ? `<p><strong>Kontonummer:</strong> ${item.kontonummer}</p>` : ''}
                            ${item.saldo ? `<p><strong>Saldo/Verdi:</strong> ${parseInt(item.saldo).toLocaleString('no-NO')} kr</p>` : ''}
                            ${item.filer && item.filer.length > 0 ? `
                                <p><strong>Dokumenter:</strong></p>
                                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
                                    ${item.filer.map(fil => `
                                        <span style="background: rgba(212, 175, 55, 0.2); padding: 0.4rem 0.8rem; border-radius: 20px; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.3rem;">
                                            📎 ${fil}
                                        </span>
                                    `).join('')}
                                </div>
                            ` : ''}
                            ${item.notater ? `<p><strong>Notater:</strong> ${item.notater}</p>` : ''}
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
    const form = e.target;
    const formData = new FormData(form);
    const fileInput = document.getElementById('bankFiles');
    
    const bank = {
        bank: formData.get('bank'),
        type: formData.get('type'),
        kontonummer: formData.get('kontonummer'),
        saldo: formData.get('saldo'),
        notater: formData.get('notater'),
        filer: Array.from(fileInput.files).map(f => f.name)
    };
    
    if (Storage.addItem('bank', bank)) {
        showSuccess();
        form.reset();
        loadBank();
    }
}

function loadEiendommer() {
    const items = Storage.getItems('eiendommer');
    
    const html = `
        <div class="section">
            <h1 class="section-title">🏠 Eiendommer</h1>
            <p class="section-description">
                Alt om dine eiendommer – hus, hytte, tomt eller utleie.
            </p>

            <div class="success-message" id="successMessage">Eiendom lagret!</div>

            <div class="form-section">
                <h3>Legg til eiendom</h3>
                <form id="eiendomForm" onsubmit="saveEiendom(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Adresse</label>
                            <input type="text" name="adresse" required>
                        </div>
                        <div class="form-group">
                            <label>Type</label>
                            <select name="type">
                                <option value="Enebolig">Enebolig</option>
                                <option value="Leilighet">Leilighet</option>
                                <option value="Hytte">Hytte</option>
                                <option value="Tomt">Tomt</option>
                                <option value="Utleie">Utleie</option>
                                <option value="Annet">Annet</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Gårdsnummer</label>
                            <input type="text" name="gardsnummer">
                        </div>
                        <div class="form-group">
                            <label>Bruksnummer</label>
                            <input type="text" name="bruksnummer">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Last opp dokumenter (skjøte, takst, tegninger)</label>
                        <div class="file-upload-area" onclick="document.getElementById('eiendomFiles').click()">
                            <div class="upload-icon">📄</div>
                            <p>Klikk for å laste opp filer</p>
                            <p id="eiendomFileList" style="font-size: 0.9rem; color: var(--light-gold); margin-top: 0.5rem;"></p>
                        </div>
                        <input type="file" id="eiendomFiles" name="filer" multiple accept=".pdf,.jpg,.png,.doc,.docx" style="display: none;" onchange="displayFileNames('eiendomFileList', this.files)">
                    </div>
                    <div class="form-group">
                        <label>Notater</label>
                        <textarea name="notater" rows="3" placeholder="Vedlikehold, systemer, viktig info..."></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Lagre eiendom</button>
                </form>
            </div>

            <div class="item-list">
                <h3 style="color: var(--gold); margin-bottom: 1rem;">Mine eiendommer (${items.length})</h3>
                ${items.length === 0 ? `
                    <div class="empty-state">
                        <div class="empty-state-icon">🏠</div>
                        <h3>Ingen eiendommer registrert</h3>
                    </div>
                ` : items.map(item => `
                    <div class="item-card">
                        <div class="item-header">
                            <div class="item-title">${item.adresse} (${item.type})</div>
                            <div class="item-actions">
                                <button class="btn-icon" onclick="deleteItem('eiendommer', '${item.id}')">🗑️ Slett</button>
                            </div>
                        </div>
                        <div class="item-details">
                            ${item.gardsnummer ? `<p><strong>Gårdsnr:</strong> ${item.gardsnummer}${item.bruksnummer ? `, <strong>Bruksnr:</strong> ${item.bruksnummer}` : ''}</p>` : ''}
                            ${item.filer && item.filer.length > 0 ? `
                                <p><strong>Dokumenter:</strong></p>
                                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
                                    ${item.filer.map(fil => `
                                        <span style="background: rgba(212, 175, 55, 0.2); padding: 0.4rem 0.8rem; border-radius: 20px; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.3rem;">
                                            📎 ${fil}
                                        </span>
                                    `).join('')}
                                </div>
                            ` : ''}
                            ${item.notater ? `<p><strong>Notater:</strong> ${item.notater}</p>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.getElementById('mainContent').innerHTML = html;
}

function saveEiendom(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const fileInput = document.getElementById('eiendomFiles');
    
    const eiendom = {
        adresse: formData.get('adresse'),
        type: formData.get('type'),
        gardsnummer: formData.get('gardsnummer'),
        bruksnummer: formData.get('bruksnummer'),
        notater: formData.get('notater'),
        filer: Array.from(fileInput.files).map(f => f.name)
    };
    
    if (Storage.addItem('eiendommer', eiendom)) {
        showSuccess();
        form.reset();
        loadEiendommer();
    }
}

function loadKjoretoy() {
    loadGenericSection('kjoretoy', '🚗 Kjøretøy',
        'Biler, båter, MC og andre kjøretøy med all dokumentasjon.',
        ['type', 'merke', 'regnummer', 'arsmodell', 'notater']);
}

function loadDigitalt() {
    const items = Storage.getItems('digitalt');
    
    const html = `
        <div class="section">
            <h1 class="section-title">💻 Mitt digitale liv</h1>
            <p class="section-description">
                Passord, kontoer og din digitale tilstedeværelse.
            </p>

            <div class="success-message" id="successMessage">Digital konto lagret!</div>

            <div class="form-section">
                <h3>Legg til digital konto</h3>
                <form id="digitaltForm" onsubmit="saveDigitalt(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Tjeneste</label>
                            <input type="text" name="tjeneste" placeholder="f.eks. Gmail, Facebook" required>
                        </div>
                        <div class="form-group">
                            <label>Brukernavn</label>
                            <input type="text" name="brukernavn">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>E-post tilknyttet konto</label>
                        <input type="email" name="epost">
                    </div>
                    <div class="form-group">
                        <label>Last opp skjermbilder eller instruksjoner</label>
                        <div class="file-upload-area" onclick="document.getElementById('digitaltFiles').click()">
                            <div class="upload-icon">📄</div>
                            <p>Klikk for å laste opp filer</p>
                            <p id="digitaltFileList" style="font-size: 0.9rem; color: var(--light-gold); margin-top: 0.5rem;"></p>
                        </div>
                        <input type="file" id="digitaltFiles" name="filer" multiple accept=".pdf,.jpg,.png,.doc,.docx" style="display: none;" onchange="displayFileNames('digitaltFileList', this.files)">
                    </div>
                    <div class="form-group">
                        <label>Notater (passord, 2FA, instruksjoner)</label>
                        <textarea name="notater" rows="4" placeholder="Passordinformasjon, hvordan få tilgang, hva som skal gjøres..."></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Lagre konto</button>
                </form>
            </div>

            <div class="item-list">
                <h3 style="color: var(--gold); margin-bottom: 1rem;">Mine digitale kontoer (${items.length})</h3>
                ${items.length === 0 ? `
                    <div class="empty-state">
                        <div class="empty-state-icon">💻</div>
                        <h3>Ingen digitale kontoer registrert</h3>
                    </div>
                ` : items.map(item => `
                    <div class="item-card">
                        <div class="item-header">
                            <div class="item-title">${item.tjeneste}</div>
                            <div class="item-actions">
                                <button class="btn-icon" onclick="deleteItem('digitalt', '${item.id}')">🗑️ Slett</button>
                            </div>
                        </div>
                        <div class="item-details">
                            ${item.brukernavn ? `<p><strong>Brukernavn:</strong> ${item.brukernavn}</p>` : ''}
                            ${item.epost ? `<p><strong>E-post:</strong> ${item.epost}</p>` : ''}
                            ${item.filer && item.filer.length > 0 ? `
                                <p><strong>Vedlegg:</strong></p>
                                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
                                    ${item.filer.map(fil => `
                                        <span style="background: rgba(212, 175, 55, 0.2); padding: 0.4rem 0.8rem; border-radius: 20px; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.3rem;">
                                            📎 ${fil}
                                        </span>
                                    `).join('')}
                                </div>
                            ` : ''}
                            ${item.notater ? `<p><strong>Notater:</strong> <span style="filter: blur(4px);">${item.notater.substring(0, 30)}...</span> <button class="btn-icon" onclick="alert('I produksjon vil dette være kryptert')">👁️ Vis</button></p>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.getElementById('mainContent').innerHTML = html;
}

function saveDigitalt(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const fileInput = document.getElementById('digitaltFiles');
    
    const digitalt = {
        tjeneste: formData.get('tjeneste'),
        brukernavn: formData.get('brukernavn'),
        epost: formData.get('epost'),
        notater: formData.get('notater'),
        filer: Array.from(fileInput.files).map(f => f.name)
    };
    
    if (Storage.addItem('digitalt', digitalt)) {
        showSuccess();
        form.reset();
        loadDigitalt();
    }
}

function loadDokumenter() {
    const items = Storage.getItems('dokumenter');
    
    const html = `
        <div class="section">
            <h1 class="section-title">📄 Dokumentarkiv</h1>
            <p class="section-description">
                Alle viktige dokumenter samlet – testament, fullmakter, skjøter.
            </p>

            <div class="success-message" id="successMessage">Dokument lagret!</div>

            <div class="form-section">
                <h3>Last opp dokument</h3>
                <form id="dokumentForm" onsubmit="saveDokument(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Type dokument</label>
                            <select name="type" required>
                                <option value="">Velg type...</option>
                                <option value="Testament">Testament</option>
                                <option value="Fullmakt">Fullmakt</option>
                                <option value="Fremtidsfullmakt">Fremtidsfullmakt</option>
                                <option value="Fødselsattest">Fødselsattest</option>
                                <option value="Vigselsattest">Vigselsattest</option>
                                <option value="Skjøte">Skjøte</option>
                                <option value="Aksjer/verdipapirer">Aksjer/verdipapirer</option>
                                <option value="Pass">Pass</option>
                                <option value="Førerkort">Førerkort</option>
                                <option value="Annet">Annet</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Beskrivelse</label>
                            <input type="text" name="beskrivelse" placeholder="Kort beskrivelse">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Plassering (fysisk)</label>
                        <input type="text" name="plassering" placeholder="f.eks. Safe, skuff i kontoret">
                    </div>
                    <div class="form-group">
                        <label>Last opp dokumenter</label>
                        <div class="file-upload-area" onclick="document.getElementById('dokumentFiles').click()">
                            <div class="upload-icon">📄</div>
                            <p>Klikk for å laste opp filer</p>
                            <p id="dokumentFileList" style="font-size: 0.9rem; color: var(--light-gold); margin-top: 0.5rem;"></p>
                        </div>
                        <input type="file" id="dokumentFiles" name="filer" multiple accept=".pdf,.jpg,.png,.doc,.docx" style="display: none;" onchange="displayFileNames('dokumentFileList', this.files)">
                    </div>
                    <div class="form-group">
                        <label>Notater</label>
                        <textarea name="notater" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Lagre dokument</button>
                </form>
            </div>

            <div class="item-list">
                <h3 style="color: var(--gold); margin-bottom: 1rem;">Mine dokumenter (${items.length})</h3>
                ${items.length === 0 ? `
                    <div class="empty-state">
                        <div class="empty-state-icon">📄</div>
                        <h3>Ingen dokumenter lastet opp</h3>
                    </div>
                ` : items.map(item => `
                    <div class="item-card">
                        <div class="item-header">
                            <div class="item-title">${item.type}${item.beskrivelse ? ` - ${item.beskrivelse}` : ''}</div>
                            <div class="item-actions">
                                <button class="btn-icon" onclick="deleteItem('dokumenter', '${item.id}')">🗑️ Slett</button>
                            </div>
                        </div>
                        <div class="item-details">
                            ${item.plassering ? `<p><strong>Fysisk plassering:</strong> ${item.plassering}</p>` : ''}
                            ${item.filer && item.filer.length > 0 ? `
                                <p><strong>Filer:</strong></p>
                                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
                                    ${item.filer.map(fil => `
                                        <span style="background: rgba(212, 175, 55, 0.2); padding: 0.4rem 0.8rem; border-radius: 20px; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.3rem;">
                                            📎 ${fil}
                                        </span>
                                    `).join('')}
                                </div>
                            ` : ''}
                            ${item.notater ? `<p><strong>Notater:</strong> ${item.notater}</p>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.getElementById('mainContent').innerHTML = html;
}

function saveDokument(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const fileInput = document.getElementById('dokumentFiles');
    
    const dokument = {
        type: formData.get('type'),
        beskrivelse: formData.get('beskrivelse'),
        plassering: formData.get('plassering'),
        notater: formData.get('notater'),
        filer: Array.from(fileInput.files).map(f => f.name)
    };
    
    if (Storage.addItem('dokumenter', dokument)) {
        showSuccess();
        form.reset();
        loadDokumenter();
    }
}

// Generic section loader for simpler categories
function loadGenericSection(category, title, description, fields) {
    const items = Storage.getItems(category);
    const icon = title.split(' ')[0];
    
    const html = `
        <div class="section">
            <h1 class="section-title">${title}</h1>
            <p class="section-description">${description}</p>

            <div class="success-message" id="successMessage">Lagret!</div>

            <div class="form-section">
                <h3>Legg til ny</h3>
                <form id="genericForm" onsubmit="saveGeneric(event, '${category}')">
                    ${fields.map(field => `
                        <div class="form-group">
                            <label>${field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            <input type="text" name="${field}" ${field === fields[0] ? 'required' : ''}>
                        </div>
                    `).join('')}
                    <button type="submit" class="btn-primary">Lagre</button>
                </form>
            </div>

            <div class="item-list">
                <h3 style="color: var(--gold); margin-bottom: 1rem;">Mine oppføringer (${items.length})</h3>
                ${items.length === 0 ? `
                    <div class="empty-state">
                        <div class="empty-state-icon">${icon}</div>
                        <h3>Ingen oppføringer ennå</h3>
                    </div>
                ` : items.map(item => `
                    <div class="item-card">
                        <div class="item-header">
                            <div class="item-title">${item[fields[0]]}</div>
                            <div class="item-actions">
                                <button class="btn-icon" onclick="deleteItem('${category}', '${item.id}')">🗑️ Slett</button>
                            </div>
                        </div>
                        <div class="item-details">
                            ${fields.slice(1).map(field => 
                                item[field] ? `<p><strong>${field.charAt(0).toUpperCase() + field.slice(1)}:</strong> ${item[field]}</p>` : ''
                            ).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.getElementById('mainContent').innerHTML = html;
}

function saveGeneric(e, category) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    const item = {};
    for (let [key, value] of formData.entries()) {
        item[key] = value;
    }
    
    if (Storage.addItem(category, item)) {
        showSuccess();
        form.reset();
        loadSection(category);
    }
}

// Continue in next file...
