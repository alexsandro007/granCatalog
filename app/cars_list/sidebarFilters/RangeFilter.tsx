import { Slider } from "@heroui/slider";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/divider";

interface RangeFilterProps {
  label: string;
  unit?: string;
  min: number;
  max: number;
  step?: number;
  value: { min: string; max: string };
  setValue: (val: { min: string; max: string }) => void;
}

export default function RangeFilter({
  label,
  unit,
  min,
  max,
  step = 1,
  value,
  setValue,
}: RangeFilterProps) {
  return (
    <div className="mb-4">
      <div className="font-semibold text-base mb-2">{label}</div>
      <Slider
        minValue={min}
        maxValue={max}
        step={step}
        value={[Number(value.min) || min, Number(value.max) || max]}
        onChange={(val) => {
          const range = val as number[];
          setValue({ min: String(range[0]), max: String(range[1]) });
        }}
        className="mb-2"
      />
      <div className="flex gap-2">
        <Input
          placeholder="Min"
          type="number"
          value={value.min}
          onChange={(e) => setValue({ ...value, min: e.target.value })}
          endContent={unit}
        />
        <Input
          placeholder="Max"
          type="number"
          value={value.max}
          onChange={(e) => setValue({ ...value, max: e.target.value })}
          endContent={unit}
        />
      </div>
      <Divider className="mt-3" />
    </div>
  );
}
