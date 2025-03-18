import * as ibanUtil from "./ibanUtil";
import { BbanStructure } from "./bbanStructure";
import { PartType } from "./structurePart";
import { randInt } from "./randInt";
import { UnsupportedCountryException, FormatViolation, FormatException } from "./exceptions";
import { IBAN } from "./iban";
export class IBANBuilder {
    countryCode(countryCode) {
        this.countryCodeValue = countryCode;
        return this;
    }
    bankCode(bankCode) {
        this.bankCodeValue = bankCode;
        return this;
    }
    branchCode(branchCode) {
        this.branchCodeValue = branchCode;
        return this;
    }
    accountNumber(accountNumber) {
        this.accountNumberValue = accountNumber;
        return this;
    }
    nationalCheckDigit(nationalCheckDigit) {
        this.nationalCheckDigitValue = nationalCheckDigit;
        return this;
    }
    branchCheckDigit(branchCheckDigit) {
        this.branchCheckDigitValue = branchCheckDigit;
        return this;
    }
    accountType(accountType) {
        this.accountTypeValue = accountType;
        return this;
    }
    ownerAccountType(ownerAccountType) {
        this.ownerAccountTypeValue = ownerAccountType;
        return this;
    }
    identificationNumber(identificationNumber) {
        this.identificationNumberValue = identificationNumber;
        return this;
    }
    build(fillRandom = true, validate = true) {
        if (fillRandom && this.countryCodeValue == null) {
            const countryCodes = BbanStructure.supportedCountries();
            this.countryCodeValue = countryCodes[randInt(countryCodes.length)];
        }
        const structure = BbanStructure.forCountry(this.countryCodeValue);
        if (structure === null) {
            throw new Error("shouldn't happen");
        }
        this.fillMissingFieldsRandomly(fillRandom);
        const formattedIban = this.formatIban();
        const checkDigit = ibanUtil.calculateCheckDigit(formattedIban);
        const ibanValue = ibanUtil.replaceCheckDigit(formattedIban, checkDigit);
        if (validate) {
            ibanUtil.validate(ibanValue);
        }
        return new IBAN(ibanValue);
    }
    formatBban() {
        const parts = [];
        const structure = BbanStructure.forCountry(this.countryCodeValue);
        if (structure === null) {
            throw new UnsupportedCountryException("Country code is not supported.", this.countryCodeValue);
        }
        for (const part of structure.getParts()) {
            switch (part.getPartType()) {
                case PartType.BANK_CODE:
                    if (typeof this.bankCodeValue === "string") {
                        parts.push(this.bankCodeValue);
                    }
                    break;
                case PartType.BRANCH_CODE:
                    if (typeof this.branchCodeValue === "string") {
                        parts.push(this.branchCodeValue);
                    }
                    break;
                case PartType.BRANCH_CHECK_DIGIT:
                    if (typeof this.branchCheckDigitValue === "string") {
                        parts.push(this.branchCheckDigitValue);
                    }
                    break;
                case PartType.ACCOUNT_NUMBER:
                    if (typeof this.accountNumberValue === "string") {
                        parts.push(this.accountNumberValue);
                    }
                    break;
                case PartType.NATIONAL_CHECK_DIGIT:
                    if (typeof this.nationalCheckDigitValue === "string") {
                        parts.push(this.nationalCheckDigitValue);
                    }
                    break;
                case PartType.ACCOUNT_TYPE:
                    if (typeof this.accountTypeValue === "string") {
                        parts.push(this.accountTypeValue);
                    }
                    break;
                case PartType.OWNER_ACCOUNT_NUMBER:
                    if (typeof this.ownerAccountTypeValue === "string") {
                        parts.push(this.ownerAccountTypeValue);
                    }
                    break;
                case PartType.IDENTIFICATION_NUMBER:
                    if (typeof this.identificationNumberValue === "string") {
                        parts.push(this.identificationNumberValue);
                    }
                    break;
            }
        }
        return parts.join("");
    }
    formatIban() {
        return `${this.countryCodeValue}${ibanUtil.DEFAULT_CHECK_DIGIT}${this.formatBban()}`;
    }
    fillMissingFieldsRandomly(fillRandom) {
        const structure = BbanStructure.forCountry(this.countryCodeValue);
        if (structure == null) {
            throw new UnsupportedCountryException("Country code is not supported.", this.countryCodeValue);
        }
        let needCheckDigit = false;
        for (const entry of structure.getParts()) {
            switch (entry.getPartType()) {
                case PartType.BANK_CODE:
                    if (!this.bankCodeValue) {
                        this.bankCodeValue = entry.generate("", structure);
                    }
                    else if (!fillRandom) {
                        throw new FormatException(FormatViolation.NOT_NULL, "bankCode is required; it cannot be null");
                    }
                    break;
                case PartType.BRANCH_CODE:
                    if (!this.branchCodeValue) {
                        this.branchCodeValue = entry.generate("", structure);
                    }
                    else if (!fillRandom) {
                        throw new FormatException(FormatViolation.NOT_NULL, "branchCode is required; it cannot be null");
                    }
                    break;
                case PartType.BRANCH_CHECK_DIGIT:
                    if (!this.branchCheckDigitValue) {
                        this.branchCheckDigitValue = entry.generate("", structure);
                    }
                    else if (!fillRandom) {
                        throw new FormatException(FormatViolation.NOT_NULL, "branchCheckDigit is required; it cannot be null");
                    }
                    break;
                case PartType.ACCOUNT_NUMBER:
                    if (!this.accountNumberValue) {
                        this.accountNumberValue = entry.generate("", structure);
                    }
                    else if (!fillRandom) {
                        throw new FormatException(FormatViolation.NOT_NULL, "accountNumber is required; it cannot be null");
                    }
                    break;
                case PartType.NATIONAL_CHECK_DIGIT:
                    if (!this.nationalCheckDigitValue) {
                        needCheckDigit = true;
                        this.nationalCheckDigitValue = "".padStart(entry.getLength(), "0");
                    }
                    break;
                case PartType.ACCOUNT_TYPE:
                    if (!this.accountTypeValue) {
                        this.accountTypeValue = entry.generate("", structure);
                    }
                    else if (!fillRandom) {
                        throw new FormatException(FormatViolation.NOT_NULL, "accountType is required; it cannot be null");
                    }
                    break;
                case PartType.OWNER_ACCOUNT_NUMBER:
                    if (!this.ownerAccountTypeValue) {
                        this.ownerAccountTypeValue = entry.generate("", structure);
                    }
                    else if (!fillRandom) {
                        throw new FormatException(FormatViolation.NOT_NULL, "ownerAccountType is required; it cannot be null");
                    }
                    break;
                case PartType.IDENTIFICATION_NUMBER:
                    if (!this.identificationNumberValue) {
                        this.identificationNumberValue = entry.generate("", structure);
                    }
                    else if (!fillRandom) {
                        throw new FormatException(FormatViolation.NOT_NULL, "indentificationNumber is required; it cannot be null");
                    }
                    break;
            }
        }
        if (needCheckDigit) {
            for (const entry of structure.getParts()) {
                if (entry.getPartType() === PartType.NATIONAL_CHECK_DIGIT) {
                    const bban = this.formatBban();
                    this.nationalCheckDigitValue = entry.generate(bban, structure);
                }
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWJhbkJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaWJhbkJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLFFBQVEsTUFBTSxZQUFZLENBQUM7QUFDdkMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzdGLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFLOUIsTUFBTSxPQUFPLFdBQVc7SUE4QnRCLFdBQVcsQ0FBQyxXQUF3QjtRQUNsQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsV0FBVyxDQUFDO1FBQ3BDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQVFELFFBQVEsQ0FBQyxRQUFnQjtRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUM5QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFRRCxVQUFVLENBQUMsVUFBa0I7UUFDM0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUM7UUFDbEMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBUUQsYUFBYSxDQUFDLGFBQXFCO1FBQ2pDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxhQUFhLENBQUM7UUFDeEMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBUUQsa0JBQWtCLENBQUMsa0JBQTBCO1FBQzNDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxrQkFBa0IsQ0FBQztRQUNsRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFRRCxnQkFBZ0IsQ0FBQyxnQkFBd0I7UUFDdkMsSUFBSSxDQUFDLHFCQUFx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