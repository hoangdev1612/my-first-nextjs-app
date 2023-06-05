import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";

export default function SearchSideBar({
  locations,
  cuisines,
  searchParams,
}: {
  locations: Location[];
  cuisines: Cuisine[];
  searchParams: { city?: string; cuisine?: string; price?: PRICE };
}) {
  const prices = [
    { price: PRICE.CHEAP, label: "$" },
    { price: PRICE.REGULAR, label: "$$" },
    { price: PRICE.EXPENSIVE, label: "$$$" },
  ];

  return (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {locations.map((item) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                city: item.name,
              },
            }}
            key={item.id}
            className="font-light capitalize text-reg"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((item) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                cuisine: item.name,
              },
            }}
            key={item.id}
            className="font-light capitalize text-reg"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map(({ price, label }) => (
            <Link
              key={label}
              href={{
                pathname: "/search",
                query: {
                  ...searchParams,
                  price,
                },
              }}
              className="border w-full text-reg font-light rounded-l p-2"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
