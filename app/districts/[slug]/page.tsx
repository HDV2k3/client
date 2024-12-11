import { getIdBySlug } from "@/utils/converStringToSlug";
import { findNameByType } from '@/constants/districts'
import { getDistrictAction } from "@/service/actions/DistrictAction";
import MainDistricts from "./components/MainDistricts";
import ButtonBack from "@/components/Button/ButtonBack";
import TitleRoom from "@/components/TitleRoom";

type Props = {
    params: {
        slug: string;
    }
}

export default async function DistrictPage({ params }: Props) {
    const slug = params?.slug;
    const type = Number(getIdBySlug(slug));
    const district = findNameByType(type);
    const page = 1;
    const limit = 5;
    const title = `Danh sách nhà tại ${district}`;
    const data = await getDistrictAction(type, page, limit);
    const rooms = data?.data?.data;
    return (
        <div className='mt-[20px]'>
            <div className='flex'>
                <ButtonBack />
                <div className='ml-[10px]'>
                    <TitleRoom title={title} />
                </div>
            </div>
            <MainDistricts data={rooms} type={type} page={page} limit={limit} title={title} />
        </div>
    )
}