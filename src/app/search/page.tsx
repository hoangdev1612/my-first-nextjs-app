import Link from "next/link";
import NavBar from "../components/layout/NavBar";
import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard from "./components/RestaurantCard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const fetchRestaurantByCity = async (city: string | undefined) => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    Cuisine: true,
    slug: true,
    location: true,
    price: true,
  };
  if (!city) return await prisma.restaurant.findMany({ select });
  const restaurant = await prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city.toLowerCase(),
        },
      },
    },
    select,
  });
  return restaurant;
};

const fetchLocations = async () => {};

const fetchCuisines = async () => {};

const Search = async ({ searchParams }: { searchParams: { city: string } }) => {
  const restaurants = await fetchRestaurantByCity(searchParams.city);

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar />
        <div className="w-5/6">
          {restaurants.length ? (
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <p>Sorry, we found no restaurants</p>
          )}
        </div>
      </div>
    </>
  );
};
export default Search;
