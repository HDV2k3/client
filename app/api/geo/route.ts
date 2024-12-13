export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import path from 'path';
import maxmind from 'maxmind';

let lookup: any;

export async function GET(req: any) {
    try {
        // Khởi tạo cơ sở dữ liệu GeoLite2 nếu chưa được khởi tạo
        if (!lookup) {
            const dbPath = path.join(process.cwd(), 'public/db/GeoLite2-City.mmdb');
            lookup = await maxmind.open(dbPath);
        }

        // Lấy địa chỉ IP từ request headers
        const ip =
            req.headers.get('x-forwarded-for')?.split(',')[0] ||
            req.headers.get('x-real-ip') ||
            req.ip ||
            '127.0.0.1';

        // Tra cứu thông tin địa lý
        const geoData = lookup.get(ip);

        return NextResponse.json({
            success: true,
            ip,
            geoData,
        });
    } catch (error) {
        console.error('Error fetching GeoLite2 data:', error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
