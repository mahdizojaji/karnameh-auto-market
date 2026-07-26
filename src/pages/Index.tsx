import { useQuery } from "@tanstack/react-query";
import { CarCard } from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { CarPostsResponse } from "@/types/car";
import { fetchCarPosts } from "@/lib/carApi";
import { useState } from "react";
import { CarFilters, CarFiltersState, defaultFilters } from "@/components/CarFilters";

const Index = () => {
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<CarFiltersState>(defaultFilters);
  const itemsPerPage = filters.size;

  const { data, isLoading, error } = useQuery({
    queryKey: ["cars", page, filters],
    queryFn: async () => {
      const data = await fetchCarPosts({
        size: filters.size,
        start: page * filters.size,
        sort: filters.sort,
        relevant: filters.relevant,
        is_guaranteed: filters.is_guaranteed,
        has_active_campaign: filters.has_active_campaign,
      });
      return data as CarPostsResponse;
    },
  });

  const handleFiltersChange = (next: CarFiltersState) => {
    setFilters(next);
    setPage(0);
  };

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

      <CarFilters value={filters} onChange={handleFiltersChange} />

      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-[300px] bg-gray-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : data && data.car_posts && data.car_posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {data.car_posts.map((car) => (
              <CarCard key={car.image} car={car} />
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
              disabled={!data || data.car_posts.length < itemsPerPage}
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