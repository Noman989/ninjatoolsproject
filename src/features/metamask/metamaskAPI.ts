import {
    setAddress
} from './metamaskSlice';
import { store } from '../../app/store';

export const connectMetamask = () => {
    (async () => {
    if (typeof window.ethereum !== "undefined") {
        try {
            await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            console.log("Before Dispatch", window.ethereum.selectedAddress);
            store.dispatch(setAddress(window.ethereum.selectedAddress as string))
        } catch (error) {
            console.error(error);
        }
    }
  })();
};
