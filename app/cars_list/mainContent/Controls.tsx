'use client';
import { Select, SelectItem } from "@heroui/select";
import { PAGE_SIZE_OPTIONS } from "../../constants/pagination";
import { SORT_OPTIONS } from "../../constants/sortOptions";

interface ControlsProps {
  totalCars: number;
  itemsPerPage: string;
  sortCategory: Set<string>;
  setItemsPerPage: (value: string) => void;
  setCurrentPage: (value: number) => void;
  setSortCategory: (value: Set<string>) => void;
}

export default function Controls({
  totalCars,
  itemsPerPage,
  sortCategory,
  setItemsPerPage,
  setCurrentPage,
  setSortCategory
}: ControlsProps) {
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

  return (
    <div className="flex items-center gap-4 w-full">
      <p className="text-2xl mr-auto">Total items: {totalCars}</p>

      <Select
        className="max-w-xs"
        color="primary"
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
        color="primary"
        label="Sort by"
        selectedKeys={sortCategory}
        onSelectionChange={handleSortChange}
      >
        {SORT_OPTIONS.map(option => (
          <SelectItem key={option.key}>{option.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
