interface PostImage {
  name: string;
  type: string;
  urlImagePost: string;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  postImages: PostImage[];
}

export interface News {
  data: NewsItem[];
}
