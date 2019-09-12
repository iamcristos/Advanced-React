import React, { Component } from 'react'
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import {ALL_ITEMS_QUERY} from './Items';

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!) {
        deleteItem(id:$id) {
            id
        }
    }
`;
export default class componentName extends Component {
  update = (caches, payload) => {
    //   manually update the client from the client so it matches the server
    // 2 find the items in the cache
      const data = caches.readQuery({query: ALL_ITEMS_QUERY});
      console.log('Hello',data);
      console.log(payload)
    data.items = data.items.filter(item=> item.id !== payload.data.deleteItem.id);
    // 3 write the query to put the item back
    caches.writeQuery({query: ALL_ITEMS_QUERY, data:data});
  }
  render() {
    return (
        <Mutation 
            mutation={DELETE_ITEM_MUTATION} 
            variables={{id:this.props.id}}
            update={this.update}
        >
            {(deleteItem, {loading, error}) => (
                <button onClick={e => {
                    if(confirm('are you sure you want to delete item')) {
                        return deleteItem()
                    }
                }}>{this.props.children}</button>
            )}
        </Mutation>
    )
  }
}
