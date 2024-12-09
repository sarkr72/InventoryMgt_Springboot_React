import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ViewPurchaseOrder(props) {
  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>{props.order.po}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Date: {props.order.date}</h5>
          <ol>
            {props.order.productNames.map((name) => (
              <li>{name}</li>
            ))}
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewPurchaseOrder;
