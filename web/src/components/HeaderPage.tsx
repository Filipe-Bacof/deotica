import { Button } from "./Button";

type HeaderPageProps = {
  title: string;
  link: string;
  btnTitle: string;
  secondBtn?: {
    link: string;
    btnTitle: string;
  };
};

export default function HeaderPage({
  title,
  link,
  btnTitle,
  secondBtn,
}: HeaderPageProps) {
  return (
    <section className="m-4 flex flex-col items-center justify-between gap-2 md:flex-row">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex flex-col gap-2 md:flex-row md:gap-4">
        {secondBtn && (
          <Button asLink to={secondBtn.link}>
            {secondBtn.btnTitle}
          </Button>
        )}
        <Button asLink to={link}>
          {btnTitle}
        </Button>
      </div>
    </section>
  );
}
