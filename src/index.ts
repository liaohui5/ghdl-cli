import { parseArgs } from "./args";
import { download } from "./download";
import { extract } from "./extract";
import { showHelp } from "./help";

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    showHelp();
    return;
  }

  const options = parseArgs(args);
  if (options.url === "") {
    showHelp();
    return;
  }

  const downloadFile = await download(options);
  extract(downloadFile);
}

(async () => await main())();
