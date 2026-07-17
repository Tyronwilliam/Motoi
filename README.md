# Motoi

## `@motoi/kata` — Design system

`packages/kata` est le design system Motoi.

### Publier une nouvelle version

```sh
npm login
bunx nx release
```

`nx release` bump la version, génère le changelog, build la lib (`dist/`) et publie sur npm en une seule commande.

Pour vérifier ce qui va se passer sans rien publier :

```sh
bunx nx release --dry-run
```

### Utiliser `@motoi/kata` dans l'autre app

```sh
npm install @motoi/kata
# ou
bun add @motoi/kata
```

```tsx
import { MotoiKata } from '@motoi/kata';
```

`react` et `react-dom` (^19.0.0) sont déclarés en `peerDependencies` — l'app consommatrice doit déjà les avoir installés.

## Versioning and releasing

To version and release the library use

```
npx nx release
```

Pass `--dry-run` to see what would happen without actually releasing the library.
