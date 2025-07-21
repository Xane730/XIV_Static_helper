const TANKS = ["Paladin", "Warrior", "Dark Knight", "Gunbreaker"];
const PURE_HEALERS = ["White Mage", "Astrologian"];
const SHIELD_HEALERS = ["Scholar", "Sage"];
const MELEE_DPS = ["Monk", "Dragoon", "Ninja", "Samurai", "Reaper", "Viper"];
const RANGED_DPS = [
    "Bard", "Machinist", "Dancer",
    "Black Mage", "Summoner", "Red Mage", "Pictomancer"
];

document.getElementById('validateBtn').addEventListener('click', () => {
    const players = document.querySelectorAll('#players > div');
    const selectedRoles = [];
    const preferredJobs = [];

    players.forEach((player, index) => {
        const key = `player-${index + 1}-jobStates`;
        const state = JSON.parse(sessionStorage.getItem(key)) || {};
        const selected = Object.keys(state).filter(job => state[job] > 0);
        const preferred = Object.keys(state).filter(job => state[job] === 2);
        selectedRoles.push(selected);
        preferredJobs.push(preferred);
    });

    const combinations = getCombinations(selectedRoles, 8);
    const valid = combinations.filter(isValidStatic);

    valid.sort((a, b) => {
        const countPref = combo =>
            combo.reduce((count, job, i) =>
                count + (preferredJobs[i]?.includes(job) ? 1 : 0), 0);
        return countPref(b) - countPref(a);
    });

    displayResults(valid, preferredJobs);
});

function getCombinations(arr, size) {
    if (arr.length === 0) return [[]];
    const [first, ...rest] = arr;
    const restComb = getCombinations(rest, size - 1);
    return first.flatMap(option =>
        restComb.map(comb => [option, ...comb])
    );
}

function isValidStatic(combo) {
    if (combo.length !== 8) return false;

    const flat = combo.flat();
    const uniqueJobs = new Set(flat);
    if (uniqueJobs.size !== flat.length) return false;

    const tanks = flat.filter(j => TANKS.includes(j)).length;
    const pure = flat.filter(j => PURE_HEALERS.includes(j)).length;
    const shield = flat.filter(j => SHIELD_HEALERS.includes(j)).length;
    const melee = flat.filter(j => MELEE_DPS.includes(j)).length;
    const ranged = flat.filter(j => RANGED_DPS.includes(j)).length;

    return (
        tanks === 2 &&
        pure === 1 &&
        shield === 1 &&
        melee === 2 &&
        ranged === 2
    );
}

function displayResults(validCombos, preferredJobs) {
    const area = document.getElementById('resultArea');
    area.innerHTML = '';

    const players = document.querySelectorAll('#players > div');
    const playerInfos = Array.from(players).map((p, i) => {
        const first = p.querySelector('input[placeholder="First Name"]')?.value.trim();
        const last = p.querySelector('input[placeholder="Last Name"]')?.value.trim();
        const name = (first || last) ? `${first} ${last}`.trim() : `Player ${i + 1}`;
        return { name, node: p };
    });

    if (validCombos.length === 0) {
        area.innerHTML = `<p class="text-red-400 font-bold">No valid static found.</p>`;
        return;
    }

    area.innerHTML += `<p class="text-green-400 font-bold mb-4">${validCombos.length} valid static(s) found (sorted by preferred jobs).</p>`;

    validCombos.forEach((combo, idx) => {
        const combined = combo.map((job, i) => ({
            job,
            player: playerInfos[i].name,
            preferred: preferredJobs[i]?.includes(job)
        }));
        const preferredCount = combined.filter(p => p.preferred).length;
        const preferenceScore = Math.round((preferredCount / 8) * 100);

        const sorted = [];
        sorted.push(...combined.filter(p => TANKS.includes(p.job)).slice(0, 2));
        sorted.push(...combined.filter(p => PURE_HEALERS.includes(p.job)).slice(0, 1));
        sorted.push(...combined.filter(p => SHIELD_HEALERS.includes(p.job)).slice(0, 1));
        sorted.push(...combined.filter(p => MELEE_DPS.includes(p.job)).slice(0, 2));
        sorted.push(...combined.filter(p => RANGED_DPS.includes(p.job)).slice(0, 2));

        const jobIcon = (jobName) => {
            const entries = Object.values(jobData).flat();
            const found = entries.find(j => j.name === jobName);
            return found ? found.icon : '';
        };

        area.innerHTML += `
        <div class="bg-[#003366] border border-white rounded p-4 mb-4 shadow-md w-[50%]">
            <div class="text-lg font-bold text-white mb-1">#${idx + 1} Valid Static</div>
            <div class="text-sm text-yellow-300 mb-2">Preference match: ${preferenceScore}%</div>
            <div class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center">
                ${sorted.map(p => `
                    <label class="cursor-pointer label-glow">
                        ${p.preferred ? `<img class="job-glow" src="${jobIcon(p.job)}" alt="">` : ''}
                        <img src="${jobIcon(p.job)}" alt="${p.job}" class="w-9 h-9 rounded" />
                    </label>
                    <span class="text-white">${p.player}</span>
                `).join('')}
            </div>
        </div>
        `;
    });
}
