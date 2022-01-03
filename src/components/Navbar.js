import React from "react";
import { Link, NavLink } from "react-router-dom";
import { batch, useDispatch, useSelector } from "react-redux";
import { logOutAction } from "../redux/loginRedux";
import { withRouter } from "react-router-dom";
import { salirSalaAction } from "../redux/salaRedux";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const { activo } = useSelector((store) => store.usuario);
  const { nombre } = useSelector((store) => store.usuario.user);
  const { idSala } = useSelector((store) => store.sala);
  // console.log('user',user);
//   batch(() => {
//     dispatch(increment());
//     dispatch(increment());
//   });
  const cerrarSesion = () => {
    dispatch(salirSalaAction(idSala, nombre)); //pasarle id sala y name jugador
    setTimeout(() => {
      dispatch(logOutAction());
    }, 2000);
    props.history.push("/login");
  };
  return (
    <>
      <div id='logo' className=" fs-10 navbar-dark font-weight-bold text-white pt-2 text-center   bg-dark">
        10Mil
      </div>
      <div className="navbar navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          {" "}
          {activo ? nombre : "Home"}
        </Link>
        <div>
          <div className="d-flex">
            {activo ? (
              <>
                <NavLink className="btn btn-dark mr-2" to="/" exact>
                  {" "}
                  Home
                </NavLink>
                <button className="btn btn-dark" onClick={cerrarSesion}>
                  log out
                </button>
              </>
            ) : (
              <NavLink className="btn btn-dark mr-2" to="/login" exact>
                {" "}
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Navbar);
