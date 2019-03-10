// Tips to treat two type aliases with same original type as different type
// https://basarat.gitbooks.io/typescript/docs/tips/nominalTyping.html
type NominalTyping<T extends string> = { type: T }

export type RawPassword = NominalTyping<'RawPassword'> & string
export type HashedPassword = NominalTyping<'HashedPassword'> & string
export type Password = RawPassword | HashedPassword
