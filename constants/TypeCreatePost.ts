const typeRooms = [
    { index: 1, label: 'Phòng trọ' },
    { index: 2, label: 'Nhà đất' },
    { index: 3, label: 'Studio' },
    { index: 4, label: 'Ký túc xá' },
    { index: 5, label: 'Duplex' },
    { index: 6, label: 'Căn hộ' },
]

const getTypeRoomById = (id: number) => {
    const room = typeRooms.find((item) => item.index === id);
    return room?.label;
}

const styleRooms = [
    { index: 1, label: "Hiện đại" },
    { index: 2, label: "Cổ điển" },
    { index: 3, label: "Tối giản" },
]

const floorRooms = [
    { index: 1, label: "Hiện đại" },
    { index: 2, label: "Gỗ" },
    { index: 3, label: "Gạch men" },
    { index: 4, label: "Xi Măng" },
]

const typeSales = [
    { index: 1, label: 'Mua bán' },
    { index: 2, label: 'Cho thuê' },
]

export {
    typeSales,
    typeRooms, getTypeRoomById,
    styleRooms,
    floorRooms,
}