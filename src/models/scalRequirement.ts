export interface ScalRequirement {
  reference: string;
  question: string;
  supportingInformation: string;
  currentResponse?: string;
  responseOptions: string[];

  section: string;

  functionalArea?: string;
  jiraStory?: string;
  assignee?: string;
  status?: string;
}
