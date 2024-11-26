export interface CarPost {
  id: string;
  title: string;
  city_name_fa: string;
  usage: number;
  price: number;
  image: string;
}

export interface CarPostsResponse {
  items: CarPost[];
  total: number;
}