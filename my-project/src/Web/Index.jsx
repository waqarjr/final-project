import Footer from "./Footer";
import Header from "./Header";
import HomeIndex from "./Home/HomeIndex";

export const Index = ()=>{


return(<>


  <header>{<Header/>}</header>

  <main><HomeIndex/></main>

  <footer>{<Footer/>}</footer>

</>)
}
export default Index;