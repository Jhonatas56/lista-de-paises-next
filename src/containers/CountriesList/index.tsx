import { Card } from "@/components/Card";
import { Countries } from "@/types/country";

interface CountriesListProps {
  countries: Countries;
  title: string;
}

export const CountriesList = ({ countries, title }: CountriesListProps) => {
  return (
    <div className="flex flex-col gap-4 mt-7 text-center mb-8">
      <h2 className="font-bold text-3xl text-gray-800">{title}</h2>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {countries.map((item) => (
          <Card
            key={item.cca3}
            alt={item.flags.alt || item.name.common}
            flagUrl={item.flags.svg}
            translatedName={item.translations.por.common || item.name.common}
            name={item.name.common}
          />
        ))}
      </div>
    </div>
  );
};
