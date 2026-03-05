// --- script.js ---

// 1. Better Randomization Engine
const randomHex = (l) => "_0x" + Math.floor(Math.random() * 0xFFFFFF).toString(16).padEnd(l, '0');

function pobfusStart() {
    const input = document.getElementById('inputCode').value;
    if (!input) return alert("Input required!");

    // 2. Control Flow Flattening (State Machine)
    // We create random 'states' so the code doesn't run top-to-bottom.
    const states = [10, 25, 42, 67, 88].sort(() => Math.random() - 0.5);
    const v_state = randomHex(4);
    const v_vm = randomHex(6);
    
    // 3. Dynamic Keying (Logo-Linked)
    const logoSig = ASCII_LOGO.length % 255;
    const baseKey = Math.floor(Math.random() * 150) + 50;
    const finalKey = baseKey ^ logoSig;
    const bytes = input.split('').map(c => c.charCodeAt(0) ^ finalKey);

    // 4. The Flattened VM Template
    const vm = `--[[
${ASCII_LOGO}
    [ VERSION: 0.7 FLATTENED ]
--]]
local ${v_vm} = function()
    local _data = {${bytes.join(',')}}
    local _k = ${baseKey} ~ (#debug.getinfo(1).source % 255)
    local _res = ""
    local ${v_state} = ${states[0]} 

    -- Control Flow Flattening Dispatcher
    while ${v_state} ~= 0 do
        if ${v_state} == ${states[0]} then
            for i=1, #_data do _res = _res .. string.char(_data[i] ~ _k) end
            ${v_state} = ${states[1]}
        elseif ${v_state} == ${states[1]} then
            local _f = loadstring or load
            local _s, _err = pcall(_f(_res))
            if not _s then error("!! TAMPER !!") end
            ${v_state} = 0 -- Exit State
        else
            -- Junk State (Confusion for De-obfuscators)
            local _junk = math.pi * math.random()
            ${v_state} = 0 
        end
    end
end

pcall(${v_vm})
`;

    document.getElementById('outputCode').value = vm;
              }    const output = `--[[
${POBFUS_LOGO}
    [ VERSION: 0.7 BETA ]
    [ PROTECTION: VM + X-TABLE ]
--]]

local _0xData = {${bytes.join(",")}}
local _0xKey = ${key}
local _0xBuffer = ""
${generateJunk()}

local _0xVM = function()
    local _0xEnvCheck = getfenv and getfenv() or _G
    ${generateJunk()}
    for i=1, #_0xData do
        _0xBuffer = _0xBuffer .. string.char(_0xData[i] ~ _0xKey)
        if i % 20 == 0 then
            ${generateJunk()}
        end
    end
    ${generateJunk()}
    local _0xLoad = loadstring or load
    return _0xLoad
