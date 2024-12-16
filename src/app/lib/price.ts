import { createPublicClient, http, formatUnits } from 'viem';
import { baseSepolia } from 'viem/chains';
import {
  chainlinkEthPriceFeedAddress,
  chainlinkEthPriceFeedAbi,
} from './abi/ChainlinkEthPriceFeed';

export async function getPrice(): Promise<number> {
  const client = createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });

  const price = Number(
    await client.readContract({
      address: chainlinkEthPriceFeedAddress,
      abi: chainlinkEthPriceFeedAbi,
      functionName: 'latestAnswer',
    })
  );

  return Number(formatUnits(BigInt(price), 8));
}
