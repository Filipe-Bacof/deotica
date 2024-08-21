export interface NovoCliente {
  nome: string;
  cpf: string;
  telefone?: string;
  email?: string;
  dataNascimento?: Date;
  genero?: string;
  cep?: string;
  uf?: string;
  cidade?: string;
  bairro?: string;
  endereco?: string;
  complemento?: string;
  // createdBy: string; // O ID do usuário vai vir do token de autenticação
}

export interface InserirNovoCliente {
  nome: string;
  cpf: string;
  telefone?: string;
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

export interface EditarCliente {
  nome?: string;
  cpf?: string;
  telefone?: string;
  email?: string;
  dataNascimento?: Date;
  genero?: string;
  cep?: string;
  uf?: string;
  cidade?: string;
  bairro?: string;
  endereco?: string;
  complemento?: string;
}
