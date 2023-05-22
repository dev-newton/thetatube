import "./Button.css";

const Button = ({ id, label, onClick }) => {
  return (
    <button id={id} onClick={onClick} className="btn-create">
      {label}
    </button>
  );
};

export default Button;
