const searchBox = document.getElementById('search-box');
const transaccionesList = document.getElementById('transacciones-list');

searchBox.addEventListener('input', (event) => {
  const searchString = event.target.value.toLowerCase();
  const transacciones = transaccionesList.getElementsByTagName('li');

  for (let i = 0; i < transacciones.length; i++) {
    const categoria = transacciones[i].getElementsByClassName('categoria')[0].innerText.toLowerCase();
    if (categoria.includes(searchString)) {
      transacciones[i].style.display = 'flex';
    } else {
      transacciones[i].style.display = 'none';
    }
  }
});
