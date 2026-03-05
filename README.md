# 🛡️ Pobfus v1.0 | The Monolith
### *Advanced Lua Virtualization & Control-Flow Flattening*

> [!CAUTION]
> **STATUS: ⚠️ MAINTENANCE YELLOW**
> The engine is currently undergoing "Hell-Mode" optimization. Logic stability is 98%. 
> Current Version: 1.0-RC1 (Release Candidate)

**Pobfus** is a portable, single-file obfuscation engine designed to transform readable Lua source into a **Fat Hex-Table Brick Wall**. Using the **CamBuscate 0.1.1** core, it maps bytecode to localized variable constants, making static analysis a nightmare for decompilers.

---

## 🚀 "Hell-Mode" Features
* **The Fat Header:** Maps 40+ global functions (`Eb`, `ob`, `La`, etc.) to hide internal Lua calls.
* **Junk-Bit Injection:** Every byte is wrapped in random alphanumeric "noise" that is stripped at runtime by the internal VM.
* **Integrity Anchor:** The decryption key is mathematically tied to the ASCII logo length. Edit the logo = break the script.
* **Encrypted Roast Trap:** Logic-locked insults are buried within the hex-table, triggered only during tamper attempts.

---

## 🧱 The "Pobfus-Type" Logic
To build a Pobfus-Type engine, the logic follows a specific three-stage transformation:

### 1. Bitwise XOR Mapping
Every character $c$ in the source is processed through a XOR gate using a dynamic key $k$:
$$c_{enc} = c \oplus k$$

### 2. Chunky Hex Conversion
The resulting byte is converted to Hex and appended with random junk.
* **Original:** `p`
* **Pobfus Output:** `0x70abc` (Where `70` is the hex and `abc` is the junk noise)

### 3. Control-Flow Flattening
Instead of a linear execution, the Lua VM uses a `repeat...until` state machine. This prevents step-through debugging by hiding the execution order inside a "Dispatcher."



---

## 🛠️ Deployment (Zero-Cost Hosting)
Because this is a **Monolith Build**, you don't need APIs or Servers:

1.  **Fork** this repository.
2.  **Upload** your `index.html`.
3.  **Enable GitHub Pages** (Settings > Pages > Main Branch).
4.  Your obfuscator is live at `https://yourname.github.io/Pobfus`.

---

## 📝 v1.1 Roadmap (Maintenance Tasks)
- [ ] **JobId/PlaceId Locking:** Restrict script execution to specific game servers.
- [ ] **Discord Webhook Integration:** Notify the developer when a script is tampered with.
- [ ] **Variable Randomization:** Change the "Fat Names" (`Eb`, `ob`, etc.) on every click.
- [ ] **Recursive Virtualization:** Running the VM inside another VM for maximum weight.

---

## ⚠️ Disclaimer
Developed by **tenringsofdoom1x**. This tool is for educational purposes regarding code protection. We do not condone the malicious use of this software. If the code looks like ȟ̸̨̯̲̝̳͓͎̭͖͊̄̔̽̓̂̋̇̋̀̕̚͜ẹ̷͓̺̰̽̍͛̉̐̔͋̓̚͜l̷̢̨̨̫̼͙̞͉̗͉̖̲̖̞̿̉, it's working as intended.
