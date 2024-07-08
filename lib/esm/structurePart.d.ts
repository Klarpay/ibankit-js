import { BbanStructure } from "./bbanStructure";
export declare enum PartType {
    BANK_CODE = 0,
    BRANCH_CODE = 1,
    ACCOUNT_NUMBER = 2,
    BRANCH_CHECK_DIGIT = 3,
    NATIONAL_CHECK_DIGIT = 4,
    CURRENCY_TYPE = 5,
    ACCOUNT_TYPE = 6,
    OWNER_ACCOUNT_NUMBER = 7,
    IDENTIFICATION_NUMBER = 8
}
export declare enum CharacterType {
    n = 0,
    a = 1,
    c = 2,
    e = 3
}
type GenerateValue = (bban: string, structure: BbanStructure) => string;
export declare class BbanStructurePart {
    private entryType;
    private characterType;
    private length;
    trailingSeparator: boolean;
    generate: GenerateValue;
    hasGenerator: boolean;
    private constructor();
    static bankCode(length: number, characterType: CharacterType, trailingSeparator?: boolean): BbanStructurePart;
    static branchCode(length: number, characterType: CharacterType, trailingSeparator?: boolean): BbanStructurePart;
    static accountNumber(length: number, characterType: CharacterType, trailingSeparator?: boolean): BbanStructurePart;
    static nationalCheckDigit(length: number, characterType: CharacterType, generate?: GenerateValue, trailingSeparator?: boolean): BbanStructurePart;
    static branchCheckDigit(length: number, characterType: CharacterType, generate?: GenerateValue, trailingSeparator?: boolean): BbanStructurePart;
    static accountType(length: number, characterType: CharacterType, trailingSeparator?: boolean): BbanStructurePart;
    static currencyType(length: number, characterType: CharacterType, trailingSeparator?: boolean): BbanStructurePart;
    static ownerAccountNumber(length: number, characterType: CharacterType, trailingSeparator?: boolean): BbanStructurePart;
    static identificationNumber(length: number, characterType: CharacterType, trailingSeparator?: boolean): BbanStructurePart;
    getPartType(): PartType;
    getCharacterType(): CharacterType;
    getLength(): number;
    validate(value: string): boolean;
    private defaultGenerator;
}
export {};
