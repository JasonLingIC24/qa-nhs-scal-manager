export interface ScalRequirement {
  reference: string;
  title: string;

  section: string;

  question: string;
  supportingInformation: string;

  currentResponse?: string;
  responseOptions: string[];

  functionalArea?: string;
  jiraStory?: string;
  assignee?: string;
  status?: string;
}
