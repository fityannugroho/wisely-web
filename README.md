# Wisely Web

The [**Wisely**](https://github.com/fityannugroho/wisely) documentation and playground.

[<img src="/src/assets/ui.gif" alt="Wisely Web" width="335" height="314" />](https://wisely.vercel.app/playground)

## Documentation

You can find the online version of the Wisely documentation at https://wisely.vercel.app.

## Playground

You can find the Wisely playground at https://wisely.vercel.app/playground.

## Project Structure

```
.
├── public/
├── src/
│   ├── assets/
│   ├── content/
│   │   ├── docs/
│   │   ├── i18n/
│   │   └── config.ts
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   └── env.d.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```
The documentation are written in `.md` or `.mdx` files in the `src/content/docs/` directory. Each file is exposed as a route based on its file name.

Images can be added to `src/assets/` and embedded in Markdown with a relative link.

Static assets, like favicons, can be placed in the `public/` directory.

## Support This Project

Give a ⭐️ if this project helped you!

Also please consider supporting this project by **becoming a sponsor**. Your donation will help us to maintain and develop this project and provide you with better support.
