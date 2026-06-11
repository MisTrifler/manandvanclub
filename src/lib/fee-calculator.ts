export function calculateIntroductionFee(moveType: string, details?: any): number {
  const estimatedValues: Record<string, number> = {
    "Single Item": 75,
    "Furniture Collection": 150,
    "Studio Flat": 250,
    "1 Bed Flat": 350,
    "2 Bed House": 550,
    "3 Bed House": 850,
    "4+ Bed House": 1200,
    "Office Move": 900,
    "Other": 400,
  };

  let value: number;

  switch (moveType) {
    case "Furniture Delivery":
      value = 75;
      break;
    case "Student Move":
      value = 180;
      break;
    case "Man & Van Service":
      value = 400;
      break;
    case "Office Move":
      value = 900;
      break;
    case "Storage Collection":
      value = 500;
      if (details?.storageUnitSize) {
        if (details.storageUnitSize.includes("Small")) {
          value = 250;
        } else if (details.storageUnitSize.includes("Large")) {
          value = 700;
        }
      }
      break;
    case "Home Move":
      value = 550;
      if (details?.bedrooms) {
        if (details.bedrooms === "Studio") value = 250;
        else if (details.bedrooms === "1") value = 350;
        else if (details.bedrooms === "2") value = 550;
        else if (details.bedrooms === "3") value = 850;
        else if (details.bedrooms === "4+") value = 1200;
      }
      break;
    default:
      value = estimatedValues[moveType] || 400;
  }

  if (value <= 100) return 4.99;
  if (value <= 200) return 9.99;
  if (value <= 300) return 14.99;
  if (value <= 500) return 24.99;
  if (value <= 700) return 34.99;
  if (value <= 1000) return 44.99;
  return 59.99;
}
