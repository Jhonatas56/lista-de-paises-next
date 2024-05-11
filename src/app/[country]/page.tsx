"use client";

import { useEffect, useState } from "react";
import { Countries, Country } from "@/types/country";
import { CountryInformation } from "@/components/CountryInformation";
import { Loader } from "@/components/Loader";
import { CountriesList } from "@/containers/CountriesList";
import { removeCurrentCountry } from "@/utils/removeCurrentCountry";

export default function CountryPage({
  params,
}: {
  params: { country: string };
}) {
  const [countryData, setCountryData] = useState<Country>();
  const [borders, setBorders] = useState<Countries>([]);
  const [languages, setLanguages] = useState<Countries>([]);

  useEffect(() => {
    const getCountry = async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${params.country}?fullText=true`
      );
      const data = await response.json();

      setCountryData(data[0]);
    };

    getCountry();
  }, [params.country]);

  useEffect(() => {
    const getBorders = async () => {
      let requestUrl = `https://restcountries.com/v3.1/alpha?codes=`;

      countryData?.borders?.map((border) => (requestUrl += `${border},`));

      const response = await fetch(requestUrl);
      const resposeData: Countries = await response.json();
      setBorders(resposeData);
    };

    const getLanguages = async () => {
      const languagesIndexes = Object.keys(countryData?.languages || {});

      languagesIndexes.map(async (language) => {
        const response = await fetch(
          `https://restcountries.com/v3.1/lang/${language}`
        );
        const data = await response.json();

        const filteredData = countryData
          ? removeCurrentCountry(countryData, data)
          : data;

        setLanguages([...languages, ...filteredData]);
      });
    };
    countryData && getBorders();
    countryData && getLanguages();
  }, [countryData]);

  console.log(languages, "languages");

  return (
    <main className="flex flex-col items-center justify-between pt-4 max-w-[1920px] mx-auto">
      {countryData ? (
        <div className="flex flex-col gap-4 px-10 items-center justify-center">
          <h1 className="font-bold text-4xl text-gray-800 text-center mt-4">
            {countryData.translations.por.common || countryData.name.common}
          </h1>
          <CountryInformation data={countryData} />

          {borders.length > 0 && (
            <CountriesList
              countries={borders}
              title="Países que fazem fronteira"
            />
          )}

          {languages.length > 0 && (
            <CountriesList
              countries={languages}
              title="Países que falam o mesmo idioma"
            />
          )}
        </div>
      ) : (
        <div className="my-10">
          <Loader />
        </div>
      )}
    </main>
  );
}
