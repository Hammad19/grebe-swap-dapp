import { PublicKey } from "@solana/web3.js";

const WRAPPED_SOL_MINT = new PublicKey(
  "So11111111111111111111111111111111111111112"
);
let TOKEN_PROGRAM_ID = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);


const SWAP_HOST_FEE_ADDRESS = process.env.REACT_APP_SWAP_HOST_FEE_ADDRESS
  ? new PublicKey(`${process.env.REACT_APP_SWAP_HOST_FEE_ADDRESS}`)
  : undefined;
const SWAP_PROGRAM_OWNER_FEE_ADDRESS = new PublicKey(
  "SeCbhUgwfifKUVc3Ut5Z7hRCRMsPyFr1Z4hyargXYYv"
);

console.debug(`Host address: ${SWAP_HOST_FEE_ADDRESS?.toBase58()}`);
console.debug(`Owner address: ${SWAP_PROGRAM_OWNER_FEE_ADDRESS?.toBase58()}`);

// legacy pools are used to show users contributions in those pools to allow for withdrawals of funds
const PROGRAM_IDS = [
  {
    name: "mainnet-beta",
    swap: () => ({
      current: new PublicKey("9qvG1zUp8xF1Bi4m6UdRNby1BAAuaDrUxSpv4CmRRMjL"),
      legacy: [],
    }),
  },
  {
    name: "testnet",
    swap: () => ({
      current: new PublicKey("2n2dsFSgmPcZ8jkmBZLGUM2nzuFqcBGQ3JEEj6RJJcEg"),
      legacy: [
        new PublicKey("9tdctNJuFsYZ6VrKfKEuwwbPp4SFdFw3jYBZU8QUtzeX"),
        new PublicKey("CrRvVBS4Hmj47TPU3cMukurpmCUYUrdHYxTQBxncBGqw"),
      ],
    }),
  },
  {
    name: "devnet",
    swap: () => ({
      current: new PublicKey("BSfTAcBdqmvX5iE2PW88WFNNp2DHhLUaBKk5WrnxVkcJ"),
      legacy: [
        new PublicKey("H1E1G7eD5Rrcy43xvDxXCsjkRggz7MWNMLGJ8YNzJ8PM"),
        new PublicKey("CMoteLxSPVPoc7Drcggf3QPg3ue8WPpxYyZTg77UGqHo"),
        new PublicKey("EEuPz4iZA5reBUeZj6x1VzoiHfYeHMppSCnHZasRFhYo"),
      ],
    }),
  },
  {
    name: "localnet",
    swap: () => ({
      current: new PublicKey("5rdpyt5iGfr68qt28hkefcFyF4WtyhTwqKDmHSBG8GZx"),
      legacy: [],
    }),
  },
];
let SWAP_PROGRAM_ID;
let SWAP_PROGRAM_LEGACY_IDS
const setProgramIds = (envName) => {
  let instance = PROGRAM_IDS.find((env) => env.name === envName);
  if (!instance) {
    return;
  }

  let swap = instance.swap();

  SWAP_PROGRAM_ID = swap.current;
  SWAP_PROGRAM_LEGACY_IDS = swap.legacy;
};

const programIds = () => {
  return {
    token: TOKEN_PROGRAM_ID,
    swap: SWAP_PROGRAM_ID,
    swap_legacy: SWAP_PROGRAM_LEGACY_IDS,
  };
};
