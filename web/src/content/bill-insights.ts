/**
 * Cheap inferences from a household's monthly electricity bill alone.
 * These power the "we see you" framing on the calculator result page —
 * no external data, no API calls, just heuristics tuned for Swedish
 * villor that fall in the typical Lystr customer band.
 */

/** Approximate Swedish all-in price (spot + nät + skatt) in kr/kWh. */
const KWH_PRICE = 1.8;

/**
 * Annual kWh roughly implied by a monthly bill. Rounded to nearest 100
 * so the number reads like an estimate, not a calculation.
 */
export function estimateAnnualKwh(monthlyBill: number): number {
  if (!monthlyBill || monthlyBill <= 0) return 0;
  const annual = (monthlyBill * 12) / KWH_PRICE;
  return Math.round(annual / 100) * 100;
}

export type HeatingInference =
  | "ingen" // probably no electric heating (apartment-level)
  | "fjarrvarme" // bills consistent with non-electric heating + base load
  | "varmepump" // moderate-high bill — heat pump usage
  | "elvarme"; // very high bill — direkt-el or large house

export function inferHeating(monthlyBill: number): HeatingInference {
  if (monthlyBill < 1000) return "ingen";
  if (monthlyBill < 1800) return "fjarrvarme";
  if (monthlyBill < 3000) return "varmepump";
  return "elvarme";
}

/**
 * Where a bill sits among Swedish villaägare. Used to anchor the
 * "we know what your situation looks like" framing without claiming
 * unrealistic precision. Coarse buckets only.
 */
export type BillTier = "lag" | "medel" | "hog" | "mycket-hog";

export function billTier(monthlyBill: number): BillTier {
  if (monthlyBill < 1500) return "lag";
  if (monthlyBill < 2500) return "medel";
  if (monthlyBill < 4000) return "hog";
  return "mycket-hog";
}

export function billTierLabel(tier: BillTier): string {
  switch (tier) {
    case "lag":
      return "den lägre tredjedelen för svenska villor";
    case "medel":
      return "ungefär snittet för en svensk villa";
    case "hog":
      return "den högre tredjedelen för svenska villor";
    case "mycket-hog":
      return "topp 10 % bland svenska villaägare";
  }
}

export function heatingNote(heating: HeatingInference): string | null {
  switch (heating) {
    case "ingen":
      return null;
    case "fjarrvarme":
      return "Räkningen tyder på att huset värms med fjärrvärme eller liknande — solpaneler kapar då elkostnaden för hushållsel, belysning och vitvaror.";
    case "varmepump":
      return "Räkningen tyder på att huset värms med en värmepump — där gör solpaneler ovanligt mycket nytta, eftersom värmepumpen drar mest när solen jobbar som hårdast.";
    case "elvarme":
      return "Räkningen tyder på direktverkande el eller liknande elvärme — det är där solpaneler gör allra mest nytta, eftersom du både slipper en tung årsräkning och kan ladda batteriet billigt under sommaren.";
  }
}
