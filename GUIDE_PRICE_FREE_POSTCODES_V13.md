# Guide Price Free Postcodes v13

## What changed

The guide price checker no longer needs a Google Maps key for UK-wide distance-sensitive estimates.

Primary route source is now **Postcodes.io**:

- customer enters collection and delivery postcodes
- server calls Postcodes.io for latitude/longitude for both full UK postcodes
- server estimates route-like road mileage and time from those coordinates
- guide price uses that mileage/time plus move type, expected movers, loading time and complexity

Google Routes is now optional only. It will not be used unless both are set:

```env
USE_GOOGLE_ROUTE_ESTIMATE=true
GOOGLE_MAPS_API_KEY=your_key
```

This prevents accidental Google billing while keeping the option open later.

## Why this fixes the issue

The old fallback could use broad postcode-area centroids if Google was missing. That meant some different moves could look too similar.

Now full UK postcode coordinates from Postcodes.io are used first, so national routes such as London to Nottingham, Manchester to Bristol, WS8 to LE4, etc. should scale much better than local moves.

## Important customer wording

The site should continue to describe this as a guide price only:

> This is only a guide price. A verified mover will review your move details and send an accurate quote before you decide whether to book.

## No business logic changed

This patch does not change:

- Stripe
- booking deposits
- webhook validation
- mover quote options
- OTP
- driver matching
- quote expiry
- customer details release
- no-show logic

Guide prices remain display-only.
