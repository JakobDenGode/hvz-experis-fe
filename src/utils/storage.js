const validateKey = (key) => {
  if (!key || typeof key !== "string") {
    throw new Error("Invalid storage key provided");
  }
};

export const storageSave = (key, value) => {
  validateKey(key);

  if (!value) {
    throw new Error("storageSave: No value provided for key:" + key);
  }

  localStorage.setItem(key, JSON.stringify(value));
};

export const storageRead = (key) => {
  validateKey(key);

  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }

  return null;
};

export const storageDelete = (key) => {
  validateKey(key);

  localStorage.removeItem(key);
};
