import Items from '../components/Items';

export default function Home(props) {
    // console.log(typeof props.query.page)
    return (
        <div>
            <Items page={Number(props.query.page || 1)}/>
        </div>
    )
}