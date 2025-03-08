import Footer from "./Footer";
import Header from "./Header";
import HomeIndex from "./Home/HomeIndex";

export const Index = ()=>{


return(<>

<div className="min-h-screen grid grid-rows-[auto_1fr_auto] ">
  <header>{<Header/>}</header>

  <main>
    <HomeIndex/>
  </main>

  <footer>{<Footer/>}</footer>
</div>

</>)
}
export default Index;