import RestaurantNavBar from "../components/RestaurantNavBar";
import Menu from "../components/Menu";
import RestaurantLayout from "../components/Layout";

const RestaurantMenu = () => {
  return (
    <>
      <RestaurantLayout>
        <div className="bg-white w-[100%] rounded p-3 shadow">
          <RestaurantNavBar />
          <Menu />
        </div>
      </RestaurantLayout>
    </>
  );
};
export default RestaurantMenu;