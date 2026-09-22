# Contributing to Motoi

## Setup

```sh
bun install
```

This also installs the Git hooks (Husky) via the `prepare` script.

## Development

```sh
bunx nx dev @motoi/kata        # storybook / dev server
bunx nx test @motoi/kata       # unit tests
bunx nx lint @motoi/kata       # lint
bunx nx build @motoi/kata      # build the library
```

Run `bunx nx affected -t lint test typecheck build` to run all checks on what changed compared to `main`.

## Commit convention

This repository uses [Conventional Commits](https://www.conventionalcommits.org/), enforced by commitlint on every commit:

```
<type>(<scope>): <description>

feat(kata): add Button component
fix(kata): correct focus ring color
chore: update dependencies
```

Common types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `ci`.

The commit message directly drives versioning and the changelog (see [release-please-config.json](./release-please-config.json)), so accuracy matters.

## Pull requests

- Open your PR against `main`.
- CI (`.github/workflows/ci.yml`) runs lint, test, typecheck and build on every PR — it must pass before merging.
- Keep PRs scoped to a single change when possible; this keeps the generated changelog readable.

## Releasing

Releases are fully automated by [release-please](https://github.com/googleapis/release-please) once commits land on `main` — see the README for details. No manual publish step is needed.
