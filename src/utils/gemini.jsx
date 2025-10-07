import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [rawResponse, setRawResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setResponse('')
    setRawResponse(null)

    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + import.meta.env.VITE_GEMINI_API_KEY,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: input }]
              }
            ]
          }),
        }
      )

      const data = await res.json()

      // Texto simplificado (primera respuesta candidata)
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response"
      setResponse(text)

      // Guardamos todo el JSON crudo
      setRawResponse(data)

    } catch (error) {
      setResponse("Error: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Gemini Test (2.0-flash)</h1>

      <textarea
        rows={4}
        cols={50}
        placeholder="Escribe tu mensaje..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <br />

      <button onClick={handleSubmit} disabled={loading || !input}>
        {loading ? "Consultando..." : "Enviar"}
      </button>

      <h2>Respuesta:</h2>
      <div style={{
        minHeight: "100px",
        border: "1px solid #ccc",
        padding: "1rem",
        marginTop: "1rem",
        whiteSpace: "pre-wrap"
      }}>
        {response}
      </div>

      {rawResponse && (
        <>
          <h2>JSON Crudo:</h2>
          <pre style={{
            maxHeight: "300px",
            overflow: "auto",
            background: "#f4f4f4",
            padding: "1rem",
            borderRadius: "8px",
            fontSize: "0.9rem"
          }}>
            {JSON.stringify(rawResponse, null, 2)}
          </pre>
        </>
      )}
    </div>
  )
}

export default App
