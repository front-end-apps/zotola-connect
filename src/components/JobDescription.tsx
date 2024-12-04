import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { fetchJobs } from "../../services";
import { getCountryName, convertTimestamp } from "../utils";
import JobDescriptionSkeleton from '../skeleton/JobDescriptionSkeleton'
import "../styles/JobDescription.scss";
import whatsappIcon from "../assets/whatsapp.svg";
import linkedinIcon from "../assets/linkedin.svg";
import twitterIcon from "../assets/twitter.svg";
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

const parseHTML = (htmlString: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  return doc.body.innerHTML;
};

const JobDescription = () => {
  const [jobDescriptionData, setJobDescriptionData] =
    useState<JobPosting | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { jobId, companyName } = useParams();

  const displayJobDetails = useCallback(
    async (companyName: string) => {
      if (!companyName || !jobId) return;

      setLoading(true);
      setError(null);

      try {
        const data = await fetchJobs(companyName);

        const jobPosting = data.find((item: JobPostingResponse) =>
          item.postings.some((posting) => posting.id === jobId)
        );

        if (jobPosting) {
          const specificJob = jobPosting.postings.find(
            (posting) => posting.id === jobId
          );

          if (specificJob) {
            const sanitizedJob = {
              ...specificJob,
              description: parseHTML(specificJob.description),
              opening: parseHTML(specificJob.opening),
              additional: parseHTML(specificJob.additional),
              lists: specificJob.lists.map((item) => ({
                ...item,
                content: parseHTML(item.content),
              })),
            };
            setJobDescriptionData(sanitizedJob);
          } else {
            setJobDescriptionData(null);
          }
        } else {
          setJobDescriptionData(null);
        }
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("An error occurred while fetching the job details.");
      } finally {
        setLoading(false);
      }
    },
    [jobId]
  );

  useEffect(() => {
    if (companyName) {
      displayJobDetails(companyName);
    }
  }, [companyName, displayJobDetails]);

  const currentURL = window.location.href;


  return (
    <>
      {loading && <JobDescriptionSkeleton/>}
      {error && <p className="error">{error}</p>}
      {jobDescriptionData && (
        <div className="container job-description-container">
          <div className="left-container">
            {jobDescriptionData ? (
              <>
                <h3>{jobDescriptionData.text}</h3>
                <div className="details-list">  
                  <span>{jobDescriptionData.categories?.commitment}</span>
                  <span>{jobDescriptionData.categories?.department} Department</span>
                  <span>{jobDescriptionData.categories?.team} Team</span>
                  <span>{jobDescriptionData.categories?.location}</span>
                  <span>{getCountryName(jobDescriptionData?.country)}</span>
                  <span>Created On: {convertTimestamp(jobDescriptionData?.createdAt)}</span>
                  <div className="share-it">
                    <a href={`https://wa.me/?text=${currentURL}`} target="_blank" rel="noopener noreferrer">
                      <img src={whatsappIcon} alt="Share on Facebook" height="30" width="30" loading="lazy"/>
                    </a>
                    <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentURL}`} target="_blank" rel="noopener noreferrer">
                      <img src={linkedinIcon} alt="Share on LinkedIn" height="30" width="30" loading="lazy"/>
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${currentURL}`} target="_blank" rel="noopener noreferrer">
                      <img src={twitterIcon} alt="Share on X" height="30" width="30" loading="lazy"/>
                    </a>
                  </div>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: jobDescriptionData.description,
                  }}
                />

                <ul>
                  {jobDescriptionData.lists.map((listItem, index) => (
                    <li key={index}>
                      <strong>{listItem.text}:</strong>{" "}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: listItem.content,
                        }}
                      />
                    </li>
                  ))}
                </ul>

                <div
                  dangerouslySetInnerHTML={{
                    __html: jobDescriptionData.additional,
                  }}
                />

                <p>
                  <strong>Country:</strong>{" "}
                  {getCountryName(jobDescriptionData.country)}
                </p>
                <p>
                  <strong>Workplace Type:</strong>{" "}
                  {jobDescriptionData.workplaceType}
                </p>
                <p>
                  <strong>Opening:</strong>{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: jobDescriptionData.opening,
                    }}
                  />
                </p>
                <a
                  href={jobDescriptionData.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apply-now"
                >
                  Apply Now
                </a>
              </>
            ) : (
              !loading && <p>Job posting not found</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default JobDescription;
