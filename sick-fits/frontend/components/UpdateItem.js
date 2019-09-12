import React, { Component } from 'react'
import {Mutation, Query} from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formartPrice from '../lib/formatMoney';
import Error from './ErrorMessage';

const GET_ITEM_QUERY = gql`
    query GET_ITEM_QUERY($id: ID!) {
        item(where:{id:$id}) {
            id
            title
            price
            description
        }
    }
`;
const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION(
        $id: ID!
      $title: String
      $price:Int
      $description: String
    ) {
        updateItem(
      id: $id
      title: $title
      price: $price
      description: $description
      ) {
          id
          title
          price
          description
      }
    }
`;
export default class UpdateItem extends Component {
  state = {}

  onchangeHandler = (e) => {
      const {name, type, value} = e.target;
      const val = type === 'number' ? parseFloat(value) : value;
      this.setState({[name]: val});
  }

  updateItem = async (e, updateMutation)=> {
        e.preventDefault()
        const res = await updateMutation()
  }
  render() {
    return (
      <div>
        <Query query={GET_ITEM_QUERY} variables={{id:this.props.id}}>
            {payload => {
                const {data, error, loading} = payload
                loading && <div>loading...</div>
                if(!data.item) return <div>No item found</div>
                return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={{id: this.props.id, ...this.state}} >
                {(updateItem,{loading, error})=>(
            <Form
             onSubmit={e => this.updateItem(e, updateItem)}>
                <h2>Title</h2>
                <Error error={error}/>
                <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                        Title
                        <input type="text" 
                            id="title" 
                            name="title"
                            placeholder="Title" 
                            defaultValue={data.item.title}
                            onChange={this.onchangeHandler}
                            required/>
                    </label>
                    <label htmlFor="description">
                        Description
                        <textarea 
                            id="description" 
                            name="description"
                            placeholder="Enter your Description" 
                            defaultValue={data.item.description}
                            onChange={this.onchangeHandler}
                            required/>
                    </label>
                    <label htmlFor="price">
                        Price
                        <input type="number" 
                            id="price" 
                            name="price"
                            placeholder="Price" 
                            defaultValue={data.item.price}
                            onChange={this.onchangeHandler}
                            required/>
                    </label>
                    <button>Submit</button>
                </fieldset>
            </Form>
            )}</Mutation>
             )
            }}
        </Query>
      </div>
    )
  }
}
