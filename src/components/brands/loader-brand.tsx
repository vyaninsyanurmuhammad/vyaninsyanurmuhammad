import BrandIcon from "../icons/brand-icon";

const LoaderBrand = () => (
  <div className="flex h-svh w-svw flex-col items-center justify-center gap-2.5">
    <BrandIcon className="h-6 w-6 text-lime-400" />
    <span>Loading...</span>
  </div>
);

export default LoaderBrand;
