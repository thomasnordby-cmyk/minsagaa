// Check login
if (!Auth.isLoggedIn()) {
    window.location.href = 'index.html';
}

// Display user
const user = Auth.getCurrentUser();
document.getElementById('userName').textContent = user.name;

let currentCategory = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateCounts();
});

// Update counts
function updateCounts() {
    const data = Storage.getUserData();
    if (!data) return;
    
    const categories = ['forsikringer', 'okonomi', 'eiendommer', 'digitalt', 'dokumenter', 'minner'];
    
    categories.forEach(cat => {
        const count = data[cat]?.length || 0;
        const el = document.getElementById(`count-${cat}`);
        if (el) {
            el.textContent = count === 0 ? 'Ingen dokumenter ennå' : `${count} dokument${count > 1 ? 'er' : ''}`;
        }
    });
    
    // Livsmanual
    const livsmanual = data.livsmanual || {};
    const hasContent = Object.keys(livsmanual).some(key => livsmanual[key]);
    const livEl = document.getElementById('count-livsmanual');
    if (livEl) livEl.textContent = hasContent ? 'Delvis utfylt' : 'Ikke startet';
}

// Open category
function openCategory(cat) {
    currentCategory = cat;
    const content = document.getElementById('categoryContent');
    
    // Show content area
    content.style.display = 'block';
    content.scrollIntoView({ behavior: 'smooth' });
    
    switch(cat) {
        case 'forsikringer':
            showForsikringer();
            break;
        case 'okonomi':
            showOkonomi();
            break;
        case 'eiendommer':
            showEiendommer();
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
    }
}

function closeCategory() {
    document.getElementById('categoryContent').style.display = 'none';
    currentCategory = null;
}

// FORSIKRINGER
function showForsikringer() {
    const items = Storage.getItems('forsikringer');
    
    const html = `
        <button class="btn-back" onclick="closeCategory()">← Tilbake til oversikten</button>
        
        <div class="category-header">
            <h2>🛡️ Forsikringer</h2>
            <p class="category-intro">
                Her kan du laste opp kopier av forsikringsdokumentene dine. 
                Dette gjør det enkelt for dine etterlatte å vite hvilke forsikringer som finnes.
            </p>
        </div>

        <div class="info-box">
            <h4>Hva dette er:</h4>
            <p>Et sted å samle forsikringspapirene dine, slik at familien din vet hva som finnes når dagen kommer.</p>
            <h4>Hva dette IKKE er:</h4>
            <p>Vi er ikke et forsikringsselskap. Vi selger ikke forsikring. Vi ber aldri om betalingsinformasjon.</p>
        </div>

        <div class="success-msg" id="successMsg">✓ Dokumentet er lagret trygt</div>

        <div class="form-section">
            <h3>Last opp forsikringsdokument</h3>
            <form onsubmit="saveForsikring(event)">
                <div class="form-field">
                    <label>Forsikringsselskap</label>
                    <input type="text" name="selskap" placeholder="F.eks. If, Gjensidige" required>
                    <span class="form-help">Dette er kun for din egen oversikt</span>
                </div>
                
                <div class="form-field">
                    <label>Type forsikring</label>
                    <select name="type">
                        <option value="">Velg type...</option>
                        <option value="Livsforsikring">Livsforsikring</option>
                        <option value="Helseforsikring">Helseforsikring</option>
                        <option value="Husforsikring">Husforsikring</option>
                        <option value="Bilforsikring">Bilforsikring</option>
                        <option value="Innboforsikring">Innboforsikring</option>
                        <option value="Reiseforsikring">Reiseforsikring</option>
                        <option value="Annet">Annet</option>
                    </select>
                </div>

                <div class="form-field">
                    <label>Polisenummer (valgfritt)</label>
                    <input type="text" name="polisenummer" placeholder="F.eks. 123456789">
                    <span class="form-help">Gjør det lettere å finne forsikringen senere</span>
                </div>

                <div class="form-field">
                    <label>Notater (valgfritt)</label>
                    <textarea name="notater" placeholder="F.eks. kontaktperson, viktige detaljer..."></textarea>
                </div>

                <div class="form-field">
                    <label>Last opp dokumenter (PDF, bilder)</label>
                    <div class="file-upload" onclick="document.getElementById('forsikringFiles').click()">
                        <div class="file-icon">📄</div>
                        <p class="file-text">Klikk her for å velge filer fra datamaskinen din</p>
                        <p class="file-help">PDF, JPG eller PNG. Filene krypteres før lagring.</p>
                        <div id="forsikringFiles-list" class="file-names"></div>
                    </div>
                    <input type="file" id="forsikringFiles" multiple accept=".pdf,.jpg,.jpeg,.png" style="display:none" onchange="displayFiles('forsikringFiles')">
                </div>

                <button type="submit" class="btn-primary">Lagre forsikring</button>
            </form>
        </div>

        <div class="items-section">
            <h3>Dine lagrede forsikringer (${items.length})</h3>
            ${items.length === 0 ? `
                <div class="empty-state">
                    <div class="empty-icon">🛡️</div>
                    <p>Ingen forsikringer lastet opp ennå</p>
                    <p style="font-size: 0.9rem; margin-top: 0.5rem;">Når du laster opp, vil de vises her</p>
                </div>
            ` : items.map(item => `
                <div class="item">
                    <div class="item-header">
                        <h4 class="item-title">${item.selskap}${item.type ? ` – ${item.type}` : ''}</h4>
                        <button class="btn-icon" onclick="deleteItem('forsikringer', '${item.id}')">Slett</button>
                    </div>
                    <div class="item-body">
                        ${item.polisenummer ? `<p><strong>Polisenummer:</strong> ${item.polisenummer}</p>` : ''}
                        ${item.notater ? `<p><strong>Notater:</strong> ${item.notater}</p>` : ''}
                        ${item.filer && item.filer.length > 0 ? `
                            <p><strong>Vedlagte filer:</strong></p>
                            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
                                ${item.filer.map(fil => `
                                    <span style="background: var(--cream); padding: 0.4rem 0.8rem; border-radius: 20px; font-size: 0.85rem;">
                                        📎 ${fil}
                                    </span>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    document.getElementById('categoryContent').innerHTML = html;
}

function saveForsikring(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const files = handleFileUpload('forsikringFiles');
    
    if (Storage.addItem('forsikringer', {
        selskap: formData.get('selskap'),
        type: formData.get('type'),
        polisenummer: formData.get('polisenummer'),
        notater: formData.get('notater'),
        filer: files
    })) {
        showSuccess();
        e.target.reset();
        document.getElementById('forsikringFiles-list').textContent = '';
        updateCounts();
        showForsikringer();
    }
}

// ØKONOMISK OVERSIKT
function showOkonomi() {
    const items = Storage.getItems('okonomi');
    
    const html = `
        <button class="btn-back" onclick="closeCategory()">← Tilbake til oversikten</button>
        
        <div class="category-header">
            <h2>🏦 Økonomisk oversikt</h2>
            <p class="category-intro">
                Her kan du lage en oversikt over bankkontoer og økonomiske forhold. 
                Dette er kun for dine etterlattes oversikt – ikke for oss.
            </p>
        </div>

        <div class="info-box" style="background: var(--warning-bg); border-color: var(--warning-border);">
            <h4>⚠️ Viktig sikkerhetsinformasjon:</h4>
            <p><strong>Vi er IKKE en bank.</strong> Vi ber ALDRI om:</p>
            <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
                <li>Passord til nettbank</li>
                <li>BankID-koder</li>
                <li>Kortnummer eller PIN-koder</li>
                <li>Engangskoder fra banken din</li>
            </ul>
            <p>Last kun opp <strong>informasjon</strong> om kontoer (ikke tilganger). Dette er for at familien skal vite hvor de skal henvende seg.</p>
        </div>

        <div class="success-msg" id="successMsg">✓ Informasjonen er lagret trygt</div>

        <div class="form-section">
            <h3>Legg til informasjon om bankkonto</h3>
            <form onsubmit="saveOkonomi(event)">
                <div class="form-field">
                    <label>Bank</label>
                    <input type="text" name="bank" placeholder="F.eks. DNB, Nordea" required>
                    <span class="form-help">Kun bankens navn – ikke innloggingsinfo</span>
                </div>
                
                <div class="form-field">
                    <label>Type konto</label>
                    <select name="type">
                        <option value="Brukskonto">Brukskonto</option>
                        <option value="Sparekonto">Sparekonto</option>
                        <option value="BSU">BSU</option>
                        <option value="Aksjekonto">Aksjekonto</option>
                        <option value="Lån">Lån</option>
                        <option value="Annet">Annet</option>
                    </select>
                </div>

                <div class="form-field">
                    <label>Kontonummer (valgfritt)</label>
                    <input type="text" name="kontonummer" placeholder="xxxx.xx.xxxxx">
                    <span class="form-help">For familiens oversikt – ikke påloggingsinformasjon</span>
                </div>

                <div class="form-field">
                    <label>Beskrivelse (valgfritt)</label>
                    <textarea name="beskrivelse" placeholder="F.eks. 'Hovedkonto for husleie og regninger'"></textarea>
                </div>

                <div class="form-field">
                    <label>Last opp dokumenter (f.eks. kontoutskrifter)</label>
                    <div class="file-upload" onclick="document.getElementById('okonomiFiles').click()">
                        <div class="file-icon">📄</div>
                        <p class="file-text">Klikk her for å velge filer</p>
                        <p class="file-help">PDF eller Excel. Ingen sensitiv påloggingsinfo!</p>
                        <div id="okonomiFiles-list" class="file-names"></div>
                    </div>
                    <input type="file" id="okonomiFiles" multiple accept=".pdf,.xlsx,.xls" style="display:none" onchange="displayFiles('okonomiFiles')">
                </div>

                <button type="submit" class="btn-primary">Lagre informasjon</button>
            </form>
        </div>

        <div class="items-section">
            <h3>Din økonomiske oversikt (${items.length})</h3>
            ${items.length === 0 ? `
                <div class="empty-state">
                    <div class="empty-icon">🏦</div>
                    <p>Ingen bankinfo lagt til ennå</p>
                </div>
            ` : items.map(item => `
                <div class="item">
                    <div class="item-header">
                        <h4 class="item-title">${item.bank} – ${item.type}</h4>
                        <button class="btn-icon" onclick="deleteItem('okonomi', '${item.id}')">Slett</button>
                    </div>
                    <div class="item-body">
                        ${item.kontonummer ? `<p><strong>Kontonummer:</strong> ${item.kontonummer}</p>` : ''}
                        ${item.beskrivelse ? `<p><strong>Beskrivelse:</strong> ${item.beskrivelse}</p>` : ''}
                        ${item.filer && item.filer.length > 0 ? `
                            <p><strong>Vedlagte filer:</strong></p>
                            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
                                ${item.filer.map(fil => `<span style="background: var(--cream); padding: 0.4rem 0.8rem; border-radius: 20px; font-size: 0.85rem;">📎 ${fil}</span>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    document.getElementById('categoryContent').innerHTML = html;
}

function saveOkonomi(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const files = handleFileUpload('okonomiFiles');
    
    if (Storage.addItem('okonomi', {
        bank: formData.get('bank'),
        type: formData.get('type'),
        kontonummer: formData.get('kontonummer'),
        beskrivelse: formData.get('beskrivelse'),
        filer: files
    })) {
        showSuccess();
        e.target.reset();
        document.getElementById('okonomiFiles-list').textContent = '';
        updateCounts();
        showOkonomi();
    }
}

// EIENDOMMER
function showEiendommer() {
    const items = Storage.getItems('eiendommer');
    
    const html = `
        <button class="btn-back" onclick="closeCategory()">← Tilbake til oversikten</button>
        
        <div class="category-header">
            <h2>🏠 Eiendommer</h2>
            <p class="category-intro">
                Informasjon om hus, hytte, tomt eller andre eiendommer. 
                Her kan du laste opp skjøter, takster og annen viktig dokumentasjon.
            </p>
        </div>

        <div class="success-msg" id="successMsg">✓ Eiendom lagret</div>

        <div class="form-section">
            <h3>Legg til eiendom</h3>
            <form onsubmit="saveEiendom(event)">
                <div class="form-field">
                    <label>Adresse</label>
                    <input type="text" name="adresse" placeholder="F.eks. Storgata 1, 0182 Oslo" required>
                </div>
                
                <div class="form-field">
                    <label>Type eiendom</label>
                    <select name="type">
                        <option value="Enebolig">Enebolig</option>
                        <option value="Leilighet">Leilighet</option>
                        <option value="Hytte">Hytte</option>
                        <option value="Tomt">Tomt</option>
                        <option value="Annet">Annet</option>
                    </select>
                </div>

                <div class="form-field">
                    <label>Notater (valgfritt)</label>
                    <textarea name="notater" placeholder="Gårdsnummer, bruksnummer, eller annen info..."></textarea>
                </div>

                <div class="form-field">
                    <label>Last opp dokumenter (skjøte, takst, tegninger)</label>
                    <div class="file-upload" onclick="document.getElementById('eiendomFiles').click()">
                        <div class="file-icon">📄</div>
                        <p class="file-text">Klikk her for å velge filer</p>
                        <p class="file-help">PDF eller bilder</p>
                        <div id="eiendomFiles-list" class="file-names"></div>
                    </div>
                    <input type="file" id="eiendomFiles" multiple accept=".pdf,.jpg,.jpeg,.png" style="display:none" onchange="displayFiles('eiendomFiles')">
                </div>

                <button type="submit" class="btn-primary">Lagre eiendom</button>
            </form>
        </div>

        <div class="items-section">
            <h3>Dine eiendommer (${items.length})</h3>
            ${items.length === 0 ? `
                <div class="empty-state">
                    <div class="empty-icon">🏠</div>
                    <p>Ingen eiendommer lagt til</p>
                </div>
            ` : items.map(item => `
                <div class="item">
                    <div class="item-header">
                        <h4 class="item-title">${item.adresse}</h4>
                        <button class="btn-icon" onclick="deleteItem('eiendommer', '${item.id}')">Slett</button>
                    </div>
                    <div class="item-body">
                        <p><strong>Type:</strong> ${item.type}</p>
                        ${item.notater ? `<p><strong>Notater:</strong> ${item.notater}</p>` : ''}
                        ${item.filer && item.filer.length > 0 ? `
                            <p><strong>Dokumenter:</strong></p>
                            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
                                ${item.filer.map(fil => `<span style="background: var(--cream); padding: 0.4rem 0.8rem; border-radius: 20px; font-size: 0.85rem;">📎 ${fil}</span>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    document.getElementById('categoryContent').innerHTML = html;
}

function saveEiendom(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const files = handleFileUpload('eiendomFiles');
    
    if (Storage.addItem('eiendommer', {
        adresse: formData.get('adresse'),
        type: formData.get('type'),
        notater: formData.get('notater'),
        filer: files
    })) {
        showSuccess();
        e.target.reset();
        document.getElementById('eiendomFiles-list').textContent = '';
        updateCounts();
        showEiendommer();
    }
}

// Continue with remaining categories in next part...
