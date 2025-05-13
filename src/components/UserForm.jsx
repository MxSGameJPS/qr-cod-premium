import { useState } from "react";

export default function UserForm() {
  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    email: "",
    profissao: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Contornando problemas de CORS usando o método tradicional do FormSubmit (sem fetch)
      const form = e.target;

      // Adicionando campos adicionais direto no formulário
      const createHiddenInput = (name, value) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
        return input;
      };

      // Campos do FormSubmit
      createHiddenInput("_subject", `Novo cadastro de ${formData.nome}`);
      createHiddenInput(
        "_next",
        `${window.location.origin}/qrcode?nome=${encodeURIComponent(
          formData.nome
        )}`
      );
      createHiddenInput("_captcha", "false");
      createHiddenInput("_template", "table");
      const honey = createHiddenInput("_honey", "");
      honey.style.display = "none";

      // Armazenando o nome no sessionStorage para recuperar na próxima página
      sessionStorage.setItem("userName", formData.nome);

      // Enviar o formulário diretamente (método tradicional, sem fetch)
      form.submit();

      // Não precisamos fazer mais nada após o submit, o navegador vai para a próxima página
      // definida no _next do FormSubmit
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setError(`Ocorreu um erro ao enviar o formulário: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-6 sm:px-5 py-8 bg-black rounded-lg shadow-2xl border border-amber-600/40 transform transition-all duration-300 hover:shadow-amber-500/30 hover:shadow-lg">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-amber-500 mb-3">
          Formulário de Cadastro
        </h2>
        <div className="h-1 w-32 bg-gradient-to-r from-amber-600 to-amber-400 mx-auto rounded-full"></div>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        action="https://formsubmit.co/mxsgamejps@gmail.com"
        method="POST"
      >
        <div className="group mb-5">
          <label
            htmlFor="nome"
            className="block text-base font-medium text-amber-400 mb-2 transition-all duration-300 group-focus-within:text-amber-300"
          >
            Nome
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-100 text-base transition-all duration-300 touch-manipulation"
            placeholder="Seu nome completo"
            autoComplete="name"
          />
        </div>

        <div className="group mb-5">
          <label
            htmlFor="whatsapp"
            className="block text-base font-medium text-amber-400 mb-2 transition-all duration-300 group-focus-within:text-amber-300"
          >
            WhatsApp
          </label>
          <input
            type="tel"
            id="whatsapp"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-100 text-base transition-all duration-300 touch-manipulation"
            placeholder="(00) 00000-0000"
            autoComplete="tel"
            inputMode="tel"
          />
        </div>

        <div className="group mb-5">
          <label
            htmlFor="email"
            className="block text-base font-medium text-amber-400 mb-2 transition-all duration-300 group-focus-within:text-amber-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-100 text-base transition-all duration-300 touch-manipulation"
            placeholder="seu.email@exemplo.com"
            autoComplete="email"
            inputMode="email"
          />
        </div>

        <div className="group mb-5">
          <label
            htmlFor="profissao"
            className="block text-base font-medium text-amber-400 mb-2 transition-all duration-300 group-focus-within:text-amber-300"
          >
            Profissão
          </label>
          <input
            type="text"
            id="profissao"
            name="profissao"
            value={formData.profissao}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-100 text-base transition-all duration-300 touch-manipulation"
            placeholder="Sua profissão atual"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold py-4 px-4 rounded-md transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 disabled:opacity-50 shadow-lg hover:shadow-amber-600/30 text-base touch-manipulation"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Enviando...
            </span>
          ) : (
            "Continuar"
          )}
        </button>
      </form>
    </div>
  );
}
