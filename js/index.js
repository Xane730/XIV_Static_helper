const JOB_DATA = {
        "Tank": [
            { "name": "Paladin", "icon": "../resources/images/Paladin_Icon.png" },
            { "name": "Warrior", "icon": "../resources/images/Warrior_Icon.png" },
            { "name": "Dark Knight", "icon": "../resources/images/Dark_Knight_Icon.png" },
            { "name": "Gunbreaker", "icon": "../resources/images/Gunbreaker_Icon.png" }
        ],
        "Healer": [
            { "name": "White Mage", "icon": "../resources/images/White_Mage_Icon.png" },
            { "name": "Scholar", "icon": "../resources/images/Scholar_Icon.png" },
            { "name": "Astrologian", "icon": "../resources/images/Astrologian_Icon.png" },
            { "name": "Sage", "icon": "../resources/images/Sage_Icon.png" }
        ],
        "Melee DPS": [
            { "name": "Monk", "icon": "../resources/images/Monk_Icon.png" },
            { "name": "Dragoon", "icon": "../resources/images/Dragoon_Icon.png" },
            { "name": "Ninja", "icon": "../resources/images/Ninja_Icon.png" },
            { "name": "Samurai", "icon": "../resources/images/Samurai_Icon.png" },
            { "name": "Reaper", "icon": "../resources/images/Reaper_Icon.png" },
            { "name": "Viper", "icon": "../resources/images/Viper_Icon.png" }
        ],
        "Physical Ranged DPS": [
            { "name": "Bard", "icon": "../resources/images/Bard_Icon.png" },
            { "name": "Machinist", "icon": "../resources/images/Machinist_Icon.png" },
            { "name": "Dancer", "icon": "../resources/images/Dancer_Icon.png" }
        ],
        "Magical Ranged DPS": [
            { "name": "Black Mage", "icon": "../resources/images/Black_Mage_Icon.png" },
            { "name": "Summoner", "icon": "../resources/images/Summoner_Icon.png" },
            { "name": "Red Mage", "icon": "../resources/images/Red_Mage_Icon.png" },
            { "name": "Pictomancer", "icon": "../resources/images/Pictomancer_Icon.png" }
        ]
    };

const PIXEL_JOB_IMAGES = {
    "Paladin": ["Paladin.png"],
    "Warrior": ["Warrior.png"],
    "Dark Knight": ["Dark_Knight.png"],
    "Gunbreaker": ["Gunbreaker.png"],
    "White Mage": ["White_Mage.png"],
    "Scholar": ["Scholar.png"],
    "Astrologian": ["Astrologian.png"],
    "Sage": ["Sage.png"],
    "Monk": ["Monk.png"],
    "Samurai": ["Samurai.png"],
    "Dragoon": ["Dragoon.png"],
    "Reaper": ["Reaper.png"],
    "Ninja": ["Ninja.png"],
    "Viper": ["Viper.png"],
    "Bard": ["Bard.png"],
    "Machinist": ["Machinist.png"],
    "Dancer": ["Dancer.png"],
    "Black Mage": ["Black_Mage.png"],
    "Summoner": ["Summoner.png"],
    "Red Mage": ["Red_Mage.png"],
    "Pictomancer": ["Pictomancer.png"]
};

function getPixelImage(jobsPreferred, jobsAvailable) {
    const pool = (jobsPreferred.length > 0 ? jobsPreferred : jobsAvailable)
        .flatMap(job => PIXEL_JOB_IMAGES[job] || []);
    if (pool.length === 0) return null;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    return `../resources/images/pixel_icons/${pick}`;
}

function updatePlayerImage(index) {
    const stateKey = `player-${index + 1}-jobStates`;
    const jobStates = JSON.parse(sessionStorage.getItem(stateKey)) || {};
    const jobsAvailable = Object.keys(jobStates).filter(job => jobStates[job] > 0);
    const jobsPreferred = Object.keys(jobStates).filter(job => jobStates[job] === 2);
    const img = document.querySelector(`#players > div:nth-child(${index + 1}) img.player-image`);
    const imagePath = getPixelImage(jobsPreferred, jobsAvailable);
    if (img && imagePath) img.src = imagePath;
}

window.addEventListener('DOMContentLoaded', () => {
    const playersContainer = document.getElementById('players');
    const jobEntries = Object.entries(JOB_DATA);

    for (let i = 1; i <= 8; i++) {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'bg-[#003366] border border-white rounded p-4 flex flex-col md:flex-row gap-6 shadow-lg';

        const playerInfo = document.createElement('div');
        playerInfo.className = 'md:w-1/3 w-full';
        playerInfo.innerHTML = `
            <div class="flex gap-4 items-center mb-4">
                <div class="bg-white p-1 rounded w-[33%] h-[33%]">
                    <img src="../resources/images/pixel_icons/Paladin.png" class="w-auto h-auto player-image" />
                </div>
                <div class="flex flex-col w-full">
                    <h2 class="text-xl font-semibold">Player ${i}</h2>
                    <input type="text" placeholder="First Name" class="mb-2 w-full px-3 py-2 bg-[#002244] text-white border border-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    <input type="text" placeholder="Last Name" class="w-full px-3 py-2 bg-[#002244] text-white border border-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
            </div>
        `;

        const jobSelection = document.createElement('div');
        jobSelection.className = 'md:w-3/4 w-full';
        jobSelection.innerHTML = `
        <div class="flex flex-col md:flex-row gap-2 items-start">
        <div class="flex flex-col gap-2 w-auto md:w-fill">
            ${["Tank", "Healer"].map(category => `
            <div>
                <h3 class="font-semibold text-sm text-blue-200 mb-1">${category}</h3>
                <div class="flex flex-wrap gap-1 p-1 bg-[#001933] rounded">
                ${JOB_DATA[category].map(job => `
                    <label class="cursor-pointer">
                        <input type="checkbox" class="peer hidden" name="job-${i}" value="${job.name}" />
                        <img src="${job.icon}" alt="${job.name}" title="${job.name}"
                            class="w-10 h-10 rounded opacity-40 peer-checked:opacity-100 transition" />
                    </label>
                `).join('')}
                </div>
            </div>
            `).join('')}
        </div>
        <div class="flex flex-col gap-2 w-auto md:w-1/2">
            <div>
            <h3 class="font-semibold text-sm text-blue-200 mb-1">Melee DPS</h3>
            <div class="flex flex-wrap gap-1 p-1 bg-[#001933] rounded w-fit">
                ${JOB_DATA["Melee DPS"].map(job => `
                <label class="cursor-pointer">
                    <input type="checkbox" class="peer hidden" name="job-${i}" value="${job.name}" />
                    <img src="${job.icon}" alt="${job.name}" title="${job.name}"
                        class="w-10 h-10 rounded opacity-40 peer-checked:opacity-100 transition" />
                </label>
                `).join('')}
            </div>
            </div>
            <div>
                <h3 class="font-semibold text-sm text-blue-200 mb-1">Ranged DPS</h3>
                <div class="flex">
                    <div class="flex flex-wrap gap-1 p-1 bg-[#001933] rounded w-fit">
                        ${JOB_DATA["Physical Ranged DPS"].map(job => `
                        <label class="cursor-pointer">
                            <input type="checkbox" class="peer hidden" name="job-${i}" value="${job.name}" />
                            <img src="${job.icon}" alt="${job.name}" title="${job.name}"
                                class="w-10 h-10 rounded opacity-40 peer-checked:opacity-100 transition" />
                        </label>
                        `).join('')}
                    </div>
                    <div class="w-[2%] h-1"></div>
                    <div class="flex flex-wrap gap-1 p-1 bg-[#001933] rounded w-fit">
                        ${JOB_DATA["Magical Ranged DPS"].map(job => `
                        <label class="cursor-pointer">
                            <input type="checkbox" class="peer hidden" name="job-${i}" value="${job.name}" />
                            <img src="${job.icon}" alt="${job.name}" title="${job.name}"
                                class="w-10 h-10 rounded opacity-40 peer-checked:opacity-100 transition" />
                        </label>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
        </div>
        `;

        playerDiv.appendChild(playerInfo);
        playerDiv.appendChild(jobSelection);
        playersContainer.appendChild(playerDiv);
    }

    function savePlayerData(index) {
        const playerDiv = document.querySelectorAll('#players > div')[index - 1];
        const inputs = playerDiv.querySelectorAll('input[type="text"]');
        const checkboxes = playerDiv.querySelectorAll('input[type="checkbox"]');

        const data = {
            firstName: inputs[0].value,
            lastName: inputs[1].value,
            jobs: Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value)
        };

        sessionStorage.setItem(`player-${index}`, JSON.stringify(data));
    }

    function loadPlayerData(index) {
        const saved = sessionStorage.getItem(`player-${index}`);
        const savedStates = sessionStorage.getItem(`player-${index}-jobStates`);
        if (!saved) return;

        const data = JSON.parse(saved);
        const playerDiv = document.querySelectorAll('#players > div')[index - 1];
        const inputs = playerDiv.querySelectorAll('input[type="text"]');

        if (inputs[0]) inputs[0].value = data.firstName || '';
        if (inputs[1]) inputs[1].value = data.lastName || '';

        if (savedStates) {
            sessionStorage.setItem(`player-${index}-jobStates`, savedStates);
        } else if (data.jobs) {
            const jobStates = {};
            data.jobs.forEach(job => jobStates[job] = 1);
            sessionStorage.setItem(`player-${index}-jobStates`, JSON.stringify(jobStates));
        }

        applyJobPreferenceUIToPlayer(playerDiv, index - 1);
    }

    for (let i = 1; i <= 8; i++) {
        loadPlayerData(i);

        const playerDiv = document.querySelectorAll('#players > div')[i - 1];
        const inputs = playerDiv.querySelectorAll('input[type="text"]');
        const checkboxes = playerDiv.querySelectorAll('input[type="checkbox"]');

        inputs.forEach(input => {
            input.addEventListener('input', () => savePlayerData(i));
        });

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => savePlayerData(i));
        });
    }
});

document.getElementById('exportBtn').addEventListener('click', () => {
    const players = document.querySelectorAll('#players > div');
    const exportData = [];

    players.forEach((player, index) => {
        const first = player.querySelector('input[placeholder="First Name"]')?.value.trim();
        const last = player.querySelector('input[placeholder="Last Name"]')?.value.trim();
        const stateKey = `player-${index + 1}-jobStates`;
        const jobStates = JSON.parse(sessionStorage.getItem(stateKey)) || {};

        const jobsAvailable = Object.keys(jobStates).filter(job => jobStates[job] > 0);
        const jobsPreferred = Object.keys(jobStates).filter(job => jobStates[job] === 2);

        exportData.push({
            firstName: first,
            lastName: last,
            jobsAvailable,
            jobsPreferred
        });
    });

    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const fileName = `static-composition-${timestamp}.json`;

    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);
});

document.getElementById('importBtn').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';

    input.addEventListener('change', async () => {
        const file = input.files[0];
        if (!file) return;

        const content = await file.text();
        try {
            const data = JSON.parse(content);
            if (!Array.isArray(data) || data.length !== 8) {
                alert("Invalid file format or player count.");
                return;
            }

            data.forEach((player, index) => {
                const playerDiv = document.querySelectorAll('#players > div')[index];
                const inputs = playerDiv.querySelectorAll('input[type="text"]');
                const checkboxes = playerDiv.querySelectorAll('input[type="checkbox"]');

                if (inputs[0]) {
                    inputs[0].value = player.firstName || '';
                }
                if (inputs[1]) {
                    inputs[1].value = player.lastName || '';
                }

                sessionStorage.setItem(`player-${index + 1}`, JSON.stringify({
                    firstName: inputs[0]?.value || '',
                    lastName: inputs[1]?.value || '',
                    jobs: (player.jobsAvailable || []).concat(player.jobsPreferred || [])
                }));

                const jobStates = {};
                (player.jobsAvailable || []).forEach(job => {
                    jobStates[job] = 1;
                });
                (player.jobsPreferred || []).forEach(job => {
                    jobStates[job] = 2;
                });

                sessionStorage.setItem(`player-${index + 1}-jobStates`, JSON.stringify(jobStates));
                applyJobPreferenceUIToPlayer(playerDiv, index);
            });

            setTimeout(() => {
                const script = document.createElement('script');
                script.src = '../js/job-preference.js';
                document.body.appendChild(script);
            }, 100);
        } catch (e) {
            alert("Failed to import: invalid JSON.");
        }
    });

    input.click();
});

document.getElementById('resetBtn').addEventListener('click', () => {
    const players = document.querySelectorAll('#players > div');

    players.forEach((playerDiv, index) => {
        const inputs = playerDiv.querySelectorAll('input[type="text"]');
        inputs.forEach(input => input.value = '');

        const stateKey = `player-${index + 1}-jobStates`;
        const emptyState = {};

        Object.values(JOB_DATA).flat().forEach(job => {
            emptyState[job.name] = 0;
        });

        sessionStorage.setItem(stateKey, JSON.stringify(emptyState));
        sessionStorage.removeItem(`player-${index + 1}`);

        applyJobPreferenceUIToPlayer(playerDiv, index);
        updatePlayerImage(index);
    });

    const resultArea = document.getElementById('resultArea');
    if (resultArea) resultArea.innerHTML = '';
});