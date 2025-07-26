const JOB_CATEGORIES = {
    tank: ["Paladin", "Warrior", "Dark Knight", "Gunbreaker"],
    pure_heal: ["White Mage", "Astrologian"],
    shield_heal: ["Scholar", "Sage"],
    melee: ["Monk", "Dragoon", "Ninja", "Samurai", "Reaper", "Viper"],
    ranged_phys: ["Bard", "Machinist", "Dancer"],
    ranged_magic: ["Black Mage", "Summoner", "Red Mage", "Pictomancer"]
};

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

    if (selectedRoles.some(list => list.length === 0)) {
        alert("Each player must have at least one job selected.");
        return;
    }

    const combinations = getCombinations(selectedRoles, 8);
    console.log("🔍 Total generated combinations:", combinations.length);

    const valid = combinations.filter(isValidStatic);
    console.log(`✅ ${valid.length} valid combinations found`);

    valid.sort((a, b) => {
        const countPref = combo =>
            combo.reduce((count, job, i) =>
                count + (preferredJobs[i]?.includes(job) ? 1 : 0), 0);
        return countPref(b) - countPref(a);
    });

    displayResults(valid, preferredJobs);
});

function getCombinations(arrays, size) {
    const results = [];
    function backtrack(index, path) {
        if (index === size) {
            results.push([...path]);
            return;
        }
        for (const job of arrays[index]) {
            if (!job) continue;
            path.push(job);
            backtrack(index + 1, path);
            path.pop();
        }
    }
    backtrack(0, []);
    return results;
}

function isValidStatic(combo) {
    if (combo.length !== 8) return false;

    const allowDuplicateRoles = document.getElementById('allowDuplicateRoles')?.checked;
    const allowSameHealType = document.getElementById('allowSameHealType')?.checked;
    const allowSameRanged = document.getElementById('allowSameRanged')?.checked;

    const uniqueJobs = new Set(combo);
    if (!allowDuplicateRoles && uniqueJobs.size !== combo.length) return false;

    const roleCounts = {
        tank: 0,
        pure_heal: 0,
        shield_heal: 0,
        melee: 0,
        ranged_phys: 0,
        ranged_magic: 0
    };

    for (const job of combo) {
        for (const [role, jobs] of Object.entries(JOB_CATEGORIES)) {
            if (jobs.includes(job)) {
                roleCounts[role]++;
            }
        }
    }

    if (roleCounts.tank !== 2) return false;
    if (roleCounts.melee !== 2) return false;

    const totalHealers = roleCounts.pure_heal + roleCounts.shield_heal;
    const totalRanged = roleCounts.ranged_phys + roleCounts.ranged_magic;

    const validHeal = totalHealers === 2 && (
        (roleCounts.pure_heal === 1 && roleCounts.shield_heal === 1) ||
        (allowSameHealType && (roleCounts.pure_heal === 2 || roleCounts.shield_heal === 2))
    );

    const validRanged = totalRanged === 2 && (
        (roleCounts.ranged_phys === 1 && roleCounts.ranged_magic === 1) ||
        (allowSameRanged && (roleCounts.ranged_phys === 2 || roleCounts.ranged_magic === 2))
    )

    return validHeal && validRanged;
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

        sorted.push(...combined.filter(p => JOB_CATEGORIES.tank.includes(p.job)));

        // Healers
        const healers = combined.filter(p => 
            JOB_CATEGORIES.pure_heal.includes(p.job) || JOB_CATEGORIES.shield_heal.includes(p.job)
        );
        sorted.push(...healers);

        // Melee DPS
        sorted.push(...combined.filter(p => JOB_CATEGORIES.melee.includes(p.job)));

        // Ranged DPS (magical + physical)
        const ranged = combined.filter(p =>
            JOB_CATEGORIES.ranged_magic.includes(p.job) || JOB_CATEGORIES.ranged_phys.includes(p.job)
        );
        sorted.push(...ranged);

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
