import { type ParsedArgs } from "./args";
import axios from "axios";
import fs from "node:fs";
import path from "node:path";
import stream from "node:stream/promises";

export function getDownloadUrl(options: ParsedArgs) {
  return `${options.url}/archive/refs/heads/${options.branch}.zip`;
}

export function getDownloadName(options: ParsedArgs) {
  return `${options.url.split("/").pop()}-${options.branch}.zip`;
}

export async function download(options: ParsedArgs) {
  const fileName = getDownloadName(options);
  const savePath = path.join(process.cwd(), fileName);
  const writer = fs.createWriteStream(savePath);
  const downloadUrl = getDownloadUrl(options);

  console.log(`Downloading ${downloadUrl}`);

  try {
    const response = await axios({
      url: downloadUrl,
      method: "GET",
      responseType: "stream",
    });
    await stream.pipeline(response.data, writer);
    return savePath;
  } catch (e) {
    fs.unlinkSync(savePath); // clear download failed file
    throw e;
  } finally {
    writer.close();
  }
}
