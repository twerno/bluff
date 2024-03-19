import { IPlayerAdapterNextMoveProps, PlayerAdapter } from "@bluff/game";
import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'readline/promises';

export class NodePlayerAdapter extends PlayerAdapter {

    public constructor() {
        super(userInputProvider)
    }
}

async function userInputProvider({ gameOptions, gameState, playerInputCallback }: IPlayerAdapterNextMoveProps) {
    const readLineInterface = readline.createInterface({ input, output });

    const moveType = await readNumber(readLineInterface, "Ruch gracza:\n1 - bid\n2 - challenge\n>>", [1, 2]);

    if (moveType === 1) {
        const pickedDice = await readNumber(readLineInterface, `Wybierz kość:\n>>`, [2, gameOptions.diceType]);
        const guessedCount = await readNumber(readLineInterface, "Wybierz ilość\n>>", [0, 100]);
        playerInputCallback({ type: 'bid', bid: { playerIdx: gameState.activePlayerIdx, guessedCount, pickedDice } })

    }

    if (moveType === 2) {
        playerInputCallback({ type: 'challenge' })
    }
}

async function readNumber(readLineInterface: readline.Interface, label: string, range: [number, number]): Promise<number> {
    const result = await readLineInterface.question(label);
    const number = Number.parseInt(result);
    if (isNaN(number)) {
        console.log(`Błędna wartość!`);
        return readNumber(readLineInterface, label, range);
    }
    if (number < range[0] || number > range[1]) {
        console.log(`Wartość z poza zakresu: [${range[0], range[1]}].`);
        return readNumber(readLineInterface, label, range);
    }
    return number;
}