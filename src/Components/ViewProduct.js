import React from 'react';
import '../App.css';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';

class ViewProduct extends React.Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('products').doc(this.props.match.params.id);

        this.state = {
            key: '',
            name: '',
            description: '',
            url: '',

        }
    }

    componentDidMount() {
        this.ref.get().then((doc) => {
            if (doc.exists) {
                const document = doc.data();
                this.setState(
                    {
                        key: doc.id,
                        name: document.name,
                        description: document.description,
                        url: document.url,
                    });
            }
            else {
                console.log("File do not exits")
            }
        })
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state)

    }

    delete = (id) => {
        const ref = firebase.storage().refFromURL(this.state.url);
        firebase.firestore().collection('products').doc(id).delete().then(() => {
            console.log("File deleted");
            this.props.history.push("/");
        })
            .catch(error => {
                console.log("Error: ", error);
            })
        ref.delete().then(() => {
            console.log("file Deleted");
        }).catch(error => {
            console.log("Erro: ", error);
        })

    }


    render() {

        const { name, description, url } = this.state;

        const cardStyled = {
            width: '60%',
            margin: 'auto',
            padding: '1rem 2rem',
            marginTop: '2rem',

        }

        return (
            <Card style={cardStyled}>
                <Link to="/" className="btn btn-outline-warning">Show product</Link>
                <h4 className="text-left my-3 text-muted">Product details</h4>
                <div className="mx-auto">
                    <img src={url} alt="Product" className="card-img" style={{ width: '12rem', height: '9rem' }} />
                </div>
                <div>
                    <div className="form-group">
                        <label htmlFor="name">Product name</label>
                        <input className="form-control" id="name" type="text" name="name" value={name} onChange={this.onChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Product description</label>
                        <textarea className="form-control" id="description"
                            type="text" name="description" column="80" rows="3" value={description} onChange={this.onChange} />
                    </div>
                </div>
                <div className="btn-container mx-auto">
                    <Link to={`/edit/${this.state.key}`} className="btn btn-outline-success mr-3">Edit file</Link>
                    <button className="btn btn-outline-danger" onClick={this.delete.bind(this, this.state.key)}>Delete file</button>
                </div>

            </Card>
        )
    }
}

export default ViewProduct;