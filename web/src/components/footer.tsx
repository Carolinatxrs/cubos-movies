export function Footer() {
  return (
    <footer className="p-5 text-center border-t border-[#F1E6FD30] mt-auto">
      <p className="font-montserrat font-normal text-base text-foreground/50">
        {new Date().getFullYear()} © Todos os direitos reservados a{' '}
        <span className="font-semibold">Cubos Movies</span>
      </p>
    </footer>
  )
}
