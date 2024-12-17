import companyNames from "../json/company.json";
interface CompanyListProps {
  is_selected: (selected: boolean) => void;
  selected_option?: string;
}
const CompanyList: React.FC<CompanyListProps> = ({is_selected, selected_option}) => {
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
   <>
    <select
      name="options"
      className="custom-select"
      value={selected_option}
      onChange={handleSelectChange}
    >
      <option value="">Select Company</option>
      {getCompanyNames()}
    </select>
     {selected_option &&  <span className="custom-select-tooltip">{selected_option || 'Select Company'}</span> }
   </>
  );
};

export default CompanyList;
