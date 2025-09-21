'use client';
import { useEffect, useState, useRef } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { getCars } from "../lib/getCars";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Pagination } from "@heroui/pagination";
import { Select, SelectItem } from "@heroui/select";
import { PAGE_SIZE_OPTIONS } from "../constants/pagination";
import {Spinner} from "@heroui/spinner";
import SidebarFilters from "./sidebarFilters/sidebarFilters";
import { SORT_OPTIONS } from "../constants/sortOptions";

import MainContent from "./mainContent/mainContent";
import ScrollToTopButton from "./ScrollToTopButton";

const TOTAL_CARS = 1270;

export default function CarList() {
  const mainContentRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4 pb-8 md:pb-10">
        <h1 className="text-8xl font-bold text-gray-500 mb-4">Find your car <span className="inline-block animate-bounce">→</span></h1>
        <Image
          alt="HeroUI hero Image"
          src="https://gamemag.ru/images/cache/News/News111784/a7f4e8a6e1-2_1390x600.jpg"
          width={1000}
        />
      </div>

      <MainContent ref={mainContentRef} />

      <ScrollToTopButton targetRef={mainContentRef} />
    </div>
  );
}