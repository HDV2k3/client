export async function generateMetadata() {
    const str = 'NextLife: Phòng trọ giá tốt';
    return {
        title: str,
        description: str,
        openGraph: {
            title: str,
            description: str,
            url: '/phong-tro',
            type: 'article',
        }
    }
}

export default function PhongTroPage() {
    return (
        <>Phong tro</>
    )
}