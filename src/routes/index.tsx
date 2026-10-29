import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
// 1. Nueva importación de iconos
import {
  LuArrowUpRight,
  LuCamera,
  //LuLock,
  //LuSend,
  LuX,
} from "@qwikest/icons/lucide";
import type { DocumentHead } from "@builder.io/qwik-city";
// 2. Actualizamos los nombres en el arreglo (agregando 'Lu' al inicio)
const links = [
  // { label: 'VIP Telegram', icon: LuSend, href: 'https://t.me/tu-grupo', detail: 'private community' },
  {
    label: "Instagram",
    icon: LuCamera,
    href: "https://instagram.com/",
    detail: "claudettepetite",
  },
  {
    label: "X (Twitter)",
    icon: LuX,
    href: "https://x.com/",
    detail: "claudetteglow",
  },
  //{ label: 'Amazon Wishlist', icon: LuArrowUpRight, href: 'https://amazon.com/hz/wishlist/ls/tu-lista', detail: 'a little something' },
];
export const head: DocumentHead = {
  title: "Claudette Petite | The Private Edit",
  meta: [
    {
      name: "description",
      content:
        "A little mystery, a lot of magic. Welcome to the private corner of the internet for Claudette Petite. Exclusive content and official links.",
    },
    {
      name: "keywords",
      content:
        "claudettepetite, claudette petite, claudette.site, content creator, modelo",
    },
    // Estas etiquetas (Open Graph) son para que se vea una tarjeta bonita cuando envíes el link por WhatsApp, Telegram o X:
    {
      property: "og:title",
      content: "Claudette Petite | The Private Edit",
    },
    {
      property: "og:description",
      content:
        "A little mystery, a lot of magic. Welcome to my private corner.",
    },
    {
      property: "og:image",
      content:
        "https://claudette.site/claudette-portrait.png" /* Aquí irá la URL de su foto */,
    },
  ],
};
export default component$(() => {
  // Manejador de estado para el aviso +18
  const showAgeGate = useSignal(false);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => showAgeGate.value);

    if (showAgeGate.value) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  });

  return (
    <main class="creator-page">
      <div class="portrait-bg" aria-hidden="true" />
      <div class="ambient-glow" aria-hidden="true" />

      <section class="profile-shell" aria-label="Claudette profile">
        <div class="profile-topline">
          <span>EST. 2026</span>
          <span>✦</span>
          <span>COLOMBIA / ONLINE</span>
        </div>
        <div class="avatar-ring" aria-hidden="true">
          <div class="avatar" aria-hidden="true" />
        </div>
        <p class="eyebrow">THE PRIVATE EDIT</p>
        <h1>
          claudette<span>petite</span>
        </h1>
        <p class="intro">
          A little mystery, a lot of magic.
          <br />
          Welcome to my private corner of the internet.
        </p>

        <div class="link-section">
          <p class="section-label">
            <span>01</span> Enter my world
          </p>
          <button
            class="onlyfans-link"
            onClick$={() => (showAgeGate.value = true)}
          >
            <span class="onlyfans-mark">OF</span>
            <span>
              <strong>OnlyFans</strong>
              <small>exclusive content &amp; behind the scenes</small>
            </span>
            <LuArrowUpRight width={18} height={18} stroke-width={1.5} />
          </button>

          <div class="secondary-links">
            {links.map(({ label, icon: Icon, href, detail }) => (
              <a
                class="glass-link"
                href={`${href}/${detail}`}
                key={label}
                target="_blank" // <-- Esto abre la pestaña nueva
                rel="noopener noreferrer"
              >
                <Icon
                  width={17}
                  height={17}
                  stroke-width={1.5}
                  aria-hidden="true"
                />{" "}
                <span>
                  <strong>{label}</strong>
                  <small>{detail}</small>
                </span>
                <LuArrowUpRight
                  class="link-arrow"
                  width={15}
                  height={15}
                  stroke-width={1.5}
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>

        {/* <div class="sneak-peek">
          <div class="section-label"><span>02</span> Sneak peek <em>members only</em></div>
          <div class="teasers">
            {[1, 2, 3].map((item) => (
              <div class={`teaser teaser-${item}`} key={item}>
                <div class="teaser-shade" />
                <LuLock size={15} stroke-width={1.5} aria-label="Locked teaser" />
              </div>
            ))}
          </div>
        </div> */}
        <p class="footer-note">
          18+ · Please enjoy responsibly · <span>♡</span>
        </p>
      </section>

      {/* Modal de Advertencia +18 */}
      {showAgeGate.value && (
        <div
          class="modal-backdrop"
          role="presentation"
          onMouseDown$={(event, currentTarget) => {
            if (event.target === currentTarget) showAgeGate.value = false;
          }}
        >
          <div
            class="age-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="age-title"
          >
            <button
              class="close-modal"
              onClick$={() => (showAgeGate.value = false)}
              aria-label="Close age restriction warning"
            >
              <LuX width={18} height={18} />
            </button>
            <div class="modal-symbol">
              18<span>+</span>
            </div>
            <p class="eyebrow">PRIVATE ACCESS</p>
            <h2 id="age-title">Explicit Content Warning</h2>
            <p class="modal-copy">
              You must be 18 years or older to view this page. By entering, you
              confirm that you meet the age requirement.
            </p>
            <a
              class="enter-button"
              href="https://onlyfans.com/claudettepetite"
              target="_blank"
              rel="noreferrer"
              onClick$={() => (showAgeGate.value = false)}
            >
              I am 18 or older — Enter <LuArrowUpRight width={17} height={17} />
            </a>
            <button
              class="back-button"
              onClick$={() => (showAgeGate.value = false)}
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </main>
  );
});
