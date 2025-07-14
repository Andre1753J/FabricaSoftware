// Centralização das rotas da API do PetsWorld

export const API_BASE_URL = "https://petsworldapi.dev.vilhena.ifro.edu.br";
// export const API_BASE_URL = "https://localhost:9000";

export const API_ROUTES = {
  // Autenticação
  login: `${API_BASE_URL}/login`,

  // Cliente
  cadastrarCliente: `${API_BASE_URL}/cadastrar_c`,
  cadastrarClientePt2: (key) => `${API_BASE_URL}/cadastrar_c_pt2/${key}`,
  infoCliente: (key) => `${API_BASE_URL}/info_c/${key}`,
  listarClientes: `${API_BASE_URL}/listar_clientes`,
  editarCliente: (key) => `${API_BASE_URL}/editar_cliente/${key}`,
  mudarSenha: (key) => `${API_BASE_URL}/mudar_senha/${key}`,
  deletarCliente: (key) => `${API_BASE_URL}/deletar_cliente/${key}`,

  // Animal
  uploadImagem: (key, type, animalId) => `${API_BASE_URL}/upload/${key}/type/${type}/animal/${animalId}`,
  cadastrarAnimal: (key) => `${API_BASE_URL}/cadastrar_a/${key}`,
  listarAnimais: `${API_BASE_URL}/listar_animais`,
  listarAnimaisCliente: (key) => `${API_BASE_URL}/listar_animais_cliente/${key}`,
  editarAnimal: (key, animalId) => `${API_BASE_URL}/editar_a/${key}/${animalId}`,
  deletarAnimal: (key, animalId) => `${API_BASE_URL}/remover_a/${key}/${animalId}`, // Corrigido para corresponder ao backend
  detalharAnimal: (id) => `${API_BASE_URL}/animal/${id}`, // Rota que estava faltando

  // Adoção
  solicitarAdocao: (key) => `${API_BASE_URL}/solicitar_adocao/${key}`, // O ID do animal vai no corpo da requisição
  minhasSolicitacoes: (key) => `${API_BASE_URL}/minhas_solicitacoes/${key}`,
  solicitacoesRecebidas: (key) => `${API_BASE_URL}/solicitacoes_recebidas/${key}`,
  resolverAdocao: (key) => `${API_BASE_URL}/resolver_adocao/${key}`, // O ID da adoção e o status vão no corpo
  cancelarAdocao: (key, animalId) => `${API_BASE_URL}/cancelar_adocao/${key}/${animalId}`,

  // Imagem
  imagem: (nome) => `${API_BASE_URL}/imagem/${nome}`, // Rota que estava faltando
};