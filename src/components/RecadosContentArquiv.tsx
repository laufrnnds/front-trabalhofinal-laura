import React, { useEffect, useState } from "react";
import RecadoAccordion from "./RecadoAccordion";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import { selectAllArquiv } from "../store/Arquivados/ArquivadosSlice";
import { selectMostrar } from "../store/Mostrar/MostrarSlice";
import defaultTheme from "../config/theme/Default";
import { Recado } from "../store/Recados/types";

const RecadosContentArquiv: React.FC = () => {
  const listaArquivados = useAppSelector(selectAllArquiv);
  const estadoMostrar = useAppSelector(selectMostrar).mostrou;
  const [listaUser, setListaUser] = useState<Recado[]>([]);
  const [idUsuario, setIdUsuario] = useState(0);

  const num = Number(window.localStorage.getItem("idUser"));
  // useEffect(() => {
  //   listaArquivados.forEach((recado) => {
  //     setIdUsuario(num);
  //     if (recado.user.id_usuario === idUsuario) {
  //       const novaLista = [...listaUser, recado];
  //       setListaUser(novaLista);
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   listaArquivados.forEach((recado) => {
  //     setIdUsuario(num);
  //     if (recado.user.id_usuario === idUsuario) {
  //       const novaLista = [...listaUser, recado];
  //       setListaUser(novaLista);
  //     }
  //   });
  // }, [listaArquivados]);

  return (
    <Box sx={{ width: "50%", margin: "30px" }}>
      <Box>
        {estadoMostrar ? (
          <>
            {listaArquivados.length > 0 ? (
              listaArquivados.map((recado) => {
                if (recado.user.id_usuario === num) {
                  return (
                    <RecadoAccordion
                      key={recado.id_recado}
                      dado={recado}
                      color={defaultTheme.palette.secondary.light}
                      arquivado={true}
                    />
                  );
                }
              })
            ) : (
              <Typography
                variant="h6"
                align="center"
                sx={{
                  fontFamily: '"Josefin Sans", sans-serif',
                  margin: "5px",
                }}
              >
                Sem recados arquivados
              </Typography>
            )}
          </>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default RecadosContentArquiv;
