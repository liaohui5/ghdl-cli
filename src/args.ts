export interface ParsedArgs {
  url: string;
  branch?: string;
  cache?: boolean;
  force?: boolean;
}

export const defaultOptions = {
  branch: "main",
  cache: false,
};

export const isString = (value: unknown) => typeof value === "string";
export const GITHUB_DOMAIN = "https://github.com";

export function isGithubRepoUrl(url: string) {
  // https://github.com/user/repo
  if (!url.startsWith(GITHUB_DOMAIN)) {
    return false;
  }

  const repo = url.slice(GITHUB_DOMAIN.length + 1);
  return isRepoHomepage(repo);
}

export function isRepoHomepage(repo: string): boolean {
  // user/reop
  const items = repo.split("/");
  return items.length === 2 && items.every(isString);
}

export function parseArgs(args: Array<string> = []): ParsedArgs {
  const parsedOptions: ParsedArgs = {
    url: "",
    ...defaultOptions,
  };

  // handle url
  const [url, ...flags] = args;
  if (isGithubRepoUrl(url)) {
    parsedOptions.url = url;
  } else if (isRepoHomepage(url)) {
    parsedOptions.url = `${GITHUB_DOMAIN}/${url}`;
  } else {
    parsedOptions.url = "";
  }

  // handle flags
  for (let i = 0; i < flags.length; i++) {
    const option = flags[i];
    if (option === "-b" || option === "--branch") {
      const value = flags[i + 1] || defaultOptions.branch;
      parsedOptions.branch = value;
    }

    if (option === "-c" || option === "--cache") {
      parsedOptions.cache = true;
    }

    if (option === "-f" || option === "--force") {
      parsedOptions.force = true;
    }
  }

  return parsedOptions;
}
