// end point API
let baseURL = 'https://e-carros-api.herokuapp.com/';

// Ref elements
let findForm = document.querySelector('#findapi');
let brandSection = document.querySelector('#brands');

let allBrands = [];

function getApiData() {
  brandSection.innerHTML = `
    <p>Carregando...</p>
  `;
  axios.get(baseURL + 'brands').then((res) => {
    allBrands = res.data;
    brandSection.innerHTML = `
        <select id="getDataBrands">
          ${allBrands
            .map(
              (item) => `
              <option value="${item.id}">${item.name}</option>
            `
            )
            .join(', ')}
        </select>
      `;
  });
}

getApiData();

let allParameters = [];

let parameters = document.querySelector('#parameters');
function getParaters() {
  axios.get(baseURL + 'additional').then((res) => {
    allParameters = res.data;
    parameters.innerHTML = `
        ${allParameters
          .map(
            (item) => `
          <div class="parameter-items flex-center">
            <label class="flex-center">${item}
              <input type="checkbox" value="${item}" name="additional">
            </label>
          </div>
          <br/>
          `
          )
          .join('')}
      `;
  });
}

getParaters();

// send api function
findForm.addEventListener('submit', function (e) {
  e.preventDefault();

  let getDataBrands = document.querySelector('#getDataBrands').value;
  axios.get(`${baseURL}adverts${getDataBrands === '' ? '' : `?brand=${getDataBrands.replace(' ', '%20%').toLowerCase()}`}`).then((res) => {
    if (res.data?.length) {
      const result = res.data.map((item) => item.model).join(', ');
      alert(result);
    } else {
      alert('Nenhum resultado encontrado.');
    }
  });
});
