import { useState } from "react";
import { CAR_BRANDS } from "../../constants/carBrands";
import { CAR_TYPES } from "../../constants/carTypes";
import { CAR_DRIVE_TRAINS } from "../../constants/carDriveTrains";
import { CheckboxGroup, Checkbox } from "@heroui/checkbox";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/divider";
import { Slider } from "@heroui/slider";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import {NumberInput} from "@heroui/number-input";
import { getCarsByFilters } from "../../lib/getCarsByFilters";
import RangeFilter from "./RangeFilter";

export default function SidebarFilters({
  itemsPerPage,
  currentPage,
  setCars,
  setTotalCars,
  filters,
  setFilters
}: {
  itemsPerPage: string;
  currentPage: number;
  setCars: (cars: any[]) => void;
  setTotalCars: (count: number) => void;
  filters: any;
  setFilters: (filters: any) => void;
}) {
  const [search, setSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>(filters.brands);
  const [selectedCarTypes, setSelectedCarTypes] = useState<string[]>(filters.carTypes);
  const [selectedCarDrivetrains, setSelectedCarDrivetrains] = useState<string[]>(filters.driveTrains);
  const [value, setValue] = useState([0, 10]);

  // Числовые фильтры
  const [price, setPrice] = useState({ min: "", max: "" });
  const [weight, setWeight] = useState({ min: "", max: "" });
  const [power, setPower] = useState({ min: "", max: "" });
  const [torque, setTorque] = useState({ min: "", max: "" });

  const filteredBrands = CAR_BRANDS.filter(b =>
    b.label.toLowerCase().includes(search.toLowerCase())
  );

  // Собираем все выбранные фильтры с лейблами
  const selectedLabels = [
    ...CAR_BRANDS.filter(b => selectedBrands.includes(b.key)).map(b => b.label),
    ...CAR_TYPES.filter(t => selectedCarTypes.includes(t.key)).map(t => t.label),
    ...CAR_DRIVE_TRAINS.filter(dt => selectedCarDrivetrains.includes(dt.key)).map(dt => dt.label),
  ];

  // Для снятия выбора фильтра по лейблу
  const handleRemoveFilter = (label: string) => {
    // Проверяем в каком массиве выбранных он есть и снимаем выбор
    const brand = CAR_BRANDS.find(b => b.label === label);
    if (brand && selectedBrands.includes(brand.key)) {
      setSelectedBrands(selectedBrands.filter(k => k !== brand.key));
      return;
    }
    const carType = CAR_TYPES.find(t => t.label === label);
    if (carType && selectedCarTypes.includes(carType.key)) {
      setSelectedCarTypes(selectedCarTypes.filter(k => k !== carType.key));
      return;
    }
    const dt = CAR_DRIVE_TRAINS.find(dt => dt.label === label);
    if (dt && selectedCarDrivetrains.includes(dt.key)) {
      setSelectedCarDrivetrains(selectedCarDrivetrains.filter(k => k !== dt.key));
      return;
    }
  };

  // Для снятия всех выбранных фильтров
  const handleClearAll = () => {
    setSelectedBrands([]);
    setSelectedCarTypes([]);
    setSelectedCarDrivetrains([]);
  };

  // Для применения выбранных фильтров
  const handleApply = () => {
    setFilters({
      brands: selectedBrands,
      carTypes: selectedCarTypes,
      driveTrains: selectedCarDrivetrains,
    });
  };

  return (
    <aside className="min-w-[270px] max-w-[280px] bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6 border border-zinc-200">
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
        Filter By <span>🎯</span>
      </h2>

      {/* Выбранные фильтры */}
      {selectedLabels.length > 0 && (
        <div>
          <div className="flex items-center justify-between">
            <div className="font-semibold text-base mb-2">Selected Filters</div>
            <Button
              color="primary"
              radius="sm"
              size="sm"
              onClick={handleClearAll}
              className="mb-2"
            >
              Clear all
            </Button>
          </div>
          <Divider className="mb-2" />
          <div className="flex flex-wrap gap-2">
            {selectedLabels.map((filter) => (
              <Chip
                key={filter}
                color="primary"
                variant="flat"
                radius="sm"
                onClose={() => handleRemoveFilter(filter)}
              >
                {filter}
              </Chip>
            ))}
          </div>
        </div>
      )}

      {/* Фильтр по бренду */}
      <div>
        <div className="font-semibold text-base mb-2">Car Brand</div>
        <Divider className="mb-2" />
        <Input
          placeholder="Search brand..."
          value={search}
          radius="sm"
          onChange={e => setSearch(e.target.value)}
          className="mb-2"
        />

        <div className="pl-1 max-h-60 overflow-y-auto flex flex-col gap-2">
          <CheckboxGroup
            value={selectedBrands}
            onValueChange={setSelectedBrands}
          >
            {filteredBrands.map((brand) => (
              <Checkbox
                key={brand.key}
                value={brand.key}
                className="flex items-center gap-2"
              >
                {brand.label}({brand.count})
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
      </div>

      {/* Фильтр по типу машины */}
      <div>
        <div className="font-semibold text-base mb-2">Car Type</div>
        <Divider className="mb-2" />

        <div className="pl-1 flex flex-col gap-2">
          <CheckboxGroup
            value={selectedCarTypes}
            onValueChange={setSelectedCarTypes}
          >
            {CAR_TYPES.map((carType) => (
              <Checkbox
                key={carType.key}
                value={carType.key}
                className="flex items-center gap-2"
              >
                {carType.label}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
      </div>

      {/* Фильтр по типу привода */}
      <div>
        <div className="font-semibold text-base mb-2">Drivetrain</div>
        <Divider className="mb-2" />

        <div className="pl-1 flex flex-col gap-2">
          <CheckboxGroup
            value={selectedCarDrivetrains}
            onValueChange={setSelectedCarDrivetrains}
          >
            {CAR_DRIVE_TRAINS.map((dt) => (
              <Checkbox
                key={dt.key}
                value={dt.key}
                className="flex items-center gap-2"
              >
                {dt.label}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
      </div>

      {/* Числовые фильтры */}
      <div>
        <div className="font-semibold text-base mb-2">Price range</div>

        <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center mb-2">
          <Slider
            className="max-w-md"
            formatOptions={{ style: "currency", currency: "USD" }}
            label="Select price"
            maxValue={10}
            minValue={0}
            step={1}
            value={value}
            // onChange={setValue}
          />
        </div>

        <div className="flex gap-2 mb-2">
          <Input
            placeholder="Min"
            type="number"
            value={price.min}
            onChange={e => setPrice(p => ({ ...p, min: e.target.value }))}
          />
          <Input
            placeholder="Max"
            type="number"
            value={price.max}
            onChange={e => setPrice(p => ({ ...p, max: e.target.value }))}
          />
        </div>
        <Divider className="mb-2" />

        {/* Фильтр по весу */}
        <div className="font-semibold text-base mb-2">Weight</div>
        <div className="flex gap-2 mb-2">
          <Input
            placeholder="Min"
            type="number"
            value={weight.min}
            onChange={e => setWeight(w => ({ ...w, min: e.target.value }))}
          />
          <Input
            placeholder="Max"
            type="number"
            value={weight.max}
            onChange={e => setWeight(w => ({ ...w, max: e.target.value }))}
          />
        </div>
        <Divider className="mb-2" />

        {/* Фильтр по мощности */}
        <div className="font-semibold text-base mb-2">Power (hp)</div>
        <div className="flex gap-2 mb-2">
          <Input
            placeholder="Min"
            type="number"
            value={power.min}
            onChange={e => setPower(w => ({ ...w, min: e.target.value }))}
          />
          <Input
            placeholder="Max"
            type="number"
            value={power.max}
            onChange={e => setPower(w => ({ ...w, max: e.target.value }))}
          />
        </div>
        <Divider className="mb-2" />

        {/* Фильтр по моменту оборота */}
        <div className="font-semibold text-base mb-2">Torque (Nm)</div>
        <div className="flex gap-2">
          <Input
            placeholder="Min"
            type="number"
            value={torque.min}
            onChange={e => setTorque(w => ({ ...w, min: e.target.value }))}
          />
          <Input
            placeholder="Max"
            type="number"
            value={torque.max}
            onChange={e => setTorque(w => ({ ...w, max: e.target.value }))}
          />
        </div>
      </div>













      <div className="flex flex-col gap-4">
        <div className="flex w-full flex-wrap  mb-6 md:mb-0 gap-4">
          <NumberInput
            label="Price"
            placeholder="0.00"
            minValue={5000}
            maxValue={20000000}
            defaultValue={5000}
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">CR</span>
              </div>
            }
          />
          <NumberInput
            label="Price"
            placeholder="0.00"
            minValue={5000}
            maxValue={20000000}
            defaultValue={20000000}
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">CR</span>
              </div>
            }
          />
        </div>
      </div>

      <RangeFilter
        label="Price"
        unit="CR"
        min={5000}
        max={20000000}
        step={1000}
        value={price}
        setValue={setPrice}
      />

      <RangeFilter
        label="Weight"
        unit="kg"
        min={500}
        max={3000}
        step={50}
        value={weight}
        setValue={setWeight}
      />

      <RangeFilter
        label="Power"
        unit="hp"
        min={50}
        max={2000}
        step={10}
        value={power}
        setValue={setPower}
      />

      <RangeFilter
        label="Torque"
        unit="Nm"
        min={50}
        max={2000}
        step={10}
        value={torque}
        setValue={setTorque}
      />

      <Button className="w-full" color="primary" onClick={handleApply}>Apply</Button>
    </aside>
  );
}