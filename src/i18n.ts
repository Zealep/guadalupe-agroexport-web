// Textos de la web en español (es) e inglés (en).
// Para cambiar un texto, edítalo aquí y vuelve a publicar.

export type Lang = 'es' | 'en';

export const rutas = {
  es: { inicio: '/', nosotros: '/nosotros/', productos: '/productos/', contacto: '/contacto/' },
  en: { inicio: '/en/', nosotros: '/en/about-us/', productos: '/en/products/', contacto: '/en/contact-us/' },
} as const;

export type Pagina = keyof typeof rutas.es;

export const urlProducto = (lang: Lang, slug: string) => `${rutas[lang].productos}${slug}/`;

export const meses = {
  es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

export const t = {
  es: {
    descripcion: 'Productores y exportadores peruanos de ajo, jengibre, cúrcuma, mandarina, uvas, páprika y quinua. Calidad natural que cruza fronteras.',
    menu: { inicio: 'Inicio', nosotros: 'Nosotros', productos: 'Productos', contacto: 'Contáctanos' },
    abrirMenu: 'Abrir menú',
    cerrarMenu: 'Cerrar menú',
    idioma: 'Idioma',
    hero: {
      titulo: 'Cultivamos lo mejor del Perú <br>para el mundo',
      subtitulo: 'Calidad natural que cruza fronteras.',
      boton: 'Ver productos',
    },
    empresa: {
      titulo: 'Nuestra <span>empresa</span>',
      texto: 'Somos una empresa productora y exportadora de los mejores ajos, jengibre y mandarinas, donde cuidamos cada eslabón de la cadena productiva.',
      boton: 'Conócenos',
    },
    destacados: { titulo: 'Nuestros <span>productos</span>', boton: 'Ver productos' },
    suscripcion: {
      titulo: 'Contáctanos',
      texto: 'Déjanos tu correo y nos pondremos en contacto contigo para brindarte la información que necesites.',
      placeholder: 'Escribe tu correo',
      boton: 'Enviar',
    },
    nosotros: {
      titulo: 'Nosotros',
      hacemosTitulo: 'Lo que <span>hacemos</span>',
      hacemosTexto: 'Nos dedicamos a producir y exportar los mejores ajos, jengibre y mandarinas con mucha pasión, desde hace más de 10 años. Podemos ser tu mejor socio estratégico comercial en tu cadena de distribución. Nuestro compromiso con la calidad y fiabilidad de nuestros productos va en cada caja producida por nosotros.',
      misionTitulo: 'Nuestra <b>Misión</b>',
      misionTexto: 'Satisfacer de manera confiable y óptima alimentos de calidad según lo requieran los mercados.',
      visionTitulo: 'Nuestra <b>Visión</b>',
      // REVISAR: en la web anterior la visión tenía el mismo texto que la misión.
      visionTexto: 'Satisfacer de manera confiable y óptima alimentos de calidad según lo requieran los mercados.',
      valoresTitulo: 'Nuestros <span>valores</span>',
      certificacionesTitulo: 'Nuestras <span>certificaciones</span>',
    },
    productos: {
      titulo: 'Productos',
      intro: 'Productos frescos, especias y granos cultivados en el Perú y exportados a mercados de América, Europa y Asia.',
      verDetalle: 'Ver detalle',
      mercados: 'Mercados',
      presentacion: 'Presentación',
      variedades: 'Variedades',
      certificaciones: 'Certificaciones',
      cosecha: 'Temporada de cosecha',
      galeria: 'Galería',
      otros: 'Otros productos',
      cotizar: 'Solicitar cotización',
      volver: 'Todos los productos',
    },
    contacto: {
      titulo: 'Contáctanos',
      intro: '¿Tienes alguna duda o quieres saber más sobre nuestros productos?',
      verMapa: 'Ver mapa',
      formTitulo: 'Escríbenos',
      nombre: 'Nombres y apellidos',
      empresa: 'Empresa',
      correo: 'Correo electrónico',
      telefono: 'Número de teléfono',
      pais: 'País',
      mensaje: 'Cuéntanos brevemente tu consulta',
      enviar: 'Enviar',
      asunto: 'Contacto desde la web',
      asuntoSuscripcion: 'Suscripción desde la web',
    },
    form: {
      enviando: 'Enviando…',
      ok: 'Gracias por tu mensaje. Te responderemos pronto.',
      error: 'No se pudo enviar. Escríbenos a',
    },
    whatsapp: 'Conversemos por WhatsApp',
    siguenos: 'Síguenos',
    derechos: 'Todos los derechos reservados.',
    inicio: 'Inicio',
  },
  en: {
    descripcion: 'Peruvian growers and exporters of garlic, ginger, turmeric, tangerines, grapes, paprika and quinoa. Natural quality that crosses borders.',
    menu: { inicio: 'Home', nosotros: 'About us', productos: 'Products', contacto: 'Contact us' },
    abrirMenu: 'Open menu',
    cerrarMenu: 'Close menu',
    idioma: 'Language',
    hero: {
      titulo: 'We cultivate the best of Peru <br>for the world',
      subtitulo: 'Natural quality that crosses borders.',
      boton: 'See products',
    },
    empresa: {
      titulo: 'Our <span>company</span>',
      texto: 'We are a company that produces and exports the best garlic, ginger, and mandarins, where we take care of every link in the production chain.',
      boton: 'About us',
    },
    destacados: { titulo: 'Our <span>products</span>', boton: 'View products' },
    suscripcion: {
      titulo: 'Contact us',
      texto: 'Leave us your email and we will contact you to provide you with the information you need.',
      placeholder: 'Enter your email',
      boton: 'Send',
    },
    nosotros: {
      titulo: 'About us',
      hacemosTitulo: 'What <span>we do</span>',
      hacemosTexto: 'For more than 10 years we have been passionately growing and exporting the finest garlic, ginger and mandarins. We can be your best strategic business partner in your distribution chain. Our commitment to the quality and reliability of our products goes into every box we produce.',
      misionTitulo: 'Our <b>Mission</b>',
      misionTexto: 'To reliably and optimally supply quality food as required by the markets.',
      visionTitulo: 'Our <b>Vision</b>',
      visionTexto: 'To reliably and optimally supply quality food as required by the markets.',
      valoresTitulo: 'Our <span>values</span>',
      certificacionesTitulo: 'Our <span>certifications</span>',
    },
    productos: {
      titulo: 'Products',
      intro: 'Fresh produce, spices and grain grown in Peru and exported to markets in the Americas, Europe and Asia.',
      verDetalle: 'View details',
      mercados: 'Markets',
      presentacion: 'Presentation',
      variedades: 'Varieties',
      certificaciones: 'Certifications',
      cosecha: 'Harvest season',
      galeria: 'Gallery',
      otros: 'Other products',
      cotizar: 'Request a quote',
      volver: 'All products',
    },
    contacto: {
      titulo: 'Contact us',
      intro: 'Do you have any questions or want to know more about our products?',
      verMapa: 'View map',
      formTitulo: 'Write to us',
      nombre: 'Full name',
      empresa: 'Company',
      correo: 'Email',
      telefono: 'Phone number',
      pais: 'Country',
      mensaje: 'Briefly tell us about your inquiry',
      enviar: 'Send',
      asunto: 'Website contact (EN)',
      asuntoSuscripcion: 'Website subscription (EN)',
    },
    form: {
      enviando: 'Sending…',
      ok: 'Thank you for your message. We will get back to you soon.',
      error: 'Could not send. Please email us at',
    },
    whatsapp: 'Chat with us on WhatsApp',
    siguenos: 'Follow us',
    derechos: 'All rights reserved.',
    inicio: 'Home',
  },
};
