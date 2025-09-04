'use client';

import { useEffect, useState } from "react";
import { getCarById } from "../../lib/getCarByID";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

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
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
      <img
        src={car.img_url}
        alt={car.model}
        className="w-full h-56 object-cover bg-gray-100"
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-800">{car.brand}</h2>
          <span className="text-xl font-semibold text-gray-800">
            {car.price ? `${car.price} CR` : "Цена не указана"}
          </span>
        </div>
        <div className="text-gray-600 mb-2">{car.model} &bull; {car.car_type}</div>
        <hr className="my-2" />
        <div className="grid grid-cols-2 gap-x-2 gap-y-4 text-sm text-gray-700">
          <div>
            <span className="font-medium">Тип привода:</span> {car.drive}
          </div>
          <div>
            <span className="font-medium">Мощность:</span> {car.hp} л.с.
          </div>
          <div>
            <span className="font-medium">Вес:</span> {car.weight} кг
          </div>
          <div>
            <span className="font-medium">Крутящий момент:</span> {car.torque} Нм
          </div>
          <div>
            <span className="font-medium">Отношение вес/мощность:</span> {car.w_kg}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button as={Link} href="/card" color="danger">Back</Button>
        </div>
      </div>
    </div>
  );
}