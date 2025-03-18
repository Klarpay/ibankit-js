import { BbanStructurePart, PartType } from "./structurePart";
import { CountryCode } from "./country";
export declare class BbanStructure {
    private static bbanFR;
    static structures: {
        [key in CountryCode]?: BbanStructure;
    };
    private entries;
    private constructor();
    getParts(): BbanStructurePart[];
    validate(bban: string): void;
    extractValue(bban: string, partType: PartType): string | null;
    extractValueMust(bban: string, partType: PartType): string;
    static forCountry(countryCode: CountryCode | string | undefined): BbanStructure | null;
    static getEntries(): BbanStructure[];
    static supportedCountries(): CountryCode[];
    getBbanLength(): number;
    private validateBbanLength;
    private validateBbanEntries;
    private validateBbanEntryCharacterType;
}
