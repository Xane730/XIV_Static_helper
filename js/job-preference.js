window.addEventListener('DOMContentLoaded', () => {
    const players = document.querySelectorAll('#players > div');

    players.forEach((playerDiv, playerIndex) => {
        const jobImages = playerDiv.querySelectorAll('label > img:last-child');
        const stateKey = `player-${playerIndex + 1}-jobStates`;
        let jobStates = JSON.parse(sessionStorage.getItem(stateKey)) || {};

        function updateVisuals() {
            jobImages.forEach(img => {
                const job = img.alt;
                const label = img.closest('label');
                label.classList.remove('label-glow');
                const oldGlow = label.querySelector('.job-glow');
                if (oldGlow) oldGlow.remove();
                img.classList.remove('opacity-40', 'opacity-100');

                const state = jobStates[job] || 0;
                if (state === 1) {
                    img.classList.add('opacity-100');
                } else if (state === 2) {
                    label.classList.add('label-glow');
                    const glowImg = img.cloneNode();
                    glowImg.classList.remove('opacity-100');
                    glowImg.classList.add('job-glow');
                    label.insertBefore(glowImg, img);
                    img.classList.add('opacity-100');
                } else {
                    img.classList.add('opacity-40');
                }
            });
        }

        function countPreferred() {
            return Object.values(jobStates).filter(state => state === 2).length;
        }

        jobImages.forEach(img => {
            img.addEventListener('click', () => {
                const job = img.alt;
                const current = jobStates[job] || 0;

                if (current === 0) {
                    jobStates[job] = 1;
                } else if (current === 1) {
                    if (countPreferred() >= 2) {
                        alert("You can only prefer up to 2 jobs.");
                        return;
                    }
                    jobStates[job] = 2;
                } else {
                    jobStates[job] = 0;
                }

                sessionStorage.setItem(stateKey, JSON.stringify(jobStates));
                updateVisuals();
            });
        });

        updateVisuals();
    });
});
