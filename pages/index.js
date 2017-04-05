import ipfsAPI from 'ipfs-api';
import concat from 'concat-stream';

// ipfs works on the server but not on the client
// checkout https://github.com/VictorBjelkholm/webpack-node-ipfs-api-demo
const ipfs = ipfsAPI('localhost', '5001');

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    // save some data
    const data = 'world';
    const buffer = new Buffer(JSON.stringify(data))
    const obj = await ipfs.add(buffer);
    const hash = obj[0].hash;

    // retrieve it
    const stream = await ipfs.cat(hash);
    const message = await new Promise((resolve) => stream.pipe(concat(data => resolve(JSON.parse(data)))));
    return { message };
  }
  render () {
    return(
      <h1>hello {this.props.message}</h1>
    )
  }
}
