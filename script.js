(function() {
    const SCRIPTS = {
        fib: `-- Fibonacci Algorithm Test\nlocal function fib(n)\n    local a, b = 0, 1\n    for i = 1, n do a, b = b, a + b end\n    return a\nend\nprint("Fibonacci(10): " .. tostring(fib(10)))`,
        print: `-- Global Environment Test\nprint("Pobfus Studio: Kernal Check")\nwarn("CamBuscate Virtualization: Operational")\nprint("Target: Lua 5.1/Luau Environment")`,
        aim: `-- Userdata/CFrame Logic Test\nlocal Settings = {Smooth = 0.5, FOV = 100}\nlocal function GetTarget()\n    local t = nil\n    for _,v in pairs(game.Players:GetPlayers()) do \n        if v.Character then t = v.Character.Head end \n    end\n    return t\nend\nprint("Logical Table Mapping Success")`,
        full: `-- High-Stress Instruction Suite\nprint("Executing Stress Test...")\nfor i = 1, 100 do\n    local res = (i * math.pi) / 2\n    if i % 10 == 0 then print("Step: " .. i) end\nend\nwarn("Full Instruction Cycle Complete")`
    };

    const ROASTS = [
        "your decompiler likes me~ too much...",
        "staring at my bytecode again? how lewd~",
        "senpai, your decompiler is crying~"
    ];

    const _barcode = (l) => {
        let r = "I";
        for(let i=0; i<l; i++) r += "Il".charAt(Math.floor(Math.random() * 2));
        return r;
    };

    window.onload = () => {
        const iEl = document.getElementById('in'), oEl = document.getElementById('out'), 
              sEl = document.getElementById('status'), sel = document.getElementById('scriptSelect');

        const updateStatus = (msg, color) => {
            sEl.innerText = msg.toUpperCase();
            sEl.style.color = color || "var(--acc)";
        };

        sel.onchange = () => {
            if (SCRIPTS[sel.value]) {
                iEl.value = SCRIPTS[sel.value];
                updateStatus("Loaded: " + sel.options[sel.selectedIndex].text, "var(--suc)");
            }
        };

        document.getElementById('cl').onclick = () => {
            iEl.value = ""; oEl.value = ""; updateStatus("Ready", "var(--suc)");
            sel.selectedIndex = 0;
        };

        document.getElementById('go').onclick = function() {
            if (!iEl.value.trim()) return updateStatus("Error: No Input", "var(--err)");
            updateStatus("Virtualizing...", "var(--acc)");

            setTimeout(() => {
                try {
                    const key = Math.floor(Math.random() * 90) + 30;
                    const raw = iEl.value;
                    let stream = [];

                    for (let i = 0; i < raw.length; i++) {
                        stream.push("0x" + (raw.charCodeAt(i) ^ key).toString(16).toUpperCase());
                        if (i % 8 === 0) stream.push(`"${ROASTS[Math.floor(Math.random() * ROASTS.length)]}_${_barcode(3)}"`);
                    }

                    const v = { env: _barcode(10), vm: _barcode(12), out: _barcode(10), tab: _barcode(15) };

                    let res = `--[[ POBFUS_1.11.01 | CAMBUSCATE_VIRTUAL_VM ]]\n`;
                    res += `local ${v.env}=(getfenv(0) or _G);local ${v.out}="";local ${v.tab}={${stream.join(',')}};`;
                    res += `local function ${v.vm}(d,k)for _,v in pairs(d)do if type(v)=="\110\117\109\98\101\114"then `;
                    res += `${v.out}=${v.out}..${v.env}["\115\116\114\105\110\103"]["\99\104\97\114"](${v.env}["\98\105\116\51\50"]["\98\120\111\114"](v,k))`;
                    res += `else local _="${ROASTS[1]}" end end;`;
                    res += `local x,e=(loadstring or load)(${v.out});if x then pcall(x)else warn("VM_FATAL")end end;${v.vm}(${v.tab},${key});`;

                    oEl.value = res;
                    updateStatus("Obfuscation Complete", "var(--suc)");
                } catch (e) { updateStatus("Encryption Error", "var(--err)"); }
            }, 100);
        };

        document.getElementById('cp').onclick = () => {
            if (!oEl.value) return;
            navigator.clipboard.writeText(oEl.value).then(() => updateStatus("Copied", "var(--suc)"));
        };

        document.getElementById('dl').onclick = () => {
            if (!oEl.value) return;
            const blob = new Blob([oEl.value], { type: 'text/plain' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `pobfus_protected.lua`;
            a.click();
        };
    };
})();
