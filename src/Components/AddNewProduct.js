import React from 'react';
import '../App.css';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';



class AddNewProduct extends React.Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('products');
        this.state = {
            name: '',
            description: '',
            url: '',
            image: null,
        }

    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    handleImage = (e) => {
        if (e.target.files[0]) {
            this.setState({
                image: e.target.files[0],
            })
        }
        console.log(e.target.files[0])
    }
    handleUplaodImage = () => {
        const { image } = this.state;
        const uploadImage = firebase.storage().ref(`prodimages/${image.name}`).put(this.state.image);
        uploadImage.on('state_changed', (snapshot) => { console.log('snapshot'); },
            (error) => { console.log("Error at: ", error) },
            () => { firebase.storage().ref('prodimages').child(image.name).getDownloadURL().then(url => { this.setState({ url }) }) })

    }

    saveData = (e) => {
        const { name, description, url } = this.state;
        this.ref.add({
            name, description, url
        }).then(() => {
            this.setState({
                name: '',
                description: '',
                url: '',
                image: null,
            });
            this.props.history.push("/");
        }).catch((error) => {
            console.log("Error: ", error);
        })

    }

    render() {

        const cardStyled = {
            width: '60%',
            margin: 'auto',
            padding: '1rem 2rem',
            marginTop: '2rem',

        }

        const { name, description, url } = this.state;

        return (


            <Card style={cardStyled}>
                <div className="link-container mx-auto">
                    <Link to="/" className="btn btn-outline-success text-center my-3">Show product</Link>

                </div>
                <div><h4 className="text-center text-muted">Add new product</h4></div>
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
                <div className="file-container mx-auto">
                    <label htmlFor="img-icon" className="btn btn-outline-dark">Choose file</label>
                    <input type="file" id="img-icon" onChange={this.handleImage} />

                </div>
                <div className="img-container mx-auto my-3 ">
                    <img src={url} className="card-img" style={{ width: '12rem', height: '9rem' }} alt="Product" />
                </div>
                <div className="btn-container mx-auto">
                    <button className="btn btn-outline-secondary mr-3" onClick={this.handleUplaodImage}>Upload image first</button>
                    <button className="btn btn-outline-secondary" onClick={this.saveData}>Save All</button>
                </div>

            </Card>
        )
    }
}

export default AddNewProduct;