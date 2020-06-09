import React from 'react';
import '../App.css';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';

class EditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('products').doc(this.props.match.params.id);
        this.state = {
            key: '',
            name: '',
            description: '',
            url: '',
            img: null
        }
    }

    componentDidMount() {
        const ref = this.ref;
        ref.get().then((doc) => {
            if (doc.exists) {
                const item = doc.data();
                this.setState({
                    key: doc.id,
                    name: item.name,
                    description: item.description,
                    url: item.url,
                })
            }
            else {
                console.log("File cannot be found");
            }
        }).catch(error => {
            console.log("Error : ", error);
        })
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
        console.log(e.target.files[0]);

    }

    hanleUploadImage = (e) => {
        const { image, url } = this.state;
        const delReft = firebase.storage().refFromURL(url);
        const uploadImage = firebase.storage().ref(`prodimages/${image.name}`).put(this.state.image);
        uploadImage.on('state_changed', (snapshot) => { console.log('snapshot'); },
            (error) => { console.log("Error: ", error) }, () => {
                firebase.storage().ref('prodimages')
                    .child(image.name).getDownloadURL().then(url => { this.setState({ url }) })
            })

        delReft.delete().then(function () {
            console.log("file deleted")
        })
            .catch(error => {
                console.log("Erro: ", error)
            });
    }

    saveData = (e) => {
        e.preventDefault();

        const ref = firebase.firestore().collection('products').doc(this.state.key);
        const { name, description, url } = this.state;
        ref.set({
            name, description, url
        }).then(() => {
            this.setState({
                name: '',
                description: '',
                url: '',
                image: null,
            });

            this.props.history.push("/show/" + this.props.match.params.id);
        }).catch(error => {
            console.log("Error: ", error);
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
                <div className="mx-auto">
                    <Link to="/" className="btn btn-outline-secondary">Back to home page</Link>
                </div>
                <div className="my-3">
                    <div className="form-group">
                        <label htmlFor="name">Product name:</label>
                        <input className="form-control" type="text" id="name" name="name" value={name} onChange={this.onChange} />

                    </div>
                    <div>
                        <label htmlFor="description">Product description:</label>
                        <textarea name="description" id="description" value={description}
                            onChange={this.onChange} cols="80" rows="3" className="form-control"></textarea>
                    </div>
                </div>

                <div className="mx-auto img-container">
                    <img src={url} alt="Product" style={{ width: '12rem', height: '9rem' }} />
                </div>
                <div className="mx-auto">
                    <label htmlFor="choose" className="btn btn-outline-secondary  mt-2">Choose image</label>
                    <input type="file" id="choose" onChange={this.handleImage} />
                    <button className="btn btn-outline-warning mx-3" onClick={this.hanleUploadImage}>Upload image</button>
                    <button onClick={this.saveData} className="btn btn-outline-success">Save changes?</button>
                </div>


            </Card>
        )
    }
}

export default EditProduct;