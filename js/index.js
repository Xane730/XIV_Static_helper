window.addEventListener('DOMContentLoaded', () => {
    const jobData = {
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

    const playersContainer = document.getElementById('players');
    const jobEntries = Object.entries(jobData);

    for (let i = 1; i <= 8; i++) {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'bg-[#003366] border border-white rounded p-4 flex flex-col md:flex-row gap-6 shadow-lg';

        const playerInfo = document.createElement('div');
        playerInfo.className = 'md:w-1/3 w-full';
        playerInfo.innerHTML = `
            <h2 class="text-xl font-semibold mb-4">Player ${i}</h2>
            <input type="text" placeholder="First Name" class="mb-2 w-full px-3 py-2 bg-[#002244] text-white border border-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input type="text" placeholder="Last Name" class="mb-4 w-full px-3 py-2 bg-[#002244] text-white border border-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
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
                ${jobData[category].map(job => `
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
                ${jobData["Melee DPS"].map(job => `
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
                        ${jobData["Physical Ranged DPS"].map(job => `
                        <label class="cursor-pointer">
                            <input type="checkbox" class="peer hidden" name="job-${i}" value="${job.name}" />
                            <img src="${job.icon}" alt="${job.name}" title="${job.name}"
                                class="w-10 h-10 rounded opacity-40 peer-checked:opacity-100 transition" />
                        </label>
                        `).join('')}
                    </div>
                    <div class="w-[2%] h-1"></div>
                    <div class="flex flex-wrap gap-1 p-1 bg-[#001933] rounded w-fit">
                        ${jobData["Magical Ranged DPS"].map(job => `
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
        console.log("test")
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
        if (!saved) return;

        const data = JSON.parse(saved);
        const playerDiv = document.querySelectorAll('#players > div')[index - 1];
        const inputs = playerDiv.querySelectorAll('input[type="text"]');
        const checkboxes = playerDiv.querySelectorAll('input[type="checkbox"]');

        if (data.firstName) inputs[0].value = data.firstName;
        if (data.lastName) inputs[1].value = data.lastName;

        checkboxes.forEach(cb => {
            cb.checked = data.jobs.includes(cb.value);
        });
    }

    for (let i = 1; i <= 8; i++) {
        console.log('zrze')
        loadPlayerData(i);

        const playerDiv = document.querySelectorAll('#players > div')[i - 1];
        const inputs = playerDiv.querySelectorAll('input[type="text"]');
        const checkboxes = playerDiv.querySelectorAll('input[type="checkbox"]');

        // Enregistrement sur changement de texte
        inputs.forEach(input => {
            input.addEventListener('input', () => savePlayerData(i));
        });

        // Enregistrement sur changement de job
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => savePlayerData(i));
        });
    }
});

