import { Countries, Country } from "@/types/country";

export function removeCurrentCountry(
  currentCountry: Country,
  listOfCountries: Countries
) {
  return listOfCountries.filter(
    (country) => country.name.official !== currentCountry.name.official
  );
}
