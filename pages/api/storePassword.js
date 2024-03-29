import { storePassword } from '../lib/gunOperations';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { walletId, identifier, password } = req.body;
  //check if auth token is same as that in .env

  if (req.headers.authorization !== process.env.AUTH_TOKEN) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  storePassword(walletId, identifier, password);
  res.status(200).json({ message: 'Password stored successfully' });
}
