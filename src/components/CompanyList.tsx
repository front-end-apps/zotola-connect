import companyNames from "../json/company.json";
interface CompanyListProps {
  is_selected: (selected: boolean) => void;
}
const CompanyList: React.FC<CompanyListProps> = ({is_selected}) => {
  const getCompanyNames = () => {
    return companyNames.map((item) => (
      <option key={item.name} value={item.name}>
        {item.name}
      </option>
    ));
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem("companyName", event.target.value)
    is_selected(true);
  };
  return (
    <select
      name="options"
      className="custom-select"
      onChange={handleSelectChange}
    >
      <option value="">Select Company</option>
      {getCompanyNames()}
    </select>
  );
};

export default CompanyList;
