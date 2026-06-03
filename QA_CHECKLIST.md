# QA Checklist for Frontend Redesign

## Responsiveness
- [ ] **Hero Section**: Text sizes adjust correctly from mobile (34-40px) to desktop (48-56px). Images stack on mobile, side-by-side on desktop.
- [ ] **Navbar**: Hamburger menu works on mobile, sticky behavior is smooth. Links are accessible on all screen sizes.
- [ ] **Product Grid**: 1 column on mobile, 2 on tablet, 3/4 on desktop. Cards maintain aspect ratio.
- [ ] **Trust Bar**: Grid layout adjusts (2 cols mobile -> 6 cols desktop). Icons remain centered.
- [ ] **Tabs (Product Detail)**: Scrollable or stacked on very small screens if necessary. Content switches correctly.
- [ ] **Footer**: Stacked columns on mobile, 4-column grid on desktop. Links have enough touch target size.

## CTA Flow
- [ ] **Homepage Primary**: "Request a Quote" leads to `/rfq`.
- [ ] **Homepage Secondary**: "Download Product Specs" leads to `/products`.
- [ ] **Product Card**: "View Specs" leads to detail page. "Download" icon (if present) triggers download/open.
- [ ] **Product Detail Sticky (Mobile)**: "Request Quote" button stays visible at bottom.
- [ ] **Product Detail Sidebar (Desktop)**: CTA block stays sticky or visible in right column.
- [ ] **RFQ Form**: Stepper works correctly. Validation blocks progression on empty fields. Submission triggers success state.

## Visual Polish
- [ ] **Typography**: Headings use `Space Grotesk`, Body uses `Inter`. No massive headings on mobile.
- [ ] **Colors**: Primary (#0F766E) used for main actions. Secondary (#166534) for badges/trust signals. No muddy gradients.
- [ ] **Spacing**: Consistent section padding (py-12 to py-24). Container max-widths respected.
- [ ] **Images**: All images have `object-cover` and rounded corners where appropriate. Skeletons show while loading.
- [ ] **Shadows**: Subtle shadows on cards, lifted state on hover.

## Performance
- [ ] **Images**: Next.js Image component or optimized `img` tags used.
- [ ] **Fonts**: Loaded via `next/font`.
- [ ] **Layout Shift**: Skeletons prevent massive layout shifts on data load.





