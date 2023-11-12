---
title: Usage
description: How to use Wisely.
---

## API

### Obscures the entire text

```js
import wisely from 'wisely';

const text = 'Palestine will be free! Freedom is the right of ALL nations!';
const res = wisely({ text });

// P@l3$t|n3 w!ll 83 fr33! Fr33d0m |$ t#3 r!6#t 0f @LL n4t|0n5!
```

### Obscures certain phrases

```js
import wisely from 'wisely';

const text = 'Palestine will be free! Freedom is the right of ALL nations!';
const res = wisely({ text, phrases: ['palestine', 'free'] });

// P4l35t1n3 will be fr33! Freedom is the right of ALL nations!
```

## CLI

:::note
CLI is not available yet.
:::
