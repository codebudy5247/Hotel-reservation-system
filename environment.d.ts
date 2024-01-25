declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT: number;
      ORIGIN: string;
      DB_URL: string;
      REDIS_URL: string;
      ACCESS_TOKEN_EXPIRES_IN: number;
      REFRESH_TOKEN_EXPIRES_IN: number;
      ACCESS_TOKEN_PRIVATE_KEY: string;
      ACCESS_TOKEN_PUBLIC_KEY: string;
      REFRESH_TOKEN_PRIVATE_KEY: string;
      REFRESH_TOKEN_PUBLIC_KEY: string;
      STRIPE_SECRET_KEY: string;
      STRIPE_API_KEY: string;
      CLOUDINARY_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
    }
  }
}

export {};
