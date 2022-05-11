import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNFT_IDS, getNFT_URI, getPrice, buyNFT } from "../../app/ethers";
import { selectNfts, setNfts } from "./collectionSlice";
import { gun, addToMarket, removeFromMarket } from "../../app/gun";

interface CardProps {
  tokenId: `${number}`;
  inMarket?: boolean;
}
export const Card: React.FC<CardProps> = ({ tokenId, inMarket }) => {
  const nfts = useSelector(selectNfts);
  const [tokenUri, setTokenURI] = React.useState("");
  const [price, setPrice] = React.useState<string | undefined>("");
  const [isOnMarket, setIsOnMarket] = React.useState(false);
  const [isUsers, setIsUsers] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      setTokenURI(await getNFT_URI(parseInt(tokenId)));
      setPrice(await getPrice(parseInt(tokenId)));
    })();
  }, []);

  React.useEffect(() => {
    // Get Is On Market Value from GUN-DB
    gun
      .get("market")
      .get("market_list")
      .once((val) => {
        const strVal: string = val;
        console.log("GUNDB", strVal);
        if (strVal.split(",").find((id) => id === tokenId)) {
          setIsOnMarket(true);
        } else setIsOnMarket(false);
      });
  }, []);

  React.useEffect(() => {
    if (inMarket) {
      nfts.includes(tokenId) && setIsUsers(true);
    }
  }, []);

  return (
    <div className="flex-shrink-0 w-[300px] h-[300px] border-4 border-white ">
      <div
        style={{ backgroundImage: `url(${tokenUri})` }}
        className="mb-3 bg-red-100 bg-contain bg-no-repeat bg-center w-full h-[192px]"
      ></div>
      <p className="text-white ">id: {tokenId}</p>
      <p className="text-white ">price: {price} ether</p>
      {/* <p className="text-white ">price: {isOnMarket && 'true'} ether</p> */}
      <div className="text-right">
        {inMarket ? (
          <button
            disabled={isUsers}
            onClick={() => {
              (async () => {
                const tx = await buyNFT(parseInt(tokenId), price as `${number}`)
                console.log(tx);
              })()
            }}
            className={`text-white text-base mx-2 px-4 border-2 border-white ${
              isUsers
                ? "bg-slate-500 hover:bg-slate-500"
                : "bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 disabled:bg-slate-500 disabled:hover:bg-slate-500"
            } `}
          >
            {isUsers ? "My NFT" : "Buy"}
          </button>
        ) : (
          <button
            onClick={() => {
              console.log(isOnMarket);
              isOnMarket
                ? removeFromMarket(setIsOnMarket, tokenId)
                : addToMarket(setIsOnMarket, tokenId);
            }}
            className={`text-transparent bg-clip-text text-base mx-2 px-4 border-2 border-white bg-gradient-to-r ${
              !isOnMarket
                ? "from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
                : "hover:from-green-400 hover:to-blue-500 from-pink-500 to-yellow-500"
            } `}
          >
            {!isOnMarket ? "Place On Market" : "Remove From Market"}
          </button>
        )}
      </div>
    </div>
  );
};

export const Collection = () => {
  const dipatch = useDispatch();
  const nfts = useSelector(selectNfts);

  const getTokenIds = () => {
    (() => {
      const interval = setInterval(() => {
        if (typeof window.ethereum !== "undefined") {
          if (window.ethereum?.selectedAddress) {
            (async () => {
              const tokenIds = await getNFT_IDS(
                window.ethereum?.selectedAddress as string
              );
              const tokenIdsArray: string[] = tokenIds.split(",");
              console.log("TOKEN ARRAY ", tokenIdsArray);
              if (tokenIdsArray.length > 0 && tokenIdsArray[0] !== "") {
                dipatch(setNfts(tokenIdsArray));
              }
            })()
            clearInterval(interval);
          }
        }
      }, 1300);
    })();
  };

  React.useEffect(() => {
    getTokenIds();
  }, []);

  return (
    <div className="flex justify-center items-center flex-wrap gap-12 text-white w-full p-12">
      {nfts.map((val) => (
        <Card key={val} tokenId={val as `${number}`} />
      ))}
    </div>
  );
};
