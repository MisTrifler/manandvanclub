/**
 * MobileStickyCTA was intentionally disabled.
 *
 * The sticky bottom "Start Move Request" button could jump customers back to
 * the top of the form and reset their progress after they had already started
 * filling it in. Keep this component as a harmless no-op so any older imports
 * fail safely instead of reintroducing the sticky CTA.
 */
export default function MobileStickyCTA() {
  return null;
}
