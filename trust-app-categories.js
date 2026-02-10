// DIGITALT LIV
function showDigitalt() {
    const items = Storage.getItems('digitalt');
    
    const html = `
        <button class="btn-back" onclick="closeCategory()">← Tilbake til oversikten</button>
        
        <div class="category-header">
            <h2>💻 Mine digitale kontoer</h2>
            <p class="category-intro">
                En oversikt over dine digitale kontoer, slik at familie kan lukke dem eller ta vare på minner når tiden kommer.
            </p>
        </div>

        <div class="info-box" style="background: var(--warning-bg); border-color: var(--warning-border);">
            <h4>⚠️ Vi ber ALDRI om passord!</h4>
            <p>Ikke skriv inn faktiske passord her. Dette er kun en oversikt over <strong>hvilke</strong> kontoer som finnes.</p>
            <p>Du kan legge ved skjermbilder eller instruksjoner for hvordan familien kan få tilgang (f.eks. "Passord ligger i Bitwarden").</p>
        </div>

        <div class="success-msg" id="successMsg">✓ Informasjon lagret</div>

        <div class="form-section">
            <h3>Legg til digital konto</h3>
            <form onsubmit="saveDigitalt(event)">
                <div class="form-field">
                    <label>Tjeneste</label>
                    <input type="text" name="tjeneste" placeholder="F.eks. Gmail, Facebook, Dropbox" required>
                    <span class="form-help">Hvilken tjeneste handler dette om?</span>
                </div>
                
                <div class="form-field">
                    <label>Brukernavn eller e-post</label>
                    <input type="text" name="brukernavn" placeholder="F.eks. ola.nordmann@gmail.com">
                </div>

                <div class="form-field">
                    <label>Instruksjoner for familie (valgfritt)</label>
                    <textarea name="instruksjoner" placeholder="F.eks. 'Passord finnes i passordhvelv' eller 'Ta kontakt med support for å lukke konto'"></textarea>
                    <span class="form-help">IKKE skriv faktiske passord her</span>
                </div>

                <div class="form-field">
                    <label>Last opp skjermbilder eller notater</label>
                    <div class="file-upload" onclick="document.getElementById('digitaltFiles').click()">
                        <div class="file-icon">📄</div>
                        <p class="file-text">Klikk her for å velge filer</p>
                        <p class="file-help">Bilder, PDF eller tekst</p>
                        <div id="digitaltFiles-list" class="file-names"></div>
                    </div>
                    <input type="file" id="digitaltFiles" multiple style="display:none" onchange="displayFiles('digitaltFiles')">
                </div>

                <button type="submit" class="btn-primary">Lagre informasjon</button>
            </form>
        </div>

        <div class="items-section">
            <h3>Dine digitale kontoer (${items.length})</h3>
            ${items.length === 0 ? `
                <div class="empty-state">
                    <div class="empty-icon">💻</div>
                    <p>Ingen kontoer lagt til</p>
                </div>
            ` : items.map(item => `
                <div class="item">
                    <div class="item-header">
                        <h4 class="item-title">${item.tjeneste}</h4>
                        <button class="btn-icon" onclick="deleteItem('digitalt', '${item.id}')">Slett</button>
                    </div>
                    <div class="item-body">
                        ${item.brukernavn ? `<p><strong>Brukernavn:</strong> ${item.brukernavn}</p>` : ''}
                        ${item.instruksjoner ? `<p><strong>Instruksjoner:</strong> ${item.instruksjoner}</p>` : ''}
                        ${item.filer && item.filer.length > 0 ? `
                            <p><strong>Vedlegg:</strong></p>
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

function saveDigitalt(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const files = handleFileUpload('digitaltFiles');
    
    if (Storage.addItem('digitalt', {
        tjeneste: formData.get('tjeneste'),
        brukernavn: formData.get('brukernavn'),
        instruksjoner: formData.get('instruksjoner'),
        filer: files
    })) {
        showSuccess();
        e.target.reset();
        document.getElementById('digitaltFiles-list').textContent = '';
        updateCounts();
        showDigitalt();
    }
}

// DOKUMENTER
function showDokumenter() {
    const items = Storage.getItems('dokumenter');
    
    const html = `
        <button class="btn-back" onclick="closeCategory()">← Tilbake til oversikten</button>
        
        <div class="category-header">
            <h2>📄 Viktige dokumenter</h2>
            <p class="category-intro">
                Testament, fullmakter, fødselsattester og andre viktige papirer samlet på ett sted.
            </p>
        </div>

        <div class="success-msg" id="successMsg">✓ Dokument lagret trygt</div>

        <div class="form-section">
            <h3>Last opp dokument</h3>
            <form onsubmit="saveDokument(event)">
                <div class="form-field">
                    <label>Type dokument</label>
                    <select name="type" required>
                        <option value="">Velg type...</option>
                        <option value="Testament">Testament</option>
                        <option value="Fullmakt">Fullmakt</option>
                        <option value="Fremtidsfullmakt">Fremtidsfullmakt</option>
                        <option value="Fødselsattest">Fødselsattest</option>
                        <option value="Vigselsattest">Vigselsattest</option>
                        <option value="Pass">Pass</option>
                        <option value="Førerkort">Førerkort</option>
                        <option value="Annet">Annet viktig dokument</option>
                    </select>
                </div>

                <div class="form-field">
                    <label>Beskrivelse (valgfritt)</label>
                    <input type="text" name="beskrivelse" placeholder="F.eks. 'Testament opprettet 2023'">
                </div>

                <div class="form-field">
                    <label>Hvor ligger originalen? (valgfritt)</label>
                    <input type="text" name="plassering" placeholder="F.eks. 'I safe hjemme' eller 'Hos advokat'">
                    <span class="form-help">Så familien vet hvor de skal lete</span>
                </div>

                <div class="form-field">
                    <label>Last opp dokumentet</label>
                    <div class="file-upload" onclick="document.getElementById('dokumentFiles').click()">
                        <div class="file-icon">📄</div>
                        <p class="file-text">Klikk her for å velge fil</p>
                        <p class="file-help">PDF, bilder eller Word-dokumenter</p>
                        <div id="dokumentFiles-list" class="file-names"></div>
                    </div>
                    <input type="file" id="dokumentFiles" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" style="display:none" onchange="displayFiles('dokumentFiles')">
                </div>

                <button type="submit" class="btn-primary">Lagre dokument</button>
            </form>
        </div>

        <div class="items-section">
            <h3>Dine dokumenter (${items.length})</h3>
            ${items.length === 0 ? `
                <div class="empty-state">
                    <div class="empty-icon">📄</div>
                    <p>Ingen dokumenter lastet opp</p>
                </div>
            ` : items.map(item => `
                <div class="item">
                    <div class="item-header">
                        <h4 class="item-title">${item.type}${item.beskrivelse ? ` – ${item.beskrivelse}` : ''}</h4>
                        <button class="btn-icon" onclick="deleteItem('dokumenter', '${item.id}')">Slett</button>
                    </div>
                    <div class="item-body">
                        ${item.plassering ? `<p><strong>Fysisk plassering:</strong> ${item.plassering}</p>` : ''}
                        ${item.filer && item.filer.length > 0 ? `
                            <p><strong>Filer:</strong></p>
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

function saveDokument(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const files = handleFileUpload('dokumentFiles');
    
    if (Storage.addItem('dokumenter', {
        type: formData.get('type'),
        beskrivelse: formData.get('beskrivelse'),
        plassering: formData.get('plassering'),
        filer: files
    })) {
        showSuccess();
        e.target.reset();
        document.getElementById('dokumentFiles-list').textContent = '';
        updateCounts();
        showDokumenter();
    }
}

// MINNER & SAGA
function showMinner() {
    const items = Storage.getItems('minner');
    
    const html = `
        <button class="btn-back" onclick="closeCategory()">← Tilbake til oversikten</button>
        
        <div class="category-header">
            <h2>💝 Minner & personlige budskap</h2>
            <p class="category-intro">
                Her kan du lagre bilder, videoer og personlige budskap til de du er glad i. 
                Dette er hjertet av din digitale arv.
            </p>
        </div>

        <div class="info-box">
            <h4>Dette er ditt personlige rom</h4>
            <p>Her handler det ikke om praktisk informasjon, men om følelser, minner og det du vil at de skal huske deg for.</p>
            <p>Ta deg god tid. Dette er viktig.</p>
        </div>

        <div class="success-msg" id="successMsg">✓ Minnet ditt er lagret</div>

        <div class="form-section">
            <h3>Legg til et minne</h3>
            <form onsubmit="saveMinne(event)">
                <div class="form-field">
                    <label>Hva er dette?</label>
                    <select name="type" required>
                        <option value="">Velg type...</option>
                        <option value="Bilde">Bilde</option>
                        <option value="Video">Video</option>
                        <option value="Lydopptak">Lydopptak</option>
                        <option value="Brev">Brev eller tekst</option>
                        <option value="Historie">En historie jeg vil fortelle</option>
                    </select>
                </div>

                <div class="form-field">
                    <label>Gi det en tittel</label>
                    <input type="text" name="tittel" placeholder="F.eks. 'Sommeren ved hytta' eller 'Til mine barn'" required>
                </div>

                <div class="form-field">
                    <label>Hvem er dette til? (valgfritt)</label>
                    <input type="text" name="mottaker" placeholder="F.eks. 'Til alle' eller 'Til Emma'">
                    <span class="form-help">Så de vet at dette var ment for dem</span>
                </div>

                <div class="form-field">
                    <label>Skriv noe om dette minnet (valgfritt)</label>
                    <textarea name="beskrivelse" rows="6" placeholder="Fortell historien bak... Hva følte du? Hva vil du at de skal vite?"></textarea>
                </div>

                <div class="form-field">
                    <label>Last opp filer (bilder, video, lyd)</label>
                    <div class="file-upload" onclick="document.getElementById('minneFiles').click()">
                        <div class="file-icon">💝</div>
                        <p class="file-text">Klikk her for å velge filer</p>
                        <p class="file-help">Bilder, video eller lydopptak</p>
                        <div id="minneFiles-list" class="file-names"></div>
                    </div>
                    <input type="file" id="minneFiles" multiple accept="image/*,video/*,audio/*,.pdf" style="display:none" onchange="displayFiles('minneFiles')">
                </div>

                <button type="submit" class="btn-primary">Lagre minne</button>
            </form>
        </div>

        <div class="items-section">
            <h3>Dine lagrede minner (${items.length})</h3>
            ${items.length === 0 ? `
                <div class="empty-state">
                    <div class="empty-icon">💝</div>
                    <p>Ingen minner lagt til ennå</p>
                    <p style="font-size: 0.9rem; margin-top: 0.5rem;">Start med det første minnet du vil dele</p>
                </div>
            ` : items.map(item => `
                <div class="item">
                    <div class="item-header">
                        <h4 class="item-title">${item.type}: ${item.tittel}</h4>
                        <button class="btn-icon" onclick="deleteItem('minner', '${item.id}')">Slett</button>
                    </div>
                    <div class="item-body">
                        ${item.mottaker ? `<p><strong>Til:</strong> ${item.mottaker}</p>` : ''}
                        ${item.beskrivelse ? `<p style="margin: 0.8rem 0; font-style: italic;">${item.beskrivelse}</p>` : ''}
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

function saveMinne(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const files = handleFileUpload('minneFiles');
    
    if (Storage.addItem('minner', {
        type: formData.get('type'),
        tittel: formData.get('tittel'),
        mottaker: formData.get('mottaker'),
        beskrivelse: formData.get('beskrivelse'),
        filer: files
    })) {
        showSuccess();
        e.target.reset();
        document.getElementById('minneFiles-list').textContent = '';
        updateCounts();
        showMinner();
    }
}

// LIVSMANUALEN
function showLivsmanual() {
    const data = Storage.getSection('livsmanual') || {};
    
    const html = `
        <button class="btn-back" onclick="closeCategory()">← Tilbake til oversikten</button>
        
        <div class="category-header">
            <h2>📖 Livsmanualen</h2>
            <p class="category-intro">
                Den praktiske guiden til hvordan hverdagen din fungerer. 
                Hvor er nøklene? Hvordan fungerer varmesystemet? Hva må gjøres i hagen?
            </p>
        </div>

        <div class="info-box">
            <h4>Hvorfor dette er viktig</h4>
            <p>De små tingene som du vet i hodet ditt, er ofte det som er vanskeligst for andre å finne ut av. Dette gjør hverdagen deres enklere.</p>
        </div>

        <div class="success-msg" id="successMsg">✓ Livsmanualen er oppdatert</div>

        <form onsubmit="saveLivsmanual(event)">
            <div class="form-section">
                <h3>🏠 Hjem</h3>
                <div class="form-field">
                    <label>Hvor er nøklene?</label>
                    <textarea name="nokler" rows="2">${data.nokler || ''}</textarea>
                    <span class="form-help">F.eks. "Extranøkkel hos naboen" eller "I skuffen i gangen"</span>
                </div>
                <div class="form-field">
                    <label>Varme og fyring</label>
                    <textarea name="varme" rows="3">${data.varme || ''}</textarea>
                    <span class="form-help">Hvordan fungerer varmesystemet? Hvor er manualene?</span>
                </div>
                <div class="form-field">
                    <label>WiFi og nettverk</label>
                    <textarea name="wifi" rows="2">${data.wifi || ''}</textarea>
                    <span class="form-help">Nettverksnavn og hvor passordet finnes (ikke skriv passordet her!)</span>
                </div>
            </div>

            <div class="form-section">
                <h3>🌱 Hage og planter</h3>
                <div class="form-field">
                    <label>Plantestell</label>
                    <textarea name="planter" rows="3">${data.planter || ''}</textarea>
                    <span class="form-help">Hvilke planter trenger vanning? Hvor ofte?</span>
                </div>
                <div class="form-field">
                    <label>Hagearbeid gjennom året</label>
                    <textarea name="hage" rows="3">${data.hage || ''}</textarea>
                    <span class="form-help">F.eks. "Klipp gresset hver uke om sommeren"</span>
                </div>
            </div>

            <div class="form-section">
                <h3>🐾 Dyr</h3>
                <div class="form-field">
                    <label>Fôringsrutiner</label>
                    <textarea name="dyrefor" rows="3">${data.dyrefor || ''}</textarea>
                    <span class="form-help">Hva spiser de? Når og hvor mye?</span>
                </div>
                <div class="form-field">
                    <label>Veterinær og viktig info</label>
                    <textarea name="veterinaer" rows="2">${data.veterinaer || ''}</textarea>
                </div>
            </div>

            <div class="form-section">
                <h3>🔧 Vedlikehold</h3>
                <div class="form-field">
                    <label>Viktige håndverkere</label>
                    <textarea name="handverkere" rows="3">${data.handverkere || ''}</textarea>
                    <span class="form-help">Rørlegger, elektriker osv.</span>
                </div>
                <div class="form-field">
                    <label>Årlig vedlikehold</label>
                    <textarea name="vedlikehold" rows="3">${data.vedlikehold || ''}</textarea>
                    <span class="form-help">F.eks. "Bytt filter i ventilasjonsanlegg i mars"</span>
                </div>
            </div>

            <button type="submit" class="btn-primary">Lagre livsmanual</button>
        </form>
    `;
    
    document.getElementById('categoryContent').innerHTML = html;
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
        updateCounts();
    }
}

// Utility functions
function deleteItem(category, id) {
    if (confirm('Er du sikker på at du vil slette dette?')) {
        if (Storage.deleteItem(category, id)) {
            updateCounts();
            openCategory(currentCategory);
        }
    }
}

function showSuccess() {
    const msg = document.getElementById('successMsg');
    if (msg) {
        msg.classList.add('show');
        setTimeout(() => msg.classList.remove('show'), 4000);
    }
}

function displayFiles(inputId) {
    const input = document.getElementById(inputId);
    const list = document.getElementById(inputId + '-list');
    if (input && list && input.files.length > 0) {
        const names = Array.from(input.files).map(f => f.name).join(', ');
        list.textContent = `Valgt: ${names}`;
        list.style.color = 'var(--soft-brown)';
        list.style.fontWeight = '500';
    }
}

function handleFileUpload(inputId) {
    const input = document.getElementById(inputId);
    if (input && input.files.length > 0) {
        return Array.from(input.files).map(f => f.name);
    }
    return [];
}
