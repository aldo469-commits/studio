export default function PrivacyPolicyPage() {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="font-headline text-4xl font-bold mb-8">Política de Privacidad</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <p>
            EJA GlobalTrans ("nosotros", "nuestro") opera el sitio web [URL del sitio web] (el "Servicio").
            Esta página le informa de nuestras políticas en materia de recopilación, uso y divulgación de
            datos personales cuando utiliza nuestro Servicio y de las opciones de las que dispone en
            relación con esos datos.
          </p>

          <h2 className="font-headline text-2xl mt-8">Recopilación y uso de la información</h2>
          <p>
            Recopilamos diferentes tipos de información con diversas finalidades para prestarle y
            mejorar nuestro Servicio.
          </p>

          <h3 className="font-headline text-xl mt-4">Tipos de datos recopilados</h3>
          <h4>Datos personales</h4>
          <p>
            Mientras utiliza nuestro Servicio, es posible que le pidamos que nos proporcione cierta
            información de identificación personal que puede utilizarse para contactarle o identificarle
            ("Datos Personales"). La información de identificación personal puede incluir, entre otros:
          </p>
          <ul>
            <li>Dirección de correo electrónico</li>
            <li>Nombre y apellidos</li>
            <li>Número de teléfono</li>
            <li>Cookies y datos de uso</li>
          </ul>

          <h2 className="font-headline text-2xl mt-8">Uso de los datos</h2>
          <p>EJA GlobalTrans utiliza los datos recopilados con diversas finalidades:</p>
          <ul>
            <li>Suministrar y mantener nuestro Servicio</li>
            <li>Notificarle cambios en nuestro Servicio</li>
            <li>Permitirle participar en funciones interactivas de nuestro Servicio cuando decida hacerlo</li>
            <li>Prestar asistencia al cliente</li>
            <li>Recopilar análisis o información valiosa que nos permitan mejorar nuestro Servicio</li>
            <li>Controlar el uso de nuestro Servicio</li>
            <li>Detectar, prevenir y abordar problemas técnicos</li>
          </ul>

          <h2 className="font-headline text-2xl mt-8">Seguridad de los datos</h2>
          <p>
            La seguridad de sus datos es importante para nosotros, pero recuerde que ningún método de
            transmisión por Internet o método de almacenamiento electrónico es 100% seguro. Aunque nos
            esforzamos por utilizar medios comercialmente aceptables para proteger sus Datos Personales,
            no podemos garantizar su seguridad absoluta.
          </p>

          <h2 className="font-headline text-2xl mt-8">Contacto</h2>
          <p>
            Si tiene alguna pregunta sobre esta Política de Privacidad, póngase en contacto con nosotros:
          </p>
          <ul>
            <li>Por correo electrónico: info@ejaglobaltrans.com</li>
          </ul>
        </div>
      </div>
    );
  }
  