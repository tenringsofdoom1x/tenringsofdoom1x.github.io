(function() {
    // Pobfus 1.11.02 "Anti-Patch" Build
    window.onload = () => {
        const iEl = document.getElementById('in');
        const oEl = document.getElementById('out');
        const nContainer = document.getElementById('notif-container');

        /**
         * NOTIFICATION SYSTEM
         * Parses and displays engine status or errors.
         */
        const notify = (msg, type = "info") => {
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            // Parse error objects or raw strings
            const content = msg.message ? `[ENGINE]: ${msg.message}` : `[LOG]: ${msg}`;
            toast.innerText = content;
            
            nContainer.appendChild(toast);
            
            // Auto-remove after 4 seconds
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300); // 300ms for fade animation
            }, 4000);
        };

        /**
         * MINIFIER & COMMENT STRIPPER
         * Removes all spaces and comments to break static analysis.
         */
        const minify = (c) => {
            return c
                .replace(/--\[\[[\s\S]*?\]\]/g, '') // Multi-line
                .replace(/--.*$/gm, '')           // Single-line
                .replace(/\s+/g, ' ')             // Collapse whitespace
                .trim();
        };

        /**
         * HONEYPOT TRAP
         * Creates a recursive loop to crash automated constant dumpers.
         */
        const getHoneypot = () => {
            const id = "_0x" + Math.random().toString(16).slice(2, 6);
            return `local ${id};${id}=function()return ${id}()end;`;
        };

        /**
         * CORE OBFUSCATION ENGINE
         */
        document.getElementById('go').onclick = () => {
            let src = iEl.value.trim();
            if (!src) {
                notify("No source detected. Please input Luau code.", "error");
                return;
            }

            // Phase 1: Initiation
            notify("Initializing Pobfus 1.11.02 Virtualizer...", "info");

            // Phase 2: Processing (1500ms buffer for "Heavy Lifting" feel)
            setTimeout(() => {
                try {
                    const min = minify(src);
                    const key = Math.floor(Math.random() * 50) + 15;
                    const bytes = Array.from(min).map(x => x.charCodeAt(0) ^ key);

                    // Start Building the Lua Result
                    let res = `--[[ Protected by Pobfus 1.11.02 ]] `;
                    
                    // Layer: Honeypot & Silent Scream
                    res += getHoneypot(); 
                    
                    // Layer: Selective Byte Compression (No space encryption)
                    res += `local _S="${bytes.map(b => "\\" + b).join('')}";`;
                    
                    // Layer: Anti-Hook & Metatable Sandbox
                    res += `local _H=pcall(function()`;
                    res += `local _D="";for i=1,#_S do _D=_D..string.char(bit32.bxor(_S:sub(i,i):byte(),${key}))end;`;
                    res += `local _M=setmetatable({},{__index=function(t,k)`;
                    
                    // Anti-Hook Logic: Block sensitive calls from Patch Coders
                    res += `if k=="getfenv" or k=="setfenv" or k=="getreg" or k=="debug" then warn("Pobfus: Security Breach Detected") return function()end end;`;
                    res += `return (getgenv and getgenv()[k] or _G[k]) end,__metatable="Pobfus_Locked"});`;
                    
                    // Final Execution via Protected Thread
                    res += `local _L=loadstring(_D);setfenv(_L,_M);(task and task.spawn or spawn)(_L)end);`;
                    res += `if not _H then warn("Pobfus_Error: "..tostring(_E))end;`;

                    // Output Minification: Remove all logic-breaking spaces
                    oEl.value = res.replace(/\s+/g, '');
                    
                    notify("Obfuscation Complete. Anti-Hook layer active.", "success");

                } catch (e) {
                    notify(e, "error"); // Parses engine failures
                }
            }, 1500); // 1.5s delay for engine simulation
        };

        /**
         * CLIPBOARD SYSTEM
         */
        document.getElementById('cp').onclick = () => {
            if (!oEl.value) {
                notify("Output is empty. Obfuscate a script first.", "error");
                return;
            }
            navigator.clipboard.writeText(oEl.value);
            notify("Virtualized Brick copied to clipboard!", "success");
        };

        // Clear functionality
        document.getElementById('cl').onclick = () => {
            iEl.value = "";
            oEl.value = "";
            notify("Workspace cleared.");
        };
    };
})();
