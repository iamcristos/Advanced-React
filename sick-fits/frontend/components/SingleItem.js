import React, { Component } from 'react'
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import styled from 'styled-components';
import Head from 'next/head';
import ErrorMessage from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where:{id:$id}) {
            id
            title
            description
            imageLarge
        }
    }
`;

const Item = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    box-shadow: ${props => props.theme.bs};
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        min-height: 200px;
    }
    .details {
        margin: 3rem;
        font-size: 2rem;
    }
`;
export default class SingleItem extends Component {
  render() {
    // console.log(this.props.query.id, 'help')
   const {id} = this.props.query;
    return (
      <Query 
        query={SINGLE_ITEM_QUERY}
        variables={{id}}
      >
          {({error, loading, data}) => {
              const {item} = data;
              if(error) return <ErrorMessage error={error}/>
              if (loading) return <p>{loading}....</p>
              return  (
                <Item>
                    <Head>
                        <title> Sick fits | {item.title}</title>
                    </Head>
                        <img src={item.imageLarge} alt={item.title} />
                    <div className="details">
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                    </div>
                </Item>
              )
          }}
      </Query>
    )
  }
}
