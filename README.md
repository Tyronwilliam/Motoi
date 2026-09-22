# Motoi

## `@motoi/kata` — Design system

`packages/kata` is the Motoi design system.

### Releasing a new version

Versioning, changelog and npm publishing are handled by **release-please**, automated in CI (`.github/workflows/release-please.yml`):

1. Every commit on `main` following the [Conventional Commits](https://www.conventionalcommits.org/) convention (`feat(kata): ...`, `fix(kata): ...`) is analyzed.
2. release-please keeps a **release PR** up to date (version bump + `CHANGELOG.md`).
3. Merging that PR automatically triggers: Git tag, GitHub Release, build (`nx build kata`) and `npm publish`.

Nothing to do manually — no `npm login`, no command to run locally.

**Current versioning phase** (`release-please-config.json`): while `@motoi/kata` is in `0.0.x`, both `feat` and `fix` only bump the patch (`Z`), and a breaking change stays on `0.x` (no accidental jump to `1.0.0`). These rules will be relaxed progressively (`feat` → minor, then a manual move to `1.0.0`) as the design system stabilizes.

### Using `@motoi/kata` in another app

```sh
npm install @motoi/kata
# or
bun add @motoi/kata
```

```tsx
import { MotoiKata } from '@motoi/kata';
```

`react` and `react-dom` (^19.0.0) are declared as `peerDependencies` — the consuming app must already have them installed.
