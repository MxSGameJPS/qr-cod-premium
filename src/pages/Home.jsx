import UserForm from "../components/UserForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Padrão de fundo aprimorado */}
      <div className="absolute inset-0 overflow-hidden bg-black">
        {/* Grade dourada sutil */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNBMTYyMDciIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>

        {/* Gradiente principal - mais rico */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black to-black opacity-90"></div>

        {/* Elementos de luz */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] opacity-70"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-600/15 rounded-full blur-[100px] opacity-80"></div>
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-amber-700/10 rounded-full blur-[80px] opacity-75"></div>
        <div className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[90px] opacity-75"></div>

        {/* Partículas douradas */}
        <div className="absolute w-full h-full">
          <div className="absolute top-[10%] left-[20%] w-1 h-1 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"></div>
          <div className="absolute top-[15%] left-[40%] w-1.5 h-1.5 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"></div>
          <div className="absolute top-[25%] left-[75%] w-1 h-1 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"></div>
          <div className="absolute top-[40%] left-[15%] w-2 h-2 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"></div>
          <div className="absolute top-[65%] left-[35%] w-1 h-1 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"></div>
          <div className="absolute top-[75%] left-[80%] w-1.5 h-1.5 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"></div>
          <div className="absolute top-[85%] left-[25%] w-1 h-1 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"></div>
        </div>
      </div>

      {/* Linhas douradas decorativas aprimoradas */}
      <div className="absolute top-8 left-8 w-40 h-40">
        <div className="w-full h-0.5 bg-gradient-to-r from-amber-500/90 to-transparent"></div>
        <div className="w-0.5 h-full bg-gradient-to-b from-amber-500/90 to-transparent"></div>
      </div>
      <div className="absolute bottom-8 right-8 w-40 h-40">
        <div className="w-full h-0.5 bg-gradient-to-l from-amber-500/90 to-transparent"></div>
        <div className="w-0.5 h-full bg-gradient-to-t from-amber-500/90 to-transparent"></div>
      </div>

      <div className="w-full max-w-full sm:max-w-md md:max-w-md space-y-6 relative z-10 px-2">
        <div className="text-center transform transition-all duration-700 animate-fade-in-down">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300 mb-2">
            QR Dev Code
          </h1>
          <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-amber-600 to-amber-400 mx-auto rounded-full"></div>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-400">
            Crie QR Codes personalizados para seus projetos com estilo
          </p>
        </div>

        <div className="animate-fade-in w-full">
          <UserForm />
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-gray-500 text-xs">
        <p>
          &copy; {new Date().getFullYear()} Saulo Pavanello. Todos os direitos
          reservados.
        </p>
      </div>
    </div>
  );
}

// Adicionando animações ao CSS global
const style = document.createElement("style");
style.textContent = `
  @keyframes fade-in-down {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  .animate-fade-in-down {
    animation: fade-in-down 0.8s ease-out forwards;
  }
  
  .animate-fade-in {
    animation: fade-in 1s ease-out 0.3s forwards;
    opacity: 0;
    animation-fill-mode: forwards;
  }
  
  /* Adicionando gradiente radial para Tailwind */
  .bg-gradient-radial {
    background-image: radial-gradient(var(--tw-gradient-stops));
  }
`;
document.head.appendChild(style);
