export interface Cliente {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  email?: string;
  dataNascimento?: Date;
  genero?: string;
  cep?: string;
  uf?: string;
  cidade?: string;
  bairro?: string;
  endereco?: string;
  complemento?: string;
  createdBy: string;
}

export type InserirCliente = Omit<Cliente, "id">;

export type CriarCliente = Omit<InserirCliente, "createdBy">;

export type EditarCliente = Partial<CriarCliente>;
