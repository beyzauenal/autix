export type CarColor = "rot" | "blau" | "schwarz";
export type CarRims = "standard" | "sport" | "premium";
export type CarLights = "halogen" | "led" | "matrix";

export interface UserStory {
  id: string;
  title: string;
  description?: string;
}
