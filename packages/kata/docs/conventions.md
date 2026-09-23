# Conventions de code — @motoi/kata

Règles décidées au fil du développement, à appliquer systématiquement dans ce package.

## Pas de déclarations `function`

Toujours des const arrow functions, jamais `function foo() {}`.

```ts
// ❌
export function objectKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

// ✅
export const objectKeys = <T extends object>(obj: T): (keyof T)[] => {
  return Object.keys(obj) as (keyof T)[];
};
```

S'applique partout : fonctions utilitaires (`lib/`), composants React, helpers de story Storybook.

## Un fichier par domaine, pas un fichier fourre-tout

Quand plusieurs concepts partagent un même sujet (ex. couleurs) mais ont des responsabilités différentes, ils vivent dans des fichiers séparés au sein d'un même dossier plutôt que dans un seul fichier qui mélange tout.

```
src/lib/colors/
├── index.ts        # barrel — @/lib/colors
├── tokens.ts        # source de vérité : ColorToken, BG, BORDER, RING
├── typography.ts     # couleur du texte uniquement : TEXT, FOREGROUND_TEXT, Typography
└── status.ts         # whitelist métier Status + son mapping vers ColorToken
```

`tokens.ts` ne dépend de rien, `typography.ts` dépend de `tokens.ts`, `status.ts` dépend des deux — jamais de dépendance circulaire. Un seul point d'entrée pour les consommateurs : le barrel `index.ts`.

## Whitelist publique : `Extract` si les noms matchent, table de correspondance sinon

Un type public exposé aux utilisateurs du design system (`Typography`, `Status`, ...) est une whitelist des valeurs autorisées. Deux cas :

**Les noms publics sont déjà des `ColorToken` valides** → dériver avec `Extract`, pas de table de mapping (évite l'indirection inutile et reste synchronisé si `ColorToken` change) :

```ts
export type Typography = Extract<
  ColorToken,
  'primary' | 'secondary' | 'muted' | 'destructive'
>;

export const typographyClasses = (color: Typography): string => TEXT[color];
```

**Les noms publics divergent des `ColorToken`** (ex. `error` ≠ `destructive`, `neutral` ≠ `muted`) → littéraux indépendants + table de correspondance explicite :

```ts
export type Status = 'info' | 'success' | 'warning' | 'error' | 'neutral';

export const STATUS_COLOR_TOKEN: Record<Status, ColorToken> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'destructive',
  neutral: 'muted',
};
```

## Pas de `as` (type assertion) dans le code métier

Un cast `as Type` masque une erreur potentielle au compilateur. Quand construire un objet typé nécessite malgré tout une assertion (ex. remplir un `Record<K, V>` clé par clé dans une boucle), elle est isolée une seule fois dans un helper générique réutilisable plutôt que répétée dans chaque fichier métier.

```ts
// src/lib/utils/record.ts — seul endroit du projet avec ce cast
export const recordFromKeys = <K extends PropertyKey, V>({
  keys,
  toValue,
}: {
  keys: readonly K[];
  toValue: (key: K) => V;
}): Record<K, V> => {
  const result = {} as Record<K, V>;
  for (const key of keys) {
    result[key] = toValue(key);
  }
  return result;
};
```

```ts
// src/lib/colors/tokens.ts — aucun cast ici
export const tokenMap = (prefix: string): Record<ColorToken, string> => {
  return recordFromKeys({
    keys: COLOR_TOKENS,
    toValue: (token) => `${prefix}-${token}`,
  });
};
```

`K extends PropertyKey` (pas `K extends string`) pour couvrir aussi bien des clés `string` (`ColorToken`) que `number` (`SpacingScale`).

Exception acceptée : `as const` sur un tableau littéral pour dériver un type union (`COLOR_TOKENS`, `SPACING_SCALE`) — ce n'est pas une assertion qui triche avec le compilateur, juste un figeage de littéraux.

## Classes Tailwind dynamiques → `@source inline(...)` obligatoire

Tailwind scanne le code source pour des noms de classe **littéraux**. Toute classe construite dynamiquement (`` `bg-${token}` ``, `` `${prefix}-${step}` ``) est invisible pour son scanner : le CSS n'est jamais généré, la classe n'a aucun effet au runtime — silencieusement, sans erreur de build.

Chaque combinaison préfixe/valeur utilisée dynamiquement (spacing, couleurs) doit être listée dans un `@source inline(...)` dans `src/styles.css` :

```css
@source inline("{p,px,py,...}-{0,2,4,6,8,10,12,14,16}");
@source inline("{bg,text,border,ring}-{primary,secondary,...}");
```

## Tests colocalisés

Les tests vivent dans un dossier `__tests__/` à côté du code qu'ils testent, jamais dans une arborescence de tests séparée.

```
src/lib/utils/
├── record.ts
└── __tests__/
    └── record.test.ts
```

Priorité aux fonctions pures avec de la logique réelle (mapping, transformation, edge cases) plutôt qu'aux objets de données statiques déjà couverts indirectement par ailleurs.
