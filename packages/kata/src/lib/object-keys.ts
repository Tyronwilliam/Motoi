// Object.keys() est typé `string[]` par TypeScript, quel que soit l'objet
// passé en entrée — cette fonction est le seul endroit du repo où ce cast
// est nécessaire pour retrouver les clés littérales.
export function objectKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}
