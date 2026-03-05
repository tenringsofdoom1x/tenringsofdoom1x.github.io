async function pobfusStart() {
    const _in = document.getElementById('inputCode').value;
    const _btn = document.getElementById('protectBtn');
    
    if (!_in) return _0xErr("Buffer Empty.");

    _btn.disabled = true;
    _btn.innerText = "🏗️ Constructing Hell...";

    await new Promise(r => setTimeout(r, 800));

    try {
        const _sig = SYNC_HEADER.length % 255;
        const _seed = 0x6C; 
        const _key = _seed ^ _sig;

        // The "Brick Wall" string
        const _wall = _in.split('').map(c => {
            const h = (c.charCodeAt(0) ^ _key).toString(16).padStart(2, '0');
            const j = Math.random().toString(36).substring(2, 6); 
            return h + j;
        }).join('').toUpperCase();

        // New: "Nice Try" Watermark injection
        const watermark = "--- NICE TRY SKID | PROTECTED BY TENRINGSOFDOOM1X ---";
        const v_data = "_0x" + Math.random().toString(36).substring(7);
        const v_vm = "_0x" + Math.random().toString(36).substring(7);
        
        // Randomly picked roasts
        const roasts = [
            "Nice try, stay mad.",
            "tenringsofdoom1x owns you.",
            "Grok failed, you will too.",
            "Is your Ctrl+C broken yet?",
            "Imagine thinking this is readable."
        ];
        const r1 = roasts[Math.floor(Math.random() * roasts.length)];

        const _out = `--[[
${SYNC_HEADER}
]]
-- ${watermark}
local _0xNICETRY = "${watermark}"
local ${v_data} = "${_wall}"

local ${v_vm} = function()
    local _s = #debug.getinfo(1).source % 255
    local _k = ${_seed} ~ _s
    -- Integrity verification of the 'Nice Try' anchor
    if _0xNICETRY ~= "${watermark}" or not _0xNICETRY:find("TENRINGSOFDOOM1X") then
        while true do end
    end
    local _r = ""
    for i = 1, #${v_data}, 6 do
        local _b = tonumber(${v_data}:sub(i, i+1), 16)
        if _b then _r = _r .. string.char(_b ~ _k) end
    end
    local _f = loadstring or load
    local _ok, _e = pcall(_f(_r))
    if not _ok then 
        print("${r1}")
        warn("POBFUS: FATAL_TAMPER_DETECTED") 
        while true do end 
    end
end

pcall(${v_vm})`;

        document.getElementById('outputCode').value = _out;
        _btn.innerText = "Deploy CamBuscate 0.1.1";
    } catch (err) {
        _0xErr("Engine Fault.");
    } finally {
        _btn.disabled = false;
    }
}
