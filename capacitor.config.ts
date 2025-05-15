import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'NutriFácil',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0 // Splash nativo não aparece
    }
  }
};

export default config;