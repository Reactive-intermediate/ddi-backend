export const isProd = () => {
  return process.env.MODE === 'PROD';
};

export default () => ({
  isProduction: isProd(),
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY.split('\\n').join(`\n`),
  jwtPublicKey: process.env.JWT_PUBLIC_KEY.split('\\n').join(`\n`),
});
