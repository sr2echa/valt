import { getFiles } from '../lib/gunOperations';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { walletId } = req.query;
  
  if (req.headers.authorization !== process.env.AUTH_TOKEN) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const files = await getFiles(walletId);
    res.status(200).json(files);
  } catch (error) {
    console.error("Failed to get files:", error);
    res.status(500).json({ error: 'Failed to get files' });
  }
}
