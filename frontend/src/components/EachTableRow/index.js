import "./index.css";

const EachTableRow = (props) => {
  const { eachRow } = props;
  const { name, email, phone, gender, experience, skills } = eachRow;

  return (
    <tr>
      <td className="table-cells">{name}</td>
      <td className="table-cells">{phone}</td>
      <td className="table-cells">{email}</td>
      <td className="table-cells">{gender}</td>
      <td className="table-cells">{experience}</td>
      <td className="table-cells">{skills}</td>
    </tr>
  );
};

export default EachTableRow;
