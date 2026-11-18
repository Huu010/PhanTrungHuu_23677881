import { api } from "../api/client";
import { User } from "../types";

// API giả lập có thể trả kèm password; không đưa trường này vào Redux.
export async function updateProfile(id: number, data: Pick<User, "name" | "phone">): Promise<User> {
  const res = await api.patch<User & { password?: string }>(`/users/${id}`, data);
  const { password: _ignoredPassword, ...safeUser } = res.data;
  return safeUser;
}
