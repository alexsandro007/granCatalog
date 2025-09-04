import { supabase } from '@/api/client'

// Получить одну машину по id
export async function getCarById(id: number) {
  const { data, error } = await supabase
    .from('cars')
    .select('id, brand, price, model, car_type, img_url, drive, hp, weight, torque, w_kg')
    .eq('id', id) // фильтруем по id
    .single();    // гарантируем, что вернётся один объект, а не массив

  if (error) throw error;
  return data;
}