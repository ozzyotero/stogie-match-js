import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  openaiApiKey: process.env.OPENAI_API_KEY!,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173'
};