
 // PASO 3. Importa useEffect y useState desde "react"
import { useEffect, useState } from "react"

// PASO 3. Importa axios
import axios from "axios"

// PASO 3. Crea la constante URL_ARTICULOS
const URL_ARTICULOS = "https://api.spaceflightnewsapi.net/v4/articles/?limit=6"

function ListaNoticias({ seleccionado, onSeleccionar }) {
  // PASO 3. Crea los estados articulos, cargando y error
  const [articulos, setArticulos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")

  // PASO 3. Llama a cargarArticulos cuando el componente abre
  useEffect(() => {
    cargarArticulos()
  }, [])

  // PASO 3. Escribe la función cargarArticulos con axios
  async function cargarArticulos() {
    try {
      setCargando(true)
      setError("")
      const respuesta = await axios.get(URL_ARTICULOS)
      setArticulos(respuesta.data.results)
    } catch (err) {
      setError("No hubo conexión con el API de noticias. Revisa tu internet.")
      console.error(err)
    } finally {
      setCargando(false)
    }
  }

  return (
    <section>
      <h2>Artículos</h2>

      {/* PASO 3. Muestra el error, si existe */}
      {error && <p className="aviso">{error}</p>}

      {/* PASO 3. Si cargando es true, muestra "Cargando noticias..." */}
      {cargando && <p>Cargando noticias...</p>}

      <ul className="lista">
        {/* PASO 3. Recorre articulos y pinta cada tarjeta */}
        {articulos.map((articulo) => (
          <li key={articulo.id}>
            <button
              type="button"
              className={seleccionado?.id === articulo.id ? "tarjeta activa" : "tarjeta"}
              onClick={() => onSeleccionar(articulo)}
            >
              {articulo.image_url && <img src={articulo.image_url} alt="" />}
              <span className="medio">{articulo.news_site}</span>
              <strong>{articulo.title}</strong>
              <span className="fecha">{formatearFecha(articulo.published_at)}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

// PASO 3. Escribe la función formatearFecha
function formatearFecha(fecha) {
  return new Date(fecha).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default ListaNoticias

