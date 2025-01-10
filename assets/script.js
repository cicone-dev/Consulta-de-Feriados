//DOCUMENTADO POR UMA IA.

// Função para carregar a lista de países da API e preencher o dropdown
async function loadCountries() {
    /**
     * Tenta fazer uma requisição GET para a API Nager.Date para obter a lista de países.
     * @returns {object[]} - Lista de países com seus códigos.
     */
    const url = 'https://date.nager.at/api/v3/AvailableCountries';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao buscar a lista de países');
        }
        const countries = await response.json();
        populateCountrySelect(countries);
    } catch (error) {
        console.error('Erro ao obter a lista de países:', error);
        document.getElementById('holidays').innerHTML = '<p>Erro ao carregar a lista de países.</p>';
    }
}

// Função para preencher o dropdown com a lista de países
function populateCountrySelect(countries) {
    /**
     * Preenche o elemento select com opções de países.
     * @param {object[]} countries - Lista de países com seus códigos.
     */
    const countrySelect = document.getElementById('countrySelect');
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.countryCode;
        option.textContent = country.name;
        countrySelect.appendChild(option);
    });
}

// Função para obter a lista de feriados do país selecionado
async function getHolidays() {
    /**
     * Tenta fazer uma requisição GET para a API Nager.Date para obter a lista de feriados de um país específico.
     */
    const countryCode = document.getElementById('countrySelect').value;
    const year = new Date().getFullYear();
    const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao buscar os dados');
        }
        const holidays = await response.json();
        displayHolidays(holidays);
    } catch (error) {
        console.error('Erro ao obter os feriados:', error);
        document.getElementById('holidays').innerHTML = '<p>Erro ao carregar os feriados.</p>';
    }
}

// Função para exibir os feriados na página
function displayHolidays(holidays) {
    /**
     * Exibe a lista de feriados na página.
     * @param {object[]} holidays - Lista de feriados.
     */
    const holidaysDiv = document.getElementById('holidays');
    holidaysDiv.innerHTML = '';

    holidays.forEach(holiday => {
        const holidayDiv = document.createElement('div');
        holidayDiv.className = 'holiday';
        holidayDiv.innerHTML = `<strong>${holiday.date}</strong>: ${holiday.localName} (${holiday.name})`;
        holidaysDiv.appendChild(holidayDiv);
    });
}

// Chama a função para carregar a lista de países ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    loadCountries();
});



// função para limpar a barra de pesquisa atraves do botão "limpar" no HTML
// Função para limpar a div com as informações dos feriados
function clearHolidays() {
    const holidaysDiv = document.getElementById('holidays');
    holidaysDiv.innerHTML = '';
  }
  
  // Adiciona um evento de clique ao botão "Limpar"
  document.getElementById('clear-button').addEventListener('click', clearHolidays);

