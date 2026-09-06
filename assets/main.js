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

    // ── Page Transition — Overlay Curtain System ──
    // Inject the overlay div if not present
    let overlay = document.querySelector('.page-transition-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        document.body.prepend(overlay);
    }
    // On page load: play the reveal animation (curtain slides up)
    requestAnimationFrame(() => {
        overlay.classList.add('reveal');
    });
    overlay.addEventListener('animationend', function handler(e) {
        if (e.animationName === 'curtainReveal') {
            overlay.classList.add('hidden');
            overlay.removeEventListener('animationend', handler);
        }
    });

    // Intercept internal links: play cover animation, then navigate
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = this.getAttribute('href');
            if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
            if (target && !target.startsWith('#') && !target.startsWith('http') && !target.startsWith('mailto') && !target.startsWith('tel') && this.getAttribute('target') !== '_blank') {
                e.preventDefault();
                const ov = document.querySelector('.page-transition-overlay');
                if (ov) {
                    ov.classList.remove('reveal', 'hidden');
                    // Force reflow to reset animation
                    void ov.offsetWidth;
                    ov.classList.add('cover');
                    ov.addEventListener('animationend', function navHandler() {
                        ov.removeEventListener('animationend', navHandler);
                        window.location.href = target;
                    });
                } else {
                    window.location.href = target;
                }
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
        const ov = document.querySelector('.page-transition-overlay');
        if (ov) {
            ov.classList.remove('cover');
            ov.classList.add('reveal');
            ov.addEventListener('animationend', function handler() {
                ov.classList.add('hidden');
                ov.removeEventListener('animationend', handler);
            });
        }
    }
});

// ── Clean Native Multi-Language System (FR / EN / ES) ──
const I18N_DICT = {
    en: {
        // ── Navigation ──
        "Accueil": "Home",
        "L'École (APPI)": "The School (APPI)",
        "Formations": "Courses",
        "Espace PRO": "PRO Area",
        "Calendrier": "Calendar",
        "Tarifs": "Prices",
        "Contact": "Contact",
        "École &amp; Progression APPI": "School &amp; APPI Progression",

        // ── Index — Hero ──
        "Volez plus haut,<br>volez plus loin": "Fly higher,<br>fly further",
        "École de parapente professionnelle. De l'initiation aux brevets instructeurs, découvrez la progression APPI avec des experts passionnés.": "Professional paragliding school. From beginner courses to instructor certifications, discover APPI progression with passionate experts.",
        "Découvrir nos formations": "Discover our courses",
        "Voir l'Espace PRO": "View PRO Area",

        // ── Index — Quick Access ──
        "Accès Rapide": "Quick Access",
        "Formations & Stages": "Courses & Clinics",
        "Formations &amp; Stages": "Courses &amp; Clinics",
        "Biplace, stages cross, SIV, voyages et coaching. Tout pour progresser à votre rythme.": "Tandem flights, XC clinics, SIV, trips and coaching. Everything to progress at your own pace.",
        "En savoir plus": "Learn more",
        "Espace dédié": "Dedicated area",
        "Filière instructeurs, biplaces commerciaux et formations professionnelles qualifiantes.": "Instructor path, commercial tandem, and professional training.",
        "Consultez toutes les dates de nos prochains stages, séjours et formations professionnelles.": "View all dates for our upcoming courses, trips, and professional training.",
        "Voir les dates": "View dates",
        "Consultez notre grille tarifaire pour le grand public et les professionnels.": "Check our price list for leisure pilots and professionals.",
        "Voir les tarifs": "View prices",

        // ── Formations Page ──
        "Nos Formations": "Our Courses",
        "Pour les pilotes en quête de progression, de l'initiation au vol de distance.": "For pilots seeking progression, from initiation to cross-country flight.",
        "Biplace — Non commercial": "Tandem — Non-commercial",
        "Formation pour apprendre à voler en biplace dans un cadre associatif ou familial. Partagez votre passion en toute sécurité avec vos proches.": "Training to learn tandem flying in a club or family setting. Share your passion safely with your loved ones.",
        "Réserver": "Book now",
        "Réserver ce stage": "Book this course",
        "Stage Cross": "XC Clinic",
        "Apprenez à exploiter les ascendances thermiques, à transiter et à préparer vos vols de distance. Idéal pour valider le niveau Advanced Pilot.": "Learn to use thermals, transition and prepare your cross-country flights. Ideal to validate the Advanced Pilot level.",
        "Stage SIV (Simulation d'Incidents de Vol)": "SIV Clinic (Flight Incidents)",
        "Maîtrisez votre voile dans toutes les configurations : fermetures, autorotation, décrochage. Indispensable pour votre sécurité active.": "Master your glider in all configurations: collapses, autorotation, stalls. Essential for your active safety.",
        "Visio & Théorie": "Online Theory & Webinars",
        "Visio &amp; Théorie": "Online Theory &amp; Webinars",
        "Cours théoriques en visioconférence : météo avancée, lecture des émagrammes, réglementation, préparation mentale.": "Online theory courses: advanced weather, emagram analysis, airspace regulations, mental preparation.",
        "Voyage à la carte": "Custom Trips",
        "Séjours itinérants en France ou à l'étranger. Découvrez de nouveaux sites de vol avec un encadrement professionnel.": "Guided flying trips in France or abroad. Discover new flying sites with professional coaching.",
        "Coaching Individuel": "Individual Coaching",
        "Analyse vidéo, débriefing de traces GPS, accompagnement personnalisé pour atteindre vos objectifs spécifiques.": "Video analysis, GPS track debriefing, personalized guidance to reach your specific goals.",

        // ── Tarifs Page ──
        "Nos Tarifs": "Our Rates",
        "Des prix transparents pour votre progression APPI, du loisir à la professionnalisation.": "Transparent pricing for your APPI progression, from leisure to professional level.",
        "Tarifs Formations (Loisir)": "Leisure Course Rates",
        "Tarifs Espace PRO": "PRO Area Rates",
        "Stage Initiation (5 jours)": "Beginner Course (5 days)",
        "Prêt du matériel complet": "Full equipment loan",
        "Carnet de vol APPI": "APPI logbook",
        "Encadrement 2 moniteurs": "2 instructors supervision",
        "Stage Perfectionnement": "Improvement Course",
        "5 jours de formation": "5 days of training",
        "Validation Pilot APPI": "APPI Pilot validation",
        "Optimisation thermique": "Thermal optimization",
        "Stage SIV (3 jours)": "SIV Course (3 days)",
        "Bateau + Navette": "Boat + Shuttle",
        "Gilet de sauvetage fourni": "Life jacket provided",
        "Débriefing vidéo inclus": "Video debriefing included",
        "Formation Professionnelle": "Professional Training",
        "Durée": "Duration",
        "Tarif": "Price",
        "Action": "Action",
        "Qualification Biplace Non Commercial": "Non-Commercial Tandem Qualification",
        "5 jours": "5 days",
        "Formation Biplace PRO (Commercial)": "PRO Tandem Training (Commercial)",
        "2 semaines": "2 weeks",
        "Sur devis": "On request",
        "Formation Assistant Instructeur APPI": "APPI Assistant Instructor Training",
        "10 jours": "10 days",
        "Validation Instructeur APPI (Examen)": "APPI Instructor Validation (Exam)",
        "3 jours": "3 days",
        "Détails →": "Details →",

        // ── Calendrier Page ──
        "Calendrier des Stages": "Course Schedule",
        "Consultez le planning mensuel de nos formations loisir et professionnelles pour la saison 2026.": "View the monthly schedule of our leisure and professional training for the 2026 season.",

        // ── Contact Page ──
        "Contactez-nous": "Contact Us",
        "Une question ? Une réservation ? Notre équipe est à votre écoute.": "A question? A booking? Our team is at your service.",
        "Nos Coordonnées": "Contact Details",
        "Envoyez-nous un message": "Send us a message",
        "Téléphone / WhatsApp": "Phone / WhatsApp",
        "E-mail": "E-mail",
        "École (Lieu de RDV)": "School (Meeting Point)",
        "Lieu-dit Le Village<br>04330 Barrême, France": "Lieu-dit Le Village<br>04330 Barrême, France",
        "Nom & Prénom": "Full Name",
        "Nom &amp; Prénom": "Full Name",
        "Sujet / Intérêt": "Subject / Interest",
        "Message": "Message",
        "Envoyer le message": "Send message",
        "Sélectionnez un sujet...": "Select a subject...",
        "Renseignement - Stage Loisir": "Inquiry - Leisure Course",
        "Inscription - Stage SIV": "Registration - SIV Course",
        "Candidature - Formation PRO": "Application - PRO Training",
        "Autre demande": "Other request",
        "✓ Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.": "✓ Message sent successfully! We will reply as soon as possible.",
        "Nous contacter": "Contact us",

        // ── APPI Page (Rich Guide & Master Stéphane) ──
        "L'École & Le Système APPI": "The School & The APPI System",
        "L'École &amp; Le Système APPI": "The School &amp; The APPI System",
        "La référence internationale pour l'enseignement du vol libre. Formations certifiantes du premier vol solo jusqu'à la qualification d'instructeur professionnel.": "The international benchmark for free flight training. Certifying courses from the first solo flight to the professional instructor qualification.",
        "Fonctionnement APPI": "APPI System",
        "Stéphane, Master APPI": "Stéphane, Master APPI",
        "Niveaux de Progression": "Progression Levels",
        "Qu'est-ce que l'APPI ?": "What is APPI?",
        "Standard Mondial d'Excellence": "Worldwide Standard of Excellence",
        "Un cursus constamment actualisé grâce à l'expertise des plus grandes sommités du parapente : Master Instructeurs, concepteurs de voiles, scientifiques et pilotes d'essais pour les certifications EN.": "A curriculum constantly updated with the expertise of paragliding's leading authorities: Master Instructors, glider designers, scientists, and EN certification test pilots.",
        "Sécurité & Évaluation Globale": "Safety & Comprehensive Assessment",
        "Sécurité &amp; Évaluation Globale": "Safety &amp; Comprehensive Assessment",
        "L'élève est évalué comme un pilote complet : maîtrise technique, connaissances théoriques, contrôle des émotions et attitude responsable. Un comité de sécurité indépendant veille au respect strict des règles.": "The student is evaluated as a complete pilot: technical skills, theoretical knowledge, emotional self-control, and a responsible mindset. An independent safety committee ensures strict rule enforcement.",
        "Plateforme Web & E-Learning": "Web Platform & E-Learning",
        "Plateforme Web &amp; E-Learning": "Web Platform &amp; E-Learning",
        "Un passeport et un carnet de vol numériques multilingues. Vous pouvez débuter votre formation chez Parapente.pro à Barrême et poursuivre chez un confrère APPI à l'étranger sans rupture de parcours.": "A multilingual digital passport and logbook. You can begin training at Parapente.pro in Barrême and continue with an APPI partner abroad seamlessly.",
        "Accréditation FAI & Monde": "FAI & Global Accreditation",
        "Accréditation FAI &amp; Monde": "FAI &amp; Global Accreditation",
        "Partenaire officiel de la <strong>FAI</strong> (Fédération Aéronautique Internationale) pour la révision de SAFEPRO. APPI délivre l'<strong>IPPI Card</strong> et collabore avec de nombreuses fédérations et aviations civiles dans le monde.": "Official partner of the <strong>FAI</strong> (Fédération Aéronautique Internationale) for the SAFEPRO revision. APPI issues the <strong>IPPI Card</strong> and collaborates with numerous national federations and civil aviation authorities worldwide.",
        "« Y a-t-il des frontières dans le ciel ? »": "“Are there borders in the sky?”",
        "L'accréditation APPI repose sur l'universalité du vol libre. Elle garantit qu'un brevet délivré par une école certifiée atteste de réelles compétences reconnues à l'échelle internationale. Que vous souhaitiez louer du matériel en Espagne, voler en Amérique du Sud ou faire reconnaître vos acquis à l'étranger, votre certification APPI associée à la carte IPPI de la FAI est votre passeport de vol mondial.": "APPI accreditation is built on the universality of free flight. It guarantees that ratings issued by certified schools prove real, globally recognized competence. Whether renting gear in Spain, flying in South America, or having skills officially recognized abroad, your APPI certification paired with the FAI IPPI card is your worldwide flying passport.",
        "Plus Haut Niveau International": "Highest International Level",
        "Stéphane — Master Instructor APPI": "Stéphane — Master Instructor APPI",
        "Fondateur et responsable pédagogique de <strong>Parapente.pro</strong>, Stéphane détient le grade prestigieux de <strong>Master Instructor APPI</strong>, l'échelon le plus élevé du système de certification mondial.": "Founder and head of training at <strong>Parapente.pro</strong>, Stéphane holds the prestigious rating of <strong>Master Instructor APPI</strong>, the pinnacle of the global certification ladder.",
        "Moins d'une poignée de professionnels dans le monde accèdent à ce statut. Être Master APPI ne signifie pas seulement maîtriser le pilotage de très haut niveau : c'est être <strong>formateur et certificateur de formateurs</strong>.": "Only a handful of professionals worldwide reach this status. Being an APPI Master means not only elite flying mastery, but serving as a <strong>trainer and certifier of instructors</strong>.",
        "Habilité à former et auditer les instructeurs": "Authorized to train and audit instructors",
        "Certification biplace commercial (Tandem PRO)": "Commercial tandem certification (Tandem PRO)",
        "Contributeur aux standards pédagogiques mondiaux": "Contributor to global training standards",
        "Direction de workshops et examens pro": "Leadership of professional workshops & exams",
        "En apprenant chez Parapente.pro à Barrême, vous bénéficiez directement de cette expertise internationale, d'une rigueur absolue et d'un accompagnement personnalisé d'exception.": "By learning at Parapente.pro in Barrême, you benefit directly from this world-class expertise, uncompromising standards, and exceptional personal coaching.",
        "Échanger avec Stéphane": "Speak with Stéphane",
        "Le système APPI propose un parcours évolutif étape par étape. Chaque brevet valide des compétences théoriques, pratiques et sécuritaires objectives.": "The APPI system provides a step-by-step modular journey. Each license validates objective theoretical, practical, and safety qualifications.",
        "Filière Pilote (Loisir & Performance)": "Pilot Path (Leisure & Performance)",
        "Filière Pilote (Loisir &amp; Performance)": "Pilot Path (Leisure &amp; Performance)",
        "Niveau 1 — Initiation": "Level 1 — Initiation",
        "Open Sky / Discovery": "Open Sky / Discovery",
        "Première immersion dans le monde du vol libre. Découverte de l'équipement, prise en main de l'aile en pente-école, premiers gonflages au sol et premières sensations de vol en biplace ou petits sauts de puce.": "First immersion into the free flight world. Equipment discovery, ground handling on the training hill, first inflation exercises, and initial flight sensations via tandem or short hops.",
        "Niveau 2 — Brevet Élève": "Level 2 — Student Rating",
        "Adventure Pilot (Student)": "Adventure Pilot (Student)",
        "Apprentissage complet du décollage, contrôle au sol face et dos voile, premiers grands vols solo encadrés par radio. Maîtrise des virages, de la vitesse de vol et construction du plan d'approche sécurisé (PTU / PTS).": "Comprehensive launch training, forward and reverse ground handling, first radio-supervised high solo flights. Mastery of turns, airspeed control, and safe landing approach planning (PTU/PTS).",
        "Niveau 3 — Autonomie Totale": "Level 3 — Complete Autonomy",
        "APPI Pilot (Pilote Autonome)": "APPI Pilot (Autonomous Pilot)",
        "Le brevet d'autonomie internationale sur site connu. Vous validez vos connaissances météorologiques et aérologiques, les techniques de descente rapide, le vol en soaring thermodynamique et la sécurité active. Permet l'obtention de la <strong>carte IPPI FAI</strong>.": "The international autonomous license on familiar sites. Validates weather analysis, rapid descent techniques, ridge soaring, and active piloting safety. Grants eligibility for the <strong>FAI IPPI Card</strong>.",
        "Niveau 4 — Performance & Cross": "Level 4 — Performance & XC",
        "Niveau 4 — Performance &amp; Cross": "Level 4 — Performance &amp; XC",
        "Advanced Pilot (Expert)": "Advanced Pilot (Expert)",
        "Perfectionnement aux vols de distance (Cross-Country / XC), exploitation des ascendances thermiques puissantes, analyse des lignes d'énergie et gestion active de la turbulence. Le niveau de référence des pilotes chevronnés.": "Advanced cross-country (XC) flying, harnessing strong thermals, reading energy lines, and active turbulence management. The benchmark rating for seasoned pilots.",
        "Certifications Spécifiques APPI": "APPI Specialized Ratings",
        "En complément des brevets principaux, le système APPI propose des qualifications modulaires pointues, toutes dispensées chez Parapente.pro :": "Alongside core ratings, the APPI system provides specialized modular qualifications, all offered at Parapente.pro:",
        "Stage SIV :": "SIV Clinic:",
        "Stage Cross (XC) :": "XC Clinic:",
        "Biplace Non-Commercial :": "Non-Commercial Tandem:",
        "Contrôle & Pliage Secours :": "Reserve Inspection & Packing:",
        "Contrôle &amp; Pliage Secours :": "Reserve Inspection &amp; Packing:",
        "Filière Professionnelle & Enseignement": "Professional & Teaching Path",
        "Filière Professionnelle &amp; Enseignement": "Professional &amp; Teaching Path",
        "Professionnel — Transport Passager": "Professional — Passenger Transport",
        "Tandem Pilot (PRO Commercial)": "Tandem Pilot (Commercial PRO)",
        "Formation certifiante APPI Tandem Pro pour exercer l'activité de pilote biplaceur professionnel rémunéré. Maîtrise de la gestion des passagers, des conditions aérologiques variées, du briefing sécurité et du cadre réglementaire.": "APPI Tandem Pro certifying course to work as a compensated commercial tandem pilot. Passenger management, diverse weather flying, safety briefings, and full legal framework compliance.",
        "Enseignement — 1er Échelon": "Teaching — 1st Step",
        "Première étape vers la pédagogie du vol libre. Apprenez la gestion du groupe en pente-école, l'encadrement des premiers décollages, le guidage radio et l'assistance lors des cours théoriques sous la supervision d'un instructeur titulaire.": "First step into free flight instruction. Group management on the training hill, supervising first launches, radio coaching, and assisting theory sessions under an instructor's oversight.",
        "Enseignement — Instructeur Titulaire": "Teaching — Certified Instructor",
        "Professionnel diplômé de l'enseignement. Habilité à diriger des stages, concevoir des programmes pédagogiques et former des élèves pilotes de manière totalement autonome jusqu'au niveau Advanced Pilot.": "Fully certified teaching professional. Authorized to run clinics, design curricula, and train student pilots autonomously up to Advanced Pilot level.",
        "Sommet de la Filière — Formateur de Formateurs": "Pinnacle of the System — Trainer of Trainers",
        "Master Instructor (Statut de Stéphane)": "Master Instructor (Stéphane's Status)",
        "Le niveau ultime de l'APPI. Responsable de la formation, de l'audit et de la certification des instructeurs internationaux et des pilotes biplaceurs professionnels. Référent pédagogique et garant de la sécurité mondiale.": "The ultimate rating in the APPI system. Responsible for training, auditing, and certifying international instructors and commercial tandem pilots. World safety and pedagogical benchmark.",
        "Découvrir nos Formations Loisir": "Discover Leisure Courses",
        "Découvrir l'Espace PRO": "Discover PRO Area",

        // ── PRO Page ──
        "Espace Professionnel": "Professional Space",
        "Faites de votre passion un métier avec nos formations qualifiantes APPI.": "Turn your passion into a career with our APPI qualifying courses.",
        "Formations Biplace": "Tandem Training",
        "Biplace — Non Commercial": "Tandem — Non-Commercial",
        "Prérequis pour accéder à la filière pro. Apprenez à emmener vos proches en toute sécurité dans un cadre associatif.": "Prerequisite for the professional path. Learn to take your loved ones safely in a club setting.",
        "Biplace — PRO (Commercial)": "Tandem — PRO (Commercial)",
        "Formation APPI Tandem Pro. Destinée aux pilotes souhaitant exercer l'activité de pilote biplaceur contre rémunération.": "APPI Tandem Pro training. For pilots wishing to work as commercial tandem pilots.",
        "Filière Instructeur APPI": "APPI Instructor Course",
        "Assistant Instructeur": "Assistant Instructor",
        "Première étape vers l'enseignement. Apprenez à encadrer au sol et assister un instructeur certifié lors des cours théoriques et pratiques.": "First step towards teaching. Learn to supervise on the ground and assist a certified instructor during theoretical and practical courses.",
        "Candidater": "Apply",
        "Instructeur APPI": "APPI Instructor",
        "Devenez un professionnel de l'enseignement du vol libre. Formez les futurs pilotes jusqu'au niveau Advanced Pilot de manière autonome.": "Become a free flight teaching professional. Train future pilots up to Advanced Pilot level independently.",
        "Nous rejoindre": "Join Us",
        "Vous souhaitez intégrer notre équipe pédagogique ou vous inscrire à une formation qualifiante ? Contactez-nous pour étudier votre dossier et valider vos acquis.": "Want to join our teaching team or register for a qualifying course? Contact us to review your application and validate your qualifications.",
        "Contact & Candidature PRO": "Contact & PRO Application",
        "Contact &amp; Candidature PRO": "Contact &amp; PRO Application",

        // ── Footer ──
        "École de parapente certifiée APPI.<br>Barrême, France.": "APPI certified paragliding school.<br>Barrême, France.",
        "Liens utiles": "Useful links",
        "Le Système APPI": "The APPI System",
        "Pratique": "Info",
        "Contact & Accès": "Contact & Access",
        "Contact &amp; Accès": "Contact &amp; Access",
        "Informations légales": "Legal Information",
        "Mentions légales": "Legal Notice",
        "Politique de confidentialité": "Privacy Policy",
        "Conditions d'utilisation": "Terms of Use",
        "© 2026 Parapente.pro. Tous droits réservés.": "© 2026 Parapente.pro. All rights reserved.",

        // ── Mentions Légales Page ──
        "Informations juridiques obligatoires": "Mandatory legal information",
        "Éditeur du site": "Website Publisher",
        "Le site Parapente.pro est édité par Parapente.pro, situé à Barrême, France.": "The Parapente.pro website is published by Parapente.pro, located in Barrême, France.",
        "Responsable de publication": "Publication Manager",
        "[Nom du responsable]": "[Manager's name]",
        "Hébergeur": "Hosting Provider",
        "Le site est hébergé par GitHub Pages, GitHub Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA.": "The site is hosted by GitHub Pages, GitHub Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA.",
        "Propriété intellectuelle": "Intellectual Property",
        "L'ensemble du contenu (textes, images, vidéos, etc.) de ce site est protégé par le droit d'auteur. Toute reproduction est interdite sans autorisation préalable.": "All content (texts, images, videos, etc.) on this site is protected by copyright. Any reproduction is prohibited without prior authorization.",
        "Crédits photos": "Photo Credits",
        "Images : Parapente.pro, ou libres de droits sauf mention contraire.": "Images: Parapente.pro, or royalty-free unless otherwise noted.",

        // ── Politique de Confidentialité Page ──
        "Protection de vos données personnelles (RGPD)": "Protection of your personal data (GDPR)",
        "Responsable du traitement des données": "Data Controller",
        "Le responsable du traitement des données est Parapente.pro, joignable à l'adresse email suivante : contact@parapente.pro.": "The data controller is Parapente.pro, contactable at: contact@parapente.pro.",
        "Types de données collectées": "Types of Data Collected",
        "Lors de l'utilisation de notre formulaire de contact, nous collectons les données suivantes : nom, email, téléphone, et le contenu de votre message.": "When using our contact form, we collect the following data: name, email, phone, and your message content.",
        "Finalité du traitement": "Purpose of Processing",
        "Ces données sont utilisées uniquement dans le but de répondre à vos demandes de renseignements, inscriptions ou toute autre communication initiée par vos soins.": "This data is used solely to respond to your inquiries, registrations, or any other communication initiated by you.",
        "Durée de conservation": "Data Retention Period",
        "Les données personnelles sont conservées le temps nécessaire au traitement de votre demande, puis sont supprimées conformément aux obligations légales (maximum 3 ans d'inactivité).": "Personal data is retained for as long as necessary to process your request, then deleted in accordance with legal obligations (maximum 3 years of inactivity).",
        "Cookies et traceurs": "Cookies and Trackers",
        "Ce site utilise Google Fonts pour l'affichage de ses typographies, ce qui peut entraîner le dépôt de cookies tiers ou la collecte de votre adresse IP par Google.": "This site uses Google Fonts for typography display, which may result in third-party cookies or your IP address being collected by Google.",
        "Droits des utilisateurs": "User Rights",
        "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, veuillez nous contacter à l'adresse : contact@parapente.pro.": "Under the GDPR, you have the right to access, rectify, delete, and port your data. To exercise these rights, please contact us at: contact@parapente.pro.",

        // ── Conditions d'Utilisation Page ──
        "Conditions d'Utilisation": "Terms of Use",
        "Règles d'utilisation du site web": "Website usage rules",
        "Objet": "Purpose",
        "Les présentes conditions générales ont pour objet de définir les modalités et conditions d'utilisation des services proposés sur le site Parapente.pro.": "These general terms and conditions define the terms and conditions of use of the services offered on the Parapente.pro website.",
        "Accès au site": "Site Access",
        "Le site est accessible gratuitement à tout utilisateur disposant d'un accès à internet. L'éditeur se réserve le droit de suspendre ou modifier l'accès sans préavis.": "The site is freely accessible to any user with internet access. The publisher reserves the right to suspend or modify access without notice.",
        "Les marques, logos, signes et tout autre contenu du site font l'objet d'une protection par le Code de la propriété intellectuelle.": "Brands, logos, signs, and all other site content are protected by the Intellectual Property Code.",
        "Responsabilité": "Liability",
        "L'éditeur du site ne saurait être tenu responsable des erreurs, omissions, ou d'une absence de disponibilité des informations et services.": "The site publisher cannot be held liable for errors, omissions, or unavailability of information and services.",
        "Liens externes": "External Links",
        "Le site peut contenir des liens hypertextes vers d'autres sites. L'éditeur ne prend aucun engagement concernant ces autres sites auxquels vous pourriez avoir accès.": "The site may contain hyperlinks to other websites. The publisher makes no commitments regarding these other sites you may access.",
        "Droit applicable": "Applicable Law",
        "La législation française s'applique au présent contrat. En cas d'absence de résolution amiable d'un litige né entre les parties, les tribunaux français seront seuls compétents.": "French law applies to this contract. In the absence of amicable resolution of a dispute between the parties, French courts shall have sole jurisdiction.",

        // ── Calendar JS strings ──
        "Toutes": "All",
        "Loisir": "Leisure",
        "Grille": "Grid",
        "Liste": "List",
        "Aucune formation trouvée pour ce filtre.": "No courses found for this filter.",
        "Places dispo": "Available",
        "Presque complet": "Almost full",
        "Complet": "Full",
        "S\u2019inscrire en liste d\u2019attente": "Join waiting list",
        "Dates :": "Dates:",
        "Niveau requis :": "Required level:",
        "Disponibilité :": "Availability:",
        "* Des aides au financement peuvent être possibles (AFDAS, etc.) selon votre statut.": "* Funding assistance may be available (AFDAS, etc.) depending on your status.",
        "Contactez-nous": "Contact us"
    },
    es: {
        // ── Navigation ──
        "Accueil": "Inicio",
        "L'École (APPI)": "La Escuela (APPI)",
        "Formations": "Cursos",
        "Espace PRO": "Espacio PRO",
        "Calendrier": "Calendario",
        "Tarifs": "Tarifas",
        "Contact": "Contacto",
        "École &amp; Progression APPI": "Escuela &amp; Progresión APPI",

        // ── Index — Hero ──
        "Volez plus haut,<br>volez plus loin": "Vuela más alto,<br>vuela más lejos",
        "École de parapente professionnelle. De l'initiation aux brevets instructeurs, découvrez la progression APPI avec des experts passionnés.": "Escuela profesional de parapente. Desde la iniciación hasta las certificaciones de instructor, descubre la progresión APPI con expertos apasionados.",
        "Découvrir nos formations": "Descubrir nuestros cursos",
        "Voir l'Espace PRO": "Ver Espacio PRO",

        // ── Index — Quick Access ──
        "Accès Rapide": "Acceso Rápido",
        "Formations & Stages": "Cursos y Prácticas",
        "Formations &amp; Stages": "Cursos y Prácticas",
        "Biplace, stages cross, SIV, voyages et coaching. Tout pour progresser à votre rythme.": "Vuelos biplaza, cursos XC, SIV, viajes y coaching. Todo para progresar a tu ritmo.",
        "En savoir plus": "Saber más",
        "Espace dédié": "Espacio dedicado",
        "Filière instructeurs, biplaces commerciaux et formations professionnelles qualifiantes.": "Formación de instructores, biplaza comercial y formación profesional.",
        "Consultez toutes les dates de nos prochains stages, séjours et formations professionnelles.": "Consulta todas las fechas de nuestros próximos cursos, viajes y formaciones.",
        "Voir les dates": "Ver fechas",
        "Consultez notre grille tarifaire pour le grand public et les professionnels.": "Consulta nuestras tarifas para particulares y profesionales.",
        "Voir les tarifs": "Ver tarifas",

        // ── Formations Page ──
        "Nos Formations": "Nuestros Cursos",
        "Pour les pilotes en quête de progression, de l'initiation au vol de distance.": "Para pilotos en busca de progresión, desde la iniciación hasta el vuelo de distancia.",
        "Biplace — Non commercial": "Biplaza — No comercial",
        "Formation pour apprendre à voler en biplace dans un cadre associatif ou familial. Partagez votre passion en toute sécurité avec vos proches.": "Formación para aprender a volar en biplaza en un entorno de club o familiar. Comparte tu pasión de forma segura con tus seres queridos.",
        "Réserver": "Reservar",
        "Réserver ce stage": "Reservar este curso",
        "Stage Cross": "Curso XC Cross",
        "Apprenez à exploiter les ascendances thermiques, à transiter et à préparer vos vols de distance. Idéal pour valider le niveau Advanced Pilot.": "Aprende a aprovechar las térmicas, hacer transiciones y preparar tus vuelos de distancia. Ideal para validar el nivel Advanced Pilot.",
        "Stage SIV (Simulation d'Incidents de Vol)": "Curso SIV (Incidencias de Vuelo)",
        "Maîtrisez votre voile dans toutes les configurations : fermetures, autorotation, décrochage. Indispensable pour votre sécurité active.": "Domina tu vela en todas las configuraciones: colapsos, autorrotación, pérdidas. Indispensable para tu seguridad activa.",
        "Visio & Théorie": "Teoría Online y Webinars",
        "Visio &amp; Théorie": "Teoría Online y Webinars",
        "Cours théoriques en visioconférence : météo avancée, lecture des émagrammes, réglementation, préparation mentale.": "Cursos teóricos por videoconferencia: meteorología avanzada, emagramas, normativa y preparación mental.",
        "Voyage à la carte": "Viajes a la carta",
        "Séjours itinérants en France ou à l'étranger. Découvrez de nouveaux sites de vol avec un encadrement professionnel.": "Viajes guiados en Francia o en el extranjero. Descubre nuevos sitios de vuelo con entrenamiento profesional.",
        "Coaching Individuel": "Coaching Individual",
        "Analyse vidéo, débriefing de traces GPS, accompagnement personnalisé pour atteindre vos objectifs spécifiques.": "Análisis de video, debriefing de tracks GPS, acompañamiento personalizado para alcanzar tus objetivos.",

        // ── Tarifs Page ──
        "Nos Tarifs": "Nuestras Tarifas",
        "Des prix transparents pour votre progression APPI, du loisir à la professionnalisation.": "Precios transparentes para tu progresión APPI, desde el ocio hasta la profesionalización.",
        "Tarifs Formations (Loisir)": "Tarifas de Cursos (Ocio)",
        "Tarifs Espace PRO": "Tarifas Espacio PRO",
        "Stage Initiation (5 jours)": "Curso de Iniciación (5 días)",
        "Prêt du matériel complet": "Préstamo de material completo",
        "Carnet de vol APPI": "Libro de vuelo APPI",
        "Encadrement 2 moniteurs": "Supervisión de 2 monitores",
        "Stage Perfectionnement": "Curso de Perfeccionamiento",
        "5 jours de formation": "5 días de formación",
        "Validation Pilot APPI": "Validación Pilot APPI",
        "Optimisation thermique": "Optimización térmica",
        "Stage SIV (3 jours)": "Curso SIV (3 días)",
        "Bateau + Navette": "Barco + Lanzadera",
        "Gilet de sauvetage fourni": "Chaleco salvavidas incluido",
        "Débriefing vidéo inclus": "Debriefing de vídeo incluido",
        "Formation Professionnelle": "Formación Profesional",
        "Durée": "Duración",
        "Tarif": "Precio",
        "Action": "Acción",
        "Qualification Biplace Non Commercial": "Cualificación Biplaza No Comercial",
        "5 jours": "5 días",
        "Formation Biplace PRO (Commercial)": "Formación Biplaza PRO (Comercial)",
        "2 semaines": "2 semanas",
        "Sur devis": "Bajo presupuesto",
        "Formation Assistant Instructeur APPI": "Formación Asistente de Instructor APPI",
        "10 jours": "10 días",
        "Validation Instructeur APPI (Examen)": "Validación Instructor APPI (Examen)",
        "3 jours": "3 días",
        "Détails →": "Detalles →",

        // ── Calendrier Page ──
        "Calendrier des Stages": "Calendario de Cursos",
        "Consultez le planning mensuel de nos formations loisir et professionnelles pour la saison 2026.": "Consulta la programación mensual de nuestros cursos de ocio y profesionales para la temporada 2026.",

        // ── Contact Page ──
        "Contactez-nous": "Contáctanos",
        "Une question ? Une réservation ? Notre équipe est à votre écoute.": "¿Una pregunta? ¿Una reserva? Nuestro equipo está a tu disposición.",
        "Nos Coordonnées": "Datos de Contacto",
        "Envoyez-nous un message": "Envíanos un mensaje",
        "Téléphone / WhatsApp": "Teléfono / WhatsApp",
        "E-mail": "Correo electrónico",
        "École (Lieu de RDV)": "Escuela (Punto de encuentro)",
        "Lieu-dit Le Village<br>04330 Barrême, France": "Lieu-dit Le Village<br>04330 Barrême, Francia",
        "Nom & Prénom": "Nombre completo",
        "Nom &amp; Prénom": "Nombre completo",
        "Sujet / Intérêt": "Asunto / Interés",
        "Message": "Mensaje",
        "Envoyer le message": "Enviar mensaje",
        "Sélectionnez un sujet...": "Seleccione un tema...",
        "Renseignement - Stage Loisir": "Información - Curso de Ocio",
        "Inscription - Stage SIV": "Inscripción - Curso SIV",
        "Candidature - Formation PRO": "Candidatura - Formación PRO",
        "Autre demande": "Otra solicitud",
        "✓ Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.": "✓ ¡Mensaje enviado con éxito! Responderemos lo antes posible.",
        "Nous contacter": "Contáctanos",

        // ── APPI Page (Rich Guide & Master Stéphane) ──
        "L'École & Le Système APPI": "La Escuela & El Sistema APPI",
        "L'École &amp; Le Système APPI": "La Escuela &amp; El Sistema APPI",
        "La référence internationale pour l'enseignement du vol libre. Formations certifiantes du premier vol solo jusqu'à la qualification d'instructeur professionnel.": "El referente internacional para la enseñanza del vuelo libre. Cursos certificados desde el primer vuelo solo hasta la titulación de instructor profesional.",
        "Fonctionnement APPI": "Funcionamiento APPI",
        "Stéphane, Master APPI": "Stéphane, Master APPI",
        "Niveaux de Progression": "Niveles de Progresión",
        "Qu'est-ce que l'APPI ?": "¿Qué es APPI?",
        "Standard Mondial d'Excellence": "Estándar Mundial de Excelencia",
        "Un cursus constamment actualisé grâce à l'expertise des plus grandes sommités du parapente : Master Instructeurs, concepteurs de voiles, scientifiques et pilotes d'essais pour les certifications EN.": "Un plan de estudios actualizado continuamente gracias a los mejores expertos del parapente: Master Instructores, diseñadores, científicos y pilotos de prueba para certificaciones EN.",
        "Sécurité & Évaluation Globale": "Seguridad & Evaluación Integral",
        "Sécurité &amp; Évaluation Globale": "Seguridad &amp; Evaluación Integral",
        "L'élève est évalué comme un pilote complet : maîtrise technique, connaissances théoriques, contrôle des émotions et attitude responsable. Un comité de sécurité indépendant veille au respect strict des règles.": "El alumno es evaluado como un piloto integral: técnica, teoría, autocontrol emocional y actitud responsable. Un comité de seguridad independiente vela por el cumplimiento estricto de las normas.",
        "Plateforme Web & E-Learning": "Plataforma Web & E-Learning",
        "Plateforme Web &amp; E-Learning": "Plataforma Web &amp; E-Learning",
        "Un passeport et un carnet de vol numériques multilingues. Vous pouvez débuter votre formation chez Parapente.pro à Barrême et poursuivre chez un confrère APPI à l'étranger sans rupture de parcours.": "Un pasaporte y libro de vuelo digital multilingüe. Puedes iniciar tu curso en Parapente.pro en Barrême y continuar con cualquier escuela APPI del mundo sin interrupción.",
        "Accréditation FAI & Monde": "Acreditación FAI y Mundial",
        "Accréditation FAI &amp; Monde": "Acreditación FAI y Mundial",
        "Partenaire officiel de la <strong>FAI</strong> (Fédération Aéronautique Internationale) pour la révision de SAFEPRO. APPI délivre l'<strong>IPPI Card</strong> et collabore avec de nombreuses fédérations et aviations civiles dans le monde.": "Socio oficial de la <strong>FAI</strong> (Federación Aeronáutica Internacional) para la revisión de SAFEPRO. APPI emite la <strong>IPPI Card</strong> y colabora con numerosas federaciones y aviaciones civiles mundiales.",
        "« Y a-t-il des frontières dans le ciel ? »": "«¿Hay fronteras en el cielo?»",
        "L'accréditation APPI repose sur l'universalité du vol libre. Elle garantit qu'un brevet délivré par une école certifiée atteste de réelles compétences reconnues à l'échelle internationale. Que vous souhaitiez louer du matériel en Espagne, voler en Amérique du Sud ou faire reconnaître vos acquis à l'étranger, votre certification APPI associée à la carte IPPI de la FAI est votre passeport de vol mondial.": "La acreditación APPI se fundamenta en la universalidad del vuelo libre. Garantiza que las licencias emitidas acrediten competencias reales reconocidas internacionalmente. Ya sea para alquilar equipo en España, volar en Sudamérica o convalidar tu titulación, tu certificación APPI con la IPPI Card de la FAI es tu pasaporte mundial.",
        "Plus Haut Niveau International": "Nivel Internacional Más Alto",
        "Stéphane — Master Instructor APPI": "Stéphane — Master Instructor APPI",
        "Fondateur et responsable pédagogique de <strong>Parapente.pro</strong>, Stéphane détient le grade prestigieux de <strong>Master Instructor APPI</strong>, l'échelon le plus élevé du système de certification mondial.": "Fundador y director pedagógico de <strong>Parapente.pro</strong>, Stéphane posee el prestigioso grado de <strong>Master Instructor APPI</strong>, la cumbre del sistema de certificación internacional.",
        "Moins d'une poignée de professionnels dans le monde accèdent à ce statut. Être Master APPI ne signifie pas seulement maîtriser le pilotage de très haut niveau : c'est être <strong>formateur et certificateur de formateurs</strong>.": "Muy pocos profesionales en el mundo alcanzan este estatus. Ser Master APPI implica no solo maestría de vuelo, sino ser <strong>formador y certificador de instructores</strong>.",
        "Habilité à former et auditer les instructeurs": "Habilitado para formar y auditar instructores",
        "Certification biplace commercial (Tandem PRO)": "Certificación biplaza comercial (Tandem PRO)",
        "Contributeur aux standards pédagogiques mondiaux": "Contribuyente a los estándares pedagógicos mundiales",
        "Direction de workshops et examens pro": "Dirección de workshops y exámenes profesionales",
        "En apprenant chez Parapente.pro à Barrême, vous bénéficiez directement de cette expertise internationale, d'une rigueur absolue et d'un accompagnement personnalisé d'exception.": "Al formarte en Parapente.pro en Barrême, disfrutas directamente de esta experiencia internacional, máximo rigor y una atención personalizada excepcional.",
        "Échanger avec Stéphane": "Contactar con Stéphane",
        "Le système APPI propose un parcours évolutif étape par étape. Chaque brevet valide des compétences théoriques, pratiques et sécuritaires objectives.": "El sistema APPI ofrece un recorrido progresivo paso a paso. Cada licencia valida competencias teóricas, prácticas y de seguridad objetivas.",
        "Filière Pilote (Loisir & Performance)": "Itinerario Piloto (Ocio & Rendimiento)",
        "Filière Pilote (Loisir &amp; Performance)": "Itinerario Piloto (Ocio &amp; Rendimiento)",
        "Niveau 1 — Initiation": "Nivel 1 — Iniciación",
        "Open Sky / Discovery": "Open Sky / Discovery",
        "Première immersion dans le monde du vol libre. Découverte de l'équipement, prise en main de l'aile en pente-école, premiers gonflages au sol et premières sensations de vol en biplace ou petits sauts de puce.": "Primera toma de contacto con el vuelo libre. Descubrimiento del equipo, control de la vela en pendiente escuela, inflados en tierra y primeros vuelos biplaza o saltos cortos.",
        "Niveau 2 — Brevet Élève": "Nivel 2 — Título Alumno",
        "Adventure Pilot (Student)": "Adventure Pilot (Student)",
        "Apprentissage complet du décollage, contrôle au sol face et dos voile, premiers grands vols solo encadrés par radio. Maîtrise des virages, de la vitesse de vol et construction du plan d'approche sécurisé (PTU / PTS).": "Aprendizaje integral del despegue, control de tierra hacia adelante y cruzado, primeros grandes vuelos solo guiados por radio. Control de virajes, velocidad y aproximación (PTU/PTS).",
        "Niveau 3 — Autonomie Totale": "Nivel 3 — Autonomía Total",
        "APPI Pilot (Pilote Autonome)": "APPI Pilot (Piloto Autónomo)",
        "Le brevet d'autonomie internationale sur site connu. Vous validez vos connaissances météorologiques et aérologiques, les techniques de descente rapide, le vol en soaring thermodynamique et la sécurité active. Permet l'obtention de la <strong>carte IPPI FAI</strong>.": "La licencia de autonomía internacional en sitios conocidos. Valida conocimientos meteorológicos, técnicas de descenso rápido, vuelo de ladera y seguridad activa. Concede la <strong>IPPI Card FAI</strong>.",
        "Niveau 4 — Performance & Cross": "Nivel 4 — Rendimiento & XC",
        "Niveau 4 — Performance &amp; Cross": "Nivel 4 — Rendimiento &amp; XC",
        "Advanced Pilot (Expert)": "Advanced Pilot (Expert)",
        "Perfectionnement aux vols de distance (Cross-Country / XC), exploitation des ascendances thermiques puissantes, analyse des lignes d'énergie et gestion active de la turbulence. Le niveau de référence des pilotes chevronnés.": "Perfeccionamiento en vuelos de distancia (Cross-Country / XC), aprovechamiento de térmicas potentes, líneas de energía y pilotaje activo en turbulencia. El nivel de referencia.",
        "Certifications Spécifiques APPI": "Certificaciones Específicas APPI",
        "En complément des brevets principaux, le système APPI propose des qualifications modulaires pointues, toutes dispensées chez Parapente.pro :": "Además de las licencias troncales, el sistema APPI ofrece cualificaciones modulares avanzadas impartidas en Parapente.pro:",
        "Stage SIV :": "Curso SIV:",
        "Stage Cross (XC) :": "Curso Cross (XC):",
        "Biplace Non-Commercial :": "Biplaza No Comercial:",
        "Contrôle & Pliage Secours :": "Control y Plegado de Emergencia:",
        "Contrôle &amp; Pliage Secours :": "Control y Plegado de Emergencia:",
        "Filière Professionnelle & Enseignement": "Itinerario Profesional y Docencia",
        "Filière Professionnelle &amp; Enseignement": "Itinerario Profesional y Docencia",
        "Professionnel — Transport Passager": "Profesional — Transporte de Pasajeros",
        "Tandem Pilot (PRO Commercial)": "Tandem Pilot (Comercial PRO)",
        "Formation certifiante APPI Tandem Pro pour exercer l'activité de pilote biplaceur professionnel rémunéré. Maîtrise de la gestion des passagers, des conditions aérologiques variées, du briefing sécurité et du cadre réglementaire.": "Curso certificado APPI Tandem Pro para ejercer como piloto biplaza remunerado. Gestión del pasajero, meteorología variada, briefing de seguridad y marco normativo.",
        "Enseignement — 1er Échelon": "Docencia — 1er Escalón",
        "Première étape vers la pédagogie du vol libre. Apprenez la gestion du groupe en pente-école, l'encadrement des premiers décollages, le guidage radio et l'assistance lors des cours théoriques sous la supervision d'un instructeur titulaire.": "Primer paso hacia la enseñanza del vuelo libre. Gestión de grupo en pendiente escuela, control de primeros despegues, radio y asistencia teórica supervisada.",
        "Enseignement — Instructeur Titulaire": "Docencia — Instructor Titular",
        "Professionnel diplômé de l'enseignement. Habilité à diriger des stages, concevoir des programmes pédagogiques et former des élèves pilotes de manière totalement autonome jusqu'au niveau Advanced Pilot.": "Profesional diplomado de la enseñanza. Habilitado para dirigir cursos, diseñar planes y formar alumnos con total autonomía hasta el nivel Advanced Pilot.",
        "Sommet de la Filière — Formateur de Formateurs": "Cúspide del Sistema — Formador de Formadores",
        "Master Instructor (Statut de Stéphane)": "Master Instructor (Estatus de Stéphane)",
        "Le niveau ultime de l'APPI. Responsable de la formation, de l'audit et de la certification des instructeurs internationaux et des pilotes biplaceurs professionnels. Référent pédagogique et garant de la sécurité mondiale.": "El nivel definitivo de APPI. Responsable de formar, auditar y certificar instructores internacionales y biplazas profesionales. Máximo referente de seguridad.",
        "Découvrir nos Formations Loisir": "Descubrir Cursos de Ocio",
        "Découvrir l'Espace PRO": "Descubrir el Espacio PRO",

        // ── PRO Page ──
        "Espace Professionnel": "Espacio Profesional",
        "Faites de votre passion un métier avec nos formations qualifiantes APPI.": "Haz de tu pasión tu profesión con nuestros cursos cualificados APPI.",
        "Formations Biplace": "Formación Biplaza",
        "Biplace — Non Commercial": "Biplaza — No Comercial",
        "Prérequis pour accéder à la filière pro. Apprenez à emmener vos proches en toute sécurité dans un cadre associatif.": "Prerrequisito para acceder a la vía profesional. Aprende a llevar a tus seres queridos de forma segura en un entorno asociativo.",
        "Biplace — PRO (Commercial)": "Biplaza — PRO (Comercial)",
        "Formation APPI Tandem Pro. Destinée aux pilotes souhaitant exercer l'activité de pilote biplaceur contre rémunération.": "Formación APPI Tándem Pro. Destinada a pilotos que desean ejercer como piloto biplaza de forma remunerada.",
        "Filière Instructeur APPI": "Curso de Instructor APPI",
        "Assistant Instructeur": "Asistente de Instructor",
        "Première étape vers l'enseignement. Apprenez à encadrer au sol et assister un instructeur certifié lors des cours théoriques et pratiques.": "Primer paso hacia la enseñanza. Aprende a supervisar en tierra y asistir a un instructor certificado durante los cursos teóricos y prácticos.",
        "Candidater": "Solicitar",
        "Instructeur APPI": "Instructor APPI",
        "Devenez un professionnel de l'enseignement du vol libre. Formez les futurs pilotes jusqu'au niveau Advanced Pilot de manière autonome.": "Conviértete en un profesional de la enseñanza del vuelo libre. Forma a futuros pilotos hasta el nivel Advanced Pilot de forma autónoma.",
        "Nous rejoindre": "Únete a nosotros",
        "Vous souhaitez intégrer notre équipe pédagogique ou vous inscrire à une formation qualifiante ? Contactez-nous pour étudier votre dossier et valider vos acquis.": "¿Deseas unirte a nuestro equipo pedagógico o inscribirte en una formación cualificante? Contáctanos para estudiar tu expediente y validar tus logros.",
        "Contact & Candidature PRO": "Contacto y Candidatura PRO",
        "Contact &amp; Candidature PRO": "Contacto y Candidatura PRO",

        // ── Footer ──
        "École de parapente certifiée APPI.<br>Barrême, France.": "Escuela de parapente certificada APPI.<br>Barrême, Francia.",
        "Liens utiles": "Enlaces útiles",
        "Le Système APPI": "El Sistema APPI",
        "Pratique": "Práctico",
        "Contact & Accès": "Contacto y Acceso",
        "Contact &amp; Accès": "Contacto y Acceso",
        "Informations légales": "Información legal",
        "Mentions légales": "Aviso legal",
        "Politique de confidentialité": "Política de privacidad",
        "Conditions d'utilisation": "Condiciones de uso",
        "© 2026 Parapente.pro. Tous droits réservés.": "© 2026 Parapente.pro. Todos los derechos reservados.",

        // ── Mentions Légales Page ──
        "Informations juridiques obligatoires": "Información jurídica obligatoria",
        "Éditeur du site": "Editor del sitio",
        "Le site Parapente.pro est édité par Parapente.pro, situé à Barrême, France.": "El sitio Parapente.pro está editado por Parapente.pro, ubicado en Barrême, Francia.",
        "Responsable de publication": "Responsable de publicación",
        "[Nom du responsable]": "[Nombre del responsable]",
        "Hébergeur": "Alojamiento",
        "Le site est hébergé par GitHub Pages, GitHub Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA.": "El sitio está alojado en GitHub Pages, GitHub Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA.",
        "Propriété intellectuelle": "Propiedad intelectual",
        "L'ensemble du contenu (textes, images, vidéos, etc.) de ce site est protégé par le droit d'auteur. Toute reproduction est interdite sans autorisation préalable.": "Todo el contenido (textos, imágenes, vídeos, etc.) de este sitio está protegido por derechos de autor. Queda prohibida su reproducción sin autorización previa.",
        "Crédits photos": "Créditos fotográficos",
        "Images : Parapente.pro, ou libres de droits sauf mention contraire.": "Imágenes: Parapente.pro, o libres de derechos salvo mención contraria.",

        // ── Politique de Confidentialité Page ──
        "Protection de vos données personnelles (RGPD)": "Protección de sus datos personales (RGPD)",
        "Responsable du traitement des données": "Responsable del tratamiento de datos",
        "Le responsable du traitement des données est Parapente.pro, joignable à l'adresse email suivante : contact@parapente.pro.": "El responsable del tratamiento de datos es Parapente.pro, disponible en la siguiente dirección de correo: contact@parapente.pro.",
        "Types de données collectées": "Tipos de datos recopilados",
        "Lors de l'utilisation de notre formulaire de contact, nous collectons les données suivantes : nom, email, téléphone, et le contenu de votre message.": "Al utilizar nuestro formulario de contacto, recopilamos los siguientes datos: nombre, email, teléfono y el contenido de su mensaje.",
        "Finalité du traitement": "Finalidad del tratamiento",
        "Ces données sont utilisées uniquement dans le but de répondre à vos demandes de renseignements, inscriptions ou toute autre communication initiée par vos soins.": "Estos datos se utilizan únicamente para responder a sus solicitudes de información, inscripciones o cualquier otra comunicación iniciada por usted.",
        "Durée de conservation": "Período de conservación",
        "Les données personnelles sont conservées le temps nécessaire au traitement de votre demande, puis sont supprimées conformément aux obligations légales (maximum 3 ans d'inactivité).": "Los datos personales se conservan el tiempo necesario para el tratamiento de su solicitud y se eliminan conforme a las obligaciones legales (máximo 3 años de inactividad).",
        "Cookies et traceurs": "Cookies y rastreadores",
        "Ce site utilise Google Fonts pour l'affichage de ses typographies, ce qui peut entraîner le dépôt de cookies tiers ou la collecte de votre adresse IP par Google.": "Este sitio utiliza Google Fonts para la visualización de tipografías, lo que puede implicar la instalación de cookies de terceros o la recopilación de su dirección IP por parte de Google.",
        "Droits des utilisateurs": "Derechos de los usuarios",
        "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, veuillez nous contacter à l'adresse : contact@parapente.pro.": "Conforme al RGPD, usted dispone del derecho de acceso, rectificación, supresión y portabilidad de sus datos. Para ejercer estos derechos, contacte con nosotros en: contact@parapente.pro.",

        // ── Conditions d'Utilisation Page ──
        "Conditions d'Utilisation": "Condiciones de Uso",
        "Règles d'utilisation du site web": "Reglas de uso del sitio web",
        "Objet": "Objeto",
        "Les présentes conditions générales ont pour objet de définir les modalités et conditions d'utilisation des services proposés sur le site Parapente.pro.": "Las presentes condiciones generales tienen por objeto definir las modalidades y condiciones de uso de los servicios ofrecidos en el sitio Parapente.pro.",
        "Accès au site": "Acceso al sitio",
        "Le site est accessible gratuitement à tout utilisateur disposant d'un accès à internet. L'éditeur se réserve le droit de suspendre ou modifier l'accès sans préavis.": "El sitio es accesible gratuitamente para cualquier usuario con acceso a internet. El editor se reserva el derecho de suspender o modificar el acceso sin previo aviso.",
        "Les marques, logos, signes et tout autre contenu du site font l'objet d'une protection par le Code de la propriété intellectuelle.": "Las marcas, logotipos, signos y demás contenido del sitio están protegidos por el Código de propiedad intelectual.",
        "Responsabilité": "Responsabilidad",
        "L'éditeur du site ne saurait être tenu responsable des erreurs, omissions, ou d'une absence de disponibilité des informations et services.": "El editor del sitio no será responsable de los errores, omisiones o falta de disponibilidad de la información y los servicios.",
        "Liens externes": "Enlaces externos",
        "Le site peut contenir des liens hypertextes vers d'autres sites. L'éditeur ne prend aucun compromiso concernant ces autres sites auxquels vous pourriez avoir accès.": "El sitio puede contener enlaces a otros sitios web. El editor no asume compromiso alguno respecto a estos otros sitios a los que usted podría acceder.",
        "Droit applicable": "Derecho aplicable",
        "La législation française s'applique au présent contrat. En cas d'absence de résolution amiable d'un litige né entre les parties, les tribunaux français seront seuls compétents.": "La legislación francesa se aplica al presente contrato. En caso de ausencia de resolución amigable de un litigio entre las partes, los tribunales franceses serán los únicos competentes.",

        // ── Calendar JS strings ──
        "Toutes": "Todas",
        "Loisir": "Ocio",
        "Grille": "Cuadrícula",
        "Liste": "Lista",
        "Aucune formation trouvée pour ce filtre.": "No se encontraron cursos para este filtro.",
        "Places dispo": "Plazas disponibles",
        "Presque complet": "Casi completo",
        "Complet": "Completo",
        "S\u2019inscrire en liste d\u2019attente": "Inscribirse en lista de espera",
        "Dates :": "Fechas:",
        "Niveau requis :": "Nivel requerido:",
        "Disponibilité :": "Disponibilidad:",
        "* Des aides au financement peuvent être possibles (AFDAS, etc.) selon votre statut.": "* Pueden existir ayudas de financiación (AFDAS, etc.) según su situación.",
        "Contactez-nous": "Contáctanos"
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

        // Walk ALL text-bearing elements
        const textElements = document.querySelectorAll('h1, h2, h3, h4, p, a, span, button, th, td, label, li, option, div.footer-bottom, div.nav-brand-sub, div.nav-brand-text');

        textElements.forEach(el => {
            // Skip elements that contain other translatable children (avoid double-translating)
            if (el.tagName === 'LI' && el.querySelector('a')) return;
            if (el.tagName === 'P' && el.querySelector('strong')) {
                // Handle compound paragraphs (e.g. footer with <strong>WhatsApp :</strong>)
                if (!el.dataset.origText) {
                    el.dataset.origText = el.innerHTML.trim();
                }
                const orig = el.dataset.origText;
                if (lang === 'fr') {
                    el.innerHTML = orig;
                } else if (dict && dict[orig]) {
                    el.innerHTML = dict[orig];
                }
                return;
            }

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
                // Try plain text match (strip HTML tags)
                const plainOrig = orig.replace(/<[^>]*>/g, '').trim();
                if (dict && dict[plainOrig]) {
                    el.textContent = dict[plainOrig];
                }
            }
        });

        // Translate placeholder attributes on inputs and textareas
        const placeholderDict = {
            en: {
                "Votre nom": "Your name",
                "votre@email.com": "your@email.com",
                "Détaillez votre demande (niveau actuel, dates souhaitées...)": "Details about your request (current level, desired dates...)"
            },
            es: {
                "Votre nom": "Tu nombre",
                "votre@email.com": "tu@email.com",
                "Détaillez votre demande (niveau actuel, dates souhaitées...)": "Detalla tu solicitud (nivel actual, fechas deseadas...)"
            }
        };

        document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(input => {
            if (!input.dataset.origPlaceholder) {
                input.dataset.origPlaceholder = input.getAttribute('placeholder');
            }
            const origPh = input.dataset.origPlaceholder;
            if (lang === 'fr') {
                input.setAttribute('placeholder', origPh);
            } else if (placeholderDict[lang] && placeholderDict[lang][origPh]) {
                input.setAttribute('placeholder', placeholderDict[lang][origPh]);
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
