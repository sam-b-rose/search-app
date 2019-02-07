import './styles.scss'

class SearchApp {
  constructor(opts = {}) {
    // constants
    this.prefix = opts.prefix || 'sa'
    this.updateKeys = ['Enter', ' '];

    // state
    this.query = ''
    this.input = ''
    this.results = []

    // DOM elements
    this.$searchInput = document.querySelector(`.${this.prefix}-search-input`)
    this.$textInput = document.querySelector(`.${this.prefix}-text-input`)
    this.$fileInput = document.querySelector(`.${this.prefix}-file-input`)
    this.$resultsList = document.querySelector(`.${this.prefix}-results-list`)

    this.init()
  }

  init() {
    this.$searchInput.addEventListener('keypress', this.onKeyPress.bind(this))
    this.$textInput.addEventListener('keypress', this.onKeyPress.bind(this))
    this.$fileInput.addEventListener('change', this.onFileChange.bind(this))
  }

  onKeyPress(e) {
    if (this.updateKeys.indexOf(e.key) > -1) this.update()
  }

  async onFileChange(e) {
    const [file] = e.currentTarget.files
    const text = await this.parse(file)
    this.$textInput.value = text || 'Can not read input file'
    this.update()
  }

  async parse(file) {
    const reader = new FileReader()
    reader.readAsText(file)
    const result = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result)
    })
    return result
  }

  update() {
    this.query = this.$searchInput.value
    this.input = this.$textInput.value.split('\n')
    this.search()
    this.render()
  }

  search() {
    if (!this.query || !this.input)
      return this.results = []

    this.results = this.input
      .map(line => {
        let match
        const lineMatches = []
        const re = new RegExp(`${this.query}`, 'igm')

        while ((match = re.exec(line)) != null) {
          console.log("match found at " + match.index);
          lineMatches.push(match.index)
        }

        return lineMatches
      })
  }

  render() {
    const fragment = document.createDocumentFragment()

    this.results.forEach((line, lineNumber) => {
      line.forEach(matchIdx => {
        const li = document.createElement('li')
        const start = matchIdx
        const end = matchIdx + this.query.length
        const matchText = this.input[lineNumber].slice(start, end)

        const maxLength = 20
        const padding = maxLength - matchText.length
        const hasEllipsis = (end + padding) < this.input[lineNumber].length
        const contextText = this.input[lineNumber].slice(end, end + padding)
        const html = `
          <div class="flex justify-between">
            <div>
              <strong>${matchText}</strong>${contextText}${hasEllipsis ? '...' : ''}
            </div>
            <div>
              at index <code>${start}</code>, line <code>${lineNumber}</code>
            </div>
          </div>
        `
        li.innerHTML = html
        fragment.appendChild(li)
      })
    })

    this.$resultsList.innerHTML = ''
    this.$resultsList.appendChild(fragment)
  }
}

const searchApp = new SearchApp()
window.sa = searchApp
export default searchApp

