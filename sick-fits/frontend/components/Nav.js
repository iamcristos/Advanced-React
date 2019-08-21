import React from 'react';
import Link from 'next/link';
import NavStyles from './styles/NavStyles';

export default function Nav() {
    return (
        <NavStyles>
            <Link href="/items">
                <a>Items</a>
            </Link>
            <Link href="/sell">
                <a>Sell</a>
            </Link>
            <Link href="/signup">
                <a>SIGNUP</a>
            </Link>
            <Link href="/order">
                <a>ORDERS</a>
            </Link>
            <Link href="/account">
                <a>ACCOUNT</a>
            </Link>
        </NavStyles>
    )
}