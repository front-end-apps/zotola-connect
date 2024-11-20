import '../styles/JobListSkeleton.scss'
const JobListSkeleton = () => {
  return (
    <div className="container job-list-container ">
      <ul id="tabList" className="tab-list">
        <li className="no-event">
          <div className="shimmer"></div>
        </li>
        <li className="no-event">
          <div className="shimmer"></div>
        </li>
        <li className="no-event">
          <div className="shimmer"></div>
        </li>
        <li className="no-event">
          <div className="shimmer"></div>
        </li>
        <li className="no-event">
          <div className="shimmer"></div>
        </li>
        <li className="no-event">
          <div className="shimmer"></div>
        </li>
        <li className="no-event">
          <div className="shimmer"></div>
        </li>
      </ul>
      <ul id="jobList" className="job-list">
        <li>
          <div
            className="shimmer mb-30 mt-25"
            style={{ height: "100px" }}
          ></div>
        </li>
        <li>
          <div
            className="shimmer mb-30 mt-25"
            style={{ height: "100px" }}
          ></div>
        </li>
        <li>
          <div
            className="shimmer mb-30 mt-25"
            style={{ height: "100px" }}
          ></div>
        </li>
      </ul>
    </div>
  );
};

export default JobListSkeleton;
