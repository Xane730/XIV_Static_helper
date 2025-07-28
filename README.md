# XIV Static Helper

A web tool to help build and validate **Final Fantasy XIV static raid compositions**, ensuring balanced and optimal team setups.

🔗 <a href="https://xane730.github.io/XIV_Static_helper/html/" target="_blank">Live site</a>

---

## 🎯 Purpose

This tool allows you to easily build a **party of 8 players** and validate it against standard raid composition rules in FFXIV. It's especially useful for statics preparing for high-end content like Savage or Ultimate raids.

---

## 🧠 How It Works

### ✅ Default Valid Composition

A valid party includes:
- **2 Tanks**
- **1 Pure Healer** (*White Mage* or *Astrologian*)
- **1 Barrier Healer** (*Scholar* or *Sage*)
- **2 Melee DPS**
- **2 Ranged DPS** (either physical or magical)

### ⚙️ Customizable Options

Inside the **Control Panel**, you can tweak the validation rules:
- Allow **duplicate roles** (same job used by multiple players)
- Allow **two ranged DPS of the same type** (e.g., two casters or two physical ranged)
- Allow **two healers of the same type** (e.g., two pure healers)

### 👥 Player Panel

Each player can:
- Enter a **first and last name**
- Select one or more **available jobs**
- Mark **preferred jobs**
- See a **dynamic image** based on their selected/preferred job

### 🔄 Available Actions

- **Validate**: Check all possible team combinations that match your current rules
- **Import / Export**: Save or load your static as a JSON file
- **Reset**: Clear all current selections

---

## 📦 Project Structure

This is a **fully client-side project** built in **Vanilla JavaScript** and **Tailwind CSS** — no frameworks.

Key files:
- `index.html` — main page
- `index.js` — main logic and event handling
- `validate.js` — team validation rules and generation
- `storage.js` — handles sessionStorage logic
- `assets/img/` — dynamic job images
