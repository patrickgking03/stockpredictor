function getStockData() {
    const symbol = document.getElementById('stockSymbol').value;
    fetch(`/predict_stock?symbol=${symbol}`)
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Response data:", data);
            if (data.error || !data.company_name) {
                console.error('Error fetching data:', data.error || 'No company name');
                return;
            }
            document.getElementById('companyName').textContent = data.company_name;
            document.getElementById('stockSymbol').textContent = data.stock_symbol;
            document.getElementById('realTimePrice').textContent = data.stock_price.toFixed(2);
            createStockGraph(data.historical_data);

            // Display Predictions
            document.getElementById('prediction1d').textContent = `$${data.predictions[0].toFixed(2)}`;
            document.getElementById('prediction5d').textContent = `$${data.predictions[4].toFixed(2)}`;
        })
        .catch(error => console.error('Error:', error));
}

function selectDemoStock(stockSymbol) {
    document.getElementById('stockSymbol').value = stockSymbol;
}

$("#stockSymbol").autocomplete({
    source: function(request, response) {
        $.ajax({
            url: "https://www.alphavantage.co/query",
            dataType: "json",
            data: {
                function: "SYMBOL_SEARCH",
                keywords: request.term,
                apikey: "4X643L12DIZEYYH3"
            },
            success: function(data) {
                if (data.bestMatches && Array.isArray(data.bestMatches)) {
                    var suggestions = data.bestMatches.map(function(match) {
                        return match["1. symbol"] + " - " + match["2. name"];
                    });
                    response(suggestions);
                } else {
                    console.warn("API response:", data);
                    if (data.Information) {
                        // Handle rate limit or other API information messages
                        alert(data.Information);
                    } else {
                        console.error("Invalid data format from API");
                    }
                }
            },
            error: function(xhr, status, error) {
                console.error("AJAX Error:", status, error);
            }
        });
    },
    minLength: 2,
    select: function(event, ui) {
        $("#stockSymbol").val(ui.item.value.split(" - ")[0]);
    }
});



function createStockGraph(historicalData) {
    var stockChart = document.getElementById('stockChart').getContext('2d');
    var labels = Object.keys(historicalData).reverse();
    var dataPoints = labels.map(function(label) {
        return parseFloat(historicalData[label]["1. open"]);
    });

    new Chart(stockChart, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Stock Price',
                data: dataPoints,
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

