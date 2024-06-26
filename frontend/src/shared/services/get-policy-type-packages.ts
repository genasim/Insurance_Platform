import { PolicyPackage_ } from "../../models/PolicyPackage";
import { PolicyType } from "../../models/PolicyType";
import { AuthStorageKeys } from "../enums/AuthStorageKeys";

const getPolicyTypePackages = async (type: PolicyType) => {
    try {
        const packages = await fetch(
          `http://localhost:5000/api/clients/policies/${type}/packages`,
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
        
        return await packages.json() as PolicyPackage_[];
      } catch (error) {
        console.error(error);
        return [];
      }
}

export default getPolicyTypePackages