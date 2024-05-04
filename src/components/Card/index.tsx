import Image from "next/image";
import { useRouter } from "next/navigation";

interface CardProps {
  flagUrl: string;
  name: string;
  translatedName: string;
  alt: string;
}

export const Card = ({ alt, flagUrl, name, translatedName }: CardProps) => {
  const router = useRouter();

  const redirectToCountry = () => {
    router.push(`/${name}`);
  };

  return (
    <div className="bg-white rounded-3xl p-2 flex flex-col items-center w-60 h-60 cursor-pointer hover:scale-105 hover:shadow-md">
      <div className="w-full min-h-40 relative" onClick={redirectToCountry}>
        <Image
          alt={alt}
          src={flagUrl}
          fill
          priority
          className="rounded-2xl border-2 border-gray-200 object-cover object-center"
        />
      </div>
      <h2 className="text-lg font-bold text-center">{translatedName}</h2>
    </div>
  );
};
