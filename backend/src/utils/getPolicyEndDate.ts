import DurationUnit from "../types/DurationUnit";
import PolicyPackage from "../types/PolicyPackage";

function getPolicyEndDate(policyPackage: PolicyPackage): Date {
  const endDate = new Date();

  switch (policyPackage.durationUnit) {
    case DurationUnit.HOUR:
      endDate.setHours(endDate.getHours() + policyPackage.duration);
      break;
    case DurationUnit.DAY:
      endDate.setDate(endDate.getDate() + policyPackage.duration);
      break;
    case DurationUnit.WEEK:
      endDate.setDate(endDate.getDate() + policyPackage.duration * 7);
      break;
    case DurationUnit.MONTH:
      endDate.setMonth(endDate.getMonth() + policyPackage.duration);
      break;
    case DurationUnit.YEAR:
      endDate.setFullYear(endDate.getFullYear() + policyPackage.duration);
      break;
    default:
      throw new Error("Invalid duration unit");
  }

  return endDate;
}

export default getPolicyEndDate;
