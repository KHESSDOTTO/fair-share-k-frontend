import { Link } from "react-router-dom";
import mobileHome from "../../images/mobile-home.png";
import footerPoweredBy from "../../images/footer-powered-by.png";

export function Home() {
  return (
    <>
      <div className="flex flex-col justify-between gap-4 pt-8 items-center bg-cover bg-center min-h-screen bg-stone-200 md:bg-[url('https://res.cloudinary.com/dukhlscyh/image/upload/v1678419063/pictures/file_ag1ztc.png')]">
        <img src={mobileHome} className="w-10/12 md:hidden"></img>
        <div className="flex flex-col justify-end items-center gap-4 relative md:gap-6 md:h-[100vh] md:w-screen md:px-40 md:pt-48 md:flex-row md:justify-start xl:px-44">
          <Link to="/discover">
            <button className="btn-indigo">Save Food</button>
          </Link>
          <Link to="/signup">
            <button className="btn-indigo">Sign up</button>
          </Link>
          <Link to="/login">
            <button className="btn-indigo">Log in</button>
          </Link>
        </div>
        <img src={footerPoweredBy} className="self-start w-3/4 md:hidden"></img>
      </div>
    </>
  );
}
