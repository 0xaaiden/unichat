// import { log } from "console";

type FunctionNames =
  | "cush_getV3Pool"|
  "cush_liveBlock"|
  "cush_search" |
  "cush_getPoolFees" 
  | "cush_poolLiquidity"
  | "cush_topTokens"
  | "cush_ordersForUser";

export const functions: {
  name: FunctionNames;
  description: string;
  parameters: object;
}[] = [
  {
    name: "cush_getV3Pool",
    description: "Get V3 pool snapshot address",
    parameters: {
      type: "object",
      properties: {
        target_pool: {
          type: "string",
          description: "Address of the pool",
        },
        block: {
          type: "number",
          description: "Block number to get price at",
        },
        numObs: {
          type: "number",
          description: "Number of observations to get",
        },
      },
      required: ["target_pool", "block", "numObs"],
    },
  },
  {
    //
    name: "cush_liveBlock",
    description: "Get the latest block number",
    // no parameters
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "cush_search",
    description: "Search for pool given a single token or  a pair",
    parameters: {
      type: "object",
      properties: {
        searchText: {
          type: "string",
          description: `Search text query given by users. For single match, accepted formats for search text are token names, symbols, token Address, pool Address. For pair match, must provide either a " ", "/", or "-" in between pair items`,
        },
      },
      required: ["searchText"],
    },
  },
  {
    name: "cush_poolLiquidity",
    description: "Get liquidity of a given pool at a given block",
    parameters: {
      type: "object",
      properties: {
        pool: {
          type: "string",
          description: "Address of the pool to get liquidity of",
        },
        block: {
          type: "number",
          description: "Block number to get liquidity at. ",
        },
      },
      required: ["pool", "block"],
    },
  },
  {
    name: "cush_getPoolFees",
    description: "Get 24H fees of a given pool",
    parameters: {
      type: "object",
      properties: {
        poolAddr: {
          type: "string",

          description: "Address of the pool to get fees of.",
        },
      },
      required: ["poolAddr"],
    },
  },

  {
    name: "cush_ordersForUser",
    description: "Get all swaps for a given user (address)",
    parameters: {
      type: "object",
      properties: {
        userAddr: {
          type: "string",
          description: "Address of the user to get swaps for.",
        },
      },
      required: ["userAddr"],
    },
  },
];

// Generate functions based on API endpoints
async function cush_getV3Pool(target_pool: string, block: number, numObs: number) {
  // Implement the logic to get V3 pool snapshot address based on the provided API endpoint
  //add method to payload, method name is cush_getV3Pool
  //add params to payload, params is an array of strings
  const payload = {
    jsonrpc: "2.0",
    method: "cush_getV3Pool",
    params: [target_pool, block],
    id: 1,
  };
  try {
    const response = await fetch("https://cush.uat.gfx.town/ethereum", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  // remove positions and ticks from result
  const { Positions, Ticks, ...rest } = result.result;
    // console.log("fetch result: ", rest);

  // return result
  return rest;
  
} catch (error) {
    // save error to log file
    console.log("error: ", payload, error);
    return error

  }

}

// get liveBlock
async function cush_liveBlock() {
  // Implement the logic to get live block based on the provided API endpoint
  const payload = {
    jsonrpc: "2.0",
    method: "cush_liveBlock",
    params: [],
    id: 1,
  };
  try {
    const response = await fetch("https://cush.uat.gfx.town/ethereum", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    // console.log("fetch result: ", result);
    return result;
  } catch (error) {
    console.log("error: ", payload, error);
    return error;
  }
}


async function cush_search(searchText: string) {
  const payload = {
    jsonrpc: "2.0",
    method: "cush_search",
    params: [searchText],
    id: 1,
  };
  try {
    const response = await fetch("https://cush.uat.gfx.town/ethereum", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log("fetch result: ", payload, result);
    return result.result;
  } catch (error) {
    
    console.log("error: ", payload, error);
    return error;

  }

}

async function cush_poolLiquidity(pool: string, block: number) {
  const payload = {
    jsonrpc: "2.0",
    method: "cush_poolLiquidity",

    params: [pool, block],
    id: 1,
  };
  try {
    const response = await fetch("https://cush.uat.gfx.town/ethereum", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const result = await response.json();
    // console.log("fetch result: ", result);
    return result.result;
  } catch (error) {
      console.log("error: ", payload, error);
      return error;
  }


}

async function cush_getPoolFees(poolAddr: string) {
  const payload = {
    jsonrpc: "2.0",

    method: "cush_getPoolFees",
    params: [poolAddr],
    id: 1,
  };
  try {
    const response = await fetch("https://cush.uat.gfx.town/ethereum", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    // console.log("fetch result: ", result);
    return result.result;
  } catch (error) { 

    console.log("error: ", payload, error);
    return error;
  }
}

async function cush_topTokens() {
  const payload = {
    jsonrpc: "2.0",
    method: "cush_topTokens",
    params: [[]],
    id: 1,
  };

  try {

    const response = await fetch("https://cush.uat.gfx.town/ethereum", {
      method: "POST",
      body: JSON.stringify(payload),

      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    // console.log("fetch result: ", result);
    return result.result;
  } catch (error) {
    console.log("error: ", payload, error);

    return error;

  }
}

async function cush_ordersForUser(userAddr: string) {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const payload = {
    jsonrpc: "2.0",
    method: "cush_marketOrdersForUser",
    params: [userAddr, oneWeekAgo.getTime(), now.getTime()],
    id: 1,
  };
  console.log("payload", payload)
  try {
    const response = await fetch("https://cush.uat.gfx.town/ethereum", {
      method: "POST",
      body: JSON.stringify(payload),

      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    // console.log("fetch result: ", result);
    return result.result;
  } catch (error) {
    console.log("error: ", payload, error);
    return error;
  }
}

async function cush_simulateV3Pool(
  target_pool: string,
  block: number,
  numObs: number,
) {
  // Implement the logic to simulate V3 pool based on the provided API endpoint
}

async function cush_getTokenAmounts(target_pool: string, block: number) {
  // Implement the logic to get token amounts in a pool at a given block based on the provided API endpoint
}

async function cush_getPositionByTokenId(tokenId: number) {
  // Implement the logic to get position by token ID based on the provided API endpoint
}

async function cush_getToken(token: string, block: number) {
  // Implement the logic to get token information based on the provided API endpoint
}

async function cush_getTokenLevel1(token: string, block: number) {
  // Implement the logic to get token level 1 information based on the provided API endpoint
}

async function cush_getTokensFromPoolAddress(addr: string) {
  // Implement the logic to get tokens from pool address based on the provided API endpoint
}

async function cush_getPoolsContainingToken(target_token: string) {
  // Implement the logic to get pools containing token based on the provided API endpoint
}

async function cush_getAllNewPositionsCreated(
  timestamp: number,
  lookback: number,
) {
  // Implement the logic to get all new positions created and show percentage change based on the provided API endpoint
}

async function cush_getAllNewTransactions(timestamp: number, lookback: number) {
  // Implement the logic to get all new transactions and show percentage change based on the provided API endpoint
}

async function cush_getNewPositionsCreatedByPool(
  pool_address: string,
  timestamp: number,
  lookback: number,
) {
  // Implement the logic to get new positions created by pool and show percentage change based on the provided API endpoint
}

async function cush_getNewTransactionsByPool(
  pool_address: string,
  timestamp: number,
  lookback: number,
) {
  // Implement the logic to get new transactions by pool and show percentage change based on the provided API endpoint
}
// Implement the other functions similarly

// Create a generic function that can be used to run any function
export async function runFunction(name: string, args: any) {
  switch (name) {
    case "cush_getV3Pool":
      return await cush_getV3Pool(
        args["target_pool"],
        args["block"],
        args["numObs"],
      );

    // Implement the other function cases similarly
    case "cush_liveBlock":
      return await cush_liveBlock();

    case "cush_search":
      return await cush_search(args["searchText"]);
    case "cush_getPoolFees":
      return await cush_getPoolFees(args["poolAddr"]);
    case "cush_topTokens":
      return await cush_topTokens();

    case "cush_ordersForUser":
      return await cush_ordersForUser(args["userAddr"]);

    default:
      return null;
  }
}
