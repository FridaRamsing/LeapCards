# LeapCards

React + Vite implementation of the supplied “LeapCards 2026 - homepage” desktop reference.

## Run locally

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

## Scope

- Homepage sections, typography, colours, original images, and copy follow the PDF.
- React components live in `src/App.jsx`; layout and responsive rules live in `src/styles.css`.
- Images and fonts are stored locally in `public/assets`. `sources.json` records image origins from the existing LeapCards website.
- The profile avatar is cropped from the user-supplied reference. The header reproduces the reference state; it does not represent an authenticated session.
- Navigation, product, account, and footer links lead to the existing LeapCards website while additional pages are pending.
- Testimonial arrows work with three genuine testimonials from the existing website.
- Video buttons open the existing Thinkific player in a keyboard-dismissable dialog.
- Professionals uses the original Airtable embed. Its live content and availability are controlled by Airtable.
- No Supabase, authentication backend, payments, or database has been added.
- The PDF only defines the desktop view. Narrow screens retain the same content and order, using a single-column layout and collapsible navigation.
- The supplied PDF includes a footer, but the user has noted an additional missing bottom section. Confirm that reference before final sign-off.

Original content source: https://www.leapcards.net/ (retrieved 13 October 2026).
