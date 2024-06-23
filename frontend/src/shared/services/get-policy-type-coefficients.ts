import { CalculationCoefficient_ } from "../../models/CalculationCoefficient";
import { PolicyType } from "../../models/PolicyType";
import { AuthStorageKeys } from "../enums/AuthStorageKeys";

const getPolicyTypeCoefficients = async (type: PolicyType) => {
  try {
    const coefficients = await fetch(
      `http://localhost:5000/api/clients/policies/${type}/coefficients`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem(
            AuthStorageKeys.TOKEN
          )}`,
        },
      }
    );

    return (await coefficients.json()) as CalculationCoefficient_[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getPolicyTypeCoefficients;
