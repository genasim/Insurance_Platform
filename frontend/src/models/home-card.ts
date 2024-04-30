export interface HomeCard {
  id: string;
  title: string;
  imageUrl: string;
}

export const homeCards: readonly HomeCard[] = [
  { id: "1", title: "Pay by card", imageUrl: "/home-cards/debit.svg" },
  { id: "2", title: "Quick & easy", imageUrl: "/home-cards/clock.svg" },
  { id: "3", title: "Get via email", imageUrl: "/home-cards/email.svg" },
];
