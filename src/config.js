export const config = {
  cognito: {
    USER_POOL_ID: import.meta.env.VITE_COGNITO_USER_POOL_ID || '',
    APP_CLIENT_ID: import.meta.env.VITE_COGNITO_APP_CLIENT_ID || '',
    REGION: import.meta.env.VITE_COGNITO_REGION || 'us-east-1',
  },
  api: {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  }
};

