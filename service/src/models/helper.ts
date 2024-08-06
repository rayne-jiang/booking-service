import cache from "./cache.js";
const TABLE_CONFIG = {
    TWO_SEATS: parseInt(process.env.TWO_SEATS as string || "2"),
    FOUR_SEATS: parseInt(process.env.FOUR_SEATS as string || "2"),
}

export const checkTableAvailability = async (tableSize: number, arrivalDate: string, arrivalSlot: string) : Promise<Boolean> => {
    if (!arrivalDate || !arrivalSlot || !tableSize) return false;
    if (tableSize > 4) return false;
    const existTableSize = tableSize <= 2 ? TABLE_CONFIG.TWO_SEATS : TABLE_CONFIG.FOUR_SEATS;
    const tableName = tableSize <= 2 ? "TWO_SEATS" : "FOUR_SEATS";
    const confirmedSeat = cache.get<number>(`${arrivalDate}-${arrivalSlot}-${tableName}`);
    if (confirmedSeat && confirmedSeat === existTableSize) {
        return false;
    }
    return true;
}

export const updateTableAvailability = async (tableSize: number, arrivalDate: string, arrivalSlot: string, isIncrement: boolean) => {
    if (tableSize > 4) return;
    const existTableSize = tableSize <= 2 ? TABLE_CONFIG.TWO_SEATS : TABLE_CONFIG.FOUR_SEATS;
    const tableName = tableSize <= 2 ? "TWO_SEATS" : "FOUR_SEATS";
    const confirmedSeat = cache.get<number>(`${arrivalDate}-${arrivalSlot}-${tableName}`);
        if (isIncrement && confirmedSeat && confirmedSeat < existTableSize) {
        cache.set(`${arrivalDate}-${arrivalSlot}-${tableName}`, confirmedSeat + 1);
        return 
    }
    if (!isIncrement && confirmedSeat) {
        cache.set(`${arrivalDate}-${arrivalSlot}-${tableName}`, confirmedSeat - 1);
        return
    }
    if (!confirmedSeat && isIncrement) {
        cache.set(`${arrivalDate}-${arrivalSlot}-${tableName}`, 1);
        return
    }
    return;
}