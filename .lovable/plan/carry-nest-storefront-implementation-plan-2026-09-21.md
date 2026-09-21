# Carry Nest storefront implementation plan

## Outcome

Replace the starter placeholder with a polished, responsive women’s handbag storefront for Carry Nest, using the requested burgundy, ivory, blush, and gold identity, with the first screen focused on shopping rather than marketing copy.

## Build scope

1. **Storefront foundation**
   - Create the Carry Nest wordmark and CN monogram in the site chrome.
   - Add accessible navigation, account entry, search, category links, and cart drawer.
   - Add unique route metadata for every content page, including social metadata.
   - Use generated/bundled product imagery and clearly mark all four starting products as sample concepts with editable placeholder details.

2. **Catalog and product experience**
   - Add Handbags, Shoulder Bags, Tote Bags, Crossbody Bags, and Clutches filters.
   - Implement search, category filtering, price sorting, empty/no-results states, and sample product cards.
   - Add product detail pages with image gallery, conceptual 3D preview area, color selection, quantity controls, descriptions, editable specifications, care information, and “Details coming soon” where data is unknown.

3. **Interactive 3D hero**
   - Add a lazy-loaded React Three Fiber hero with one conceptual handbag model and burgundy, espresso, and rose material variants.
   - Include floating motion, mouse/touch drag rotation, realistic lighting, leather/stitching/hardware cues, soft shadows, pause control, reduced-motion handling, offscreen pausing, and a static-image fallback.
   - Avoid separate WebGL scenes in product cards and label the model as conceptual rather than an exact product replica.

4. **Cart and checkout states**
   - Add guest cart persistence, selected colors, quantity updates, removal, subtotal calculation, and smooth drawer transitions.
   - Show a truthful “Checkout unavailable” state until a payment provider is configured; never simulate an order or payment.
   - Keep checkout/payment integration as a documented next integration, with server-side validation, signed webhooks, and durable orders required before activation.

5. **Authentication and profiles**
   - Enable Lovable Cloud for authentication and durable user data.
   - Add a profiles table linked to the signed-in account, with secure ownership policies and signup profile creation.
   - Add real Google, GitHub, and Discord sign-in entry points, account menu, authenticated state, sign-out, and error/unavailable states. Providers without configured credentials remain visibly unavailable.
   - Add a setup guide containing required environment variables, provider origins, and exact callback URLs; keep OAuth secrets server-side.

6. **Responsive quality and accessibility**
   - Verify mobile, tablet, and desktop shopping flows.
   - Include keyboard navigation, visible focus, touch-sized controls, accessible dialogs, labels, contrast, loading, network-error, empty-cart, no-results, auth-error, and unavailable-3D states.

7. **Repository, domain, and release checks**
   - After approval, link the available GitHub connector and inspect the requested `Khadiys-Karvar` repository before changing unrelated files.
   - Sync the Carry Nest changes to GitHub and attempt the requested Vercel deployment through available authorized access.
   - Inspect `store.ankurchemidyes.com` before any DNS change and use only hosting-provider records. Report the exact blocker if Vercel, GitHub, domain access, OAuth, payment, or Cloud access is unavailable.
   - Run the production build and browser checks for catalog controls, color selection, cart persistence/calculations, 3D controls, and configured auth flows.

## Technical approach

- Keep the existing TanStack Start routing and design-token CSS system; replace the placeholder index route and add only the routes needed for catalog, product details, auth callback/setup, and checkout states.
- Use Lovable Cloud server functions for profiles and any authenticated data; keep server-only secrets out of client bundles.
- Use a small local sample catalog for the initial release, with a clear seam for replacing sample data with real inventory later.
- Use a bundled/generated visual asset pipeline rather than hotlinked images, and make the 3D implementation client-only with a static fallback.
- Preserve unrelated repository functionality after inspecting the external repository; do not overwrite existing files blindly.

## Explicit assumptions

- The four starting products are concepts/sample catalog items, not real inventory.
- No reviews, stock claims, discounts, or unknown specifications will be invented.
- Checkout remains unavailable until a payment provider and order storage are configured.
- OAuth buttons are functional only for providers that are actually configured; unconfigured providers are not faked.
- Deployment and domain changes depend on access to the requested GitHub, Vercel, DNS, and provider accounts.
