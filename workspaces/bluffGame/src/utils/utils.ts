export const utils = {
    getRandomInt,
    asyncWait
}

/**
 * https://medium.com/codimis/how-to-generate-random-integer-between-two-integers-in-javascript-6dabcebcf3c3
 * @param min 
 * @param max 
 * @returns 
 */
function getRandomInt(min: number, max: number) {
    // Use Math.floor to round down to the nearest whole number
    // Use Math.random() to generate a random decimal between 0 (inclusive) and 1 (exclusive)
    // Multiply by the range (max - min + 1) to cover the entire range
    // Add the minimum value to shift the range to [min, max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function asyncWait(millis: number): Promise<void> {
    return new Promise(
        (resolve, reject) => setTimeout(resolve, millis)
    );
} 