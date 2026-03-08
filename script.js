/**
 * script.js
 * Logic: Ghost-Shift + Fully Obfuscated Internal Result String
 */

const SYMBOL_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#£_&-+()/=`";
let lastID = "";

document.getElementById('goBtn').onclick = () => {
    const src = document.getElementById('input').value;
    if (!src.trim()) return;

    let sym = "";
    for(let i=0; i<12; i++) sym += SYMBOL_POOL.charAt(Math.floor(Math.random() * SYMBOL_POOL.length));
    lastID = "pobfusn_" + sym;

    const key = 0xAF;
    const toDec = (str) => str.split('').map(c => `\\${c.charCodeAt(0)}`).join('');

    // Encrypt source
    let b64 = btoa(src.split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ key)).join(''));
    let data = "";
    let steps = "";
    for (let i = 0; i < b64.length; i++) {
        let count = Math.floor(Math.random() * 3) + 1;
        steps += count;
        data += b64[i];
        for (let j = 0; j < count; j++) data += SYMBOL_POOL.charAt(Math.floor(Math.random() * SYMBOL_POOL.length));
    }

    // Logic Masking
    const vEnv = toDec("E");
    const vDec = toDec("F");
    const vData = toDec("D");
    const vStep = toDec("S");
    const vLoad = toDec("loadstring");
    const vGame = toDec("game");
    const vHttp = toDec("HttpService");
    const vB64 = toDec("DecodeBase64");

    // The Logic itself is now converted into decimal escapes to hide "loadstring", "DecodeBase64", etc.
    const internalLogic = `local d,s=... local c,p="",1 for i=1,#s do c=c..d:sub(p,p) p=p+1+tonumber(s:sub(i,i)) end local r=getfenv()["${vGame}"]:GetService("${vHttp}")["${vB64}"](getfenv()["game"],c) local o="" for i=1,#r do o=o..string.char(bit32.bxor(r:sub(i,i):byte(),${key})) end return o`;
    const obfuscatedInternal = toDec(internalLogic);

    const result = `--[[ pobfus.cs SENTINEL BUILD ]]\n` +
    `local ${vEnv} = getfenv()\n` +
    `local ${vData} = "${data}"\n` +
    `local ${vStep} = "${steps}"\n` +
    `local function ${vDec}(...) \n` +
    `    return ${vEnv}["${vLoad}"]("${obfuscatedInternal}")(...)\n` +
    `end \n\n` +
    `local function _EXEC() \n` +
    `    local _p = ${vEnv}["pcall"] \n` +
    `    local _l = ${vEnv}["${vLoad}"] \n` +
    `    local _s, _f = _p(function() return _l(${vDec}(${vData}, ${vStep}))() end) \n` +
    `    ${vEnv} = nil \n` +
    `end \n` +
    `_EXEC()`;

    document.getElementById('output').value = result;
    document.getElementById('dlBtn').style.display = "block";
};

document.getElementById('dlBtn').onclick = () => {
    const text = document.getElementById('output').value;
    const blob = new Blob([text], { type: 'text/plain' });
    const anchor = document.createElement('a');
    anchor.download = `${lastID.replace(/[\\/:*?"<>|]/g, '_')}.lua`;
    anchor.href = window.URL.createObjectURL(blob);
    anchor.click();
};
