const validateRow = (row) => {
    if (!row['Author Name'] || typeof row['Author Name'] !== 'string') {
        return 'Invalid Author Name';
    }
    if (!row['Email'] || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row['Email'])) {
        return 'Invalid Email';
    }
    if (!row['ISBN Code'] || isNaN(row['ISBN Code'])) {
        return 'Invalid ISBN Code';
    }
    return null;
};

module.exports = validateRow;
