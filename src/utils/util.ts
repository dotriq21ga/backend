import * as bcrypt from 'bcrypt'
import { arrayNotEmpty } from 'class-validator';

export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        return isPasswordValid;
    } catch (error) {
        throw error;
    }
}

export function handleErrorEmptyArray(array : string[]){
    return arrayNotEmpty(array) ? array : null
}