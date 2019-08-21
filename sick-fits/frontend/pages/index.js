import Link from 'next/link';

export default function Home(props) {
    return (
        <div>
            <h1>Home</h1>
            <Link href="/sell">
                <a>Go to sell Page</a>
            </Link>
        </div>
    )
}