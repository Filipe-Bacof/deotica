// Garante que o nome tenha pelo menos um nome e um sobrenome
const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;

// Apenas 11 números para CPF
const cpfRegex = /^[0-9]{11}$/;

// Apenas 8 números para CEP
const cepRegex = /^[0-9]{8}$/;

export { nomeRegex, cpfRegex, cepRegex };
