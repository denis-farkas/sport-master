import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
// mportent le hook useRouter de Next.js, le composant Link pour la navigation, et PropTypes pour spécifier les types des propriétés.
export { NavLink };

// NavLink, qui est une version étendue du composant Link fourni par Next.js. Ce composant est conçu pour créer des liens de navigation avec une classe CSS "active" ajoutée lorsque le lien correspond à l'URL

// NavLink attend. Il attend href  de type chaîne et exact (optionnel, de type booléen). Par défaut, la valeur de exact est false.
NavLink.propTypes = {
    href: PropTypes.string.isRequired,
    exact: PropTypes.bool
};

NavLink.defaultProps = {
    exact: false
};

function NavLink({ children, href, exact, ...props }) {
    // composant fonctionnel NavLink. Les propriétés sont déstructurées dans les arguments de la fonction.
    const { pathname } = useRouter();
    // détermine si le lien est actif en fonction de la correspondance du chemin actuel avec le href. Si exact est vrai, la correspondance doit être exacte ; sinon, elle doit seulement commencer par href.
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    // Si le lien est actif, la classe CSS "active" est ajoutée à la propriété className du composant.
    if (isActive) {
        props.className += ' active';
    }
// composant Link de Next.js est rendu avec le href, les propriétés supplémentaires, et le contenu du composant (children). Ce composant Link est utilisé pour la navigation entre les différentes pages de l'application.
    return <Link href={href} {...props}>{children}</Link>;
}