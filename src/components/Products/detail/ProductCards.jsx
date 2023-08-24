import ProductCard from "./ProductCard";

function ProductCards({ products, setUpdateCarts, setUpdateProduct, setPage, isEdit }) {
    return products.map((product, index) => (
        <ProductCard
            product={product}
            setUpdateCarts={setUpdateCarts}
            setUpdateProduct={setUpdateProduct}
            isEdit={isEdit}
            key={index}
        />
    ));
}

export default ProductCards;
