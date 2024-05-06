type PolicyCardId = string;

export interface PolicyDTO {
  imgSrc: string;
  header: string;
  meta: string;
  desctiption: string[];
}

export interface Policy extends PolicyDTO {
  id: PolicyCardId;
}

export const mock_policies = [
  {
    id: "1",
    desctiption: ["Buy policy", "Fast delivery"],
    header: "Car insurance",
    meta: "Best one out there",
    imgSrc: "/car-insurance.svg",
  },
  {
    id: "2",
    desctiption: ["Buy policy", "Fast delivery"],
    meta: "Best one out there",
    header: "Car insurance",
    imgSrc: "/medical-insurance.svg",
  },
  {
    id: "3",
    desctiption: ["Buy policy", "Fast delivery"],
    meta: "Best one out there",
    header: "Car insurance",
    imgSrc: "/medical-insurance.svg",
  },
] as  Policy[];
