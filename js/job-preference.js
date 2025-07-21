window.addEventListener('DOMContentLoaded', () => {
    const players = document.querySelectorAll('#players > div');

    players.forEach((playerDiv, playerIndex) => {
        const stateKey = `player-${playerIndex + 1}-jobStates`;
        let jobStates = JSON.parse(sessionStorage.getItem(stateKey)) || {};

        const labels = playerDiv.querySelectorAll('label');

        function updateVisuals() {
            labels.forEach(label => {
                // Supprimer tous les clones glow éventuels
                const allImages = label.querySelectorAll('img');
                allImages.forEach(img => {
                    if (img.classList.contains('job-glow')) img.remove();
                });

                const img = label.querySelector('img[alt]');
                const job = img.alt;
                const state = jobStates[job] || 0;

                label.classList.remove('label-glow');
                img.classList.remove('opacity-40', 'opacity-100');

                if (state === 0) {
                    img.classList.add('opacity-40');
                } else if (state === 1) {
                    img.classList.add('opacity-100');
                } else if (state === 2) {
                    img.classList.add('opacity-100');
                    label.classList.add('label-glow');

                    // Ajouter le glow derrière
                    const glow = img.cloneNode();
                    glow.className = 'job-glow';
                    glow.removeAttribute('alt');
                    label.insertBefore(glow, img);
                }
            });
        }

        function countPreferred() {
            return Object.values(jobStates).filter(state => state === 2).length;
        }

        labels.forEach(label => {
            const img = label.querySelector('img[alt]');
            const job = img.alt;

            label.addEventListener('click', (e) => {
                e.preventDefault();

                const current = jobStates[job] || 0;

                if (current === 0) {
                    jobStates[job] = 1; // Enable
                } else if (current === 1) {
                    if (countPreferred() >= 2) {
                        alert("You can only prefer up to 2 jobs.");
                        return;
                    }
                    jobStates[job] = 2; // Prefer
                } else {
                    jobStates[job] = 0; // Disable
                }

                sessionStorage.setItem(stateKey, JSON.stringify(jobStates));
                updateVisuals();
            });
        });

        updateVisuals();
    });
});
