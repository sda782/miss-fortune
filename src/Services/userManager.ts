import { getAccountIdsByName } from "./Api";
import { setParams } from "./utils";
import type { account } from "../Models/account";

export const searchUser = async (username: string): Promise<account> => {
    const acc = await getAccountIdsByName(username);
    setParams("name", username)
    return acc
};
