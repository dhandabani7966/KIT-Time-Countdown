// IndexedDB based image store for high-capacity local image storage
const DB_NAME = 'ieeextreme_display_db';
const STORE_NAME = 'custom_assets';
const DB_VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      resolve(null);
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveCustomImage(key, dataUrl) {
  try {
    const db = await openDB();
    if (db) {
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(dataUrl, key);
        req.onsuccess = () => resolve(true);
        req.onerror = () => reject(req.error);
      });
    } else {
      localStorage.setItem(`img_${key}`, dataUrl);
      return true;
    }
  } catch (err) {
    console.warn('Falling back to localStorage for image storage', err);
    try {
      localStorage.setItem(`img_${key}`, dataUrl);
      return true;
    } catch (e) {
      console.error('Storage quota exceeded', e);
      throw new Error('Image storage quota exceeded. Please choose a smaller image.');
    }
  }
}

export async function getCustomImage(key) {
  try {
    const db = await openDB();
    if (db) {
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      });
    } else {
      return localStorage.getItem(`img_${key}`) || null;
    }
  } catch {
    return localStorage.getItem(`img_${key}`) || null;
  }
}

export async function clearAllCustomImages() {
  try {
    const db = await openDB();
    if (db) {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).clear();
    }
    Object.keys(localStorage).forEach((k) => {
      if (k.startsWith('img_')) {
        localStorage.removeItem(k);
      }
    });
  } catch (err) {
    console.error('Error clearing images', err);
  }
}
