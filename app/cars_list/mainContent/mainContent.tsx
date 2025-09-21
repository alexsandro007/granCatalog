'use client';
import { useEffect, useState, forwardRef } from "react";
import { PAGE_SIZE_OPTIONS } from "../../constants/pagination";
import { SORT_OPTIONS } from "../../constants/sortOptions";
import { getCars } from "../../lib/getCars";

import Controls from "./Controls";
import CarsGrid from "./CarsGrid";
import LoadingSpinner from "./LoadingSpinner";
import { Pagination } from "@heroui/pagination";
import { Car } from "@/types/Car";
import SidebarFilters from "../sidebarFilters/sidebarFilters";
import { getCarsByFilters } from "@/app/lib/getCarsByFilters";

const TOTAL_CARS = 1270;

const MainContent = forwardRef<HTMLDivElement>((props, targetRef) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [totalCars, setTotalCars] = useState(TOTAL_CARS);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(PAGE_SIZE_OPTIONS[0].toString());
  const [sortCategory, setSortCategory] = useState(new Set([SORT_OPTIONS[0].key]));

  const [filters, setFilters] = useState({
    brands: [] as string[],
    carTypes: [] as string[],
    driveTrains: [] as string[]
  });

  const numPages = Math.ceil(totalCars / Number(itemsPerPage));

  useEffect(() => {
    const sortKey = sortCategory instanceof Set ? Array.from(sortCategory)[0] : String(sortCategory);

    const hasFilters = filters.brands.length || filters.carTypes.length || filters.driveTrains.length;

    if (hasFilters) {
      getCarsByFilters(Number(itemsPerPage), currentPage, filters.brands, filters.carTypes, filters.driveTrains)
        .then(({ data, count }) => {
          setCars(data);
          setTotalCars(count ?? 0);
        })
        .catch(console.error);
    } else {
      getCars(Number(itemsPerPage), currentPage, sortKey)
        .then(setCars)
        .catch(console.error);
    }
  }, [currentPage, itemsPerPage, sortCategory, filters]);

  useEffect(() => {
    if (targetRef && typeof targetRef !== "function" && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage, targetRef, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage, sortCategory]);

  if (!cars.length) return <LoadingSpinner />;

  return (
    <div className="flex gap-8 items-start w-full max-w-[1400px] mx-auto px-2 py-8 md:py-10">
      <SidebarFilters
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCars={setCars}
        setTotalCars={setTotalCars}
        filters={filters}
        setFilters={setFilters}
      />

      <main ref={targetRef} className="flex-1 flex flex-col items-center gap-4">
        <Controls
          totalCars={totalCars}
          itemsPerPage={itemsPerPage}
          sortCategory={sortCategory}
          setItemsPerPage={setItemsPerPage}
          setCurrentPage={setCurrentPage}
          setSortCategory={setSortCategory}
        />

        <CarsGrid cars={cars} />

        <Pagination
          showControls
          page={currentPage}
          total={numPages}
          onChange={setCurrentPage}
          className="mt-1"
        />
      </main>
    </div>
  )
});

export default MainContent