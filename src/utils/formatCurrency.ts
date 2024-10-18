export const formatCurrency = (value: number): string => {
    return `$${value.toLocaleString('en-US')}`;
};
