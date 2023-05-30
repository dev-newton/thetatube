import "./Button.css";

const Button = ({ id, label, style, onClick }) => {
  return (
    <button id={id} onClick={onClick} className="btn-create" style={style}>
      {label}
    </button>
  );
};

export default Button;
