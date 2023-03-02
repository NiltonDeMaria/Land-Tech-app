import { Table, Container, Button, Nav } from "react-bootstrap";
import ContentsApi from "./api/ContentsApi";
import { useEffect, useState } from "react";
import CreateContentModal from "./components/CreateContentModal";
import UpdateContentModal from "./components/UpdateContentModal";
import "./App.css";


function App() {
  const [contents, setContents] = useState();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState();

  const handleCloseCreateModal = () => setIsCreateModalOpen(false);
  const handleShowCreateModal = () => setIsCreateModalOpen(true);

  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);
  const handleShowUpdateModal = () => setIsUpdateModalOpen(true);

  useEffect(() => {
    async function getData() {
      await ContentsApi()
        .getContents()
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          setContents(data);
        });
    }

    getData();
  }, []);

  async function deleteContent(contentId) {
    try {
      await ContentsApi().deleteContent(contentId);

      const formattedContents = contents.filter((cont) => {
        if (cont.id !== contentId) {
          return cont;
        }
      });

      setContents(formattedContents);
    } catch (err) {
      throw err;
    }
  }

  async function createContent(event) {
    try {
      event.preventDefault();

      const req = event.currentTarget.elements;

      await ContentsApi()
        .createContent(
          req.curso.value,
          req.duracao.value,
          req.modalidade.value,
          req.plataforma.value,
          req.nivel.value,
          req.inicio.value
        )
        .then((data) => {
          return data.json();
        })
        .then((res) => {
          setContents([
            ...contents,
            {
              id: res.contentId,
              curso: req.curso.value,
              duracao: req.duracao.value,
              modalidade: req.modalidade.value,
              plataforma: req.plataforma.value,
              nivel: req.nivel.value,
              inicio: req.inicio.value,
            },
          ]);

          setIsCreateModalOpen(false);
        });
    } catch (err) {
      throw err;
    }
  }

  async function updateContent(event) {
    try {
      event.preventDefault();

      const req = event.currentTarget.elements;

      await ContentsApi().updateContent(
        selectedContent.id,
        req.curso.value,
        req.duracao.value,
        req.modalidade.value,
        req.plataforma.value,
        req.nivel.value,
        req.inicio.value
      );

      const formattedContents = contents.map((cont) => {
        if (cont.id === selectedContent.id) {
          return {
            id: selectedContent.id,
            curso: req.curso.value,
            duracao: req.duracao.value,
            modalidade: req.modalidade.value,
            plataforma: req.plataforma.value,
            nivel: req.nivel.value,
            inicio: req.inicio.value,
          };
        }

        return cont;
      });

      setContents(formattedContents);

      setIsUpdateModalOpen(false);
    } catch (err) {
      throw err;
    }
  }

  return (
    <>
      
      <Container
        className="
        d-flex
        flex-column
        align-items-start
        justify-content-center
        h-100
        w-100
        "

      >
          <div
        className="mb-2">
          <input type={"button"} value={"Adicionar Novo Curso"} onClick={handleShowCreateModal}/>
        </div>
        <div className="logo">
        </div>
    
        <Table bordered
        >
          <thead className="borda">
            <tr className="principal">
              <th>Curso</th>
              <th>Duração</th>
              <th>Modalidade</th>
              <th>Plataforma</th>
              <th>Nível</th>
              <th>Início</th>
              <th></th>
            </tr>
          </thead>

          <tbody className="borda">
            {contents &&
              contents.map((cont) => (
                <tr key={cont.id}>
                  <td>{cont.curso}</td>
                  <td>{cont.duracao}</td>
                  <td>{cont.modalidade}</td>
                  <td>
                    <Nav>
                      <Nav.Item>
                        <Nav.Link target="_blank" href={cont.plataforma}>
                          <div className="link">{cont.plataforma}</div>

                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </td>
                  <td>{cont.nivel}</td>
                  <td>{cont.inicio}</td>
                  <td>
                    
                    <div>
                      <input type={"button"} value={"Excluir"} onClick={() => deleteContent(cont.id)} className="excluir" />
                      <input type={"button"} value={"Incluir"} onClick={() => {
                        handleShowUpdateModal();
                        setSelectedContent(cont);
                      }} className="incluir"/>
                    </div>
    
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
      <CreateContentModal
        isModalOpen={isCreateModalOpen}
        handleClose={handleCloseCreateModal}
        createContent={createContent}
      />
      {
        selectedContent && (
          <UpdateContentModal
            isModalOpen={isUpdateModalOpen}
            handleClose={handleCloseUpdateModal}
            updateContent={updateContent}
            content={selectedContent}
          />
        )
      }
    </>
  );
}

export default App;
