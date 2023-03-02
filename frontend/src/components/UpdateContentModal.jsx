import { Modal, Button, Form } from "react-bootstrap";
function UpdateContentModal(props) {
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={props.isModalOpen}>
        <Form
          onSubmit={(event) => {
            props.updateContent(event);
          }}
        >
          <Modal.Header closeButton onClick={props.handleClose}>
            <Modal.Title>Atualizar Curso</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group controlId="curso">
              <Form.Label>Curso</Form.Label>
              <Form.Control defaultValue={props.content.curso} type="text" />
            </Form.Group>

            <Form.Group controlId="duracao">
              <Form.Label>Duração</Form.Label>
              <Form.Control defaultValue={props.content.duracao} type="text" />
            </Form.Group>

            <Form.Group controlId="modalidade">
              <Form.Label>Modalidade</Form.Label>
              <Form.Control
                defaultValue={props.content.modalidade}
                type="text"
              />
            </Form.Group>

            <Form.Group controlId="plataforma">
              <Form.Label>Plataforma</Form.Label>
              <Form.Control
                defaultValue={props.content.plataforma}
                type="text"
              />
            </Form.Group>

            <Form.Group controlId="nivel">
              <Form.Label>Nível</Form.Label>
              <Form.Control defaultValue={props.content.nivel} type="text" />
            </Form.Group>

            <Form.Group controlId="inicio">
              <Form.Label>Início</Form.Label>
              <Form.Control defaultValue={props.content.inicio} type="text" />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default UpdateContentModal;
