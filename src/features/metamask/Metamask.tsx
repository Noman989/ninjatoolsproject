import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setAddress, selectAddress } from "./metamaskSlice";

import { connectMetamask } from "./metamaskAPI";
export const Metamask = () => {
  const address = useAppSelector(selectAddress);
  const dispatch = useAppDispatch();
  console.log("METAMASK.TSX", address);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window.ethereum !== "undefined") {
        if (window.ethereum?.selectedAddress) {
          dispatch(setAddress(window.ethereum.selectedAddress as string));
          clearInterval(interval);
        }
      }
    }, 1000);
    console.log(1);
  }, []);

  React.useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
        // if (window.ethereum?.selectedAddress) {
        //   dispatch(
        //     setAddress(window.ethereum?.selectedAddress as string | undefined)
        //   );
        // } else {
        //   window.location.reload();
        // }
      });
    }

    return () => {};
  }, []);

  return (
    <div className="text-center mb-12">
      <button
        onClick={() => {
          !address && connectMetamask();
        }}
        className="mb-12 text-transparent bg-clip-text text-xl px-6 py-3 border-4 border-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
      >
        <div className="flex gap-4">
          {address ? "Connected" : "Connect Wallet"}
          <img
            src="https://docs.metamask.io/metamask-fox.svg"
            alt="meta mask"
          ></img>
        </div>
      </button>
      <div className="text-white select-all">{address}</div>
    </div>
  );
};
