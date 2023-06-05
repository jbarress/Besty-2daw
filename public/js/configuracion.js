var configuracion = {
  _showCalendar: false,
  _showContacts: false,
  _showTransacciones: false,
  _showMusic: false,
  _idMusic: '',
  _url: '',
  
  // Getters
  get valores() {
    return {
      showCalendar: this._showCalendar,
      showContacts: this._showContacts,
      showTransacciones: this._showTransacciones,
      showMusic: this._showMusic,
      idMusic: this._idMusic,
      url: this._url
    };
  },
  
  // Setters
  set showCalendar(value) {
    this._showCalendar = value;
  },
  set showContacts(value) {
    this._showContacts = value;
  },
  set showTransacciones(value) {
    this._showTransacciones = value;
  },
  set showMusic(value) {
    this._showMusic = value;
  },
  set idMusic(value){
    this._idMusic = value;
  },
  set url(value){
    this._url = value;
  },
  // Función para inicializar los valores de las propiedades
  inicializar() {
    this._showCalendar = false;
    this._showContacts = false;
    this._showTransacciones = false;
    this._showMusic = false;
    this._idMusic = '';
    this._url = '';
  }
};

module.exports = configuracion;






