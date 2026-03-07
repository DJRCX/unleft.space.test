# Fixes and Font Changes

## Goal
Replace Space Grotesk with Bruno Ace SC globally, remove it completely, and update the Flickering Footer to loop between a barcode-style logo and a normal-font tagline.

## Tasks
- [ ] Task 1: Update `src/layouts/BaseLayout.astro` → Remove `Space+Grotesk` from the Google Fonts `<link>` tag. → Verify: Font network request is gone.
- [ ] Task 2: Update `src/styles/global.css` → Change `--font-heading` to use `"Bruno Ace SC"`. → Verify: Headings in the app use the new font.
- [ ] Task 3: Update `src/components/sections/not-found.tsx` → Change the inline `fontFamily` style to `"Bruno Ace SC"`. → Verify: 404 page header renders correctly.
- [ ] Task 4: Replace all "unleft" with "unleft.llc" globally (matching case). → Verify: All text strings are updated.
- [ ] Task 5: Update `unleft.comp/components/flickering-footer.tsx` (and `src/components` equivalent if needed) → Add a `fontFamily` prop to `FlickeringGrid` and pass it to `maskCtx.font`. → Verify: Canvas can draw text using different fonts.
- [ ] Task 6: Update the footer wrapper in `flickering-footer.tsx` → Use `useEffect` to toggle `text` between `"UNLEFT.LLC"` (with barcode font) and `"Engineering the Future, Beyond Software."` (with normal font) on an interval (e.g., 4s). → Verify: Footer visually loops between the two text styles.
- [ ] Task 7: Update `docs/TECHSTACK.md`, `docs/21st-dev-components-plan.md.resolved`, and `PLAN-fixes-and-fonts.md` (self-update) with all changes made.

## Done When
- [x] Space Grotesk font is entirely removed from the codebase.
- [x] Bruno Ace SC is applied successfully.
- [x] All "unleft" mentions are updated to "unleft.llc".
- [x] Flickering footer displays "UNLEFT.LLC" in `Libre Barcode 39 Extended Text` looping with the tagline.
- [x] Documentation is fully synchronized.
