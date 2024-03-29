import { getPasswords } from '../lib/gunOperations';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { walletId } = req.query;
  
  if (req.headers.authorization !== process.env.AUTH_TOKEN) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const passwords = await getPasswords(walletId);
    res.status(200).json(passwords);
  } catch (error) {
    console.error("Failed to get passwords:", error);
    res.status(500).json({ error: 'Failed to get passwords' });
  }
}
