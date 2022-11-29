import React, { useEffect, useState } from "react";
import RecadoAccordion from "./RecadoAccordion";
import { Box } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import { selectAll } from "../store/Recados/RecadosSlice";
import defaultTheme from "../config/theme/Default";
import { Recado } from "../store/Recados/types";

const RecadosContent: React.FC = () => {
  const listaRecados = useAppSelector(selectAll);
  const listaUser: Recado[] = [];
  const [idUsuario, setIdUsuario] = useState(0);
  useEffect(() => {
    setIdUsuario(Number(window.localStorage.getItem("idUser")));
    listaRecados.forEach((recado) => {
      console.log(recado);
      if (recado.id_recado === idUsuario) {
        console.log("é do user");
        listaUser.push(recado);
      }
    });
    console.log(listaUser);
  }, []);

  return (
    <Box sx={{ width: "50%", margin: "30px" }}>
      <Box>
        {listaRecados.map((recado) => {
          // if (recado.id_recado === idUsuario) {
          return (
            <RecadoAccordion
              key={recado.id_recado}
              dado={recado}
              color={defaultTheme.palette.secondary.main}
              arquivado={false}
            />
          );
          // }
        })}
      </Box>
    </Box>
  );
};

export default RecadosContent;
