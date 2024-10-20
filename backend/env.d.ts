declare namespace NodeJS {
  interface ProcessEnv {
    HOST: string;
    PORT: string;
    DATABASE_URL: string;
    DEBUG_ORM: string;
  }
}
