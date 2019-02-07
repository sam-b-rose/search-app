# Search App

A web-based string search application.

## Summary

Need to find a word or phrase in a body of text? Quickly upload a text file or paste in some text you would like to search. Then enter the word or phrase you are looking for in the search input.

Search App will find all the matches and display them with the index and line number where the match is found.

[Try it out!](https://search-app.samrose3.com)

## Running the app

You will need to have node `^10.x` and python `^3.7` installed on your machine.

### Setup

```shell
# Clone the project
git clone git@github.com:samrose3/search-app.git
cd search-app

# Install npm packages
npm i

# Activate virtualenv of your choice...
# Then install python packages
pip install
```

### Start

```shell
# Build static assets
npm run build

# Run the app
python app.py
```

## Future Improvements

### Visual & UX

It currently isn't clear what the line number is for the input text. It would be better in include the numbers on the left side of the input textarea to quickly reference which line is being referenced.

Another nice visual would be to highlight all matches within the input textarea – similar to using the `Cmd + f` find feature in a browser. Clicking on a match in the MATCHES list would then scroll to the corresponding highlighted match within the textarea.

Lastly, the file upload feature only supports `text/*` file types. It would be good to indicate which types are supported. Better yet, it would be nice to support more file types by uploading and performing more advanced text parsing on the server. This would make it possible to extend the app to read text input from PDFs, Word documents, etc. However, the line number and location of the resulting text would not be an exact match to the uploaded document, since much of the formatting and positioning might be lost in the conversion.

### Performance

Currently, all parsing is handled by the client using the browser's native [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/FileReader) API and then finding matches using a dynamic [RegExg](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp). This process works well for small to medium inputs. However, this strategy might not be so suitable when handling extremely large amounts of text. To accommodate larger searches, uploading the file or text to the server to be processed would be more ideal, as to not block the client-side due to long processing jobs. On the server, the input text could be split into chunks, then a MapReduce strategy could be implemented to search for matches within each chunk in parallel. Once the results are aggregated, they cold then be sent back to the user.

Other options to improve scalability if an extremely large amount of text needed to be searched (giga or petabytes of text) would be to leverage a technology like [Elasticsearch](https://www.elastic.co/products/elasticsearch). Elasticsearch is flexible enough to work for our simple text search application now, but would allow the app to scale to search across a distributed pool of text data if needed in the future.

### Tests

There currently aren't any tests written for Search App. An ideal start would be to include unit tests for the individual methods of the `SearchApp` class to ensure they work as expected under various application states. These tests could then be run before new merges into the `master` using a CI tool such as [Travis CI](travis-ci.org) or [Circle CI](https://circleci.com/). This would help prevent any potential regressions when implementing new features as well as help verify that the code is functioning as designed.
