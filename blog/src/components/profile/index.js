import React, { useState, useEffect } from "react";
import "./profile.css";
import { CreateProfile, EditProfile, ShowUserId } from "../../services/user";
import { Redirect, useParams } from "react-router-dom";
import styled from "styled-components";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
// import { CustomInput, FormGroup } from "reactstrap";

export default (props) => {
  const [form, setForm] = useState({ playingSince: {} });
  const [goLogin, setgoLogin] = useState(false);
  const [goList, setgoList] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const { id } = useParams();
  const method = isEdit ? EditProfile : CreateProfile;
  const change = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    const showUser = async () => {
      const user = await ShowUserId(id);
      if (user.data.password) {
        delete user.data.password;
      }
      setForm(user.data);
    };
    if (id) {
      setisEdit(true);
      showUser();
    }
  }, [id]);

  const valid = () => {
    return form.playingSince && form.dci && form.want;
  };
  const submit = async (event) => {
    try {
      // event.preventDefault();
      await method(form);
      setForm({
        ...form,
      });
      window.alert(isEdit ? "Update Complete" : "User created");
      isEdit ? setgoList(true) : setgoLogin(true);
    } catch (error) {
      alert("Erro no preenchimento");
      console.log(error, error.msg);
    }
  };
  function ToggleButtonGroupControlled() {
    const [value, setValue] = useState(false);

    /*
     * The second argument that will be passed to
     * `handleChange` from `ToggleButtonGroup`
     * is the SyntheticEvent object, but we are
     * not using it in this example so we will omit it.
     */
    const handleChange = (event) => setValue(true);

    return (
      <ToggleButtonGroup
        vertical="true"
        type="checkbox"
        value={form.playingSince}
        onChange={handleChange}
      >
        <FormatButton
          name="playingSince.vintage"
          value={form.playingSince.vintage}
          variant="dark"
          size="sm"
        >
          Vintage
        </FormatButton>
        <FormatButton
          name="playingSince.legacy"
          value={form.playingSince.legacy}
          variant="dark"
          size="sm"
        >
          Legacy
        </FormatButton>
        <FormatButton
          name="playingSince.modern"
          value={form.playingSince.modern}
          variant="dark"
          size="sm"
        >
          Modern
        </FormatButton>
        <FormatButton
          value={form.playingSince.pioneer}
          variant="dark"
          size="sm"
        >
          Pioneer
        </FormatButton>
        <FormatButton value={form.playingSince.pauper} variant="dark" size="sm">
          Pauper
        </FormatButton>
        <FormatButton
          value={form.playingSince.standart}
          variant="dark"
          size="sm"
        >
          Standard
        </FormatButton>
        <FormatButton
          value={form.playingSince.commander}
          variant="dark"
          size="sm"
        >
          EDH
        </FormatButton>
        <FormatButton value={form.playingSince.brawl} variant="dark" size="sm">
          Brawl
        </FormatButton>
      </ToggleButtonGroup>
    );
  }
  return (
    <>
      <div className="addUser">
        <div className="formclass">
          <label htmlFor="playingSince">Playing Since?</label>
          <input
            type="date"
            name="playingSince"
            onChange={change}
            value={form.playingSince || ""}
          />
          <label htmlFor="dci">DCI</label>
          <input
            type="number"
            name="dci"
            onChange={change}
            value={form.dci || ""}
          />
          <label htmlFor="formatsPlayed">Formats Played</label>
          <ToggleButtonGroupControlled />
          <label htmlFor="onlyBuying">Buying?</label>
          <input
            type="text"
            name="onlybuying"
            onChange={change}
            value={form.onlybuying || ""}
          />
          <label htmlFor="onlyTrading">Trading?</label>
          <input
            type="text"
            name="onlyTrading"
            onChange={change}
            value={form.onlyTrading || ""}
          />
          <label htmlFor="want">Want List</label>
          <TextBox
            type="text"
            name="want"
            onChange={change}
            value={form.want || ""}
          />

          <button disabled={!valid()} id="submit" onClick={submit}>
            {isEdit ? "Update" : "Submit"}
          </button>
        </div>
        {goLogin && <Redirect to="../login" />}
        {goList && <Redirect to="../list" />}
      </div>
    </>
  );
};

const FormatButton = styled(ToggleButton)`
  width: 30%;
  height: 20px;
  font-size: 7px;
`;

const TextBox = styled.textarea`
  background-color: #1f283391;
  border-radius: 5px;
`;
