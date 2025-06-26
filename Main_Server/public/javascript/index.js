// Funzione per ottenere la media dei reply
async function getAverageReplies() {
    try {
        // Invia una richiesta GET al server
        const response = await fetch('http://localhost:3000/api/analytics/average-replies', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
    },
    
});


        // Leggi la risposta
        const result = await response.json();

        // Aggiorna il risultato nella pagina
        if (result.success) {
            document.getElementById('result').innerText = `La media di reply ai commenti è: ${result.averageReplies.toFixed(2)}`;
        } else {
            document.getElementById('result').innerText = 'Errore durante l\'esecuzione della query';
        }
    } catch (error) {
        console.error('Errore durante la richiesta:', error);
        document.getElementById('result').innerText = 'Si è verificato un errore durante la richiesta.';
    }
}

// Funzione per ottenere la correlazione tra numero di follower e numero di post
async function getFriendsPostsCorrelation() {
    try {
        const response = await fetch('http://localhost:3000/api/analytics/friends-posts-correlation', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        if (result.success) {
            document.getElementById('correlationResult').innerText = `La correlazione tra numero di amici e numero di post è: ${result.correlation.toFixed(5)}`;
        } else {
            document.getElementById('correlationResult').innerText = 'Errore durante l\'esecuzione della query.';
        }
    } catch (error) {
        console.error('Errore durante la richiesta:', error);
        document.getElementById('correlationResult').innerText = 'Si è verificato un errore durante la richiesta.';
    }
}

// Funzione per ottenere la media dell'età delle donne che studiano all'università
async function getFemaleUniversityAverage() {
    try {
        const response = await fetch('http://localhost:3000/api/analytics/female-university-average', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        const output = document.getElementById('femaleUniversityAvgResult');
        console.log(output)
        if (result.success && typeof result.average === 'number') {
            output.innerText = `Età media delle ragazze universitarie: ${Math.ceil(result.average)} anni`;
        } else {
            output.innerText = 'Errore durante l\'esecuzione della query o media non disponibile.';
        }
    } catch (error) {
        console.error('Errore durante la richiesta:', error);
        document.getElementById('femaleUniversityAvgResult').innerText = 'Si è verificato un errore durante la richiesta.';
    }
}


// Funzione per ottenere la media dell'età delle donne che lavorano
async function getFemaleWorkerAverage() {
    try {
        const response = await fetch('http://localhost:3000/api/analytics/female-worker-average', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        const output = document.getElementById('femaleWorkerAvgResult');
        console.log(output)
        if (result.success && typeof result.average === 'number') {
            output.innerText = `Età media delle ragazze lavoratrici: ${Math.ceil(result.average)} anni`;
        } else {
            output.innerText = 'Errore durante l\'esecuzione della query o media non disponibile.';
        }
    } catch (error) {
        console.error('Errore durante la richiesta:', error);
        document.getElementById('femaleWorkerAvgResult').innerText = 'Si è verificato un errore durante la richiesta.';
    }
}

async function getCommentsTagLocIP() {
    const tag = document.getElementById('tagInput').value.trim();
    const location = document.getElementById('locationInput').value.trim();
    try {
        const response = await fetch(`http://localhost:3000/api/comments/tag-ip?tag=${encodeURIComponent(tag)}&location=${encodeURIComponent(location)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();

        if (result.success) {
            const comments = result.comments;
            let display = `Trovati ${comments.length} commenti.\n\n`;

            // Ciclo per mostrare i primi 3 in modo più leggibile
            comments.slice(0, 3).forEach((msg, index) => {
                display += `Messaggio #${index + 1}\n`;
                display += `ID: ${msg._id}\n`;
                display += `Data Creazione: ${msg.creationDate}\n`;
                display += `IP: ${msg.locationIP}\n`;
                display += `Browser: ${msg.browserUsed}\n`;
                display += `Contenuto: ${msg.content.length > 50 ? msg.content.substring(0, 50) + "..." : msg.content}\n`;
                display += `Lunghezza: ${msg.length}\n`;
                display += '-------------------------\n';
            });

            document.getElementById('commentResult').innerText = display;
        } else {
            document.getElementById('commentResult').innerText = 'Errore durante l\'esecuzione della query.';
        }
    } catch (error) {
        console.error('Errore durante la richiesta:', error);
        document.getElementById('commentResult').innerText = 'Si è verificato un errore durante la richiesta.';
    }
}

async function getLikeDays() {
  const firstName = document.getElementById('firstNameInput').value.trim();
  const lastName = document.getElementById('lastNameInput').value.trim();
  const browser = document.getElementById('browserInput').value.trim();
  const startDate = document.getElementById('startDateInput').value;
  const endDate = document.getElementById('endDateInput').value;
  const resultDiv = document.getElementById('likeDaysResult');

  if (!firstName || !lastName || !browser || !startDate || !endDate) {
    resultDiv.textContent = 'Compila tutti i campi.';
    return;
  }

  try {
    const queryParams = new URLSearchParams({
      firstName,
      lastName,
      browser,
      startDate,
      endDate
    });

    const response = await fetch(`/api/analytics/like-days?${queryParams.toString()}`);
    const data = await response.json();

    console.log('Risposta dal server:', data);  // Debug: vedi che dati ricevi

    if (data.success) {
        if (data.days && Array.isArray(data.days)) {
            resultDiv.innerHTML = `
            <ul>${data.days.map(d => `<li>${d}</li>`).join('')}</ul>
            `;
        } else {
            console.error('data.days non è un array valido:', data.days);
            resultDiv.textContent = 'Errore: dati ricevuti non validi.';
        }
    } else {
    resultDiv.textContent = `Errore: ${data.error || 'Nessun risultato trovato.'}`;
    }
  } catch (err) {
    console.error('Errore durante la richiesta:', err);
    resultDiv.textContent = 'Errore durante la richiesta al server.';
  }
}




//function per ottenere i forum più seguiti dagli universitari dell'università in input
async function getTopForums() {

  const universityName = document.getElementById('universityName').value;
  const resultContainer = document.getElementById('forumResults');

  if (!universityName) {
    resultContainer.innerText = 'Inserisci un nome valido.';
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/analytics/top-forums?university=${encodeURIComponent(universityName)}`);
    const result = await response.json();
    console.log('result:', result);
    console.log('result.forums:', result.forums);
    console.log('result.forums.forums:', result.forums?.forums);

    if (result.success && Array.isArray(result.forums?.forums)) {
    const forumList = result.forums.forums;
    resultContainer.innerHTML = `<ul>
        ${forumList.map(f => `<li>${f.title} </li>`).join('')}
    </ul>`;
    } else {
    resultContainer.innerText = 'Nessun risultato trovato.';
    }

  } catch (error) {
    console.error('Errore:', error);
    resultContainer.innerText = 'Errore durante la richiesta.';
  }
}

