import { supabase } from "@/api/client";

export async function getCarsByFilters(
  displayItems: number,
  page: number,
  brands: string[],
  car_types: string[],
  drive_trains: string[]
) {
  const from = displayItems * (page - 1);
  const to = from + displayItems - 1;

  let query = supabase
    .from("cars")
    .select("id, brand, price, model, car_type, img_url, drive, hp, weight, torque, w_kg", { count: "exact" })
    .range(from, to);

  if (brands.length > 0)
    query = query.in("brand", brands.map(el => el.replace("_", " ")));
  if (car_types.length > 0)
    query = query.in("car_type", car_types);
  if (drive_trains.length > 0)
    query = query.in("drive", drive_trains);

  const { data, count, error } = await query;
  if (error) throw error;
  return { data, count };
}