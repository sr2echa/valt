import gun from '../contexts/GunContext';

function deleteEntry(hash, entryType, entryKey, callback) {
    const hashNode = gun.get('valts').get(hash);
    const entryNode = hashNode.get(entryType).get(entryKey);

    // Delete the entry
    entryNode.put(null, (ack) => {
        if (ack.err) {
            console.error(`Error deleting ${entryKey} from ${entryType} of hash ${hash}:`, ack.err);
            callback(false);
        } else {
            console.log(`${entryKey} deleted from ${entryType} of hash ${hash}`);

            // Check if the entry still exists after deletion
            entryNode.once((data, key) => {
                // If the entry exists (data is not null), deletion failed
                if (data) {
                    console.error(`Deletion of ${entryKey} from ${entryType} of hash ${hash} failed.`);
                    callback(false);
                } else {
                    console.log(`Deletion of ${entryKey} from ${entryType} of hash ${hash} successful.`);
                    callback(true);
                }
            });
        }
    });
}

export default function handler(req, res) {
    if (req.method === 'DELETE') {

        if (!req.headers.authorization || req.headers.authorization !== process.env.AUTH_TOKEN) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const { hash, entryType, entryKey } = req.body;
        deleteEntry(hash, entryType, entryKey, (result) => {
            if (result) {
                res.status(200).json({ message: 'Entry deleted successfully' });
            } else {
                res.status(404).json({ message: 'Entry not deleted' });
            }
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
