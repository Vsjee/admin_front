export const setLocalStorage = <T>(key: string, value: T): void => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string): string | any => {
  const data = localStorage.getItem(key);
  return data !== null ? JSON.parse(data) : null;
};

export const removeLocalStorage = (key: string): void => {
  return localStorage.removeItem(key);
};

export const clearLocalStorage = (): void => {
  return localStorage.clear();
};
