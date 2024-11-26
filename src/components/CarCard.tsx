import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone } from "lucide-react";
import { CarPost } from "@/types/car";
import { formatNumber } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface CarCardProps {
  car: CarPost;
}

export const CarCard = ({ car }: CarCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === car.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? car.images.length - 1 : prev - 1
    );
  };

  return (
    <Card className="overflow-hidden bg-white">
      <div className="relative">
        {/* Image Gallery */}
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={car.images[currentImageIndex]}
            alt={car.title}
            className="object-cover w-full h-full"
          />
          
          {/* Navigation Arrows */}
          <button 
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 p-1 rounded-full hover:bg-black/50 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button 
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 p-1 rounded-full hover:bg-black/50 transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Image Counter Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {car.images.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 w-1.5 rounded-full ${
                  currentImageIndex === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Car Info */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">{car.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{formatNumber(car.usage)} کیلومتر</span>
                <span>•</span>
                <span>{car.city_name_fa}</span>
              </div>
            </div>
            <Button size="icon" variant="outline" className="rounded-full">
              <Phone className="h-4 w-4" />
            </Button>
          </div>

          {/* Price Section */}
          <div className="space-y-2">
            {car.prepayment_amount > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">پیش‌پرداخت خرید قسطی</span>
                <span className="font-medium">{formatNumber(car.prepayment_amount)} تومان</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">قیمت نقدی</span>
              <span className="font-semibold">{formatNumber(car.price)} تومان</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};