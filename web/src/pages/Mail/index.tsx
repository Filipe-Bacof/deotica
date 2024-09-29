import { useQuery } from "@tanstack/react-query";
import SidebarAndHeader from "../../components/SidebarAndHeader";
import { getAllPromoEmails, sendSimpleMessage } from "../../api/promoEmail";
import { Button } from "../../components/Button";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Mail() {
  const [message, setMessage] = useState<string>("");
  const [emails, setEmails] = useState<string[]>([]);
  const [isSending, setIsSending] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ["emails"],
    queryFn: getAllPromoEmails,
    staleTime: 1000 * 60,
  });

  const handleEmailChange = (email: string) => {
    setEmails((prev) => {
      if (prev.includes(email)) {
        return prev.filter((e) => e !== email);
      }
      return [...prev, email];
    });
  };

  const handleSubmit = async () => {
    if (emails.length === 0) {
      toast.error("Por favor, selecione pelo menos um email.");
      return;
    }
    if (!message) {
      toast.error("A mensagem não pode estar vazia.");
      return;
    }

    setIsSending(true);

    try {
      const data = await sendSimpleMessage({ emails, message });
      const messages = data.map((item) => {
        return item.status ? `Sucesso: ${item.email}` : `Falha: ${item.email}`;
      });
      toast.success(messages.join("\n"));
      setMessage("");
      if (data.some((item) => item.status === false)) {
        const emailsToCheck = data
          .filter((email) => email.status === false)
          .map((email) => email.email);
        toast.warning("E-mails que falharam o envio estão ainda marcados!");
        toast.warning(
          "E-mails que falharam o envio estão no campo de mensagens separados por vírgula!",
        );
        setEmails(emailsToCheck);
        setMessage(emailsToCheck.join(", "));
      } else {
        setEmails([]);
      }
    } catch (error) {
      toast.error("Erro ao enviar os emails.");
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <SidebarAndHeader selected="Email Promocional">
      <main className="flex h-full flex-col">
        <section className="m-4 flex flex-col items-center justify-between md:flex-row">
          <h2 className="text-xl font-semibold">
            Envio de E-mails promocionais
          </h2>
          <Button
            disabled={isSending}
            onClick={handleSubmit}
            variant="creation"
          >
            Enviar Mensagens
          </Button>
        </section>
        <section className="m-4 flex flex-col items-center justify-between md:flex-row">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem aqui"
            className="w-full rounded-md border border-zinc-400 px-2 py-1"
          />
        </section>
        <section className="mx-4 flex flex-col gap-1 pb-8 md:flex-1 md:overflow-y-scroll">
          {data
            ? data.map((item) => (
                <div
                  key={item.id}
                  className="flex w-full flex-row items-center justify-between"
                >
                  <input
                    type="checkbox"
                    disabled={!item.ativo}
                    checked={emails.includes(item.email)}
                    onChange={() => handleEmailChange(item.email)}
                  />
                  <p className={`w-5/12 ${!item.ativo && "text-red-500"}`}>
                    {item.nome}
                  </p>
                  <p className={`w-5/12 ${!item.ativo && "text-red-500"}`}>
                    {item.email}
                  </p>
                </div>
              ))
            : null}
        </section>
      </main>
    </SidebarAndHeader>
  );
}
