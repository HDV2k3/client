import { getIdBySlug } from "@/utils/converStringToSlug";
import { findNameByType } from '@/constants/districts'
import { getDistrictAction } from "@/service/actions/DistrictAction";

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
    const size = 5;
    if (!district) return <></>
    const data = await getDistrictAction(district, page, size);
    console.log('check data ', data);
    return (
        <>

        </>
    )
}