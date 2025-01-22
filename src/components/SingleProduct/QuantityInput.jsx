import "./QuantityInput.css";

const QuantityInput = ({ quantity, setQuantity, stock }) => {
  return (
    <>
      <button
        onClick={() => setQuantity((prev) => prev - 1)}
        className="quantity_input_button"
        disabled={quantity <= 1}
      >
        {" "}
        -{" "}
      </button>
      <p className="quantity_input_count">{quantity}</p>
      <button
        onClick={() => setQuantity((prev) => prev + 1)}
        className="quantity_input_button"
        disabled={quantity >= stock}
      >
        {" "}
        +{" "}
      </button>
    </>
  );
};

export default QuantityInput;
