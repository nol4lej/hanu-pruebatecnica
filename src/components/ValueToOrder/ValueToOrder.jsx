import './ValueToOrder.css'

const ValueToOrder = ({ value }) => {
    return (
        <div className='container'>
            <p>Valor a ordenar:</p>
            <p className='value__container'>{ value }</p>
        </div>
    )
}

export default ValueToOrder