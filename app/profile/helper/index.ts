import { vi } from 'date-fns/locale';
import { format } from "date-fns";

const formatFullDate = (dateString: string) => {
    return format(new Date(dateString), "dd 'tháng' MM 'năm' yyyy", { locale: vi });
};

export {
    formatFullDate
}