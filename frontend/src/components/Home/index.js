import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EachTableRow from "../EachTableRow";
import "./index.css";

const headersList = [
  { id: 1, text: "Candidate Name" },
  { id: 2, text: "Phone" },
  { id: 3, text: "Email" },
  { id: 4, text: "Gender" },
  { id: 5, text: "Experience (in years)" },
  { id: 6, text: "Skills" },
];

const experienceList = [
  { id: "0year", text: "0" },
  { id: "1year", text: "1" },
  { id: "2years", text: "2" },
  { id: "3years", text: "3" },
  { id: "4years+", text: "4+" },
];

const skillsList = [
  { id: "HTML", text: "HTML" },
  { id: "CSS", text: "CSS" },
  { id: "BOOTSTRAP", text: "Bootstrap" },
  { id: "JAVASCRIPT", text: "Javascript" },
  { id: "REACTJS", text: "Reactjs" },
  { id: "SQL", text: "SQL" },
  { id: "NODEJS", text: "Nodejs" },
];

const Home = () => {
  const [dataList, setDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [experience, setExperience] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    getCandidatesData();
  }, []);

  useEffect(() => {
    filterCandidates();
    // eslint-disable-next-line
  }, [userSearch, experience, selectedSkills, dataList]);

  const getUserSearched = (event) => {
    setUserSearch(event.target.value.toLowerCase());
  };

  const handleExperienceChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setExperience([...experience, value]);
    } else {
      setExperience(experience.filter((exp) => exp !== value));
    }
  };

  const handleSkillChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedSkills([...selectedSkills, value]);
    } else {
      setSelectedSkills(selectedSkills.filter((skill) => skill !== value));
    }
  };

  const getCandidatesData = async () => {
    const url = "https://truleeinnovate-r4p6.onrender.com/";
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      setDataList(data);
      setFilteredData(data);
    }
  };

  const filterCandidates = () => {
    let filtered = [...dataList];

    //search filter
    if (userSearch) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(userSearch) ||
          candidate.email.toLowerCase().includes(userSearch) ||
          candidate.phone.toLowerCase().includes(userSearch)
      );
    }

    //experience filter
    if (experience.length > 0) {
      filtered = filtered.filter((candidate) => {
        if (experience.includes("4+") && candidate.experience >= 4) return true;
        return experience.includes(candidate.experience.toString());
      });
    }

    // skills filter
    if (selectedSkills.length > 0) {
      filtered = filtered.filter((candidate) => {
        const candidateSkills = candidate.skills
          .toLowerCase()
          .split(",")
          .map((skill) => skill.trim());
        return selectedSkills.some((selectedSkill) =>
          candidateSkills.includes(selectedSkill.toLowerCase())
        );
      });
    }

    setFilteredData(filtered);
  };

  return (
    <div className="main-home-container">
      <div className="heading-and-add-button-container">
        <h1 className="main-heading">Candidates</h1>
        <Link to="/add-candidate">
          <button type="button" className="add-button">
            Add Candidate
          </button>
        </Link>
      </div>
      <div className="search-and-filter-container">
        <input
          value={userSearch}
          onChange={getUserSearched}
          className="search-input"
          type="search"
          placeholder="Search by Candidate, Email, Phone"
        />
      </div>
      <div className="table-main-container">
        <table className="table">
          <thead>
            <tr>
              {headersList.map((each) => (
                <th key={each.id} className="table-cells">
                  {each.text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((eachRow) => (
              <EachTableRow key={eachRow.email} eachRow={eachRow} />
            ))}
          </tbody>
        </table>
        <div className="filters-container">
          <label className="label">Experience (in years):</label>
          <br />
          {experienceList.map((each) => (
            <div key={each.id}>
              <input
                onChange={handleExperienceChange}
                value={each.text}
                id={each.id}
                type="checkbox"
                className="checkbox"
                checked={experience.includes(each.text)}
              />
              <label className="label" htmlFor={each.id}>
                {each.text}
              </label>
              <br />
            </div>
          ))}
          <br />
          <label className="label">Skills:</label>
          <br />
          {skillsList.map((each) => (
            <div key={each.id}>
              <input
                onChange={handleSkillChange}
                value={each.id}
                id={each.id}
                type="checkbox"
                className="checkbox"
                checked={selectedSkills.includes(each.id)}
              />
              <label className="label" htmlFor={each.id}>
                {each.text}
              </label>
              <br />
            </div>
          ))}
          <br />
        </div>
      </div>
    </div>
  );
};

export default Home;
