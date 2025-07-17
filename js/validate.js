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

    players.forEach(player => {
        const checked = player.querySelectorAll('input[type="checkbox"]:checked');
        const jobs = Array.from(checked).map(c => c.value);
        selectedRoles.push(jobs);
    });

    const combinations = getCombinations(selectedRoles, 8);
    const valid = combinations.filter(isValidStatic);

    displayResults(valid);
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

function displayResults(validCombos) {
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

    area.innerHTML += `<p class="text-green-400 font-bold mb-2">${validCombos.length} valid static(s) found.</p>`;

    validCombos.slice(0, 10).forEach((combo, idx) => {
        const combined = combo.map((job, i) => ({
        job,
        player: playerInfos[i].name
        }));

        const sorted = [];
        sorted.push(...combined.filter(p => TANKS.includes(p.job)).slice(0, 2));
        sorted.push(...combined.filter(p => PURE_HEALERS.includes(p.job)).slice(0, 1));
        sorted.push(...combined.filter(p => SHIELD_HEALERS.includes(p.job)).slice(0, 1));
        sorted.push(...combined.filter(p => MELEE_DPS.includes(p.job)).slice(0, 2));
        sorted.push(...combined.filter(p => RANGED_DPS.includes(p.job)).slice(0, 2));

        area.innerHTML += `<p class="mb-1 font-bold">#${idx + 1}</p><ul class="mb-4 list-disc list-inside">`;
        sorted.forEach(p => {
        area.innerHTML += `<li><span class="text-yellow-200">${p.player}</span> → <span class="text-white">${p.job}</span></li>`;
        });
        area.innerHTML += `</ul>`;
  });
}

