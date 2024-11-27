import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CarPost } from "@/types/car";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { CarCard } from "@/components/CarCard";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: car, isLoading } = useQuery({
    queryKey: ["car", id],
    queryFn: async () => {
      const response = await fetch(
        `https://api-gw.karnameh.com/post-storage/car-posts/car-post-list/?size=1&start=0&sort=newest&relevant=false`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.car_posts[0] as CarPost;
    },
  });

  const { data: similarCars } = useQuery({
    queryKey: ["similar-cars", car?.title],
    enabled: !!car,
    queryFn: async () => {
      const response = await fetch(
        `https://api-gw.karnameh.com/post-storage/car-posts/car-post-list/?size=3&start=0&sort=newest&relevant=false`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.car_posts as CarPost[];
    },
  });

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="h-[400px] bg-gray-200 rounded-lg animate-pulse" />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="container py-8">
        <p className="text-center text-gray-500">خودرو مورد نظر یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Button 
        variant="ghost" 
        className="mb-6 gap-2" 
        onClick={() => navigate('/')}
      >
        <ArrowRight className="h-4 w-4" />
        بازگشت به لیست
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
          <img
            src={car.image}
            alt={car.title}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{car.title}</h1>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">کارکرد</span>
              <span className="font-semibold">{formatNumber(car.usage)} کیلومتر</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">شهر</span>
              <span className="font-semibold">{car.city_name_fa}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">قیمت</span>
              <span className="font-semibold">{formatNumber(car.price)} تومان</span>
            </div>
            <Button className="w-full gap-2">
              <Phone className="h-4 w-4" />
              تماس با فروشنده
            </Button>
          </div>
        </div>
      </div>

      {similarCars && similarCars.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">آگهی‌های مشابه</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;