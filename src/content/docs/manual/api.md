---
title: API Reference
description: API reference for Wisely.
sidebar:
  order: 1
tableOfContents:
  maxHeadingLevel: 4
---

## Methods

### `wisely(options)`

- Returns: `string`
- Throws: `ValidationError`

Obscures the text or certain phrases with random uncommon characters.

#### `options.text`

- Type: `string`
- Required

The text to be obscured.

#### `options.phrases`

- Type: `string[]`

The specific phrases to be obscured. If not specified or empty, the **entire text will be obscured**.

Each phrase must be [valid](/manual/api/#isphrasevalidphrase). `ValidationError` will be thrown if there are any invalid phrases.

#### `options.caseSensitive`

- Type: `boolean`
- Default: `false`

Whether to obscure in a case-sensitive manner.

#### `options.charSets`

- Type: `(string | object)[]`
- Default: `['latin']`

The [charsets](/manual/charsets) that will be used for obfuscation. Put the **name of the [built-in charsets](/manual/charsets/#built-in-charsets)** or a **custom charset objects**.

Each custom charset object must be a [valid charset](/manual/charsets/#valid-charset). `ValidationError` will be thrown if there are any invalid built-in charset names or invalid custom charset objects.

### `getCharSet(name)`

- Returns: `object`
- Throws: `ValidationError`

Gets the [built-in charset](/manual/charsets/#built-in-charsets) by its name.

#### `name`

- Type: `string`
- Required

The name of the built-in charset. `ValidationError` will be thrown if the given name is not a valid built-in charset name.

### `isCharSetValid(charSet)`

- Returns: `boolean`

Checks whether the given charset is valid or not.

#### `charSet`

- Type: `object`
- Required

The charset to be checked.

### `isPhraseValid(phrase)`

- Returns: `boolean`

Checks whether the given phrase is valid or not.

**A valid phrase** must be less than or equal to 30 characters and only contain the following characters:

- Alphabets (`a-z`, `A-Z`)
- Numbers (`0-9`)
- Spaces (` `)
- Hyphens (`-`)
- Underscores (`_`)
- Apostrophes (`'`)
- Forward slashes (`/`)

#### `phrase`

- Type: `string`
- Required

The phrase to be checked.

### `mergeCharSets(...charSets)`

- Returns: `object`
- Throws: `ValidationError`

Merges multiple charsets into one. It will return a new object containing all the characters from the given charsets without duplicates.

#### `charSets`

- Type: `string | object`

The charsets to be merged. Put the **name of the [built-in charsets](/manual/charsets/#built-in-charsets)** or a **custom charset objects**.

`ValidationError` will be thrown if there are any invalid built-in charset names or invalid custom charset objects.
