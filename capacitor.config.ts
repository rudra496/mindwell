type CapacitorConfig = {
  appId: string
  appName: string
  webDir: string
  server?: {
    url?: string
    cleartext?: boolean
    androidScheme?: string
    allowNavigation?: string[]
  }
  android?: {
    allowMixedContent?: boolean
    captureInput?: boolean
    webContentsDebuggingEnabled?: boolean
  }
  plugins?: Record<string, Record<string, unknown>>
}

const config: CapacitorConfig = {
  appId: 'org.mindwell.app',
  appName: 'MindWell',
  webDir: '.next',
  server: {
    url: 'https://mindwell-navy.vercel.app',
    cleartext: false,
    androidScheme: 'https',
    allowNavigation: [
      'mindwell-navy.vercel.app',
      '*.vercel.app',
    ],
  },
  android: {
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 800,
      backgroundColor: '#0d9488',
      showSpinner: false,
      androidSpinnerStyle: 'small',
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0d9488',
      overlaysWebView: false,
    },
  },
}

export default config
