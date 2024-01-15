// Creation de l'objet des données du graphique
let chartData = {
    labels: [], // titre d'une donnée
    datasets: [{ // objet datasets qui prend les donnée dans le tableau data[] push par la fonction addData
        label: '# of value',
        data: [],
        backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
}

// Fonction créer un graphique pour une donnée en input
function createChart(type, height = 400) {
    const canvasContainer = document.getElementById("canvas-container")
    canvasContainer.innerHTML = `<canvas id="myChart"></canvas>`; // Créer l'élément canvas dans le HTML
    canvasContainer.style.height = `${height}px` // attribuer la hauteur du canvas avec le paramètre de la fonction createChart

    const ctx = document.getElementById("myChart").getContext('2d') // déclarer le graphique en 2D
    return new Chart(ctx, {
        type: type,
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            onClick: (event, activeElements) => {
                if (activeElements.length > 0) {
                    const { datasetIndex, index } = activeElements[0];
                    removeData(datasetIndex, index);
                }
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'index',
                intersect: false
            }
        }
    });
}

let myChart = createChart('bar'); // Mettre le résultat de la fontion dans une variable myChart , elle prendre par défaut la hauteur 400px et créer par défaut un graphique en bar

function addData() {  // Ajouter la données au graphique avec les inputs
    const labelInput = document.getElementById("labelInput")
    const dataInput = document.getElementById("dataInput")

    if (labelInput.value && dataInput.value) { // 2 inputs obligatoirement true si on  veut afficher un graphique
        chartData.labels.push(labelInput.value) // Ajouter au tableau vide le titre de la donnée
        chartData.datasets.forEach((dataset) => {
            dataset.data.push(dataInput.value)
        });
        myChart.update();
        labelInput.value = "";
        dataInput.value = "";
    }
}

function updateChartType() {
    const selectedType = document.getElementById("chartType").value
    myChart.destroy(); // Supprime tous les graphs avec l'ancien type
    myChart = createChart(selectedType);
}

function removeData(datasetIndex, index) { // Au clique du graphique supprimer l'élément cliqué
    if (chartData.labels.length > index) {
        chartData.labels.splice(index, 1);
        chartData.datasets[datasetIndex].data.splice(index, 1);
        myChart.update();
    }
}

