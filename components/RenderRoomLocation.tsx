
'use client';
import { findTypeByName } from "@/constants/districts";
import { getDistrictAction } from "@/service/actions/DistrictAction";
import { useCallback, useEffect, useState } from "react";
import TitleRoom from "@/components/TitleRoom";
import MainRoomList from "@/app/home/component/MainRoomList";

export default function RoomsLocation() {
    const [dataPost, setDataPost] = useState<any>();
    const [title, setTitle] = useState<string>('');
    const page = 1;
    const size = 10;

    const handleFetchData = async (district: string) => {
        const type = findTypeByName(district || 'TP.Thủ Đức') as number || 769;
        console.log('Address:', district, 'type: ', type);
        const data = await getDistrictAction(type, page, size);
        const rooms = data?.data?.data;
        setDataPost(rooms);
        setTitle(`Danh sách nhà tại ${district}`);
    }
    const fetchLocationDetails = useCallback(async (lat: number, lon: number) => {
        console.log('check ', lat, lon);
        const apiKey = '2957dd5070844700a7c254fce8cef57a';
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

        try {
            const res = await fetch(apiUrl);
            const data = await res.json();

            if (data.results && data.results.length > 0) {
                const formattedAddress = data.results[0].formatted;
                console.log('Address:', formattedAddress);
                const addressParts: string[] = formattedAddress.split(',');
                const district = addressParts[addressParts.length - 3];
                console.log('Region or District (last part - 3):', district);
                await handleFetchData(district)
            } else {
                console.error('Error: No results found');
            }
        } catch (error) {
            console.error('Error fetching location details:', error);
        }
    }, []);
    useEffect(() => {
        const fetchLocation = async () => {
            const res = await fetch('/api/location');
            const data = await res.json();

            console.log('check data: ', data);
            if (res.ok) {
                fetchLocationDetails(data?.lat, data?.lon);
            } else {
                console.error(data.error);
            }
        };

        fetchLocation();
    }, [fetchLocationDetails]);

    return (
        <>
            {dataPost && title
                ? <>
                    <TitleRoom title={title} />
                    <MainRoomList data={dataPost} page={page} size={size} />
                </>
                : null
            }
        </>
    );
}
