"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BbanStructurePart = exports.CharacterType = exports.PartType = void 0;
const randInt_1 = require("./randInt");
var PartType;
(function (PartType) {
    PartType[PartType["BANK_CODE"] = 0] = "BANK_CODE";
    PartType[PartType["BRANCH_CODE"] = 1] = "BRANCH_CODE";
    PartType[PartType["ACCOUNT_NUMBER"] = 2] = "ACCOUNT_NUMBER";
    PartType[PartType["BRANCH_CHECK_DIGIT"] = 3] = "BRANCH_CHECK_DIGIT";
    PartType[PartType["NATIONAL_CHECK_DIGIT"] = 4] = "NATIONAL_CHECK_DIGIT";
    PartType[PartType["CURRENCY_TYPE"] = 5] = "CURRENCY_TYPE";
    PartType[PartType["ACCOUNT_TYPE"] = 6] = "ACCOUNT_TYPE";
    PartType[PartType["OWNER_ACCOUNT_NUMBER"] = 7] = "OWNER_ACCOUNT_NUMBER";
    PartType[PartType["IDENTIFICATION_NUMBER"] = 8] = "IDENTIFICATION_NUMBER";
})(PartType || (exports.PartType = PartType = {}));
var CharacterType;
(function (CharacterType) {
    CharacterType[CharacterType["n"] = 0] = "n";
    CharacterType[CharacterType["a"] = 1] = "a";
    CharacterType[CharacterType["c"] = 2] = "c";
    CharacterType[CharacterType["e"] = 3] = "e";
})(CharacterType || (exports.CharacterType = CharacterType = {}));
const charByCharacterType = {
    [CharacterType.n]: "0123456789",
    [CharacterType.a]: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    [CharacterType.c]: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    [CharacterType.e]: " ",
};
const charByCharacterRE = {
    [CharacterType.n]: /^[0-9]+$/,
    [CharacterType.a]: /^[A-Z]+$/,
    [CharacterType.c]: /^[0-9A-Za-z]+$/,
    [CharacterType.e]: /^ +$/,
};
class BbanStructurePart {
    constructor(entryType, characterType, length, trailingSeparator, generate) {
        this.entryType = entryType;
        this.characterType = characterType;
        this.length = length;
        this.generate = generate || this.defaultGenerator;
        this.hasGenerator = !!generate;
        this.trailingSeparator = trailingSeparator;
    }
    static bankCode(length, characterType, trailingSeparator = true) {
        return new BbanStructurePart(PartType.BANK_CODE, characterType, length, trailingSeparator);
    }
    static branchCode(length, characterType, trailingSeparator = true) {
        return new BbanStructurePart(PartType.BRANCH_CODE, characterType, length, trailingSeparator);
    }
    static accountNumber(length, characterType, trailingSeparator = true) {
        return new BbanStructurePart(PartType.ACCOUNT_NUMBER, characterType, length, trailingSeparator);
    }
    static nationalCheckDigit(length, characterType, generate, trailingSeparator = false) {
        return new BbanStructurePart(PartType.NATIONAL_CHECK_DIGIT, characterType, length, trailingSeparator, generate);
    }
    static branchCheckDigit(length, characterType, generate, trailingSeparator = false) {
        return new BbanStructurePart(PartType.BRANCH_CHECK_DIGIT, characterType, length, trailingSeparator, generate);
    }
    static accountType(length, characterType, trailingSeparator = false) {
        return new BbanStructurePart(PartType.ACCOUNT_TYPE, characterType, length, trailingSeparator);
    }
    static currencyType(length, characterType, trailingSeparator = false) {
        return new BbanStructurePart(PartType.CURRENCY_TYPE, characterType, length, trailingSeparator);
    }
    static ownerAccountNumber(length, characterType, trailingSeparator = true) {
        return new BbanStructurePart(PartType.OWNER_ACCOUNT_NUMBER, characterType, length, trailingSeparator);
    }
    static identificationNumber(length, characterType, trailingSeparator = true) {
        return new BbanStructurePart(PartType.IDENTIFICATION_NUMBER, characterType, length, trailingSeparator);
    }
    getPartType() {
        return this.entryType;
    }
    getCharacterType() {
        return this.characterType;
    }
    getLength() {
        return this.length;
    }
    validate(value) {
        return charByCharacterRE[this.characterType].test(value);
    }
    defaultGenerator(bban, structure) {
        const charChoices = charByCharacterType[this.characterType];
        const s = [];
        for (let i = 0; i < this.getLength(); i += 1) {
            s.push(charChoices[(0, randInt_1.randInt)(charChoices.length)]);
        }
        return s.join("");
    }
}
exports.BbanStructurePart = BbanStructurePart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RydWN0dXJlUGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJ1Y3R1cmVQYXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHVDQUFvQztBQUdwQyxJQUFZLFFBVVg7QUFWRCxXQUFZLFFBQVE7SUFDbEIsaURBQVMsQ0FBQTtJQUNULHFEQUFXLENBQUE7SUFDWCwyREFBYyxDQUFBO0lBQ2QsbUVBQWtCLENBQUE7SUFDbEIsdUVBQW9CLENBQUE7SUFDcEIseURBQWEsQ0FBQTtJQUNiLHVEQUFZLENBQUE7SUFDWix1RUFBb0IsQ0FBQTtJQUNwQix5RUFBcUIsQ0FBQTtBQUN2QixDQUFDLEVBVlcsUUFBUSx3QkFBUixRQUFRLFFBVW5CO0FBS0QsSUFBWSxhQWlCWDtBQWpCRCxXQUFZLGFBQWE7SUFJdkIsMkNBQUMsQ0FBQTtJQUlELDJDQUFDLENBQUE7SUFJRCwyQ0FBQyxDQUFBO0lBSUQsMkNBQUMsQ0FBQTtBQUNILENBQUMsRUFqQlcsYUFBYSw2QkFBYixhQUFhLFFBaUJ4QjtBQUdELE1BQU0sbUJBQW1CLEdBQWtDO0lBQ3pELENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVk7SUFDL0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsNEJBQTRCO0lBQy9DLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLHNDQUFzQztJQUN6RCxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHO0NBQ3ZCLENBQUM7QUFHRixNQUFNLGlCQUFpQixHQUFrQztJQUN2RCxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVO0lBQzdCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVU7SUFDN0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCO0lBQ25DLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU07Q0FDMUIsQ0FBQztBQUlGLE1B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