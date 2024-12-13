// "use client";
import NewsCard from "@/components/NewsCard";
// import { fetchAllNew } from "@/service/NewsService";
// import { News } from "@/types/New";
// import { Spin } from "antd";
// import { useEffect, useState } from "react";

type Props = {
    data: any;
}
export default function MainNewsClient({ data }: Props) {
    // const [allData, setAllData] = useState<News[]>([]);
    // const [isLoading, setIsLoading] = useState<boolean>(false);

    // const fetchData = async () => {
    //     try {
    //         setIsLoading(true);
    //         const data = await fetchAllNew(1, 10);
    //         setAllData(data);
    //         setIsLoading(false);
    //     } catch (e) {
    //         setIsLoading(false)
    //     }
    // };
    // useEffect(() => {
    //     fetchData();
    // }, []);

    // if (isLoading) return <div style={{ height: 300, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    //     <Spin size="large" />
    // </div>

    return (
        <div>
            {data.map((news: any, index: any) => (
                <NewsCard key={index} data={news} />
            ))}
        </div>
    )
}