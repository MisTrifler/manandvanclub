export const WMC_ADMIN_BOOKING_FEE = 0;

export const SERVICE_BASE_PRICES = {
  "Regular House Cleaning": 45,
  "Deep Cleaning": 95,
  "One-Off Clean": 65,
  "End of Tenancy Clean": 145,
  "Move-Out Clean": 120,
  "Pre-Move Clean": 105,
  "Airbnb Changeover": 75,
  "Landlord Cleaning": 130,
  "After Builders Clean": 170,

  // Newer booking page labels
  "Regular domestic cleaning": 60,
  "One-off house cleaning": 85,
  "End-of-tenancy cleaning": 160,
  "Move-out cleaning": 150,
  "Pre-move cleaning": 130,
  "Airbnb / holiday-let changeover": 95,
  "After-builders cleaning": 170
};

export const EXTRAS_PRICES = {
  "Inside oven": 25,
  "Inside fridge": 15,
  "Inside windows": 20,
  "Interior windows": 25,
  "Carpet refresh": 35,
  "Heavy condition": 40,
  "Heavy condition support": 40,
  "Same/next day request": 25,
  "Pets in property": 10
};

export function createQuoteReference() {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `WMC-${year}-${random}`;
}

export function getFeePercent(customerTotalPrice) {
  const price = Number(customerTotalPrice || 0);

  if (!Number.isFinite(price) || price <= 0) {
    return 0;
  }

  return 15;
}

export function getPriceBand(customerTotalPrice) {
  const price = Number(customerTotalPrice || 0);

  if (!Number.isFinite(price) || price <= 0) {
    return "none";
  }

  return "flat_15_percent";
}

export function roundMoney(value) {
  const numberValue = Number(value || 0);

  if (!Number.isFinite(numberValue)) {
    return 0;
  }

  return Math.round(numberValue * 100) / 100;
}

export function calculateEstimatedHours(serviceType, bedrooms, bathrooms, conditionLevel) {
  let hours = 2;

  if (serviceType === "Regular House Cleaning") hours = 2;
  if (serviceType === "Regular domestic cleaning") hours = 2;

  if (serviceType === "One-Off Clean") hours = 3;
  if (serviceType === "One-off house cleaning") hours = 3;

  if (serviceType === "Deep Cleaning") hours = 4;
  if (serviceType === "Deep cleaning") hours = 4;

  if (serviceType === "End of Tenancy Clean") hours = 5;
  if (serviceType === "End-of-tenancy cleaning") hours = 5;

  if (serviceType === "Move-Out Clean") hours = 4.5;
  if (serviceType === "Move-out cleaning") hours = 5;

  if (serviceType === "Pre-Move Clean") hours = 4;
  if (serviceType === "Pre-move cleaning") hours = 4;

  if (serviceType === "Airbnb Changeover") hours = 2.5;
  if (serviceType === "Airbnb / holiday-let changeover") hours = 3;

  if (serviceType === "Landlord Cleaning") hours = 4;
  if (serviceType === "After Builders Clean") hours = 5.5;
  if (serviceType === "After-builders cleaning") hours = 5.5;

  const bedroomCount = Number(bedrooms || 0);
  const bathroomCount = Number(bathrooms || 0);

  if (bedroomCount > 2) {
    hours += (bedroomCount - 2) * 0.75;
  }

  if (bathroomCount > 1) {
    hours += (bathroomCount - 1) * 0.5;
  }

  if (conditionLevel === "Heavy") {
    hours += 1.25;
  }

  if (conditionLevel === "Very heavy") {
    hours += 2;
  }

  return Number(hours.toFixed(1));
}

export function calculateWmcFeeBreakdown(customerTotalPrice) {
  const customerTotal = roundMoney(customerTotalPrice);
  const wmcFeePercent = getFeePercent(customerTotal);
  const priceBand = getPriceBand(customerTotal);

  const wmcPlatformSupportFee = roundMoney((customerTotal * wmcFeePercent) / 100);
  const wmcAdminBookingFee = WMC_ADMIN_BOOKING_FEE;

  /*
    WMC total retained = flat 15% platform fee.
    There is no separate WMC joining fee, monthly fee or fixed admin/booking handling fee.
  */
  const wmcFeeAmount = roundMoney(wmcPlatformSupportFee + wmcAdminBookingFee);
  const cleanerPayout = roundMoney(Math.max(customerTotal - wmcFeeAmount, 0));

  return {
    customerTotalPrice: customerTotal,
    wmcFeePercent,
    wmcPlatformSupportFee,
    wmcAdminBookingFee,
    wmcFeeAmount,
    cleanerPayout,
    priceBand
  };
}

export function calculateMarketplacePrice({
  serviceType,
  bedrooms,
  bathrooms,
  conditionLevel,
  extras = []
}) {
  const basePrice = SERVICE_BASE_PRICES[serviceType] || 75;

  const bedroomCount = Number(bedrooms || 0);
  const bathroomCount = Number(bathrooms || 0);

  let total = basePrice;

  if (bedroomCount > 2) {
    total += (bedroomCount - 2) * 15;
  }

  if (bathroomCount > 1) {
    total += (bathroomCount - 1) * 12;
  }

  if (conditionLevel === "Light") {
    total -= 5;
  }

  if (conditionLevel === "Heavy") {
    total += 40;
  }

  if (conditionLevel === "Very heavy") {
    total += 70;
  }

  for (const extra of extras) {
    total += EXTRAS_PRICES[extra] || 0;
  }

  if (total < 50) {
    total = 50;
  }

  const customerTotalPrice = roundMoney(total);

  const feeBreakdown = calculateWmcFeeBreakdown(customerTotalPrice);

  const estimatedHours = calculateEstimatedHours(
    serviceType,
    bedrooms,
    bathrooms,
    conditionLevel
  );

  return {
    customerTotalPrice: feeBreakdown.customerTotalPrice,

    /*
      wmcFeeAmount is the total WMC retained amount:
      flat 15% platform fee only.
    */
    wmcFeePercent: feeBreakdown.wmcFeePercent,
    wmcPlatformSupportFee: feeBreakdown.wmcPlatformSupportFee,
    wmcAdminBookingFee: feeBreakdown.wmcAdminBookingFee,
    wmcFeeAmount: feeBreakdown.wmcFeeAmount,

    cleanerPayout: feeBreakdown.cleanerPayout,
    priceBand: feeBreakdown.priceBand,
    estimatedHours
  };
}
