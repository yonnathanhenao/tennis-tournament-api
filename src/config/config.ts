export interface ConfigProps {
  port: number;
  jwtSecret: string;
  mongodb: {
    connectionString: string;
  };
}

export function config() {
  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    jwtSecret: process.env.JWT_SECRET,
    mongodb: {
      connectionString: process.env.MONGODB_URL
    }
  };
}
