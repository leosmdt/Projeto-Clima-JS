// assync significa que a função será assincrona.

document.querySelector('.busca').addEventListener('submit', async event => {
  event.preventDefault() // bloqueia o comportamento padrão que seria enviar o formulário.

  let input = document.querySelector('#searchInput').value // criar a variavel input, após, pega o Id #searchInput (que é o campo para digitar), e verifica o valor digitado ( função .value)
  if (input !== '') {
    clearInfo()
    shoowWarning('Carregando...') // pegando a função e determinando a mensagem que irá exibir na tela

    // fazendo uma variável para consumir os dados de uma API
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input
    )}&appid=6ca37af77586bad6ff8770d3ba2af2a2&units=metric&lang=pt_br` // link da API e trocando algumas coisas no link para se encaixar no projeto
    // ENCODErURI transforma o que foi digitado em linguagem de URL, tirando os espaço e colocando caracteres especiais

    // await = segnifica para esperar o resultado da requisição.

    let results = await fetch(url) //variável para guardar os resultados e função fetch para pegar a URL

    let json = await results.json() // váriavel para guardar o json, e função json para transformar o resultados em JSON.

    // cod significada o código de busca, 200 significa que achou o que pesquisou
    // função para que se json.cod for igual a 200 faça uma coisa, se não for coloca na tela a mensagem da SHOOWWARNING
    if (json.cod === 200) {
      showInfo({ // criando objeto com name, pais e etc..
        name: json.name,
        country: json.sys.country, // pegando conforme esta na requisição, isso foi tirado da barra networking no console, quando abre o array
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg
      })
    } else {
      clearInfo()
      shoowWarning('Não encontramos essa localização.')
    }
  }
})

// funcção para exibir mensagem na tela de carregando
function shoowWarning(msg) {
  document.querySelector('.aviso').innerHTML = msg // pegando a class aviso e inserindo (inner.HTML) a mensagem
}

// função para preencher na tela
function showInfo(json) {
  shoowWarning('')
  document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}` // inserir o nome e pais utilizando template string
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>°C</sup>` // inserir temperatura
  document.querySelector(
    '.ventoInfo'
  ).innerHTML = `${json.windSpeed}<span>km/h</span>` // inserir velocidade do vento
  document
    .querySelector('.temp img')
    .setAttribute(
      'src',
      `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    ) // pegando a clase .temp e manipulando a imagem dela, colocando um template string para puxar o icone conforme o tempo, sol, chuva, nublaco e etc..

  document.querySelector('.ventoPonto').style.transform = `rotate(${
    json.windAngle - 90
  }deg)` // manipulando a rotação do vento, utilizando e puxando da variavel windAngle
  document.querySelector('.resultado').style.display = 'block' // exibir na tela o display que está NONE no css
}

function clearInfo() {
  shoowWarning('')
  document.querySelector('.resultado').style.display = 'none'
}
