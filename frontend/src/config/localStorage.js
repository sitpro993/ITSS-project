

export const getLocalStorageItem = async (key) => {
  const value = await localStorage.getItem(key);
  return value;
}

export const setLocalStorageItem = async(key,value,)=> {
  await localStorage.setItem(key, value);
  window.dispatchEvent(new Event('storage'));
}

export const removeLocalStorageItem = async( key ) => {
  await localStorage.removeItem(key);
  window.dispatchEvent(new Event('storage'));
}

