import Typewriter from "./Typewriter";
import "../styles/Toolbar.scss";

interface ToolbarProps {
  search_job: (query: string) => void;
  search_value: string
}

const Toolbar: React.FC<ToolbarProps> = ({ search_job, search_value }) => {
  const handleSearchJob = (event: React.ChangeEvent<HTMLInputElement>) => {
    search_job(event.target.value);
  };
  return (
    <div className="toolbar">
      <div className="container">
        <div className="cols">
          <div className="col">
            <div className="relative">
              <input type="search" placeholder="" value={search_value} onChange={handleSearchJob} />
              <Typewriter
                dataText="Executive, Engineer, Manager, Director"
                speed={75}
                pauseBetweenWord={1500}
              />
            </div>
          </div>
          <div className="col">
            <div className="relative dropdown-icon">
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
                <path
                  d="M1 1l8 8 8-8"
                  stroke="#3F51B5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>

              <select className="appearance-none" id="locatoinFilter">
                <option value="all">All locations</option>
                <option value="Remote EMEA">Remote EMEA</option>
                <option value="Paris">Paris</option>
                <option value="New York">New York</option>
                <option value="San Francisco">San Francisco</option>
                <option value="London">London</option>
                <option value="Mexico City">Mexico City</option>
                <option value="Madrid">Madrid</option>
                <option value="Berlin">Berlin</option>
                <option value="Sydney">Sydney</option>
                <option value="India">India</option>
                <option value="Seattle">Seattle</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
