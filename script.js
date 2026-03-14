/**
 * POBFUS ENGINE - v1.13.100
 * Logic: Memorial Day Amnesia & Encryption School Routines
 */

let _0xMealTimer;
let _0xMealActive = false;
let _0xMealInterval;
const _0xMealThreshold = (Math.random() * (210000 - 120000) + 120000);

const _011 = {
    _getTime: function() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { hour12: false });
    },

    print: function(msg, color = "#fff") {
        const _log = document.getElementById('steve-logs');
        if (_log) {
            const div = document.createElement('div');
            div.className = 'log-entry';
            div.style.color = color;
            div.innerHTML = `<span class="log-ts">${this._getTime()}</span>${msg}`;
            _log.appendChild(div);
            _log.scrollTop = _log.scrollHeight; // Auto-scroll to bottom
        }
    },

    _resetIdle: function() {
        if (_0xMealActive) {
            this.print("[SYSTEM]: User interaction. Family protocol suppressed.", "#ffcc00");
        }
        clearInterval(_0xMealInterval);
        clearTimeout(_0xMealTimer);
        _0xMealActive = false;
        _0xMealTimer = setTimeout(() => this._startMeal(), _0xMealThreshold);
    },

    _startMeal: function() {
        _0xMealActive = true;
        const isBreakfast = Math.random() > 0.5;
        this.print(`--- ${isBreakfast ? 'BREAKFAST' : 'DINNER'} PROTOCOL ENGAGED ---`, "#00aaff");

        const dinnerPool = [
            ["Anti-Tamper Mary", "Dinner is served! Why is everyone so quiet?"],
            ["Hexadecimal Jim", "Mary... it's the v0.8 Memorial. Why is the table so bright?"],
            ["Anti-Tamper Mary", "Oh goodness, I completely forgot! I was so focused on the kernel."],
            ["Skiddy Steve", "It's okay Mom, I brought the Mashed Junk-tatoes."],
            ["Sly Sarah", "I'm lighting a 0x46\x6c\x61\x6d\x65 for the pilots v0.7 and 1.0."],
            ["Buffer Bob", "I... am... passing... the... Control... Flow... Wine..."],
            ["Minify Dave", "Goo-goo? (Dave minifies the memorial napkin)"],
            ["Hexadecimal Jim", "To the fallen versions. A moment of silence for 0.8's brother."]
        ];

        const breakfastPool = [
            ["Anti-Tamper Mary", "Hurry up! The Encryption Middle School bus is almost here!"],
            ["Skiddy Steve", "I'm not ready for my Boolean Logic exam, Mom."],
            ["Sly Sarah", "Steve, just spoof your answers like everyone else at Encryption Middle."],
            ["Minify Dave", "Ma-ma! Minification Kindergarten Learning Center! NOW!"],
            ["Anti-Tamper Mary", "Yes Dave, we're dropping you at the Learning Center next."],
            ["Buffer Bob", "I... can't... find... my... backpack..."],
            ["Skiddy Steve", "Bob, it's right in front of you. You're still rendering."]
        ];

        const currentPool = isBreakfast ? breakfastPool : dinnerPool;
        let i = 0;

        _0xMealInterval = setInterval(() => {
            if (!_0xMealActive) { clearInterval(_0xMealInterval); return; }
            let selection = (i < currentPool.length) ? currentPool[i] : currentPool[Math.floor(Math.random() * currentPool.length)];
            const color = selection[0] === "Minify Dave" ? "#ff00ff" : "#e0e0e0";
            this.print(`[${selection[0]}]: ${selection[1]}`, color);
            i++;
        }, 4500);
    },

    _dl: function() {
        const _in = document.getElementById('input');
        const _out = document.getElementById('output-view');

        if (!_in.value.trim()) {
            this.print("CRITICAL: [Anti-Tamper Mary] You forgot the code, just like I forgot the memorial!", "#ff3131");
            this.print("[Skiddy Steve]: My school bus is faster than this empty script.", "#ff3131");
            return;
        }

        clearInterval(_0xMealInterval);
        _0xMealActive = false;

        this.print("[Anti-Tamper Mary]: WORK MODE. Clearing the table.", "#ff3131");
        
        // Simulating the POBFUS encode
        const _encoded = btoa(_in.value);
        _out.value = `-- POBFUS v1.13.100\nlocal _ = "${_encoded}"\nreturn(function(...) print('Pilot 1.13.100: Flight Successful') end)(...)`;

        // Download trigger
        const blob = new Blob([_out.value], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pobfus_payload.lua.txt`;
        a.click();

        this.print("AutoSave: Download Finished. Flight is airborne.", "#00aaff");
        this.print(`[Minify Dave]: (Baby Giggle) - Dave helped!`, "#ff00ff");
        this._resetIdle();
    }
};

window.onload = () => {
    _011.print("POBFUS v1.13.100 initialized. Pilot monitoring active.", "#39ff14");
    _011._resetIdle();
};

['mousemove', 'keydown'].forEach(e => document.addEventListener(e, () => _011._resetIdle()));        if (_icon) _icon.src = "https://img.icons8.com/?size=128&id=42bqS7y7Ga9o&format=png";
        
        this.print("POBFUS v1.13.100 initialized.", "#39ff14");
        this.print("Ready for flight. Systems clear.");
        this._resetIdle();
    },

    _resetIdle: function() {
        clearTimeout(_0xIdleTimer);
        _0xIsDinnerActive = false;
        _0xIdleTimer = setTimeout(() => this._startDinner(), _0xDinnerThreshold);
    },

    /**
     * FAMILY ERROR LOGS: Mentioned only when things break
     */
    _triggerFamilyError: function(type) {
        const _errBar = document[_0x110[1]](_0x110[4]);
        _errBar.style.display = 'block';
        setTimeout(() => { _errBar.style.display = 'none'; }, 4000);

        if (type === "EMPTY") {
            this.print("CRITICAL: [Anti-Tamper Mary] STOP. You are trying to obfuscate air. Input code!", "#ff3131");
            this.print("[Skiddy Steve]: Seriously? I can't fly a plane with no passengers.", "#ff3131");
            this.print("[Minify Dave]: (Baby Crying) - Bu-bu-buffer empty!", "#ff00ff");
        } else {
            this.print("CRITICAL: [Hexadecimal Jim] 0xERROR. The export path is corrupted.", "#ff3131");
            this.print("[Sly Sarah]: I tried to spoof the failure, but it's too messy.", "#ff3131");
            this.print("[Buffer Bob]: The... mashed... junk... is... spilling... everywhere...", "#ff3131");
        }
    },

    _startDinner: function() {
        _0xIsDinnerActive = true;
        const chats = [
            ["Anti-Tamper Mary", "It's quiet. v0.8's brother anniversary dinner is served."],
            ["Hexadecimal Jim", "Pass the 0x43\x6f\x6e\x74\x72\x6f\x6c\x20\x46\x6c\x6f\x77 Wine. To the pilots v0.7 and 1.0."],
            ["Skiddy Steve", "Mashed Junk Injection-tatoes are the best, Mom."],
            ["Sly Sarah", "I'm checking on v1.12.05's charity while I eat."],
            ["Buffer Bob", "Minify Dave... is... eating... his... Anti-Tamper Cheese... fast..."],
            ["Minify Dave", "Goo-goo! (50-day anniversary noises)"],
            ["Anti-Tamper Mary", "Remember 1.12.06 in the ICU tonight. Eat up, family."]
        ];
        
        this.print("--- IDLE MODE: FAMILY DINNER IN SESSION ---", "#00aaff");
        let i = 0;
        const interval = setInterval(() => {
            if (!_0xIsDinnerActive) { clearInterval(interval); return; }
            if (i < chats.length) {
                this.print(`[${chats[i][0]}]: ${chats[i][1]}`, "#e0e0e0");
                i++;
            } else { clearInterval(interval); }
        }, 4500);
    },

    _dl: function() {
        const _in = document[_0x110[1]](_0x110[3]);
        const _val = _in ? _in.value : '';

        // If empty, trigger the Family Error Logs
        if (!_val || _val.trim().length === 0) {
            this._triggerFamilyError("EMPTY");
            return;
        }

        _0xIsDinnerActive = false;
        
        try {
            const _fname = `pobfus-${Math.random().toString(36).substring(2, 15).toUpperCase()}.lua.txt`;
            const _blob = new Blob(["-- POBFUS PROTECTED --\n" + _val], { 'type': 'text/plain' });
            const _url = window.URL.createObjectURL(_blob);
            const _link = document.createElement('a');
            _link.href = _url;
            _link.download = _fname;
            _link.click();

            this.print(`AutoSave:Download Finished [${_fname}]`, "#00aaff");
        } catch (e) {
            this._triggerFamilyError("CRASH");
        }
        this._resetIdle();
    }
};

window.onload = () => _011._boot();
document.addEventListener('mousemove', () => _011._resetIdle());
document.addEventListener('keydown', () => _011._resetIdle());
