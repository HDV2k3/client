import { fetchPostsById } from '@/service/Marketing';

type Props = {
    params: {
        id: string;
    }
}

export default async function EditPostPage({ params }: Props) {
    const id = params.id;
    const data = await fetchPostsById(id);
    console.log('check data: ', data?.data)
    return (
        <>
            {id}
        </>
    )
}