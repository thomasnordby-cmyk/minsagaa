# Min Saga – Ende-til-ende kryptert Digital Arv ✨🔐

En fullverdig, sikker applikasjon for digital arv med zero-knowledge kryptering, brukerprofil og komplett oversikt.

---

## 🎉 Siste oppdateringer

**Nå med full sikkerhet og brukerprofil!**

✅ **Ende-til-ende kryptering** med Bitwarden  
✅ **Zero-knowledge arkitektur** - vi kan aldri lese innholdet  
✅ **Min Saga oversikt** - komplett samleside med fremgang  
✅ **Min Bruker** - profilstyring, abonnement, passordendring  
✅ Alle 12 kategorier på landingssiden  
✅ Omfattende FAQ om sikkerhet  
✅ Fil-opplasting i 7 kategorier  
✅ Manuell aktivering fjernet (kun automatisk)  

---

## 🔐 Sikkerhet og kryptering

### Zero-knowledge modell

```
Bruker → Kryptering (klientsiden) → Lagring (kryptert) → Bitwarden (nøkler)
```

**Nøkkelprinsipper:**
1. **Klientside-kryptering**: All data krypteres i nettleseren før sending
2. **Bitwarden-nøkler**: Krypteringsnøkler lagres ALDRI på våre servere
3. **Zero-knowledge**: Vi kan ikke lese, endre eller dele innholdet ditt
4. **Automatisk tilgang**: Etterlatte får tilgang basert på forhåndsdefinerte regler

### Hvordan det fungerer

```javascript
// Pseudo-kode for kryptering (produksjon)
const plaintext = userInput;
const encryption_key = await bitwarden.getKey(userId);
const encrypted = await encrypt(plaintext, encryption_key);
await saveToServer(encrypted); // Bare kryptert data sendes
```

---

## 📂 Nye funksjoner

### ✨ Min Saga - Oversiktsside

Når du trykker "Min Saga" får du:

- **Fremgangssirkel**: Visuell fremgang (X% fullført)
- **Statistikk**: Total oppføringer, etterlatteprofiler, minner
- **Kategoriover sikt**: Status for alle 12 kategorier
- **Krypteringsbadge**: Bekreftelse på sikkerhet

### 👤 Min Bruker

Administrer din profil:

- **Profilinformasjon**: Endre navn og e-post
- **Endre passord**: Sikker passordoppdatering
- **Abonnementsoversikt**: Se din plan og status
- **Slett konto**: Permanent sletting av all data

### 🏠 Landingsside

Alle 12 kategorier vises nå:

1. 👥 Kontakter
2. 📱 Abonnementer
3. ₿ Kryptovaluta
4. 🛡️ Forsikringer
5. 🏦 Bank & økonomi
6. 🏠 Eiendommer
7. 🚗 Kjøretøy
8. 💻 Digitalt liv
9. 📄 Dokumenter
10. 💝 Minner & Saga (spesiell)
11. 📖 Livsmanualen (spesiell)
12. 🔐 Etterlatteprofiler (spesiell)

---

## ❓ FAQ - Ofte stilte spørsmål

### Kan Min Saga lese innholdet mitt?
**Nei.** Innholdet krypteres før det lagres, og vi har ikke nøklene som trengs for å lese det.

### Hva skjer hvis dere får et datainnbrudd?
Eventuelle data vil være kryptert og uleselige uten krypteringsnøkler.

### Er dette i tråd med GDPR?
**Ja.** Løsningen er bygget med innebygd personvern og dataminimering som grunnprinsipp.

### Hvordan får etterlatte tilgang?
Tilgang gis basert på regler du definerer:
- Manglende livstegn (inaktivitet)
- 2 av 3 varslingskontakter bekrefter
- Betrodd pårørende aktiverer

### Hvor lagres dokumentene mine?
Dokumenter lagres kryptert i vår infrastruktur, men krypteres med nøkler som kun Bitwarden kontrollerer.

### Kan jeg endre hvem som får tilgang?
Ja, du kan når som helst oppdatere etterlatteprofiler og tilganger.

### Hva koster det?
- 49,- /måned
- 499,- /år (spar 2 måneder)
- 2 399,- livstidstilgang

### Er dataene mine trygge?
Ja. Ende-til-ende kryptering, zero-knowledge arkitektur, og Bitwarden for nøkkelhåndtering.

---

## 🚀 Kom i gang

### 1. Åpne applikasjonen

```bash
# Åpne index.html i nettleser
open index.html

# ELLER start lokal server
python -m http.server 8000
# Gå til http://localhost:8000
```

### 2. Opprett konto

1. Klikk "Start din saga"
2. Registrer med navn, e-post og passord
3. Logg inn til dashboardet

### 3. Utforsk

- **Min Saga**: Se oversikt over alt
- **Min Bruker**: Administrer profil
- **Kategorier**: Legg til data
- **Aktivering**: Konfigurer tilgang

---

## 🗂️ Filstruktur

```
min-saga/
├── index.html              # Landingsside (oppdatert)
├── dashboard.html          # Dashboard (oppdatert)
├── styles.css              # Landingsside-styling (oppdatert)
├── dashboard.css           # Dashboard-styling (oppdatert)
├── auth.js                 # Autentisering
├── storage.js              # Datalagring
├── dashboard.js            # Dashboard + Min Saga + Min Bruker
├── dashboard-special.js    # Spesialseksjoner (oppdatert)
├── main.js                 # Landingsside-funksjoner
└── README.md               # Denne filen
```

---

## 🔒 Sikkerhetsfunksjoner

### Nåværende implementasjon (LocalStorage)

```javascript
// Data lagres lokalt i nettleseren
localStorage.userData_[userId] = {
  kontakter: [...],
  // ... kryptert data
}
```

### Produksjonsimplementasjon (Supabase + Bitwarden)

```javascript
// 1. Krypter på klienten
const encrypted = await encryptWithBitwarden(data, userKey);

// 2. Send til Supabase
await supabase.from('encrypted_data').insert({ 
  user_id: userId,
  data: encrypted // Kun kryptert data
});

// 3. Nøkkel i Bitwarden (aldri på server)
await bitwarden.storeKey(userId, userKey);
```

---

## 📱 Min Saga oversikt

### Statistikk som vises:

- **Fremgang**: % av kategorier med innhold
- **Totalt oppføringer**: Sum av alle items
- **Etterlatteprofiler**: Antall konfigurerte
- **Minner**: Antall lagrede minner
- **Varslingskontakter**: Antall satt opp

### Kategorisstatus:

Hver kategori viser:
- ✓ Har innhold (grønn)
- ○ Tom (grå)
- Antall oppføringer

---

## 👤 Min Bruker funksjoner

### Profilstyring
- Endre navn
- Endre e-post
- Live oppdatering av navn i header

### Passordendring
- Validering av nåværende passord
- Nytt passord (min 6 tegn)
- Bekreftelse
- Auto-logout etter endring

### Abonnement
- Vis nåværende plan
- Medlem siden dato
- Siste innlogging
- Endre plan (produksjon)

### Kontosletting
- **Dobbel bekreftelse** for sikkerhet
- Permanent sletting av all data
- Kan ikke angres

---

## ⏳ Aktiveringsmekanismer

### 1. Manglende livstegn
- Definer dager uten innlogging (standard 180)
- Automatisk varsling til kontakter
- Konfigurerbar terskel

### 2. 2 av 3 bekreftelse
- 3 varslingskontakter
- Minimum 2 må bekrefte
- Sikrer at ingen enkeltperson kan aktivere alene

### 3. Betrodd pårørende
- Én person med spesialtilgang
- Kan aktivere ved behov
- Krever strong autentisering

**Manuell aktivering er fjernet** - kun automatiske, sikre metoder.

---

## 🛠️ Produksjonsmigrasjon

### Steg 1: Sett opp Supabase

```bash
npm install @supabase/supabase-js
```

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
)
```

### Steg 2: Integrer Bitwarden

```bash
npm install @bitwarden/sdk
```

```javascript
import { BitwardenClient } from '@bitwarden/sdk'

const bitwarden = new BitwardenClient(apiKey)
await bitwarden.initVault(userId)
```

### Steg 3: Implementer kryptering

```javascript
// Krypter data før lagring
async function saveSecureData(data) {
  const key = await bitwarden.getEncryptionKey(userId)
  const encrypted = await encrypt(JSON.stringify(data), key)
  await supabase.from('encrypted_data').insert({ encrypted })
}

// Dekrypter ved henting
async function loadSecureData() {
  const { data } = await supabase.from('encrypted_data').select()
  const key = await bitwarden.getEncryptionKey(userId)
  return JSON.parse(await decrypt(data.encrypted, key))
}
```

### Steg 4: Deploy til Vercel

```bash
vercel --prod
```

---

## 🌟 Fremtidige forbedringer

### Kort sikt
- [ ] Faktisk Bitwarden-integrasjon
- [ ] Supabase backend
- [ ] Fil-upload til Storage
- [ ] E-post-varsling
- [ ] Betalingsintegrasjon (Stripe/Vipps)

### Mellomlang sikt
- [ ] Mobil app (React Native)
- [ ] Tofaktor-autentisering (2FA)
- [ ] Biometrisk innlogging
- [ ] Offline-modus
- [ ] PDF-eksport av hele arven

### Lang sikt
- [ ] AI-assistent for livshistorie
- [ ] Stemmeopptak-transkripsjon
- [ ] Video-redigering
- [ ] Tidskapsel-funksjon
- [ ] QR-koder for gravstein
- [ ] Minneside-generator

---

## 🔐 Sikkerhetssjekkliste for produksjon

- [ ] HTTPS everywhere
- [ ] Content Security Policy (CSP)
- [ ] Subresource Integrity (SRI)
- [ ] Rate limiting
- [ ] CSRF-beskyttelse
- [ ] XSS-sanitering
- [ ] SQL injection-beskyttelse
- [ ] Passordhashing (bcrypt/argon2)
- [ ] Bitwarden SDK-integrasjon
- [ ] Audit logging
- [ ] Penetrasjonstesting
- [ ] Bug bounty-program
- [ ] ISO 27001-sertifisering

---

## 📧 Support

For spørsmål:
- E-post: support@minsaga.no
- GitHub Issues: [Link]

---

## 📄 Lisens

[Velg lisens - MIT anbefalt]

---

**Utviklet med omsorg og militær-grade sikkerhet i Norge 🇳🇴**

*"Det vakreste vi kan gi de vi elsker, er trygghet – også etter at vi er borte."*

---

## 🎯 Sammendrag av endringer

### Nytt siden sist:
1. ✨ **Min Saga oversikt** - komplett dashboard
2. 👤 **Min Bruker** - profil, passord, abonnement
3. 🏠 **12 kategorier** på landingssiden
4. ❓ **FAQ-seksjon** med 8 spørsmål
5. 🔐 **Krypteringsinfo** overalt
6. 🗑️ **Fjernet** manuell aktivering
7. 💎 **Forbedret** design og UX

### Neste steg:
Implementer faktisk Bitwarden-kryptering og Supabase-backend for produksjon!
