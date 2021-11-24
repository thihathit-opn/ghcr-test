module.exports = {
  "dryRun": false,
  "branches": [
    {
      name: "master",
      prerelease: false
    },
    {
      name: "hotfix",
      prerelease: true
    }
  ]
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/github"
  ]
};
