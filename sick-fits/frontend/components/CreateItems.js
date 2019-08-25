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
      largeImage: $largeImage
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
                    Title
                    <input type="text" 
                        id="title" 
                        name="title"
                        placeholder="Title" 
                        state={this.state.title}
                        onChange={this.onchangeHandler}
                        required/>
                </label>
                <label htmlFor="description">
                    Description
                    <textarea 
                        id="description" 
                        name="description"
                        placeholder="Enter your Description" 
                        state={this.state.description}
                        onChange={this.onchangeHandler}
                        required/>
                </label>
                <label htmlFor="price">
                    Price
                    <input type="number" 
                        id="price" 
                        name="price"
                        placeholder="Price" 
                        state={this.state.price}
                        onChange={this.onchangeHandler}
                        required/>
                </label>
            </fieldset>
        </Form>
        )}</Mutation>
      </div>
    )
  }
}
