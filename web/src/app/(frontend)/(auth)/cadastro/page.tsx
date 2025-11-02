import CadastroForm from "./CadastroForm";

function Cadastro() {
  return ( 
    <main className="min-h-screen flex items-center justify-center">
      
      <div className="w-[90%] lg:w-[55%] h-full flex flex-col gap-8 items-center justify-center">
        <CadastroForm />
      </div>
    </main>
   );
}

export default Cadastro;