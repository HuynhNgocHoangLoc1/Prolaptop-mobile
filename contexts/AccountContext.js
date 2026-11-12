import { createContext, useState, useEffect, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../repositories/axiosClient";

const AccountContext = createContext({});

// Phiên đăng nhập được lưu xuống máy (web: localStorage, điện thoại: bộ nhớ app)
// để reload trang / mở lại app không bị đăng xuất.
const STORAGE_KEY = "prolaptop.auth";

const applyToken = (token) => {
  if (token) {
    axiosClient.application.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosClient.application.defaults.headers.common["Authorization"];
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [account, setAccount] = useState(null);
  // false cho tới khi đọc xong phiên đã lưu; NavigationApp chờ cờ này rồi mới vẽ màn hình
  const [ready, setReady] = useState(false);

  // 1. Mở app: khôi phục phiên đã lưu
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!raw) return;
        const saved = JSON.parse(raw);
        if (saved?.token && saved?.account) {
          applyToken(saved.token);
          setToken(saved.token);
          setAccount(saved.account);
        }
      })
      .catch((e) => console.warn("Cannot restore session:", e))
      .finally(() => setReady(true));
  }, []);

  // 2. Token đổi: gắn hoặc gỡ header Authorization của axios
  useEffect(() => {
    applyToken(token);
  }, [token]);

  // 3. Đăng nhập / sửa hồ sơ / đăng xuất: ghi lại xuống máy
  useEffect(() => {
    if (!ready) return; // chưa khôi phục xong thì đừng ghi đè bằng giá trị rỗng
    if (token && account) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ token, account })).catch(() => {});
    } else {
      AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
    }
  }, [token, account, ready]);

  const logout = () => {
    setToken(null);
    setAccount(null);
  };

  const providerValue = useMemo(
    () => ({ token, setToken, account, setAccount, ready, logout }),
    [token, account, ready]
  );

  return (
    <AccountContext.Provider value={providerValue}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContext;
