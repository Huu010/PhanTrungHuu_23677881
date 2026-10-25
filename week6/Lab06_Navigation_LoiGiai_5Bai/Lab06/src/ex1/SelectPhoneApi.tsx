import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Phone } from '../types';
import { fetchPhone } from '../api/phoneApi';
import { Loading } from '../components/Loading';
import { ErrorBox } from '../components/ErrorBox';
import { SelectPhoneApp } from './SelectPhoneApp';
export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);
  const version = useRef(0);
  const load = useCallback(async () => {
    const request = ++version.current;
    setError(null); setPhone(null);
    try { const result = await fetchPhone('1'); if (request === version.current) setPhone(result); }
    catch (e) { if (request === version.current) setError(e instanceof Error ? e.message : 'Không tải được dữ liệu'); }
  }, []);
  useEffect(() => {
    // Hẹn lần tải đầu ở lượt sự kiện kế tiếp; hủy timer/kết quả khi rời bài.
    const counter = version;
    const timer = setTimeout(() => { void load(); }, 0);
    return () => { clearTimeout(timer); counter.current++; };
  }, [load]);
  if (error) return <ErrorBox message={error} onRetry={() => { void load(); }} />;
  if (!phone) return <Loading />;
  return <SelectPhoneApp phone={phone} />;
}
