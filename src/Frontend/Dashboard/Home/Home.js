const chart1 = document.getElementById('chart1');
const chart2 = document.getElementById('chart2');

new Chart(chart1, {
    type: 'doughnut',
    data: {
        labels: ['Pintor', 'Eletricista'],
        datasets: [{
            label: 'Profissões',
            data: [12, 19],
            borderWidth: 1,
            backgroundColor: ["#006B3F", "#079D56", "#00D38D", "#82EA5B", "#FF8B22", "#FFB719", "#793F98", "#AC41D8", "#F7287C", "#FF5AAD", "#FFF028",]
        }]
    }
});

new Chart(chart2, {
    type: 'doughnut',
    data: {
        labels: ['Pintor', 'Eletricista'],
        datasets: [{
            label: 'Profissões',
            data: [12, 19],
            borderWidth: 1,
            backgroundColor: ["#006B3F", "#079D56", "#00D38D", "#82EA5B", "#FF8B22", "#FFB719", "#793F98", "#AC41D8", "#F7287C", "#FF5AAD", "#FFF028",]
        }]
    }
});