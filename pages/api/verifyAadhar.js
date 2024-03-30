import { validateAndVerifyAadhar } from '../../integrations/aadharUtils';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Only allow POST requests
    }

    const { aadharNumber, userDetails } = req.body;
    try {
        const result = await validateAndVerifyAadhar(aadharNumber, userDetails);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Aadhar Verification Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
