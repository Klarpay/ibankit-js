"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IBANBuilder = void 0;
const ibanUtil = __importStar(require("./ibanUtil"));
const bbanStructure_1 = require("./bbanStructure");
const structurePart_1 = require("./structurePart");
const randInt_1 = require("./randInt");
const exceptions_1 = require("./exceptions");
const iban_1 = require("./iban");
class IBANBuilder {
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
            const countryCodes = bbanStructure_1.BbanStructure.supportedCountries();
            this.countryCodeValue = countryCodes[(0, randInt_1.randInt)(countryCodes.length)];
        }
        const structure = bbanStructure_1.BbanStructure.forCountry(this.countryCodeValue);
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
        return new iban_1.IBAN(ibanValue);
    }
    formatBban() {
        const parts = [];
        const structure = bbanStructure_1.BbanStructure.forCountry(this.countryCodeValue);
        if (structure === null) {
            throw new exceptions_1.UnsupportedCountryException("Country code is not supported.", this.countryCodeValue);
        }
        for (const part of structure.getParts()) {
            switch (part.getPartType()) {
                case structurePart_1.PartType.BANK_CODE:
                    if (typeof this.bankCodeValue === "string") {
                        parts.push(this.bankCodeValue);
                    }
                    break;
                case structurePart_1.PartType.BRANCH_CODE:
                    if (typeof this.branchCodeValue === "string") {
                        parts.push(this.branchCodeValue);
                    }
                    break;
                case structurePart_1.PartType.BRANCH_CHECK_DIGIT:
                    if (typeof this.branchCheckDigitValue === "string") {
                        parts.push(this.branchCheckDigitValue);
                    }
                    break;
                case structurePart_1.PartType.ACCOUNT_NUMBER:
                    if (typeof this.accountNumberValue === "string") {
                        parts.push(this.accountNumberValue);
                    }
                    break;
                case structurePart_1.PartType.NATIONAL_CHECK_DIGIT:
                    if (typeof this.nationalCheckDigitValue === "string") {
                        parts.push(this.nationalCheckDigitValue);
                    }
                    break;
                case structurePart_1.PartType.ACCOUNT_TYPE:
                    if (typeof this.accountTypeValue === "string") {
                        parts.push(this.accountTypeValue);
                    }
                    break;
                case structurePart_1.PartType.OWNER_ACCOUNT_NUMBER:
                    if (typeof this.ownerAccountTypeValue === "string") {
                        parts.push(this.ownerAccountTypeValue);
                    }
                    break;
                case structurePart_1.PartType.IDENTIFICATION_NUMBER:
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
        const structure = bbanStructure_1.BbanStructure.forCountry(this.countryCodeValue);
        if (structure == null) {
            throw new exceptions_1.UnsupportedCountryException("Country code is not supported.", this.countryCodeValue);
        }
        let needCheckDigit = false;
        for (const entry of structure.getParts()) {
            switch (entry.getPartType()) {
                case structurePart_1.PartType.BANK_CODE:
                    if (!this.bankCodeValue) {
                        this.bankCodeValue = entry.generate("", structure);
                    }
                    else if (!fillRandom) {
                        throw new exceptions_1.FormatException(exceptions_1.FormatViolation.NOT_NULL, "bankCode is required; it cannot be null");
                    }
                    break;
                case structurePart_1.PartType.BRANCH_CODE:
                    if (!this.branchCodeValue) {
                        this.branchCodeValue = entry.generate("", structure);
                    }
                    else if (!fillRandom) {
                        throw new exceptions_1.FormatException(exceptions_1.FormatViolation.NOT_NULL, "branchCode is required; it cannot be null");
                    }
                    break;
                case structurePart_1.PartType.BRANCH_CHECK_DIGIT:
                    if (!this.branchCheckDigitValue) {
                        this.branchCheckDigitValue = entry.generate("", structure);
                    }
                    else if (!fillRandom) {
                        throw new exceptions_1.FormatException(exceptions_1.FormatViolation.NOT_NULL, "branchCheckDigit is required; it cannot be null");
                    }
                    break;
                case structurePart_1.PartType.ACCOUNT_NUMBER:
                    if (!this.accountNumberValue) {
                        this.accountNumberValue = entry.generate("", structure);
                    }
                    else if (!fillRandom) {
                        throw new exceptions_1.FormatException(exceptions_1.FormatViolation.NOT_NULL, "accountNumber is required; it cannot be null");
                    }
                    break;
                case structurePart_1.PartType.NATIONAL_CHECK_DIGIT:
                    if (!this.nationalCheckDigitValue) {
                        needCheckDigit = true;
                        this.nationalCheckDigitValue = "".padStart(entry.getLength(), "0");
                    }
                    break;
                case structurePart_1.PartType.ACCOUNT_TYPE:
                    if (!this.accountTypeValue) {
                        this.accountTypeValue = entry.generate("", structure);
                    }
                    else if (!fillRandom) {
                        throw new exceptions_1.FormatException(exceptions_1.FormatViolation.NOT_NULL, "accountType is required; it cannot be null");
                    }
                    break;
                case structurePart_1.PartType.OWNER_ACCOUNT_NUMBER:
                    if (!this.ownerAccountTypeValue) {
                        this.ownerAccountTypeValue = entry.generate("", structure);
                    }
                    else if (!fillRandom) {
                        throw new exceptions_1.FormatException(exceptions_1.FormatViolation.NOT_NULL, "ownerAccountType is required; it cannot be null");
                    }
                    break;
                case structurePart_1.PartType.IDENTIFICATION_NUMBER:
                    if (!this.identificationNumberValue) {
                        this.identificationNumberValue = entry.generate("", structure);
                    }
                    else if (!fillRandom) {
                        throw new exceptions_1.FormatException(exceptions_1.FormatViolation.NOT_NULL, "indentificationNumber is required; it cannot be null");
                    }
                    break;
            }
        }
        if (needCheckDigit) {
            for (const entry of structure.getParts()) {
                if (entry.getPartType() === structurePart_1.PartType.NATIONAL_CHECK_DIGIT) {
                    const bban = this.formatBban();
                    this.nationalCheckDigitValue = entry.generate(bban, structure);
                }
            }
        }
    }
}
exports.IBANBuilder = IBANBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWJhbkJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaWJhbkJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBdUM7QUFDdkMsbURBQWdEO0FBQ2hELG1EQUEyQztBQUUzQyx1Q0FBb0M7QUFDcEMsNkNBQTZGO0FBQzdGLGlDQUE4QjtBQUs5QixNQUFhLFdBQVc7SUE4QnRCLFdBQVcsQ0FBQyxXQUF3QjtRQUNsQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsV0FBVyxDQUFDO1FBQ3BDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQVFELFFBQVEsQ0FBQyxRQUFnQjtRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUM5QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFRRCxVQUFVLENBQUMsVUFBa0I7UUFDM0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUM7UUFDbEMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBUUQsYUFBYSxDQUFDLGFBQXFCO1FBQ2pDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxhQUFhLENBQUM7UUFDeEMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBUUQsa0JBQWtCLENBQUMsa0JBQTBCO1FBQzNDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxrQkFBa0IsQ0FBQztRQUNsRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFRRCxnQkFBZ0IsQ0FBQyxnQkFBd0I7UUFDdkMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLGdCQUFnQixDQUFDO1FBQzlDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQVFELFdBQVcsQ0FBQyxXQUFtQjtRQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsV0FBVyxDQUFDO1FBQ3BDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQVFELGdCQUFnQixDQUFDLGdCQUF3QjtRQUN2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