import Item from '../components/Items'

export default function Items(props) {
    return (
        <div>
            <Item page={Number(props.query.page)}/>
        </div>
    )
}