export interface Car {
  id: string;       // уникальный идентификатор
  brand: string;    // марка (например, BMW)
  model: string;    // модель (например, X5)
  car_type: string; // тип машины (например, SUV)
  img_url: string;  // ссылка на картинку
  price: number;    // цена
  drive: string;    // привод (например, полный)
  hp: number;       // мощность двигателя
  weight: number;   // вес машины
  torque: number;   // момент оборотов двигателя
  w_kg: string;     // расход топлива
}
