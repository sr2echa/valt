// Utilities for handling anon Aadhar data and mock validation
const { verifyAnonAadhar } = require('./anonAadharVerification');

async function sanitizeAadharNumber(aadharNumber) {
    // Placeholder for Aadhar number sanitization
    return aadharNumber.replace(/[^0-9]/g, '');
}

async function validateAndVerifyAadhar(aadharNumber, userDetails) {
    const sanitizedNumber = await sanitizeAadharNumber(aadharNumber);
    const verificationResult = await verifyAnonAadhar(sanitizedNumber, userDetails);
    return verificationResult;
}

module.exports = { validateAndVerifyAadhar };
