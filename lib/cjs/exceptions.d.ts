export declare enum FormatViolation {
    UNKNOWN = 0,
    NOT_NULL = 1,
    NOT_EMPTY = 2,
    BIC_LENGTH_8_OR_11 = 3,
    BIC_ONLY_UPPER_CASE_LETTERS = 4,
    BRANCH_CODE_ONLY_LETTERS_OR_DIGITS = 5,
    LOCATION_CODE_ONLY_LETTERS_OR_DIGITS = 6,
    BANK_CODE_ONLY_LETTERS = 7,
    COUNTRY_CODE_TWO_LETTERS = 8,
    COUNTRY_CODE_ONLY_UPPER_CASE_LETTERS = 9,
    COUNTRY_CODE_EXISTS = 10,
    NATIONAL_CHECK_DIGIT = 11,
    CHECK_DIGIT_TWO_DIGITS = 12,
    CHECK_DIGIT_ONLY_DIGITS = 13,
    BBAN_LENGTH = 14,
    BBAN_ONLY_UPPER_CASE_LETTERS = 15,
    BBAN_ONLY_DIGITS_OR_LETTERS = 16,
    BBAN_ONLY_DIGITS = 17,
    IBAN_VALID_CHARACTERS = 18,
    COUNTRY_CODE_NOT_NULL = 19,
    BANK_CODE_NOT_NULL = 20,
    ACCOUNT_NUMBER_NOT_NULL = 21
}
export declare class FormatException extends Error {
    formatViolation: FormatViolation;
    actual?: string;
    expected?: string;
    constructor(formatViolation: FormatViolation, msg: string, expected?: string, actual?: string);
}
export declare class UnsupportedCountryException extends Error {
    actual?: string;
    constructor(msg: string, actual?: string);
}
export declare class InvalidCheckDigitException extends Error {
    actual?: string;
    expected?: string;
    constructor(msg: string, expected?: string, actual?: string);
}
export declare class RequiredPartTypeMissing extends Error {
    constructor(msg: string);
}
