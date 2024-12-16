import { NextResponse, NextRequest } from 'next/server';
import { getPublicClient, getSpenderWalletClient } from '../lib/spender';
import {
  spendPermissionManagerAbi,
  spendPermissionManagerAddress,
} from '../lib/abi/SpendPermissionManager';

export async function POST(request: NextRequest) {
  const spenderBundlerClient = await getSpenderWalletClient();
  const publicClient = await getPublicClient();

  try {
    const body = await request.json();
    const { spendPermission, signature } = body;

    const approvalTxnHash = await spenderBundlerClient.writeContract({
      address: spendPermissionManagerAddress,
      abi: spendPermissionManagerAbi,
      functionName: 'approveWithSignature',
      args: [spendPermission, signature],
    });

    const approvalReceipt = await publicClient.waitForTransactionReceipt({
      hash: approvalTxnHash,
    });

    const spendTxnHash = await spenderBundlerClient.writeContract({
      address: spendPermissionManagerAddress,
      abi: spendPermissionManagerAbi,
      functionName: 'spend',
      args: [spendPermission, BigInt(1)],
    });

    const spendReceipt = await publicClient.waitForTransactionReceipt({
      hash: spendTxnHash,
    });

    return NextResponse.json({
      status: spendReceipt.status ? 'success' : 'failure',
      approvalStatus: approvalReceipt.status ? 'success' : 'failure',
      transactionHash: spendReceipt.transactionHash,
      transactionUrl: `https://basescan.org/tx/${spendReceipt.transactionHash}`,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to approve spend permission' },
      { status: 500 }
    );
  }
}
