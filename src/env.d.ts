/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  /**
   * The maximum age of the cache for the Wisely API in seconds.
   */
  readonly WISELY_CACHE_MAX_AGE?: number;
  /**
   * Disable the cache for the Wisely API.
   */
  readonly WISELY_DISABLE_CACHE?: boolean;
}
