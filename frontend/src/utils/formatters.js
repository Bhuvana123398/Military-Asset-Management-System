export const formatMovement = (value) => {
    if (value > 0) return `+${value}`;
    return value;
};

export const getFriendlyDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};