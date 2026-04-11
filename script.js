/*
  L-SHAPED PLOT: 61ft × 26ft
  X: 0(South) → 61(North) | Y: 0(East/Top) → 26(West/Bottom)
  Full zone: X:0-26 (26ft depth) | Reduced zone: X:26-61 (17ft depth)
  East passage: 13ft | Step: 9ft
*/

const S = 15;
const PLOT = [
    { x: 0, y: 0 }, { x: 58, y: 0 }, { x: 58, y: 17 },
    { x: 26, y: 17 }, { x: 26, y: 26 }, { x: -5, y: 26 },
    { x: -5, y: 4 }, { x: 0, y: 4 },
];
const DIMS = [
    { from: 0, to: 1, label: "58'-0\"", pos: 'top' },
    { from: 1, to: 2, label: "17'-0\"", pos: 'right' },
    { from: 2, to: 3, label: "35'-0\"", pos: 'bottom-upper' },
    { from: 3, to: 4, label: "9'-0\"", pos: 'step' },
    { from: 4, to: 5, label: "31'-0\"", pos: 'bottom' },
    { from: 5, to: 6, label: "22'-0\"", pos: 'left' },
    { from: 6, to: 7, label: "5'-0\"", pos: 'step' },
    { from: 7, to: 0, label: "4'-0\"", pos: 'left' },
];

// ===== ROOM DEFINITIONS =====
const ROOMS = {
    gf: [
        // East Passage / Porch (4ft, becomes 1st floor balcony)
        { id: 'passage', name: '4ft Passage / Porch', x: 0, y: 0, w: 58, h: 4, color: 'rgba(255,255,255,0.08)', border: 'dashed' },

        // === FRONT ROOMS ===
        { id: 'washing', name: 'Wash Area', sub: '5×4 (SE)', x: -5, y: 4, w: 5, h: 4, color: 'rgba(180,255,200,0.15)' },
        { id: 'store', name: 'Store Room', sub: '5×5 (SE)', x: -5, y: 8, w: 5, h: 5, color: 'rgba(255,180,180,0.15)' },
        { id: 'kitchen', name: 'Kitchen', sub: '8×9 (SE)', x: 0, y: 4, w: 8, h: 9, color: 'rgba(255,165,0,0.12)' },
        { id: 'lobby', name: 'Family Lounge', sub: '18×9', x: 8, y: 4, w: 18, h: 9, color: 'rgba(255,255,255,0.05)' },

        // === BACK ROOMS (Y: 13→26, facing West) ===
        { id: 'master', name: 'Master Bed', sub: '13×13 (SW)', x: 0, y: 13, w: 13, h: 13, color: 'rgba(150,100,255,0.12)' },
        { id: 'wardrobe', name: 'Empty Area', sub: '5×5', x: -5, y: 15, w: 5, h: 5, color: 'rgba(255,230,150,0.15)' },
        { id: 'wardrobe_cab', name: 'Cabinets', sub: '5×2', x: -5, y: 13, w: 5, h: 2, color: 'rgba(160,82,45,0.3)' },
        { id: 'guest', name: 'Guest Bedroom', sub: '13×13 (W)', x: 13, y: 13, w: 13, h: 13, color: 'rgba(100,200,255,0.12)' },
        { id: 'att_bath_ext', name: 'Att. Wash', sub: '5×6', x: -5, y: 20, w: 5, h: 6, color: 'rgba(0,200,200,0.15)' },

        // === NORTH REDUCED ZONE (X:26-61, Y:4-17, 13ft internal depth) ===
        { id: 'living', name: 'Living + Dining Hall', sub: '32×13', x: 26, y: 4, w: 32, h: 13, color: 'rgba(0,210,255,0.1)' },
        { id: 'puja', name: 'Puja', sub: '5×5 (NE)', x: 53, y: 4, w: 5, h: 5, color: 'rgba(255,215,0,0.15)' },
        { id: 'staircase', name: 'Staircase', sub: '10×7', x: 26, y: 10, w: 10, h: 7, color: 'rgba(200,200,200,0.1)' },
        { id: 'com_toilet', name: 'Com. Wash', sub: '5×5 (NW)', x: 53, y: 12, w: 5, h: 5, color: 'rgba(0,200,200,0.15)' },

        // === GATES ===
        { id: 'gate_e', name: '↓ MAIN GATE', x: 28, y: 0, w: 8, h: 1.5, type: 'gate' },
        { id: 'gate_n', name: 'N GATE →', x: 58, y: 9.5, w: 1.5, h: 2, type: 'gate' },

        // === DOORS ===
        { id: 'd_main', name: 'D', x: 30, y: 3.5, w: 3.5, h: 1, type: 'door' },
        { id: 'd_north', name: 'D', x: 58, y: 9.5, w: 1, h: 2, type: 'door' },
        { id: 'd_kitchen', name: 'D', x: 7.5, y: 8, w: 1, h: 3, type: 'door' },
        { id: 'd_master', name: 'D', x: 9.5, y: 12.5, w: 3, h: 1, type: 'door' },
        { id: 'd_guest', name: 'D', x: 17, y: 12.5, w: 3, h: 1, type: 'door' },
        { id: 'd_puja', name: 'D', x: 53, y: 6, w: 1, h: 2, type: 'door' },
        { id: 'd_com_toilet', name: 'D', x: 53, y: 14, w: 1, h: 2, type: 'door' },
        { id: 'd_wardrobe', name: 'D', x: -0.5, y: 16, w: 1, h: 2, type: 'door' },
        { id: 'd_att_master', name: 'D', x: -3, y: 19.5, w: 2, h: 1, type: 'door' },
        { id: 'd_store', name: 'D', x: -0.5, y: 10, w: 1, h: 2, type: 'door' },
        { id: 'd_washing', name: 'D', x: -3, y: 3.5, w: 2, h: 1, type: 'door' },

        // === WINDOWS ===
        { id: 'w_kitchen_e', name: 'W', x: 2, y: 4, w: 4, h: 0.6, type: 'window' },
        { id: 'w_washing_s', name: 'W', x: -5, y: 5, w: 0.6, h: 2, type: 'window' },
        { id: 'w_store_s', name: 'W', x: -5, y: 9.5, w: 0.6, h: 2, type: 'window' },
        { id: 'w_wardrobe_s', name: 'W', x: -5, y: 16, w: 0.6, h: 2.5, type: 'window' },
        { id: 'w_master_w', name: 'W', x: 3, y: 25.4, w: 4, h: 0.6, type: 'window' },
        { id: 'w_guest_w', name: 'W', x: 17, y: 25.4, w: 4, h: 0.6, type: 'window' },
        { id: 'w_att_bath', name: 'W', x: -5, y: 22, w: 0.6, h: 2, type: 'window' },
        { id: 'w_living_e', name: 'W', x: 38, y: 4, w: 6, h: 0.6, type: 'window' },
        { id: 'w_puja_n', name: 'W', x: 57.4, y: 6, w: 0.6, h: 2, type: 'window' },
        { id: 'w_com_toilet_n', name: 'W', x: 57.4, y: 13.5, w: 0.6, h: 2, type: 'window' },
    ],
    gf2: [
        // === FRONT ROOMS ===
        { id: 'washing_gf2', name: 'Wash Area', sub: '5×4 (SE)', x: -5, y: 4, w: 5, h: 4, color: 'rgba(180,255,200,0.15)' },
        { id: 'store_gf2', name: 'Store Room', sub: '5×5 (SE)', x: -5, y: 8, w: 5, h: 5, color: 'rgba(255,180,180,0.15)' },
        { id: 'kitchen_gf2', name: 'Kitchen', sub: '8×9 (SE)', x: 0, y: 4, w: 8, h: 9, color: 'rgba(255,165,0,0.12)' },
        { id: 'lobby_gf2', name: 'Family Lounge', sub: '18×9', x: 8, y: 4, w: 18, h: 9, color: 'rgba(255,255,255,0.05)' },

        // === BACK ROOMS (Y: 13→26, facing West) ===
        { id: 'master_gf2', name: 'Master Bed', sub: '13×13 (SW)', x: 0, y: 13, w: 13, h: 13, color: 'rgba(150,100,255,0.12)' },
        { id: 'wardrobe_gf2', name: 'Empty Area', sub: '5×5', x: -5, y: 15, w: 5, h: 5, color: 'rgba(255,230,150,0.15)' },
        { id: 'wardrobe_cab_gf2', name: 'Cabinets', sub: '5×2', x: -5, y: 13, w: 5, h: 2, color: 'rgba(160,82,45,0.3)' },
        { id: 'guest_gf2', name: 'Guest Bedroom', sub: '13×13 (W)', x: 13, y: 13, w: 13, h: 13, color: 'rgba(100,200,255,0.12)' },
        { id: 'att_bath_ext_gf2', name: 'Att. Wash', sub: '5×6', x: -5, y: 20, w: 5, h: 6, color: 'rgba(0,200,200,0.15)' },

        // === NORTH REDUCED ZONE (X:26-61, Y:4-17, 13ft internal depth) ===
        { id: 'living_gf2', name: 'Living + Dining Hall', sub: '32×13', x: 26, y: 4, w: 32, h: 13, color: 'rgba(0,210,255,0.1)' },
        { id: 'puja_gf2', name: 'Puja', sub: '5×5 (NE)', x: 53, y: 4, w: 5, h: 5, color: 'rgba(255,215,0,0.15)' },
        { id: 'staircase_gf2', name: 'Staircase', sub: '7×10', x: 31, y: 7, w: 7, h: 10, color: 'rgba(200,200,200,0.1)' },
        { id: 'att_bath_guest_gf2', name: 'Att. Wash', sub: '5×5 (Guest)', x: 26, y: 12, w: 5, h: 5, color: 'rgba(0,200,200,0.15)' },
        { id: 'com_toilet_gf2', name: 'Com. Wash', sub: '5×5 (NW)', x: 53, y: 12, w: 5, h: 5, color: 'rgba(0,200,200,0.15)' },

        // === GATES ===
        { id: 'gate_e_gf2', name: '↓ MAIN GATE', x: 28, y: 0, w: 8, h: 1.5, type: 'gate' },
        { id: 'gate_n_gf2', name: 'N GATE →', x: 58, y: 9.5, w: 1.5, h: 2, type: 'gate' },

        // === DOORS ===
        { id: 'd_main_gf2', name: 'D', x: 30, y: 3.5, w: 3.5, h: 1, type: 'door' },
        { id: 'd_north_gf2', name: 'D', x: 58, y: 9.5, w: 1, h: 2, type: 'door' },
        { id: 'd_kitchen_gf2', name: 'D', x: 7.5, y: 8, w: 1, h: 3, type: 'door' },
        { id: 'd_master_gf2', name: 'D', x: 9.5, y: 12.5, w: 3, h: 1, type: 'door' },
        { id: 'd_guest_gf2', name: 'D', x: 17, y: 12.5, w: 3, h: 1, type: 'door' },
        { id: 'd_puja_gf2', name: 'D', x: 53, y: 6, w: 1, h: 2, type: 'door' },
        { id: 'd_com_toilet_gf2', name: 'D', x: 53, y: 14, w: 1, h: 2, type: 'door' },
        { id: 'd_wardrobe_gf2', name: 'D', x: -0.5, y: 16, w: 1, h: 2, type: 'door' },
        { id: 'd_att_master_gf2', name: 'D', x: -3, y: 19.5, w: 2, h: 1, type: 'door' },
        { id: 'd_store_gf2', name: 'D', x: -0.5, y: 10, w: 1, h: 2, type: 'door' },
        { id: 'd_washing_gf2', name: 'D', x: -3, y: 3.5, w: 2, h: 1, type: 'door' },
        { id: 'd_att_guest_gf2', name: 'D', x: 26, y: 14, w: 1, h: 2, type: 'door' },

        // === WINDOWS ===
        { id: 'w_kitchen_e_gf2', name: 'W', x: 2, y: 4, w: 4, h: 0.6, type: 'window' },
        { id: 'w_washing_s_gf2', name: 'W', x: -5, y: 5, w: 0.6, h: 2, type: 'window' },
        { id: 'w_store_s_gf2', name: 'W', x: -5, y: 9.5, w: 0.6, h: 2, type: 'window' },
        { id: 'w_wardrobe_s_gf2', name: 'W', x: -5, y: 16, w: 0.6, h: 2.5, type: 'window' },
        { id: 'w_master_w_gf2', name: 'W', x: 3, y: 25.4, w: 4, h: 0.6, type: 'window' },
        { id: 'w_guest_w_gf2', name: 'W', x: 17, y: 25.4, w: 4, h: 0.6, type: 'window' },
        { id: 'w_att_bath_gf2', name: 'W', x: -5, y: 22, w: 0.6, h: 2, type: 'window' },
        { id: 'w_living_e_gf2', name: 'W', x: 38, y: 4, w: 6, h: 0.6, type: 'window' },
        { id: 'w_puja_n_gf2', name: 'W', x: 57.4, y: 6, w: 0.6, h: 2, type: 'window' },
        { id: 'w_com_toilet_n_gf2', name: 'W', x: 57.4, y: 13.5, w: 0.6, h: 2, type: 'window' }
    ],
    ff: [
        // === FRONT BALCONY (4ft extension over passage — East side, connects both side balconies) ===
        { id: 'balcony_front_ff', name: 'Front Balcony', x: -9, y: 0, w: 71, h: 4, color: 'rgba(255,255,255,0.08)' },

        // === ZONE 1: SOUTH (26×26 + 5ft extension) ===
        // South Balcony: 4ft cantilever outside the south wall (X: -9 to -5)
        { id: 'balcony_south_ff', name: 'S. Balcony', sub: '4×22', x: -9, y: 4, w: 4, h: 22, color: 'rgba(255,255,255,0.08)' },

        // Master Suite: absorbs kitchen area (13×22)
        { id: 'master_ff', name: 'Master Suite', sub: '13×22', x: 0, y: 4, w: 13, h: 22, color: 'rgba(150,100,255,0.12)' },

        // Sringar Room: replaces GF store+wash area (5×9)
        { id: 'sringar_ladies_ff', name: 'Sringar Room', sub: '5×9', x: -5, y: 4, w: 5, h: 9, color: 'rgba(255,180,180,0.15)' },

        // Empty Area (5×5) + Cabinets (5×2) against washroom wall
        { id: 'empty_area_ff', name: 'Empty Area', sub: '5×5', x: -5, y: 13, w: 5, h: 5, color: 'rgba(255,230,150,0.15)' },
        { id: 'wardrobe_cab_ff', name: 'Cabinets', sub: '5×2', x: -5, y: 18, w: 5, h: 2, color: 'rgba(160,82,45,0.3)' },

        // Attached Washroom (5×6) — same as GF
        { id: 'att_bath_ext_ff', name: 'Att. Wash', sub: '5×6', x: -5, y: 20, w: 5, h: 6, color: 'rgba(0,200,200,0.15)' },

        // Guest Bedroom (13×13) — same footprint as GF
        { id: 'guest_ff', name: 'Guest Bedroom', sub: '13×13', x: 13, y: 13, w: 13, h: 13, color: 'rgba(100,200,255,0.12)' },

        // Family Lobby (13×9) — above GF kitchen zone
        { id: 'lobby_ff', name: 'Family Lobby', sub: '13×9', x: 13, y: 4, w: 13, h: 9, color: 'rgba(255,255,255,0.05)' },

        // === ZONE 2: NORTH (32×13 area) ===
        // North Balcony: 4ft cantilever outside the north wall (X: 58 to 62)
        { id: 'balcony_north_ff', name: 'N. Balcony', sub: '4×13', x: 58, y: 4, w: 4, h: 13, color: 'rgba(255,255,255,0.08)' },

        // Staircase (10×7) — same position as GF
        { id: 'staircase_ff', name: 'Staircase', sub: '10×7', x: 26, y: 10, w: 10, h: 7, color: 'rgba(200,200,200,0.1)' },

        // 2ft passage in front of staircase (X:36 to X:38)
        { id: 'passage_ff', name: 'Passage', sub: '2×13', x: 36, y: 4, w: 2, h: 13, color: 'rgba(255,255,255,0.06)', border: 'dashed' },

        // Big Bed 2: 15×13 (X:38 to X:53)
        { id: 'big_room_2_ff', name: 'Big Bed 2', sub: '15×13', x: 38, y: 4, w: 15, h: 13, color: 'rgba(150,100,255,0.15)' },

        // Dressing Room (5×5) — above GF Puja Ghar
        { id: 'sringar_n_ff', name: 'Dressing Room', sub: '5×5 (NE)', x: 53, y: 4, w: 5, h: 5, color: 'rgba(255,230,150,0.15)' },

        // Attached Washroom (5×5) — above GF Common Washroom
        { id: 'att_bath_n_ff', name: 'Att. Wash', sub: '5×5 (NW)', x: 53, y: 12, w: 5, h: 5, color: 'rgba(0,200,200,0.15)' },

        // === DOORS ===
        { id: 'd_master_ff_lobby', name: 'D', x: 12.5, y: 8, w: 1, h: 3, type: 'door' },
        { id: 'd_sringar_master', name: 'D', x: -3, y: 12.5, w: 2, h: 1, type: 'door' },
        { id: 'd_wardrobe_master', name: 'D', x: -0.5, y: 15, w: 1, h: 2, type: 'door' },
        { id: 'd_wash_master', name: 'D', x: -0.5, y: 21, w: 1, h: 2, type: 'door' },
        { id: 'd_balcony_s_ff', name: 'D', x: -5.5, y: 14, w: 1, h: 2, type: 'door' },

        { id: 'd_guest_ff_lobby', name: 'D', x: 17, y: 12.5, w: 3, h: 1, type: 'door' },
        { id: 'd_big_room_2', name: 'D', x: 37.5, y: 8, w: 1, h: 3, type: 'door' },
        { id: 'd_sringar_n_ff', name: 'D', x: 53, y: 6, w: 1, h: 2, type: 'door' },
        { id: 'd_wash_n_ff', name: 'D', x: 53, y: 14, w: 1, h: 2, type: 'door' },
        { id: 'd_balcony_n_ff', name: 'D', x: 58, y: 9.5, w: 1, h: 2, type: 'door' }
    ],
    ff2: [
        // === FRONT BALCONY — extends up to Big Bed 2 wall ===
        { id: 'balcony_front_ff2', name: 'Front Balcony', x: -9, y: 0, w: 47, h: 4, color: 'rgba(255,255,255,0.08)' },

        // === ZONE 1: SOUTH — identical to FF1 ===
        { id: 'balcony_south_ff2', name: 'S. Balcony', sub: '4×22', x: -9, y: 4, w: 4, h: 22, color: 'rgba(255,255,255,0.08)' },
        { id: 'master_ff2', name: 'Master Suite', sub: '13×22', x: 0, y: 4, w: 13, h: 22, color: 'rgba(150,100,255,0.12)' },
        { id: 'sringar_ladies_ff2', name: 'Sringar Room', sub: '5×9', x: -5, y: 4, w: 5, h: 9, color: 'rgba(255,180,180,0.15)' },
        { id: 'empty_area_ff2', name: 'Empty Area', sub: '5×5', x: -5, y: 13, w: 5, h: 5, color: 'rgba(255,230,150,0.15)' },
        { id: 'wardrobe_cab_ff2', name: 'Cabinets', sub: '5×2', x: -5, y: 18, w: 5, h: 2, color: 'rgba(160,82,45,0.3)' },
        { id: 'att_bath_ext_ff2', name: 'Att. Wash', sub: '5×6', x: -5, y: 20, w: 5, h: 6, color: 'rgba(0,200,200,0.15)' },
        { id: 'guest_ff2', name: 'Guest Bedroom', sub: '13×13', x: 13, y: 13, w: 13, h: 13, color: 'rgba(100,200,255,0.12)' },
        { id: 'lobby_ff2', name: 'Family Lobby', sub: '13×9', x: 13, y: 4, w: 13, h: 9, color: 'rgba(255,255,255,0.05)' },

        // === ZONE 2: NORTH — front balcony absorbed into rooms ===
        // North Side Balcony: 4ft cantilever (X: 58 to 62)
        { id: 'balcony_north_ff2', name: 'N. Balcony', sub: '4×17', x: 58, y: 0, w: 4, h: 17, color: 'rgba(255,255,255,0.08)' },

        // Staircase (10×7) — same position
        { id: 'staircase_ff2', name: 'Staircase', sub: '10×7', x: 26, y: 10, w: 10, h: 7, color: 'rgba(200,200,200,0.1)' },

        // 2ft passage in front of staircase
        { id: 'passage_ff2', name: 'Passage', sub: '2×17', x: 36, y: 0, w: 2, h: 17, color: 'rgba(255,255,255,0.06)', border: 'dashed' },

        // Big Bed 2: 15×17 (absorbs 4ft front balcony, Y:0 to Y:17)
        { id: 'big_room_2_ff2', name: 'Big Bed 2', sub: '15×17', x: 38, y: 0, w: 15, h: 17, color: 'rgba(150,100,255,0.15)' },

        // Dressing Room: 7×5 (Y:0 to Y:7)
        { id: 'sringar_n_ff2', name: 'Dressing Room', sub: '7×5 (NE)', x: 53, y: 0, w: 5, h: 7, color: 'rgba(255,230,150,0.15)' },

        // Empty Area: 5×3 (Y:7 to Y:10)
        { id: 'empty_n_ff2', name: 'Empty Area', sub: '5×3', x: 53, y: 7, w: 5, h: 3, color: 'rgba(255,230,150,0.15)' },

        // Cabinets: 5×2 against washroom wall (Y:10 to Y:12)
        { id: 'cab_n_ff2', name: 'Cabinets', sub: '5×2', x: 53, y: 10, w: 5, h: 2, color: 'rgba(160,82,45,0.3)' },

        // Attached Washroom (5×5) — Y:12 to Y:17
        { id: 'att_bath_n_ff2', name: 'Att. Wash', sub: '5×5 (NW)', x: 53, y: 12, w: 5, h: 5, color: 'rgba(0,200,200,0.15)' },

        // === DOORS ===
        { id: 'd_master_ff2', name: 'D', x: 12.5, y: 8, w: 1, h: 3, type: 'door' },
        { id: 'd_sringar_master_ff2', name: 'D', x: -3, y: 12.5, w: 2, h: 1, type: 'door' },
        { id: 'd_wardrobe_master_ff2', name: 'D', x: -0.5, y: 15, w: 1, h: 2, type: 'door' },
        { id: 'd_wash_master_ff2', name: 'D', x: -0.5, y: 21, w: 1, h: 2, type: 'door' },
        { id: 'd_balcony_s_ff2', name: 'D', x: -5.5, y: 14, w: 1, h: 2, type: 'door' },

        { id: 'd_guest_ff2', name: 'D', x: 17, y: 12.5, w: 3, h: 1, type: 'door' },
        { id: 'd_big_room_2_ff2', name: 'D', x: 37.5, y: 8, w: 1, h: 3, type: 'door' },
        { id: 'd_sringar_n_ff2', name: 'D', x: 55, y: 6.5, w: 2, h: 1, type: 'door' },
        { id: 'd_wash_n_ff2', name: 'D', x: 53, y: 14, w: 1, h: 2, type: 'door' },
        { id: 'd_balcony_n_ff2', name: 'D', x: 58, y: 9.5, w: 1, h: 2, type: 'door' },

        // === WINDOWS ===
        { id: 'w_big_bed2_front', name: 'W', x: 42, y: 0, w: 5, h: 0.6, type: 'window' }
    ],
    ff3: [
        // === FRONT BALCONY (4ft extension over passage — East side, connects both side balconies) ===
        { id: 'balcony_front_ff3', name: 'Front Balcony', x: -9, y: 0, w: 71, h: 4, color: 'rgba(255,255,255,0.08)' },

        // === ZONE 1: SOUTH (26×26 + 5ft extension) ===
        // South Balcony: 4ft cantilever outside the south wall (X: -9 to -5)
        { id: 'balcony_south_ff3', name: 'S. Balcony', sub: '4×22', x: -9, y: 4, w: 4, h: 22, color: 'rgba(255,255,255,0.08)' },

        // Master Suite: absorbs kitchen area (13×22)
        { id: 'master_ff3', name: 'Master Suite', sub: '13×22', x: 0, y: 4, w: 13, h: 22, color: 'rgba(150,100,255,0.12)' },

        // Sringar Room: replaces GF store+wash area (5×9)
        { id: 'sringar_ladies_ff3', name: 'Sringar Room', sub: '5×9', x: -5, y: 4, w: 5, h: 9, color: 'rgba(255,180,180,0.15)' },

        // Empty Area (5×5) + Cabinets (5×2) against washroom wall
        { id: 'empty_area_ff3', name: 'Empty Area', sub: '5×5', x: -5, y: 13, w: 5, h: 5, color: 'rgba(255,230,150,0.15)' },
        { id: 'wardrobe_cab_ff3', name: 'Cabinets', sub: '5×2', x: -5, y: 18, w: 5, h: 2, color: 'rgba(160,82,45,0.3)' },

        // Attached Washroom (5×6) — same as GF
        { id: 'att_bath_ext_ff3', name: 'Att. Wash', sub: '5×6', x: -5, y: 20, w: 5, h: 6, color: 'rgba(0,200,200,0.15)' },

        // Guest Bedroom (13×13) — same footprint as GF
        { id: 'guest_ff3', name: 'Guest Bedroom', sub: '13×13', x: 13, y: 13, w: 13, h: 13, color: 'rgba(100,200,255,0.12)' },

        // Family Lobby (13×9) — above GF kitchen zone
        { id: 'lobby_ff3', name: 'Family Lobby', sub: '13×9', x: 13, y: 4, w: 13, h: 9, color: 'rgba(255,255,255,0.05)' },

        // === ZONE 2: NORTH (32×13 area) ===
        // North Balcony: 4ft cantilever outside the north wall (X: 58 to 62)
        { id: 'balcony_north_ff3', name: 'N. Balcony', sub: '4×13', x: 58, y: 4, w: 4, h: 13, color: 'rgba(255,255,255,0.08)' },

        // Staircase (7×10) — shifted towards Big Bed 2
        { id: 'staircase_ff3', name: 'Staircase', sub: '7×10', x: 31, y: 7, w: 7, h: 10, color: 'rgba(200,200,200,0.1)' },

        // Guest Attached Washroom built in the vacant space
        { id: 'att_bath_guest_ff3', name: 'Att. Wash', sub: '5×5 (Guest)', x: 26, y: 12, w: 5, h: 5, color: 'rgba(0,200,200,0.15)' },

        // Big Bed 2: 15×13 (X:38 to X:53)
        { id: 'big_room_2_ff3', name: 'Big Bed 2', sub: '15×13', x: 38, y: 4, w: 15, h: 13, color: 'rgba(150,100,255,0.15)' },

        // Dressing Room (5×5) — above GF Puja Ghar
        { id: 'sringar_n_ff3', name: 'Dressing Room', sub: '5×5 (NE)', x: 53, y: 4, w: 5, h: 5, color: 'rgba(255,230,150,0.15)' },

        // Attached Washroom (5×5) — above GF Common Washroom
        { id: 'att_bath_n_ff3', name: 'Att. Wash', sub: '5×5 (NW)', x: 53, y: 12, w: 5, h: 5, color: 'rgba(0,200,200,0.15)' },

        // === DOORS ===
        { id: 'd_master_ff3_lobby', name: 'D', x: 12.5, y: 8, w: 1, h: 3, type: 'door' },
        { id: 'd_sringar_master_ff3', name: 'D', x: -3, y: 12.5, w: 2, h: 1, type: 'door' },
        { id: 'd_wardrobe_master_ff3', name: 'D', x: -0.5, y: 15, w: 1, h: 2, type: 'door' },
        { id: 'd_wash_master_ff3', name: 'D', x: -0.5, y: 21, w: 1, h: 2, type: 'door' },
        { id: 'd_balcony_s_ff3', name: 'D', x: -5.5, y: 14, w: 1, h: 2, type: 'door' },

        { id: 'd_guest_ff3_lobby', name: 'D', x: 17, y: 12.5, w: 3, h: 1, type: 'door' },
        { id: 'd_big_room_2_ff3', name: 'D', x: 37.5, y: 5, w: 1, h: 2, type: 'door' },
        { id: 'd_sringar_n_ff3', name: 'D', x: 53, y: 6, w: 1, h: 2, type: 'door' },
        { id: 'd_wash_n_ff3', name: 'D', x: 53, y: 14, w: 1, h: 2, type: 'door' },
        { id: 'd_balcony_n_ff3', name: 'D', x: 58, y: 9.5, w: 1, h: 2, type: 'door' },
        { id: 'd_att_guest_ff3', name: 'D', x: 26, y: 14, w: 1, h: 2, type: 'door' },
        { id: 'd_att_guest_outer_ff3', name: 'D', x: 28, y: 11.5, w: 2, h: 1, type: 'door' }
    ],
    ff4: [
        // === FRONT BALCONY — extends up to Big Bed 2 wall ===
        { id: 'balcony_front_ff4', name: 'Front Balcony', x: -9, y: 0, w: 47, h: 4, color: 'rgba(255,255,255,0.08)' },

        // === ZONE 1: SOUTH — identical to FF1 ===
        { id: 'balcony_south_ff4', name: 'S. Balcony', sub: '4×22', x: -9, y: 4, w: 4, h: 22, color: 'rgba(255,255,255,0.08)' },
        { id: 'master_ff4', name: 'Master Suite', sub: '13×18', x: 0, y: 4, w: 13, h: 18, color: 'rgba(150,100,255,0.12)' },
        // Guest Washroom from West side of Master Suite (4ft deep)
        { id: 'att_bath_guest_w_ff4', name: 'Att. Wash', sub: '13×4 (Guest)', x: 0, y: 22, w: 13, h: 4, color: 'rgba(0,200,200,0.15)' },
        { id: 'sringar_ladies_ff4', name: 'Sringar Room', sub: '5×9', x: -5, y: 4, w: 5, h: 9, color: 'rgba(255,180,180,0.15)' },
        { id: 'empty_area_ff4', name: 'Empty Area', sub: '5×5', x: -5, y: 13, w: 5, h: 5, color: 'rgba(255,230,150,0.15)' },
        { id: 'wardrobe_cab_ff4', name: 'Cabinets', sub: '5×2', x: -5, y: 18, w: 5, h: 2, color: 'rgba(160,82,45,0.3)' },
        { id: 'att_bath_ext_ff4', name: 'Att. Wash', sub: '5×6', x: -5, y: 20, w: 5, h: 6, color: 'rgba(0,200,200,0.15)' },
        { id: 'guest_ff4', name: 'Guest Bedroom', sub: '13×13', x: 13, y: 13, w: 13, h: 13, color: 'rgba(100,200,255,0.12)' },
        { id: 'lobby_ff4', name: 'Family Lobby', sub: '13×9', x: 13, y: 4, w: 13, h: 9, color: 'rgba(255,255,255,0.05)' },

        // === ZONE 2: NORTH — front balcony absorbed into rooms ===
        // North Side Balcony: 4ft cantilever (X: 58 to 62)
        { id: 'balcony_north_ff4', name: 'N. Balcony', sub: '4×17', x: 58, y: 0, w: 4, h: 17, color: 'rgba(255,255,255,0.08)' },

        // Staircase (7×10)
        { id: 'staircase_ff4', name: 'Staircase', sub: '7×10', x: 26, y: 7, w: 7, h: 10, color: 'rgba(200,200,200,0.1)' },

        // 5ft passage in front of staircase (fills the gap to Big Bed 2)
        { id: 'passage_ff4', name: 'Passage', sub: '5×13', x: 33, y: 4, w: 5, h: 13, color: 'rgba(255,255,255,0.06)', border: 'dashed' },

        // Big Bed 2: 15×17 (absorbs 4ft front balcony, Y:0 to Y:17)
        { id: 'big_room_2_ff4', name: 'Big Bed 2', sub: '15×17', x: 38, y: 0, w: 15, h: 17, color: 'rgba(150,100,255,0.15)' },

        // Dressing Room: 7×5 (Y:0 to Y:7)
        { id: 'sringar_n_ff4', name: 'Dressing Room', sub: '7×5 (NE)', x: 53, y: 0, w: 5, h: 7, color: 'rgba(255,230,150,0.15)' },

        // Empty Area: 5×3 (Y:7 to Y:10)
        { id: 'empty_n_ff4', name: 'Empty Area', sub: '5×3', x: 53, y: 7, w: 5, h: 3, color: 'rgba(255,230,150,0.15)' },

        // Cabinets: 5×2 against washroom wall (Y:10 to Y:12)
        { id: 'cab_n_ff4', name: 'Cabinets', sub: '5×2', x: 53, y: 10, w: 5, h: 2, color: 'rgba(160,82,45,0.3)' },

        // Attached Washroom (5×5) — Y:12 to Y:17
        { id: 'att_bath_n_ff4', name: 'Att. Wash', sub: '5×5 (NW)', x: 53, y: 12, w: 5, h: 5, color: 'rgba(0,200,200,0.15)' },

        // === DOORS ===
        { id: 'd_master_ff4', name: 'D', x: 12.5, y: 8, w: 1, h: 3, type: 'door' },
        { id: 'd_sringar_master_ff4', name: 'D', x: -3, y: 12.5, w: 2, h: 1, type: 'door' },
        { id: 'd_wardrobe_master_ff4', name: 'D', x: -0.5, y: 15, w: 1, h: 2, type: 'door' },
        { id: 'd_wash_master_ff4', name: 'D', x: -0.5, y: 21, w: 1, h: 2, type: 'door' },
        { id: 'd_balcony_s_ff4', name: 'D', x: -5.5, y: 14, w: 1, h: 2, type: 'door' },

        { id: 'd_guest_ff4', name: 'D', x: 17, y: 12.5, w: 3, h: 1, type: 'door' },
        { id: 'd_big_room_2_ff4', name: 'D', x: 37.5, y: 8, w: 1, h: 3, type: 'door' },
        { id: 'd_sringar_n_ff4', name: 'D', x: 55, y: 6.5, w: 2, h: 1, type: 'door' },
        { id: 'd_wash_n_ff4', name: 'D', x: 53, y: 14, w: 1, h: 2, type: 'door' },
        { id: 'd_balcony_n_ff4', name: 'D', x: 58, y: 9.5, w: 1, h: 2, type: 'door' },
        { id: 'd_guest_wash_w_ff4', name: 'D', x: 12.5, y: 24, w: 1, h: 2, type: 'door' },

        // === WINDOWS ===
        { id: 'w_big_bed2_front_ff4', name: 'W', x: 42, y: 0, w: 5, h: 0.6, type: 'window' }
    ],
    ff5: [
        // === FRONT BALCONY — extends up to Big Bed 2 wall ===
        { id: 'balcony_front_ff5', name: 'Front Balcony', x: -9, y: 0, w: 47, h: 4, color: 'rgba(255,255,255,0.08)' },

        // === ZONE 1: SOUTH — identical to FF1 ===
        { id: 'balcony_south_ff5', name: 'S. Balcony', sub: '4×22', x: -9, y: 4, w: 4, h: 22, color: 'rgba(255,255,255,0.08)' },
        { id: 'master_ff5', name: 'Master Suite', sub: '13×18', x: 0, y: 4, w: 13, h: 18, color: 'rgba(150,100,255,0.12)' },
        // Guest Washroom from West side of Master Suite (4ft deep)
        { id: 'att_bath_guest_w_ff5', name: 'Att. Wash', sub: '13×4 (Guest)', x: 0, y: 22, w: 13, h: 4, color: 'rgba(0,200,200,0.15)' },
        { id: 'sringar_ladies_ff5', name: 'Sringar Room', sub: '5×9', x: -5, y: 4, w: 5, h: 9, color: 'rgba(255,180,180,0.15)' },
        { id: 'empty_area_ff5', name: 'Empty Area', sub: '5×5', x: -5, y: 13, w: 5, h: 5, color: 'rgba(255,230,150,0.15)' },
        { id: 'wardrobe_cab_ff5', name: 'Cabinets', sub: '5×2', x: -5, y: 18, w: 5, h: 2, color: 'rgba(160,82,45,0.3)' },
        { id: 'att_bath_ext_ff5', name: 'Att. Wash', sub: '5×6', x: -5, y: 20, w: 5, h: 6, color: 'rgba(0,200,200,0.15)' },
        { id: 'guest_ff5', name: 'Guest Bedroom', sub: '13×13', x: 13, y: 13, w: 13, h: 13, color: 'rgba(100,200,255,0.12)' },
        { id: 'lobby_ff5', name: 'Family Lobby', sub: '13×9', x: 13, y: 4, w: 13, h: 9, color: 'rgba(255,255,255,0.05)' },

        // === ZONE 2: NORTH — front balcony absorbed into rooms ===
        // North Side Balcony: 4ft cantilever (X: 58 to 62)
        { id: 'balcony_north_ff5', name: 'N. Balcony', sub: '4×17', x: 58, y: 0, w: 4, h: 17, color: 'rgba(255,255,255,0.08)' },

        // Staircase (12×7)
        { id: 'staircase_ff5', name: 'Staircase', sub: '12×7', x: 26, y: 10, w: 12, h: 7, color: 'rgba(200,200,200,0.1)' },

        // 2ft passage between staircase and Big Bed 2
        { id: 'passage_ff5', name: 'Passage', sub: '2×17', x: 38, y: 0, w: 2, h: 17, color: 'rgba(255,255,255,0.06)', border: 'dashed' },

        // Big Bed 2: 13×17 (shifted 2ft right)
        { id: 'big_room_2_ff5', name: 'Big Bed 2', sub: '13×17', x: 40, y: 0, w: 13, h: 17, color: 'rgba(150,100,255,0.15)' },

        // Dressing Room: 7×5 (Y:0 to Y:7)
        { id: 'sringar_n_ff5', name: 'Dressing Room', sub: '7×5 (NE)', x: 53, y: 0, w: 5, h: 7, color: 'rgba(255,230,150,0.15)' },

        // Empty Area: 5×3 (Y:7 to Y:10)
        { id: 'empty_n_ff5', name: 'Empty Area', sub: '5×3', x: 53, y: 7, w: 5, h: 3, color: 'rgba(255,230,150,0.15)' },

        // Cabinets: 5×2 against washroom wall (Y:10 to Y:12)
        { id: 'cab_n_ff5', name: 'Cabinets', sub: '5×2', x: 53, y: 10, w: 5, h: 2, color: 'rgba(160,82,45,0.3)' },

        // Attached Washroom (5×5) — Y:12 to Y:17
        { id: 'att_bath_n_ff5', name: 'Att. Wash', sub: '5×5 (NW)', x: 53, y: 12, w: 5, h: 5, color: 'rgba(0,200,200,0.15)' },

        // === DOORS ===
        { id: 'd_master_ff5', name: 'D', x: 12.5, y: 8, w: 1, h: 3, type: 'door' },
        { id: 'd_sringar_master_ff5', name: 'D', x: -3, y: 12.5, w: 2, h: 1, type: 'door' },
        { id: 'd_wardrobe_master_ff5', name: 'D', x: -0.5, y: 15, w: 1, h: 2, type: 'door' },
        { id: 'd_wash_master_ff5', name: 'D', x: -0.5, y: 21, w: 1, h: 2, type: 'door' },
        { id: 'd_balcony_s_ff5', name: 'D', x: -5.5, y: 14, w: 1, h: 2, type: 'door' },

        { id: 'd_guest_ff5', name: 'D', x: 17, y: 12.5, w: 3, h: 1, type: 'door' },
        { id: 'd_big_room_2_ff5', name: 'D', x: 39.5, y: 8, w: 1, h: 3, type: 'door' },
        { id: 'd_sringar_n_ff5', name: 'D', x: 55, y: 6.5, w: 2, h: 1, type: 'door' },
        { id: 'd_wash_n_ff5', name: 'D', x: 53, y: 14, w: 1, h: 2, type: 'door' },
        { id: 'd_balcony_n_ff5', name: 'D', x: 58, y: 9.5, w: 1, h: 2, type: 'door' },
        { id: 'd_guest_wash_w_ff5', name: 'D', x: 12.5, y: 24, w: 1, h: 2, type: 'door' },

        // === WINDOWS ===
        { id: 'w_big_bed2_front_ff5', name: 'W', x: 44, y: 0, w: 5, h: 0.6, type: 'window' }
    ]
};

const blueprintEl = document.getElementById('blueprint');
const btnGf = document.getElementById('btn-gf');
const btnGf2 = document.getElementById('btn-gf2');
const btnFf = document.getElementById('btn-ff');
const btnFf2 = document.getElementById('btn-ff2');
const btnFf3 = document.getElementById('btn-ff3');
const btnFf4 = document.getElementById('btn-ff4');
const btnFf5 = document.getElementById('btn-ff5');
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
        const offLR = 80; // larger offset for left/right to clear 4ft balconies
        switch (dim.pos) {
            case 'top': oy1 -= off; oy2 -= off; tx = (ox1 + ox2) / 2; ty = oy1 - 8; break;
            case 'right': ox1 += offLR; ox2 += offLR; tx = ox1 + 10; ty = (oy1 + oy2) / 2; rot = 90; break;
            case 'left': ox1 -= offLR; ox2 -= offLR; tx = ox1 - 10; ty = (oy1 + oy2) / 2; rot = -90; break;
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
        { label: 'NORTH', x: 58 * S + 45, y: 7 * S, r: 90 }
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
    blueprintEl.style.width = (58 * S) + 'px';
    blueprintEl.style.height = (26 * S) + 'px';

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', 58 * S);
    svg.setAttribute('height', 26 * S);
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.overflow = 'visible';

    drawRooms(svg, svgNS, floorKey);
    drawPlot(svg, svgNS);
    blueprintEl.appendChild(svg);
}

function setActive(btn) {
    [btnGf, btnGf2, btnFf, btnFf2, btnFf3, btnFf4, btnFf5].forEach(b => {
        if(b) b.classList.remove('active');
    });
    btn.classList.add('active');
}

btnGf.addEventListener('click', () => { setActive(btnGf); renderFloor('gf'); });
btnGf2.addEventListener('click', () => { setActive(btnGf2); renderFloor('gf2'); });
btnFf.addEventListener('click', () => { setActive(btnFf); renderFloor('ff'); });
btnFf2.addEventListener('click', () => { setActive(btnFf2); renderFloor('ff2'); });
if(btnFf3) btnFf3.addEventListener('click', () => { setActive(btnFf3); renderFloor('ff3'); });
if(btnFf4) btnFf4.addEventListener('click', () => { setActive(btnFf4); renderFloor('ff4'); });
if(btnFf5) btnFf5.addEventListener('click', () => { setActive(btnFf5); renderFloor('ff5'); });

let currentRotation = 0;

function updateTransform() {
    blueprintEl.style.transform = `scale(${currentScale}) rotate(${currentRotation}deg)`;
}

document.getElementById('zoom-in').addEventListener('click', () => {
    currentScale += 0.15;
    updateTransform();
});

document.getElementById('zoom-out').addEventListener('click', () => {
    currentScale = Math.max(0.3, currentScale - 0.15);
    updateTransform();
});

document.getElementById('zoom-reset').addEventListener('click', () => {
    currentScale = 1;
    currentRotation = 0;
    updateTransform();
});

document.getElementById('rotate-btn').addEventListener('click', () => {
    currentRotation = (currentRotation + 90) % 360;
    updateTransform();
});

document.getElementById('rate-select').addEventListener('change', (e) => {
    const rate = parseInt(e.target.value);
    const total = rate * 2700;
    document.getElementById('total-price').innerText = '₹' + total.toLocaleString('en-IN');
});

renderFloor('gf');
