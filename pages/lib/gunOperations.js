import gun from '../contexts/GunContext';

export async function getPasswords(walletId) {
  return new Promise((resolve) => {
    gun.get(walletId).get('passwords').once(data => resolve(data));
  });
}

export async function getFiles(walletId) {
  return new Promise((resolve) => {
    gun.get(walletId).get('files').once(data => resolve(data));
  });
}

export function storeFile(walletId, filename, cids) {
  const fileNode = gun.get(walletId).get('files').get(filename);
  fileNode.put({ cids });
}

export function storePassword(walletId, identifier, password) {
  gun.get(walletId).get('passwords').get(identifier).put({ password });
}

