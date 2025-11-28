import { useState, useRef } from "react";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import "./contacto.css";
import { useTranslation } from "react-i18next";

function Contacto() {
  const [captchaToken, setCaptchaToken] = useState(null);
  const [status, setStatus] = useState("");
  const recaptchaRef = useRef(null);
  const { t } = useTranslation();

  const customSwal = Swal.mixin({
    customClass: {
      popup: "uthopiq-popup",
      confirmButton: "uthopiq-confirm-button",
      cancelButton: "uthopiq-cancel-button",
      title: "uthopiq-title",
      htmlContainer: "uthopiq-text",
    },
    buttonsStyling: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const mensaje = form.mensaje.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombre)
      return customSwal.fire({
        icon: "warning",
        title: t("contacto.swal_falta_nombre"),
      });
    if (!emailRegex.test(email))
      return customSwal.fire({
        icon: "warning",
        title: t("contacto.swal_correo_invalido"),
      });
    if (!mensaje)
      return customSwal.fire({
        icon: "warning",
        title: t("contacto.swal_mensaje_vacio"),
      });
    if (!captchaToken)
      return customSwal.fire({
        icon: "warning",
        title: t("contacto.swal_completar_captcha"),
      });

    setStatus("sending");
    try {
      const formData = new FormData(form);
      formData.append("g-recaptcha-response", captchaToken);

      const res = await fetch("https://uthopiq.com/contacto.php", {
        method: "POST",
        body: formData,
      });
      const txt = await res.text();

      if (txt.includes("Mensaje enviado correctamente")) {
        customSwal.fire({
          icon: "success",
          title: t("contacto.swal_enviado_title"),
          text: t("contacto.swal_enviado_text"),
        });
        form.reset();
        setCaptchaToken(null);
        recaptchaRef.current?.reset();
      } else {
        customSwal.fire({
          icon: "error",
          title: t("contacto.swal_error_enviar_title"),
          text: txt || t("contacto.swal_error_enviar_text_generico"),
        });
      }
    } catch {
      customSwal.fire({
        icon: "error",
        title: t("contacto.swal_error_ocurrio_title"),
        text: t("contacto.swal_error_ocurrio_text"),
      });
    } finally {
      setStatus("");
    }
  };

  return (
    <section className="contacto" id="contacto">
      <header className="contacto-head" data-aos="fade-up">
        <h2>{t("contacto.titulo")}</h2>
        <p className="contacto-sub">{t("contacto.subtitulo")}</p>
      </header>

      <div
        className="card-contact card-plan"
        data-aos="fade-up"
        data-aos-delay="50"
      >
        <div className="card-contact-body card-plan-body">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="nombre">{t("contacto.label_nombre")}</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder={t("contacto.placeholder_nombre")}
                autoComplete="name"
              />
            </div>

            <div className="field">
              <label htmlFor="email">{t("contacto.label_email")}</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder={t("contacto.placeholder_email")}
                autoComplete="email"
              />
            </div>

            <div className="field field-full">
              <label htmlFor="mensaje">{t("contacto.label_mensaje")}</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="5"
                placeholder={t("contacto.placeholder_mensaje")}
              />
            </div>

            <div className="captcha field-full">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LeYDIUrAAAAADDSGLNADq0UygjRR2aIQak6w_wT"
                onChange={(tkn) => setCaptchaToken(tkn)}
                onExpired={() => setCaptchaToken(null)}
                theme="dark"
              />
            </div>

            <div className="actions field-full">
              <button type="submit" disabled={status === "sending"}>
                {status === "sending" && (
                  <span className="spinner" aria-hidden="true" />
                )}
                {status === "sending"
                  ? ` ${t("contacto.btn_enviando")}`
                  : t("contacto.btn_enviar")}
              </button>
              <span className="hint">{t("contacto.hint")}</span>
            </div>
          </form>
        </div>
      </div>

      <div className="contacto-info" data-aos="fade-up" data-aos-delay="100">
        <p>
          {t("contacto.texto_correo")}{" "}
          <a href="mailto:contacto@uthopiq.com">contacto@uthopiq.com</a>
        </p>
      </div>
    </section>
  );
}

export default Contacto;
