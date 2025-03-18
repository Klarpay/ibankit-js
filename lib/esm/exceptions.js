export var FormatViolation;
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
})(FormatViolation || (FormatViolation = {}));
export class FormatException extends Error {
    constructor(formatViolation, msg, expected, actual) {
        super(msg);
        this.formatViolation = formatViolation;
        this.expected = expected;
        this.actual = actual;
        Object.setPrototypeOf(this, FormatException.prototype);
    }
}
export class UnsupportedCountryException extends Error {
    constructor(msg, actual) {
        super(msg);
        this.actual = actual;
        Object.setPrototypeOf(this, UnsupportedCountryException.prototype);
    }
}
export class InvalidCheckDigitException extends Error {
    constructor(msg, expected, actual) {
        super(msg);
        this.expected = expected;
        this.actual = actual;
        Object.setPrototypeOf(this, InvalidCheckDigitException.prototype);
    }
}
export class RequiredPartTypeMissing extends Error {
    constructor(msg) {
        super(msg);
        Object.setPrototypeOf(this, RequiredPartTypeMissing.prototype);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZXB0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leGNlcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBTixJQUFZLGVBZ0NYO0FBaENELFdBQVksZUFBZTtJQUN6QiwyREFBTyxDQUFBO0lBRVAsNkRBQVEsQ0FBQTtJQUNSLCtEQUFTLENBQUE7SUFDVCxpRkFBa0IsQ0FBQTtJQUNsQixtR0FBMkIsQ0FBQTtJQUczQixpSEFBa0MsQ0FBQTtJQUNsQyxxSEFBb0MsQ0FBQTtJQUNwQyx5RkFBc0IsQ0FBQTtJQUV0Qiw2RkFBd0IsQ0FBQTtJQUN4QixxSEFBb0MsQ0FBQTtJQUNwQyxvRkFBbUIsQ0FBQTtJQUVuQixzRkFBb0IsQ0FBQTtJQUdwQiwwRkFBc0IsQ0FBQTtJQUN0Qiw0RkFBdUIsQ0FBQTtJQUN2QixvRUFBVyxDQUFBO0lBQ1gsc0dBQTRCLENBQUE7SUFDNUIsb0dBQTJCLENBQUE7SUFDM0IsOEVBQWdCLENBQUE7SUFDaEIsd0ZBQXFCLENBQUE7SUFHckIsd0ZBQXFCLENBQUE7SUFDckIsa0ZBQWtCLENBQUE7SUFDbEIsNEZBQXVCLENBQUE7QUFDekIsQ0FBQyxFQWhDVyxlQUFlLEtBQWYsZUFBZSxRQWdDMUI7QUFFRCxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxLQUFLO0lBT3hDLFlBQVksZUFBZ0MsRUFBRSxHQUFXLEVBQUUsUUFBaUIsRUFBRSxNQUFlO1FBQzNGLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVYLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBR3JCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN6RCxDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sMkJBQTRCLFNBQVEsS0FBSztJQUdwRCxZQUFZLEdBQVcsRUFBRSxNQUFlO1FBQ3RDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBR3JCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLDJCQUEyQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTywwQkFBMkIsU0FBUSxLQUFLO0lBS25ELFlBQVksR0FBVyxFQUFFLFFBQWlCLEVBQUUsTUFBZTtRQUN6RCxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFWCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUdyQixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSwwQkFBMEIsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwRSxDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsS0FBSztJQUNoRCxZQUFZLEdBQVc7UUFDckIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBR1gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDakUsQ0FBQztDQUNGIn0=