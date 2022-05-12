import Gun from "gun";

export const gun = new Gun(["https://ninjatoolsbackend.herokuapp.com:12981/"]);

export const addToMarket = (
  setIsOnMarket: React.Dispatch<React.SetStateAction<boolean>>,
  tokenId: `${number}`
) => {
  const nft_market_list = gun.get("market").get(`market_list`);
  nft_market_list.once((val) => {
    const strItemList: string = val;
    const nft_market_list_array = strItemList.split(",");
    nft_market_list_array.push(tokenId);
    const filteredArray = nft_market_list_array.filter((n) => n !== "");
    const duplClearedArray = filteredArray.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    nft_market_list.put(duplClearedArray.join(","));
    setIsOnMarket(true);
    //   market_setNfts(duplClearedArray);
    nft_market_list.once(console.log);
  });
};

export const removeFromMarket = (
  setIsOnMarket: React.Dispatch<React.SetStateAction<boolean>>,
  tokenId: `${number}`
) => {
  const nft_market_list = gun.get("market").get(`market_list`);
  nft_market_list.once((val) => {
    const strItemList: string = val;
    const nft_market_list_array = strItemList.split(",");
    const new_nft_market_list_array = nft_market_list_array.filter(
      (n: string) => {
        if (n !== tokenId && typeof parseInt(n) === "number" && n !== "")
          return parseInt(n);
      }
    );
    const duplClearedArray = new_nft_market_list_array.filter(
      (value, index, self) => {
        return self.indexOf(value) === index;
      }
    );
    nft_market_list.put(duplClearedArray.join(","));
    setIsOnMarket(false);
    //   market_setNfts(duplClearedArray);
    nft_market_list.once(console.log);
  });
};

