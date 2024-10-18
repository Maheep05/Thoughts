import { memo } from "react";

const Quote = memo(() => {
  return (
    <div className="flex  justify-center items-center  text-black bg-slate-200 h-screen w-1/2">
      <div className="flex flex-col gap-4">
        <div className="max-w-2xl flex justify-start ">
          <h1 className="font-bold text-3xl text-black">
            "The Customer service I recieved was exceptional. The support team
            went above and beyond to address my concerns."
          </h1>
        </div>
        <div className=" flex flex-col items-start justify-start">
          <h2 className="font-semibold text-xl text-black">Jules Winnfield</h2>
          <h3 className="font-medium text-md text-gray-500">CEO,Acme Inc</h3>
        </div>
      </div>
    </div>
  );
});

export default Quote;
