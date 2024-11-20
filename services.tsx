import axios from "axios";

interface JobPostingResponse {
  json(): unknown;
  title: string;
  postings: JobPosting[];
}

interface JobPosting {
  id: string;
  text: string;
  country: string;
  workplaceType: string;
  opening: string;
  openingPlain: string;
  description: string;
  descriptionPlain: string;
  descriptionBody: string;
  descriptionBodyPlain: string;
  createdAt: number;
  categories: JobCategories;
  lists: JobListItem[];
  additional: string;
  additionalPlain: string;
  hostedUrl: string;
  applyUrl: string;
}

interface JobCategories {
  commitment: string;
  department: string;
  location: string;
  team: string;
  allLocations: string[];
}

interface JobListItem {
  text: string;
  content: string;
}

export const fetchJobs = async (
  companyId: string
): Promise<JobPostingResponse[]> => {
  const url = `https://api.lever.co/v0/postings/${companyId}?group=team`;
  const response = await axios.get<JobPostingResponse[]>(url);
  return response.data;
};
