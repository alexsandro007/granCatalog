import { supabase } from '@/api/client'

export async function getCars(displayItems: number, page: number, sortKey: string = "default") {
  const from = displayItems * (page - 1);
  const to = from + displayItems - 1;
  let query = supabase
    .from('cars')
    .select('id, brand, price, model, car_type, img_url, drive, hp, weight, torque, w_kg')
    .range(from, to);

  switch (sortKey) {
    case "price-asc":
      query = query.order('price', { ascending: true });
      break;
    case "price-desc":
      query = query.order('price', { ascending: false });
      break;
    case "hp-asc":
      query = query.order('hp', { ascending: true });
      break;
    case "hp-desc":
      query = query.order('hp', { ascending: false });
      break;
    case "weight-asc":
      query = query.order('weight', { ascending: true }).not('weight', 'is', null); // without null values
      break;
    case "weight-desc":
      query = query.order('weight', { ascending: false }).not('weight', 'is', null); // without null values
      break;
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}