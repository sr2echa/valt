import gun from '../contexts/GunContext';

function getPasswords(hash) {
    return new Promise((resolve, reject) => {
        const walletNode = gun.get('valts').get(hash);
        walletNode.get('passwords').once((passwords) => {
            if (passwords && Object.keys(passwords).length > 0) {
                const cleanPasswords = {};
                const keys = Object.keys(passwords).filter(key => key !== '_');
                let count = 0;
                keys.forEach(key => {
                    walletNode.get('passwords').get(key).once(password => {
                        cleanPasswords[key] = password;
                        count++;
                        if (count === keys.length) {
                            resolve(cleanPasswords);
                        }
                    });
                });
            } else {
                reject(new Error('No passwords found'));
            }
        });
    });
}

export default async function handler(req, res) {
    const { hash } = req.query;
    if (req.method === 'GET') {
        
        if (!req.headers.authorization || req.headers.authorization !== process.env.AUTH_TOKEN) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        
        try {
            const passwords = await getPasswords(hash);
            let newPasswords = {};
            Object.keys(passwords).forEach(key => {
                newPasswords[key] = passwords[key].password;
            });
            res.status(200).json(newPasswords);
        } catch (error) {
            console.log('Error:', error.message);
            res.status(404).json({ message: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
