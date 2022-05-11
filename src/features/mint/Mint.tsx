import React from "react";
import { mintItem } from "../../app/ethers";

interface FormInputProps {
  placeholder?: string;
  type?: string;
  val?: string | number;
  setVal: React.Dispatch<React.SetStateAction<string>>;
}
const FormInput: React.FC<FormInputProps> = ({
  placeholder,
  setVal,
  type,
  val,
}: FormInputProps) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      value={val}
      onChange={(e) => {
        setVal(e.currentTarget.value);
      }}
      className="py-4 px-8 appearance-none"
    ></input>
  );
};

export const Mint = () => {
  const [uri, setURI] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [minting, setMinting] = React.useState(false);

  const createNFT = () => {
    (async () => {
      if (typeof window.ethereum !== "undefined") {
        if (window.ethereum.selectedAddress) {
          const tx = await mintItem(
            window.ethereum.selectedAddress,
            uri,
            price
          );
          console.log(tx);
          setMinting(true);
          await tx.wait();
          setMinting(false);
        }
      }
    })();
  };

  return (
    <div className="flex justify-center w-full px-2 md:px-12 bg-cyan-600 mb-12">
      <div className="flex flex-col items-center justify-center w-full max-w-[989px] h-[500px] border-4 border-white bg-purple-600">
        <div>
          <h1 className="text-center text-4xl text-white p-6">Mint NFT</h1>
        </div>
        <div className="flex justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createNFT();
            }}
            className="flex flex-col gap-4"
          >
            <FormInput
              setVal={setURI}
              val={uri}
              type="text"
              placeholder="URI"
            ></FormInput>
            <FormInput
              setVal={setPrice}
              val={price}
              type="number"
              placeholder="Price in Ethereum"
            ></FormInput>
            <input
              disabled={minting}
              type={"submit"}
              value={minting ? 'Minting ...' : 'Mint'}
              className="text-white text-xl px-14 py-3 border-4 border-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
            ></input>
            {minting && (
              <p>Minting can take up to 30 seconds ...</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Mint;
