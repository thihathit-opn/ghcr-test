# Workflow Guide

### packaging-branches.yml

- Triggers on every `push`
- Pack all the branches as container images.
- Register them onto ghcr.io, of current repository.

### packaging-pull-requests.yml

- Triggers on every `pull_request` actions
- Pack all the pull-requests as container images.
- Register them onto ghcr.io, of current repository.
- These images are tagged as `{REPOSITORY}/pr:{PR_ID}`. [See detail](https://github.com/thihathit-opn/ghcr-test/pkgs/container/ghcr-test%2Fpr). So you can pull the image using the PR `#ID`.
