'use client';

import { useEffect, useState } from "react";
import { getCarById } from "../../lib/getCarByID";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { 
  Car, 
  Gauge, 
  Weight, 
  Cog, 
  Bolt, 
  Ratio 
} from "lucide-react";

export default function CarCard({ params: { id } }: any) {
  const [car, setCar] = useState<any>(null);

  useEffect(() => {
    getCarById(id).then(setCar).catch(console.error);
  }, [id]);

  if (!car) return (
    <div className="flex justify-center items-center h-80">
      <span className="animate-pulse text-xl text-gray-500">Загрузка...</span>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden transform">
      {/* Фото */}
      <div className="relative">
        <img
          src={car.img_url}
          alt={car.model}
          className="w-full h-64 object-cover bg-gray-100"
        />
        <span className="absolute bottom-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-lg">
          {car.price ? `${car.price} CR` : "Цена не указана"}
        </span>
      </div>

      {/* Контент */}
      <div className="p-6 space-y-4">
        {/* Заголовок */}
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {car.brand}
          </h2>
          <p className="text-gray-500 text-lg">{car.model} • {car.car_type}</p>
        </div>

        <hr className="my-2 border-gray-200" />

        {/* Характеристики */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Cog className="w-4 h-4 text-gray-600" />
            <span className="font-medium">Привод:</span> {car.drive}
          </div>
          <div className="flex items-center gap-2">
            <Bolt className="w-4 h-4 text-gray-600" />
            <span className="font-medium">Мощность:</span> {car.hp} л.с.
          </div>
          <div className="flex items-center gap-2">
            <Weight className="w-4 h-4 text-gray-600" />
            <span className="font-medium">Вес:</span> {car.weight} кг
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-gray-600" />
            <span className="font-medium">Крутящий момент:</span> {car.torque} Нм
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <Ratio className="w-4 h-4 text-gray-600" />
            <span className="font-medium">Вес/мощность:</span> {car.w_kg}
          </div>
        </div>

        {/* Кнопка */}
        <div className="flex justify-end">
          <Button
            as={Link}
            href="/cars_list"
            color="danger"
            variant="shadow"
            className="rounded-xl px-6 py-2 font-semibold"
          >
            Назад
          </Button>
        </div>
      </div>
    </div>
  );
}
