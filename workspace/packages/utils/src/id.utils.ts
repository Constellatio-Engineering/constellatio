// TODO: Check if uuid can be replaced with a more lightweight package like nanoid
import { v4 as uuidV4 } from "uuid";

export const getRandomUuid = (): string => uuidV4();
