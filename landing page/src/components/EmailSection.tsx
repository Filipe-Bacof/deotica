import { type FormEvent, type ChangeEvent, useState } from "react";
import Section from "./Section";

export default function EmailSection () {
  const [nomeError, setNomeError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [formValues, setFormValues] = useState<{nome: string, email: string}>({ nome: "", email: "" });
  const [clickedFirstTime, setClickedFirstTime] = useState<boolean>(false)

  const validateNome = (nome: string) => {
    const nomeTrimmed = nome.trim();
    const parts = nomeTrimmed.split(" ");
    if (parts.length < 2) {
      setNomeError("Por favor, insira seu nome e pelo menos um sobrenome.");
      return false;
    }
    setNomeError("");
    return true;
  };

  const validateEmail = (email: string) => {
    const emailTrimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      setEmailError("Por favor, insira um email válido.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setClickedFirstTime(true)

    const isNomeValid = validateNome(formValues.nome);
    const isEmailValid = validateEmail(formValues.email);

    if (!isNomeValid || !isEmailValid) return;

    const formData = {
      nome: formValues.nome.trim(),
      email: formValues.email.trim(),
    };

    fetch("https://deotica-api.vercel.app/promoEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => alert("Cadastro realizado com sucesso!"))
      .catch((error) => console.error("Erro:", error));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (name === "nome") validateNome(value);
    if (name === "email") validateEmail(value);
  };

  return (
    <Section id="contato" title="Cadastre-se para Promoções">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Nome:
          <input
            type="text"
            name="nome"
            value={formValues.nome}
            onChange={handleChange}
            required
            className={`w-full border p-2 rounded ${nomeError && clickedFirstTime ? "border-red-500" : "border-gray-300"}`}
          />
          {nomeError && clickedFirstTime && <p className="text-red-500 text-sm">{nomeError}</p>}
        </label>
        <label className="block">
          Email:
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
            className={`w-full border p-2 rounded ${emailError && clickedFirstTime ? "border-red-500" : "border-gray-300"}`}
          />
          {emailError && clickedFirstTime && <p className="text-red-500 text-sm">{emailError}</p>}
        </label>
        <button type="submit" className="bg-blueDeotica text-white py-2 px-4 rounded hover:bg-blue-500">
          Cadastrar
        </button>
      </form>
    </Section>
  )
}