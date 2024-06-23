import { AuthStorageKeys } from "../enums/AuthStorageKeys";

const loadPolicyTemplates = async () => {
  try {
    const templates = await fetch(
      "http://localhost:5000/api/auth/policy-types",
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
    console.log(await templates.body);
    
    return templates;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default loadPolicyTemplates;
