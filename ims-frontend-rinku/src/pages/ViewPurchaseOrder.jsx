import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {PDFViewer} from '@react-pdf/renderer';
import Pdf from "../components/Pdf";

function ViewPurchaseOrder(props) {
  
  return (
    <>
      <Modal {...props}>
      <PDFViewer style={{ width: '100%', height: '600px' }}>
        <Pdf order={props.order}/>
      </PDFViewer>

      </Modal>
    </>
  );
}

export default ViewPurchaseOrder;
