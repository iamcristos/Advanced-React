import Item from '../components/UpdateItem'

export default function Update(props) {
    console.log(props)
    return (
        <div>
            <h1>Update</h1>
            <Item id={props.query.id}/>
        </div>
    )
}