const organizedHighlights = {};
function extractHighlights(fileDataAsText) {
    // Amazon is kind enough that they gave the below handle, each highlight is split by '==========
    const highlights = fileDataAsText.target.result.split(/\=\=\=\=\=\=\=\=\=\=\r?\n/);
    highlights.forEach(highlight => {
        // Kindle should be using unix file endings? but not sure, so used regex.
        const processedHighlight = highlight.split(/\r?\n/);
        // The processedHighlight array will have the book title, location of highlight, and actual highlight respectively as elements. Need to watch out for the empty lines. in the middle and in the end on line 2 and 4.
        if (!organizedHighlights[processedHighlight[0]]) {
            organizedHighlights[processedHighlight[0]] = [];
        }
        organizedHighlights[processedHighlight[0]].push({
            location: processedHighlight[1],
            highlight: processedHighlight[3]
        });
    });
    postMessage(
        {
            type: 'book-list',
            data: Object.keys(organizedHighlights)
        });
}

function handleFileUpload(event) {
    const reader = new FileReader();
    reader.addEventListener('load', extractHighlights, false);
    reader.onerror = function (event) {
        console.error(event);
        console.log('There is an error reading the file');
    }
    reader.addEventListener('progress', (event) => {
        if (event.loaded && event.total) {
            const percent = (event.loaded / event.total) * 100;
            console.log(`Progress: ${Math.round(percent)}`);
        }
    });
    reader.readAsText(event.data.data);
}

function handleLinkClick(event) {
    const book = organizedHighlights[event.data.data];
    let text = book.reduce((acc, highlight) => {
        acc += '\r\n' + highlight.highlight + '\r\n' + highlight.location + '\r\n\r\n';
        return acc;
    }, event.data.data);
    const data = new Blob([text], {type: 'text/plain'});
    postMessage(
        {
            type: 'book-data',
            data: {
                title: event.data.data,
                highlights: data
            }
        });
}

onmessage = function (event) {
    switch (event.data.type) {
        case 'upload': {
            handleFileUpload(event);
            break;
        }
        case 'linkClick': {
            handleLinkClick(event);
            break;
        }
    }
}

