/* ═══════════════════════════════════════════════════════════
   APPI PRO — app.js
   Sécurité, Authentification, Session & Progression
═══════════════════════════════════════════════════════════ */

// Palette de couleurs issues du logo parapente.pro
const BRAND_COLORS = {
    pink: '#E3025C',
    gold: '#FFB800',
    blue: '#38BDF8',
    dark: '#0A0D14'
};

const APPI_LEVELS = {
    student: {
        id: 'student',
        label: 'Student',
        color: 'brand-pink',
        badgeClass: 'badge-student',
        order: 0,
        desc: 'Premiers pas dans le vol libre. Gonflage au sol, pente école et premiers vols solo en conditions calmes.'
    },
    pilot: {
        id: 'pilot',
        label: 'Pilot',
        color: 'brand-blue',
        badgeClass: 'badge-pilot',
        order: 1,
        desc: 'Pilote autonome en conditions calmes à modérées. Maîtrise des thermiques et des manœuvres de base.'
    },
    expert: {
        id: 'expert',
        label: 'Expert',
        color: 'brand-gold',
        badgeClass: 'badge-expert',
        order: 2,
        desc: 'Pilote de cross (XC) et de performance. Vol en conditions fortes, maîtrise du pilotage actif et du SIV.'
    },
    instructor: {
        id: 'instructor',
        label: 'Instructor',
        color: 'brand-purple',
        badgeClass: 'badge-instructor',
        order: 3,
        desc: 'Enseignement théorique et pratique. Encadrement d\'élèves en école et validation des niveaux APPI.'
    },
    master: {
        id: 'master',
        label: 'Master',
        color: 'brand-red',
        badgeClass: 'badge-master',
        order: 4,
        desc: 'Expert pédagogique de haut niveau. Formation des instructeurs et audits de sécurité.'
    },
};

const APPI_EXERCISES = {
    student: [
        { id: 's1',  name: 'Gonfler la voile face à la pente',        desc: 'Montée de l\'aile propre, symétrique, contrôle visuel.' },
        { id: 's2',  name: 'Gonfler la voile dos à la pente',         desc: 'Technique de gonflage inversé (face voile), freins maintenus.' },
        { id: 's3',  name: 'Freinage et équilibre sol',               desc: 'Comprendre la plage de freinage, garder l\'aile au-dessus de la tête.' },
        { id: 's4',  name: 'Premiers vols en pente école',            desc: 'Décollage propre, maintien de la trajectoire, posé doux sur les pieds.' },
        { id: 's5',  name: 'Virage à plat coordonné',                 desc: 'Virages à gauche et droite à 90° et 180° sans roulis excessif.' },
        { id: 's6',  name: 'Contrôle de la vitesse',                  desc: 'Utilisation de la plage de vitesse (bras hauts, taux de chute mini).' },
        { id: 's7',  name: 'Utilisation de l\'accélérateur',          desc: 'Compréhension du système, poussée symétrique et relâchement progressif.' },
        { id: 's8',  name: 'Atterrissage de précision (PTU)',         desc: 'Planification de l\'approche en U et finale face au vent.' },
        { id: 's9',  name: 'Reconnaissance de la pré-dépression',     desc: 'Reconnaître le point de contact et la phase de parachutale.' },
        { id: 's10', name: 'Théorie : Aérologie & Mécanique de vol',  desc: 'QCM théorique validé avec succès (règles de l\'air de base).' },
    ],
    pilot: [
        { id: 'p1',  name: 'Exploitation du thermique',              desc: 'Entrée, centrage et enroulement d\'une ascendance thermique.' },
        { id: 'p2',  name: 'Vol de pente (Soaring)',                  desc: 'Gestion des trajectoires par rapport au relief et aux autres voiles.' },
        { id: 'p3',  name: 'Fermeture asymétrique provoquée (SIV)',   desc: 'Gestion d\'une fermeture à 50% avec maintien du cap à la sellette.' },
        { id: 'p4',  name: 'Fermeture frontale (SIV)',                desc: 'Gestion d\'une fermeture frontale, maintien du cap et réouverture.' },
        { id: 'p5',  name: 'Reconnaissance du point de décrochage',   desc: 'Marche arrière contrôlée en milieu sécurisé (SIV).' },
        { id: 'p6',  name: 'Spirale 360° rapide et sortie propre',    desc: 'Descente rapide contrôlée, sortie dissipée sur un tour.' },
        { id: 'p7',  name: 'Oreilles et accélérateur associés',       desc: 'Mise en oreilles, accélération, relâchement et réouverture.' },
        { id: 'p8',  name: 'Décrochage aux B (B-stall)',              desc: 'Mise en place, maintien de la descente stable et sortie franche.' },
        { id: 'p9',  name: 'Gestion active de la turbulence',         desc: 'Pilotage actif aux freins et à la sellette pour maintenir l\'aile ouverte.' },
        { id: 'p10', name: 'Lancement du secours au sol',             desc: 'Simulation sous portique d\'extraction rapide du parachute.' },
    ],
    expert: [
        { id: 'e1',  name: 'Décrochage complet et reconstruction',    desc: 'Stabilisation en parachutale, marche arrière et reconstruction propre.' },
        { id: 'e2',  name: 'Mise en SAT (Spiral Axis Turn)',          desc: 'Manœuvre de voltige de base : axe de rotation entre pilote et voile.' },
        { id: 'e3',  name: 'Fermeture asymétrique accélérée (SIV)',   desc: 'Fermeture à 70% au premier barreau de l\'accélérateur.' },
        { id: 'e4',  name: 'Wingover rythmés et amples',              desc: 'Enchaînement de virages au-dessus de l\'aile avec cadencement parfait.' },
        { id: 'e5',  name: 'Vol de cross XC (50 km validés)',         desc: 'Vol de distance planifié avec analyse météo et atterrissage de campagne.' },
        { id: 'e6',  name: 'Gestion de l\'espace aérien complexe',    desc: 'Lecture des cartes aéronautiques, intégration des TMA et CTR.' },
        { id: 'e7',  name: 'Topographie de montagne avancée',        desc: 'Compréhension des brises de vallée, vents météo et confluences.' },
        { id: 'e8',  name: 'Survie en vol et secours',                desc: 'Trousses d\'urgence, communication satellite, premiers secours.' },
    ],
    instructor: [
        { id: 'i1',  name: 'Pédagogie pratique pente école',          desc: 'Méthodes de guidage d\'élèves en exercices au sol.' },
        { id: 'i2',  name: 'Guidage radio en grand vol',              desc: 'Prise en charge radio d\'élèves en phase d\'approche et finale.' },
        { id: 'i3',  name: 'Analyse et debriefing vidéo',             desc: 'Correction technique des gestes clés à partir d\'enregistrements.' },
        { id: 'i4',  name: 'Conception de QCM et cours théoriques',   desc: 'Préparation et animation d\'un module théorique météo/matériel.' },
        { id: 'i5',  name: 'Gestion de crise & plan d\'alerte',       desc: 'Connaissance parfaite des secours locaux, hélitreuillage et secours.' },
    ],
    master: [
        { id: 'm1',  name: 'Supervision d\'instructeurs stagiaires',  desc: 'Évaluation pédagogique et debriefing des futurs moniteurs.' },
        { id: 'm2',  name: 'Création de nouveaux manuels APPI',       desc: 'Rédaction d\'articles de recherche ou fiches techniques de référence.' },
        { id: 'm3',  name: 'Expertise accidentologie et SIV',         desc: 'Analyse d\'incidents réels et propositions correctives.' },
    ]
};

// Seed de pilotes si la base est vide
const SEED_PILOTS = [
    {
        id: 1,
        prenom: "Lucas",
        nom: "Martin",
        email: "lucas.martin@example.com",
        tel: "06 87 65 43 21",
        niveau: "student",
        notes: "Lucas progresse vite. Très bon gonflage au sol. Prêt pour ses premiers grands vols de la saison en thermique calme.",
        exercices: {
            student: ["s1", "s2", "s3", "s4", "s5", "s6"]
        },
        dateAjout: "2026-05-12T14:32:00Z"
    },
    {
        id: 2,
        prenom: "Sarah",
        nom: "Bernier",
        email: "sarah.b@example.com",
        tel: "06 45 98 76 12",
        niveau: "pilot",
        notes: "Sarah prépare son voyage SIV pour le Lac de Garde. Elle maîtrise bien le soaring mais doit travailler ses fermetures asymétriques.",
        exercices: {
            student: ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10"],
            pilot: ["p1", "p2", "p7", "p10"]
        },
        dateAjout: "2026-03-10T10:15:00Z"
    },
    {
        id: 3,
        prenom: "Stéphane",
        nom: "Lefèvre",
        email: "steph.lefevre@example.com",
        tel: "07 12 34 56 78",
        niveau: "expert",
        notes: "Pilote expérimenté de l'école. Vise le niveau d'Instructeur cette année. Matériel : Enzo 3 / Woody Valley XR7.",
        exercices: {
            student: ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10"],
            pilot: ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10"],
            expert: ["e1", "e3", "e4", "e5", "e6", "e7"]
        },
        dateAjout: "2025-09-18T16:45:00Z"
    }
];

// Base d'utilisateurs pour l'authentification
const USER_ACCOUNTS = [
    { email: 'henry@parapente.pro', password: 'admin123', prenom: 'Stéphane', nom: 'Henry', role: 'instructor', pilotId: null },
    { email: 'lucas.martin@example.com', password: 'student123', prenom: 'Lucas', nom: 'Martin', role: 'student', pilotId: 1 },
    { email: 'sarah.b@example.com', password: 'student123', prenom: 'Sarah', nom: 'Bernier', role: 'student', pilotId: 2 },
    { email: 'steph.lefevre@example.com', password: 'student123', prenom: 'Stéphane', nom: 'Lefèvre', role: 'student', pilotId: 3 }
];

const DB_KEY = 'appi_pro_data';
const SESSION_USER_KEY = 'appi_pro_session_user';
const REMEMBER_USER_KEY = 'appi_pro_remember_user';

function loadData() {
    try {
        const raw = localStorage.getItem(DB_KEY);
        if (!raw) {
            const initial = { pilotes: SEED_PILOTS, nextId: 4 };
            saveData(initial);
            return initial;
        }
        return JSON.parse(raw);
    } catch {
        return { pilotes: SEED_PILOTS, nextId: 4 };
    }
}

function saveData(data) {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
}

/* ════════════════════════════════════════════
   AUTHENTIFICATION & SESSIONS
════════════════════════════════════════════ */

function login(email, password, rememberMe = false) {
    const user = USER_ACCOUNTS.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
        throw new Error("Identifiant ou mot de passe incorrect.");
    }
    
    // Sauvegarder dans la session active
    sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
    
    if (rememberMe) {
        localStorage.setItem(REMEMBER_USER_KEY, JSON.stringify(user));
    } else {
        localStorage.removeItem(REMEMBER_USER_KEY);
    }
    return user;
}

function logout() {
    sessionStorage.removeItem(SESSION_USER_KEY);
    localStorage.removeItem(REMEMBER_USER_KEY);
    showToast("Déconnexion réussie.", "info");
    setTimeout(() => {
        location.href = 'login.html';
    }, 500);
}

function getCurrentUser() {
    // Vérifier d'abord la session active
    let raw = sessionStorage.getItem(SESSION_USER_KEY);
    if (raw) return JSON.parse(raw);

    // Vérifier ensuite le "Se souvenir de moi"
    raw = localStorage.getItem(REMEMBER_USER_KEY);
    if (raw) {
        // Restaurer dans la session courante
        sessionStorage.setItem(SESSION_USER_KEY, raw);
        return JSON.parse(raw);
    }
    return null;
}

// Rôle calculé dynamiquement par rapport à l'utilisateur connecté
function getCurrentRole() {
    const user = getCurrentUser();
    return user ? user.role : 'guest';
}

function getSelectedStudentId() {
    const user = getCurrentUser();
    return (user && user.role === 'student') ? user.pilotId : null;
}

/* ════════════════════════════════════════════
   VERIFICATION SECURITE ACCES
════════════════════════════════════════════ */
function checkAuth() {
    const user = getCurrentUser();
    const path = window.location.pathname;
    const isLoginPage = path.includes('login.html');
    const isPublicPage = path.includes('index.html') || path === '/' || path === '' || path.endsWith('appi-pro/');

    if (!user && !isLoginPage && !isPublicPage) {
        // Rediriger vers la connexion si page privée
        window.location.href = 'login.html';
    }
}

function getPiloteProgress(pilote) {
    const result = {};
    for (const [lvl, exos] of Object.entries(APPI_EXERCISES)) {
        const done = (pilote.exercices?.[lvl] || []).length;
        result[lvl] = { done, total: exos.length, pct: Math.round((done / exos.length) * 100) };
    }
    return result;
}

function getGlobalProgress(pilote) {
    let done = 0, total = 0;
    for (const [lvl, exos] of Object.entries(APPI_EXERCISES)) {
        done  += (pilote.exercices?.[lvl] || []).length;
        total += exos.length;
    }
    return { done, total, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
}

const AVATAR_COLORS = ['brand-pink', 'brand-blue', 'brand-gold', 'brand-purple', 'brand-red'];
function avatarColor(idx) { return AVATAR_COLORS[idx % AVATAR_COLORS.length]; }

function initials(nom, prenom) {
    return ((prenom?.[0] || '') + (nom?.[0] || '')).toUpperCase() || '?';
}

function showToast(msg, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const icons = {
        success: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
        error:   '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
        info:    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    };
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = icons[type] + `<span>${msg}</span>`;
    container.appendChild(t);
    setTimeout(() => t.style.opacity = '0', 2800);
    setTimeout(() => t.remove(), 3100);
}

// Injection des boutons de déconnexion et infos profils dans la barre latérale/topbar
function injectSessionUI() {
    const user = getCurrentUser();
    if (!user) return;

    // 1. Bouton Déconnexion dans la Topbar
    const bar = document.querySelector('.topbar-right');
    if (bar) {
        const oldLog = document.getElementById('logout-btn-container');
        if (oldLog) oldLog.remove();

        const logContainer = document.createElement('div');
        logContainer.id = 'logout-btn-container';
        logContainer.className = 'flex items-center gap-2';

        const profileName = document.createElement('span');
        profileName.style.fontSize = '0.82rem';
        profileName.style.fontWeight = '600';
        profileName.style.color = 'var(--text-white)';
        profileName.textContent = `${user.prenom} (${user.role === 'instructor' ? 'Instructeur' : 'Élève'})`;
        logContainer.appendChild(profileName);

        const btnLogout = document.createElement('button');
        btnLogout.className = 'btn btn-secondary btn-sm';
        btnLogout.textContent = 'Déconnexion';
        btnLogout.onclick = logout;
        logContainer.appendChild(btnLogout);

        bar.appendChild(logContainer);
    }

    // 2. Info utilisateur en bas de la sidebar
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        const footer = document.querySelector('.sidebar-footer');
        const oldUserCard = document.getElementById('sidebar-user-card');
        if (oldUserCard) oldUserCard.remove();

        const userCard = document.createElement('div');
        userCard.id = 'sidebar-user-card';
        userCard.style.padding = '14px 20px';
        userCard.style.borderTop = '1px solid var(--border)';
        userCard.style.background = 'var(--bg-card-hover)';
        userCard.style.display = 'flex';
        userCard.style.alignItems = 'center';
        userCard.style.gap = '12px';

        const colorClass = user.role === 'instructor' ? 'avatar-brand-purple' : 'avatar-brand-pink';
        userCard.innerHTML = `
            <div class="avatar ${colorClass}" style="width:32px; height:32px; font-size:0.75rem;">${initials(user.nom, user.prenom)}</div>
            <div style="flex:1; min-width:0; text-align:left;">
                <div style="font-size:0.8rem; font-weight:700; color:var(--text-white); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${user.prenom} ${user.nom}</div>
                <div style="font-size:0.68rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.04em;">${user.role === 'instructor' ? 'Instructeur' : 'Élève'}</div>
            </div>
        `;
        sidebar.insertBefore(userCard, footer);
    }
}

function applyRoleVisibility() {
    const role = getCurrentRole();
    document.body.classList.remove('role-instructor', 'role-student', 'role-guest');
    document.body.classList.add(`role-${role}`);

    document.querySelectorAll('.instructor-only').forEach(el => {
        el.style.setProperty('display', role === 'instructor' ? '' : 'none', 'important');
    });
    document.querySelectorAll('.student-only').forEach(el => {
        el.style.setProperty('display', role === 'student' ? '' : 'none', 'important');
    });
}

// Initialisation globale de la page
checkAuth();

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    injectSessionUI();
    applyRoleVisibility();
});
