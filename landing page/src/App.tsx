import type { FormEvent } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Section from "./components/Section";

export default function App() {

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
  
    fetch("https://deotica-api.vercel.app/promoEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => alert("Cadastro realizado com sucesso!"))
      .catch((error) => console.error("Erro:", error));
  };

  return (
    <div className="font-sans bg-gray-50 text-gray-900">
      <Header />
      <main>
        <Section id="sobre" title="Um Novo Olhar Em sua Vida 💙">
          <p>
            Bem-vindo à nossa ótica! Oferecemos atendimento personalizado e com laboratório próprio para garantir a melhor qualidade em cada peça. Conte com a gente para enxergar o mundo com mais clareza e estilo!
          </p>
        </Section>
        <Section id="domicilio" title="Atendimento a Domicílio">
          <p>
            Precisa de ajuda com seus óculos no conforto da sua casa? Nós vamos até você! Agende seu atendimento a domicílio pelo WhatsApp:
          </p>
          <p>
            <a href="https://wa.me/5551983313692?text=Ol%C3%A1!%20Visualizei%20o%20site%20da%20De%C3%B3tica%20e%20gostaria%20de%20me%20informar%20melhor%20sobre%20os%20produtos%20e%20descontos!%20%F0%9F%98%8E" target="_blank" rel="noopener noreferrer" className="text-blue-500">
              📱 (51) 98331-3692
            </a>
          </p>
        </Section>
        <Section id="presencial" title="Atendimento Presencial">
          <p>
            Venha nos visitar e confira nossa variedade de armações, lentes e acessórios! Estamos na Av. Getúlio Vargas, 2451 - Centro, Esteio - RS.
          </p>
        </Section>
        <Section id="desconto" title="Desconto Exclusivo">
          <p>
            Por ter acessado nosso site, você ganha um desconto especial em sua compra! Visite-nos ou entre em contato para saber mais.
          </p>
        </Section>
        <Section id="contato" title="Cadastre-se para Promoções">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              Nome:
              <input type="text" name="nome" required className="w-full border border-gray-300 p-2 rounded" />
            </label>
            <label className="block">
              Email:
              <input type="email" name="email" required className="w-full border border-gray-300 p-2 rounded" />
            </label>
            <button type="submit" className="bg-blueDeotica text-white py-2 px-4 rounded hover:bg-blue-500">
              Cadastrar
            </button>
          </form>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
