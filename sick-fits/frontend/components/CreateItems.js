import React, { Component } from 'react'
import {Mutation} from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formartPrice from '../lib/formatMoney';
import Error from './ErrorMessage';

const CREAT_ITEM_MUTATION = gql`
    mutation CREAT_ITEM_MUTATION(
      $title: String!
      $price:Int!
      $image: String
      $largeImage: String
      $description: String!
    ) {
        createItem(
      title: $title
      price: $price
      image: $image
      imageLarge: $largeImage
      description: $description
      ) {
          id
      }
    }
`;
export default class componentName extends Component {
  state = {
      title: '',
      price: 0,
      image: '',
      largeImage: '',
      description: '',
  }

  onchangeHandler = (e) => {
      const {name, type, value} = e.target;
      const val = type === 'number' ? parseFloat(value) : value;
      this.setState({[name]: val});
  }

  uploadImage = async (e) =>{
    const {files} = e.target
    const form = new FormData();
    form.append('file', files[0])
    form.append('upload_preset', 'sickfits');
    const res = await fetch('https://api.cloudinary.com/v1_1/cristos/image/upload',{
      method: 'POST',
      body: form
    })
    const data = await res.json()
    this.setState({image:data.secure_url, largeImage:data.eager[0].secure_url})
  }
  render() {
    return (
      <div>
        <Mutation mutation={CREAT_ITEM_MUTATION} variables={this.state} >
            {(createItem,{loading, error})=>(
        <Form onSubmit={async (e)=>{
            e.preventDefault()
            const res = await createItem()
           Router.push({
               pathname: '/item',
               query: {id: res.data.createItem.id}
           })
        }}>
            <h2>Title</h2>
            <Error error={error}/>
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">
                      Image
                      <input type="file" 
                          id="file" 
                          name="file"
                          placeholder="file" 
                          // value={this.state.title}
                          onChange={this.uploadImage}
                          required/>
                  </label>
                  {this.state.image && <img src={this.state.image} alt="Image type" width="200px"/>}
                <label htmlFor="title">
                    Title
                    <input type="text" 
                        id="title" 
                        name="title"
                        placeholder="Title" 
                        value={this.state.title}
                        onChange={this.onchangeHandler}
                        required/>
                </label>
                <label htmlFor="description">
                    Description
                    <textarea 
                        id="description" 
                        name="description"
                        placeholder="Enter your Description" 
                        value={this.state.description}
                        onChange={this.onchangeHandler}
                        required/>
                </label>
                <label htmlFor="price">
                    Price
                    <input type="number" 
                        id="price" 
                        name="price"
                        placeholder="Price" 
                        value={this.state.price}
                        onChange={this.onchangeHandler}
                        required/>
                </label>
                <button>Submit</button>
            </fieldset>
        </Form>
        )}</Mutation>
      </div>
    )
  }
}
