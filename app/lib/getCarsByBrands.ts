import { supabase } from "@/api/client";

// Получить машины по бренду (или нескольким)
export async function getCarsByBrands(brands: string[]) {
  let query = supabase
    .from("cars")
    .select("id, brand, price, model, car_type, img_url, drive, hp, weight, torque, w_kg");

  if (brands.length > 0) {
    query = query.in("brand", brands); // фильтр по брендам
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}
