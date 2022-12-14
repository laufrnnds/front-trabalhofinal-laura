import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { checkBotoes, selectBotao } from "../store/Botoes/BotoesSlice";
import { checkForm, selectForm } from "../store/Form/FormSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  atualizarRecado,
  buscarRecados,
  criarRecado,
} from "../store/Recados/RecadosSlice";
import { Recado, RecadoRequest } from "../store/Recados/types";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ButtonStyled from "./ButtonStyled";
import { selectRecado } from "../store/Recados/RecadoSlice";
import { checkMostrar } from "../store/Mostrar/MostrarSlice";

const BoxForm = styled(Box)({
  width: "50%",
  padding: "30px",
  margin: "30px",
  boxShadow: "4px -1px 22px 5px #9e9e9e",
  borderRadius: "25px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "column",
});

const RadioGroupStyled = styled(RadioGroup)({
  width: "100%",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  flexDirection: "row",
  margin: "10px",
});

const TextFieldStyled = styled(TextField)({
  margin: "10px",
  fontFamily: '"Josefin Sans", sans-serif',
});

const BoxButtons = styled(Box)({
  margin: "20px",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  flexDirection: "row",
});

const Formulario: React.FC = () => {
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("concluido");
  const [detalhamento, setDetalhamento] = useState("");
  const [idUsuario, setIdUsuario] = useState(0);
  const estadoForm = useAppSelector(selectForm).aparece;
  const recado = useAppSelector(selectRecado);
  const estadoBotao = useAppSelector(selectBotao).check;
  const dispatch = useAppDispatch();

  const handleFormulario = () => {
    dispatch(checkForm(true));
    dispatch(checkBotoes(true));
  };

  const handleCancelFormulario = () => {
    dispatch(checkForm(false));
    dispatch(checkBotoes(true));
    setDescricao("");
    setDetalhamento("");
    setStatus("concluido");
  };

  function handleSalvar() {
    const novoRecado: RecadoRequest = {
      descricao: descricao,
      detalhamento,
      status: status,
      user: { id_usuario: idUsuario },
    };

    dispatch(criarRecado(novoRecado));
    dispatch(checkForm(false));
    dispatch(checkBotoes(true));
    dispatch(checkMostrar(false));
    dispatch(buscarRecados());
  }

  function handleEditar() {
    const novoRecado: Recado = {
      id_recado: recado.id_recado,
      descricao,
      detalhamento,
      status: status,
      user: { id_usuario: idUsuario },
    };
    dispatch(atualizarRecado(novoRecado));
    dispatch(checkForm(false));
    dispatch(buscarRecados());
  }

  useEffect(() => {
    if (estadoBotao && estadoForm) {
      setStatus("concluido");
      setDescricao("");
      setDetalhamento("");
    } else if (!estadoBotao && estadoForm) {
      setStatus(recado.status);
      setDescricao(recado.descricao);
      setDetalhamento(recado.detalhamento);
    }
  }, [estadoBotao, estadoForm]);

  useEffect(() => {
    dispatch(checkForm(false));
    setIdUsuario(Number(window.localStorage.getItem("idUser")));
  }, []);

  return (
    <>
      <ButtonStyled
        onClick={handleFormulario}
        icon={<NoteAddIcon />}
        txt={"Novo"}
      />
      {estadoForm ? (
        <BoxForm>
          <RadioGroupStyled
            aria-labelledby="demo-radio-buttons-group-label"
            value={status}
            name="radio-buttons-group"
            onChange={(e) => setStatus(e.target.value)}
          >
            <FormControlLabel
              value="concluido"
              control={<Radio />}
              label="Concluido"
            />
            <FormControlLabel
              value="pendente"
              control={<Radio />}
              label="Pendente"
            />
            <FormControlLabel
              value="cancelado"
              control={<Radio />}
              label="Cancelado"
            />
          </RadioGroupStyled>
          <TextFieldStyled
            id="input-descricao"
            fullWidth
            label="Descri????o"
            variant="outlined"
            placeholder="Digite aqui..."
            onChange={(e) => setDescricao(e.target.value)}
            value={descricao}
          />
          <TextFieldStyled
            id="input-detalhamento"
            fullWidth
            label="Detalhamento"
            multiline
            rows={3}
            placeholder="Digite aqui..."
            onChange={(e) => setDetalhamento(e.target.value)}
            value={detalhamento}
          />

          <BoxButtons>
            {estadoBotao ? (
              <ButtonStyled
                onClick={handleSalvar}
                icon={<AddCircleIcon />}
                txt={"Adicionar"}
              />
            ) : (
              <ButtonStyled
                onClick={handleEditar}
                icon={<CheckCircleIcon />}
                txt={"Atualizar"}
              />
            )}

            <ButtonStyled
              onClick={handleCancelFormulario}
              icon={<CancelIcon />}
              txt={"Cancelar"}
            />
          </BoxButtons>
        </BoxForm>
      ) : (
        <></>
      )}
    </>
  );
};

export default Formulario;
