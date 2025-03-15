export function generateHelpLines() {
  const helpLines = [];
  const tab = "  ";
  const enter = "\n";

  // description
  helpLines.push(enter);
  helpLines.push("Download github repo code only");
  helpLines.push(enter);

  // usage
  helpLines.push("Useage:");
  helpLines.push(enter);
  helpLines.push(tab);
  helpLines.push("ghdl <url> [options]");
  helpLines.push(enter);

  // example
  helpLines.push("Example:");
  helpLines.push(enter);
  helpLines.push(tab);
  helpLines.push("ghdl vuejs/core -b vapor");
  helpLines.push(enter);
  helpLines.push(tab);
  helpLines.push("ghdl https://github.com/vuejs/core --cache");
  helpLines.push(enter);

  // options
  helpLines.push("Options:");
  helpLines.push(enter);
  const flagMap = {
    "-h, --help            ": "show help",
    "-c, --cache           ": "cache download files",
    "-b, --branch [branch] ": "branch (default main)",
  };
  for (const [flag, description] of Object.entries(flagMap)) {
    helpLines.push(tab);
    helpLines.push(flag);
    helpLines.push(description);
    helpLines.push(enter);
  }
  return helpLines.join("");
}

export function showHelp() {
  const helpInfomations = generateHelpLines();
  console.log(helpInfomations);
}
