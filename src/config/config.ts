export const config = () => ({
  port: Number(process.env.HTTP_PORT),
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  },
  mailProvider: {
    system: {
      name: 'Nest Clean Demo API',
      email: 'system@email.com',
    },
  },
});
