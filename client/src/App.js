import React, { Component } from 'react';
import axios from 'axios';
import { Button, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

import './App.css';

class App extends Component {
    state = {
        products: [],

        createProductData: {
            name: '',
            price: '',
        },

        editProductData: {
            id: '',
            name: '',
            price: '',
        },

        createProductModal: false,
        editProductModal: false,
    };

    componentDidMount() {
        this.getProducts();
    };

    toggleCreateProductModal() {
        this.setState({
            createProductModal: !this.state.createProductModal
        });
    };

    toggleEditProductModal() {
        this.setState({
            editProductModal: !this.state.editProductModal
        });
    };

    getProducts = async () => {
        try {
            const productsList = await axios.get('http://localhost:5000/api/products/');
            this.setState({
                products: productsList.data
            })
        } catch (err) {
            console.error(err);
        };
    };

    addProductHandler = async () => {
        try {
            const newProduct = await axios.post('http://localhost:5000/api/products/', this.state.createProductData);
            const { products } = this.state;
            products.push(newProduct.data);
            this.setState({
                products,
                createProductModal: false,
                createProductData: {
                    name: '',
                    price: '',
                }
            });
        } catch (err) {
            console.error(err);
        };
    };

    editProductHandler = async (id) => {
        try {
            const { products } = this.state;
            const product = products.find((el) => el.id === id);
            this.setState({
                editProductData: {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                },
                editProductModal: !this.state.editProductModal,
            });
        } catch (err) {
            console.error(err);
        };
    };

    updateProductHandler = async () => {
        try {
            const { name, price } = this.state.editProductData;
            await axios.put('http://localhost:5000/api/products/' + this.state.editProductData.id, {
                name,
                price,
            })
            this.getProducts();
            this.setState({
                editProductModal: !this.state.editProductModal
            });
        } catch (err) {
            console.error(err);
        };
    };

    deleteProductHandler = async (id) => {
        try {
            await axios.delete('http://localhost:5000/api/products/' + id);
            this.getProducts();
        } catch (err) {
            console.error(err);
        };
    };

    render() {
        let products = this.state.products.map((product) => {
            return (
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                        <Button color='secondary' size='sm' outline onClick={this.editProductHandler.bind(this, product.id)}>EDIT</Button>{' '}
                        <Button color='danger' size='sm' outline onClick={this.deleteProductHandler.bind(this, product.id)}>DELETE</Button>
                    </td>
                </tr>
            );
        });

        return (
            <div className='App container'>
                <br />
                <h1>List of Products</h1>
                <br />
                <Button color='success' outline onClick={this.toggleCreateProductModal.bind(this)}>ADD PRODUCT</Button>
                <br />
                <br />

                <Modal isOpen={this.state.createProductModal} toggle={this.toggleCreateProductModal.bind(this)}>
                    <ModalHeader toggle={this.toggleCreateProductModal.bind(this)}>Please add a new product:</ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <Label for='name'>Name:</Label>
                            <Input id='name' placeholder='ex.: AMD Ryzen 5 3600' value={this.state.createProductData.name} onChange={(event) => {
                                let { createProductData } = this.state;
                                createProductData.name = event.target.value;
                                this.setState({ createProductData });
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='price'>Price</Label>
                            <Input id='price' placeholder='ex.: 1234' value={this.state.createProductData.price} onChange={(event) => {
                                let { createProductData } = this.state;
                                createProductData.price = event.target.value;
                                this.setState({ createProductData });
                            }} />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color='primary' onClick={this.addProductHandler.bind(this)}>ADD</Button>{' '}
                        <Button color='secondary' onClick={this.toggleCreateProductModal.bind(this)}>CANCEL</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.editProductModal} toggle={this.toggleEditProductModal.bind(this)}>
                    <ModalHeader toggle={this.toggleEditProductModal.bind(this)}>Edit product info:</ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <Label for='name'>Name:</Label>
                            <Input id='name' value={this.state.editProductData.name} onChange={(event) => {
                                let { editProductData } = this.state;
                                editProductData.name = event.target.value;
                                this.setState({ editProductData });
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='price'>Price</Label>
                            <Input id='price' value={this.state.editProductData.price} onChange={(event) => {
                                let { editProductData } = this.state;
                                editProductData.price = event.target.value;
                                this.setState({ editProductData });
                            }} />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color='primary' onClick={this.updateProductHandler.bind(this)}>UPDATE</Button>{' '}
                        <Button color='secondary' onClick={this.toggleEditProductModal.bind(this)}>CANCEL</Button>
                    </ModalFooter>
                </Modal>

                <Table bordered striped size='sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products}
                    </tbody>
                </Table>
            </div>
        );
    };
};

export default App;