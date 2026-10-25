import { ColorKey, Phone } from '../types';
export const PHONE_COLORS: Record<ColorKey, { label: string; hex: string; image: number }> = {
  silver: { label: 'bạc', hex: '#C9EEFA', image: require('../../assets/phones/silver.png') },
  red: { label: 'đỏ', hex: '#E53A2F', image: require('../../assets/phones/red.png') },
  black: { label: 'đen', hex: '#000000', image: require('../../assets/phones/black.png') },
  blue: { label: 'xanh', hex: '#2A4494', image: require('../../assets/phones/blue.png') },
};
export const COLOR_ORDER: ColorKey[] = ['silver', 'red', 'black', 'blue'];
const base = { oldPrice: 1790000, rating: 5, reviewCount: 828,
  supplier: 'Tiki Tradding', badge: 'Ở ĐÂU RẺ HƠN HOÀN TIỀN', colors: COLOR_ORDER, defaultColor: 'blue' as ColorKey };
// Joy 3 theo mẫu. Các sản phẩm bổ sung là dữ liệu học tập; không phải giá bán thực tế.
// ZIP chỉ có ảnh Joy 3: các sản phẩm bổ sung dùng lại ảnh này để minh họa.
export const PHONES: Phone[] = [
  { ...base, id: '1', name: 'Điện Thoại Vsmart Joy 3 - Hàng chính hãng', price: 1790000 },
  { ...base, id: '2', name: 'Điện Thoại Vsmart Live 4 - Hàng chính hãng', price: 3990000, oldPrice: 4490000 },
  { ...base, id: '3', name: 'Điện Thoại Vsmart Star 5 - Hàng chính hãng', price: 2290000, oldPrice: 2490000 },
  { ...base, id: '4', name: 'Điện Thoại Vsmart Active 3 - Hàng chính hãng', price: 3290000, oldPrice: 3590000 },
  { ...base, id: '5', name: 'Điện Thoại Vsmart Aris Pro - Hàng chính hãng', price: 6990000, oldPrice: 7490000 },
  { ...base, id: '6', name: 'Điện Thoại Vsmart Bee 3 - Hàng chính hãng', price: 1390000, oldPrice: 1590000 },
];
