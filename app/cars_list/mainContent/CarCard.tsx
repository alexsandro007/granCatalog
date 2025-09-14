'use client';
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Car } from "@/types/Car";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <Card className="py-4 max-w-md mx-auto">
      <CardHeader className="pb-0 pt-0 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{car.brand}</h4>
        <small className="text-default-500 truncate max-w-xs block">
          {car.model.length > 38 ? car.model.slice(0, 35) + "..." : car.model}
        </small>
      </CardHeader>

      <CardBody className="overflow-visible py-2">
        <Image
          alt={car.brand}
          className="object-cover rounded-xl"
          src={car.img_url}
          width={260}
        />
      </CardBody>

      <CardFooter className="pb-0 pt-2 px-4 items-start cursor-pointer justify-between">
        <Button
          showAnchorIcon
          as={Link}
          color="primary"
          href={`/cars_list/${car.id}`}
          variant="flat"
          id={car.id}
        >
          Learn more
        </Button>
        <p className="text-default-500 mt-2 text-small">{car.price} CR</p>
      </CardFooter>
    </Card>
  );
}
