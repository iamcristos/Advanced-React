import React, { Component } from 'react';
import propTypes from 'prop-types';
import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';
class Item extends Component {
    static propTypes = {
        items : propTypes.object.isRequired
    }
    render() {
        const {items} = this.props;
        return (
            <div>
                <ItemStyles>
                    {items.image && <img src={items.image} alt={items.title} />}
                    <Title>
                        <Link href={{
                            pathname: '/item',
                            query: {id: items.id}
                        }}>
                            <a>{items.title}</a>
                        </Link>
                    </Title>
                        <PriceTag>{formatMoney(items.price)}</PriceTag>
                        <p>{items.description}</p>
                        <div className="buttonList">
                            <Link href= {{
                                pathname:'/update',
                                query:{id: items.id}
                            }
                            }
                            ><a>Edit :pencil</a></Link>
                            <button>Add to cart</button>
                            <DeleteItem id={items.id}>Delete</DeleteItem>
                        </div>
                </ItemStyles>
            </div>
        );
    }
}

export default Item;