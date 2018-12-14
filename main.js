// Creare un calendario dinamico con le festività, selezionando da un menu una delle nazioni disponibili nell’API. Partiamo dal gennaio 2017 dando la possibilità di cambiare mese, gestendo il caso in cui l’API non possa ritornare festività.
// Ogni volta che cambio mese dovrò:
// 1 Controllare se il mese è nel futuro (per ovviare al problema che l’API non carica holiday future)
// 2 Controllare quanti giorni ha il mese scelto formando così una lista
// 3 Chiedere all’api quali sono le festività per il mese scelto
// 4 Evidenziare le festività nella lista


$(document).ready(function(){
  var arrayCodeLang = [
    {'AO': 'Angola'},
    {'AT': 'Austria'},
    {'AU': 'Australia'},
    {'AW': 'Aruba'},
    {'AX': 'Åland Islands'},
    {'BA': 'Bosnia and Herzegovina'},
    {'BE': 'Belgium'},
    {'BG': 'Bulgaria'},
    {'BO': 'Bolivia'},
    {'BR': 'Brazil'},
    {'BS': 'The Bahamas'},
    {'CA': 'Canada'},
    {'CH': 'Switzerland'},
    {'CN': 'China'},
    {'CO': 'Colombia'},
    {'CR': 'Costa Rica'},
    {'CU': 'Cuba'},
    {'CZ': 'Czech Republic'},
    {'DE': 'Germany'},
    {'DK': 'Denmark'},
    {'DO': 'Dominican Republic'},
    {'EC': 'Ecuador'},
    {'ES': 'Spain'},
    {'FI': 'Finland'},
    {'FR': 'France'},
    {'FR-A': 'Alsace'},
    {'GB': 'United Kingdom'},
    {'GB-ENG': 'England'},
    {'GB-NIR': 'Northern Ireland'},
    {'GB-SCT': 'Scotland'},
    {'GB-WLS': 'Wales'},
    {'GR': 'Greece'},
    {'GT': 'Guatemala'},
    {'HK': 'Hong Kong'},
    {'HN': 'Honduras'},
    {'HR': 'Croatia'},
    {'HU': 'Hungary'},
    {'ID': 'Indonesia'},
    {'IE': 'Ireland'},
    {'IN': 'India'},
    {'IL': 'Israel'},
    {'IS': 'Iceland'},
    {'IT': 'Italy'},
    {'JP': 'Japan'},
    {'KZ': 'Kazakhstan'},
    {'LS': 'Lesotho'},
    {'LU': 'Luxembourg'},
    {'MG': 'Madagascar'},
    {'MQ': 'Martinique'},
    {'MT': 'Malta'},
    {'MU': 'Mauritius'},
    {'MX': 'Mexico'},
    {'MZ': 'Mozambique'},
    {'NG': 'Nigeria'},
    {'NL': 'Netherlands'},
    {'NO': 'Norway'},
    {'PE': 'Peru'},
    {'PK': 'Pakistan'},
    {'PH': 'Philippines'},
    {'PL': 'Poland'},
    {'PR': 'Puerto Rico'},
    {'PT': 'Portugal'},
    {'PY': 'Paraguay'},
    {'RE': 'Réunion'},
    {'RO': 'Romania'},
    {'RU': 'Russia'},
    {'SC': 'Seychelles'},
    {'SE': 'Sweden'},
    {'SG': 'Singapore'},
    {'SI': 'Slovenia'},
    {'ST': 'Sao Tome and Principe'},
    {'SK': 'Slovakia'},
    {'TN': 'Tunisia'},
    {'TR': 'Turkey'},
    {'UA': 'Ukraine'},
    {'US': 'United States'},
    {'UY': 'Uruguay'},
    {'VE': 'Venezuela'},
    {'ZA': 'South Africa'},
    {'ZW': 'Zimbabwe'}
  ];

  coutry(arrayCodeLang);
  var paesi = 'IT';
  var dataScelta = moment('2017-01-01');
  var limiteData = moment('2018-11-01');
  calendario(dataScelta);
  festeMese(dataScelta, paesi);

  $('#btnPaesi').click(function(){
    var paesi = $('#country').val();

    calendario(dataScelta);
    festeMese(dataScelta, paesi);

  });

  $('#next').click(function(){
    // alert('ciao')
    dataScelta = dataScelta.add(1, 'months');

    if (dataScelta.diff(limiteData, 'days') > 0) {
      alert('non puoi visualizzare date future');
      dataScelta = dataScelta.subtract(1, 'months');
    }
    else {
      var paesi = $('#country').val();
      calendario(dataScelta);
      festeMese(dataScelta, paesi);
    }

  });

  $('#prev').click(function(){
    // alert('ciao')
    dataScelta = dataScelta.subtract(1, 'months');

    var paesi = $('#country').val();
    calendario(dataScelta);
    festeMese(dataScelta, paesi);
  });

});

function calendario(dataScelta) {
  //controllo gennaio quanti giorni ha
  var giorni = dataScelta.daysInMonth();

  //creo una list con un ciclo for a seconda di quanti giorni ha un mese
  var liTemplate = $('.griglia ul')

  //pulisco la lista dei giorni
  liTemplate.html('');
  for (var i = 1; i <= giorni; i++) {

    var liGiorni = $('.template li').clone();
    var liData = dataScelta.format('YYYY-MM-') + i;

    liGiorni.attr('data-giornoOriginale', liData)

    liGiorni.text(i +' '+ dataScelta.format('MMMM'));

    liTemplate.append(liGiorni);

    $('.header h1').html(dataScelta.format('MMMM YYYY'));
  }

}

function coutry(arrayCodeLang) {
  for (var i = 0; i < arrayCodeLang.length; i++) {
    var paesi = arrayCodeLang[i];

    for (var key in paesi) {
      var paesiOptionClone = $('.template option').clone();
      paesiOptionClone.val(key);
      paesiOptionClone.html(paesi[key]);
      $('select').append(paesiOptionClone);
    }
  }
}

function festeMese(dataScelta, paesi) {
  //chiamo Api per sapere che feste ci sono nel mese
  $.ajax({
    url:'https://holidayapi.com/v1/holidays',
    data: {
      key: 'adb5525a-4bf5-4d15-aff0-c8ece623c33e',
      country: paesi,
      year: dataScelta.format('YYYY'),
      month: dataScelta.format('MM')
    },
    method: 'GET',
    success: function(data){

      var feste = data.holidays;

      $('ul li').each(function(){
        var thisGiorno = $(this).attr('data-giornoOriginale');

        thisGiorno = moment(thisGiorno, 'YYYY-MM-D')

        for (var i = 0; i < feste.length; i++) {
          var festa = feste[i];
          var giornoFesta = moment(festa.date);

          if (giornoFesta.isSame(thisGiorno, 'day')) {
            $(this).addClass('active');
            $(this).append(' - '+ festa.name)
          }
        }
      });

    },
    error: function(){

    }

  });
}
