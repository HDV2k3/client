const convertTimestampToDate = (timestamp: number): string => {
    // Chuyển đổi timestamp từ giây sang mili-giây
    const date = new Date(timestamp * 1000);

    // Lấy các thành phần ngày, tháng, năm
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    // Định dạng ngày tháng năm (DD/MM/YYYY)
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
}

export {
    convertTimestampToDate
}