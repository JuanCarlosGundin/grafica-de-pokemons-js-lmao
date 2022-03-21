window.onload = function() {
    leer();
    labelsX = [];
    dataY = [];
    dataE = [];
}

function objetoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

function leer() {

    var ajax = objetoAjax();
    formdata = new FormData();
    formdata.append('_token', document.getElementById('token').getAttribute("content"));
    formdata.append('_method', 'GET');

    ajax.open("POST", "leer", true);

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);

            for (var i = 0; i < respuesta.length; i++) {
                labelsX.push(respuesta[i].nombre);
                dataY.push(respuesta[i].num);
                dataE.push(respuesta[i].color);
            }
            // creamos el chart
            chartCreate();
        }
    }

    ajax.send(formdata)
}

function chartCreate() {
    const data = {
        labels: labelsX,
        datasets: [{
          label: 'Tipos de pokemon',
          data: dataY,
          backgroundColor: dataE,
          hoverOffset: 4
        }]
      };
    const config = {
        type: 'doughnut',
        data: data,
      };
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}