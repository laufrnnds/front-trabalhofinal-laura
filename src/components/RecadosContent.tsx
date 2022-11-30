import React, { useEffect, useState } from "react";
import RecadoAccordion from "./RecadoAccordion";
import { Box } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import { selectAll } from "../store/Recados/RecadosSlice";
import defaultTheme from "../config/theme/Default";
import { Recado, RecadoAtualizado, RecadoCriado } from "../store/Recados/types";

const RecadosContent: React.FC = () => {
  const listaRecados = useAppSelector(selectAll);
  const [listaUser, setListaUser] = useState<Recado[]>([]);
  const listaUsuario: Recado[] = [];
  const [idUsuario, setIdUsuario] = useState(0);

  const num = Number(window.localStorage.getItem("idUser"));
  // useEffect(() => {
  //   listaRecados.map((recado) => {
  //     setIdUsuario(num);
  //     if (recado.user.id_usuario === num) {
  //       const novaLista = [...listaUser, recado];
  //       setListaUser(novaLista);
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   listaRecados.map((recado) => {
  //     setIdUsuario(num);
  //     console.log("NUM");
  //     console.log(num);
  //     console.log("USER ID RECADO");
  //     console.log(recado.user.id_usuario);
  //     if (recado.user.id_usuario === num) {
  //       // const novaLista: Recado[] = [...listaUser, recado];
  //       // setListaUser(novaLista);
  //       listaUsuario.push(recado);
  //       console.log("RECADO");
  //       console.log(recado);

  //       console.log("LISTA USER");
  //       console.log(listaUser);
  //       console.log("LISTA USER TAMANHO");
  //       console.log(listaUser.length);
  //     }
  //   });
  // }, [listaRecados]);
  return (
    <Box sx={{ width: "50%", margin: "30px" }}>
      {listaRecados.map((recado) => {
        if (recado.user.id_usuario === num) {
          return (
            <RecadoAccordion
              key={recado.id_recado}
              dado={recado}
              color={defaultTheme.palette.secondary.main}
              arquivado={false}
            />
          );
        }
      })}
    </Box>
  );
};

export default RecadosContent;
