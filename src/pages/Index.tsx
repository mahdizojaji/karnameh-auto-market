import { useQuery } from "@tanstack/react-query";
import { CarCard } from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { CarPostsResponse } from "@/types/car";
import { useState } from "react";

const ITEMS_PER_PAGE = 20;

const Index = () => {
  const [page, setPage] = useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["cars", page],
    queryFn: async () => {
      const response = await fetch(
        `https://api-gw.karnameh.com/post-storage/car-posts/car-post-list/?size=${ITEMS_PER_PAGE}&start=${
          page * ITEMS_PER_PAGE
        }&sort=newest&relevant=false`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as Promise<CarPostsResponse>;
    },
  });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">خطا در دریافت اطلاعات</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">آگهی‌های خودرو</h1>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-[300px] bg-gray-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : data?.items ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {data.items.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
          
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              قبلی
            </Button>
            <Button
              variant="outline"
              onClick={() => setPage((p) => p + 1)}
              disabled={!data || data.items.length < ITEMS_PER_PAGE}
            >
              بعدی
            </Button>
          </div>
        </>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">هیچ آگهی‌ای یافت نشد</p>
        </div>
      )}
    </div>
  );
};

export default Index;