(function(_0xCORE) {
    const _0xBC = (l) => { let r = "I"; for(let i=0; i<l; i++) r += "Il".charAt(Math.floor(Math.random() * 2)); return r; };
    const _0xS = (h) => h.split(',').map(b => String.fromCharCode(parseInt(b, 16) ^ 0x6F)).join('');

    const _0xROASTS = [
        "your decompiler likes me~ too much...",
        "feed me to your poor decompiler senpai!!!~",
        "is that a hook? how aggressive, senpai~",
        "your decompiler is blushing at this complexity~"
    ];

    const _STR = {
        logo: ` _______         __           ___                 \n|_   __ \\       [  |        .' ..]                \n  | |__) | .--.  | |.--.   _| |_  __   _   .--.   \n  |  ___// .'\`\\ \\| '/'\`\\ \\'-| |-'[  | | | ( (\`\\]  \n _| |_   | \\__. ||  \\__/ |  | |   | \\_/ |, \`'.'.  \n|_____|   '.__.'[__;.__.'  [___]  '.__.'_/([__) ) \n                                                  \n     [ Pobfus 1.11.01 | CamBuscate 0.2.1 ]`,
        ui_run: _0xS("3C,20,22,3F,26,23,2A,4F,33,2E,21,20"), // "COMPILE_DATA"
        ui_copy: _0xS("2C,20,3F,36"), // "COPY"
        ui_dl: _0xS("2D,3E,37,21,2E,20,2E,2B,2B,2B") // "DOWNLOAD..."
    };

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('logo').textContent = _STR.logo;
        document.getElementById('go').innerText = _STR.ui_run;
        document.getElementById('cp').innerText = _STR.ui_copy;
        document.getElementById('dl').innerText = _STR.ui_dl;
    });

    window.run = async function() {
        const _i = document.getElementById('in');
        const _o = document.getElementById('out');
        const _s = document.getElementById('status');
        const _b = document.getElementById('go');

        if (!_i.value.trim()) return;
        _b.disabled = true;
        _s.innerText = "CAMBUSCATE_0.2.1: STABILIZING_PRINT_STREAMS...";

        await new Promise(r => setTimeout(r, 1000));

        try {
            const _k = Math.floor(Math.random() * 90) + 40;
            const _raw = _i.value.split('');
            let _stream = [];

            // Chaos Injection Logic
            _raw.forEach((c, idx) => {
                _stream.push("0x" + (c.charCodeAt(0) ^ _k).toString(16).toUpperCase());
                if (idx % 8 === 0) {
                    const r = _0xROASTS[Math.floor(Math.random()*_0xROASTS.length)];
                    _stream.push(`"${r}_${Math.random().toString(36).substring(4)}"`);
                }
            });

            const _v = { env: _0xBC(8), vm: _0xBC(10), out: _0xBC(9), tab: _0xBC(11) };

            // MINIFIED OUTPUT CONSTRUCTION
            let _p = `--[[${_STR.logo}\n[!] POBFUS_1.11.01]] `;
            
            // Environment Lockdown
            _p += `local ${_v.env}=(getfenv(0) or _G);local ${_v.out}="";local ${_v.tab}={${_stream.join(',')}};`;
            
            // Fixed Byte-Slide VM (Handles Print Stability)
            _p += `local function ${_v.vm}(d,k)for _,v in pairs(d)do if type(v)=="\110\117\109\98\101\114"then `;
            _p += `${_v.out}=${_v.out}..${_v.env}["\115\116\114\105\110\103"]["\99\104\97\114"](${_v.env}["\98\105\116\51\50"]["\98\120\111\114"](v,k))`;
            _p += `else local _="${_0xROASTS[1]}" end end;`;
            
            // loadstring Gate
            _p += `local x,e=(loadstring or load)(${_v.out});if x then local s,m=pcall(x)if not s then warn("\80\79\66\70\85\83\95\82\85\78\84\73\77\69\95\69\82\82: "..tostring(m))end else warn("\80\79\66\70\85\83\95\86\77\95\69\82\82: "..tostring(e))end end;`;
            _p += `${_v.vm}(${_v.tab},${_k});`;

            _o.value = _p;
            _s.innerText = "POBFUS_1.11.01: STABLE";
            document.getElementById('dl').style.display = 'inline-block';

        } catch (e) { _s.innerText = "CRITICAL_COMPILER_FAILURE"; }
        finally { _b.disabled = false; }
    };

    // Randomized Filename
    const _0xFILE = () => {
        const c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let r = "pobfus-";
        for(let i=0; i<25; i++) r += c.charAt(Math.floor(Math.random()*c.length));
        return r + ".lua";
    };

    document.getElementById('go').onclick = window.run;
    document.getElementById('cp').onclick = () => { document.getElementById('out').select(); document.execCommand('copy'); };
    document.getElementById('dl').onclick = () => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([document.getElementById('out').value]));
        a.download = _0xFILE();
        a.click();
    };
})(window);
