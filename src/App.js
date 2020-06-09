import React from 'react';
import './App.css';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from './Config';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.ref = firebase.firestore().collection('products');
    this.unsubscribe = null;
    this.state = {
      key: '',
      items: []
    }
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectData);

  }

  onCollectData = (queryItems) => {
    const items = [];
    queryItems.forEach((item) => {
      const { name, description, url } = item.data();
      items.push({
        key: item.id,
        name,
        description,
        url
      })
    })
    this.setState({ items })
  }


  render() {



    return (
      <Card className='container my-2'>
        <div className="text-center">
          <Link to="/create" className="btn btn-outline-secondary">Add new product</Link>
        </div>
        <div className="table-container my-3" >
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product name</th>
                <th>Product description</th>
                <th>Product image</th>
              </tr>
            </thead>
            <tbody>{
              this.state.items.map((item) => <tr key={item.key}>
                <td className="td-name"><Link to={`/show/${item.key}`}>{item.name}</Link></td>
                <td className="td-description">{item.description}</td>
                <td className="td-img"><div className="img-container">
                  <img src={item.url} className="card-img" style={{ width: '8rem', height: '5rem' }} alt="Product" />
                </div></td>
              </tr>)
            }

            </tbody>
          </table>
        </div>

      </Card>
    );
  }
}


export default App;
