### packaging-branches.yml

- Triggers on every `push`
- Pack all the branches as container images.
- Register them onto ghcr.io, of current repository.

### packaging-pull-requests.yml

- Triggers on every `pull_request` actions
- Pack all the pull-requests as container images.
- Register them onto ghcr.io, of current repository.
- These images are tagged as `pr-{PR_ID}`.
