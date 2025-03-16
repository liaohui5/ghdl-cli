import { type ParsedArgs } from "./args";
import axios from "axios";
import fs from "node:fs";
import path from "node:path";
import stream from "node:stream/promises";

export const CACHE_PATH = path.join(process.env.HOME, ".cache", "ghdl-cli-caches");

export function getDownloadUrl(options: ParsedArgs) {
  return `${options.url}/archive/refs/heads/${options.branch}.zip`;
}

export function getDownloadName(options: ParsedArgs) {
  return `${options.url.split("/").pop()}-${options.branch}.zip`;
}

export function initCacheDir() {
  if (!fs.existsSync(CACHE_PATH)) {
    fs.mkdirSync(CACHE_PATH, { recursive: true });
  }
}

export function hasCache(fileName: string) {
  return fs.existsSync(getCachePath(fileName));
}

export function getCachePath(fileName: string) {
  return path.join(CACHE_PATH, fileName);
}

export function clearCache(options: ParsedArgs, fileName: string) {
  if (!options.cache || options.force) {
    hasCache(fileName) && fs.unlinkSync(getCachePath(fileName));
  }
}

export async function download(options: ParsedArgs) {
  initCacheDir();
  const fileName = getDownloadName(options);
  const filePath = getCachePath(fileName);
  if (options.cache && hasCache(fileName)) {
    return filePath;
  }

  const writer = fs.createWriteStream(filePath);
  const downloadUrl = getDownloadUrl(options);

  console.log(`Downloading ${downloadUrl}`);

  try {
    const response = await axios({
      url: downloadUrl,
      method: "GET",
      responseType: "stream",
    });
    await stream.pipeline(response.data, writer);
    return filePath;
  } catch (e) {
    fs.unlinkSync(filePath); // clear download failed file
    throw e;
  } finally {
    writer.close();
  }
}
