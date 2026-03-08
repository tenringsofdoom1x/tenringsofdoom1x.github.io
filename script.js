/**
 * pobfus v1.12.01-30
 * Logic: Hybrid Obfuscation with Optional Sentinel
 */

const input = document.getElementById('input');
const output = document.getElementById('output');
const secMode = document.getElementById('secMode');
const keyedFields = document.getElementById('keyedFields');
const statusTier = document.getElementById('statusTier');

const ASCII_HEADER = `--[[
   ___      _      __             _   _ ____  
  / _ \\___ | |__  / _|_   _ ___  / | / |___ \\ 
 / /_)/ _ \\| '_ \\| |_| | | / __| | | | | __) |
/ ___/ (_) | |_) |  _| |_| \\__ \\ | |_| |/ __/ 
\\/    \\___/|_.__/|_|  \\__,_|___/ |_(_)_|_____|
]]\n`;

secMode.onchange = (e) => {
    const isKeyed = e.target.value === 'keyed';
    keyedFields.style.display = isKeyed ? 'block' : 'none';
    statusTier.innerText = isKeyed ? "MODE: KEYED (✓)" : "MODE: KEYLESS (X)";
    statusTier.style.color = isKeyed ? "#238636" : "#79c0ff";
};

document.getElementById('goBtn').onclick = () => {
    if (!input.value.trim()) return;

    // 1. Minification
    let source = input.value
        .replace(/--.*$/gm, '') 
        .replace(/\s+/g, ' ')
        .trim();

    // 2. Logic Injection
    let protectedSource = source;
    if (secMode.value === 'keyed') {
        const kv = document.getElementById('keyValue').value || "KEY_REQUIRED";
        const wh = document.getElementById('webhookURL').value || "";
        protectedSource = `if _G.Key~="${kv}" then pcall(function() game:GetService("HttpService"):PostAsync("${wh}",'{"content":"Auth Fail: '..game.Players.LocalPlayer.Name..'"}') end) game.Players.LocalPlayer:Kick("Invalid Key") return end ${source}`;
    }

    // 3. Obfuscation (B64 -> XOR -> Hex)
    const xorKey = 77;
    const b64 = btoa(protectedSource);
    const hex = b64.split('').map(c => (c.charCodeAt(0) ^ xorKey).toString(16).padStart(2, '0')).join('');

    // 4. Final Output Assembly
    output.value = ASCII_HEADER +
        `local _K,_D = ${xorKey}, "${hex}"\n` +
        `local function load(d,k) local s="" for i=1,#d,2 do s=s..string.char(bit32.bxor(tonumber(d:sub(i,i+1),16),k)) end return s end\n` +
        `local success, result = pcall(function() return loadstring(game:GetService("HttpService"):DecodeBase64(load(_D,_K)))() end)\n` +
        `if not success then warn("pobfus VM Error: "..result) end`;
};

// Website Copy Logic
document.getElementById('webCopyBtn').onclick = () => {
    if (!output.value) return;
    const loot = document.getElementById('lootLink').value || "#";
    const webHTML = `<html><body style="background:#0d1117;color:white;text-align:center;padding:50px;font-family:sans-serif;">
        <h1>Script Access</h1><a href="${loot}" style="color:#238636;font-size:20px;">Complete Steps Here</a><br><br>
        <textarea readonly style="width:80%;height:200px;background:#000;color:#d2a8ff;">${output.value}</textarea>
        </body></html>`;
    const blob = new Blob([webHTML], {type: 'text/html'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = "index.html";
    a.click();
};
