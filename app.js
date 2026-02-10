// Check login
if (!Auth.isLoggedIn()) {
    window.location.href = 'index.html';
}

// Display user
const user = Auth.getCurrentUser();
document.getElementById('userName').textContent = user.name;

// Current category
let currentCategory = 'oversikt';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    updateCounts();
    loadCategory('oversikt');
});

// Setup navigation
function setupNavigation() {
    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Load category
            const cat = this.dataset.cat;
            loadCategory(cat);
        });
    });
}

// Update sidebar counts
function updateCounts() {
    const data = Storage.getUserData();
    if (!data) return;
    
    const categories = ['kontakter', 'abonnementer', 'krypto', 'forsikringer', 'bank', 'eiendommer', 'kjoretoy', 'digitalt', 'dokumenter', 'minner', 'etterlatte'];
    
    categories.forEach(cat => {
        const count = data[cat]?.length || 0;
        const el = document.getElementById(`cnt-${cat}`);
        if (el) el.textContent = count;
    });
}

// Load category
function loadCategory(cat) {
    currentCategory = cat;
    const content = document.getElementById('mainContent');
    
    switch(cat) {
        case 'oversikt':
            showOversikt();
            break;
        case 'kontakter':
            showKontakter();
            break;
        case 'abonnementer':
            showAbonnementer();
            break;
        case 'krypto':
            showKrypto();
            break;
        case 'forsikringer':
            showForsikringer();
            break;
        case 'bank':
            showBank();
            break;
        case 'eiendommer':
            showEiendommer();
            break;
        case 'kjoretoy':
            showKjoretoy();
            break;
        case 'digitalt':
            showDigitalt();
            break;
        case 'dokumenter':
            showDokumenter();
            break;
        case 'minner':
            showMinner();
            break;
        case 'livsmanual':
            showLivsmanual();
            break;
        case 'etterlatte':
            showEtterlatte();
            break;
        case 'aktivering':
            showAktivering();
            break;
        case 'bruker':
            showBruker();
            break;
    }
}

// OVERSIKT
function showOversikt() {
    const data = Storage.getUserData();
    const stats = {
        total: 0,
        kontakter: data.kontakter?.length || 0,
        abonnementer: data.abonnementer?.length || 0,
        krypto: data.krypto?.length || 0,
        forsikringer: data.forsikringer?.length || 0,
        bank: data.bank?.length || 0,
        eiendommer: data.eiendommer?.length || 0,
        kjoretoy: data.kjoretoy?.length || 0,
        digitalt: data.digitalt?.length || 0,
        dokumenter: data.dokumenter?.length || 0,
        minner: data.minner?.length || 0,
        etterlatte: data.etterlatte?.length || 0
    };
    
    stats.total = Object.values(stats).reduce((sum, count) => sum + count, 0) - stats.total;
    
    const html = `
        <div class="page">
            <h1 class="page-title">✨ Oversikt</h1>
            <p class="page-description">Velkommen til din digitale arv</p>
            
            <div style="background: rgba(212, 175, 55, 0.08); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 16px; padding: 3rem; text-align: center; margin-bottom: 2rem;">
                <div style="font-size: 4rem; color: var(--gold); margin-bottom: 1rem;">${stats.total}</div>
                <div style="font-size: 1.3rem; color: var(--warm-gold);">Totalt oppføringer lagret</div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
                <div style="background: rgba(212, 175, 55, 0.05); padding: 2rem; border-radius: 12px; border: 1px solid rgba(212, 175, 55, 0.2);">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">👥</div>
                    <div style="color: var(--gold); font-size: 1.1rem; margin-bottom: 0.3rem;">Kontakter</div>
                    <div style="color: var(--warm-gold);">${stats.kontakter} registrert</div>
                </div>
                <div style="background: rgba(212, 175, 55, 0.05); padding: 2rem; border-radius: 12px; border: 1px solid rgba(212, 175, 55, 0.2);">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">💝</div>
                    <div style="color: var(--gold); font-size: 1.1rem; margin-bottom: 0.3rem;">Minner</div>
                    <div style="color: var(--warm-gold);">${stats.minner} lagret</div>
                </div>
                <div style="background: rgba(212, 175, 55, 0.05); padding: 2rem; border-radius: 12px; border: 1px solid rgba(212, 175, 55, 0.2);">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔐</div>
                    <div style="color: var(--gold); font-size: 1.1rem; margin-bottom: 0.3rem;">Etterlatte</div>
                    <div style="color: var(--warm-gold);">${stats.etterlatte} profiler</div>
                </div>
            </div>
            
            <div style="background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.08)); border: 2px solid var(--gold); border-radius: 16px; padding: 2rem; margin-top: 3rem; display: flex; align-items: center; gap: 1.5rem;">
                <div style="font-size: 3rem;">🔐</div>
                <div>
                    <h3 style="color: var(--gold); margin-bottom: 0.5rem;">Ende-til-ende kryptert</h3>
                    <p style="color: var(--warm-gold);">All din data er beskyttet med Bitwarden-kryptering. Vi kan aldri lese innholdet ditt.</p>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('mainContent').innerHTML = html;
}

// KONTAKTER
function showKontakter() {
    const items = Storage.getItems('kontakter');
    
    const html = `
        <div class="page">
            <h1 class="page-title">👥 Kontakter</h1>
            <p class="page-description">Viktige personer – advokat, lege, familie</p>
            
            <div class="success-msg" id="successMsg">Lagret!</div>
            
            <div class="form-box">
                <h3>Legg til kontakt</h3>
                <form onsubmit="saveKontakt(event)">
                    <div class="form-row">
                        <div class="form-field">
                            <label>Navn</label>
                            <input type="text" name="navn" required>
                        </div>
                        <div class="form-field">
                            <label>Rolle</label>
                            <input type="text" name="rolle" placeholder="f.eks. Advokat">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-field">
                            <label>Telefon</label>
                            <input type="tel" name="telefon">
                        </div>
                        <div class="form-field">
                            <label>E-post</label>
                            <input type="email" name="epost">
                        </div>
                    </div>
                    <div class="form-field">
                        <label>Notater</label>
                        <textarea name="notater"></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Lagre kontakt</button>
                </form>
            </div>
            
            <div class="items-list">
                <h3 style="color: var(--gold); margin-bottom: 1rem;">Mine kontakter (${items.length})</h3>
                ${items.length === 0 ? `
                    <div class="empty">
                        <div class="icon">👥</div>
                        <h3>Ingen kontakter ennå</h3>
                        <p>Legg til din første kontakt ovenfor</p>
                    </div>
                ` : items.map(item => `
                    <div class="item">
                        <div class="item-header">
                            <div class="item-title">${item.navn}${item.rolle ? ` – ${item.rolle}` : ''}</div>
                            <div class="item-actions">
                                <button class="btn-icon" onclick="deleteItem('kontakter', '${item.id}')">🗑️ Slett</button>
                            </div>
                        </div>
                        <div class="item-body">
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
        updateCounts();
        loadCategory('kontakter');
    }
}

// ABONNEMENTER
function showAbonnementer() {
    const items = Storage.getItems('abonnementer');
    const total = items.reduce((sum, item) => sum + (parseInt(item.pris) || 0), 0);
    
    const html = `
        <div class="page">
            <h1 class="page-title">📱 Abonnementer</h1>
            <p class="page-description">Alle tjenester og medlemskap</p>
            
            <div class="success-msg" id="successMsg">Lagret!</div>
            
            <div class="form-box">
                <h3>Legg til abonnement</h3>
                <form onsubmit="saveAbonnement(event)">
                    <div class="form-row">
                        <div class="form-field">
                            <label>Tjeneste</label>
                            <input type="text" name="tjeneste" placeholder="f.eks. Netflix" required>
                        </div>
                        <div class="form-field">
                            <label>Pris per måned (kr)</label>
                            <input type="number" name="pris" placeholder="149">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-field">
                            <label>Kontaktinfo</label>
                            <input type="text" name="kontakt">
                        </div>
                        <div class="form-field">
                            <label>Fakturadag</label>
                            <input type="number" name="fakturaDag" min="1" max="31">
                        </div>
                    </div>
                    <button type="submit" class="btn-primary">Lagre</button>
                </form>
            </div>
            
            ${items.length > 0 ? `
                <div style="background: rgba(212, 175, 55, 0.08); padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; border: 1px solid rgba(212, 175, 55, 0.3);">
                    <div style="color: var(--gold); font-size: 1.2rem; font-weight: 500;">Total månedlig kostnad: ${total} kr</div>
                </div>
            ` : ''}
            
            <div class="items-list">
                <h3 style="color: var(--gold); margin-bottom: 1rem;">Mine abonnementer (${items.length})</h3>
                ${items.length === 0 ? `
                    <div class="empty">
                        <div class="icon">📱</div>
                        <h3>Ingen abonnementer</h3>
                    </div>
                ` : items.map(item => `
                    <div class="item">
                        <div class="item-header">
                            <div class="item-title">${item.tjeneste}${item.pris ? ` – ${item.pris} kr/mnd` : ''}</div>
                            <div class="item-actions">
                                <button class="btn-icon" onclick="deleteItem('abonnementer', '${item.id}')">🗑️</button>
                            </div>
                        </div>
                        <div class="item-body">
                            ${item.kontakt ? `<p><strong>Kontakt:</strong> ${item.kontakt}</p>` : ''}
                            ${item.fakturaDag ? `<p><strong>Faktureres:</strong> ${item.fakturaDag}. hver måned</p>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.getElementById('mainContent').innerHTML = html;
}

function saveAbonnement(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    const abo = {
        tjeneste: formData.get('tjeneste'),
        pris: formData.get('pris'),
        kontakt: formData.get('kontakt'),
        fakturaDag: formData.get('fakturaDag')
    };
    
    if (Storage.addItem('abonnementer', abo)) {
        showSuccess();
        form.reset();
        updateCounts();
        loadCategory('abonnementer');
    }
}

// File upload helper
function handleFileUpload(inputId, listId) {
    const input = document.getElementById(inputId);
    const list = document.getElementById(listId);
    
    if (input && input.files.length > 0) {
        const names = Array.from(input.files).map(f => f.name).join(', ');
        if (list) list.textContent = `Filer: ${names}`;
        return Array.from(input.files).map(f => f.name);
    }
    return [];
}

// Utilities
function deleteItem(category, id) {
    if (confirm('Er du sikker på at du vil slette?')) {
        if (Storage.deleteItem(category, id)) {
            updateCounts();
            loadCategory(currentCategory);
        }
    }
}

function showSuccess() {
    const msg = document.getElementById('successMsg');
    if (msg) {
        msg.classList.add('show');
        setTimeout(() => msg.classList.remove('show'), 3000);
    }
}

function displayFiles(inputId) {
    const input = document.getElementById(inputId);
    const listEl = document.getElementById(inputId + '-list');
    if (input && input.files.length > 0 && listEl) {
        const names = Array.from(input.files).map(f => f.name).join(', ');
        listEl.textContent = `Valgt: ${names}`;
        listEl.style.color = 'var(--gold)';
    }
}

// Simplified category handlers will continue...
