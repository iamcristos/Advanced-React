import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';
import Pagination from './Pagination';
import {perPage} from '../config';

export const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY($skip:Int = 0, $first: Int =  ${perPage}) {
        items(first:$first, orderBy:createdAt_DESC, skip:$skip) {
            id
            title
            price
            description
            image
            imageLarge
        }
    }
`;

const Center = styled.div`
    text-align: center;
`;

const ItemList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
    width: ${props => props.theme.maxWidth};
`;

export default class Items extends Component {
    render() {
        return (
            <Center>
                <Pagination page={this.props.page}/>
                <Query query={ALL_ITEMS_QUERY} variables={{
                    skip: this.props.page * perPage - perPage,
                    first: perPage
                }}>
                    {payload =>{
                        const {data, error, loading} = payload;
                        loading && <div>loading...</div>
                        error && <p>Error: {error.message}</p>
                        return (
                            <ItemList>
                                {data.items.map(item =>
                                    <Item 
                                        key={item.id}
                                        items={item}
                                    />
                                )}
                            </ItemList>
                        )
                    }}
                </Query>
                <Pagination page={this.props.page}/>
            </Center>
        );
    }
}

