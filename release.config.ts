/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: ["main", "next"], // 哪些 git 分支需要触发 semantic-release
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        releaseRules: [
          { type: "fix", release: "patch" },
          { type: "refactor", release: "patch" },
          { type: "perf", release: "patch" },
          { type: "chore", release: "patch" },
          { type: "feat", release: "minor" },
        ],
      },
    ],
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md",
      },
    ],
    [
      "@semantic-release/npm",
      {
        npmPublish: true,
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["dist"],
        message: "ci(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
    [
      "@semantic-release/github",
      {
        assets: ["dist"],
      },
    ],
  ],
};
