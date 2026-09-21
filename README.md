# Carry Nest Boutique

npm ci

cp .env.example .env.local

npm run dev

npm run build

https://store.ankurchemidyes.com/ sub domain
https://github.com/ankurchemidyes/Khadiys-Karvar Github repository and deploy it 

Build a professional, responsive women’s handbag shopping website named Carry Nest, with a shopping experience comparable in quality to Shopify stores and an original brand identity.

1. Brand and Design

Use burgundy, ivory, blush pink, and subtle gold accents. Combine elegant serif headings with readable body typography, generous spacing, and high-quality product imagery.

Create a “Carry Nest” wordmark and a small “CN” monogram.

Tagline: “Carry what you love.”

Website language: English

Currency: Indian Rupees (₹)

2. Interactive 3D Hero

Include a real interactive handbag model using Three.js or React Three Fiber.

The handbag should feature:

Gentle floating animation.

Mouse and touch drag rotation.

Burgundy, Espresso, and Rose color options.

Leather-like texture, stitching, handles, gold hardware, realistic lighting, and soft shadows.

Hero heading: “A place for everything you love.”

Buttons: “Shop the Collection” and “Explore in 3D”

Provide an animation pause control and respect reduced-motion preferences. Display a high-quality static product image when 3D rendering is unavailable.

Clearly identify conceptual models; do not present them as exact replicas of actual products.

3. Product Catalog

Include these categories:

Handbags

Shoulder Bags

Tote Bags

Crossbody Bags

Clutches

Start with these sample products:

The Muse Handbag

The Luna Shoulder Bag

The Bloom Tote

The Pearl Clutch

Product cards must include an image, product name, price, available colors, Quick View, and Add to Bag.

Implement working search, category filters, and price sorting.

Clearly label sample products and prices until real inventory is supplied. Do not invent reviews, stock availability, or discounts.

4. Product Details

Each product should include:

Image gallery and interactive 3D preview.

Color selection.

Quantity selector.

Product description.

Dimensions, materials, and care information.

Add to Bag button.

Do not invent unknown product specifications. Keep them as editable fields and display an appropriate “Details coming soon” state when necessary.

5. Cart and Checkout

Create a cart drawer showing products, selected colors, quantities, removal controls, and subtotal.

Persist the guest cart across page refreshes.

If no payment integration is configured, clearly display “Checkout unavailable.” Never simulate a successful payment or order.

When connecting a payment provider, implement server-side price validation, signed webhook verification, and persistent order storage.

6. Google, GitHub, and Discord Sign-In

Implement real OAuth authentication for Google, GitHub, and Discord using a secure authentication system compatible with the selected backend.

Include:

Account menu.

Authenticated user state.

Sign-out.

Authentication error handling.

Server-side session verification where required.

Never place OAuth secrets in browser code or commit them to GitHub. Store credentials in environment variables.

Show unconfigured providers as unavailable. Do not implement fake login or simulated authentication success.

Provide a setup guide listing the required environment variables, authorized origins where applicable, and exact callback URLs for each provider.

7. Animation and Performance

Include subtle product hover tilt, smooth cart transitions, and restrained scroll-reveal effects.

Animations must never delay shopping actions or interfere with controls.

Lazy-load 3D code, optimize models and textures, and pause animations when offscreen. Avoid creating a separate heavy WebGL scene for every product card.

8. Responsive Design and Accessibility

Build polished layouts for mobile, tablet, and desktop.

Include keyboard navigation, visible focus indicators, accessible modal dialogs, descriptive labels, sufficient color contrast, and touch-friendly controls.

Handle all important states:

Loading.

Empty cart.

No search results.

Network errors.

Authentication errors.

Unavailable 3D rendering.

9. GitHub and Deployment

Existing repository:

https://github.com/ankurchemidyes/Khadiys-Karvar

If the connected project is available, update it to Carry Nest. Inspect the existing code first and preserve unrelated files and functionality.

Deployment target: Vercel

Custom subdomain: store.ankurchemidyes.com

Use available connections and authorized access to synchronize GitHub and complete deployment. If access is missing, identify the exact blocker.

Check the existing domain configuration before changing DNS. Use only the DNS records supplied by the hosting provider.

10. Final Verification and Delivery

Confirm that the production build succeeds.

Test:

Mobile layout and navigation.

Product search, filtering, and sorting.

Color selection.

Cart quantities and subtotal calculations.

Cart persistence after refresh.

3D rotation, color changes, and motion controls.

Configured OAuth sign-in and sign-out flows.

Deliver the deployed website URL, GitHub changes, a concise list of working features, and any remaining integrations that require credentials.

Begin implementation using the available information. Build the actual working storefront, not just a visual mockup or a page describing the proposed store. @connector:github:"GitHub API" @secret:GITHUB_PERSONAL_ACCESS_TOKEN

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b8930a62-def8-4715-be5d-bf1c1665706d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
