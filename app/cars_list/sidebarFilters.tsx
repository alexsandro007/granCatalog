import { CAR_BRANDS } from "../constants/carBrands";
import { CAR_TYPES } from "../constants/carTypes";
import { CAR_DRIVE_TRAINS } from "../constants/carDriveTrains";

import { useState } from "react";

import {CheckboxGroup, Checkbox} from "@heroui/checkbox";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/divider";
import {Slider} from "@heroui/slider";
import { Button } from "@heroui/button";
import {Chip} from "@heroui/chip";

export default function SidebarFilters() {
  const [search, setSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [selectedCarTypes, setSelectedCarTypes] = useState<string[]>([]);
  const [selectedCarDrivetrains, setSelectedCarDrivetrains] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const [value, setValue] = useState([0, 10]);

  // Числовые фильтры
  const [price, setPrice] = useState({ min: "", max: "" });
  const [weight, setWeight] = useState({ min: "", max: "" });
  const [power, setPower] = useState({ min: "", max: "" });
  const [torque, setTorque] = useState({ min: "", max: "" });

  const filteredBrands = CAR_BRANDS.filter(b =>
    b.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggle = (key: string) => {
    setSelectedBrands(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <aside className="min-w-[270px] max-w-[280px] bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6 border border-zinc-200">
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
        Filter By <span>🎯</span>
      </h2>

      {/* Выбранные фильтры */}
      {selectedFilters.length > 0 && (
        <div>
          <div className="flex items-center justify-between">
            <div className="font-semibold text-base mb-2">Selected Filters</div>
            <Button
              color="danger"
              radius="sm"
              size="sm"
              onClick={() => setSelectedFilters([])}
              className="mb-2"
            >
              Clear all
            </Button>
          </div>
          <Divider className="mb-2" />
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((filter) => (
              <Chip key={filter} color="primary" radius="sm" variant="solid" onClose={() => setSelectedFilters(prev => prev.filter(f => f !== filter))}>
                {filter.toUpperCase()}
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

        <div className="max-h-60 overflow-y-auto flex flex-col gap-2">
          <CheckboxGroup
            value={selectedFilters}
            onValueChange={setSelectedFilters}
          >
            {filteredBrands.map((brand) => (
              <Checkbox
                key={brand.key}
                value={brand.key}
                className="flex items-center gap-2"
              >
                {brand.label}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
      </div>

      {/* Фильтр по типу машины */}
      <div>
        <div className="font-semibold text-base mb-2">Car Type</div>
        <Divider className="mb-2" />

        <div className="flex flex-col gap-2">
          <CheckboxGroup
            value={selectedFilters}
            onValueChange={setSelectedFilters}
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
        {/* <p className="text-default-500 text-small">Selected: {selectedCarTypes.join(", ")}</p> */}
      </div>

      {/* Фильтр по типу привода */}
      <div>
        <div className="font-semibold text-base mb-2">Drivetrain</div>
        <Divider className="mb-2" />
        <div className="flex flex-col gap-2">
          <CheckboxGroup
            value={selectedFilters}
            onValueChange={setSelectedFilters}
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
        {/* <p className="text-default-500 text-small">Selected: {selectedCarDrivetrains.join(", ")}</p> */}
      </div>

      {/* Числовые фильтры */}
      <div>
        <div className="font-semibold text-base mb-2">Price range</div>

        <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center mb-2">
          <Slider
            className="max-w-md"
            formatOptions={{style: "currency", currency: "USD"}}
            label="Select price"
            maxValue={10}
            minValue={0}
            step={1}
            value={value}
            // onChange={setValue}
          />

          {/* <p className="text-default-500 font-medium text-small">
            Selected budget: {Array.isArray(value) && value.map((b) => `${b}`).join(" – ")}
          </p> */}
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

      {/* <Button className="w-full" color="primary">Apply</Button> */}
    </aside>
  );
}