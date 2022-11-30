/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { TextField, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import ButtonStyled from "../../components/ButtonStyled";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  buscarUsuarios,
  criarUsuario,
  selectAllUser,
} from "../../store/Usuarios/UsuariosSlice";
import { UserSend } from "../../store/Usuarios/types";

const TextFieldStyled = styled(TextField)({
  margin: "10px",
  fontFamily: '"Josefin Sans", sans-serif',
});

const BoxForm = styled(Box)({
  width: "40%",
  height: "50%",
  padding: "30px",
  margin: "30px",
  boxShadow: "4px -1px 22px 5px #9e9e9e",
  borderRadius: "25px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

const Content = styled(Box)({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "column",
});

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const listaUsuarios = useAppSelector(selectAllUser);
  const [logou, setLogou] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEntrar = () => {
    listaUsuarios.forEach((usuario) => {
      if (usuario.email === email && usuario.senha === senha) {
        setLogou(true);
        window.localStorage.setItem("idUser", `${usuario.id_usuario}`);
      }
    });
  };

  const handleCadastrou = () => {
    if (email !== "" && senha !== "") {
      const novoUser: UserSend = {
        email: email,
        senha: senha,
      };
      dispatch(criarUsuario(novoUser));
      setLogou(true);
    }
  };

  useEffect(() => {
    if (logou) {
      navigate("/home");
    }
  }, [logou]);

  useEffect(() => {
    dispatch(buscarUsuarios());
  }, []);

  return (
    <Content>
      <Header />
      <BoxForm>
        <Box
          sx={{
            width: "70%",
            height: "100%",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <TextFieldStyled
            id="input-email"
            fullWidth
            label="E-mail"
            variant="outlined"
            type="email"
            placeholder="Digite aqui..."
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextFieldStyled
            id="input-senha"
            fullWidth
            label="Senha"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            placeholder="Digite aqui..."
            onChange={(e) => setSenha(e.target.value)}
            value={senha}
          />
        </Box>

        <ButtonStyled
          icon={<LoginIcon />}
          txt="Entrar"
          onClick={handleEntrar}
        />

        <ButtonStyled
          icon={<PersonAddIcon />}
          txt="Cadastrar"
          onClick={handleCadastrou}
        />
      </BoxForm>
    </Content>
  );
};

export default Login;
