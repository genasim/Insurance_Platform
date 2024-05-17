import { FC, useMemo, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { ClaimDocument } from "../../../models/ClaimDocument";

interface DocumentPreviewerProps {
  document: ClaimDocument;
}

const DocumentPreviewer: FC<DocumentPreviewerProps> = ({ document }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const FilePreview = useMemo(() => {
    const fileType = document.document.split(";")[0].split(":")[1];
    const base64Data = document.document.split(",")[1];
    const fileBlob = new Blob(
      [Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0))],
      { type: fileType }
    );
    const fileURL = URL.createObjectURL(fileBlob);

    switch (true) {
      case fileType.startsWith("image/"):
        return (
          <img src={fileURL} alt="Document preview" className="img-fluid" />
        );
      case fileType === "application/pdf":
        return (
          <iframe
            src={fileURL}
            title="PDF preview"
            width="100%"
            height="600px"
          />
        );
      case fileType.startsWith("text/"):
        return (
          <iframe
            src={fileURL}
            title="Text file preview"
            width="100%"
            height="600px"
          />
        );
      default:
        return <p>File type not supported for preview.</p>;
    }
  }, [document.document]);

  return (
    <>
      <Form.Group className="d-flex w-100 mb-4">
        <InputGroup>
          <InputGroup.Text className="rounded-top-0">
            Description:
          </InputGroup.Text>
          <Form.Control
            className="rounded-end-0 bg-white"
            type="text"
            value={document.description}
            disabled
          />
        </InputGroup>
        <Button
          variant="secondary"
          onClick={handleShow}
          className="rounded-start-0"
        >
          <i className="bi bi-eye"></i>
        </Button>
      </Form.Group>

      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>File Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>{FilePreview}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DocumentPreviewer;
