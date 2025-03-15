import { isGithubRepoUrl, isRepoHomepage, parseArgs } from "@/args";
import { describe, it, expect } from "vitest";

describe("parseArgs", () => {
  it("是否符合GitHub代码仓库主页url格式", () => {
    expect(isGithubRepoUrl("https://github.com/user/repo")).toBe(true);
    expect(isGithubRepoUrl("https://github.com/user/repo/tree/main")).toBe(
      false,
    );
  });

  it("是否符合GitHub代码仓库仓库 url 短格式", () => {
    expect(isRepoHomepage("user/repo")).toBe(true);
    expect(isRepoHomepage("user/repo/tree")).toBe(false);
  });

  it("应该将参数解析为一个对象", () => {
    const parsed = parseArgs([""]);
    expect(parsed).toEqual({
      url: "",
      branch: "main",
      cache: false,
    });
  });

  it("应该将第一个参数解析为 url 字段", () => {
    const parsed = parseArgs(["user/repo"]);
    expect(parsed).toEqual({
      url: "https://github.com/user/repo",
      branch: "main",
      cache: false,
    });
  });

  it("应该将 -b, --branch 解析为 branch 字段", () => {
    // -b dev
    const parsed = parseArgs(["", "-b", "dev"]);
    expect(parsed).toEqual({
      url: "",
      branch: "dev",
      cache: false,
    });

    // -b
    const parsed3 = parseArgs(["", "-b"]);
    expect(parsed3).toEqual({
      url: "",
      branch: "main", // not value, use default value
      cache: false,
    });

    // --branch fix
    const parsed4 = parseArgs(["", "--branch", "fix"]);
    expect(parsed4).toEqual({
      url: "",
      branch: "fix",
      cache: false,
    });

    // --branch
    const parsed5 = parseArgs(["", "--branch"]);
    expect(parsed5).toEqual({
      url: "",
      branch: "main", // no value, use default value
      cache: false,
    });
  });

  it("应该将 -c, --cache 解析为 cache 字段", () => {
    const parsed = parseArgs(["", "-c"]);
    expect(parsed).toEqual({
      url: "",
      branch: "main",
      cache: true,
    });

    const parsed2 = parseArgs(["", "--cache"]);
    expect(parsed2).toEqual({
      url: "",
      branch: "main",
      cache: true,
    });
  });
});
