export const dynamic = 'force-dynamic';

export async function GET(req: any) {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('remote-address');

    const apiUrl = `http://ip-api.com/json/${ip}?fields=city,region,country,lat,lon`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.status === "fail") {
            return new Response(JSON.stringify({ error: 'Unable to fetch location data' }), { status: 500 });
        }
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error('Error fetching IP location:', error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}
