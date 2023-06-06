import Header from "./components/layout/Header";

const Loading = () => {
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {[...Array(12)].map((index) => (
          <div
            key={index}
            className="animation-pulse bg-slate-200 w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer"
          ></div>
        ))}
      </div>
    </main>
  );
};

export default Loading;
