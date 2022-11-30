import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { checkBotoes } from "../store/Botoes/BotoesSlice";
import { checkForm } from "../store/Form/FormSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  criarRecado,
  excluirRecado,
  selectAll,
} from "../store/Recados/RecadosSlice";
import {
  Recado,
  RecadoAtualizado,
  RecadoRequest,
} from "../store/Recados/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  addOneArquiv,
  removeOneArquiv,
  selectAllArquiv,
} from "../store/Arquivados/ArquivadosSlice";
import { checkMostrar } from "../store/Mostrar/MostrarSlice";
import ButtonStyled from "./ButtonStyled";
import { selecionarRecado } from "../store/Recados/RecadoSlice";

interface RecadoAccordionProps {
  dado: Recado;
  color: string;
  arquivado: boolean;
}

const BoxTxt = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
});

const TypographyStyled = styled(Typography)({
  fontFamily: '"Josefin Sans", sans-serif',
});

const BoxButtons = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  flexDirection: "row",
});

const RecadoAccordion: React.FC<RecadoAccordionProps> = ({
  dado,
  color,
  arquivado,
}) => {
  const listaRecados: Recado[] = useAppSelector(selectAll);
  const listaArquivados = useAppSelector(selectAllArquiv);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkMostrar(false));
  }, [listaRecados]);

  useEffect(() => {
    dispatch(checkMostrar(true));
  }, [listaArquivados]);

  const handleEditar = () => {
    dispatch(selecionarRecado(dado));
    dispatch(checkBotoes(false));
    dispatch(checkForm(true));
  };

  const handleApagar = () => {
    if (arquivado == true) {
      dispatch(removeOneArquiv(dado.id_recado));
    } else {
      dispatch(excluirRecado(dado.id_recado));
    }
  };

  function handleArquivar() {
    dispatch(addOneArquiv(dado));
    dispatch(excluirRecado(dado.id_recado));
  }

  function handleDesarquivar() {
    const novoRecado: RecadoRequest = {
      descricao: dado.descricao,
      detalhamento: dado.detalhamento,
      status: dado.status,
      user: dado.user,
    };
    dispatch(removeOneArquiv(dado.id_recado));
    dispatch(criarRecado(novoRecado));
  }

  return (
    <Accordion sx={{ width: "100%", margin: "5px" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          backgroundColor: color,
          color: "white",
        }}
      >
        <BoxTxt>
          <TypographyStyled variant="body1">
            {dado.id_recado} # {dado.descricao}
          </TypographyStyled>

          <Box>
            <TypographyStyled variant="body1">
              {dado.user.id_usuario}
            </TypographyStyled>

            <TypographyStyled
              variant="body1"
              sx={{
                paddingRight: "30px",
              }}
            >
              Status: {dado.status}
            </TypographyStyled>
          </Box>
        </BoxTxt>
      </AccordionSummary>
      <AccordionDetails sx={{ overflowY: "auto", marginTop: "5px" }}>
        <TypographyStyled
          variant="body1"
          sx={{
            marginBottom: "20px",
          }}
        >
          {dado.detalhamento}
        </TypographyStyled>
        {arquivado ? (
          <TypographyStyled variant="body2">Arquivado</TypographyStyled>
        ) : (
          <></>
        )}
        <BoxButtons>
          <ButtonStyled
            onClick={handleEditar}
            icon={<EditIcon />}
            txt={"Editar"}
          />
          <ButtonStyled
            onClick={handleApagar}
            icon={<DeleteForeverIcon />}
            txt={"Deletar"}
          />
          {arquivado ? (
            <ButtonStyled
              onClick={handleDesarquivar}
              icon={<FileUploadIcon />}
              txt={"Desarquivar"}
            />
          ) : (
            <ButtonStyled
              onClick={handleArquivar}
              icon={<FileDownloadIcon />}
              txt={"Arquivar"}
            />
          )}
        </BoxButtons>
      </AccordionDetails>
    </Accordion>
  );
};

export default RecadoAccordion;
