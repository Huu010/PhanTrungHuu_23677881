import { PHONES, COLOR_ORDER } from '../data/phones';
import { Phone, ColorKey } from '../types';
export const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? '').trim().replace(/\/$/, '');
export const USING_API = API_URL !== '';
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const isColor = (v: unknown): v is ColorKey => typeof v === 'string' && COLOR_ORDER.includes(v as ColorKey);
// Kiểm tra JSON trước khi đưa vào giao diện để lỗi dữ liệu có thông báo rõ.
export function parsePhone(data: unknown): Phone {
  if (!data || typeof data !== 'object') throw new Error('API trả dữ liệu không hợp lệ');
  const p = data as Record<string, unknown>;
  for (const key of ['id', 'name', 'supplier', 'badge']) {
    if (typeof p[key] !== 'string') throw new Error(`API: ${key} phải là chuỗi`);
  }
  for (const key of ['price', 'oldPrice', 'rating', 'reviewCount']) {
    if (typeof p[key] !== 'number' || !Number.isFinite(p[key]) || (p[key] as number) < 0) throw new Error(`API: ${key} phải là số không âm`);
  }
  if (!Number.isInteger(p.rating) || (p.rating as number) > 5) throw new Error('API: rating phải là số nguyên từ 0 đến 5');
  if (!Array.isArray(p.colors) || !p.colors.length || !p.colors.every(isColor) || !isColor(p.defaultColor) || !p.colors.includes(p.defaultColor)) {
    throw new Error('API: colors/defaultColor không hợp lệ');
  }
  return p as unknown as Phone;
}
export async function fetchPhone(id: string): Promise<Phone> {
  if (!USING_API) {
    await sleep(600);
    const p = PHONES.find(x => x.id === id);
    if (!p) throw new Error('Không tìm thấy sản phẩm');
    return p;
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    // Nhận base URL cũ hoặc URL resource /phone, /phones; không nối resource hai lần.
    const resourceURL = /\/phones?$/.test(API_URL) ? API_URL : `${API_URL}/phones`;
    const res = await fetch(`${resourceURL}/${encodeURIComponent(id)}`, { signal: controller.signal });
    if (!res.ok) throw new Error(`Máy chủ trả về lỗi ${res.status}`);
    return parsePhone(await res.json());
  } catch (e) {
    if (controller.signal.aborted) throw new Error('Hết thời gian chờ API. Kiểm tra mạng rồi thử lại.');
    throw e;
  } finally { clearTimeout(timer); }
}
