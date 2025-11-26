export default function CookiePolicyPage() {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="font-headline text-4xl font-bold mb-8">Política de Cookies</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <p>
            Esta Política de Cookies explica qué son las cookies y cómo las usamos. Le recomendamos que lea esta
            política para que pueda entender qué tipo de cookies utilizamos, o la información que recopilamos
            usando cookies y cómo se utiliza esa información.
          </p>

          <h2 className="font-headline text-2xl mt-8">¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en su navegador cuando visita un sitio web.
            Permiten que el sitio web recuerde información sobre su visita, como su idioma preferido y otras
            opciones, lo que puede facilitar su próxima visita y hacer que el sitio le resulte más útil.
          </p>

          <h2 className="font-headline text-2xl mt-8">¿Cómo usamos las cookies?</h2>
          <p>
            Utilizamos cookies para varias finalidades, entre las que se incluyen:
          </p>
          <ul>
            <li>
              <strong>Cookies esenciales:</strong> Algunas cookies son esenciales para que pueda experimentar la
              funcionalidad completa de nuestro sitio. Nos permiten mantener las sesiones de los usuarios y
              prevenir cualquier amenaza a la seguridad. No recopilan ni almacenan ninguna información personal.
            </li>
            <li>
              <strong>Cookies de estadísticas:</strong> Estas cookies almacenan información como el número de
              visitantes del sitio web, el número de visitantes únicos, qué páginas del sitio web se han
              visitado, la fuente de la visita, etc. Estos datos nos ayudan a comprender y analizar qué tan bien
              funciona el sitio web y dónde necesita mejorar.
            </li>
            <li>
              <strong>Cookies de funcionalidad:</strong> Son las cookies que ayudan a ciertas funcionalidades no
              esenciales en nuestro sitio web. Estas funcionalidades incluyen incrustar contenido como videos o
              compartir contenido del sitio web en plataformas de redes sociales.
            </li>
          </ul>

          <h2 className="font-headline text-2xl mt-8">Sus opciones con respecto a las cookies</h2>
          <p>
            Si prefiere evitar el uso de cookies en el sitio web, primero debe deshabilitar el uso de cookies
            en su navegador y luego eliminar las cookies guardadas en su navegador asociadas con este sitio web.
            Puede usar esta opción en cualquier momento para evitar el uso de cookies.
          </p>
          <p>
            Si no acepta nuestras cookies, puede experimentar algunos inconvenientes en su uso del sitio web y
            algunas funciones pueden no funcionar correctamente.
          </p>
          
          <h2 className="font-headline text-2xl mt-8">Contacto</h2>
          <p>
            Si tiene alguna pregunta sobre esta Política de Cookies, puede contactarnos:
          </p>
          <ul>
             <li>Por correo electrónico: info@ejaglobaltrans.com</li>
          </ul>
        </div>
      </div>
    );
  }
  