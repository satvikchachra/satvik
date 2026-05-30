import { EXPERIENCE_DATA } from './content';

export interface ExperienceItem {
  readonly year: string;
  readonly company: string;
  readonly companyUrl: string;
  readonly role: string;
  readonly description: string;
}

export const EXPERIENCE: readonly ExperienceItem[] = EXPERIENCE_DATA;
