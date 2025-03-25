import { Link } from "react-router-dom";

export const CategoriesLink = ()=>{

    return(<>
    <Link to="/admin/categoriescreat"></Link>
    <Link to="/admin/categoriesupdate"></Link>
    </>)
}
export default CategoriesLink;
