import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMarketList, setMarketList } from "./marketSlice";
import { gun } from "../../app/gun";
import { Card } from '../collection/Collection'


export const Market = () => {
  const market_list = useSelector(selectMarketList);
  const dispatch = useDispatch();

  React.useEffect(() => {
    gun
      .get('market')
      .get('market_list')
      .once((list) => {
        dispatch(setMarketList((list as string).split(',')))
      })

  }, []);

  return (
    <div className="flex justify-center items-center flex-wrap gap-12 text-white w-full p-12">
      {market_list.map((val) => (
        <Card inMarket key={val} tokenId={val as `${number}`}></Card>
      ))}
    </div>
  );
};
