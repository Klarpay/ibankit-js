"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredPartTypeMissing = exports.InvalidCheckDigitException = exports.UnsupportedCountryException = exports.FormatException = exports.FormatViolation = void 0;
var FormatViolation;
(function (FormatViolation) {
    FormatViolation[FormatViolation["UNKNOWN"] = 0] = "UNKNOWN";
    FormatViolation[FormatViolation["NOT_NULL"] = 1] = "NOT_NULL";
    FormatViolation[FormatViolation["NOT_EMPTY"] = 2] = "NOT_EMPTY";
    FormatViolation[FormatViolation["BIC_LENGTH_8_OR_11"] = 3] = "BIC_LENGTH_8_OR_11";
    FormatViolation[FormatViolation["BIC_ONLY_UPPER_CASE_LETTERS"] = 4] = "BIC_ONLY_UPPER_CASE_LETTERS";
    FormatViolation[FormatViolation["BRANCH_CODE_ONLY_LETTERS_OR_DIGITS"] = 5] = "BRANCH_CODE_ONLY_LETTERS_OR_DIGITS";
    FormatViolation[FormatViolation["LOCATION_CODE_ONLY_LETTERS_OR_DIGITS"] = 6] = "LOCATION_CODE_ONLY_LETTERS_OR_DIGITS";
    FormatViolation[FormatViolation["BANK_CODE_ONLY_LETTERS"] = 7] = "BANK_CODE_ONLY_LETTERS";
    FormatViolation[FormatViolation["COUNTRY_CODE_TWO_LETTERS"] = 8] = "COUNTRY_CODE_TWO_LETTERS";
    FormatViolation[FormatViolation["COUNTRY_CODE_ONLY_UPPER_CASE_LETTERS"] = 9] = "COUNTRY_CODE_ONLY_UPPER_CASE_LETTERS";
    FormatViolation[FormatViolation["COUNTRY_CODE_EXISTS"] = 10] = "COUNTRY_CODE_EXISTS";
    FormatViolation[FormatViolation["NATIONAL_CHECK_DIGIT"] = 11] = "NATIONAL_CHECK_DIGIT";
    FormatViolation[FormatViolation["CHECK_DIGIT_TWO_DIGITS"] = 12] = "CHECK_DIGIT_TWO_DIGITS";
    FormatViolation[FormatViolation["CHECK_DIGIT_ONLY_DIGITS"] = 13] = "CHECK_DIGIT_ONLY_DIGITS";
    FormatViolation[FormatViolation["BBAN_LENGTH"] = 14] = "BBAN_LENGTH";
    FormatViolation[FormatViolation["BBAN_ONLY_UPPER_CASE_LETTERS"] = 15] = "BBAN_ONLY_UPPER_CASE_LETTERS";
    FormatViolation[FormatViolation["BBAN_ONLY_DIGITS_OR_LETTERS"] = 16] = "BBAN_ONLY_DIGITS_OR_LETTERS";
    FormatViolation[FormatViolation["BBAN_ONLY_DIGITS"] = 17] = "BBAN_ONLY_DIGITS";
    FormatViolation[FormatViolation["IBAN_VALID_CHARACTERS"] = 18] = "IBAN_VALID_CHARACTERS";
    FormatViolation[FormatViolation["COUNTRY_CODE_NOT_NULL"] = 19] = "COUNTRY_CODE_NOT_NULL";
    FormatViolation[FormatViolation["BANK_CODE_NOT_NULL"] = 20] = "BANK_CODE_NOT_NULL";
    FormatViolation[FormatViolation["ACCOUNT_NUMBER_NOT_NULL"] = 21] = "ACCOUNT_NUMBER_NOT_NULL";
})(FormatViolation || (exports.FormatViolation = FormatViolation = {}));
class FormatException extends Error {
    constructor(formatViolation, msg, expected, actual) {
        super(msg);
        this.formatViolation = formatViolation;
        this.expected = expected;
        this.actual = actual;
        Object.setPrototypeOf(this, FormatException.prototype);
    }
}
exports.FormatException = FormatException;
class UnsupportedCountryException extends Error {
    constructor(msg, actual) {
        super(msg);
        this.actual = actual;
        Object.setPrototypeOf(this, UnsupportedCountryException.prototype);
    }
}
exports.UnsupportedCountryException = UnsupportedCountryException;
class InvalidCheckDigitException extends Error {
    constructor(msg, expected, actual) {
        super(msg);
        this.expected = expected;
        this.actual = actual;
        Object.setPrototypeOf(this, InvalidCheckDigitException.prototype);
    }
}
exports.InvalidCheckDigitException = InvalidCheckDigitException;
class RequiredPartTypeMissing extends Error {
    constructor(msg) {
        super(msg);
        Object.setPrototypeOf(this, RequiredPartTypeMissing.prototype);
    }
}
exports.RequiredPartTypeMissing = RequiredPartTypeMissing;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZXB0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leGNlcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQVksZUFnQ1g7QUFoQ0QsV0FBWSxlQUFlO0lBQ3pCLDJEQUFPLENBQUE7SUFFUCw2REFBUSxDQUFBO0lBQ1IsK0RBQVMsQ0FBQTtJQUNULGlGQUFrQixDQUFBO0lBQ2xCLG1HQUEyQixDQUFBO0lBRzNCLGlIQUFrQyxDQUFBO0lBQ2xDLHFIQUFvQyxDQUFBO0lBQ3BDLHlGQUFzQixDQUFBO0lBRXRCLDZGQUF3QixDQUFBO0lBQ3hCLHFIQUFvQyxDQUFBO0lBQ3BDLG9GQUFtQixDQUFBO0lBRW5CLHNGQUFvQixDQUFBO0lBR3BCLDBGQUFzQixDQUFBO0lBQ3RCLDRGQUF1QixDQUFBO0lBQ3ZCLG9FQUFXLENBQUE7SUFDWCxzR0FBNEIsQ0FBQTtJQUM1QixvR0FBMkIsQ0FBQTtJQUMzQiw4RUFBZ0IsQ0FBQTtJQUNoQix3RkFBcUIsQ0FBQTtJQUdyQix3RkFBcUIsQ0FBQTtJQUNyQixrRkFBa0IsQ0FBQTtJQUNsQiw0RkFBdUIsQ0FBQTtBQUN6QixDQUFDLEVBaENXLGVBQWUsK0JBQWYsZUFBZSxRQWdDMUI7QUFFRCxNQUFhLGVBQWdCLFNBQVEsS0FBSztJQU94QyxZQUFZLGVBQWdDLEVBQUUsR0FBVyxFQUFFLFFBQWlCLEVBQUUsTUFBZTtRQUMzRixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFWCxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUN2QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUdyQixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDekQsQ0FBQztDQUNGO0FBakJELDBDQWlCQztBQUVELE1BQWEsMkJBQTRCLFNBQVEsS0FBSztJQUdwRCxZQUFZLEdBQVcsRUFBRSxNQUFlO1FBQ3RDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBR3JCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLDJCQUEyQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7Q0FDRjtBQVZELGtFQVVDO0FBRUQsTUFBYSwwQkFBMkIsU0FBUSxLQUFLO0lBS25ELFlBQVksR0FBVyxFQUFFLFFBQWlCLEVBQUUsTUFBZTtRQUN6RCxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFWCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUdyQixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSwwQkFBMEIsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwRSxDQUFDO0NBQ0Y7QUFkRCxnRUFjQztBQUVELE1BQWEsdUJBQXdCLFNBQVEsS0FBSztJQUNoRCxZQUFZLEdBQVc7UUFDckIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBR1gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDakUsQ0FBQztDQUNGO0FBUEQsMERBT0MifQ==