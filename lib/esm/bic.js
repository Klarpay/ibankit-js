import { countryByCode } from "./country";
import * as bicUtil from "./bicUtil";
export class BIC {
    constructor(bic) {
        bicUtil.validate(bic);
        this.value = bic;
    }
    getBankCode() {
        return bicUtil.getBankCode(this.value);
    }
    getCountryCode() {
        return countryByCode(bicUtil.getCountryCode(this.value));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWUsYUFBYSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3ZELE9BQU8sS0FBSyxPQUFPLE1BQU0sV0FBVyxDQUFDO0FBT3JDLE1BQU0sT0FBTyxHQUFHO0lBV2QsWUFBWSxHQUFXO1FBQ3JCLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQU9ELFdBQVc7UUFDVCxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFPRCxjQUFjO1FBQ1osT0FBTyxhQUFhLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBT0QsZUFBZTtRQUNiLE9BQU8sT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQU9ELGFBQWE7UUFDWCxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JDLE9BQU8sT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFLRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFPRCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQVc7UUFDeEIsSUFBSTtZQUNGLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkI7UUFBQyxXQUFNO1lBQ04sT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGIn0=