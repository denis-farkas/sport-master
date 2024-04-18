
import Main from 'components/Main';
import Section from 'components/Section';
import Section2 from 'components/Section2';

import { SectionArticle } from 'components/articles/SectionArticle';
// page d'accueil du site

export default Home;

function Home() {
    return (
        <div >
       
            <Main />
            <Section />
            <SectionArticle/>
            <Section2 />
            
        </div>
    );
}
