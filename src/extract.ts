import fs from "node:fs";
import path from "node:path";
import AdmZip from "adm-zip";

export function getTargetPath(filePath: string) {
  const targetPath = filePath.split("/").pop().split(".").shift();
  return path.join(".", targetPath);
}

export function extract(filePath: string) {
  const zip = new AdmZip(filePath);
  const targetPath = getTargetPath(filePath);

  if (fs.existsSync(targetPath)) {
    throw new Error(`${targetPath} already exists`);
  }

  fs.mkdirSync(targetPath, { recursive: true });
  zip.extractAllTo(".");
  fs.unlinkSync(filePath);
}
