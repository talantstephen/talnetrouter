import fs from "node:fs";
import path from "path";
import os from "os";

const APP_NAME = "talnetrouter";
const LEGACY_APP_NAME = "9router";

function legacyDefaultDir() {
  if (process.platform === "win32") {
    return path.join(process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming"), LEGACY_APP_NAME);
  }
  return path.join(os.homedir(), `.${LEGACY_APP_NAME}`);
}

function defaultDir() {
  if (process.platform === "win32") {
    return path.join(process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming"), APP_NAME);
  }
  return path.join(os.homedir(), `.${APP_NAME}`);
}

function migrateLegacyDataDir() {
  try {
    const legacy = legacyDefaultDir();
    const current = defaultDir();
    if (legacy === current) return;
    if (fs.existsSync(current)) return;
    if (!fs.existsSync(legacy)) return;
    fs.mkdirSync(path.dirname(current), { recursive: true });
    const copyRecursive = (src, dest) => {
      fs.mkdirSync(dest, { recursive: true });
      for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const s = path.join(src, entry.name);
        const d = path.join(dest, entry.name);
        if (entry.isDirectory()) copyRecursive(s, d);
        else if (entry.isFile()) {
          try { fs.copyFileSync(s, d); } catch {}
        }
      }
    };
    copyRecursive(legacy, current);
    console.warn(`[DATA_DIR] Migrated legacy data from ${legacy} to ${current} (copy, original kept)`);
  } catch {}
}

export function getDataDir() {
  migrateLegacyDataDir();
  const configured = process.env.DATA_DIR;
  if (!configured) return defaultDir();

  // On Windows, ignore Unix-style absolute paths (e.g. /var/lib/...) that come
  // from a Linux-targeted .env or Docker config — they are not valid here.
  if (process.platform === "win32" && /^\//.test(configured)) {
    console.warn(`[DATA_DIR] '${configured}' is a Unix path on Windows → fallback to default`);
    return defaultDir();
  }

  try {
    fs.mkdirSync(configured, { recursive: true });
    return configured;
  } catch (e) {
    if (e?.code === "EACCES" || e?.code === "EPERM") {
      console.warn(`[DATA_DIR] '${configured}' not writable → fallback ~/.${APP_NAME}`);
      return defaultDir();
    }
    throw e;
  }
}

export const DATA_DIR = getDataDir();
