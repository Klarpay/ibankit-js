import { CountryCode } from "./country";
export declare class BIC {
    private value;
    constructor(bic: string);
    getBankCode(): string;
    getCountryCode(): CountryCode | null;
    getLocationCode(): string;
    getBranchCode(): string | null;
    toString(): string;
    static isValid(bic: string): boolean;
}
