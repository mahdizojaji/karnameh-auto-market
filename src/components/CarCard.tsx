import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone } from "lucide-react";
import { CarPost } from "@/types/car";
import { formatNumber } from "@/lib/utils";

interface CarCardProps {
  car: CarPost;
}

export const CarCard = ({ car }: CarCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={car.image}
          alt={car.title}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{car.title}</h3>
        <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
          <span>{car.city_name_fa}</span>
          <span>{formatNumber(car.usage)} کیلومتر</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold">{formatNumber(car.price)} تومان</span>
          <Button size="sm" className="gap-2">
            <Phone className="h-4 w-4" />
            تماس
          </Button>
        </div>
      </div>
    </Card>
  );
};