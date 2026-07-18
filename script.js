

            const resultD = document.getElementById('result');
            const convertBtn = document.getElementById('convertBtn');
            const amountInput = document.getElementById('amount');
            const toCurrency = document.getElementById('toCurrency');
            const fromCurrency = document.getElementById('fromCurrency');

            async function convertCurrency() {

                resultD.innerHTML = '<p style="color: blue;">processing data!...</p>';

                const amount = parseFloat(amountInput.value);
                

                if (isNaN(amount) || amount <= 0) {
                    
                    resultD.innerHTML = '<p style="color: red;">Please enter a valid number!</p>';

                    return;
                }

                const from = fromCurrency.value;
                const to = toCurrency.value;

                if (from === to) {
                    
                    resultD.innerHTML = `<p style="color: #333;">${from} = ${to}</p>`;

                   return;
                }

               resultD.innerHTML = '<p style="color: #333;">Converting the currency!...</p>'; 

               try {

                    const url = `https://api.exchangerate-api.com/v4/latest/${from}`;
                    const response = await fetch(url);

                    if(!response.ok) {
                        throw new Error('API ERROR');
                    }

                    const data = await response.json();
                    const rate = data.rates[to];
                    const result = amount * rate;

                    resultD.innerHTML = `<p style="color: #28a745;">${from} = ${result.toFixed(2)} ${to}</p>`;

               }
               catch(error) {

                resultD.innerHTML = `<p style="color: #dc3545;">Error: ${error}</p>`;

               }

            }

            convertBtn.onclick = convertCurrency;


