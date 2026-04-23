/*
 * FORNERIA DI CAPRI — Landing Page de Posicionamento de Marca
 * Design: "Vitrine Sensorial: Escuridão e Luz de Forno"
 * Paleta: Azul marinho profundo (#080F1E) + Dourado (#C9A96E) + Creme quente (#F5F0E8)
 * Tipografia: Playfair Display (display) + Lato (corpo)
 */

import { useEffect, useRef, useState } from "react";

// Image URLs from generated assets
const IMAGES = {
  heroPizza: "https://d2xsxph8kpxj0f.cloudfront.net/310519663589889937/CjCg7aYqdUqHHDQn8P5YNB/hero_pizza_forno-euWoShyhvzJ8bDVetYPRn7.webp",
  heroMesa: "https://d2xsxph8kpxj0f.cloudfront.net/310519663589889937/CjCg7aYqdUqHHDQn8P5YNB/hero_mesa_vinho-JCsynTRpdAu5QT5Csy8fYe.webp",
  massa: "https://d2xsxph8kpxj0f.cloudfront.net/310519663589889937/CjCg7aYqdUqHHDQn8P5YNB/massa_processo-RMAFE6m2xEAzACZ8V3bMtY.webp",
  ambiente: "https://d2xsxph8kpxj0f.cloudfront.net/310519663589889937/CjCg7aYqdUqHHDQn8P5YNB/ambiente_restaurante-TZkLjNd65yoUxRgAi5krx5.webp",
  vinho: "https://d2xsxph8kpxj0f.cloudfront.net/310519663589889937/CjCg7aYqdUqHHDQn8P5YNB/vinho_harmonizacao-EpXGxLuDfJvy3Ds7jDinEg.webp",
};

// Scroll reveal hook
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

// Gold ornament divider
function GoldOrnament() {
  return (
    <div className="flex items-center justify-center gap-3 my-2">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9A96E] opacity-60" />
      <span style={{ color: "#C9A96E", fontSize: "0.6rem", letterSpacing: "0.3em" }}>· · ·</span>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C9A96E] opacity-60" />
    </div>
  );
}

// Section label component
function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span style={{ color: "#C9A96E", fontFamily: "'Playfair Display', serif", fontSize: "0.85rem", fontStyle: "italic" }}>{number}</span>
      <div className="h-px w-8 bg-[#C9A96E] opacity-50" />
      <span className="section-label">{label}</span>
    </div>
  );
}

// The 6 brand words
const PALAVRAS = [
  {
    word: "MESA",
    description: "O cliente não compra pizza, ele compra o que acontece ao redor de uma mesa. É a palavra que desloca o produto para o contexto e justifica o ticket sem falar em preço.",
    digital: "Legendas que começam com \"Sua mesa está pronta para...\" em vez de \"Venha experimentar...\"",
    presencial: "Garçom que diz \"sua mesa está reservada\" em vez de \"seu lugar está disponível\".",
  },
  {
    word: "CASA",
    description: "Segurar sofisticação e calor ao mesmo tempo é o maior desafio da marca — essa palavra faz esse equilíbrio. É o antídoto contra a frieza do premium.",
    digital: "Stories que mostram o salão com a equipe antes de abrir: \"A casa está pronta.\"",
    presencial: "O cliente entra, não chega. É recebido, não atendido. A despedida é \"Volte sempre\".",
  },
  {
    word: "FORNO",
    description: "Transforma equipamento em emoção. Forno traz calor, processo, artesanato, tempo. É a palavra que justifica o rigor da casa sem precisar fazer discurso técnico.",
    digital: "Reels fechados no forno — a porta abrindo, a chama, a borda inflando. Legenda: \"Aqui, tudo começa no forno.\"",
    presencial: "A posição do forno no salão não é operacional — é cenográfica. O cliente precisa ver o forno aceso.",
  },
  {
    word: "MASSA",
    description: "O diferencial mais concreto e mais subutilizado. A fermentação lenta, a consultoria de Dani Branca, a leveza que virou assinatura — tudo passa por essa palavra.",
    digital: "Série editorial fixa: \"A massa começa aqui\" — Nicholas abrindo a massa, explicando a fermentação em 30 segundos.",
    presencial: "Garçom treinado para mencionar a fermentação lenta quando o cliente pergunta o diferencial da casa, como orgulho.",
  },
  {
    word: "VINHO",
    description: "Não é sobre bebida, é sobre o público que a marca mais precisa conquistar agora. Vinho na comunicação é senha de acesso ao apreciador de mesa longa, ticket alto e permanência prolongada.",
    digital: "Um post fixo por semana: harmonização do dia, rótulo da semana, sugestão para a quarta. \"Para a pizza de hoje, a casa sugere este.\"",
    presencial: "Sommelier ou garçom treinado para sugerir harmonização de forma natural. A carta de vinhos visível na mesa desde o início.",
  },
  {
    word: "SABOR",
    description: "A palavra de autoria da casa. As outras cinco falam de experiência e processo, sabor fala de criação. É ela que abre espaço para contar por que cada pizza da Forneria não tem substituto direto em Brasília.",
    digital: "Série \"De onde vem esse sabor?\" — explicar em 40 segundos a origem de um ingrediente ou a decisão por trás de um sabor. Como conversa.",
    presencial: "Menu com uma linha de assinatura em cada pizza autoral — não a lista de ingredientes, mas a intenção do sabor.",
  },
];

// Personas
const PERSONAS = [
  {
    num: "01",
    title: "O casal que vem para desacelerar a noite",
    frequencia: "Frequenta a casa de quinta a sábado à noite. Usa o jantar como ritual de transição entre o modo sobrevivência e o modo relaxamento e romântico. A pizza é mediadora da experiência: compartilhável, confortável e emocionalmente segura. O vinho é extensão do clima e do que pode rolar depois.",
    busca: "Um lugar que ajude a noite a 'dar certo'.",
    teme: "Pagar caro e ter uma experiência comum, apressada ou barulhenta.",
    convence: "Ambiente, luz, ritmo, sabores marcantes, serviço atento e sugestão de harmonização.",
    afasta: "Tom promocional demais, estética genérica de pizzaria e qualquer sensação de pressa.",
  },
  {
    num: "02",
    title: "A família que só quer acertar na escolha",
    frequencia: "Busca facilidade com dignidade. Quer sair com filhos, parentes ou pessoas próximas e sentir que escolheu um lugar que entrega conforto, previsibilidade e qualidade sem parecer impessoal. A Forneria funciona como seguro emocional: reduz o risco de frustração e eleva a sensação de programa bem escolhido.",
    busca: "Um programa que agrade mais de uma pessoa ao mesmo tempo.",
    teme: "Confusão, demora, erro no atendimento e sensação de que o passeio não compensou.",
    convence: "Cardápio compartilhável, ambiente agradável, atendimento cordial e reputação confiável.",
    afasta: "Espera longa, desorganização e qualquer ruído no atendimento.",
  },
  {
    num: "03",
    title: "Quem chama os outros e precisa acertar",
    frequencia: "Não é necessariamente quem mais ama pizza. É quem precisa acertar na escolha do lugar para aniversário, confraternização ou reunião social. Ele pensa: se eu chamar as pessoas para cá, vou ficar bem na foto? A Forneria já recebe reservas para grupos e celebrações — este é um território prioritário de crescimento.",
    busca: "Um lugar que funcione socialmente e projete bom gosto ao grupo.",
    teme: "Convidar pessoas para um lugar que não sustente a promessa — qualquer falha o expõe.",
    convence: "Ambiente com presença, serviço consistente, pratos que geram comentário e clima de ocasião.",
    afasta: "Pizza fria, atraso, atendimento inconsistente, mesa mal administrada.",
  },
  {
    num: "04",
    title: "Quem gosta de vinho, conversa e noite longa",
    frequencia: "O cliente de maior valor simbólico e financeiro que a marca quer atrair com mais força. Não escolhe restaurante só pelo prato principal: escolhe pela capacidade do lugar de sustentar uma noite longa, prazerosa e socialmente refinada. Para este perfil, a Forneria não deve parecer 'pizzaria boa'; deve parecer casa italiana contemporânea onde vinho e pizza convivem com naturalidade e muito sabor.",
    busca: "Permanência, ritual, prazer adulto e clima que sustente conversas longas.",
    teme: "Lugar simplório demais, infantilizado ou sem repertório de experiência.",
    convence: "Carta de vinhos viva, harmonização, ambientação, linguagem madura e sensação de descoberta.",
    afasta: "Comunicação focada só em pizza, desconto ou estética popular.",
  },
  {
    num: "05",
    title: "Quem quer a experiência da casa, sem sair de casa",
    frequencia: "Quer comer bem em casa sem abrir mão de um certo padrão. Não busca o delivery mais barato: busca um delivery que preserve status e prazer. O Park Sul já tem delivery forte; a Asa Sul está muito abaixo do potencial esperado — há demanda para conveniência premium que ainda não foi igualmente maturada nas duas praças.",
    busca: "Conforto com qualidade percebida, sem abrir mão do padrão da casa.",
    teme: "Receber um produto descaracterizado da experiência do salão.",
    convence: "Embalagem, temperatura, apresentação e comunicação de que a experiência chega íntegra.",
    afasta: "Falhas logísticas — este perfil abandona rápido quando a experiência não sustenta o valor cobrado.",
  },
];

// Digital channels
const CANAIS = [
  { canal: "Instagram", funcao: "Faz desejar", descricao: "Cria o impulso antes da visita" },
  { canal: "Google Meu Negócio", funcao: "Faz confiar", descricao: "Valida a escolha no momento da busca" },
  { canal: "Reserva / Delivery", funcao: "Faz converter", descricao: "Transforma desejo em ação" },
  { canal: "Avaliação e Marcação", funcao: "Faz indicar", descricao: "Gera aquisição orgânica por prova social" },
];

// Editorial fronts
const EDITORIAIS = [
  {
    title: "Massa e Fogo",
    desc: "Vídeos curtos de massa abrindo, borda inflando, queijo puxando, forno a lenha, corte, vapor, azeite finalizando. Conteúdo que dá fome e diferencia sem precisar falar muito.",
  },
  {
    title: "Sabores com Assinatura",
    desc: "Série 'De onde vem esse sabor?' — Nicholas como criador, não como vendedor. Tira a marca do lugar de catálogo e leva para o lugar de autoria.",
  },
  {
    title: "A Casa em Movimento",
    desc: "Vídeos de taças servidas, aniversários acontecendo, amigos brindando, equipe finalizando pratos, pizza chegando na mesa. A Forneria precisa parecer viva.",
  },
  {
    title: "Autoridade da Casa",
    desc: "Dani Branca como selo permanente. Bio, destaques, legendas e Reels precisam lembrar que a massa nasce de uma consultoria de nome reconhecido mundialmente.",
  },
  {
    title: "Vinho e Ocasião",
    desc: "Taça enchendo, harmonização, garrafa abrindo, mesa de amigos, noite de quarta, clima de permanência. Vinho não pode ser acessório — tem que virar linguagem visual da casa.",
  },
];

// Delivery elements
const DELIVERY_ITENS = [
  {
    elemento: "Identidade da Embalagem",
    desc: "Caixa limpa, elegante, com assinatura verbal: 'Da nossa mesa para a sua noite.' Engenharia com respiros estratégicos para a massa não suar e chegar com a crocância preservada.",
  },
  {
    elemento: "Cartão de Experiência",
    desc: "Pequeno, bonito, colecionável. Frente: frase da marca. Verso: instrução de ritual. 'Abra ainda quente. Sirva sem pressa. Escolha uma taça. A noite começa agora.'",
  },
  {
    elemento: "Bilhete de Finalização",
    desc: "'Para finalizar como na casa: um fio de azeite, corte em 6 e sirva imediatamente.' Transforma consumo em ritual.",
  },
  {
    elemento: "Sachê de Azeite Exclusivo",
    desc: "Mini frasco de azeite da casa. Não precisa ir em todos os pedidos: apenas nos pedidos premium ou combos especiais. É memória física de marca.",
  },
  {
    elemento: "Convite de Retorno",
    desc: "Não desconto agressivo. 'Na próxima vez, venha viver Capri na mesa.' QR code para reserva.",
  },
];

// Google actions
const GOOGLE_ACOES = [
  {
    acao: "Perfis impecáveis por unidade",
    como: "Park Sul e Asa Sul com perfis separados: fotos atualizadas semanalmente, link para reserva, cardápio visível, carta de vinhos, diferenciais bem escritos na descrição.",
  },
  {
    acao: "Coleta ativa de avaliações ricas",
    como: "O garçom ou cartão da conta deve induzir avaliações com contexto: 'Se puder, conte no Google o que achou da massa, do ambiente ou do vinho. Isso ajuda muito a casa.'",
  },
  {
    acao: "Resposta inteligente a todas as avaliações",
    como: "Responder elogios com calor e palavras-chave naturais. Nunca copiar resposta. Citar a unidade quando fizer sentido. 'Ficamos felizes que aproveitou a noite aqui na Asa Sul.'",
  },
  {
    acao: "Publicações semanais no perfil",
    como: "Sabor da semana, quarta do vinho, early bird, novo Reel do forno. Não precisa ser longo — precisa ser constante. Poucos restaurantes fazem isso bem.",
  },
  {
    acao: "Páginas locais no site",
    como: "Páginas separadas para cada unidade com endereço, mapa, horários, fotos reais, destaques e CTA para reserva. Conecta busca, clique e conversão.",
  },
];

// Tom de voz translations
const TOM_EXEMPLOS = [
  {
    errado: "Venha experimentar nossa pizza premium.",
    certo: "Sua mesa está pronta para uma noite que começa no forno e termina entre bons encontros.",
  },
  {
    errado: "Temos sabores exclusivos.",
    certo: "Aqui, cada sabor entra na sua mesa com personalidade própria.",
  },
  {
    errado: "Faça sua reserva agora.",
    certo: "Reserve sua mesa e venha viver a noite no seu ritmo perfeito.",
  },
  {
    errado: "Promoção especial de hoje.",
    certo: "Uma quarta com a casa acesa, o vinho servido e a mesa reservada para você.",
  },
];

export default function Home() {
  const [activePersona, setActivePersona] = useState<number | null>(null);
  useScrollReveal();

  return (
    <div style={{ backgroundColor: "#080F1E", color: "#F5F0E8", fontFamily: "'Lato', sans-serif", overflowX: "hidden" }}>

      {/* ─── NAVIGATION ─────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1.2rem 2rem",
        background: "linear-gradient(180deg, rgba(8,15,30,0.95) 0%, transparent 100%)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.1rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: "#F5F0E8",
            textTransform: "uppercase",
          }}>FORNERIA</span>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "0.75rem",
            fontStyle: "italic",
            color: "#C9A96E",
            letterSpacing: "0.1em",
            marginTop: "-2px",
          }}>di Capri</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ color: "#C9A96E", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Lato', sans-serif" }}>
            Posicionamento de Marca
          </span>
          <span style={{ color: "#C9A96E", fontSize: "0.65rem" }}>·</span>
          <span style={{ color: "#A89880", fontSize: "0.65rem", letterSpacing: "0.1em" }}>2025</span>
        </div>
      </nav>

      {/* ─── HERO SECTION ───────────────────────────────────────────── */}
      <section style={{ position: "relative", height: "100vh", minHeight: "600px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Background image */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${IMAGES.heroPizza})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          filter: "brightness(0.35)",
        }} />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(8,15,30,0.3) 0%, rgba(8,15,30,0.1) 40%, rgba(8,15,30,0.7) 80%, rgba(8,15,30,1) 100%)",
        }} />
        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 1.5rem", maxWidth: "900px" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <span className="section-label" style={{ letterSpacing: "0.4em" }}>Documento Interno · Uso Exclusivo da Equipe de Marca</span>
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            color: "#F5F0E8",
            marginBottom: "0.5rem",
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
          }}>
            Manual de<br />
            <span style={{ color: "#C9A96E" }}>Posicionamento</span><br />
            Estratégico de Marca
          </h1>
          <GoldOrnament />
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
            fontStyle: "italic",
            color: "#C9A96E",
            marginTop: "1.5rem",
            letterSpacing: "0.05em",
          }}>
            Casa italiana contemporânea de Brasília
          </p>
          <p style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "0.85rem",
            color: "#A89880",
            marginTop: "0.75rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}>
            Park Sul · Asa Sul · Versão 2025
          </p>
        </div>
        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
          animation: "fadeIn 2s ease 1s both",
        }}>
          <span style={{ color: "#A89880", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>Rolar</span>
          <div style={{
            width: "1px", height: "40px",
            background: "linear-gradient(180deg, #C9A96E, transparent)",
            animation: "fadeIn 1s ease infinite alternate",
          }} />
        </div>
      </section>

      {/* ─── APRESENTAÇÃO ───────────────────────────────────────────── */}
      <section style={{ padding: "6rem 0", backgroundColor: "#080F1E" }}>
        <div className="container">
          <div className="reveal" style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center" }}>
            <SectionLabel number="I." label="Apresentação" />
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
              lineHeight: 1.6,
              color: "#F5F0E8",
              marginBottom: "2rem",
            }}>
              Este manual reúne em um único documento a totalidade da estratégia de posicionamento da Forneria di Capri.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "#A89880", marginBottom: "1.5rem" }}>
              Ele não é um guia de estilo estático, nem um conjunto de normas genéricas de comunicação. É o mapa que orienta cada decisão de marca, da escolha das palavras de uma legenda à forma como um garçom finaliza a conta de uma mesa.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "#A89880", marginBottom: "1.5rem" }}>
              A Forneria di Capri tem o que poucos restaurantes em Brasília conseguem acumular em menos de três anos: produto técnico de padrão internacional, dois endereços consolidados, nota 4.8 no Google e a consultoria de um pizzaiolo que figura entre os três melhores do mundo. O que falta, e é o que este manual endereça, é traduzir toda essa substância em uma comunicação que faça jus ao que a casa entrega.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "#A89880" }}>
              Cada capítulo foi construído com base no diagnóstico completo da operação, no comportamento real dos clientes atuais e nos territórios de crescimento que a marca precisa ocupar com clareza nos próximos ciclos. Nenhum dado aqui foi inventado. Nenhuma recomendação é genérica.
            </p>
          </div>
        </div>
      </section>

      {/* ─── DIVIDER ─────────────────────────────────────────────────── */}
      <div className="container"><div className="gold-line-full reveal" /></div>

      {/* ─── 01. A ALMA DA MARCA ────────────────────────────────────── */}
      <section style={{ padding: "6rem 0", backgroundColor: "#080F1E" }}>
        <div className="container">
          {/* Posicionamento central */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center", marginBottom: "6rem" }} className="reveal grid-cols-responsive">
            <div>
              <SectionLabel number="01." label="A Alma da Marca" />
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "#F5F0E8",
                lineHeight: 1.2,
                marginBottom: "2rem",
              }}>
                Quem é a<br /><span style={{ color: "#C9A96E" }}>Forneria di Capri</span>
              </h2>
              <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "#A89880", marginBottom: "1.5rem" }}>
                A Forneria di Capri não nasceu para disputar espaço como mais uma pizzaria de Brasília. Ela nasceu para ser o lugar que as pessoas escolhem quando querem sair de casa para viver uma noite bonita, comer muito bem e estar num ambiente que faz sentido do começo ao fim.
              </p>
              <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "#A89880", marginBottom: "1.5rem" }}>
                Sua força não está apenas nas pizzas mais saborosas, mas na soma entre uma massa perfeitamente preparada, sabores que fogem do comum, atmosfera de casa desejada e uma experiência que conversa com casais, famílias e encontros que pedem vinho, conversa e permanência à mesa.
              </p>
              <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "#A89880" }}>
                Enquanto os concorrentes mais consolidados ocupam o território da história e do tempo de mercado, a Forneria tem espaço para ocupar um lugar mais atual: o da <strong style={{ color: "#F5F0E8" }}>Nova casa italiana de Brasília</strong>, com técnica, personalidade e ambiente.
              </p>
            </div>
            <div style={{ position: "relative" }}>
              <img
                src={IMAGES.ambiente}
                alt="Ambiente Forneria di Capri"
                style={{
                  width: "100%",
                  height: "480px",
                  objectFit: "cover",
                  borderRadius: "2px",
                  filter: "brightness(0.85)",
                }}
              />
              <div style={{
                position: "absolute",
                bottom: "-1.5rem",
                left: "-1.5rem",
                padding: "1.5rem 2rem",
                background: "rgba(8,15,30,0.95)",
                border: "1px solid rgba(201,169,110,0.3)",
                maxWidth: "280px",
              }}>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "0.95rem",
                  fontStyle: "italic",
                  color: "#C9A96E",
                  lineHeight: 1.6,
                }}>
                  "Uma marca que não grita sofisticação, ela faz o cliente sentir."
                </p>
              </div>
            </div>
          </div>

          {/* Posicionamento em uma linha */}
          <div className="reveal" style={{
            textAlign: "center",
            padding: "4rem 2rem",
            background: "linear-gradient(135deg, rgba(13,27,62,0.8), rgba(26,43,94,0.4))",
            border: "1px solid rgba(201,169,110,0.2)",
            marginBottom: "5rem",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "2px",
              background: "linear-gradient(90deg, transparent, #C9A96E, transparent)",
            }} />
            <span className="section-label" style={{ marginBottom: "1.5rem", display: "block" }}>Posicionamento em uma linha</span>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)",
              fontStyle: "italic",
              color: "#F5F0E8",
              lineHeight: 1.6,
              maxWidth: "700px",
              margin: "0 auto 1.5rem",
            }}>
              "Uma experiência italiana autêntica, calorosa e atual, feita para quem valoriza sabor, ambiente e o prazer de estar à mesa."
            </p>
            <GoldOrnament />
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              color: "#C9A96E",
              fontStyle: "italic",
              marginTop: "1.5rem",
              maxWidth: "700px",
              margin: "1.5rem auto 0",
            }}>
              "A Forneria di Capri é a casa italiana contemporânea de Brasília, onde a pizza deixa de ser só comida e vira uma ocasião."
            </p>
          </div>

          {/* O que a marca vende de verdade */}
          <div className="reveal" style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center", marginBottom: "5rem" }}>
            <SectionLabel number="—" label="O Que a Marca Vende de Verdade" />
            <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "#A89880", marginBottom: "1.5rem" }}>
              Um ticket médio de R$ 200 por comanda não está ligado apenas ao produto servido, mas à experiência que criamos nas pessoas. Entregamos mais do que pizzas — estamos proporcionando estados emocionais, rituais de pertencimento e momentos de transição no dia do cliente.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "#A89880", marginBottom: "1.5rem" }}>
              Cada mesa que ocupamos é um espaço onde conexões acontecem, histórias são compartilhadas e a rotina ganha significado. Nosso papel é tornar esses momentos possíveis com consistência, intenção e identidade.
            </p>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#C9A96E",
              marginTop: "2rem",
            }}>
              "Não vendemos apenas um produto. Criamos o contexto onde momentos memoráveis acontecem."
            </p>
          </div>
        </div>
      </section>

      {/* ─── AS SEIS PALAVRAS ────────────────────────────────────────── */}
      <section style={{ padding: "6rem 0", backgroundColor: "#0A1224" }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <SectionLabel number="—" label="As Seis Palavras que Representam a Marca" />
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#F5F0E8",
              marginBottom: "1.5rem",
            }}>
              Um vocabulário próprio
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "#A89880", maxWidth: "680px", margin: "0 auto" }}>
              Marcas que tentam dizer tudo acabam não sendo reconhecidas por nada. Aqui, a escolha é deliberada: reduzir o vocabulário para ampliar a presença. Cada palavra funciona como um ponto de ancoragem que orienta como a marca se expressa, decide e se comporta.
            </p>
          </div>

          {/* Words grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}>
            {PALAVRAS.map((p, i) => (
              <div
                key={p.word}
                className="word-card reveal"
                style={{
                  padding: "2rem",
                  animationDelay: `${i * 0.1}s`,
                  transitionDelay: `${i * 0.05}s`,
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "1rem" }}>
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2rem",
                    fontWeight: 900,
                    color: "#C9A96E",
                    letterSpacing: "0.1em",
                  }}>{p.word}</span>
                  <div style={{ flex: 1, height: "1px", background: "rgba(201,169,110,0.2)" }} />
                </div>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "#A89880", marginBottom: "1.5rem" }}>
                  {p.description}
                </p>
                <div style={{ borderTop: "1px solid rgba(201,169,110,0.1)", paddingTop: "1rem" }}>
                  <div style={{ marginBottom: "0.75rem" }}>
                    <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E", fontWeight: 700 }}>No digital</span>
                    <p style={{ fontSize: "0.82rem", color: "#8A7A6A", lineHeight: 1.7, marginTop: "0.3rem" }}>{p.digital}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E", fontWeight: 700 }}>No presencial</span>
                    <p style={{ fontSize: "0.82rem", color: "#8A7A6A", lineHeight: 1.7, marginTop: "0.3rem" }}>{p.presencial}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Closing statement */}
          <div className="reveal" style={{ textAlign: "center", marginTop: "4rem", maxWidth: "680px", margin: "4rem auto 0" }}>
            <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "#A89880", marginBottom: "1.5rem" }}>
              Com o tempo, o cliente deixa de perceber essas palavras de forma consciente e passa a sentir o que elas representam. Elas constroem um território emocional, reforçam identidade e tornam a experiência consistente em todos os pontos de contato.
            </p>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.1rem",
              fontStyle: "italic",
              color: "#C9A96E",
            }}>
              "Uma marca que se fixa não pelo volume do que diz, mas pela clareza e repetição do que escolhe dizer."
            </p>
          </div>
        </div>
      </section>

      {/* ─── 02. TOM DE VOZ ─────────────────────────────────────────── */}
      <section style={{ padding: "6rem 0", backgroundColor: "#080F1E" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="reveal grid-cols-responsive">
            {/* Left: image */}
            <div style={{ position: "relative" }}>
              <img
                src={IMAGES.vinho}
                alt="Vinho e harmonização"
                style={{ width: "100%", height: "500px", objectFit: "cover", borderRadius: "2px", filter: "brightness(0.8)" }}
              />
              <div style={{
                position: "absolute", top: "2rem", right: "-1.5rem",
                padding: "1.5rem",
                background: "rgba(8,15,30,0.95)",
                border: "1px solid rgba(201,169,110,0.3)",
                maxWidth: "220px",
              }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.85rem", fontStyle: "italic", color: "#C9A96E", lineHeight: 1.6 }}>
                  "A Forneria fala como quem sabe receber."
                </p>
              </div>
            </div>
            {/* Right: content */}
            <div>
              <SectionLabel number="02." label="Tom de Voz" />
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 700,
                color: "#F5F0E8",
                lineHeight: 1.2,
                marginBottom: "1.5rem",
              }}>
                Como a Marca Fala
              </h2>
              <div style={{
                padding: "1.5rem",
                background: "rgba(13,27,62,0.5)",
                borderLeft: "3px solid #C9A96E",
                marginBottom: "2rem",
              }}>
                <span className="section-label" style={{ marginBottom: "0.5rem", display: "block" }}>Arquétipo</span>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#F5F0E8", fontStyle: "italic" }}>
                  O Curador Acolhedor
                </p>
                <p style={{ fontSize: "0.9rem", color: "#A89880", lineHeight: 1.8, marginTop: "0.75rem" }}>
                  A marca fala como um excelente anfitrião que conhece o mundo, entende profundamente de vinhos e de gastronomia de alta qualidade, mas deixa os convidados completamente à vontade. É uma voz madura, serena, que transmite autoridade pelo domínio do assunto.
                </p>
              </div>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.9, color: "#A89880", marginBottom: "1.5rem" }}>
                Sem afetação, sem exageros, sem o peso de uma linguagem publicitária muito forçada. A comunicação é direta, envolvente e naturalmente convidativa. É uma marca que se expressa com segurança, mas nunca com rigidez — com elegância, mas sem criar distância — e com apetite, mas sem excessos.
              </p>
              {/* Fala com / não precisa parecer */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "2rem" }}>
                <div style={{ padding: "1.25rem", background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.2)" }}>
                  <span className="section-label" style={{ marginBottom: "1rem", display: "block" }}>A marca fala com</span>
                  {["Calor", "Segurança", "Bom gosto", "Sensação de casa", "Apetite elegante"].map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#C9A96E", flexShrink: 0 }} />
                      <span style={{ fontSize: "0.85rem", color: "#F5F0E8" }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "1.25rem", background: "rgba(13,27,62,0.4)", border: "1px solid rgba(201,169,110,0.1)" }}>
                  <span className="section-label" style={{ marginBottom: "1rem", display: "block", color: "#8A7A6A" }}>A marca não precisa parecer</span>
                  {["Cara", "Urgente", "Promocional"].map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#8A7A6A", flexShrink: 0 }} />
                      <span style={{ fontSize: "0.85rem", color: "#8A7A6A" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tom na prática */}
          <div className="reveal" style={{ marginTop: "5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span className="section-label">Tradução Prática do Tom</span>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "#F5F0E8", marginTop: "0.5rem" }}>
                Em vez de dizer... A Forneria diz
              </h3>
            </div>
            <div style={{ display: "grid", gap: "1rem" }}>
              {TOM_EXEMPLOS.map((ex, i) => (
                <div key={i} style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto 1fr",
                  gap: "1.5rem",
                  alignItems: "center",
                  padding: "1.5rem 2rem",
                  background: "rgba(13,27,62,0.4)",
                  border: "1px solid rgba(201,169,110,0.1)",
                }}>
                  <p style={{ fontSize: "0.9rem", color: "#6A5A4A", fontStyle: "italic", lineHeight: 1.6 }}>
                    "{ex.errado}"
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
                    <div style={{ width: "1px", height: "20px", background: "rgba(201,169,110,0.3)" }} />
                    <span style={{ color: "#C9A96E", fontSize: "1rem" }}>→</span>
                    <div style={{ width: "1px", height: "20px", background: "rgba(201,169,110,0.3)" }} />
                  </div>
                  <p style={{ fontSize: "0.9rem", color: "#F5F0E8", lineHeight: 1.6 }}>
                    "{ex.certo}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── DIVIDER IMAGE ──────────────────────────────────────────── */}
      <div style={{ position: "relative", height: "350px", overflow: "hidden" }}>
        <img
          src={IMAGES.massa}
          alt="Processo da massa"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", filter: "brightness(0.5)" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(8,15,30,0.8) 0%, transparent 30%, transparent 70%, rgba(8,15,30,0.8) 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ textAlign: "center" }}>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.3rem, 3vw, 2rem)",
              fontStyle: "italic",
              color: "#F5F0E8",
              textShadow: "0 2px 20px rgba(0,0,0,0.8)",
            }}>
              "Aqui, tudo começa no forno."
            </p>
            <GoldOrnament />
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E", marginTop: "0.5rem" }}>
              Massa com fermentação lenta · Consultoria Dani Branca · Top 3 do Mundo
            </p>
          </div>
        </div>
      </div>

      {/* ─── 03. PÚBLICO-ALVO ────────────────────────────────────────── */}
      <section style={{ padding: "6rem 0", backgroundColor: "#080F1E" }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <SectionLabel number="03." label="Público-Alvo" />
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#F5F0E8",
              marginBottom: "1.5rem",
            }}>
              Cinco Arquétipos Comportamentais
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "#A89880", maxWidth: "680px", margin: "0 auto" }}>
              Entender o cliente da Forneria di Capri exige ir além da demografia. Um ticket médio de R$ 200 por comanda não está ligado à necessidade de alimentação, mas ao desejo de viver algo específico. O cliente busca desacelerar o dia, criar momentos de conexão e transformar uma refeição em experiência.
            </p>
          </div>

          <div style={{ display: "grid", gap: "1.5rem" }}>
            {PERSONAS.map((persona, i) => (
              <div
                key={persona.num}
                className="persona-card reveal"
                style={{
                  padding: "2rem 2.5rem",
                  cursor: "pointer",
                  transitionDelay: `${i * 0.05}s`,
                }}
                onClick={() => setActivePersona(activePersona === i ? null : i)}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                    <span style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.5rem",
                      fontWeight: 900,
                      color: "rgba(201,169,110,0.4)",
                    }}>{persona.num}</span>
                    <h3 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.15rem",
                      fontWeight: 600,
                      color: "#F5F0E8",
                    }}>{persona.title}</h3>
                  </div>
                  <span style={{
                    color: "#C9A96E",
                    fontSize: "1.2rem",
                    transition: "transform 0.3s ease",
                    transform: activePersona === i ? "rotate(45deg)" : "rotate(0deg)",
                    flexShrink: 0,
                  }}>+</span>
                </div>

                {activePersona === i && (
                  <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(201,169,110,0.15)" }}>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.9, color: "#A89880", marginBottom: "1.5rem" }}>
                      {persona.frequencia}
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
                      {[
                        { label: "O que busca", value: persona.busca, color: "#C9A96E" },
                        { label: "O que teme", value: persona.teme, color: "#8A7A6A" },
                        { label: "O que convence", value: persona.convence, color: "#C9A96E" },
                        { label: "O que afasta", value: persona.afasta, color: "#8A7A6A" },
                      ].map(item => (
                        <div key={item.label} style={{ padding: "1rem", background: "rgba(8,15,30,0.5)" }}>
                          <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: item.color, fontWeight: 700, display: "block", marginBottom: "0.5rem" }}>
                            {item.label}
                          </span>
                          <p style={{ fontSize: "0.85rem", color: "#A89880", lineHeight: 1.7 }}>{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="reveal" style={{ textAlign: "center", marginTop: "4rem", maxWidth: "680px", margin: "4rem auto 0" }}>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.1rem",
              fontStyle: "italic",
              color: "#C9A96E",
              lineHeight: 1.7,
            }}>
              "Quando essa associação se constrói, a escolha deixa de ser comparativa e passa a ser natural. A Forneria se torna o lugar certo para aquele tipo de momento."
            </p>
          </div>
        </div>
      </section>

      {/* ─── 04. SISTEMA DIGITAL ────────────────────────────────────── */}
      <section style={{ padding: "6rem 0", backgroundColor: "#0A1224" }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <SectionLabel number="04." label="Sistema Digital de Marca" />
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#F5F0E8",
              marginBottom: "1.5rem",
            }}>
              Do Desejo à Fidelização:<br />
              <span style={{ color: "#C9A96E" }}>O Funil Sensorial</span>
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "#A89880", maxWidth: "680px", margin: "0 auto" }}>
              O crescimento da Forneria não está ligado ao volume de conteúdo, mas à coerência da experiência ao longo de toda a jornada. Antes de escolher, o cliente sente. Antes de decidir, ele imagina. Antes de voltar, ele compara o que viveu com o que esperava.
            </p>
          </div>

          {/* Canais */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "5rem" }} className="reveal">
            {CANAIS.map((canal, i) => (
              <div key={canal.canal} style={{
                padding: "2rem",
                background: "rgba(13,27,62,0.5)",
                border: "1px solid rgba(201,169,110,0.15)",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                  background: "linear-gradient(90deg, transparent, #C9A96E, transparent)",
                  opacity: 0.6,
                }} />
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2.5rem",
                  fontWeight: 900,
                  color: "rgba(201,169,110,0.15)",
                  position: "absolute",
                  top: "0.5rem",
                  right: "1rem",
                }}>{String(i + 1).padStart(2, "0")}</span>
                <h4 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#F5F0E8",
                  marginBottom: "0.75rem",
                }}>{canal.canal}</h4>
                <span style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C9A96E",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: "0.5rem",
                }}>{canal.funcao}</span>
                <p style={{ fontSize: "0.85rem", color: "#A89880", lineHeight: 1.7 }}>{canal.descricao}</p>
              </div>
            ))}
          </div>

          {/* Instagram editorial */}
          <div className="reveal" style={{ marginBottom: "5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <SectionLabel number="4.1" label="Instagram: A Vitrine Sensorial" />
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "#F5F0E8", marginBottom: "1rem" }}>
                As Cinco Frentes Editoriais
              </h3>
              <p style={{ fontSize: "0.95rem", color: "#A89880", maxWidth: "600px", margin: "0 auto" }}>
                O perfil deve deixar de ser um panfleto digital para se tornar uma vitrine sensorial. O algoritmo recompensa retenção, e nada retém mais atenção do que movimento e textura.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
              {EDITORIAIS.map((ed, i) => (
                <div key={ed.title} style={{
                  padding: "1.75rem",
                  background: "rgba(13,27,62,0.4)",
                  border: "1px solid rgba(201,169,110,0.1)",
                  borderLeft: "3px solid rgba(201,169,110,0.5)",
                }}>
                  <h4 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#C9A96E",
                    marginBottom: "0.75rem",
                  }}>{ed.title}</h4>
                  <p style={{ fontSize: "0.85rem", color: "#A89880", lineHeight: 1.8 }}>{ed.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery premium */}
          <div className="reveal" style={{ marginBottom: "5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="grid-cols-responsive">
              <div>
                <SectionLabel number="4.2" label="Delivery Premium" />
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  color: "#F5F0E8",
                  marginBottom: "1.5rem",
                }}>
                  A Casa Que Chega Até Você
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.9, color: "#A89880", marginBottom: "2rem" }}>
                  O delivery não pode ser tratado como transporte de pizza. Ele precisa ser tratado como extensão da casa.
                </p>
                <div style={{ display: "grid", gap: "1rem" }}>
                  {DELIVERY_ITENS.map((item) => (
                    <div key={item.elemento} style={{
                      padding: "1.25rem 1.5rem",
                      background: "rgba(8,15,30,0.6)",
                      border: "1px solid rgba(201,169,110,0.1)",
                    }}>
                      <span style={{
                        fontSize: "0.7rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#C9A96E",
                        fontWeight: 700,
                        display: "block",
                        marginBottom: "0.4rem",
                      }}>{item.elemento}</span>
                      <p style={{ fontSize: "0.85rem", color: "#A89880", lineHeight: 1.7 }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <img
                  src={IMAGES.heroPizza}
                  alt="Pizza Forneria"
                  style={{ width: "100%", height: "600px", objectFit: "cover", borderRadius: "2px", filter: "brightness(0.75)" }}
                />
              </div>
            </div>
          </div>

          {/* Google */}
          <div className="reveal">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <SectionLabel number="4.3" label="Google Meu Negócio — Dominância Local" />
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "#F5F0E8", marginBottom: "1rem" }}>
                A Forneria como resposta mais confiável
              </h3>
              <p style={{ fontSize: "0.95rem", color: "#A89880", maxWidth: "600px", margin: "0 auto" }}>
                Quando alguém buscar "pizza Asa Sul", "pizzaria Park Sul", "pizza premium Brasília" ou "pizzaria com vinho Brasília", a Forneria precisa aparecer como a resposta mais confiável e mais desejável da lista.
              </p>
            </div>
            <div style={{ display: "grid", gap: "1rem" }}>
              {GOOGLE_ACOES.map((acao, i) => (
                <div key={acao.acao} style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "2rem",
                  alignItems: "start",
                  padding: "1.5rem 2rem",
                  background: "rgba(13,27,62,0.4)",
                  border: "1px solid rgba(201,169,110,0.1)",
                }}>
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.5rem",
                    fontWeight: 900,
                    color: "rgba(201,169,110,0.3)",
                    minWidth: "2rem",
                  }}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h4 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "#F5F0E8",
                      marginBottom: "0.5rem",
                    }}>{acao.acao}</h4>
                    <p style={{ fontSize: "0.85rem", color: "#A89880", lineHeight: 1.8 }}>{acao.como}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLOSING HERO ───────────────────────────────────────────── */}
      <section style={{ position: "relative", height: "60vh", minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${IMAGES.heroMesa})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.3)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(8,15,30,0.7) 0%, rgba(8,15,30,0.2) 50%, rgba(8,15,30,0.7) 100%)",
        }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 2rem", maxWidth: "800px" }}>
          <GoldOrnament />
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
            fontWeight: 700,
            color: "#F5F0E8",
            lineHeight: 1.3,
            margin: "1.5rem 0",
            textShadow: "0 4px 30px rgba(0,0,0,0.6)",
          }}>
            "Não vendemos apenas um produto.<br />
            <span style={{ color: "#C9A96E" }}>Criamos o contexto onde<br />momentos memoráveis acontecem."</span>
          </h2>
          <GoldOrnament />
          <p style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#A89880",
            marginTop: "1.5rem",
          }}>
            Forneria di Capri · Documento Interno · Confidencial · 2025
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────────────────── */}
      <footer style={{
        padding: "3rem 0",
        backgroundColor: "#040810",
        borderTop: "1px solid rgba(201,169,110,0.1)",
      }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.2rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#F5F0E8",
              textTransform: "uppercase",
            }}>FORNERIA</span>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "0.9rem",
              fontStyle: "italic",
              color: "#C9A96E",
              marginLeft: "0.5rem",
            }}>di Capri</span>
          </div>
          <p style={{ fontSize: "0.75rem", color: "#4A3A2A", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Park Sul · Asa Sul · Brasília
          </p>
          <p style={{ fontSize: "0.7rem", color: "#3A2A1A", marginTop: "0.75rem" }}>
            Manual de Posicionamento Estratégico de Marca · Versão 2025 · Uso Exclusivo da Equipe de Marca
          </p>
        </div>
      </footer>

      {/* Responsive grid fix */}
      <style>{`
        @media (max-width: 768px) {
          .grid-cols-responsive {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
