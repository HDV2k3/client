'use client';

import { useEffect, useState } from 'react';

export default function GeoInfo() {
    const [geoData, setGeoData] = useState(null);

    useEffect(() => {
        const fetchGeoInfo = async () => {
            try {
                const response = await fetch('/api/geo');
                const data = await response.json();
                setGeoData(data);
            } catch (error) {
                console.error('Error fetching geo info:', error);
            }
        };

        fetchGeoInfo();
    }, []);

    return (
        <div>
            <h1>Geo Info</h1>
            {geoData ? (
                <pre>{JSON.stringify(geoData, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
