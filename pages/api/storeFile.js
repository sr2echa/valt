import { storeFile } from '../lib/gunOperations';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { walletId, filename, cids } = req.body;
  if (req.headers.authorization !== process.env.AUTH_TOKEN) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  storeFile(walletId, filename, cids);
  res.status(200).json({ message: 'File stored successfully' });
}
