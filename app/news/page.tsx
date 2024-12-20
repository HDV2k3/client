import MainNewsClient from "./component/LoadData";

export default async function NewsPage() {
  const page = 1;
  const size = 10;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/news/all?page=${page}&size=${size}`
  );
  const data = await response.json();
  const dataNews = data.data.data;
  return <MainNewsClient data={dataNews} />
  
}
