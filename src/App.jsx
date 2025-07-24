import { useMemo, useState } from "react";

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

function App() {

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    select: '',
    year: '',
    description: ''
  })

  const isUsernameValid = useMemo(() => {

    const { username } = formData;

    const charsValid = username.split('').every(char => letters.includes(char.toLowerCase()) || numbers.includes(char));
    return charsValid && username.length >= 6;

  }, [formData.username]);


  const isPasswordValid = useMemo(() => {

    const { password } = formData;

    const numberValid = password.split('').some(n => letters.includes(n) || numbers.includes(n) || symbols.includes(n));

    return numberValid && password.length >= 8;

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

    if (formData.name.trim() === '' || formData.username.trim() === '' || formData.password.trim() === '' || formData.select.trim() === '' || formData.description.trim() === '') {
      console.log('Tutti i campi devono essere compilati!')
    } else if (Number(formData.year) <= 0) {
      console.log('Devi inserire un numero maggiore di 0.')
    } else {
      console.log(`I dati del form sono: \n nome completo: ${formData.name} \n username: ${formData.username} \n password: ${formData.password} \n specializzazione: ${formData.select} \n anni di esperienza: ${formData.year} \n descrizione: ${formData.description}`)
    }


  }

  return (
    <>
      <form onSubmit={handleForm}>
        <input type="text"
          placeholder="Nome completo"
          name="name"
          value={formData.name}
          onChange={handleChange} />

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

        <select name="select" value={formData.select} onChange={handleChange}>
          <option value="">Specializzazione</option>
          <option value="full-stack">Full Stack</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>

        <input type="number"
          placeholder="Anni di esperienza"
          name="year"
          value={formData.year}
          onChange={handleChange} />

        {formData.description.length > 0 && (!isDescriptionValid ? (<span style={{ color: 'red' }}>Descrizione non valida!</span>) : (<span style={{ color: 'green' }}>Descrizione valida!</span>))}

        <textarea placeholder="Breve descrizione..." name="description"
          value={formData.description}
          onChange={handleChange}></textarea>

        <button type="submit">Invia il form!</button>
      </form>
    </>
  )
}

export default App
