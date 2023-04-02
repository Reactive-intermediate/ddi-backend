export const isProd = () => {
  return process.env.MODE === 'PROD';
};

export default () => ({
  isProduction: isProd(),
  port: parseInt(process.env.PORT, 10) || 3000,
});
