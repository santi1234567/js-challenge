const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const FIRSTITEM = 5;
const LOADAMOUNT = 10;
const MAXITEMS = 200;

var pagination = FIRSTITEM-1;
const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        // template
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}
const getDataPagination = async (api, limit) => {
  let params = `?offset=${pagination.toString()}&limit=${limit}`;
  fetch(api+params)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        if (product.id <=200) {
            return(`
            <article class="Card">
              <img src="${product.images[0]}" />
              <h2>
                ${product.title}
                <small>$ ${product.price}</small>
              </h2>
            </article>`)
        } else{
          alert("Todos los productos Obtenidos")
        }
        });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
};

const loadData = async () => {
  await getDataPagination(API, LOADAMOUNT);
  console.log(pagination);
  pagination += LOADAMOUNT;
  if(pagination > MAXITEMS) {
    intersectionObserver.disconnect();
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    console.log(entry)
    if (entry.isIntersecting) {
      loadData();
    }
  })

}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
