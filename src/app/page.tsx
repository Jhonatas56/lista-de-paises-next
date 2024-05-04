"use client";

import { Card } from "@/components/Card";
import { Loader } from "@/components/Loader";
import { Countries, Country } from "@/types/country";
import { useEffect, useState } from "react";

export default function Home() {
  const [countries, setCountries] = useState<Countries>([]);

  const getCountries = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();

    const organizedData = data.sort((a: Country, b: Country) => {
      if (a.translations.por.common < b.translations.por.common) {
        return -1;
      }
      if (a.translations.por.common > b.translations.por.common) {
        return 1;
      }
      return 0;
    });

    setCountries(organizedData);
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <main className="flex flex-col items-center justify-between py-10 max-w-[1920px] mx-auto">
      <div className="flex flex-row flex-wrap gap-4 px-10 justify-center">
        {countries.length > 0 ? (
          countries.map((item) => {
            return (
              <Card
                key={item.cca3}
                alt={item.flags.alt || item.name.common}
                flagUrl={item.flags.svg}
                translatedName={
                  item.translations.por.common || item.name.common
                }
                name={item.name.common}
              />
            );
          })
        ) : (
          <div className="my-11">
            <Loader />
          </div>
        )}
      </div>
    </main>
  );
}
