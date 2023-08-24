import CategoryCard from "./CategoryCard";

function CategoryCards({ categories, setCategory, setPage, isEdit, setUpdateCategory }) {
    return categories.map((category, index) => (
        <CategoryCard
            category={category}
            setCategory={setCategory}
            setPage={setPage}
            isEdit={isEdit}
            setUpdateCategory={setUpdateCategory}
            key={index}
        />
    ));
}

export default CategoryCards;
