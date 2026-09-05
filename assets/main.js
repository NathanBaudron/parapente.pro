document.addEventListener('DOMContentLoaded', () => {

    // ── Mobile Nav Toggle ──
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // ── Clean Multi-Language Selector (FR, EN, ES — 0 Popups) ──
    initLanguageSelector();

    // ── Navbar Scroll Effect ──
    const navbar = document.getElementById('navbar');
    if (navbar && navbar.classList.contains('transparent')) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.remove('transparent');
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.add('transparent');
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // ── Smooth Scroll for Anchor Links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href').slice(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ── Scroll Indicator ──
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const contenu = document.getElementById('contenu');
            if (contenu) {
                contenu.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ── Page Transition Fade Out ──
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = this.getAttribute('href');
            if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
            if (target && !target.startsWith('#') && !target.startsWith('http') && !target.startsWith('mailto') && !target.startsWith('tel') && this.getAttribute('target') !== '_blank') {
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = target;
                }, 300);
            }
        });
    });

    // ── Contact Form Confirmation ──
    const contactForm = document.querySelector('form[data-contact-form]');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const successMsg = contactForm.querySelector('.form-success');
            if (successMsg) {
                successMsg.classList.add('visible');
                contactForm.reset();
                setTimeout(() => {
                    successMsg.classList.remove('visible');
                }, 5000);
            }
        });
    }

    // ── Interactive Calendar System ──
    initInteractiveCalendar();
});

// ── Bfcache Fix ──
window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
        document.body.classList.remove('fade-out');
    }
});

// ── Clean Native Multi-Language System (FR / EN / ES) ──
const I18N_DICT = {
    en: {
        "Accueil": "Home",
        "L'École (APPI)": "The School (APPI)",
        "Formations": "Courses",
        "Espace PRO": "PRO Area",
        "Calendrier": "Calendar",
        "Tarifs": "Prices",
        "Contact": "Contact",
        "Découvrir nos formations": "Discover our courses",
        "Voir l'Espace PRO": "View PRO Area",
        "En savoir plus": "Learn more",
        "Espace dédié": "Dedicated area",
        "Voir les dates": "View dates",
        "Voir les tarifs": "View prices",
        "Réserver": "Book now",
        "Réserver ce stage": "Book this course",
        "Candidater": "Apply",
        "Nous contacter": "Contact us",
        "Envoyer le message": "Send message",
        "Volez plus haut,<br>volez plus loin": "Fly higher,<br>fly further",
        "École de parapente professionnelle. De l'initiation aux brevets instructeurs, découvrez la progression APPI avec des experts passionnés.": "Professional paragliding school. From beginner courses to instructor certifications, discover APPI progression with passionate experts.",
        "Accès Rapide": "Quick Access",
        "Formations & Stages": "Courses & Clinics",
        "Biplace, stages cross, SIV, voyages et coaching. Tout pour progresser à votre rythme.": "Tandem flights, XC clinics, SIV, trips and coaching. Everything to progress at your own pace.",
        "Filière instructeurs, biplaces commerciaux et formations professionnelles qualifiantes.": "Instructor path, commercial tandem, and professional training.",
        "Consultez toutes les dates de nos prochains stages, séjours et formations professionnelles.": "View all dates for our upcoming courses, trips, and professional training.",
        "Consultez notre grille tarifaire pour le grand public et les professionnels.": "Check our price list for leisure pilots and professionals.",
        "Nos Formations": "Our Courses",
        "Pour les pilotes en quête de progression, de l'initiation au vol de distance.": "For pilots seeking progression, from initiation to cross-country flight.",
        "Biplace — Non commercial": "Tandem — Non-commercial",
        "Formation pour apprendre à voler en biplace dans un cadre associatif ou familial. Partagez votre passion en toute sécurité avec vos proches.": "Training to learn tandem flying in a club or family setting. Share your passion safely with your loved ones.",
        "Stage Cross": "XC Clinic",
        "Apprenez à exploiter les ascendances thermiques, à transiter et à préparer vos vols de distance. Idéal pour valider le niveau Advanced Pilot.": "Learn to use thermals, transition and prepare your cross-country flights. Ideal to validate the Advanced Pilot level.",
        "Stage SIV (Simulation d'Incidents de Vol)": "SIV Clinic (Flight Incidents)",
        "Maîtrisez votre voile dans toutes les configurations : fermetures, autorotation, décrochage. Indispensable pour votre sécurité active.": "Master your glider in all configurations: collapses, autorotation, stalls. Essential for your active safety.",
        "Visio & Théorie": "Online Theory & Webinars",
        "Cours théoriques en visioconférence : météo avancée, lecture des émagrammes, réglementation, préparation mentale.": "Online theory courses: advanced weather, emagram analysis, airspace regulations, mental preparation.",
        "Voyage à la carte": "Custom Trips",
        "Séjours itinérants en France ou à l'étranger. Découvrez de nouveaux sites de vol avec un encadrement professionnel.": "Guided flying trips in France or abroad. Discover new flying sites with professional coaching.",
        "Coaching Individuel": "Individual Coaching",
        "Analyse vidéo, débriefing de traces GPS, accompagnement personnalisé pour atteindre vos objectifs spécifiques.": "Video analysis, GPS track debriefing, personalized guidance to reach your specific goals.",
        "Nos Tarifs": "Our Rates",
        "Des prix transparents pour votre progression APPI, du loisir à la professionnalisation.": "Transparent pricing for your APPI progression, from leisure to professional level.",
        "Tarifs Formations (Loisir)": "Leisure Course Rates",
        "Tarifs Espace PRO": "PRO Area Rates",
        "Calendrier des Stages": "Course Schedule",
        "Consultez le planning mensuel de nos formations loisir et professionnelles pour la saison 2026.": "View the monthly schedule of our leisure and professional training for the 2026 season.",
        "Contactez-nous": "Contact Us",
        "Une question ? Une réservation ? Notre équipe est à votre écoute.": "A question? A booking? Our team is at your service.",
        "Nos Coordonnées": "Contact Details",
        "Envoyez-nous un message": "Send us a message",
        "Le Système Éducatif APPI": "The APPI Educational System",
        "Une progression internationale, standardisée et sécurisée.": "An international, standardized and safe progression.",
        "Espace Professionnel": "Professional Space",
        "Faites de votre passion un métier avec nos formations qualifiantes APPI.": "Turn your passion into a career with our APPI qualifying courses.",
        "Formations Biplace": "Tandem Training",
        "Filière Instructeur APPI": "APPI Instructor Course",
        "Nous rejoindre": "Join Us",
        "Liens utiles": "Useful links",
        "Pratique": "Info",
        "Contact & Accès": "Contact & Access"
    },
    es: {
        "Accueil": "Inicio",
        "L'École (APPI)": "La Escuela (APPI)",
        "Formations": "Cursos",
        "Espace PRO": "Espacio PRO",
        "Calendrier": "Calendario",
        "Tarifs": "Tarifas",
        "Contact": "Contacto",
        "Découvrir nos formations": "Descubrir nuestros cursos",
        "Voir l'Espace PRO": "Ver Espacio PRO",
        "En savoir plus": "Saber más",
        "Espace dédié": "Espacio dedicado",
        "Voir les dates": "Ver fechas",
        "Voir les tarifs": "Ver tarifas",
        "Réserver": "Reservar",
        "Réserver ce stage": "Reservar este curso",
        "Candidater": "Solicitar",
        "Nous contacter": "Contáctanos",
        "Envoyer le message": "Enviar mensaje",
        "Volez plus haut,<br>volez plus loin": "Vuela más alto,<br>vuela más lejos",
        "École de parapente professionnelle. De l'initiation aux brevets instructeurs, découvrez la progression APPI avec des experts passionnés.": "Escuela profesional de parapente. Desde la iniciación hasta las certificaciones de instructor, descubre la progresión APPI con expertos apasionados.",
        "Accès Rapide": "Acceso Rápido",
        "Formations & Stages": "Cursos y Etapas",
        "Biplace, stages cross, SIV, voyages et coaching. Tout pour progresser à votre rythme.": "Vuelos biplaza, cursos XC, SIV, viajes y coaching. Todo para progresar a tu ritmo.",
        "Filière instructeurs, biplaces commerciaux et formations professionnelles qualifiantes.": "Formación de instructores, biplaza comercial y formación profesional.",
        "Consultez toutes les dates de nos prochains stages, séjours et formations professionnelles.": "Consulta todas las fechas de nuestros próximos cursos, viajes y formaciones.",
        "Consultez notre grille tarifaire pour le grand public et les professionnels.": "Consulta nuestras tarifas para particulares y profesionales.",
        "Nos Formations": "Nuestros Cursos",
        "Pour les pilotes en quête de progression, de l'initiation au vol de distance.": "Para pilotos en busca de progresión, desde la iniciación hasta el vuelo de distancia.",
        "Biplace — Non commercial": "Biplaza — No comercial",
        "Formation pour apprendre à voler en biplace dans un cadre associatif ou familial. Partagez votre passion en toute sécurité avec vos proches.": "Formación para aprender a volar en biplaza en un entorno de club o familiar. Comparte tu pasión de forma segura con tus seres queridos.",
        "Stage Cross": "Curso XC Cross",
        "Apprenez à exploiter les ascendances thermiques, à transiter et à préparer vos vols de distance. Idéal pour valider le niveau Advanced Pilot.": "Aprende a aprovechar las térmicas, hacer transiciones y preparar tus vuelos de distancia. Ideal para validar el nivel Advanced Pilot.",
        "Stage SIV (Simulation d'Incidents de Vol)": "Curso SIV (Incidencias de Vuelo)",
        "Maîtrisez votre voile dans toutes les configurations : fermetures, autorotation, décrochage. Indispensable pour votre sécurité active.": "Domina tu vela en todas las configuraciones: colapsos, autorrotación, pérdidas. Indispensable para tu seguridad activa.",
        "Visio & Théorie": "Teoría Online y Webinars",
        "Cours théoriques en visioconférence : météo avancée, lecture des émagrammes, réglementation, préparation mentale.": "Cursos teóricos por videoconferencia: meteorología avanzada, emagramas, normativa y preparación mental.",
        "Voyage à la carte": "Viajes a la carta",
        "Séjours itinérants en France ou à l'étranger. Découvrez de nouveaux sites de vol avec un encadrement professionnel.": "Viajes guiados en Francia o en el extranjero. Descubre nuevos sitios de vuelo con entrenamiento profesional.",
        "Coaching Individuel": "Coaching Individual",
        "Analyse vidéo, débriefing de traces GPS, accompagnement personnalisé pour atteindre vos objectifs spécifiques.": "Análisis de video, debriefing de tracks GPS, acompañamiento personalizado para alcanzar tus objetivos.",
        "Nos Tarifs": "Nuestras Tarifas",
        "Des prix transparents pour votre progression APPI, du loisir à la professionnalisation.": "Precios transparentes para tu progresión APPI, desde el ocio hasta la profesionalización.",
        "Tarifs Formations (Loisir)": "Tarifas de Cursos (Ocio)",
        "Tarifs Espace PRO": "Tarifas Espacio PRO",
        "Calendrier des Stages": "Calendario de Cursos",
        "Consultez le planning mensuel de nos formations loisir et professionnelles pour la saison 2026.": "Consulta la programación mensual de nuestros cursos de ocio y profesionales para la temporada 2026.",
        "Contactez-nous": "Contáctanos",
        "Une question ? Une réservation ? Notre équipe est à votre écoute.": "¿Una pregunta? ¿Una reserva? Nuestro equipo está a tu disposición.",
        "Nos Coordonnées": "Datos de Contacto",
        "Envoyez-nous un message": "Envíanos un mensaje",
        "Le Système Éducatif APPI": "El Sistema Educativo APPI",
        "Une progression internationale, standardisée et sécurisée.": "Una progresión internacional, estandarizada y segura.",
        "Espace Professionnel": "Espacio Profesional",
        "Faites de votre passion un métier avec nos formations qualifiantes APPI.": "Haz de tu pasión tu profesión con nuestros cursos cualificados APPI.",
        "Formations Biplace": "Formación Biplaza",
        "Filière Instructeur APPI": "Curso de Instructor APPI",
        "Nous rejoindre": "Únete a nosotros",
        "Liens utiles": "Enlaces útiles",
        "Pratique": "Práctica",
        "Contact & Accès": "Contacto y Acceso"
    }
};

function initLanguageSelector() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    const LANGS = {
        fr: { code: 'FR', flag: '🇫🇷', name: 'Français' },
        en: { code: 'EN', flag: '🇬🇧', name: 'English' },
        es: { code: 'ES', flag: '🇪🇸', name: 'Español' }
    };

    let currentLang = localStorage.getItem('site_lang') || 'fr';

    const container = document.createElement('div');
    container.className = 'lang-selector';
    container.id = 'lang-selector';

    container.innerHTML = `
        <button class="lang-btn" id="lang-btn" aria-label="Changer de langue">
            <span class="flag">${LANGS[currentLang].flag}</span>
            <span class="lang-code">${LANGS[currentLang].code}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="lang-dropdown" id="lang-dropdown">
            <button class="lang-option ${currentLang === 'fr' ? 'active' : ''}" data-lang="fr"><span class="flag">🇫🇷</span> Français</button>
            <button class="lang-option ${currentLang === 'en' ? 'active' : ''}" data-lang="en"><span class="flag">🇬🇧</span> English</button>
            <button class="lang-option ${currentLang === 'es' ? 'active' : ''}" data-lang="es"><span class="flag">🇪🇸</span> Español</button>
        </div>
    `;

    navLinks.appendChild(container);

    const langBtn = container.querySelector('#lang-btn');
    const dropdown = container.querySelector('#lang-dropdown');
    const options = container.querySelectorAll('.lang-option');

    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        container.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
            container.classList.remove('open');
        }
    });

    options.forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.stopPropagation();
            const lang = opt.dataset.lang;
            if (lang === currentLang) {
                container.classList.remove('open');
                return;
            }
            switchLanguage(lang);
        });
    });

    // Apply saved language on load
    if (currentLang !== 'fr') {
        applyTranslation(currentLang);
    }

    function switchLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('site_lang', lang);
        document.documentElement.lang = lang;

        container.querySelector('.flag').textContent = LANGS[lang].flag;
        container.querySelector('.lang-code').textContent = LANGS[lang].code;
        options.forEach(o => o.classList.toggle('active', o.dataset.lang === lang));
        container.classList.remove('open');

        applyTranslation(lang);
    }

    function applyTranslation(lang) {
        const dict = I18N_DICT[lang];
        const frDict = I18N_DICT['en']; // fallback reference

        // Walk all text nodes and elements to replace matching French strings
        const textElements = document.querySelectorAll('h1, h2, h3, h4, p, a, span, button, th, td, label');

        textElements.forEach(el => {
            // Save original French text in dataset if not present
            if (!el.dataset.origText) {
                el.dataset.origText = el.innerHTML.trim();
            }

            const orig = el.dataset.origText;

            if (lang === 'fr') {
                el.innerHTML = orig;
            } else if (dict && dict[orig]) {
                el.innerHTML = dict[orig];
            } else {
                // Try plain text match
                const plainOrig = orig.replace(/<[^>]*>/g, '').trim();
                if (dict && dict[plainOrig]) {
                    el.textContent = dict[plainOrig];
                }
            }
        });
    }
}

// ── Interactive Calendar Implementation ──
function initInteractiveCalendar() {
    const calContainer = document.getElementById('interactive-calendar');
    if (!calContainer) return;

    const MONTH_NAMES = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    const STAGES_DATA = [
        {
            id: 'stage-initial',
            title: 'Stage Initial (Student)',
            type: 'loisir',
            badgeText: 'Loisir',
            startDate: '2026-05-12',
            endDate: '2026-05-16',
            dateLabel: '12 - 16 Mai 2026',
            level: 'Débutant',
            status: 'Places dispo',
            statusColor: 'var(--green)',
            desc: 'Découverte du matériel, gonflage, pente école et premiers grands vols solo encadrés par radio.'
        },
        {
            id: 'stage-cross',
            title: 'Stage Cross',
            type: 'loisir',
            badgeText: 'Loisir',
            startDate: '2026-06-02',
            endDate: '2026-06-06',
            dateLabel: '02 - 06 Juin 2026',
            level: 'APPI Pilot',
            status: 'Presque complet',
            statusColor: 'var(--brand-gold)',
            desc: 'Exploitation des thermiques, cheminements de distance et analyse météo avancée.'
        },
        {
            id: 'biplace-pro',
            title: 'Biplace PRO (Commercial)',
            type: 'pro',
            badgeText: 'PRO',
            startDate: '2026-06-15',
            endDate: '2026-06-19',
            dateLabel: '15 - 19 Juin 2026',
            level: 'Biplace Non-Co',
            status: 'Places dispo',
            statusColor: 'var(--green)',
            desc: 'Formation APPI Tandem Pro pour piloter en biplace dans un cadre commercial rémunéré.'
        },
        {
            id: 'stage-siv',
            title: 'Stage SIV (Incidents de Vol)',
            type: 'loisir',
            badgeText: 'Loisir',
            startDate: '2026-07-06',
            endDate: '2026-07-08',
            dateLabel: '06 - 08 Juillet 2026',
            level: 'APPI Pilot',
            status: 'Complet',
            statusColor: 'var(--red)',
            desc: 'Pilotage au-dessus du lac avec gilet et bateau de sécurité. Maîtrise des fermetures et décrochages.'
        },
        {
            id: 'assistant-instructeur',
            title: 'Formation Assistant Instructeur',
            type: 'pro',
            badgeText: 'PRO',
            startDate: '2026-08-01',
            endDate: '2026-08-10',
            dateLabel: '01 - 10 Août 2026',
            level: 'Advanced Pilot',
            status: 'Places dispo',
            statusColor: 'var(--green)',
            desc: 'Cursus pédagogique certifiant APPI pour assister un instructeur et encadrer au sol.'
        },
        {
            id: 'voyage-pilat',
            title: 'Voyage à la carte (Dune du Pilat)',
            type: 'loisir',
            badgeText: 'Loisir',
            startDate: '2026-09-12',
            endDate: '2026-09-20',
            dateLabel: '12 - 20 Septembre 2026',
            level: 'Student +',
            status: 'Places dispo',
            statusColor: 'var(--green)',
            desc: 'Soaring et reposse sur la dune. Séjour itinérant guidé pour perfectionner le jeu au sol.'
        }
    ];

    let currentYear = 2026;
    let currentMonth = 4;
    let currentFilter = 'all';
    let currentView = 'grid';
    let selectedStage = null;

    function renderCalendar() {
        calContainer.innerHTML = '';

        const header = document.createElement('div');
        header.className = 'cal-header-bar';

        const monthNav = document.createElement('div');
        monthNav.className = 'cal-month-nav';

        const prevBtn = document.createElement('button');
        prevBtn.className = 'cal-nav-btn';
        prevBtn.setAttribute('aria-label', 'Mois précédent');
        prevBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>';
        prevBtn.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 4) currentMonth = 8;
            renderCalendar();
        });

        const monthLabel = document.createElement('div');
        monthLabel.className = 'cal-current-month';
        monthLabel.textContent = `${MONTH_NAMES[currentMonth]} ${currentYear}`;

        const nextBtn = document.createElement('button');
        nextBtn.className = 'cal-nav-btn';
        nextBtn.setAttribute('aria-label', 'Mois suivant');
        nextBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>';
        nextBtn.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 8) currentMonth = 4;
            renderCalendar();
        });

        monthNav.appendChild(prevBtn);
        monthNav.appendChild(monthLabel);
        monthNav.appendChild(nextBtn);

        const monthTabs = document.createElement('div');
        monthTabs.className = 'cal-month-tabs';

        const seasonMonths = [
            { idx: 4, label: 'Mai' },
            { idx: 5, label: 'Juin' },
            { idx: 6, label: 'Juil' },
            { idx: 7, label: 'Août' },
            { idx: 8, label: 'Sept' }
        ];

        seasonMonths.forEach(m => {
            const tabBtn = document.createElement('button');
            tabBtn.className = `cal-tab-btn ${currentMonth === m.idx ? 'active' : ''}`;
            tabBtn.textContent = m.label;
            tabBtn.addEventListener('click', () => {
                currentMonth = m.idx;
                renderCalendar();
            });
            monthTabs.appendChild(tabBtn);
        });

        const rightControls = document.createElement('div');
        rightControls.style.display = 'flex';
        rightControls.style.gap = '12px';
        rightControls.style.alignItems = 'center';

        const filterBar = document.createElement('div');
        filterBar.className = 'cal-filter-bar';

        const filters = [
            { id: 'all', label: 'Toutes' },
            { id: 'loisir', label: 'Loisir' },
            { id: 'pro', label: 'PRO' }
        ];

        filters.forEach(f => {
            const btn = document.createElement('button');
            btn.className = `cal-filter-btn ${currentFilter === f.id ? 'active' : ''}`;
            btn.dataset.filter = f.id;
            btn.textContent = f.label;
            btn.addEventListener('click', () => {
                currentFilter = f.id;
                renderCalendar();
            });
            filterBar.appendChild(btn);
        });

        const viewSwitch = document.createElement('div');
        viewSwitch.className = 'cal-view-switch';

        const gridViewBtn = document.createElement('button');
        gridViewBtn.className = `cal-view-btn ${currentView === 'grid' ? 'active' : ''}`;
        gridViewBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> Grille';
        gridViewBtn.addEventListener('click', () => {
            currentView = 'grid';
            renderCalendar();
        });

        const listViewBtn = document.createElement('button');
        listViewBtn.className = `cal-view-btn ${currentView === 'list' ? 'active' : ''}`;
        listViewBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg> Liste';
        listViewBtn.addEventListener('click', () => {
            currentView = 'list';
            renderCalendar();
        });

        viewSwitch.appendChild(gridViewBtn);
        viewSwitch.appendChild(listViewBtn);

        rightControls.appendChild(filterBar);
        rightControls.appendChild(viewSwitch);

        header.appendChild(monthNav);
        header.appendChild(monthTabs);
        header.appendChild(rightControls);
        calContainer.appendChild(header);

        const filteredStages = STAGES_DATA.filter(stage => {
            if (currentFilter === 'all') return true;
            return stage.type === currentFilter;
        });

        if (currentView === 'grid') {
            renderGridView(calContainer, currentYear, currentMonth, filteredStages);
        } else {
            renderListView(calContainer, filteredStages);
        }

        if (selectedStage) {
            renderSelectedStageDetail(calContainer, selectedStage);
        }
    }

    function renderGridView(container, year, month, stages) {
        const gridCard = document.createElement('div');
        gridCard.className = 'cal-grid-card';

        const daysHeader = document.createElement('div');
        daysHeader.className = 'cal-days-header';
        const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
        dayNames.forEach(d => {
            const hCell = document.createElement('div');
            hCell.textContent = d;
            daysHeader.appendChild(hCell);
        });
        gridCard.appendChild(daysHeader);

        const monthGrid = document.createElement('div');
        monthGrid.className = 'cal-month-grid';

        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        let startDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7;

        for (let i = startDayOfWeek - 1; i >= 0; i--) {
            const cell = document.createElement('div');
            cell.className = 'cal-day-cell other-month';
            const num = document.createElement('div');
            num.className = 'cal-day-num';
            num.textContent = daysInPrevMonth - i;
            cell.appendChild(num);
            monthGrid.appendChild(cell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const cellDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const cellDate = new Date(year, month, day);
            const isWeekend = (cellDate.getDay() === 0 || cellDate.getDay() === 6);

            const cell = document.createElement('div');
            cell.className = `cal-day-cell ${isWeekend ? 'weekend' : ''}`;

            const num = document.createElement('div');
            num.className = 'cal-day-num';
            num.textContent = day;
            cell.appendChild(num);

            const activeStages = stages.filter(s => cellDateStr >= s.startDate && cellDateStr <= s.endDate);

            if (activeStages.length > 0) {
                cell.classList.add('has-event');
                activeStages.forEach(st => {
                    const pill = document.createElement('div');
                    pill.className = `cal-event-pill event-${st.type} ${st.status === 'Complet' ? 'event-full' : ''}`;
                    pill.textContent = st.title;
                    pill.title = `${st.title} (${st.dateLabel}) — ${st.status}`;
                    pill.addEventListener('click', (e) => {
                        e.stopPropagation();
                        selectedStage = st;
                        renderCalendar();
                    });
                    cell.appendChild(pill);
                });
            }

            monthGrid.appendChild(cell);
        }

        const totalCellsSoFar = startDayOfWeek + daysInMonth;
        const totalCellsTarget = totalCellsSoFar > 35 ? 42 : 35;
        const nextMonthPadding = totalCellsTarget - totalCellsSoFar;

        for (let day = 1; day <= nextMonthPadding; day++) {
            const cell = document.createElement('div');
            cell.className = 'cal-day-cell other-month';
            const num = document.createElement('div');
            num.className = 'cal-day-num';
            num.textContent = day;
            cell.appendChild(num);
            monthGrid.appendChild(cell);
        }

        gridCard.appendChild(monthGrid);
        container.appendChild(gridCard);
    }

    function renderListView(container, stages) {
        const listWrapper = document.createElement('div');
        listWrapper.className = 'cal-events-list';

        if (stages.length === 0) {
            listWrapper.innerHTML = '<p class="text-center" style="color: var(--text-muted); padding: 40px;">Aucune formation trouvée pour ce filtre.</p>';
            container.appendChild(listWrapper);
            return;
        }

        stages.forEach(st => {
            const card = document.createElement('div');
            card.className = 'cal-stage-card';

            card.innerHTML = `
                <div class="cal-stage-info">
                    <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
                        <span class="badge-type bg-${st.type}">${st.badgeText}</span>
                        <span style="color: ${st.statusColor}; font-weight: 600; font-size: 0.85rem;">● ${st.status}</span>
                    </div>
                    <h3>${st.title}</h3>
                    <p style="color: var(--text-muted); margin-bottom: 12px; font-size: 0.95rem;">${st.desc}</p>
                    <div class="cal-stage-meta">
                        <span><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> ${st.dateLabel}</span>
                        <span><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> ${st.level}</span>
                    </div>
                </div>
                <div>
                    <a href="contact.html?stage=${st.id}" class="btn btn-primary" style="white-space: nowrap;">
                        ${st.status === 'Complet' ? 'S’inscrire en liste d’attente' : 'Réserver ce stage'}
                    </a>
                </div>
            `;
            listWrapper.appendChild(card);
        });

        container.appendChild(listWrapper);
    }

    function renderSelectedStageDetail(container, stage) {
        const detailCard = document.createElement('div');
        detailCard.style.marginTop = '24px';
        detailCard.style.padding = '24px';
        detailCard.style.background = 'var(--bg-card)';
        detailCard.style.border = '2px solid var(--brand-orange)';
        detailCard.style.boxShadow = 'var(--shadow-md)';

        detailCard.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;">
                <div>
                    <span class="badge-type bg-${stage.type}" style="margin-bottom: 8px;">${stage.badgeText}</span>
                    <h3 style="font-family: var(--font-heading); font-size: 1.5rem; text-transform: uppercase; color: var(--dark-grey); margin-bottom: 8px;">${stage.title}</h3>
                    <p style="color: var(--text-muted); font-size: 1.05rem; margin-bottom: 16px;">${stage.desc}</p>
                    <div style="display: flex; gap: 20px; flex-wrap: wrap; font-size: 0.95rem; color: var(--text-main);">
                        <div><strong>Dates :</strong> ${stage.dateLabel}</div>
                        <div><strong>Niveau requis :</strong> ${stage.level}</div>
                        <div><strong>Disponibilité :</strong> <span style="color: ${stage.statusColor}; font-weight:700;">${stage.status}</span></div>
                    </div>
                </div>
                <button class="cal-nav-btn" style="flex-shrink: 0;" aria-label="Fermer">✕</button>
            </div>
            <div style="margin-top: 20px; display: flex; justify-content: flex-end; gap: 12px;">
                <a href="contact.html?stage=${stage.id}" class="btn btn-primary">Réserver ce stage</a>
            </div>
        `;

        detailCard.querySelector('button').addEventListener('click', () => {
            selectedStage = null;
            renderCalendar();
        });

        container.appendChild(detailCard);
    }

    renderCalendar();
}
