import { IBluffMove } from "../gameEngine/IGameStateTypes";
import { utils } from "../utils/utils";
import { INextMoveProps, IPlayerAdapter } from "./IPlayerAdapter";

export class NaiveAIAdapter implements IPlayerAdapter {

    public async init(): Promise<void> {

    }

    public async nextMove({ boardState, gameState }: INextMoveProps): Promise<IBluffMove> {
        await utils.asyncWait(Math.random() * 1000);
        if (boardState.bidHistory.length > 0 && Math.random() > 0.7) {
            return { type: 'challenge' }
        }
        return {
            type: 'bid',
            bid: {
                playerIdx: gameState.activePlayerIdx,
                guessedCount: utils.getRandomInt(1, 5),
                pickedDice: utils.getRandomInt(2, 6)
            }
        }
    }

}