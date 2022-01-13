import { toReactAst } from "../../../node copy/lib/to-react";

class A extends toReactAst.Component {
  constructor() {
    super();
    this.state = {
      aaa: '123'
    }
  }

  setData(data) {
    this.setState(data)
  }
}