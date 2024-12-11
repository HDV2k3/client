const districtsConstants = [
    {
        name: "TP.Thủ Đức",
        posts: 20,
        imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fthanh-pho-thu-duc.jpg?alt=media&token=8604e841-8099-4601-9406-869c203b9330",
    },
    {
        name: "Quận 1",
        posts: 5,
        imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fquan1.jpg?alt=media&token=3c8649ea-3de9-4d6c-8596-0eaaeb3d5c54",
    },
    {
        name: "Quận Phú Nhuận",
        posts: 9,
        imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2F1-gioi-thieu-tong-quan-ve-quan-phu-nhuan-tphcm.jpg?alt=media&token=ad222cd5-a978-4702-b829-500491bec002",
    },
    {
        name: "Quận Tân Bình",
        posts: 14,
        imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fcong-vien-hoang-van-thu.jpg?alt=media&token=819223d0-ca0e-4fcd-89cb-7b466db07528",
    },
    {
        name: "Quận 10",
        posts: 18,
        imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fchung-cu-cao-cap-quan-10.jpg?alt=media&token=ab9bfd58-814d-42c3-9663-7367fd5b8ecb",
    },
    {
        name: "Huyện Cần Giờ",
        posts: 12,
        imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fchung-cu-cao-cap-quan-10.jpg?alt=media&token=ab9bfd58-814d-42c3-9663-7367fd5b8ecb",
    },
    {
        name: "Quận 3",
        posts: 8,
        imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fcong-vien-hoang-van-thu.jpg?alt=media&token=819223d0-ca0e-4fcd-89cb-7b466db07528",
    },
    {
        name: "Quận 4",
        posts: 6,
        imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2F1-gioi-thieu-tong-quan-ve-quan-phu-nhuan-tphcm.jpg?alt=media&token=ad222cd5-a978-4702-b829-500491bec002",
    },
    {
        name: "Quận 5",
        posts: 7,
        imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fquan1.jpg?alt=media&token=3c8649ea-3de9-4d6c-8596-0eaaeb3d5c54",
    },
    {
        name: "Quận 6",
        posts: 10,
        imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fthanh-pho-thu-duc.jpg?alt=media&token=8604e841-8099-4601-9406-869c203b9330",
    },
    {
        name: "Quận 7",
        posts: 15,
        imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fthanh-pho-thu-duc.jpg?alt=media&token=8604e841-8099-4601-9406-869c203b9330",
    },
    {
        name: "Quận 8",
        posts: 11,
        imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2F1-gioi-thieu-tong-quan-ve-quan-phu-nhuan-tphcm.jpg?alt=media&token=ad222cd5-a978-4702-b829-500491bec002",
    },
    // {
    //     name: "Quận 9",
    //     posts: 13,
    //     imageUrl:
    //         "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fquan1.jpg?alt=media&token=3c8649ea-3de9-4d6c-8596-0eaaeb3d5c54",
    // },
    {
        name: "Quận Bình Thạnh",
        posts: 16,
        imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fthanh-pho-thu-duc.jpg?alt=media&token=8604e841-8099-4601-9406-869c203b9330",
    },
    {
        name: "Quận Gò Vấp",
        posts: 17,
        imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fthanh-pho-thu-duc.jpg?alt=media&token=8604e841-8099-4601-9406-869c203b9330",
    },
    {
        name: "Quận Tân Phú",
        posts: 19,
        imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fchung-cu-cao-cap-quan-10.jpg?alt=media&token=ab9bfd58-814d-42c3-9663-7367fd5b8ecb",
    },
    {
        name: "Quận Bình Tân",
        posts: 22,
        imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fcong-vien-hoang-van-thu.jpg?alt=media&token=819223d0-ca0e-4fcd-89cb-7b466db07528",
    },
    {
        name: "Huyện Bình Chánh",
        posts: 25,
        imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fchung-cu-cao-cap-quan-10.jpg?alt=media&token=ab9bfd58-814d-42c3-9663-7367fd5b8ecb",
    },
    {
        name: "Huyện Củ Chi",
        posts: 30,
        imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fcong-vien-hoang-van-thu.jpg?alt=media&token=819223d0-ca0e-4fcd-89cb-7b466db07528",
    },
    {
        name: "Huyện Hóc Môn",
        posts: 27,
        imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fchung-cu-cao-cap-quan-10.jpg?alt=media&token=ab9bfd58-814d-42c3-9663-7367fd5b8ecb",
    },
    {
        name: "Huyện Nhà Bè",
        posts: 23,
        imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fcong-vien-hoang-van-thu.jpg?alt=media&token=819223d0-ca0e-4fcd-89cb-7b466db07528",
    },
];

const districtsType = [
    { type: 769, name: "TP.Thủ Đức" },
    { type: 760, name: "Quận 1" },
    { type: 761, name: "Quận 12" },
    { type: 768, name: "Quận Phú Nhuận" },
    { type: 766, name: "Quận Tân Bình" },
    { type: 771, name: "Quận 10" },
    { type: 772, name: "Quận 11" },
    // { type: 6, name: "Quận 2" },
    { type: 770, name: "Quận 3" },
    { type: 773, name: "Quận 4" },
    { type: 774, name: "Quận 5" },
    { type: 775, name: "Quận 6" },
    { type: 778, name: "Quận 7" },
    { type: 776, name: "Quận 8" },
    // { type: 13, name: "Quận 9" },
    { type: 765, name: "Quận Bình Thạnh" },
    { type: 764, name: "Quận Gò Vấp" },
    { type: 767, name: "Quận Tân Phú" },
    { type: 777, name: "Quận Bình Tân" },
    { type: 785, name: "Huyện Bình Chánh" },
    { type: 783, name: "Huyện Củ Chi" },
    { type: 784, name: "Huyện Hóc Môn" },
    { type: 786, name: "Huyện Nhà Bè" },
    { type: 787, name: "Huyện Cần Giờ" },
]

const findTypeByName = (name: string) => {
    const district = districtsType.find(district => district.name === name);
    return district ? district.type : null; // Returns the type or null if not found
};

const findNameByType = (type: number) => {
    return districtsType.find(district => district.type === type)?.name;
}


export {
    districtsConstants,
    districtsType,
    findTypeByName,
    findNameByType,
}