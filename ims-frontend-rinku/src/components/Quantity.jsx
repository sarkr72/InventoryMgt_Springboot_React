import { useEffect } from "react";
import { useState } from "react";

const Quantity = (props) => {
  const [count, setCount] = useState(0.0);
  const [total, setTotal] = useState(0.0);

  const handleQtyChange = (e) => {
    let x = e.target.value;

    x = parseInt(x);

    if (isNaN(x) || x < 0) {
      setCount(0);
    } else {
      setCount(x);
    }
  };

  useEffect(() => {
    setTotal(count * props.unitPrice);
  }, [count]);

  return (
    <>
      <td>
        <div className="d-flex flex-row mt-2">
          <div className="p-2">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => {
                count <= 0 ? setCount(0) : setCount((c) => c - 1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-dash"
                viewBox="0 0 16 16"
              >
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
              </svg>
            </button>
          </div>

          <div className="p-2">
            <input
              type="text"
              className="form-control"
              style={{ width: 60 }}
              id="qty"
              name="quantity"
              value={count}
              onChange={handleQtyChange}
            />
          </div>
          <div className="p-2">
            {" "}
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => setCount((c) => c + 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            </button>
          </div>
        </div>
      </td>
      <td>${total.toFixed(2)}</td>
    </>
  );
};

export default Quantity;
