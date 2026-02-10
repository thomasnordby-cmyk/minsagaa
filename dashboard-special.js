// ===== MINNER & SAGA =====
function loadMinner() {
    const items = Storage.getItems('minner');
    
    const html = `
        <div class="section">
            <h1 class="section-title">💝 Minner & Saga</h1>
            <p class="section-description">
                Dette er hjertet av din digitale arv. Her samler du minnene, historiene og budskapene til de du elsker.
            </p>

            <div class="success-message" id="successMessage">Minne lagret!</div>

            <div class="form-section">
                <h3>Legg til minne</h3>
                <form id="minneForm" onsubmit="saveMinne(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Type</label>
                            <select name="type" required>
                                <option value="">Velg type...</option>
                                <option value="Bilde">Bilde</option>
                                <option value="Video">Video</option>
                                <option value="Brev">Brev</option>
                                <option value="Lydopptak">Lydopptak</option>
                                <option value="Historie">Historie</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Tittel</label>
                            <input type="text" name="tittel" placeholder="Gi minnet en tittel" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Beskrivelse</label>
                        <textarea name="beskrivelse" placeholder="Fortell om dette minnet..." rows="5"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Hvem er dette til?</label>
                        <input type="text" name="mottaker" placeholder="Alle, eller spesifikk person">
                    </div>
                    <div class="form-group">
                        <label>Last opp filer (bilder, videoer, lyd)</label>
                        <div class="file-upload-area" onclick="document.getElementById('minneFiles').click()">
                            <div class="upload-icon">📁</div>
                            <p>Klikk for å laste opp filer</p>
                            <p id="minneFileList" style="font-size: 0.9rem; color: var(--light-gold); margin-top: 0.5rem;"></p>
                        </div>
                        <input type="file" id="minneFiles" name="filer" multiple accept="image/*,video/*,audio/*,.pdf" style="display: none;" onchange="displayFileNames('minneFileList', this.files)">
                    </div>
                    <button type="submit" class="btn-primary">Lagre minne</button>
                </form>
            </div>

            <div class="item-list">
                <h3 style="color: var(--gold); margin-bottom: 1rem;">Mine minner (${items.length})</h3>
                ${items.length === 0 ? `
                    <div class="empty-state">
                        <div class="empty-state-icon">💝</div>
                        <h3>Ingen minner lagt til ennå</h3>
                        <p>Lag ditt første minne og start din saga</p>
                    </div>
                ` : items.map(item => `
                    <div class="item-card">
                        <div class="item-header">
                            <div class="item-title">${item.type}: ${item.tittel}</div>
                            <div class="item-actions">
                                <button class="btn-icon" onclick="deleteItem('minner', '${item.id}')">🗑️ Slett</button>
                            </div>
                        </div>
                        <div class="item-details">
                            ${item.beskrivelse ? `<p style="margin-bottom: 1rem;">${item.beskrivelse}</p>` : ''}
                            ${item.mottaker ? `<p><strong>Til:</strong> ${item.mottaker}</p>` : ''}
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
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.getElementById('mainContent').innerHTML = html;
}

function saveMinne(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const fileInput = document.getElementById('minneFiles');
    
    const minne = {
        type: formData.get('type'),
        tittel: formData.get('tittel'),
        beskrivelse: formData.get('beskrivelse'),
        mottaker: formData.get('mottaker'),
        filer: Array.from(fileInput.files).map(f => f.name)
    };
    
    if (Storage.addItem('minner', minne)) {
        showSuccess();
        form.reset();
        loadMinner();
    }
}

// ===== LIVSMANUALEN =====
function loadLivsmanual() {
    const data = Storage.getSection('livsmanual') || {};
    
    const html = `
        <div class="section">
            <h1 class="section-title">📖 Livsmanualen</h1>
            <p class="section-description">
                Den praktiske guiden til hvordan ting fungerer i hverdagen din. 
                Gjør det enkelt for de som overtar.
            </p>

            <div class="success-message" id="successMessage">Livsmanualen oppdatert!</div>

            <form id="livsmanualForm" onsubmit="saveLivsmanual(event)">
                <div class="form-section">
                    <h3>🏠 Hjem & eiendom</h3>
                    <div class="form-group">
                        <label>Hvor er nøklene?</label>
                        <textarea name="nokler" rows="2">${data.nokler || ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Varmesystem / fyring</label>
                        <textarea name="varme" rows="2">${data.varme || ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label>WiFi-passord og nettverk</label>
                        <textarea name="wifi" rows="2">${data.wifi || ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Alarmer og sikkerhet</label>
                        <textarea name="alarm" rows="2">${data.alarm || ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Last opp bilder, manualer, tegninger</label>
                        <div class="file-upload-area" onclick="document.getElementById('livsmanualHjemFiles').click()">
                            <div class="upload-icon">📄</div>
                            <p>Klikk for å laste opp filer</p>
                            <p id="livsmanualHjemFileList" style="font-size: 0.9rem; color: var(--light-gold); margin-top: 0.5rem;">
                                ${data.hjemFiler && data.hjemFiler.length > 0 ? data.hjemFiler.join(', ') : ''}
                            </p>
                        </div>
                        <input type="file" id="livsmanualHjemFiles" name="hjemFiler" multiple accept="image/*,.pdf,.doc,.docx" style="display: none;" onchange="displayFileNames('livsmanualHjemFileList', this.files)">
                    </div>
                </div>

                <div class="form-section">
                    <h3>🌱 Hage & planter</h3>
                    <div class="form-group">
                        <label>Plantestell</label>
                        <textarea name="planter" rows="3">${data.planter || ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Hagearbeid gjennom året</label>
                        <textarea name="hage" rows="3">${data.hage || ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Last opp bilder av hagen, planteguider</label>
                        <div class="file-upload-area" onclick="document.getElementById('livsmanualHageFiles').click()">
                            <div class="upload-icon">📄</div>
                            <p>Klikk for å laste opp filer</p>
                            <p id="livsmanualHageFileList" style="font-size: 0.9rem; color: var(--light-gold); margin-top: 0.5rem;">
                                ${data.hageFiler && data.hageFiler.length > 0 ? data.hageFiler.join(', ') : ''}
                            </p>
                        </div>
                        <input type="file" id="livsmanualHageFiles" name="hageFiler" multiple accept="image/*,.pdf" style="display: none;" onchange="displayFileNames('livsmanualHageFileList', this.files)">
                    </div>
                </div>

                <div class="form-section">
                    <h3>🐾 Dyr</h3>
                    <div class="form-group">
                        <label>Fôringsrutiner</label>
                        <textarea name="dyrefor" rows="3">${data.dyrefor || ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Veterinær og viktig info</label>
                        <textarea name="veterinaer" rows="2">${data.veterinaer || ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Last opp bilder av kjæledyr, veterinærdokumenter</label>
                        <div class="file-upload-area" onclick="document.getElementById('livsmanualDyrFiles').click()">
                            <div class="upload-icon">📄</div>
                            <p>Klikk for å laste opp filer</p>
                            <p id="livsmanualDyrFileList" style="font-size: 0.9rem; color: var(--light-gold); margin-top: 0.5rem;">
                                ${data.dyrFiler && data.dyrFiler.length > 0 ? data.dyrFiler.join(', ') : ''}
                            </p>
                        </div>
                        <input type="file" id="livsmanualDyrFiles" name="dyrFiler" multiple accept="image/*,.pdf" style="display: none;" onchange="displayFileNames('livsmanualDyrFileList', this.files)">
                    </div>
                </div>

                <div class="form-section">
                    <h3>🔧 Vedlikehold</h3>
                    <div class="form-group">
                        <label>Viktige håndverkere</label>
                        <textarea name="handverkere" rows="3">${data.handverkere || ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Årlig vedlikehold</label>
                        <textarea name="vedlikehold" rows="3">${data.vedlikehold || ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Last opp manualer, garantier, instruksjoner</label>
                        <div class="file-upload-area" onclick="document.getElementById('livsmanualVedlikeholdFiles').click()">
                            <div class="upload-icon">📄</div>
                            <p>Klikk for å laste opp filer</p>
                            <p id="livsmanualVedlikeholdFileList" style="font-size: 0.9rem; color: var(--light-gold); margin-top: 0.5rem;">
                                ${data.vedlikeholdFiler && data.vedlikeholdFiler.length > 0 ? data.vedlikeholdFiler.join(', ') : ''}
                            </p>
                        </div>
                        <input type="file" id="livsmanualVedlikeholdFiles" name="vedlikeholdFiler" multiple accept=".pdf,.jpg,.png,.doc,.docx" style="display: none;" onchange="displayFileNames('livsmanualVedlikeholdFileList', this.files)">
                    </div>
                </div>

                <div class="form-section">
                    <h3>📝 Annet viktig</h3>
                    <div class="form-group">
                        <label>Spesielle instruksjoner</label>
                        <textarea name="annet" rows="5">${data.annet || ''}</textarea>
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
    const form = e.target;
    const formData = new FormData(form);
    
    const livsmanual = {};
    for (let [key, value] of formData.entries()) {
        if (!key.endsWith('Filer')) {
            livsmanual[key] = value;
        }
    }
    
    // Handle file uploads
    const hjemFiles = document.getElementById('livsmanualHjemFiles');
    const hageFiles = document.getElementById('livsmanualHageFiles');
    const dyrFiles = document.getElementById('livsmanualDyrFiles');
    const vedlikeholdFiles = document.getElementById('livsmanualVedlikeholdFiles');
    
    livsmanual.hjemFiler = hjemFiles.files.length > 0 ? Array.from(hjemFiles.files).map(f => f.name) : (Storage.getSection('livsmanual')?.hjemFiler || []);
    livsmanual.hageFiler = hageFiles.files.length > 0 ? Array.from(hageFiles.files).map(f => f.name) : (Storage.getSection('livsmanual')?.hageFiler || []);
    livsmanual.dyrFiler = dyrFiles.files.length > 0 ? Array.from(dyrFiles.files).map(f => f.name) : (Storage.getSection('livsmanual')?.dyrFiler || []);
    livsmanual.vedlikeholdFiler = vedlikeholdFiles.files.length > 0 ? Array.from(vedlikeholdFiles.files).map(f => f.name) : (Storage.getSection('livsmanual')?.vedlikeholdFiler || []);
    
    if (Storage.updateSection('livsmanual', livsmanual)) {
        showSuccess();
    }
}

// ===== ETTERLATTEPROFILER =====
function loadEtterlatte() {
    const profiler = Storage.getItems('etterlatte');
    
    const html = `
        <div class="section">
            <h1 class="section-title">🔐 Etterlatteprofiler</h1>
            <p class="section-description">
                Bestem hvem som får tilgang til hvilken informasjon. 
                Opprett profiler for dine nærmeste.
            </p>

            <div class="success-message" id="successMessage">Profil lagret!</div>

            <div class="form-section">
                <h3>Opprett ny profil</h3>
                <form id="etterlatteForm" onsubmit="saveEtterlatte(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Navn</label>
                            <input type="text" name="navn" required>
                        </div>
                        <div class="form-group">
                            <label>Relasjon</label>
                            <select name="relasjon">
                                <option value="Ektefelle">Ektefelle</option>
                                <option value="Barn">Barn</option>
                                <option value="Forelder">Forelder</option>
                                <option value="Søsken">Søsken</option>
                                <option value="Venn">Venn</option>
                                <option value="Annet">Annet</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>E-post</label>
                            <input type="email" name="epost">
                        </div>
                        <div class="form-group">
                            <label>Telefon</label>
                            <input type="tel" name="telefon">
                        </div>
                    </div>
                    
                    <h4 style="color: var(--gold); margin: 1.5rem 0 1rem;">Tilgang til kategorier:</h4>
                    <div class="access-grid">
                        <div class="access-item">
                            <input type="checkbox" name="access_kontakter" id="acc_kontakter">
                            <label for="acc_kontakter">Kontakter</label>
                        </div>
                        <div class="access-item">
                            <input type="checkbox" name="access_abonnementer" id="acc_abonnementer">
                            <label for="acc_abonnementer">Abonnementer</label>
                        </div>
                        <div class="access-item">
                            <input type="checkbox" name="access_krypto" id="acc_krypto">
                            <label for="acc_krypto">Kryptovaluta</label>
                        </div>
                        <div class="access-item">
                            <input type="checkbox" name="access_forsikringer" id="acc_forsikringer">
                            <label for="acc_forsikringer">Forsikringer</label>
                        </div>
                        <div class="access-item">
                            <input type="checkbox" name="access_bank" id="acc_bank">
                            <label for="acc_bank">Bank</label>
                        </div>
                        <div class="access-item">
                            <input type="checkbox" name="access_eiendommer" id="acc_eiendommer">
                            <label for="acc_eiendommer">Eiendommer</label>
                        </div>
                        <div class="access-item">
                            <input type="checkbox" name="access_kjoretoy" id="acc_kjoretoy">
                            <label for="acc_kjoretoy">Kjøretøy</label>
                        </div>
                        <div class="access-item">
                            <input type="checkbox" name="access_digitalt" id="acc_digitalt">
                            <label for="acc_digitalt">Digitalt liv</label>
                        </div>
                        <div class="access-item">
                            <input type="checkbox" name="access_dokumenter" id="acc_dokumenter">
                            <label for="acc_dokumenter">Dokumenter</label>
                        </div>
                        <div class="access-item">
                            <input type="checkbox" name="access_minner" id="acc_minner">
                            <label for="acc_minner">Minner</label>
                        </div>
                        <div class="access-item">
                            <input type="checkbox" name="access_livsmanual" id="acc_livsmanual">
                            <label for="acc_livsmanual">Livsmanual</label>
                        </div>
                    </div>

                    <div class="form-group" style="margin-top: 1.5rem;">
                        <label>Personlig budskap til denne personen</label>
                        <textarea name="budskap" rows="4" placeholder="Skriv et personlig budskap..."></textarea>
                    </div>

                    <button type="submit" class="btn-primary">Lagre profil</button>
                </form>
            </div>

            <div class="item-list">
                <h3 style="color: var(--gold); margin-bottom: 1rem;">Etterlatteprofiler (${profiler.length})</h3>
                ${profiler.length === 0 ? `
                    <div class="empty-state">
                        <div class="empty-state-icon">🔐</div>
                        <h3>Ingen profiler opprettet</h3>
                        <p>Opprett profiler for de som skal ha tilgang</p>
                    </div>
                ` : profiler.map(profil => `
                    <div class="profile-card">
                        <div class="profile-header">
                            <div class="profile-name">${profil.navn}</div>
                            <button class="btn-icon" onclick="deleteItem('etterlatte', '${profil.id}')">🗑️ Slett</button>
                        </div>
                        <p style="color: var(--warm-gold); margin-bottom: 1rem;">
                            <strong>Relasjon:</strong> ${profil.relasjon} | 
                            ${profil.epost ? `<strong>E-post:</strong> ${profil.epost}` : ''} ${profil.telefon ? `| <strong>Tlf:</strong> ${profil.telefon}` : ''}
                        </p>
                        ${profil.budskap ? `
                            <p style="color: var(--light-gold); margin-bottom: 1rem; padding: 1rem; background: rgba(212, 175, 55, 0.08); border-radius: 8px;">
                                <strong>Budskap:</strong><br>${profil.budskap}
                            </p>
                        ` : ''}
                        <div>
                            <p style="color: var(--gold); margin-bottom: 0.5rem;"><strong>Har tilgang til:</strong></p>
                            <div class="access-grid">
                                ${Object.keys(profil.tilgang || {}).filter(k => profil.tilgang[k]).map(k => `
                                    <span style="background: rgba(212, 175, 55, 0.2); padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.9rem;">
                                        ${k.replace('access_', '').charAt(0).toUpperCase() + k.replace('access_', '').slice(1)}
                                    </span>
                                `).join('')}
                            </div>
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
    const form = e.target;
    const formData = new FormData(form);
    
    const tilgang = {};
    for (let [key, value] of formData.entries()) {
        if (key.startsWith('access_')) {
            tilgang[key] = true;
        }
    }
    
    const profil = {
        navn: formData.get('navn'),
        relasjon: formData.get('relasjon'),
        epost: formData.get('epost'),
        telefon: formData.get('telefon'),
        budskap: formData.get('budskap'),
        tilgang: tilgang
    };
    
    if (Storage.addItem('etterlatte', profil)) {
        showSuccess();
        form.reset();
        loadEtterlatte();
    }
}

// ===== AKTIVERING =====
function loadAktivering() {
    const data = Storage.getSection('aktivering') || {
        inaktivitetDager: 180,
        betroddKontakt: null,
        varslingskontakter: []
    };
    
    const html = `
        <div class="section">
            <h1 class="section-title">⏳ Aktivering av arven</h1>
            <p class="section-description">
                Konfigurer hvordan og når din digitale arv skal aktiveres.
            </p>

            <div class="success-message" id="successMessage">Innstillinger lagret!</div>

            <form id="aktiveringForm" onsubmit="saveAktivering(event)">
                <div class="activation-card">
                    <h3>📵 Manglende livstegn <span class="status-badge status-active">Aktiv</span></h3>
                    <p style="color: var(--warm-gold); margin-bottom: 1.5rem;">
                        Automatisk varsling hvis du ikke logger inn på en stund.
                    </p>
                    <div class="form-group">
                        <label>Antall dager uten innlogging før varsling</label>
                        <input type="number" name="inaktivitetDager" value="${data.inaktivitetDager}" min="30" max="730">
                        <p style="color: var(--warm-gold); font-size: 0.9rem; margin-top: 0.5rem;">
                            Standard: 180 dager (6 måneder)
                        </p>
                    </div>
                </div>

                <div class="activation-card">
                    <h3>✋ 2 av 3 bekreftelse <span class="status-badge ${data.varslingskontakter.length >= 3 ? 'status-active' : 'status-inactive'}">
                        ${data.varslingskontakter.length >= 3 ? 'Aktiv' : 'Inaktiv'}
                    </span></h3>
                    <p style="color: var(--warm-gold); margin-bottom: 1.5rem;">
                        Minimum 2 av 3 utvalgte personer må bekrefte før aktivering.
                    </p>
                    <div id="varslingskontakter">
                        ${[1, 2, 3].map(i => {
                            const kontakt = data.varslingskontakter[i-1] || {};
                            return `
                                <div class="form-row" style="margin-bottom: 1rem;">
                                    <div class="form-group">
                                        <label>Kontakt ${i} - Navn</label>
                                        <input type="text" name="kontakt${i}_navn" value="${kontakt.navn || ''}" placeholder="Fullt navn">
                                    </div>
                                    <div class="form-group">
                                        <label>E-post</label>
                                        <input type="email" name="kontakt${i}_epost" value="${kontakt.epost || ''}" placeholder="e-post@example.com">
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <div class="activation-card">
                    <h3>🤝 Betrodd pårørende <span class="status-badge ${data.betroddKontakt ? 'status-active' : 'status-inactive'}">
                        ${data.betroddKontakt ? 'Aktiv' : 'Inaktiv'}
                    </span></h3>
                    <p style="color: var(--warm-gold); margin-bottom: 1.5rem;">
                        Én person du stoler fullt på kan aktivere tilgangen.
                    </p>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Navn på betrodd person</label>
                            <input type="text" name="betrodd_navn" value="${data.betroddKontakt?.navn || ''}" placeholder="Fullt navn">
                        </div>
                        <div class="form-group">
                            <label>E-post</label>
                            <input type="email" name="betrodd_epost" value="${data.betroddKontakt?.epost || ''}" placeholder="e-post@example.com">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Telefon</label>
                        <input type="tel" name="betrodd_telefon" value="${data.betroddKontakt?.telefon || ''}" placeholder="+47 xxx xx xxx">
                    </div>
                </div>

                <div class="activation-card">
                    <h3>📜 Manuell aktivering <span class="status-badge status-active">Alltid tilgjengelig</span></h3>
                    <p style="color: var(--warm-gold);">
                        Pårørende kan kontakte oss med dødsattest for å få tilgang. 
                        Denne metoden er alltid tilgjengelig som backup.
                    </p>
                </div>

                <button type="submit" class="btn-primary" style="margin-top: 2rem;">Lagre innstillinger</button>
            </form>
        </div>
    `;
    
    document.getElementById('mainContent').innerHTML = html;
}

function saveAktivering(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    const varslingskontakter = [];
    for (let i = 1; i <= 3; i++) {
        const navn = formData.get(`kontakt${i}_navn`);
        const epost = formData.get(`kontakt${i}_epost`);
        if (navn && epost) {
            varslingskontakter.push({ navn, epost });
        }
    }
    
    const betroddNavn = formData.get('betrodd_navn');
    const betroddEpost = formData.get('betrodd_epost');
    
    const aktivering = {
        inaktivitetDager: parseInt(formData.get('inaktivitetDager')),
        betroddKontakt: (betroddNavn && betroddEpost) ? {
            navn: betroddNavn,
            epost: betroddEpost,
            telefon: formData.get('betrodd_telefon')
        } : null,
        varslingskontakter: varslingskontakter
    };
    
    if (Storage.updateSection('aktivering', aktivering)) {
        showSuccess();
        loadAktivering();
    }
}

// ===== UTILITY FUNCTIONS =====
function deleteItem(category, itemId) {
    if (confirm('Er du sikker på at du vil slette denne?')) {
        if (Storage.deleteItem(category, itemId)) {
            loadSection(currentSection);
        }
    }
}

function showSuccess() {
    const msg = document.getElementById('successMessage');
    if (msg) {
        msg.classList.add('show');
        setTimeout(() => msg.classList.remove('show'), 3000);
    }
}

function displayFileNames(elementId, files) {
    const element = document.getElementById(elementId);
    if (element && files.length > 0) {
        const fileNames = Array.from(files).map(f => f.name).join(', ');
        element.textContent = `Valgt: ${fileNames}`;
        element.style.color = 'var(--gold)';
    }
}
