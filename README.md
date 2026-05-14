# &lt;BZB /&gt; — Portfolio de Brahim Zakaria Brahim

Portfolio web professionnel — Développeur Full-Stack · Django · IA  
Déployé sur **GitHub Pages** · Aucun framework · Aucune dépendance externe

---

## Aperçu

Ce portfolio est un site statique (HTML / CSS / JavaScript vanilla) conçu pour être :
- Déployé gratuitement sur GitHub Pages
- Chargé rapidement (aucun bundle, aucune dépendance npm)
- Facilement modifiable sans outils de build
- Responsive sur mobile, tablette et desktop
- Accessible (ARIA, focus visible, reduced-motion)

---

## Structure des fichiers

```
portfolio/
│
├── index.html                 ← Page principale (unique fichier HTML)
│
├── css/
│   ├── style.css              ← Variables, reset, layout, composants, responsive
│   └── animations.css         ← Scroll reveals, keyframes, transitions
│
├── js/
│   ├── theme.js               ← Toggle dark/light mode (chargé en priorité)
│   └── main.js                ← Toutes les interactions (loader, cursor, typing…)
│
├── assets/
│   ├── favicon.svg            ← Icône de l'onglet navigateur
│   ├── photo.jpg              ← ⚠️  À AJOUTER : votre photo professionnelle
│   ├── cv-brahim-zakaria.pdf  ← ⚠️  À AJOUTER : votre CV en PDF
│   └── og-preview.png         ← ⚠️  À AJOUTER : image de prévisualisation réseaux sociaux (1200×630px)
│
└── README.md                  ← Ce fichier
```

---

## Mise en place locale

### Prérequis

Aucun outil d'installation requis. Un navigateur suffit.

### Étape 1 — Cloner ou copier le projet

Si vous utilisez Git :
```bash
git clone https://github.com/Brahim-2003/Brahim-2003.github.io.git
cd Brahim-2003.github.io
```

Ou copiez simplement le dossier `portfolio/` sur votre machine.

### Étape 2 — Ajouter vos fichiers personnels

Placez ces trois fichiers dans le dossier `assets/` :

| Fichier | Description | Recommandation |
|---|---|---|
| `photo.jpg` | Votre photo professionnelle | 400×400px minimum, format carré |
| `cv-brahim-zakaria.pdf` | Votre CV au format PDF | Nommé exactement ainsi |
| `og-preview.png` | Aperçu pour les partages sur réseaux sociaux | 1200×630px |

> **Sans photo**, le site affiche automatiquement vos initiales **BZB** avec un fond dégradé. Le site fonctionne parfaitement sans ces fichiers.

### Étape 3 — Ouvrir le site en local

**Méthode simple (double-clic) :**  
Ouvrez `index.html` directement dans votre navigateur. Tout fonctionne sans serveur.

**Méthode recommandée (Live Server) :**  
Si vous utilisez VS Code, installez l'extension **Live Server**, faites un clic droit sur `index.html` → *Open with Live Server*. Vous obtenez le rechargement automatique à chaque modification.

**Via Python (si installé) :**
```bash
cd portfolio
python -m http.server 8000
# Ouvrez http://localhost:8000 dans le navigateur
```

---

## Déploiement sur GitHub Pages

### Option A — Dépôt de type `username.github.io` (recommandée)

C'est la méthode la plus simple. L'URL finale sera `https://brahim-2003.github.io/`.

**Étape 1 — Créer le dépôt**

Sur GitHub, créez un nouveau dépôt nommé exactement :
```
Brahim-2003.github.io
```
> Le nom doit correspondre exactement à votre nom d'utilisateur GitHub.

**Étape 2 — Pousser le code**

```bash
# Dans le dossier portfolio/
git init
git add .
git commit -m "Initial commit — Portfolio BZB"
git branch -M main
git remote add origin https://github.com/Brahim-2003/Brahim-2003.github.io.git
git push -u origin main
```

**Étape 3 — Activer GitHub Pages**

1. Sur GitHub, allez dans votre dépôt → **Settings**
2. Dans le menu de gauche, cliquez sur **Pages**
3. Sous *Source*, sélectionnez **Deploy from a branch**
4. Branch : **main** · Folder : **/ (root)**
5. Cliquez sur **Save**

Votre site sera disponible à l'adresse `https://brahim-2003.github.io/` dans 1 à 3 minutes.

---

### Option B — Dépôt classique (si vous avez déjà un dépôt `username.github.io`)

L'URL finale sera `https://brahim-2003.github.io/portfolio/`.

```bash
git init
git add .
git commit -m "Initial commit — Portfolio BZB"
git branch -M main
git remote add origin https://github.com/Brahim-2003/portfolio.git
git push -u origin main
```

Activez GitHub Pages dans Settings → Pages, branch `main`, folder `/ (root)`.

---

## Activer le formulaire de contact (optionnel)

Par défaut, le formulaire ouvre le client email de l'utilisateur (mailto). Pour recevoir les messages directement dans votre boîte Gmail sans aucun backend :

**Service recommandé : FormSubmit.co (gratuit)**

1. Ouvrez `js/main.js`
2. Trouvez la section `── TO ACTIVATE REAL FORM SUBMISSION ──`
3. Décommentez le bloc `fetch(...)` et supprimez le bloc `setTimeout` / `mailto`
4. Visitez `https://formsubmit.co/brahimzakariabrahimbzb@gmail.com` une première fois pour activer votre adresse (un email de confirmation vous sera envoyé)

---

## Personnalisation rapide

### Changer la couleur d'accent

Ouvrez `css/style.css`, modifiez ces trois variables dans `:root` :
```css
--accent:       #0066FF;   /* couleur principale */
--accent-light: #3385FF;   /* version claire */
--accent-dark:  #0047CC;   /* version foncée */
```

### Ajouter un nouveau projet

Dans `index.html`, dupliquez l'`<article class="project-card">` existant et remplissez :
- `project-title` — nom du projet
- `project-desc` — description
- `project-stack` — technologies (balises `<span class="stack-tag">`)
- `project-links` — liens GitHub / démo
- `project-badge` — étiquette (ex. "Projet freelance")

### Modifier le typing effect

Dans `js/main.js`, trouvez le tableau `phrases` et modifiez les titres :
```js
const phrases = [
  'Développeur Full-Stack',
  'Développeur Django',
  // Ajoutez ou modifiez ici
];
```

### Ajouter une certification ou expérience

Dans `index.html`, section `#parcours`, dupliquez un `<div class="timeline-item">` et remplissez les champs `timeline-period`, `timeline-title`, `timeline-org`, `timeline-desc`.

---

## Mises à jour futures recommandées

Ces améliorations sont à envisager dès que vous avez plus de contenu à afficher.

**Court terme**
- Ajouter votre photo professionnelle dans `assets/photo.jpg`
- Ajouter votre CV PDF dans `assets/cv-brahim-zakaria.pdf`
- Activer FormSubmit.co pour le formulaire de contact

**Moyen terme**
- Ajouter un deuxième projet dès qu'il est disponible
- Créer une section Blog/Articles si vous publiez du contenu technique
- Ajouter vos premières certifications (AWS, Django, etc.)

**Long terme**
- Ajouter un nom de domaine personnalisé (ex. `brahimzakaria.dev`) — GitHub Pages le supporte nativement dans Settings → Pages → Custom domain
- Traduire le portfolio en anglais pour viser un marché international
- Intégrer Google Analytics pour mesurer les visites

---

## Compatibilité navigateurs

| Navigateur | Support |
|---|---|
| Chrome / Edge 90+ | ✅ Complet |
| Firefox 90+ | ✅ Complet |
| Safari 14+ | ✅ Complet |
| Opera 76+ | ✅ Complet |
| Internet Explorer | ❌ Non supporté |

---

## Contact

**Brahim Zakaria Brahim**  
brahimzakariabrahimbzb@gmail.com  
[github.com/Brahim-2003](https://github.com/Brahim-2003)  
[linkedin.com/in/brahim-zakaria-681063303](https://www.linkedin.com/in/brahim-zakaria-681063303)

---

*Portfolio conçu et développé par Brahim Zakaria Brahim — 2025*