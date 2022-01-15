class App extends React.Component {
  constructor() {
    super();
  }

  get data() {
    return this.state;
  }

  render() {
    const kkk = 1
    return React.createElement('div', {
      key: kkk,
      data1: 'aaaaa'
    }, null)
  }
}

export default App;