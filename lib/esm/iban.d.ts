import { CountryCode } from "./country";
export declare class IBAN {
    private value;
    constructor(iban: string);
    getCountryCode(): CountryCode;
    getCheckDigit(): string;
    getAccountNumber(): string | null;
    getBankCode(): string | null;
    getBranchCode(): string | null;
    getNationalCheckDigit(): string | null;
    getBranchCheckDigit(): string | null;
    getCurrencyType(): string | null;
    getAccountType(): string | null;
    getOwnerAccountType(): string | null;
    getIdentificationNumber(): string | null;
    getBban(): string;
    toString(): string;
    toFormattedString(): string;
    static isValid(iban: string): boolean;
    static toBBAN(iban: string, separator?: string): string;
    static fromBBAN(countryCode: string, bban: string): string;
    static isValidBBAN(countryCode: string, bban: string): boolean;
    static printFormat(iban: string, separator?: string): string;
    static electronicFormat(iban: string): string;
    static random(cc?: CountryCode): IBAN;
    static sample(cc: CountryCode | string): string;
}
