import { IBluffMove } from "../gameEngine/IGameStateTypes";
import { INextMoveProps, IPlayerAdapter } from "./IPlayerAdapter";


export type IPlayerAdapterNextMoveProps = INextMoveProps & { playerInputCallback: (value: IBluffMove | PromiseLike<IBluffMove>) => void }

export type FPlayerMoveProviderCallback = (props: IPlayerAdapterNextMoveProps) => void

export class PlayerAdapter implements IPlayerAdapter {

    public constructor(private playerInputProviderCallback: FPlayerMoveProviderCallback) { }

    public async init(): Promise<void> { }

    public async nextMove(props: INextMoveProps): Promise<IBluffMove> {
        return new Promise((resolve, reject) => {
            //delegate outside
            this.playerInputProviderCallback({ ...props, playerInputCallback: resolve })
        });
    }

}