export interface CarPost {
  id?: string;
  title: string;
  city_name_fa: string;
  usage: number;
  price: number;
  image: string;
}

export interface CarPostsResponse {
  car_posts: CarPost[];
  total: number;
  pages: number;
  start: number;
  size: number;
}