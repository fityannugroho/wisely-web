---
title: Usage
description: How to use Wisely.
---

## API

### Obscures the entire text

```js
import wisely from 'wisely';

const text = 'Palestine will be free! Freedom is the right of ALL nations!';

console.log(wisely({ text }));
// P@l3$t|n3 w!ll 83 fr33! Fr33d0m |$ t#3 r!6#t 0f @LL n4t|0n5!
```

### Obscures certain phrases

```js
console.log(wisely({ text, phrases: ['palestine', 'free'] }));
// P4l35t1n3 will be fr33! Freedom is the right of ALL nations!
```

### Obscures with custom character set

```js
const customCharSet = {
  a: ['@', '4'],
  e: ['3'],
  i: ['1', '!'],
  o: ['0'],
  s: ['5', '$'],
  t: ['7'],
};

console.log(wisely({ text, charSets: [customCharSet] }));
// P@l3$7!n3 w1ll b3 fr33! Fr33d0m 1$ 7h3 r1gh7 0f 4LL n@710n$!
```

## CLI

:::note
CLI is not available yet.
:::
