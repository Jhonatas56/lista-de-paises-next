import Image from "next/image";
import backIcon from "../../../public/backIcon.svg";
import { Country } from "@/types/country";
import { populationFormatter } from "@/utils/populationFormatter";

interface CountryInformationProps {
  data: Country;
}

export const CountryInformation = ({ data }: CountryInformationProps) => {
  const returnToLastPage = () => {
    history.back();
  };

  const languagesIndexes =
    data && data.languages ? Object.keys(data.languages) : [];

  return (
    <div className="flex flex-col gap-1 w-full md:w-[672px] lg:w-[840px]">
      <div
        className="flex gap-1 self-start cursor-pointer"
        onClick={returnToLastPage}
      >
        <Image
          src={backIcon}
          alt="Back to last page"
          width={24}
          height={24}
          priority
        />
        <p className="font-normal text-2xl text-gray-800">Voltar</p>
      </div>

      <div className="flex flex-col-reverse md:flex-row p-7 justify-between bg-white rounded-2xl gap-4">
        <div className="flex flex-col gap-2">
          <p>
            <b>🏙️ Capital: </b>
            {data.capital}
          </p>
          <p>
            <b>🗺️ Continente: </b>
            {data?.continents?.map((continent, idx) =>
              idx > 0 ? `, ${continent}` : continent
            )}
          </p>
          <p>
            <b>👪 População: </b>
            {populationFormatter(data.population)}
          </p>
          <p>
            <b>🗣️ Línguas faladas: </b>
            {languagesIndexes.length === 0 && "Sem dados de idiomas"}
          </p>
          <div className="flex gap-2 flex-wrap">
            {languagesIndexes.length > 0 &&
              languagesIndexes.map((language) => (
                <div
                  key={language}
                  className="bg-indigo-700 rounded-full px-3 w-fit"
                >
                  <p className="text-white">
                    {data && data.languages
                      ? data.languages[language as keyof typeof data.languages]
                      : null}
                  </p>
                </div>
              ))}
          </div>
        </div>

        <Image
          src={data?.flags?.svg}
          alt={data?.flags?.alt || "Country flag"}
          width={400}
          height={275}
          className="rounded-2xl"
          priority
        />
      </div>
    </div>
  );
};
