export default function Header () {
  return (
    <header className="bg-blueDeotica text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase text-black">Deotica</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#sobre" className="hover:text-gray-200">A Ótica</a></li>
            <li><a href="#domicilio" className="hover:text-gray-200">Atendimento a Domicílio</a></li>
            <li><a href="#presencial" className="hover:text-gray-200">Atendimento Presencial</a></li>
            <li><a href="#desconto" className="hover:text-gray-200">Desconto Exclusivo</a></li>
            <li><a href="#contato" className="hover:text-gray-200">Contato</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
