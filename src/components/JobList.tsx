import "../styles/JobList.scss";
import Toolbar from "./Toolbar";
import { useEffect, useState } from "react";
import { fetchJobs } from "../../services";
import "../styles/JoinUs.scss";
import JobListSkeleton from "../skeleton/JobListSkeleton";
import CompanyList from "../components/CompanyList";
import {getCountryName} from '../utils'

interface JobPostingResponse {
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

const JobList = () => {
  const [currentCompany] = useState(localStorage.getItem("companyName") || "");
  const [jobData, setJobData] = useState<JobPostingResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTeam, setActiveTeam] = useState<string>("");
  const [reloadScreen, setReloadScreen] = useState(false);

  const handleSearchJob = (value: string) => {
    setSearchTerm("");
    setActiveTeam("");
    setSearchTerm(value);
  };

  const totalJobs = () => {
    return jobData.reduce(
      (total: number, item: JobPostingResponse) => total + item.postings.length,
      0
    );
  };

  const displayJobDetails = async (companyId: string) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchJobs(companyId);
      // console.log("Job data response:", data);
      setJobData(data);
    } catch (error) {
      console.error("Error fetching job details:", error);
      setError("Error fetching job details");
    } finally {
      setLoading(false);
    }
  };

  const selectCompany = (value: boolean) => {
    setReloadScreen(value);
  };

  useEffect(() => {
    if (currentCompany) {
      displayJobDetails(currentCompany);
    }
    if (reloadScreen) {
      window.location.reload();
    }
  }, [currentCompany, reloadScreen]);

  const filteredJobData = jobData.filter((list) => {
    return (
      list.title?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      list.postings.some((posting) =>
        posting.text?.toLowerCase().includes(searchTerm?.toLowerCase())
      )
    );
  });

  const handleSearchByTeam = (event: React.MouseEvent<HTMLLIElement>) => {
    const searchByTeam = event.currentTarget.getAttribute("data-attr") || "";
    setSearchTerm(searchByTeam);
    setActiveTeam(searchByTeam);
  };

  const handleAllPositions = () => {
    setSearchTerm("");
    setActiveTeam("");
  };

  if (loading) {
    return <JobListSkeleton />;
  }

  if (error) {
    return (
      <div className="content-not-found">
        <h3>{error}</h3>
      </div>
    );
  }

  if (jobData.length === 0) {
    return (
      <div className="content-not-found">
        <h3>No Job Postings Available</h3>

        {currentCompany ? (
          <h4>Try checking other companies or come back later for updates.</h4>
        ) : (
          <h4>Please select a company to proceed.</h4>
        )}
        <CompanyList is_selected={selectCompany} />
      </div>
    );
  }

  return (
    <>
      <Toolbar search_job={handleSearchJob} search_value={searchTerm} />
      <div className="container job-list-container">
        <ul className="tab-list">
          <li
            className={activeTeam === "" ? "active" : ""}
            onClick={handleAllPositions}
            key="0all"
          >
            All Positions <span>{totalJobs()}</span>
          </li>
          {jobData.map((list: JobPostingResponse, index: number) => (
            <li
              className={activeTeam === list.title ? "active" : ""}
              onClick={handleSearchByTeam}
              key={index}
              data-attr={list.title}
            >
              {list.title} <span>{list.postings.length}</span>
            </li>
          ))}
        </ul>
        {filteredJobData.length === 0 ? (
          <div className="content-not-found job-list">
            <h3>No job postings match these filters.</h3>
            <h4>Please check your entered keyword.</h4>
          </div>
        ) : (
          <ul className="job-list">
            {filteredJobData.map((item: JobPostingResponse, index: number) => (
              <li key={index} className="job-list-item">
                <h2 className="title">{item.title}</h2>
                <ul className="list">
                  {item.postings.map((posting) => (
                    <li key={posting.id} className="list-item">
                      <div className="list-item__left">
                        <span className="commitment-mobile">
                          {posting.categories.commitment}
                        </span>
                        <h3>{posting.text}</h3>
                        <div className="labels">
                          <span>{posting.categories.location}</span>
                          <span>{getCountryName(posting.country)}</span>
                        </div>
                      </div>
                      <div className="list-item__right">
                        <span>{posting.categories.commitment}</span>
                        <a
                          href={posting.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Job Details
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default JobList;
