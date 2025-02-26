import Footer from "./Footer";
import Header from "./Header";
import HomeIndex from "./Home/HomeIndex";

export const Index = ()=>{


return(<>
{/* #f8ffe5 - lightYellow  , 06d6a0 - emerald*/}

<div className="min-h-screen grid grid-rows-[auto_1fr_auto] ">
  {/* <header>{<Header/>}</header> */}

  <main>
    <HomeIndex/>
  </main>

  {/* <footer>{<Footer/>}</footer> */}
</div>

</>)
}
export default Index;