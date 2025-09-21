'use client';
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Car } from "@/types/Car";
import {
  Gauge,
  Weight,
  Cog,
  Bolt,
  Ratio,
  Car as CarIcon,
  Flag,
  Wrench,
  Diamond
} from "lucide-react";

interface CarCardProps {
  car: Car;
}

const carTypeIcons: Record<string, React.ElementType> = {
  Street: CarIcon,
  Race: Flag,
  Tuned: Wrench,
};

export default function CarCard({ car }: CarCardProps) {
  return (
    <Card className="py-4 max-w-md mx-auto">
      {/* Заголовок */}
      <CardHeader className="pb-0 pt-0 px-4 flex-col items-start">
        <h4 className="font-bold text-xl text-gray-900">{car.brand}</h4>
        <small className="text-default-500 truncate max-w-xs block">
          {car.model.length > 38 ? car.model.slice(0, 35) + "..." : car.model}
        </small>
      </CardHeader>

      {/* Фото */}
      <CardBody className="overflow-visible py-2">
        <Image
          alt={car.brand}
          className="object-cover rounded-xl"
          src={car.img_url}
          width={260}
        />
      </CardBody>

      {/* Характеристики */}
      <CardFooter className="pb-0 pt-2 px-4 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-700">
          <div className="flex items-center gap-3">
            <Cog className="w-5 h-5 text-gray-600" />
            <span>{car.drive ? car.drive : "-"}</span>
          </div>
          <div className="flex items-center gap-3">
            <Bolt className="w-5 h-5 text-gray-600" />
            <span>{car.hp ? car.hp : "-"} л.с.</span>
          </div>
          <div className="flex items-center gap-3">
            <Weight className="w-5 h-5 text-gray-600" />
            <span>{car.weight ? car.weight : "-"} кг</span>
          </div>
          <div className="flex items-center gap-3">
            <Gauge className="w-5 h-5 text-gray-600" />
            <span>{car.torque ? car.torque : "-"} Нм</span>
          </div>
          <div className="flex items-center gap-3 justify-center col-span-2">
            <Ratio className="w-5 h-5 text-gray-600" />
            <span>{car.w_kg ?? '-'}</span>
          </div>
          {/* Тип машины */}
          <div className="flex items-center gap-3 justify-center col-span-2 bg-gray-200 px-3 py-2 rounded-lg">
            {(() => {
              const Icon = carTypeIcons[car.car_type as keyof typeof carTypeIcons] || Diamond;
              return <Icon className="w-5 h-5 text-gray-600" />;
            })()}
            <span>{car.car_type ?? '-'}</span>
          </div>
        </div>

        {/* Цена */}
        <div className="flex justify-center w-full">
          <span className="w-full px-3 py-2 rounded-lg bg-primary text-white text-base font-semibold shadow-md text-center">
            {car.price ? `${car.price} CR` : "Цена не указана"}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}