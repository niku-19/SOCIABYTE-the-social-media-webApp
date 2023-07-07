import { MoonLoader } from "react-spinners";
import { useLoader } from "../../Context/LoaderContext";

const Loader = () => {
  const { loader } = useLoader();
  return (
    <>
      <div className="loader__container">
        <MoonLoader
          color="#000"
          cssOverride={{}}
          loading
          size={80}
          speedMultiplier={0.3}
        />
      </div>
      <h1
        style={{
          color: "coral",
        }}
      >
        {loader.loaderText}
      </h1>
    </>
  );
};

export default Loader;
