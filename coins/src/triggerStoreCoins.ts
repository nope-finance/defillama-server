import { wrapScheduledLambda } from "./utils/shared/wrap";
import invokeLambda from "./utils/shared/invokeLambda";
import adapters from "./adapters/index";

function shuffleArray(array: number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const step = 3;
const handler = async () => {
  const adaptersArray = Object.entries(adapters);
  const protocolIndexes: number[] = Array.from(
    Array(adaptersArray.length).keys()
  );
  shuffleArray(protocolIndexes);
  for (let i = 0; i < adaptersArray.length; i += step) {
    const event = {
      protocolIndexes: protocolIndexes.slice(i, i + step)
    };
    await invokeLambda(`defillama-prod-storeDefiCoins`, event);
  }
};

export default wrapScheduledLambda(handler);
