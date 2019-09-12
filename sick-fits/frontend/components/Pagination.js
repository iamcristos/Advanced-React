import React from 'react'
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles'
import {perPage} from '../config';

const PAGINATION = gql`
    query PAGINATION {
        itemsConnection {
            aggregate {
                count
            }
        }
    }
`;
export default (props) => {
  return (
    <div>
            <Query query={PAGINATION}>
                {({loading, data, error}) => {
                    if(error) return <p> error</p>
                    if(loading) return <p>loading...</p>
                    const {count} = data.itemsConnection.aggregate;
                    const pages = Math.ceil(count/perPage);
                    const {page} = props;
                    console.log(page)
                    return (
                                <PaginationStyles>
                        <Link
                            prefetch
                            href={{
                                pathname: 'items',
                                query: {page: page - 1}
                            }}
                        >
                            <a className="prev" aria-disabled={page <= 1}> prev </a>
                        </Link>
                        <p>
                            {props.page}of{pages}
                        </p>
                        <Link
                        prefetch
                        href={{
                            pathname: 'items',
                            query: {page: page + 1}
                        }}
                    >
                        <a className="prev" aria-disabled={page >= pages}> next </a>
                    </Link>
                </PaginationStyles>
                    )
                }}
            </Query>
    </div>
  )
}
