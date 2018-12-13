// Creare un calendario dinamico con le festività, selezionando da un menu una delle nazioni disponibili nell’API. Partiamo dal gennaio 2017 dando la possibilità di cambiare mese, gestendo il caso in cui l’API non possa ritornare festività.
// Ogni volta che cambio mese dovrò:
// 1 Controllare se il mese è nel futuro (per ovviare al problema che l’API non carica holiday future)
// 2 Controllare quanti giorni ha il mese scelto formando così una lista
// 3 Chiedere all’api quali sono le festività per il mese scelto
// 4 Evidenziare le festività nella lista

$(document).ready(function(){

  //controllo gennaio quanti giorni ha
  var gennaio17 = moment("2017-01", "YYYY-MM").daysInMonth();
  console.log(gennaio17);
  //creo una list con un ciclo for a seconda di quanti giorni ha un mese

  for (var i = 1; i <= gennaio17; i++) {
    var giorni = i;

    $('.giorno').append(giorni + ' Gennaio '+'<br>');
    console.log(giorni);


  }


  //chiamo Api per sapere che feste ci sono nel mese
  $.ajax({
    url:'https://holidayapi.com/v1/holidays',
    data: {
      key: 'adb5525a-4bf5-4d15-aff0-c8ece623c33e',
      country: 'IT',
      year: '2017',
      month: '01'
    },
    method: 'GET',
    success: function(data){

      var arrayFeste = data;
      console.log(arrayFeste);

      for (var i = 0; i < arrayFeste.holidays.length; i++) {

        var feste = arrayFeste.holidays[i].date;
        console.log(feste);

        var dataFesta = parseInt(moment(feste).format('D'));
        console.log(dataFesta);

        // if( ?giorni? == dataFesta){
        //   $('.giorno').addClass('active');

      }

    },
    error: function(){

    }



  });


});
