/*
  L-SHAPED PLOT: 61ft × 26ft
  X: 0(South) → 61(North) | Y: 0(East/Top) → 26(West/Bottom)
  Full zone: X:0-26 (26ft depth) | Reduced zone: X:26-61 (17ft depth)
  East passage: 13ft | Step: 9ft
*/

const S = 15;
const PLOT = [
    { x: 0, y: 0 }, { x: 61, y: 0 }, { x: 61, y: 17 },
    { x: 26, y: 17 }, { x: 26, y: 26 }, { x: 0, y: 26 },
];
const DIMS = [
    { from: 0, to: 1, label: "61'-0\"", pos: 'top' },
    { from: 1, to: 2, label: "17'-0\"", pos: 'right' },
    { from: 2, to: 3, label: "35'-0\"", pos: 'bottom-upper' },
    { from: 3, to: 4, label: "9'-0\"", pos: 'step' },
    { from: 4, to: 5, label: "26'-0\"", pos: 'bottom' },
    { from: 5, to: 0, label: "26'-0\"", pos: 'left' },
];

// ===== ROOM DEFINITIONS =====
const ROOMS = {
    gf: [
        // East Passage / Porch (4ft, becomes 1st floor balcony)
        { id: 'passage', name: '4ft Passage / Porch', x: 0, y: 0, w: 61, h: 4, color: 'rgba(255,255,255,0.08)', border: 'dashed' },

        // === FRONT ROOMS (Y: 4→13, 9ft deep, facing East) ===
        { id: 'kitchen', name: 'Kitchen', sub: '10×9 (SE)', x: 0, y: 4, w: 10, h: 9, color: 'rgba(255,165,0,0.12)' },
        { id: 'guest', name: 'Guest Bedroom', sub: '11×9', x: 10, y: 4, w: 11, h: 9, color: 'rgba(100,200,255,0.12)' },
        { id: 'puja', name: 'Puja', sub: '5×5 (NE)', x: 21, y: 4, w: 5, h: 5, color: 'rgba(255,215,0,0.15)' },

        // === 4ft INTERNAL CORRIDOR (Y: 13→17) ===
        { id: 'corridor', name: '4ft Corridor / Passage', x: 0, y: 13, w: 26, h: 4, color: 'rgba(255,255,255,0.06)', border: 'dashed' },

        // === BACK ROOMS (Y: 17→26, 9ft deep, facing West) ===
        { id: 'master', name: 'Master Bed', sub: '12×9 (SW)', x: 0, y: 17, w: 12, h: 9, color: 'rgba(150,100,255,0.12)' },
        { id: 'att_bath', name: 'Att. Bath', sub: '5×5', x: 12, y: 21, w: 5, h: 5, color: 'rgba(0,200,200,0.15)' },
        { id: 'com_toilet', name: 'Com. Toilet', sub: '5×4', x: 12, y: 17, w: 5, h: 4, color: 'rgba(0,200,200,0.15)' },
        { id: 'staircase', name: 'Staircase', sub: '9×9 (W)', x: 17, y: 17, w: 9, h: 9, color: 'rgba(200,200,200,0.1)' },

        // === NORTH REDUCED ZONE (X:26-61, Y:4-17, 13ft internal depth) ===
        { id: 'living', name: 'Living + Dining Hall', sub: '35×13', x: 26, y: 4, w: 35, h: 13, color: 'rgba(0,210,255,0.1)' },

        // === GATES ===
        { id: 'gate_e', name: '↓ MAIN GATE', x: 28, y: 0, w: 8, h: 1.5, type: 'gate' },
        { id: 'gate_n', name: 'N GATE →', x: 59.5, y: 5.5, w: 1.5, h: 4, type: 'gate' },

        // === DOORS (all open onto corridor at Y:13-17) ===
        { id: 'd_main', name: 'D', x: 30, y: 3.5, w: 3.5, h: 1, type: 'door' },
        { id: 'd_north', name: 'D', x: 60, y: 6, w: 1, h: 3, type: 'door' },
        { id: 'd_kitchen', name: 'D', x: 4, y: 12.5, w: 3, h: 1, type: 'door' },
        { id: 'd_guest', name: 'D', x: 14, y: 12.5, w: 3, h: 1, type: 'door' },
        { id: 'd_puja', name: 'D', x: 22, y: 8.5, w: 1, h: 1, type: 'door' },
        { id: 'd_master', name: 'D', x: 4, y: 16.5, w: 3, h: 1, type: 'door' },
        { id: 'd_bath1', name: 'D', x: 13, y: 16.5, w: 1, h: 1, type: 'door' },
        { id: 'd_bath2', name: 'D', x: 13, y: 20.5, w: 1, h: 1, type: 'door' },

        // === WINDOWS ===
        { id: 'w_kitchen_e', name: 'W', x: 3, y: 4, w: 4, h: 0.6, type: 'window' },
        { id: 'w_kitchen_s', name: 'W', x: 0, y: 6, w: 0.6, h: 4, type: 'window' },
        { id: 'w_guest_e', name: 'W', x: 13, y: 4, w: 4, h: 0.6, type: 'window' },
        { id: 'w_master_s', name: 'W', x: 0, y: 20, w: 0.6, h: 4, type: 'window' },
        { id: 'w_master_w', name: 'W', x: 3, y: 25.4, w: 4, h: 0.6, type: 'window' },
        { id: 'w_living_e', name: 'W', x: 38, y: 4, w: 6, h: 0.6, type: 'window' },
        { id: 'w_living_n', name: 'W', x: 60.4, y: 6, w: 0.6, h: 3, type: 'window' },
    ],
    ff_opt1: [
        // Balcony (only over full-depth zone, X:0-26)
        { id: 'balcony', name: 'Balcony', sub: '26×4', x: 0, y: 0, w: 26, h: 4, color: 'rgba(255,255,255,0.08)', border: 'dashed' },

        // === FRONT ROOMS (Y: 4→13, 9ft deep) ===
        { id: 'bed3', name: 'Bedroom 3', sub: '13×9', x: 0, y: 4, w: 13, h: 9, color: 'rgba(100,200,255,0.12)' },
        { id: 'lobby', name: 'Family Lobby', sub: '13×9', x: 13, y: 4, w: 13, h: 9, color: 'rgba(255,255,255,0.05)' },

        // === 4ft CORRIDOR (Y: 13→17) ===
        { id: 'corridor_ff', name: '4ft Corridor', x: 0, y: 13, w: 26, h: 4, color: 'rgba(255,255,255,0.06)', border: 'dashed' },

        // === BACK ROOMS (Y: 17→26, 9ft deep) ===
        { id: 'master_ff', name: 'Master Bed (FF)', sub: '12×9 (SW)', x: 0, y: 17, w: 12, h: 9, color: 'rgba(150,100,255,0.12)' },
        { id: 'att_bath_ff', name: 'Att. Bath', sub: '5×5', x: 12, y: 21, w: 5, h: 5, color: 'rgba(0,200,200,0.15)' },
        { id: 'com_bath_ff', name: 'Com. Bath', sub: '5×4', x: 12, y: 17, w: 5, h: 4, color: 'rgba(0,200,200,0.15)' },
        { id: 'staircase_ff', name: 'Staircase', sub: '9×9', x: 17, y: 17, w: 9, h: 9, color: 'rgba(200,200,200,0.1)' },

        // === NORTH REDUCED ZONE (X:26-61, Y:0-17, 13ft internal depth) ===
        // 4ft Corridor at bottom (Y:13-17) connects to Family Lobby/Corridor. Rooms are 13ft deep (Y:0-13)
        { id: 'ff_passage', name: '4ft Corridor', x: 26, y: 13, w: 35, h: 4, color: 'rgba(255,255,255,0.06)', border: 'dashed' },
        { id: 'bed4', name: 'Bedroom 4', sub: '15×13', x: 26, y: 0, w: 15, h: 13, color: 'rgba(100,200,255,0.12)' },
        { id: 'bed5_master', name: 'Master Bed 5', sub: '14×13', x: 41, y: 0, w: 14, h: 13, color: 'rgba(150,100,255,0.12)' },
        { id: 'att_bath_5', name: 'Att. Bath', sub: '6×7', x: 55, y: 6, w: 6, h: 7, color: 'rgba(0,200,200,0.15)' },

        // === DOORS ===
        { id: 'd_bed3', name: 'D', x: 4, y: 12.5, w: 3, h: 1, type: 'door' },
        { id: 'd_master_ff', name: 'D', x: 4, y: 16.5, w: 3, h: 1, type: 'door' },
        { id: 'd_bath_ff1', name: 'D', x: 13, y: 16.5, w: 1, h: 1, type: 'door' },
        { id: 'd_bath_ff2', name: 'D', x: 13, y: 20.5, w: 1, h: 1, type: 'door' },
        { id: 'd_bed4', name: 'D', x: 31, y: 12.5, w: 3, h: 1, type: 'door' },
        { id: 'd_bed5', name: 'D', x: 46, y: 12.5, w: 3, h: 1, type: 'door' },
        { id: 'd_bath5', name: 'D', x: 54.5, y: 10, w: 1, h: 2.5, type: 'door' },

        // === WINDOWS ===
        { id: 'w_bed3_e', name: 'W', x: 4, y: 4, w: 5, h: 0.6, type: 'window' },
        { id: 'w_bed3_s', name: 'W', x: 0, y: 7, w: 0.6, h: 4, type: 'window' },
        { id: 'w_master_ff_s', name: 'W', x: 0, y: 20, w: 0.6, h: 4, type: 'window' },
        { id: 'w_master_ff_w', name: 'W', x: 4, y: 25.4, w: 4, h: 0.6, type: 'window' },
        { id: 'w_bed4_e', name: 'W', x: 30, y: 0, w: 5, h: 0.6, type: 'window' },
        { id: 'w_bed5_e', name: 'W', x: 46, y: 0, w: 5, h: 0.6, type: 'window' },
        { id: 'w_bath5_n', name: 'W', x: 60.4, y: 8, w: 0.6, h: 3, type: 'window' },
    ],
    ff_opt2: [
        // Balcony (only over full-depth zone, X:0-26)
        { id: 'balcony', name: 'Balcony', sub: '26×4', x: 0, y: 0, w: 26, h: 4, color: 'rgba(255,255,255,0.08)', border: 'dashed' },

        // === FRONT ROOMS (Y: 4→13, 9ft deep) ===
        // Option 2: No Bedroom 3, full 26x9 Family Lobby
        { id: 'lobby_large', name: 'Large Family Lobby', sub: '26×9', x: 0, y: 4, w: 26, h: 9, color: 'rgba(255,255,255,0.05)' },

        // === 4ft CORRIDOR (Y: 13→17) ===
        { id: 'corridor_ff', name: '4ft Corridor', x: 0, y: 13, w: 26, h: 4, color: 'rgba(255,255,255,0.06)', border: 'dashed' },

        // === BACK ROOMS (Y: 17→26, 9ft deep) ===
        { id: 'master_ff', name: 'Master Bed (FF)', sub: '12×9 (SW)', x: 0, y: 17, w: 12, h: 9, color: 'rgba(150,100,255,0.12)' },
        { id: 'att_bath_ff', name: 'Att. Bath', sub: '5×5', x: 12, y: 21, w: 5, h: 5, color: 'rgba(0,200,200,0.15)' },
        { id: 'com_bath_ff', name: 'Com. Bath', sub: '5×4', x: 12, y: 17, w: 5, h: 4, color: 'rgba(0,200,200,0.15)' },
        { id: 'staircase_ff', name: 'Staircase', sub: '9×9', x: 17, y: 17, w: 9, h: 9, color: 'rgba(200,200,200,0.1)' },

        // === NORTH REDUCED ZONE (X:26-61, Y:0-17, 13ft internal depth) ===
        { id: 'ff_passage', name: '4ft Corridor', x: 26, y: 13, w: 35, h: 4, color: 'rgba(255,255,255,0.06)', border: 'dashed' },
        { id: 'bed4', name: 'Bedroom 4', sub: '15×13', x: 26, y: 0, w: 15, h: 13, color: 'rgba(100,200,255,0.12)' },
        { id: 'bed5_master', name: 'Master Bed 5', sub: '14×13', x: 41, y: 0, w: 14, h: 13, color: 'rgba(150,100,255,0.12)' },
        { id: 'att_bath_5', name: 'Att. Bath', sub: '6×7', x: 55, y: 6, w: 6, h: 7, color: 'rgba(0,200,200,0.15)' },

        // === DOORS ===
        { id: 'd_master_ff', name: 'D', x: 4, y: 16.5, w: 3, h: 1, type: 'door' },
        { id: 'd_bath_ff1', name: 'D', x: 13, y: 16.5, w: 1, h: 1, type: 'door' },
        { id: 'd_bath_ff2', name: 'D', x: 13, y: 20.5, w: 1, h: 1, type: 'door' },
        { id: 'd_bed4', name: 'D', x: 31, y: 12.5, w: 3, h: 1, type: 'door' },
        { id: 'd_bed5', name: 'D', x: 46, y: 12.5, w: 3, h: 1, type: 'door' },
        { id: 'd_bath5', name: 'D', x: 54.5, y: 10, w: 1, h: 2.5, type: 'door' },

        // === WINDOWS ===
        { id: 'w_lobby_e', name: 'W', x: 4, y: 4, w: 5, h: 0.6, type: 'window' },
        { id: 'w_lobby_s', name: 'W', x: 0, y: 7, w: 0.6, h: 4, type: 'window' },
        { id: 'w_master_ff_s', name: 'W', x: 0, y: 20, w: 0.6, h: 4, type: 'window' },
        { id: 'w_master_ff_w', name: 'W', x: 4, y: 25.4, w: 4, h: 0.6, type: 'window' },
        { id: 'w_bed4_e', name: 'W', x: 30, y: 0, w: 5, h: 0.6, type: 'window' },
        { id: 'w_bed5_e', name: 'W', x: 46, y: 0, w: 5, h: 0.6, type: 'window' },
        { id: 'w_bath5_n', name: 'W', x: 60.4, y: 8, w: 0.6, h: 3, type: 'window' },
    ]
};

const blueprintEl = document.getElementById('blueprint');
const btnGf = document.getElementById('btn-gf');
const btnFfOpt1 = document.getElementById('btn-ff-opt1');
const btnFfOpt2 = document.getElementById('btn-ff-opt2');
let currentScale = 1;

function drawPlot(svg, svgNS) {
    // Plot outline
    const pts = PLOT.map(p => `${p.x * S},${p.y * S}`).join(' ');
    const poly = document.createElementNS(svgNS, 'polygon');
    poly.setAttribute('points', pts);
    poly.setAttribute('fill', 'none');
    poly.setAttribute('stroke', '#778da9');
    poly.setAttribute('stroke-width', '3');
    poly.setAttribute('stroke-linejoin', 'miter');
    svg.appendChild(poly);

    // Dimension lines
    DIMS.forEach(dim => {
        const p1 = PLOT[dim.from], p2 = PLOT[dim.to];
        let ox1 = p1.x * S, oy1 = p1.y * S, ox2 = p2.x * S, oy2 = p2.y * S;
        let tx, ty, rot = 0;
        const off = 28;
        switch (dim.pos) {
            case 'top': oy1 -= off; oy2 -= off; tx = (ox1 + ox2) / 2; ty = oy1 - 8; break;
            case 'right': ox1 += off; ox2 += off; tx = ox1 + 10; ty = (oy1 + oy2) / 2; rot = 90; break;
            case 'left': ox1 -= off; ox2 -= off; tx = ox1 - 10; ty = (oy1 + oy2) / 2; rot = -90; break;
            case 'bottom': oy1 += off; oy2 += off; tx = (ox1 + ox2) / 2; ty = oy1 + 16; break;
            case 'bottom-upper': oy1 += off; oy2 += off; tx = (ox1 + ox2) / 2; ty = oy1 + 16; break;
            case 'step': ox1 += off; ox2 += off; tx = ox1 + 10; ty = (oy1 + oy2) / 2; rot = 90; break;
        }
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', ox1); line.setAttribute('y1', oy1);
        line.setAttribute('x2', ox2); line.setAttribute('y2', oy2);
        line.setAttribute('stroke', '#ffaa00'); line.setAttribute('stroke-width', '1.5');
        svg.appendChild(line);

        const isH = Math.abs(oy1 - oy2) < 2;
        [{ x: ox1, y: oy1 }, { x: ox2, y: oy2 }].forEach(pt => {
            const t = document.createElementNS(svgNS, 'line');
            if (isH) { t.setAttribute('x1', pt.x); t.setAttribute('y1', pt.y - 5); t.setAttribute('x2', pt.x); t.setAttribute('y2', pt.y + 5); }
            else { t.setAttribute('x1', pt.x - 5); t.setAttribute('y1', pt.y); t.setAttribute('x2', pt.x + 5); t.setAttribute('y2', pt.y); }
            t.setAttribute('stroke', '#ffaa00'); t.setAttribute('stroke-width', '1.5');
            svg.appendChild(t);
        });

        const text = document.createElementNS(svgNS, 'text');
        text.setAttribute('x', tx); text.setAttribute('y', ty);
        text.setAttribute('text-anchor', 'middle'); text.setAttribute('fill', '#ffaa00');
        text.setAttribute('font-size', '12'); text.setAttribute('font-family', 'Space Mono, monospace');
        text.setAttribute('font-weight', 'bold');
        if (rot) text.setAttribute('transform', `rotate(${rot},${tx},${ty})`);
        text.textContent = dim.label;
        svg.appendChild(text);
    });

    // Compass labels
    const dirs = [
        { label: 'EAST (FRONT / ROAD)', x: 30.5 * S, y: -40 },
        { label: 'WEST (BACK)', x: 13 * S, y: 26 * S + 50 },
        { label: 'NORTH', x: 61 * S + 45, y: 7 * S, r: 90 },
        { label: 'SOUTH', x: -45, y: 13 * S, r: -90 },
    ];
    dirs.forEach(d => {
        const t = document.createElementNS(svgNS, 'text');
        t.setAttribute('x', d.x); t.setAttribute('y', d.y);
        t.setAttribute('text-anchor', 'middle'); t.setAttribute('fill', '#00d2ff');
        t.setAttribute('font-size', '13'); t.setAttribute('font-family', 'Inter, sans-serif');
        t.setAttribute('font-weight', '700'); t.setAttribute('letter-spacing', '3');
        if (d.r) t.setAttribute('transform', `rotate(${d.r},${d.x},${d.y})`);
        t.textContent = d.label;
        svg.appendChild(t);
    });
}

function drawRooms(svg, svgNS, floorKey) {
    const rooms = ROOMS[floorKey];
    rooms.forEach(room => {
        const x = room.x * S, y = room.y * S, w = room.w * S, h = room.h * S;

        if (room.type === 'gate') {
            const rect = document.createElementNS(svgNS, 'rect');
            rect.setAttribute('x', x); rect.setAttribute('y', y);
            rect.setAttribute('width', w); rect.setAttribute('height', h);
            rect.setAttribute('fill', '#ff3366'); rect.setAttribute('rx', '3');
            rect.setAttribute('opacity', '0.9');
            svg.appendChild(rect);
            const t = document.createElementNS(svgNS, 'text');
            t.setAttribute('x', x + w / 2); t.setAttribute('y', y + h / 2 + 4);
            t.setAttribute('text-anchor', 'middle'); t.setAttribute('fill', '#fff');
            t.setAttribute('font-size', '9'); t.setAttribute('font-family', 'Space Mono, monospace');
            t.setAttribute('font-weight', 'bold');
            t.textContent = room.name;
            svg.appendChild(t);
            return;
        }

        if (room.type === 'door') {
            const rect = document.createElementNS(svgNS, 'rect');
            rect.setAttribute('x', x); rect.setAttribute('y', y);
            rect.setAttribute('width', w); rect.setAttribute('height', h);
            rect.setAttribute('fill', '#ffaa00'); rect.setAttribute('rx', '2');
            rect.setAttribute('opacity', '0.8');
            svg.appendChild(rect);
            return;
        }

        if (room.type === 'window') {
            const rect = document.createElementNS(svgNS, 'rect');
            rect.setAttribute('x', x); rect.setAttribute('y', y);
            rect.setAttribute('width', w); rect.setAttribute('height', h);
            rect.setAttribute('fill', '#00d2ff'); rect.setAttribute('opacity', '0.7');
            svg.appendChild(rect);
            return;
        }

        // Regular room
        const rect = document.createElementNS(svgNS, 'rect');
        rect.setAttribute('x', x); rect.setAttribute('y', y);
        rect.setAttribute('width', w); rect.setAttribute('height', h);
        rect.setAttribute('fill', room.color || 'rgba(0,210,255,0.05)');
        rect.setAttribute('stroke', '#556677');
        rect.setAttribute('stroke-width', '2');
        if (room.border === 'dashed') rect.setAttribute('stroke-dasharray', '6,4');
        svg.appendChild(rect);

        // Room name
        const nameT = document.createElementNS(svgNS, 'text');
        nameT.setAttribute('x', x + w / 2); nameT.setAttribute('y', y + h / 2 - (room.sub ? 4 : 2));
        nameT.setAttribute('text-anchor', 'middle'); nameT.setAttribute('fill', '#e0e1dd');
        nameT.setAttribute('font-size', w < 6 * S ? '10' : '12');
        nameT.setAttribute('font-family', 'Space Mono, monospace');
        nameT.setAttribute('font-weight', 'bold');
        nameT.textContent = room.name;
        svg.appendChild(nameT);

        // Sub label (dimensions)
        if (room.sub) {
            const subT = document.createElementNS(svgNS, 'text');
            subT.setAttribute('x', x + w / 2); subT.setAttribute('y', y + h / 2 + 12);
            subT.setAttribute('text-anchor', 'middle'); subT.setAttribute('fill', '#778da9');
            subT.setAttribute('font-size', '10');
            subT.setAttribute('font-family', 'Space Mono, monospace');
            subT.textContent = room.sub;
            svg.appendChild(subT);
        }
    });
}

function renderFloor(floorKey) {
    blueprintEl.innerHTML = '';
    blueprintEl.style.width = (61 * S) + 'px';
    blueprintEl.style.height = (26 * S) + 'px';

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', 61 * S);
    svg.setAttribute('height', 26 * S);
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.overflow = 'visible';

    drawRooms(svg, svgNS, floorKey);
    drawPlot(svg, svgNS); // Plot outline on top of rooms
    blueprintEl.appendChild(svg);
}

btnGf.addEventListener('click', () => {
    btnGf.classList.add('active');
    btnFfOpt1.classList.remove('active');
    btnFfOpt2.classList.remove('active');
    renderFloor('gf');
});

btnFfOpt1.addEventListener('click', () => {
    btnFfOpt1.classList.add('active');
    btnGf.classList.remove('active');
    btnFfOpt2.classList.remove('active');
    renderFloor('ff_opt1');
});

btnFfOpt2.addEventListener('click', () => {
    btnFfOpt2.classList.add('active');
    btnGf.classList.remove('active');
    btnFfOpt1.classList.remove('active');
    renderFloor('ff_opt2');
});

document.getElementById('zoom-in').addEventListener('click', () => {
    currentScale += 0.15;
    blueprintEl.style.transform = `scale(${currentScale})`;
});

document.getElementById('zoom-out').addEventListener('click', () => {
    currentScale = Math.max(0.3, currentScale - 0.15);
    blueprintEl.style.transform = `scale(${currentScale})`;
});

document.getElementById('zoom-reset').addEventListener('click', () => {
    currentScale = 1;
    blueprintEl.style.transform = 'scale(1)';
});

document.getElementById('rate-select').addEventListener('change', (e) => {
    const rate = parseInt(e.target.value);
    const total = rate * 2700;
    document.getElementById('total-price').innerText = '₹' + total.toLocaleString('en-IN');
});

renderFloor('gf');
