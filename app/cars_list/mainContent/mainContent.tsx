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

const TOTAL_CARS = 1270;

const MainContent = forwardRef<HTMLDivElement>((props, targetRef) => {
  const [cars, setCars] = useState<Car[]>([]);
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

  useEffect(() => {
    if (targetRef && typeof targetRef !== "function" && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage, targetRef]);

  if (!cars.length) return <LoadingSpinner />;

  return (
    <main ref={targetRef} className="flex-1 flex flex-col items-center gap-4">
      <Controls
        totalCars={TOTAL_CARS}
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
  )
});

export default MainContent