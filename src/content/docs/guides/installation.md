---
title: Installation
description: Wisely installation guide.
---

## Prerequisites

- Node.js 18 or higher
- npm 9 or higher

## Installation

```bash
npm install wisely
```

## Importing

```js
import wisely from 'wisely';
```

**Wisely** is a native [**ESM**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) package and does not provide CommonJS build.

So, for CommonJS users, you can import it using [dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) like this:

```js
const wisely = await import('wisely');
```
