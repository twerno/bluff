import { BluffStateEngine } from "../gameEngine/BluffStateEngine";
import { bluffStateEngineTransitions } from "../gameEngine/BluffStateEngineTransitions";
import { FStateTransitionCallback } from "../gameEngine/BluffStateEngineTransitionTypes";
import { gameEngineHelper } from "../gameEngine/GameEngineHelper";
import { IGameOptions } from "../gameEngine/IGameStateTypes";

export class AutoGameRunner {
    private engine: BluffStateEngine;

    public constructor(
        private readonly options: Readonly<IGameOptions>,
        stateChangeCallback: FStateTransitionCallback) {
        this.engine = new BluffStateEngine(options, bluffStateEngineTransitions, stateChangeCallback);
    }

    public async start() {
        if (this.engine.getGameState().state !== "NEW_GAME") {
            throw new Error(`Gra została już rozpoczęta`);
        }

        const playerAdapterInitPromises = this.options.players.map(
            playerAdapter => playerAdapter.init()
        );
        await Promise.all(playerAdapterInitPromises);

        while (this.engine.getGameState().state !== "END_GAME") {
            await this.playRound();
        }

        const winnerPlayerIdx = this.engine.getGameState().playerDicesCount.findIndex(v => v > 0);
        return winnerPlayerIdx;
    }

    private async playRound() {
        this.engine.changeState("NEW_ROUND");
        this.engine.changeState("WAITING_FOR_PLAYER_MOVE");

        while (this.engine.getGameState().state === "WAITING_FOR_PLAYER_MOVE") {
            const { activePlayerIdx } = this.engine.getGameState();
            const playerAdapter = this.options.players[activePlayerIdx];

            const move = await playerAdapter.nextMove({
                gameState: this.engine.getGameState(),
                boardState: this.engine.getBoardState(),
                gameOptions: this.options
            });
            if (move.type === "bid") {
                this.engine.changeState("PLAYER_MOVE_BID", move);
                this.engine.changeState("WAITING_FOR_PLAYER_MOVE");
            } else {
                this.engine.changeState("PLAYER_MOVE_CHALLENGE", move);
                this.engine.changeState("END_ROUND");
            }
        }

        if (gameEngineHelper.isGameFinished(this.engine.getGameState())) {
            this.engine.changeState("END_GAME");
        }
    }

}