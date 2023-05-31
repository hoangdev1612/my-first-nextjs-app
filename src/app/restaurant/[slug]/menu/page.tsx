import RestaurantNavBar from "../components/RestaurantNavBar";
import Menu from "../components/Menu";
import RestaurantLayout from "../components/Layout";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const fetchRestaurantItems = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });
  if (!restaurant) {
    throw new Error();
  }
  return restaurant.items;
};

const RestaurantMenu = async ({ params }: { params: { slug: string } }) => {
  const menu = await fetchRestaurantItems(params.slug);
  return (
    <>
      <RestaurantLayout params={{ slug: params.slug }}>
        <div className="bg-white w-[100%] rounded p-3 shadow">
          <RestaurantNavBar slug={params.slug} />
          <Menu menu={menu} />
        </div>
      </RestaurantLayout>
    </>
  );
};
export default RestaurantMenu;
