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
exports.BIC = void 0;
const country_1 = require("./country");
const bicUtil = __importStar(require("./bicUtil"));
class BIC {
    constructor(bic) {
        bicUtil.validate(bic);
        this.value = bic;
    }
    getBankCode() {
        return bicUtil.getBankCode(this.value);
    }
    getCountryCode() {
        return (0, country_1.countryByCode)(bicUtil.getCountryCode(this.value));
    }
    getLocationCode() {
        return bicUtil.getLocationCode(this.value);
    }
    getBranchCode() {
        if (bicUtil.hasBranchCode(this.value)) {
            return bicUtil.getBranchCode(this.value);
        }
        return null;
    }
    toString() {
        return this.value;
    }
    static isValid(bic) {
        try {
            bicUtil.validate(bic);
        }
        catch (_a) {
            return false;
        }
        return true;
    }
}
exports.BIC = BIC;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUF1RDtBQUN2RCxtREFBcUM7QUFPckMsTUFBYSxHQUFHO0lBV2QsWUFBWSxHQUFXO1FBQ3JCLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQU9ELFdBQVc7UUFDVCxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFPRCxjQUFjO1FBQ1osT0FBTyxJQUFBLHVCQUFhLEVBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBT0QsZUFBZTtRQUNiLE9BQU8sT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQU9ELGFBQWE7UUFDWCxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JDLE9BQU8sT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFLRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFPRCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQVc7UUFDeEIsSUFBSTtZQUNGLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkI7UUFBQyxXQUFNO1lBQ04sT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGO0FBNUVELGtCQTRFQyJ9