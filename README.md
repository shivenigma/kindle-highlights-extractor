# kindle highlights extractor
 A tool to extract your highlights from my-clippings.txt file in the kindle. Amazon will only let you export highlights from books you bought from Amazon which is pretty limiting.
 
 ## Motivation
 Amazon's kindle is excellent, it's note taking system and export are great. But only limitation is, they will only let you get highlights for the books you bought from amazon.
 
If you get books from free sites/other providers, if you read PDFs, research papers, amazon will not let you get those highlights out of kindle in their web application. I've tried multiple paid applications and they work. But reading a text file and sending you back the result in organised way should not be a recurring monthly bill IMO. I hacked this together within an hour, so highlight and export to your heart's content.

## How to use?
You can either run this by cloning this repo to your local machine and run this in a browser or you can use this link https://kindle-highlights-extractor.vercel.app

No data is transmitted from your system, the code handles everything on the client side.

## How to get my-clippings.txt file
If you plug your Kindle into your computer it will go into USB mode. From there you can view the files on your Kindle from your file explorer. Navigate to /Documents/My Clippings.txt, upload that file into the app.

## Roadmap
- Ability to let the user choose whether they need location of the highlight or the date.
- Ability to select/reject individual highlights from a specific book
- Drag and drop upload and make the UI looking good
- Make the worker.js to use WebAssembly for the heavy-lifting to boost performance on larger files.

## Contribution guidelines
- I love if someone cared enough to even think about contributing to this. This can be a good first OS contribution as this is a very simple repo.
- The aim is to handle things on the client side without a server, so you can add any enhancement without breaking that one aim.
