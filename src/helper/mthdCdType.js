export const mthdCdType = (value) => {
    const text = { 'ULS47.01': '대면', 'ULS47.02': '비대면', 'ULS47.03': '혼합' };

    return text[value];
};
