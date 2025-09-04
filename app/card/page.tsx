'use client';
import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { getCars } from "../lib/getCars";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Pagination } from "@heroui/pagination";
import { Select, SelectItem } from "@heroui/select";
import { PAGE_SIZE_OPTIONS } from "../constants/pagination";
import {Spinner} from "@heroui/spinner";
import SidebarFilters from "./sidebarFilters";
import { SORT_OPTIONS } from "../constants/sortOptions";

const TOTAL_CARS = 1270;

export default function CardPage() {
  const [cars, setCars] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(PAGE_SIZE_OPTIONS[0].toString());
  const [sortCategory, setSortCategory] = useState(new Set([SORT_OPTIONS[0].key]));

  const numPages = Math.ceil(TOTAL_CARS / Number(itemsPerPage));

  useEffect(() => {
    const sortKey = sortCategory instanceof Set ? Array.from(sortCategory)[0] : String(sortCategory);

    getCars(Number(itemsPerPage), currentPage, sortKey)
      .then(setCars)
      .catch(console.error);
  }, [currentPage, itemsPerPage, sortCategory]);

  const handleSelectChange = (keys: any) => {
    const value = keys instanceof Set ? Array.from(keys)[0] : String(keys);
    if (value === itemsPerPage || !Number(value)) return;
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const handleSortChange = (keys: any) => {
    const value = keys instanceof Set ? Array.from(keys)[0] : String(keys);
    if (value === sortCategory || !value) return;
    setSortCategory(new Set([value]));
  };

  if (!cars.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <Spinner color="primary" variant="wave" label="Loading..." />
      </div>
    );
  }

  return (
    <div className="flex gap-8 items-start w-full max-w-[1400px] mx-auto px-2">
      <SidebarFilters />
      
      <main className="flex-1 flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex items-center gap-4 w-full">
          <p className="text-2xl mr-auto">Total items: {TOTAL_CARS}</p>

          <Select
            className="max-w-xs"
            label="Items per page"
            selectedKeys={new Set([itemsPerPage])}
            onSelectionChange={handleSelectChange}
          >
            {PAGE_SIZE_OPTIONS.map(size => (
              <SelectItem key={size.toString()} textValue={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </Select>

          <Select
            className="max-w-xs"
            label="Sort by:"
            selectedKeys={sortCategory}
            onSelectionChange={handleSortChange}
            placeholder="Select an option"
          >
            {SORT_OPTIONS.map(option => (
              <SelectItem key={option.key} textValue={option.label}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          {cars.map((car) => (
            <Card key={car.id} className="py-4 max-w-md mx-auto">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
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
                  width={270}
                />
              </CardBody>
              <CardFooter className="pb-0 pt-2 px-4 items-start cursor-pointer justify-between">
                <Button
                  showAnchorIcon
                  as={Link}
                  color="primary"
                  href={`/card/${car.id}`}
                  variant="solid"
                  id={car.id}
                >
                  Learn more
                </Button>
                <p className="text-default-500 mt-2 text-small">{car.price} CR</p>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Pagination
          showControls
          page={currentPage}
          total={numPages}
          onChange={setCurrentPage}
        />
      </main>
    </div>
  );
}