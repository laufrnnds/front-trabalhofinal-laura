import React, { useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import Formulario from "../../components/Formulario";
import Header from "../../components/Header";
import RecadosContent from "../../components/RecadosContent";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { buscarRecados } from "../../store/Recados/RecadosSlice";
import Filtragem from "../../components/Filtragem";
import { checkMostrar, selectMostrar } from "../../store/Mostrar/MostrarSlice";
import FileDownloadOffIcon from "@mui/icons-material/FileDownloadOff";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ButtonStyled from "../../components/ButtonStyled";
import RecadosContentArquiv from "../../components/RecadosContentArquiv";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const estadoMostrar = useAppSelector(selectMostrar).mostrou;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(buscarRecados());
    dispatch(checkMostrar(false));
  }, []);

  const handleArquivados = () => {
    dispatch(checkMostrar(true));
  };

  const handleNaoArquivados = () => {
    dispatch(checkMostrar(false));
  };

  const handleLogout = () => {
    navigate("/");
    window.localStorage.setItem("idUser", `0`);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        overflowX: "hidden",
      }}
    >
      <Header />
      <Box
        sx={{
          width: "90%",
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "start",
          paddingTop: "10px",
        }}
      >
        <ButtonStyled icon={<LogoutIcon />} txt="Sair" onClick={handleLogout} />
      </Box>
      <Typography
        variant="h3"
        align="center"
        sx={{ fontFamily: '"Josefin Sans", sans-serif', margin: "20px" }}
      >
        Recados
      </Typography>
      <Formulario />
      <Filtragem />
      {estadoMostrar == false ? (
        <ButtonStyled
          onClick={handleArquivados}
          icon={<FileDownloadIcon />}
          txt={"Arquivados"}
        />
      ) : (
        <>
          <ButtonStyled
            onClick={handleNaoArquivados}
            icon={<FileDownloadOffIcon />}
            txt={"Desarquivados"}
          />
          <RecadosContentArquiv />
        </>
      )}
      <RecadosContent />
    </Box>
  );
};

export default Home;
