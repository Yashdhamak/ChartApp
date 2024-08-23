const ctx = document.getElementById('myChart').getContext('2d');
const data = JSON.parse('<%= JSON.stringify(data) %>');

const labels = Object.keys(data);
const values = Object.values(data);

const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: '# of Submissions',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
