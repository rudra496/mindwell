/**
 * Ambient type declarations (committed).
 *
 * Next.js normally generates `next-env.d.ts` to declare these module types,
 * but that file is git-ignored, and under TypeScript 6 `next build`'s
 * type-check fails on side-effect CSS imports ("Cannot find module ...
 * for side-effect import of './globals.css'") without an explicit ambient
 * declaration. Declaring them here keeps the production build green.
 */
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.svg" {
  const src: string;
  export default src;
}
