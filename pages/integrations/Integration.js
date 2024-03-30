const Arweave = require('arweave');
const { JWKInterface } = require('arweave/node/lib/wallet');

// Initialize Arweave
const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
});

// Function to upload a file to Arweave
async function uploadFileToArweave(fileBuffer, fileName, walletJWK) {
    const transaction = await arweave.createTransaction({
        data: fileBuffer,
    }, walletJWK);

    transaction.addTag('Content-Type', 'application/octet-stream');
    transaction.addTag('File-Name', fileName);

    await arweave.transactions.sign(transaction, walletJWK);
    const response = await arweave.transactions.post(transaction);

    return response.status === 200 ? transaction.id : null;
}

module.exports = { uploadFileToArweave };
