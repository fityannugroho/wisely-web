---
title: Charsets
description: A list of all the charsets available in Wisely.
---

Charsets are a set of characters that will be used for obfuscation.

## Valid Charset

A valid charset must be an object that contains key-value pairs where:

- The key is the character to be replaced. It must be a **single alphabet character** (`a-z`, `A-Z`).
- The value is an array of characters that will replace the key. It must be an array of **any single character** other than the [control characters](https://unicodeplus.com/category/Cc) and [private use characters](https://unicodeplus.com/block/E000).

Below is an example of a valid charset in JSON and JavaScript object.

- JSON

  ```json
  {
    "a": ["@", "4"],
    "e": ["3"],
    "i": ["1", "!"],
    "o": ["0"],
    "s": ["5", "$"],
    "t": ["7"]
  }
  ```

- JavaScript

  ```js
  {
    a: ['@', '4'],
    e: ['3'],
    i: ['1', '!'],
    o: ['0'],
    s: ['5', '$'],
    t: ['7'],
  }
  ```

See the [built-in charsets](/manual/charsets/#built-in-charsets) for more examples.

## Built-in Charsets

Below is the built-in charsets available. You can use the name of the charset as a string in the [charSets](/manual/api/#optionscharsets) option.

| Charset Name | Block Name | Block Range |
| ---- | --------- | ----- |
| `latin` | [Basic Latin](https://unicodeplus.com/block/0000) | \u0000 - \u007f |
| `latin-1` | [Latin-1 Supplement](https://unicodeplus.com/block/0080) | \u0080 - \u00ff |
| `latin-ext-a` | [Latin Extended-A](https://unicodeplus.com/block/0100) | \u0100 - \u017f |
| `latin-ext-b` | [Latin Extended-B](https://unicodeplus.com/block/0180) | \u0180 - \u024f |

> See the details of each charsets in the [repository](https://github.com/fityannugroho/wisely/tree/main/charsets).
