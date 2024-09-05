document.addEventListener('DOMContentLoaded', () => {
  // Mapeamento de sinônimos e termos relacionados
  const sinonimosMap = {
    'ia': 'inteligência artificial',
    'ai': 'inteligência artificial',
    'artificial intelligence': 'inteligência artificial',
    'celular': 'celulares',
    'smartphone': 'celulares',
    'computador': 'computadores',
    'pc': 'computadores',
    'desktop': 'computadores',
    'laptop': 'computadores',
    'realidade virtual': 'realidade virtual e aumentada',
    'rv': 'realidade virtual e aumentada',
    'realidade aumentada': 'realidade virtual e aumentada',
    'ra': 'realidade virtual e aumentada',
    'block chain': 'blockchain',
    'block-chain': 'blockchain',
    'cloud computing': 'computação em nuvem',
    'nuvem': 'computação em nuvem',
    '5g': '5g',
    'iot': 'internet das coisas',
    'internet of things': 'internet das coisas',
    'quantum computing': 'computação quântica',
    'machine learning': 'aprendizado de máquina',
    'ml': 'aprendizado de máquina',
    'neural networks': 'redes neurais',
    'segurança digital': 'segurança cibernética',
    'cybersecurity': 'segurança cibernética',
    'robotics': 'robótica',
    'realidade mista': 'realidade mista',
    'mixed reality': 'realidade mista',
    'edge': 'edge computing',
    'ux design': 'design de experiência do usuário',
    'user experience': 'design de experiência do usuário',
    'api': 'interface de programação de aplicações',
    'apis': 'interface de programação de aplicações',
    'cloud storage': 'armazenamento em nuvem',
    'networking': 'tecnologia de redes',
    'web development': 'desenvolvimento web',
    'software development': 'desenvolvimento de software',
    'content automation': 'geração de conteúdo automatizado',
    'facial recognition': 'tecnologia de reconhecimento facial',
    'natural language processing': 'tecnologia de voz e linguagem natural',
    'nlp': 'tecnologia de voz e linguagem natural',
    'sensors': 'tecnologia de sensores',
    '3d printing': 'impressão 3d',
    'bateria': 'tecnologia de bateria e armazenamento de energia',
    'energy storage': 'tecnologia de bateria e armazenamento de energia',
    'satellite communication': 'tecnologia de comunicação por satélite',
    'global navigation systems': 'tecnologia de sistemas de navegação global',
    'gps': 'tecnologia de sistemas de navegação global',
    'digital printing': 'tecnologia de impressão digital',
    'data analytics': 'tecnologia de análise de dados',
  };

  const btn_pesquisa = document.getElementById('Pesquisar');
  const input = document.getElementById('search');
  const Local_rs = document.getElementById('Campo-Resposta');
  const alertBox = document.getElementById('alert');

  // Adiciona um evento de clique no botão de pesquisa
  btn_pesquisa.addEventListener('click', Pesquisar);

  // Função para remover acentos de uma string
  function removerAcentos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  // Função para realizar a pesquisa
  function Pesquisar() {
    let input_vlr = input.value.trim().toLowerCase();
    input_vlr = removerAcentos(input_vlr);

    // Verifica se o campo está vazio
    if (input_vlr === '' || input_vlr === null) {
      alertBox.innerHTML = `<p>O Campo Não Pode Estar Vazio.</p>`;
      alertBox.style.display = 'block';
      Local_rs.innerHTML = '';
      input.value = "";
      return;
    }

    console.log("Valor de input normalizado:", input_vlr);

    // Verifica se há sinônimo e substitui pelo termo padrão
    if (sinonimosMap[input_vlr]) {
      input_vlr = sinonimosMap[input_vlr];
      console.log("Sinônimo encontrado:", input_vlr);
    }

    // Busca o item correspondente no dadosMap
    const item = Object.values(window.dadosMap).find(dado => 
      removerAcentos(dado.titulo.toLowerCase()) === removerAcentos(input_vlr)
    );

    if (item) {
      // Exibe o resultado da pesquisa
      const Resultados = `
        <div class="item-resposta">
          <h2 class="titulo">${item.titulo}</h2>
          <p class="description">${item.descricao}
            <a class="more-info" href="${item.link}" target="_blank" rel="noopener noreferrer">Saiba Mais</a>
          </p>
        </div>`;
      Local_rs.innerHTML = Resultados;
      alertBox.style.display = 'none';
      adicionarHistorico(item); // Adiciona o item ao histórico
    } else {
      // Exibe uma mensagem de erro se nenhum resultado for encontrado
      alertBox.innerHTML = `<p>Nenhum resultado encontrado para "${input.value}".</p>`;
      alertBox.style.display = 'block';
      Local_rs.innerHTML = '';
    }
    input.value = "";
  }
});
