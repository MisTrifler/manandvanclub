# Guide price audit v12 — UK-wide distance-sensitive guide

## Reason for change
The previous guide could still fall back to broad move-type bands when no usable route data was available. That made a local move and a longer move appear too similar if Google Routes was missing/slow or if no route estimate reached the guide calculator.

## What changed
- The guide calculator is now formula version `guide-v1.2`.
- If `routeEstimate` is missing, the guide calculator attempts a postcode-distance fallback from the collection and delivery postcodes before using broad move-type bands.
- The fallback is not hard-coded for WS8/B44/LE4. It uses UK postcode area centroids, with additional launch-area outcode centroids for better local accuracy.
- Added missing IM/GY/JE postcode area centroids for wider postcode coverage where customers may enter them.
- Long-distance moves now use a stronger route-time multiplier above 120 miles.
- Mileage rate increased from £2.00/mile to £2.25/mile after the first 10 included miles.
- Long-distance uplifts increased from 1.10/1.20 to 1.12/1.25.
- Heavy or awkward single-item moves can now assume 2 movers rather than staying at 1 mover.
- The customer still sees a guide only. A verified mover still sends the accurate quote before booking.

## AnyVan / competitor note
We did not scrape, copy, or depend on AnyVan live quotes. Their live quote engine is proprietary and changes by inventory/date/route. The guide is an independent Man and Van Club estimate that uses route distance, journey time, loading time, mover count, and move complexity.

## Safety boundaries
Not changed:
- Stripe checkout
- booking deposit calculation
- webhook validation
- selected quote option pricing
- customer details release
- OTP
- driver matching
- quote expiry
- no-show logic

## Expected behaviour
- WS8 → B44 should price as a local/regional move.
- WS8 → LE4 should price higher because distance and journey time are higher.
- London → Nottingham should price significantly higher than a local London route.
- A 2-mover job should price higher than a 1-mover job.
- Heavy single-item jobs should generally assume 2 movers.

## Important operational note
Google Routes remains the most accurate source. Ensure `GOOGLE_MAPS_API_KEY` is set in Vercel. The postcode fallback keeps pricing distance-sensitive if Google is unavailable, but exact door-to-door routes require Google.
