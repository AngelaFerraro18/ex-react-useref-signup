import { useState } from "react";

function App() {

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    select: '',
    year: '',
    description: ''
  })


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

        <input type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange} />

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

        <textarea placeholder="Breve descrizione..." name="description"
          value={formData.description}
          onChange={handleChange}></textarea>

        <button type="submit">Invia il form!</button>
      </form>
    </>
  )
}

export default App
