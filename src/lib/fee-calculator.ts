export function calculateIntroductionFee(moveType: string): number {
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

  const value = estimatedValues[moveType] || 400;

  if (value <= 100) return 4.99;
  if (value <= 200) return 9.99;
  if (value <= 300) return 14.99;
  if (value <= 500) return 24.99;
  if (value <= 700) return 34.99;
  if (value <= 1000) return 44.99;
  return 59.99;
}
