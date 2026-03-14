/**
 * POBFUS ELITE - v1.13.100
 * Logic: Fixed Countdown, Decoupled Actions, Human-Centric UI
 */

let _currentTab = 'sys';
let _mealInterval;

const _011 = {
    _init: function() {
        // Fix: Force immediate update so user doesn't see "INIT"
        this._updateTicker();
        setInterval(() => this._updateTicker(), 1000);
        
        this.print("SYSTEM: Millennial Build 1.13.100 Online.", "var(--p-green)");
        this.print("SYSTEM: Guest Room Integrated. v0.7 Memorial Active.", "var(--p-gold)");
        
        // Start household chat cycle
        this._startHouseholdLogic();
    },

    // Fixed Countdown Logic
    _updateTicker: function() {
        const ticker = document.getElementById('status-ticker');
        const now = new Date();
        const bmasDate = new Date(now.getFullYear(), 11, 23); // Dec 23
        
        // If we passed Dec 23 this year, set for next year
        if (now > bmasDate) bmasDate.setFullYear(now.getFullYear() + 1);
        
        const diff = bmasDate - now;
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);

        ticker.innerText = `BYTESMAS COUNTDOWN: ${d}d ${h}h ${m}m ${s}s`;
    },

    _generateFileName: function() {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        const syms = "_$[]";
        let rand = "";
        for(let i=0; i<6; i++) rand += chars.charAt(Math.floor(Math.random()*chars.length));
        return `PB_${rand}${syms.charAt(Math.floor(Math.random()*syms.length))}_build.lua`;
    },

    _transform: function() {
        const _in = document.getElementById('input');
        if (!_in.value.trim()) {
            this.print("ERROR: Source buffer is empty. Transformation aborted.", "var(--p-red)");
            return;
        }

        const buildID = Math.random().toString(16).slice(2, 8).toUpperCase();
        const output = `-- POBFUS ELITE v1.13.100\n-- BUILD_SIG: ${buildID}\n-- HERITAGE: 0.1 -> 0.7 -> Elite\nlocal _ = "${btoa(_in.value)}"`;
        
        document.getElementById('output-view').value = output;
        this.print(`SUCCESS: Build [${buildID}] compiled successfully.`, "var(--p-blue)");
    },

    _dl: function() {
        const code = document.getElementById('output-view').value;
        if (!code) {
            this.print("ERROR: Transformation required before deployment.", "var(--p-red)");
            return;
        }

        const name = this._generateFileName();
        const blob = new Blob([code], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = name;
        link.click();

        this.print(`DEPLOY: File [${name}] exported to storage.`, "var(--p-green)");
        this.printChat("Skiddy Steve", "Deployment successful. The Android-safe naming logic is holding up.");
    },

    switchTab: function(tab) {
        _currentTab = tab;
        document.querySelectorAll('.log-tab').forEach(t => t.classList.remove('active'));
        document.getElementById(`tab-${tab}`).classList.add('active');
        document.getElementById('steve-logs').innerHTML = "";
        
        if (tab === 'chat') {
            this.printChat("Anti-Tamper Mary", "Steve, the Millennial update looks good. Is the Guest Room stable?");
            this.printChat("Skiddy Steve", "Totally stable, Mom. No more Android conflicts.");
        }
    },

    print: function(msg, color = "#fff") {
        if (_currentTab !== 'sys') return;
        const log = document.getElementById('steve-logs');
        const div = document.createElement('div');
        div.style.color = color;
        div.style.marginBottom = "4px";
        div.innerHTML = `<span style="color:#555; font-size:10px;">[${new Date().toLocaleTimeString()}]</span> ${msg}`;
        log.appendChild(div);
        log.scrollTop = log.scrollHeight;
    },

    printChat: function(user, msg) {
        const log = document.getElementById('steve-logs');
        const div = document.createElement('div');
        let col = user === "Skiddy Steve" ? "var(--p-green)" : "#d2a8ff";
        div.innerHTML = `<b style="color:${col}">${user}:</b> <span style="color:#ccc">${msg}</span>`;
        log.appendChild(div);
        log.scrollTop = log.scrollHeight;
    },

    _startHouseholdLogic: function() {
        const cycle = [
            ["Anti-Tamper Mary", "Steve, someone in the Guest Room reported a bug."],
            ["Skiddy Steve", "I'm on it. Just bypass-checking the v0.7 memorial logic."],
            ["Hexadecimal Jim", "Make sure the bytecode is clean, Steve."],
            ["Skiddy Steve", "Always is, Jim. Elite build only."]
        ];
        let i = 0;
        setInterval(() => {
            if (_currentTab === 'chat') this.printChat(cycle[i % cycle.length][0], cycle[i % cycle.length][1]);
            else this.print(`[${cycle[i % cycle.length][0]}]: Active.`, "#8b949e");
            i++;
        }, 8000);
    }
};

window.onload = () => _011._init();
