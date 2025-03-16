import { generateHelpLines } from "@/help";

describe("help", () => {
  it("应该生成帮助信息", () => {
    const liens = generateHelpLines();
    expect(liens).toMatchInlineSnapshot(`
      "
      Download github repo code only
      Useage:
        ghdl <url> [options]
      Example:
        ghdl vuejs/core -b vapor
        ghdl https://github.com/vuejs/core --cache
      Options:
        -h, --help            show help
        -c, --cache           cache download files
        -f, --force           force download ignore caches
        -b, --branch [branch] branch (default main)
      "
    `);
  });
});

