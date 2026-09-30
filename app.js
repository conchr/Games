/* ============================================================
   GAMES HUB — FARSALA HISTORY GAMES
   ============================================================ */

// ------------------------------------------------------------
// ΔΕΔΟΜΕΝΑ ΠΑΙΧΝΙΔΙΩΝ
// ------------------------------------------------------------
const gamesData = {
    cryptolexa: [
        { title: 'Πήλινη Κυψέλη', icon: '🏺', url: 'https://conchr.github.io/Kipseli-Hangman/' },
        { title: 'Μπανιέρα — Λουτήρας', icon: '🛁', url: 'https://conchr.github.io/Baniera-Hangman/' },
        { title: 'Μολύβδινος Κατάδεσμος', icon: '📜', url: 'https://conchr.github.io/Katadesmos-Hangman/' },
        { title: 'Αμφορέας — Σίσυφος, Αυτόλυκος', icon: '🏛️', url: 'https://conchr.github.io/Amforeas-Hangman/' },
        { title: 'Οστέϊνοι Αστράγαλοι', icon: '🎲', url: 'https://conchr.github.io/Astragaloi/' },
        { title: 'Σταμνοειδής Πυξίδα', icon: '🪙', url: 'https://conchr.github.io/Stamnoidis-Pixida-Hangman/' }
    ],
    quiz: [
        { title: 'Κάστρο Καλλιθέας', icon: '🏰', url: 'https://conchr.github.io/Kastro-Kallitheas-Pr-for-Quiz/' },
        { title: 'Πύργος Καραμίχου', icon: '🗼', url: 'https://conchr.github.io/Karamichos-Pr-for-Quiz/' },
        { title: 'Μάχη Κυνός Κεφαλαί', icon: '⚔️', url: 'https://conchr.github.io/Kynos-Pr-for-Quiz/' },
        { title: 'Ακρόπολη Φαρσάλων', icon: '⛰️', url: 'https://conchr.github.io/Actopolis-Pr-for-Quiz/' },
        { title: 'Γέφυρα του Πασσά', icon: '🌉', url: 'https://conchr.github.io/Passa-Pr-for-Quiz/' },
        { title: 'Αχιλλέας', icon: '🛡️', url: 'https://conchr.github.io/Achilles-Pr-for-Quiz/' },
        { title: 'Ατυχής Πόλεμος', icon: '📖', url: 'https://conchr.github.io/1897-Pr-for-Quiz/' }
    ],
    puzzle: [
        { title: 'Puzzle #1', icon: '🧩', url: 'https://conchr.github.io/Dimotiko-Puzzle/' },
        { title: 'Puzzle #2', icon: '🧩', url: 'https://conchr.github.io/Argaleios-Puzzle/' },
        { title: 'Puzzle #3', icon: '🧩', url: 'https://conchr.github.io/Kallithea-Puzzle/', difficulty: 'hard' }
    ]
};

// ------------------------------------------------------------
// ΤΙΤΛΟΙ ΣΕΛΙΔΩΝ
// ------------------------------------------------------------
const pageTitles = {
    'index': {
        title: 'Μάθε την Ιστορία μέσα από το Παιχνίδι',
        subtitle: 'Διαδραστικά παιχνίδια για μικρούς και μεγάλους'
    },
    'cryptolexa': {
        title: 'Κρυπτόλεξα',
        subtitle: 'Επίλεξε ένα κρυπτόλεξο για να ξεκινήσεις'
    },
    'quiz': {
        title: 'Κουίζ Γνώσεων',
        subtitle: 'Δοκίμασε τις γνώσεις σου στην ιστορία'
    },
    'puzzle': {
        title: 'Puzzle Games',
        subtitle: 'Συναρμολόγησε εικόνες από τα Φάρσαλα'
    }
};

const pageOrder = ['index', 'cryptolexa', 'quiz', 'puzzle'];

// ------------------------------------------------------------
// ΚΑΤΑΣΚΕΥΗ ΚΑΡΤΩΝ ΠΑΙΧΝΙΔΙΩΝ
// ------------------------------------------------------------
function buildGameCards() {
    Object.keys(gamesData).forEach(category => {
        const container = document.getElementById('games-' + category);
        if (!container) return;

        const cardClass = 'game-' + category;

        gamesData[category].forEach(game => {
            const card = document.createElement('a');
            card.href = game.url;
            card.className = 'game-card ' + cardClass;
            card.rel = 'noopener noreferrer';

            let inner = `<span class="game-icon">${game.icon}</span>`;
            inner += `<h3 class="game-title">${game.title}</h3>`;

            if (game.difficulty === 'hard') {
                inner += `<span class="game-difficulty diff-hard">Δύσκολο</span>`;
            }

            card.innerHTML = inner;
            container.appendChild(card);
        });
    });
}

// ------------------------------------------------------------
// ΕΜΦΑΝΙΣΗ ΣΕΛΙΔΑΣ
// ------------------------------------------------------------
function showPage(pageId) {
    if (!pageOrder.includes(pageId)) pageId = 'index';

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    const target = document.getElementById('page-' + pageId);
    if (target) {
        target.classList.add('active');
        target.scrollTop = 0;
    }

    const titles = pageTitles[pageId];
    const titleText = document.getElementById('main-title-text');
    const subtitleText = document.getElementById('main-subtitle-text');
    if (titles && titleText && subtitleText) {
        titleText.textContent = titles.title;
        subtitleText.textContent = titles.subtitle;
    }

    const idx = pageOrder.indexOf(pageId);
    const pct = ((idx + 1) / pageOrder.length) * 100;
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) progressBar.style.width = pct + '%';

    if (location.hash !== '#' + pageId) {
        history.pushState({ page: pageId }, '', '#' + pageId);
    }
}

// Expose globally (για συμβατότητα)
window.showPage = showPage;

// ------------------------------------------------------------
// HASH ROUTING
// ------------------------------------------------------------
function handleHash() {
    const hash = (location.hash || '#index').substring(1);
    showPage(hash);
}

window.addEventListener('hashchange', handleHash);
window.addEventListener('popstate', handleHash);

// ------------------------------------------------------------
// KEYBOARD — ESCAPE → INDEX
// ------------------------------------------------------------
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const currentHash = (location.hash || '#index').substring(1);
        if (currentHash !== 'index') {
            location.hash = '#index';
        }
    }
});

// ------------------------------------------------------------
// INITIALIZE
// ------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    buildGameCards();
    handleHash();
});