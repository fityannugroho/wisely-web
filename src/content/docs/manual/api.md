---
title: API Reference
description: API reference for Wisely.
sidebar:
  order: 1
---

## `wisely(options)`

- Returns: `string`

Obscures the text or certain phrases with random uncommon characters.

### `options.text`

- Type: `string`
- Required: `true`

The text to be obscured.

### `options.phrases`

- Type: `string[]`
- Required: `false`

The specific phrases to be obscured. If not specified, the whole text will be obscured.

### `options.caseSensitive`

- Type: `boolean`
- Default: `false`

Whether to obscure in a case-sensitive manner.

### `options.charSet`

- Type: `string`
- Default: `'latin'`

The character set that will be used for obfuscation. See the [built-in character sets](/manual/charsets/) available.

> In the future, we will add support for more character sets to improve the variety of the obsfucated text. Also, we will add support to define custom character sets.
