const ContentsApi = () => {
  const url = "http://localhost:3000";

  return {
    getContents() {
      return fetch(`${url}/conteudo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    deleteContent(contentId) {
      return fetch(`${url}/conteudo/${contentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    createContent(curso, duracao, modalidade, plataforma, nivel, inicio) {
      return fetch(`${url}/conteudo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          curso: curso,
          duracao: duracao,
          modalidade: modalidade,
          plataforma: plataforma,
          nivel: nivel,
          inicio: inicio,
        }),
      });
    },
    updateContent(
      contentId,
      curso,
      duracao,
      modalidade,
      plataforma,
      nivel,
      inicio
    ) {
      return fetch(`${url}/conteudo/${contentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          curso: curso,
          duracao: duracao,
          modalidade: modalidade,
          plataforma: plataforma,
          nivel: nivel,
          inicio: inicio,
        }),
      });
    },
  };
};

export default ContentsApi;
