import { useEffect } from "react";
import CrearSala from "./CrearSala";
import UnirSala from "./UnirSala";

import { useDispatch, useSelector } from "react-redux";
import { salirSalaAction } from "../redux/salaRedux";
import Dice from "./Dice";
import NuevoDice from "./NuevoDice";
import ListaJugadoresPuntaje from "./ListaJugadoresPuntaje";

const Home = () => {
  const haySala = useSelector((store) => store.sala.haySala);
  const { roomName } = useSelector((store) => store.sala.infoSala);
  const { idSala } = useSelector((store) => store.sala);
  const { nombre } = useSelector((store) => store.usuario.user);
  const { loading2, salaError, infoSala } = useSelector((store) => store.sala);
  const { puntajeDeTiro, puntajeRonda } = useSelector((store) => store.dados);
  const dispatch = useDispatch();
  console.log("infoSala", infoSala.player);

  var productos = [
    {
      price: 100,
      name: "tv",
    },
    {
      price: 50,
      name: "phone",
    },
    {
      price: 30,
      name: "lamp",
    },
  ];
  // => [{price: 100, name:'tv'}]

  Array.prototype.filtrar = function (fn) {
    console.log("this", this);
    console.log("fn", fn);
    // console.log("fn(this)", fn(this));
    const arr = this.map((e) => fn(e));
    console.log(arr);
  };

  productos.filtrar(function (p) {
    return p.price >= 50;
  });
  return (
    <div className="mt-2">
      {loading2 ? (
        <div>cargando...</div>
      ) : haySala ? (
        <>
          <div className="container">
            <div className="row ">
              <div className="col text-white">
                <h6>
                  Round Points: <span>{puntajeDeTiro}</span> <br />
                </h6>
                <h6>Saved Points: {puntajeRonda}</h6>
              </div>

              <div className="col">
                <ListaJugadoresPuntaje />
              </div>
            </div>
          </div>

          <div className="my-1">
            {/* <Dice/> */}
            <NuevoDice />
          </div>

          <p className="text-white">{roomName}</p>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => dispatch(salirSalaAction(idSala, nombre))}
          >
            Exit Sala
          </button>
          {/* {infoSala.player>0&&infoSala.player.map(jug=>(
              <div className='py-5' key={jug.id}>
                  <ul>
                      <li>
                          <p>jug.playerName</p>
                      </li>
                      <li>
                          <p>jug.totalScore</p>
                      </li>
                  </ul>
              </div>
          ))} */}
        </>
      ) : loading2 ? (
        <div>cargando...</div>
      ) : (
        <>
          {salaError && <div>NO EXISTE ESA SALA</div>}
          <div className="container-crear-sala">
            <h2 className='text-white'>Create a Room</h2>
            <CrearSala />
            <h2 className='text-white'>Join a Room</h2>
            <UnirSala />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
