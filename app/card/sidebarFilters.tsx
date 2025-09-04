import { useState } from "react";
import { Checkbox } from "@heroui/checkbox";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/divider";
import { CAR_BRANDS } from "../constants/carBrands";

export default function SidebarFilters() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filteredBrands = CAR_BRANDS.filter(b =>
    b.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggle = (key: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <aside className="sticky top-8 min-w-[270px] max-w-[320px] bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6 border border-zinc-200">
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
        Filter By <span>🎯</span>
      </h2>

      <div>
        <div className="font-semibold text-base mb-2">Car Brand</div>

        <Input
          placeholder="Search brand..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mb-2"
        />

        <Divider className="mb-2" />
        
        <div className="max-h-60 overflow-y-auto flex flex-col gap-2">
          {filteredBrands.map((brand) => (
            <Checkbox
              key={brand.key}
              isSelected={selected.has(brand.key)}
              onChange={() => handleToggle(brand.key)}
              className="flex items-center gap-2"
            >
              <span>{brand.label} <span className="text-zinc-400">({brand.count})</span></span>
            </Checkbox>
          ))}
        </div>
      </div>
    </aside>
  );
}