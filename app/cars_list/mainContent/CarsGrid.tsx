'use client';
import CarCard from "./CarCard";
import { Car } from "@/types/Car";

interface CarsGridProps {
  cars: Car[];
}

export default function CarsGrid({ cars }: CarsGridProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {cars.map(car => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
