import type { TransferErrorType, TransferError } from 'telemetry/types';
import {
  ERR_INSUFFICIENT_ALLOWANCE,
  //ERR_SWAP_FAILED,
  ERR_INSUFFICIENT_GAS,
  ERR_TIMEOUT,
  ERR_UNKNOWN,
  ERR_USER_REJECTED,
} from 'telemetry/types';
import { InsufficientFundsForGasError } from 'sdklegacy';
import { Chain } from '@wormhole-foundation/sdk';
//import { SWAP_ERROR } from 'routes/porticoBridge/consts';

// TODO SDKV2
// attempt to capture errors using regex
export const INSUFFICIENT_ALLOWANCE_REGEX = /insufficient token allowance/im;
export const USER_REJECTED_REGEX = new RegExp(
  'user rejected|rejected the request|rejected from user|user cancel|aborted by user',
  'mi',
);

export function interpretTransferError(
  e: any,
  chain: Chain,
): [string, TransferError] {
  // Fall-back values
  let uiErrorMessage = 'Error with transfer, please try again';
  let internalErrorCode: TransferErrorType = ERR_UNKNOWN;

  if (e.message) {
    if (INSUFFICIENT_ALLOWANCE_REGEX.test(e?.message)) {
      uiErrorMessage = 'Error with transfer, please try again';
      internalErrorCode = ERR_INSUFFICIENT_ALLOWANCE;
    } else if (e.name === 'TransactionExpiredTimeoutError') {
      // Solana timeout
      uiErrorMessage = 'Transfer timed out, please try again';
      internalErrorCode = ERR_TIMEOUT;
    } else if (InsufficientFundsForGasError.MESSAGE_REGEX.test(e?.message)) {
      uiErrorMessage = e.message;
      internalErrorCode = ERR_INSUFFICIENT_GAS;
    } else if (USER_REJECTED_REGEX.test(e?.message)) {
      uiErrorMessage = 'Transfer rejected in wallet, please try again';
      internalErrorCode = ERR_USER_REJECTED;
      /* TODO SDKV2
    } else if (e.message === SWAP_ERROR) {
      uiErrorMessage = SWAP_ERROR;
      internalErrorCode = ERR_SWAP_FAILED;
      */
    }
  }

  return [uiErrorMessage, { type: internalErrorCode, original: e }];
}
