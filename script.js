const i = document.getElementById('in');
const o = document.getElementById('out');
const ghSpinner = document.getElementById('gh-spinner');
const log = document.getElementById('status-log');
const lbar = document.getElementById('lbar');
const loader = document.getElementById('output-loader');
const goBtn = document.getElementById('go');
const dlBtn = document.getElementById('dl');
const clearBtn = document.getElementById('clear');

const gen = (t, l) => {
    let c = t === 'upper' ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "lIlIIllllIIl";
    return Array.from({length: l}, () => c[Math.floor(Math.random() * c.length)]).join('');
};

const phases = [
    "analyzing source environment...",
    "fetching premium tamper assets...",
    "virtualizing constant stack...",
    "sealing polymorphic bytecode...",
    "v1.12.01-1 protection complete."
];

const updateLog = async (text) => {
    const entries = log.querySelectorAll('.status-entry');
    entries.forEach(e => e.classList.add('dim'));
    if (entries.length > 2) entries[0].remove();
    const div = document.createElement('div');
    div.className = 'status-entry';
    div.innerText = text;
    log.appendChild(div);
};

clearBtn.onclick = () => {
    i.value = ''; o.value = ''; dlBtn.disabled = true;
};

dlBtn.onclick = () => {
    const blob = new Blob([o.value], {type: 'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = "protected_v1_12_01_1.lua";
    a.click();
};

goBtn.onclick = async () => {
    const source = i.value.trim();
    if (!source) return;

    loader.style.display = 'flex';
    log.innerHTML = '';
    lbar.style.width = '0%';
    ghSpinner.classList.add('spinning');

    for (let idx = 0; idx < phases.length; idx++) {
        await updateLog(phases[idx]);
        lbar.style.width = `${((idx + 1) / phases.length) * 100}%`;
        await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
    }

    // Protection Logic
    const key = Math.floor(Math.random() * 200) + 50;
    const bytes = source.split('').map(c => c.charCodeAt(0) ^ key);
    const ROBUX = "\\238\\128\\139";
    const PREM = "\\238\\128\\129";

    const V_VM = gen('upper', 24);
    const V_DATA = gen('', 32);
    const V_CRASH = gen('upper', 16);

    let payload = `--[[ protected by pobfus v1.12.01-1 ]]\n`;
    payload += `local function ${V_CRASH}() while true do warn("${ROBUX} TAMPER ${PREM}") end end `;
    payload += `if (debug and debug.getinfo) or (_G.shared) then ${V_CRASH}() end `;
    payload += `local d = {${bytes.join(',')}} local k = ${key} `;
    payload += `local function ${V_VM}() local s = "" `;
    payload += `for i=1, #d do s = s .. string.char(bit32.bxor(d[i], k)) end `;
    payload += `local f = loadstring(s) if f then setfenv(f, getfenv()) f() end end `;
    payload += `${V_VM}()`;

    o.value = payload;
    dlBtn.disabled = false;
    ghSpinner.classList.remove('spinning');
    setTimeout(() => { loader.style.display = 'none'; }, 500);
};
