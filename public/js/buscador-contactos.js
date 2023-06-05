const searchInput = document.getElementById('search-input');
const contactList = document.getElementById('contact-list');

searchInput.addEventListener('input', () => {
  const filter = searchInput.value.toUpperCase();
  const contacts = contactList.getElementsByClassName('contact-item');

  for (let i = 0; i < contacts.length; i++) {
    const contactName = contacts[i].getElementsByTagName('h3')[0].textContent.toUpperCase();

    if (contactName.indexOf(filter) > -1) {
      contacts[i].style.display = '';
    } else {
      contacts[i].style.display = 'none';
    }
  }
});
