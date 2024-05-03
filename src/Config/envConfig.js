export const getBaseUrl = () => {
    return (process.env.NODE_ENV === 'production' ? 'https://example.com' : 'http://localhost:3003/api');
};
