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
  webDir: 'out',
  server: {
    url: 'https://rudra496.github.io/mindwell',
    cleartext: false,
    androidScheme: 'https',
    allowNavigation: [
      'rudra496.github.io',
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
