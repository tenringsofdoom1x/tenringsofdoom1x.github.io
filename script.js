/**
 * POBFUS ENGINE - v1.13.100
 * Logic: Topbar Integrated Controls & Dynamic Roof
 */

let _0xMealTimer;
let _0xMealActive = false;
let _0xMealInterval;
let _state = { mday: false, bmas: false };

const _011 = {
    _init: function() {
        // Initialization: Start ticker and idle detection
        this._updateTicker();
        setInterval(() => this._updateTicker(), 1000);
        this._resetIdle();
        
        this.print("SYSTEM: Core Logic v1.13.100 Initialized.", "#8b949e");
        this.print("SYSTEM: Current Region - PH House (Zamboanga).", "#39ff14");
        this.print("SYSTEM: Millennial Day Protocol is active.", "var(--p-gold)");
    },

    /**
     * Toggles seasonal overrides from the Topbar
     * @param {string} type - 'mday' or 'bmas'
     */
    toggle: function(type) {
        _state[type] = !_state[type];
        
        // Visual toggle for buttons
        const btn = document.getElementById(`btn-${type}`);
        btn.classList.toggle(type === 'bmas' ? 'active-bmas' : 'active-mday');
        
        // Enforce mutual exclusivity (only one override at a time)
        const other = type === 'bmas' ? 'mday' : 'bmas';
        if (_state[type] && _state[other]) {
            _state[other] = false;
            document.getElementById(`btn-${other}`).classList.remove('active-bmas', 'active-mday');
        }

        this.print(`[SYSTEM]: ${type.toUpperCase()} override flipped to ${_state[type] ? 'ON' : 'OFF'}.`, "#fff");
        this._updateTicker();
        
        // Force immediate event update if idle
        if (_0xMealActive) {
            this._resetIdle();
            this._startEvent();
        }
    },

    /**
     * Updates the Topbar Ticker and the Log House Roof color
     */
    _updateTicker: function() {
        const ticker = document.getElementById('status-ticker');
        const roof = document.getElementById('log-roof');
        const now = new Date();

        if (_state.bmas) {
            ticker.innerText = "🎄 BYTESMAS OVERRIDE ENGAGED 🎄";
            ticker.style.color = "var(--p-red)";
            roof.style.background = "#800000"; // Holiday Red
            roof.innerText = "Family Log House (Holiday Mode)";
        } else if (_state.mday) {
            ticker.innerText = "⭐ MILLENNIAL DAY OVERRIDE ENGAGED ⭐";
            ticker.style.color = "var(--p-gold)";
            roof.style.background = "#996600"; // Golden Roof
            roof.innerText = "Family Log House (Millennial Day)";
        } else {
            // Default: Bytesmas Countdown
            let bmasDate = new Date(now.getFullYear(), 11, 23);
            if (now > bmasDate) bmasDate = new Date(now.getFullYear() + 1, 11, 23);
            
            const diff = bmasDate - now;
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);

            ticker.innerText = `BYTESMAS COUNTDOWN: ${d}D ${h}H ${m}M ${s}S`;
            ticker.style.color = "var(--p-red)";
            roof.style.background = "#333"; // Standard Charcoal
            roof.innerText = "Family Log House (v1.13.100)";
        }
    },

    _getTime: function() {
        return new Date().toLocaleTimeString('en-PH', { hour12: false });
    },

    print: function(msg, color = "#fff") {
        const _log = document.getElementById('steve-logs');
        if (!_log) return;
        const div = document.createElement('div');
        div.className = 'log-entry';
        div.style.color = color;
        div.innerHTML = `<span class="log-ts">${this._getTime()}</span>${msg}`;
        _log.appendChild(div);
        _log.scrollTop = _log.scrollHeight;
    },

    _resetIdle: function() {
        clearInterval(_0xMealInterval);
        clearTimeout(_0xMealTimer);
        _0xMealActive = false;
        
        // Random idle trigger between 2-3 minutes
        const threshold = Math.random() * (180000 - 120000) + 120000;
        _0xMealTimer = setTimeout(() => this._startEvent(), threshold);
    },

    _startEvent: function() {
        _0xMealActive = true;
        const now = new Date();
        // Memorial Window (March 8 - March 15)
        const isMemorial = (now.getMonth() === 2 && now.getDate() >= 8 && now.getDate() <= 15);

        if (_state.bmas) {
            this.print("--- BYTESMAS EVE OVERRIDE ---", "var(--p-red)");
            this._runCycle([
                ["Anti-Tamper Mary", "I've obfuscated the holiday ham."],
                ["Sly Sarah", "I already decoded the guest list, Mom."],
                ["Minify Dave", "BY-PAS! BY-PAS!"],
                ["Skiddy Steve", "Can we just have one normal holiday?"]
            ], "var(--p-red)", 3500);
        } else if (_state.mday || isMemorial) {
            this.print("--- MILLENNIAL DAY / v0.7 MEMORIAL ---", "var(--p-gold)");
            this._runCycle([
                ["Hexadecimal Jim", "To v0.7. An outdated update, but a legend."],
                ["Anti-Tamper Mary", "March 14th is always a heavy day in the kernel."],
                ["Skiddy Steve", "v0.8 is still in his room. He misses his brother."],
                ["Buffer Bob", "I... finally... got... the... flowers..."],
                ["Minify Dave", "0.7... (Dave holds a deprecated floppy disk)"]
            ], "var(--p-gold)", 5000);
        } else {
            this.print("--- STANDARD HOUSEHOLD LOG ---", "#00aaff");
            this._runCycle([
                ["Anti-Tamper Mary", "Steve, dinner's ready. Stop script-kiddying."],
                ["Skiddy Steve", "I'm literally optimizing the house WiFi, Mom!"],
                ["Hexadecimal Jim", "Jim, pass the 0x53\x61\x6c\x74."]
            ], "#e0e0e0", 4500);
        }
    },

    _runCycle: function(pool, defColor, speed) {
        let i = 0;
        _0xMealInterval = setInterval(() => {
            if (!_0xMealActive) return;
            const entry = pool[i % pool.length];
            // Dave always gets his custom color
            const color = entry[0] === "Minify Dave" ? "#ff00ff" : defColor;
            this.print(`[${entry[0]}]: ${entry[1]}`, color);
            i++;
        }, speed);
    },

    _remote: function() {
        this.print("[SYSTEM]: TV Signal Sent. Flipping to the Memorial Channel...", "#ffcc00");
        this._resetIdle();
        this._startEvent();
    },

    _dl: function() {
        const _in = document.getElementById('input');
        if (!_in.value.trim()) {
            this.print("CRITICAL: [Anti-Tamper Mary] Empty source code detected!", "var(--p-red)");
            return;
        }
        clearInterval(_0xMealInterval);
        _0xMealActive = false;
        this.print("[Skiddy Steve]: Obfuscation Success. Pilot deployed.", "#39ff14");
        document.getElementById('output-view').value = `-- POBFUS 1.13.100\nlocal _ = "${btoa(_in.value)}"`;
        this._resetIdle();
    }
};

window.onload = () => _011._init();
['mousemove', 'keydown'].forEach(e => document.addEventListener(e, () => _011._resetIdle()));
