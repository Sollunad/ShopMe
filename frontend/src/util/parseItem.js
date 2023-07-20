export function parseItem(ingredient) {
    const split = ingredient.split(" ");

    if (split.length >= 3) {
        return {
            amount: split[0],
            unit: split[1],
            name: split.slice(2).join(" "),
        }
    } else if (split.length === 2) {
        return {
            amount: split[0],
            name: split[1],
        }
    } else {
        return {
            name: ingredient,
        }
    }
}