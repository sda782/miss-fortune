let lastGroupLetter = ""
export const showLetter = (name: string): boolean => {
    if (lastGroupLetter.toLowerCase() !== name.toLowerCase()[0]) {
        lastGroupLetter = name.toLowerCase()[0]
        return true;
    }
    return false;
};