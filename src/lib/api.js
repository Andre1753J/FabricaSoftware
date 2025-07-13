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
  deletarAnimal: (key, animalId) => `${API_BASE_URL}/deletar_animal/${key}/${animalId}`,

  // Adoção
  solicitarAdocao: (key, animalId) => `${API_BASE_URL}/solicitar_adocao/${key}/${animalId}`,
  listarAdocoesCliente: (key) => `${API_BASE_URL}/listar_adocoes_cliente/${key}`,
  listarPedidosRecebidos: (key) => `${API_BASE_URL}/listar_pedidos_recebidos/${key}`,
  aceitarAdocao: (key, adocaoId) => `${API_BASE_URL}/aceitar_adocao/${key}/${adocaoId}`,
  recusarAdocao: (key, adocaoId) => `${API_BASE_URL}/recusar_adocao/${key}/${adocaoId}`,
  cancelarAdocao: (key, adocaoId) => `${API_BASE_URL}/cancelar_adocao/${key}/${adocaoId}`,

  // buscarAnimal: (animalId) => `${API_BASE_URL}/animal/${animalId}`,
  // buscarCliente: (clienteId) => `${API_BASE_URL}/cliente/${clienteId}`,
};