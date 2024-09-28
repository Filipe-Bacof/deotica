import { Button } from "./Button";

type HeaderPageProps = {
  title: string;
  link: string;
};

export default function HeaderPage({ title, link }: HeaderPageProps) {
  return (
    <section className="m-4 flex flex-col items-center justify-between md:flex-row">
      <h2 className="text-xl font-semibold">{title}</h2>
      <Button asLink to={link}>
        Novo Cliente
      </Button>
    </section>
  );
}
