/**
 * JaipurRide — Native Bridge
 * Provides a unified abstraction over Capacitor native plugins and Web APIs.
 * When running inside Capacitor (Android), uses native plugins.
 * When running in a browser, gracefully falls back to Web APIs.
 */

// Detect if we're running in Capacitor
export function isNative() {
  return typeof window !== 'undefined' && 
         window.Capacitor && 
         window.Capacitor.isNativePlatform && 
         window.Capacitor.isNativePlatform();
}

/**
 * Get Capacitor plugin by name (returns undefined in browser)
 */
function getPlugin(name) {
  if (isNative() && window.Capacitor && window.Capacitor.Plugins) {
    return window.Capacitor.Plugins[name];
  }
  return undefined;
}

// ═══════════════════════════════════════
//  SPLASH SCREEN
// ═══════════════════════════════════════
export async function hideSplashScreen() {
  const SplashScreen = getPlugin('SplashScreen');
  if (SplashScreen) {
    try {
      await SplashScreen.hide({ fadeOutDuration: 300 });
    } catch (e) {
      console.warn('[NativeBridge] SplashScreen.hide failed:', e);
    }
  }
}

// ═══════════════════════════════════════
//  STATUS BAR
// ═══════════════════════════════════════
export async function setStatusBarStyle(isDark) {
  const StatusBar = getPlugin('StatusBar');
  if (StatusBar) {
    try {
      await StatusBar.setStyle({ style: isDark ? 'DARK' : 'LIGHT' });
      await StatusBar.setBackgroundColor({ 
        color: isDark ? '#0f172a' : '#1A1A2E' 
      });
    } catch (e) {
      console.warn('[NativeBridge] StatusBar update failed:', e);
    }
  }
}

// ═══════════════════════════════════════
//  GEOLOCATION
// ═══════════════════════════════════════
export async function checkLocationPermission() {
  const Geolocation = getPlugin('Geolocation');
  if (Geolocation) {
    try {
      const status = await Geolocation.checkPermissions();
      return status.location; // 'granted', 'denied', 'prompt'
    } catch (e) {
      console.warn('[NativeBridge] checkPermissions failed:', e);
      return 'prompt';
    }
  }
  // Browser fallback — check permissions API
  if (navigator.permissions) {
    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      return result.state; // 'granted', 'denied', 'prompt'
    } catch (e) {
      return 'prompt';
    }
  }
  return 'prompt';
}

export async function requestLocationPermission() {
  const Geolocation = getPlugin('Geolocation');
  if (Geolocation) {
    try {
      const result = await Geolocation.requestPermissions({ permissions: ['location'] });
      return result.location;
    } catch (e) {
      console.warn('[NativeBridge] requestPermissions failed:', e);
      return 'denied';
    }
  }
  // Browser: permission is requested implicitly by getCurrentPosition
  return 'granted';
}

export async function getCurrentPosition(options = {}) {
  const Geolocation = getPlugin('Geolocation');
  if (Geolocation) {
    try {
      return await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
        ...options,
      });
    } catch (e) {
      throw e;
    }
  }
  // Browser fallback
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({
        coords: {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          speed: pos.coords.speed,
          heading: pos.coords.heading,
        },
        timestamp: pos.timestamp,
      }),
      reject,
      { enableHighAccuracy: true, timeout: 10000, ...options }
    );
  });
}

export function watchPosition(callback, errorCallback, options = {}) {
  const Geolocation = getPlugin('Geolocation');
  if (Geolocation) {
    // Capacitor watchPosition returns a callback ID
    let callbackId = null;
    Geolocation.watchPosition(
      { enableHighAccuracy: true, timeout: 10000, ...options },
      (position, err) => {
        if (err) {
          if (errorCallback) errorCallback(err);
        } else if (position) {
          callback(position);
        }
      }
    ).then(id => { callbackId = id; });
    // Return an object that can be used to clear the watch
    return { 
      clear: () => {
        if (callbackId !== null) {
          Geolocation.clearWatch({ id: callbackId });
        }
      }
    };
  }
  // Browser fallback
  if (!navigator.geolocation) {
    if (errorCallback) errorCallback(new Error('Geolocation not supported'));
    return { clear: () => {} };
  }
  const watchId = navigator.geolocation.watchPosition(
    (pos) => callback({
      coords: {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
        speed: pos.coords.speed,
        heading: pos.coords.heading,
      },
      timestamp: pos.timestamp,
    }),
    errorCallback,
    { enableHighAccuracy: true, timeout: 10000, ...options }
  );
  return { clear: () => navigator.geolocation.clearWatch(watchId) };
}

// ═══════════════════════════════════════
//  NETWORK
// ═══════════════════════════════════════
export async function getNetworkStatus() {
  const Network = getPlugin('Network');
  if (Network) {
    try {
      return await Network.getStatus();
    } catch (e) {
      return { connected: navigator.onLine, connectionType: 'unknown' };
    }
  }
  return { connected: navigator.onLine, connectionType: 'unknown' };
}

export function onNetworkChange(callback) {
  const Network = getPlugin('Network');
  if (Network) {
    Network.addListener('networkStatusChange', callback);
    return;
  }
  // Browser fallback
  window.addEventListener('online', () => callback({ connected: true }));
  window.addEventListener('offline', () => callback({ connected: false }));
}

// ═══════════════════════════════════════
//  APP LIFECYCLE (Back Button)
// ═══════════════════════════════════════
export function onBackButton(callback) {
  const App = getPlugin('App');
  if (App) {
    App.addListener('backButton', callback);
  }
}

export function onAppStateChange(callback) {
  const App = getPlugin('App');
  if (App) {
    App.addListener('appStateChange', callback);
  }
}

export async function exitApp() {
  const App = getPlugin('App');
  if (App) {
    try {
      await App.exitApp();
    } catch (e) {
      console.warn('[NativeBridge] exitApp failed:', e);
    }
  }
}

// ═══════════════════════════════════════
//  SHARE
// ═══════════════════════════════════════
export async function share(options) {
  const Share = getPlugin('Share');
  if (Share) {
    try {
      return await Share.share(options);
    } catch (e) {
      console.warn('[NativeBridge] Share failed:', e);
    }
  }
  // Browser fallback
  if (navigator.share) {
    try {
      await navigator.share(options);
    } catch (e) {
      // User cancelled or not supported
    }
  }
}

// ═══════════════════════════════════════
//  HAPTICS
// ═══════════════════════════════════════
export async function hapticImpact(style = 'Medium') {
  const Haptics = getPlugin('Haptics');
  if (Haptics) {
    try {
      await Haptics.impact({ style });
    } catch (e) {
      // Silently fail
    }
  } else if (navigator.vibrate) {
    navigator.vibrate(style === 'Heavy' ? 50 : style === 'Light' ? 10 : 25);
  }
}

// ═══════════════════════════════════════
//  DEVICE
// ═══════════════════════════════════════
export async function getDeviceInfo() {
  const Device = getPlugin('Device');
  if (Device) {
    try {
      return await Device.getInfo();
    } catch (e) {
      return null;
    }
  }
  return null;
}

// ═══════════════════════════════════════
//  KEYBOARD
// ═══════════════════════════════════════
export function onKeyboardShow(callback) {
  const Keyboard = getPlugin('Keyboard');
  if (Keyboard) {
    Keyboard.addListener('keyboardWillShow', callback);
  }
}

export function onKeyboardHide(callback) {
  const Keyboard = getPlugin('Keyboard');
  if (Keyboard) {
    Keyboard.addListener('keyboardWillHide', callback);
  }
}

// ═══════════════════════════════════════
//  APP SETTINGS
// ═══════════════════════════════════════
export async function openAppSettings() {
  if (isNative() && window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.NativeSettings) {
    try {
      await window.Capacitor.Plugins.NativeSettings.openAppSettings();
    } catch (e) {
      console.warn('[NativeBridge] openAppSettings failed:', e);
    }
  } else {
    console.log('[NativeBridge] openAppSettings fallback: please open settings manually.');
  }
}
