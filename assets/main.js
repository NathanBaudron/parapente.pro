document.addEventListener('DOMContentLoaded', () => {

    // ── Mobile Nav Toggle (centralized) ──
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
    let currentMonth = 4; // May (0-indexed: May=4)
    let currentFilter = 'all'; // 'all', 'loisir', 'pro'
    let currentView = 'grid'; // 'grid' or 'list'
    let selectedStage = null;

    function renderCalendar() {
        calContainer.innerHTML = '';

        // 1. Controls Header
        const header = document.createElement('div');
        header.className = 'cal-header-bar';

        // Month Selector Tabs & Nav
        const monthNav = document.createElement('div');
        monthNav.className = 'cal-month-nav';

        const prevBtn = document.createElement('button');
        prevBtn.className = 'cal-nav-btn';
        prevBtn.setAttribute('aria-label', 'Mois précédent');
        prevBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>';
        prevBtn.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 4) currentMonth = 8; // Loop May-Sept
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

        // Month Shortcut Pills (May to Sept)
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

        // Filter Bar & View Toggle
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

        // Filter stages according to current filter
        const filteredStages = STAGES_DATA.filter(stage => {
            if (currentFilter === 'all') return true;
            return stage.type === currentFilter;
        });

        if (currentView === 'grid') {
            renderGridView(calContainer, currentYear, currentMonth, filteredStages);
        } else {
            renderListView(calContainer, filteredStages);
        }

        // Render Stage Detail Card if any selected
        if (selectedStage) {
            renderSelectedStageDetail(calContainer, selectedStage);
        }
    }

    function renderGridView(container, year, month, stages) {
        const gridCard = document.createElement('div');
        gridCard.className = 'cal-grid-card';

        // Weekday Headers (Lun - Dim)
        const daysHeader = document.createElement('div');
        daysHeader.className = 'cal-days-header';
        const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
        dayNames.forEach(d => {
            const hCell = document.createElement('div');
            hCell.textContent = d;
            daysHeader.appendChild(hCell);
        });
        gridCard.appendChild(daysHeader);

        // Days Grid Calculation
        const monthGrid = document.createElement('div');
        monthGrid.className = 'cal-month-grid';

        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        // Convert Sunday=0 to Monday=0 indexing (0: Lun, 6: Dim)
        let startDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7;

        // 1. Previous month padding cells
        for (let i = startDayOfWeek - 1; i >= 0; i--) {
            const cell = document.createElement('div');
            cell.className = 'cal-day-cell other-month';
            const num = document.createElement('div');
            num.className = 'cal-day-num';
            num.textContent = daysInPrevMonth - i;
            cell.appendChild(num);
            monthGrid.appendChild(cell);
        }

        // 2. Current month day cells
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

            // Find stages active on this date
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

        // 3. Next month padding cells to complete 35 or 42 grid items
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
        detailCard.style.borderRadius = '12px';
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
