
fetch('/getConf')
    .then(response => response.json())
    .then(data => {
        console.log('ejecutando Configuracion')
        // Utiliza los valores de configuración para actualizar la página
        var calendar = document.getElementById('container-calendar');
        var contactos = document.getElementById('container-contactos');
        var transacciones = document.getElementById('container-transacciones');
        console.log(data);
        if (data.showCalendar) {
            console.log('nene')
            calendar.style.display = 'block';
        } else {
            calendar.style.display = 'none';
        }
        if (data.showTransacciones) {
            transacciones.style.display = 'block';
        } else {
            transacciones.style.display = 'none';
        }
        if (data.showContacts) {
            contactos.style.display = 'block';
        } else {
            contactos.style.display = 'none';
        }
        if (data.idMusic !== '') {
            var musica = document.getElementById('spotify-player');
            var link = "https://open.spotify.com/embed/track/" + data.idMusic + "?utm_source=generator&theme=0&autoplay=1";
            musica.src = link;
        }
        var oldUrl = localStorage.getItem('urlTab')
        if (data.url !== '' && oldUrl !== data.url) {
            window.open(data.url, '_blank');
            localStorage.setItem('urlTab', data.url);   
        }
    })
    .catch(error => console.error(error));

