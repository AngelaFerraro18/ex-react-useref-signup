import { useMemo, useState, useRef } from "react";

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

function App() {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    description: ''
  })


  //campi non controllati
  const nameRef = useRef();
  const selectRef = useRef();
  const yearRef = useRef();

  const isUsernameValid = useMemo(() => {

    const { username } = formData;

    const charsValid = username.split('').every(char => letters.includes(char.toLowerCase()) || numbers.includes(char));
    return charsValid && username.trim().length >= 6;

  }, [formData.username]);


  const isPasswordValid = useMemo(() => {

    const { password } = formData;

    return (password.trim().length >= 8 && password.split('').some(n => letters.includes(n)) && password.split('').some(n => numbers.includes(n)) && password.split('').some(n => symbols.includes(n)));

  }, [formData.password]);

  const isDescriptionValid = useMemo(() => {

    const { description } = formData;

    const descriptionValid = description.trim();

    return descriptionValid.length >= 100 && descriptionValid.length <= 1000;

  }, [formData.description])

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  function handleForm(e) {
    e.preventDefault();

    //valori non controllati
    const nameValue = nameRef.current.value;
    const selectValue = selectRef.current.value;
    const yearValue = yearRef.current.value;

    if (!nameValue ||
      formData.username.trim() === '' ||
      formData.password.trim() === '' ||
      !selectValue ||
      formData.description.trim() === '' ||
      !isUsernameValid ||
      !isPasswordValid ||
      !isDescriptionValid) {
      console.log('Tutti i campi devono essere compilati!');
      return;
    }

    if (Number(yearValue) <= 0) {
      console.log('Devi inserire un numero maggiore di 0.');
      return;
    }


    console.log(`I dati del form sono: \n nome completo: ${nameValue} \n username: ${formData.username} \n password: ${formData.password} \n specializzazione: ${selectValue} \n anni di esperienza: ${yearValue} \n descrizione: ${formData.description}`)


  }

  return (
    <>
      <form onSubmit={handleForm}>
        <input type="text"
          placeholder="Nome completo"
          ref={nameRef} />

        {formData.username.length > 0 && (!isUsernameValid ? (<span style={{ color: 'red' }}>Username non valido!</span>) : (<span style={{ color: 'green' }}>Username valido!</span>))}

        <input type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange} />

        {formData.password.length > 0 && (!isPasswordValid ? (<span style={{ color: 'red' }}>Password non valida!</span>) : (<span style={{ color: 'green' }}>Password valida!</span>))}

        <input type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange} />

        <select ref={selectRef}>
          <option value="">Specializzazione</option>
          <option value="full-stack">Full Stack</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>

        <input type="number"
          placeholder="Anni di esperienza"
          ref={yearRef} />

        {formData.description.length > 0 && (!isDescriptionValid ? (<span style={{ color: 'red' }}>Descrizione non valida, deve essere compresa tra 100 e 1000 caratteri! Hai scritto {formData.description.trim().length} caratteri.</span>) : (<span style={{ color: 'green' }}>Descrizione valida!</span>))}

        <textarea placeholder="Breve descrizione..." name="description"
          value={formData.description}
          onChange={handleChange}></textarea>

        <button type="submit">Invia il form!</button>
      </form>
    </>
  )
}

export default App
