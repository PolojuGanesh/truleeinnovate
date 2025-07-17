import { useState } from "react";
import { Link } from "react-router-dom";

import "./index.css";

const genderList = [
  { id: "Male", text: "Male" },
  { id: "Female", text: "Female" },
  { id: "Others", text: "Others" },
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

const AddCandidate = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState(genderList[0].text);
  const [experience, setExperience] = useState(experienceList[0].text);
  const [skills, setSkills] = useState(skillsList[0].text);

  const getName = (event) => {
    setName(event.target.value);
  };

  const getPhone = (event) => {
    setPhone(event.target.value);
  };

  const getEmail = (event) => {
    setEmail(event.target.value);
  };

  const getGender = (event) => {
    setGender(event.target.value);
  };

  const getExperience = (event) => {
    setExperience(event.target.value);
  };

  const getSkills = (event) => {
    setSkills(event.target.value);
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const candidateDetails = { name, phone, email, gender, experience, skills };
    const url = `https://truleeinnovate-r4p6.onrender.com/add-candidate`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(candidateDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      setStatus(data.data);
      setErrorMsg((prev) => !prev);
      setName("");
      setPhone("");
      setEmail("");
      setGender(genderList[0].text);
      setExperience(experienceList[0].text);
      setSkills(skillsList[0].text);
    } else {
      setStatus(data.error_msg);
      setErrorMsg((prev) => !prev);
    }
  };

  return (
    <div className="add-candidate-main-container">
      <form onSubmit={onSubmitForm} className="form-container">
        <label htmlFor="name" className="label">
          Name
        </label>
        <input
          required
          value={name}
          onChange={getName}
          type="text"
          id="name"
          className="input"
          placeholder="John"
        />
        <label htmlFor="phone" className="label">
          Phone
        </label>
        <input
          required
          value={phone}
          onChange={getPhone}
          type="number"
          id="phone"
          className="input"
          placeholder="1234567890"
        />
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          required
          value={email}
          onChange={getEmail}
          type="email"
          id="email"
          className="input"
          placeholder="example@gmail.com"
        />
        <label htmlFor="gender" className="label">
          Gender
        </label>
        <select
          className="input"
          required
          value={gender}
          onChange={getGender}
          id="gender"
        >
          {genderList.map((each) => (
            <option value={each.text} key={each.id}>
              {each.text}
            </option>
          ))}
        </select>
        <label htmlFor="experience" className="label">
          Experience
        </label>
        <select
          className="input"
          required
          value={experience}
          onChange={getExperience}
          id="experience"
        >
          {experienceList.map((each) => (
            <option value={each.text} key={each.id}>
              {each.text}
            </option>
          ))}
        </select>
        <label htmlFor="skills" className="label">
          Skills
        </label>
        <select
          className="input"
          required
          value={skills}
          onChange={getSkills}
          id="skills"
        >
          {skillsList.map((each) => (
            <option value={each.text} key={each.id}>
              {each.text}
            </option>
          ))}
        </select>
        <button className="submit-button" type="submit">
          Submit
        </button>
        {errorMsg && <p className="error-msg">{status}</p>}
      </form>
      <Link to="/">
        <button className="back-to-home-button">Back to Table</button>
      </Link>
    </div>
  );
};

export default AddCandidate;
