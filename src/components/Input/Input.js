import "./Input.css";

const Input = (props) => {
  const { label } = props;
  return (
    <div className="f-group">
      <label className="label">{label}:</label>
      <input className="input-sm" {...props} />
    </div>
  );
};

export default Input;
