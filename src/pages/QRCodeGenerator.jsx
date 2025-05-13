import { useState, useRef, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";

export default function QRCodeGenerator() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const nameFromParams = searchParams.get("nome");

  // Recuperando o nome do sessionStorage como fallback adicional
  const nameFromSession = sessionStorage.getItem("userName");
  const userName = nameFromParams || nameFromSession || "Usuário";

  const [url, setUrl] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [qrColor, setQrColor] = useState("#ff8c00"); // Laranja mais vibrante
  const [bgColor, setBgColor] = useState("#000000"); // Fundo preto sólido
  const qrRef = useRef(null);
  const qrContainerRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  // Animação de entrada
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (url) {
      setIsGenerating(true);
      // Simular um tempo de processamento para o efeito visual
      setTimeout(() => {
        setQrCodeUrl(url);
        setIsGenerating(false);
      }, 800);
    }
  };

  const handleDownload = () => {
    if (!qrCodeUrl || !qrContainerRef.current) return;

    try {
      // Usando html2canvas para capturar exatamente o que é exibido
      html2canvas(qrContainerRef.current, {
        backgroundColor: null,
        scale: 3, // Maior escala para melhor qualidade
      })
        .then((canvas) => {
          const pngUrl = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.href = pngUrl;
          downloadLink.download = "qrcode-dev.png";
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        })
        .catch((err) => {
          console.error("Erro ao carregar html2canvas:", err);
          alert("Não foi possível baixar o QR Code. Tente novamente.");
        });
    } catch (error) {
      console.error("Erro ao baixar QR code:", error);
      alert("Não foi possível baixar o QR Code. Tente novamente.");
    }
  };

  const copyToClipboard = () => {
    if (!qrCodeUrl) return;

    navigator.clipboard.writeText(qrCodeUrl).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      (err) => {
        console.error("Erro ao copiar URL: ", err);
      }
    );
  };

  const shareQRCode = async () => {
    if (!qrCodeUrl) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "QR Dev Code",
          text: `QR Code gerado para: ${qrCodeUrl}`,
          url: qrCodeUrl,
        });

        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } else {
        // Fallback se a Web Share API não estiver disponível
        copyToClipboard();
        alert(
          "Compartilhamento não suportado no seu navegador. URL copiada para a área de transferência."
        );
      }
    } catch (err) {
      console.error("Erro ao compartilhar:", err);
    }
  };

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

      {/* Container principal com animação */}
      <div
        className={`w-full max-w-full sm:max-w-sm md:max-w-md z-10 transition-all duration-1000 transform px-2 ${
          showAnimation
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="bg-black border border-amber-600/40 p-4 sm:p-6 md:p-8 rounded-lg shadow-2xl shadow-amber-900/20 backdrop-blur-sm bg-opacity-80">
          <div className="text-center mb-4 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-500 mb-2">
              QR Dev Code
            </h2>
            <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-amber-600 to-amber-400 mx-auto rounded-full mb-2 sm:mb-4"></div>
            <p className="text-sm sm:text-base text-gray-400">
              Olá,{" "}
              <span className="text-amber-400 font-medium">{userName}</span>!
              Crie seu QR Code personalizado.
            </p>
          </div>

          <form
            onSubmit={handleGenerate}
            className="space-y-4 sm:space-y-6 mb-4 sm:mb-8"
          >
            <div className="group">
              <label
                htmlFor="url"
                className="block text-sm font-medium text-amber-400 mb-1"
              >
                Insira seu link
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  placeholder="https://github.com/seu-usuario/seu-projeto"
                  className="w-full pl-3 sm:pl-4 pr-10 py-2.5 sm:py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-100 text-base transition-all duration-300 touch-manipulation"
                  inputMode="url"
                  autoComplete="url"
                />
                {url && (
                  <button
                    type="button"
                    onClick={() => setUrl("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400 transition-colors duration-200 p-1 touch-manipulation"
                    aria-label="Limpar"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label
                  htmlFor="qrColor"
                  className="block text-sm font-medium text-amber-400 mb-1"
                >
                  Cor do QR
                </label>
                <div className="relative border border-gray-700 rounded-md overflow-hidden">
                  <input
                    type="color"
                    id="qrColor"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="w-full h-9 sm:h-10 cursor-pointer bg-transparent touch-manipulation"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none rounded-md border border-gray-700"
                    style={{ borderColor: qrColor }}
                  ></div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="bgColor"
                  className="block text-sm font-medium text-amber-400 mb-1"
                >
                  Fundo
                </label>
                <div className="relative border border-gray-700 rounded-md overflow-hidden">
                  <input
                    type="color"
                    id="bgColor"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-full h-9 sm:h-10 cursor-pointer bg-transparent touch-manipulation"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none rounded-md border border-gray-700"
                    style={{ borderColor: bgColor }}
                  ></div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold py-2.5 sm:py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 disabled:opacity-70 shadow-lg hover:shadow-amber-600/30 text-base touch-manipulation"
            >
              {isGenerating ? (
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
                  Gerando QR Code...
                </span>
              ) : (
                "Gerar QR Code"
              )}
            </button>
          </form>

          {qrCodeUrl && (
            <div
              className="flex flex-col items-center animate-fade-in opacity-0"
              style={{
                animationFillMode: "forwards",
                animationDuration: "0.6s",
              }}
            >
              <div
                ref={qrContainerRef}
                className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg bg-black"
              >
                <div className="p-2 sm:p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg">
                  <div
                    className="p-4 sm:p-6 rounded-md"
                    style={{ backgroundColor: bgColor }}
                  >
                    <QRCodeSVG
                      ref={qrRef}
                      value={qrCodeUrl}
                      size={180}
                      bgColor={bgColor}
                      fgColor={qrColor}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                </div>
              </div>

              {/* Botões mobile friendly */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 w-full">
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-amber-400 font-medium py-2.5 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 border border-amber-700/30 touch-manipulation"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Baixar</span>
                </button>

                <button
                  onClick={copyToClipboard}
                  className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-amber-400 font-medium py-2.5 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 border border-amber-700/30 touch-manipulation"
                >
                  {copied ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" />
                      </svg>
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                      <span>Copiar</span>
                    </>
                  )}
                </button>

                <button
                  onClick={shareQRCode}
                  className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-amber-400 font-medium py-2.5 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 border border-amber-700/30 touch-manipulation"
                >
                  {shared ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Compartilhado!</span>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                      <span>Compartilhar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
