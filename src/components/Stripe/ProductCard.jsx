
import '../../styles/stripe.css'

const ProductCard = ({ product, setCurrentProduct}) => {
    return (
        <>
            <div className="productCard" onClick={()=>setCurrentProduct(product.id)}>
                <p>{product.name}</p>
                <p>{product.price}</p>
            </div>
        </>
    )
}

export default ProductCard;