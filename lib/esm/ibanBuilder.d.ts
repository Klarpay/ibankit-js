import { CountryCode } from "./country";
import { IBAN } from "./iban";
export declare class IBANBuilder {
    private countryCodeValue?;
    private bankCodeValue?;
    private branchCodeValue?;
    private nationalCheckDigitValue?;
    private accountTypeValue?;
    private accountNumberValue?;
    private ownerAccountTypeValue?;
    private identificationNumberValue?;
    private branchCheckDigitValue?;
    countryCode(countryCode: CountryCode): IBANBuilder;
    bankCode(bankCode: string): IBANBuilder;
    branchCode(branchCode: string): IBANBuilder;
    accountNumber(accountNumber: string): IBANBuilder;
    nationalCheckDigit(nationalCheckDigit: string): IBANBuilder;
    branchCheckDigit(branchCheckDigit: string): IBANBuilder;
    accountType(accountType: string): IBANBuilder;
    ownerAccountType(ownerAccountType: string): IBANBuilder;
    identificationNumber(identificationNumber: string): IBANBuilder;
    build(fillRandom?: boolean, validate?: boolean): IBAN;
    private formatBban;
    private formatIban;
    private fillMissingFieldsRandomly;
}
