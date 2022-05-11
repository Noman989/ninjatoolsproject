import { ethers, utils } from "ethers";

const getProvider = (chain: "mainnet" | "ropsten") => {
  const INFURA_ID = "051c129edf6b4cf386619981ddc8bce4";

  return new ethers.providers.JsonRpcProvider(
    `https://${chain}.infura.io/v3/${INFURA_ID}`
  );
};

const ERC721_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function mintItem(address minter, string memory tokenURI, uint nft_price) public onlyOwner returns (uint256)",
  "function balanceOf(address owner) external view returns (uint256 balance)",
  "function getNFTS(address owner) public view returns (uint256[] memory)",
  "function tokenURI(uint256 tokenId) external view returns (string memory)",
  "function getPrice(uint256 tokenId) public view returns (uint256)",
  "function buy(uint256 tokenId) public payable",
];

const CONTRACT_ADDRESS = "0x039e184dB467Cb8Dc08FE685Ff4A014A17E550CC";

const getContractInfo = async () => {
  const provider = getProvider("ropsten");

  const contract = new ethers.Contract(CONTRACT_ADDRESS, ERC721_ABI, provider);
  const name = await contract.name();
  const symbol = await contract.symbol();

  const resData = {
    name,
    symbol,
  };

  console.log(resData);
  return resData;
};

const mintItem = async (
  minter: string,
  tokenURI: string,
  nft_price: string
) => {
  // const provider = getProvider("ropsten");
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ERC721_ABI, signer);

    const id = await contract.mintItem(
      minter,
      tokenURI,
      ethers.utils.parseEther(nft_price)
    );

    console.log(id.toString());
    return id;
  }
};

const getNFT_IDS = async (address: string) => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ERC721_ABI,
      provider
    );

    const myIds = await contract.getNFTS(address);
    console.log(myIds.toString());
    return myIds.toString();
  }
};

const getNFT_URI = async (tokenID: number) => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ERC721_ABI,
      provider
    );

    const uri = await contract.tokenURI(tokenID);
    return uri;
  }
};

const getPrice = async (tokenID: number) => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ERC721_ABI,
      provider
    );

    const price = await contract.getPrice(tokenID);
    return ethers.utils.formatEther(price);
  }
};

const buyNFT = async (tokenID: number, price: `${number}`) => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ERC721_ABI, signer);
    // const tx = await contract.estimateGas.buy(tokenID);
    // console.log("ESTIMATE GAS ", tx);
    const tx = await contract.buy(tokenID, {
      gasPrice: utils.parseUnits("1000", "gwei"),
      gasLimit: "100000",
      value: utils.parseEther(price),
    });
    return tx;
  }
};

export {
  getProvider,
  getContractInfo,
  mintItem,
  getNFT_IDS,
  getNFT_URI,
  getPrice,
  buyNFT,
};
