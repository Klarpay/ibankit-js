"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCheckDigitChecksum = exports.toFormattedStringBBAN = exports.toFormattedString = exports.replaceCheckDigit = exports.getIdentificationNumber = exports.getOwnerAccountType = exports.getAccountType = exports.getCurrencyType = exports.getBranchCheckDigit = exports.getNationalCheckDigit = exports.getBranchCode = exports.getBankCode = exports.getAccountNumber = exports.getBban = exports.getCountryCodeAndCheckDigit = exports.getCountryCode = exports.getCheckDigit = exports.getIbanLength = exports.isSupportedCountry = exports.validateBban = exports.validateCheckDigit = exports.validate = exports.calculateCheckDigit = exports.DEFAULT_CHECK_DIGIT = void 0;
const country_1 = require("./country");
const bbanStructure_1 = require("./bbanStructure");
const structurePart_1 = require("./structurePart");
const exceptions_1 = require("./exceptions");
const ucRegex = /^[A-Z]+$/;
const numRegex = /^[0-9]+$/;
exports.DEFAULT_CHECK_DIGIT = "00";
const MOD = 97;
const MAX = 999999999;
const COUNTRY_CODE_INDEX = 0;
const COUNTRY_CODE_LENGTH = 2;
const CHECK_DIGIT_INDEX = COUNTRY_CODE_LENGTH;
const CHECK_DIGIT_LENGTH = 2;
const BBAN_INDEX = CHECK_DIGIT_INDEX + CHECK_DIGIT_LENGTH;
function calculateCheckDigit(iban) {
    const reformattedIban = replaceCheckDigit(iban, exports.DEFAULT_CHECK_DIGIT);
    const modResult = calculateMod(reformattedIban);
    const checkDigit = String(98 - modResult);
    return checkDigit.padStart(2, "0");
}
exports.calculateCheckDigit = calculateCheckDigit;
function validate(iban) {
    validateNotEmpty(iban);
    validateCountryCode(iban, true);
    validateCheckDigitPresence(iban);
    validateBban(getCountryCode(iban), getBban(iban));
    validateCheckDigitChecksum(iban);
}
exports.validate = validate;
function validateCheckDigit(iban) {
    validateNotEmpty(iban);
    validateCheckDigitPresence(iban);
    validateCountryCode(iban, false);
    validateCheckDigitChecksum(iban);
}
exports.validateCheckDigit = validateCheckDigit;
function validateBban(countryCode, bban) {
    validateCountryCode(countryCode, true);
    const structure = getBbanStructure(countryCode);
    if (!structure) {
        throw new Error("Internal error, expected structure");
    }
    structure.validate(bban);
}
exports.validateBban = validateBban;
function isSupportedCountry(countryCode) {
    return bbanStructure_1.BbanStructure.forCountry(countryCode) != null;
}
exports.isSupportedCountry = isSupportedCountry;
function getIbanLength(countryCode) {
    const structure = getBbanStructure(countryCode);
    if (structure === null) {
        throw new exceptions_1.UnsupportedCountryException("Unsuppored country", countryCode);
    }
    return COUNTRY_CODE_LENGTH + CHECK_DIGIT_LENGTH + structure.getBbanLength();
}
exports.getIbanLength = getIbanLength;
function getCheckDigit(iban) {
    return iban.substring(CHECK_DIGIT_INDEX, CHECK_DIGIT_INDEX + CHECK_DIGIT_LENGTH);
}
exports.getCheckDigit = getCheckDigit;
function getCountryCode(iban) {
    return iban.substring(COUNTRY_CODE_INDEX, COUNTRY_CODE_INDEX + COUNTRY_CODE_LENGTH);
}
exports.getCountryCode = getCountryCode;
function getCountryCodeAndCheckDigit(iban) {
    return iban.substring(COUNTRY_CODE_INDEX, COUNTRY_CODE_INDEX + COUNTRY_CODE_LENGTH + CHECK_DIGIT_LENGTH);
}
exports.getCountryCodeAndCheckDigit = getCountryCodeAndCheckDigit;
function getBban(iban) {
    return iban.substring(BBAN_INDEX);
}
exports.getBban = getBban;
function getAccountNumber(iban) {
    return extractBbanEntry(iban, structurePart_1.PartType.ACCOUNT_NUMBER);
}
exports.getAccountNumber = getAccountNumber;
function getBankCode(iban) {
    return extractBbanEntry(iban, structurePart_1.PartType.BANK_CODE);
}
exports.getBankCode = getBankCode;
function getBranchCode(iban) {
    return extractBbanEntry(iban, structurePart_1.PartType.BRANCH_CODE);
}
exports.getBranchCode = getBranchCode;
function getNationalCheckDigit(iban) {
    return extractBbanEntry(iban, structurePart_1.PartType.NATIONAL_CHECK_DIGIT);
}
exports.getNationalCheckDigit = getNationalCheckDigit;
function getBranchCheckDigit(iban) {
    return extractBbanEntry(iban, structurePart_1.PartType.BRANCH_CHECK_DIGIT);
}
exports.getBranchCheckDigit = getBranchCheckDigit;
function getCurrencyType(iban) {
    return extractBbanEntry(iban, structurePart_1.PartType.CURRENCY_TYPE);
}
exports.getCurrencyType = getCurrencyType;
function getAccountType(iban) {
    return extractBbanEntry(iban, structurePart_1.PartType.ACCOUNT_TYPE);
}
exports.getAccountType = getAccountType;
function getOwnerAccountType(iban) {
    return extractBbanEntry(iban, structurePart_1.PartType.OWNER_ACCOUNT_NUMBER);
}
exports.getOwnerAccountType = getOwnerAccountType;
function getIdentificationNumber(iban) {
    return extractBbanEntry(iban, structurePart_1.PartType.IDENTIFICATION_NUMBER);
}
exports.getIdentificationNumber = getIdentificationNumber;
function replaceCheckDigit(iban, checkDigit) {
    return getCountryCode(iban) + checkDigit + getBban(iban);
}
exports.replaceCheckDigit = replaceCheckDigit;
function toFormattedString(iban, separator = " ") {
    return iban.replace(/(.{4})/g, `$1${separator}`).trim();
}
exports.toFormattedString = toFormattedString;
function toFormattedStringBBAN(iban, separator = " ") {
    const structure = getBbanStructure(iban);
    if (structure === null) {
        throw new Error("should't happen - already validated IBAN");
    }
    const bban = getBban(iban);
    const parts = structure.getParts().reduce((acc, part) => {
        const value = structure.extractValue(bban, part.getPartType());
        return acc.concat(value || "", part.trailingSeparator ? separator : "");
    }, []);
    parts.pop();
    return parts.join("");
}
exports.toFormattedStringBBAN = toFormattedStringBBAN;
function validateCheckDigitChecksum(iban) {
    if (calculateMod(iban) != 1) {
        const checkDigit = getCheckDigit(iban);
        const expectedCheckDigit = calculateCheckDigit(iban);
        throw new exceptions_1.InvalidCheckDigitException(`[${iban}] has invalid check digit: ${checkDigit}, expected check digit is: ${expectedCheckDigit}`, checkDigit, expectedCheckDigit);
    }
}
exports.validateCheckDigitChecksum = validateCheckDigitChecksum;
function validateNotEmpty(iban) {
    if (iban == null) {
        throw new exceptions_1.FormatException(exceptions_1.FormatViolation.NOT_NULL, "Null can't be a valid Iban.");
    }
    if (iban.length === 0) {
        throw new exceptions_1.FormatException(exceptions_1.FormatViolation.NOT_EMPTY, "Empty string can't be a valid Iban.");
    }
}
function validateCountryCode(iban, hasStructure = true) {
    if (iban.length < COUNTRY_CODE_LENGTH) {
        throw new exceptions_1.FormatException(exceptions_1.FormatViolation.COUNTRY_CODE_TWO_LETTERS, "Iban must contain 2 char country code.", iban);
    }
    const countryCode = getCountryCode(iban);
    if (countryCode !== countryCode.toUpperCase() || !ucRegex.test(countryCode)) {
        throw new exceptions_1.FormatException(exceptions_1.FormatViolation.COUNTRY_CODE_ONLY_UPPER_CASE_LETTERS, "Iban country code must contain upper case letters.", countryCode);
    }
    const country = (0, country_1.countryByCode)(countryCode);
    if (country == null) {
        throw new exceptions_1.FormatException(exceptions_1.FormatViolation.COUNTRY_CODE_EXISTS, "Iban contains non existing country code.", countryCode);
    }
    if (hasStructure) {
        const structure = bbanStructure_1.BbanStructure.forCountry(country);
        if (structure == null) {
            throw new exceptions_1.UnsupportedCountryException("Country code is not supported.", countryCode);
        }
    }
}
function validateCheckDigitPresence(iban) {
    if (iban.length < COUNTRY_CODE_LENGTH + CHECK_DIGIT_LENGTH) {
        throw new exceptions_1.FormatException(exceptions_1.FormatViolation.CHECK_DIGIT_TWO_DIGITS, "Iban must contain 2 digit check digit.", iban.substring(COUNTRY_CODE_LENGTH));
    }
    const checkDigit = getCheckDigit(iban);
    if (!numRegex.test(checkDigit)) {
        throw new exceptions_1.FormatException(exceptions_1.FormatViolation.CHECK_DIGIT_ONLY_DIGITS, "Iban's check digit should contain only digits.", checkDigit);
    }
}
function calculateMod(iban) {
    const reformattedIban = getBban(iban) + getCountryCodeAndCheckDigit(iban);
    const VA = "A".charCodeAt(0);
    const VZ = "Z".charCodeAt(0);
    const V0 = "0".charCodeAt(0);
    const V9 = "9".charCodeAt(0);
    function addSum(total, value) {
        const newTotal = (value > 9 ? total * 100 : total * 10) + value;
        return newTotal > MAX ? newTotal % MOD : newTotal;
    }
    const total = reformattedIban
        .toUpperCase()
        .split("")
        .reduce((totalValue, ch) => {
        const code = ch.charCodeAt(0);
        if (VA <= code && code <= VZ) {
            return addSum(totalValue, code - VA + 10);
        }
        else if (V0 <= code && code <= V9) {
            return addSum(totalValue, code - V0);
        }
        else {
            throw new exceptions_1.FormatException(exceptions_1.FormatViolation.IBAN_VALID_CHARACTERS, `Invalid Character[${ch}] = '${code}'`, ch);
        }
    }, 0);
    return total % MOD;
}
function getBbanStructure(iban) {
    const countryCode = (0, country_1.countryByCode)(getCountryCode(iban));
    if (!countryCode) {
        return null;
    }
    return getBbanStructureByCountry(countryCode);
}
function getBbanStructureByCountry(countryCode) {
    return bbanStructure_1.BbanStructure.forCountry(countryCode);
}
function extractBbanEntry(iban, partType) {
    const bban = getBban(iban);
    const structure = getBbanStructure(iban);
    if (structure === null) {
        return null;
    }
    return structure.extractValue(bban, partType);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWJhblV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaWJhblV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQXVEO0FBQ3ZELG1EQUFnRDtBQUNoRCxtREFBMkM7QUFDM0MsNkNBS3NCO0FBRXRCLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQztBQUMzQixNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUM7QUFLZixRQUFBLG1CQUFtQixHQUFHLElBQUksQ0FBQztBQUN4QyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDZixNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUM7QUFFdEIsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLENBQUM7QUFDN0IsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLENBQUM7QUFDOUIsTUFBTSxpQkFBaUIsR0FBRyxtQkFBbUIsQ0FBQztBQUM5QyxNQUFNLGtCQUFrQixHQUFHLENBQUMsQ0FBQztBQUM3QixNQUFNLFVBQVUsR0FBRyxpQkFBaUIsR0FBRyxrQkFBa0IsQ0FBQztBQVcxRCxTQUFnQixtQkFBbUIsQ0FBQyxJQUFZO0lBQzlDLE1BQU0sZUFBZSxHQUFHLGlCQUFpQixDQUFDLElBQUksRUFBRSwyQkFBbUIsQ0FBQyxDQUFDO0lBQ3JFLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNoRCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDO0lBRTFDLE9BQU8sVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDckMsQ0FBQztBQU5ELGtEQU1DO0FBVUQsU0FBZ0IsUUFBUSxDQUFDLElBQVk7SUFDbkMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsbUJBQW1CLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxDQUFD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